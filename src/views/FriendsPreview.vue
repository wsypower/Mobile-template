<template>
  <div class="cg_preview">
    <!-- header start -->
    <page-header
      ref='header'
      @rightBtnClickHandler="rightBtnClickHandler()"
      :transparent="headerTransparent"
      icon='camera'
      title='朋友圈'
    />
    <!-- header end -->
    <!-- 滚动页面 start-->
    <scroll-page-wrap
      @scrollTop="scrollTop"
      :scrollButton="scrollButton"
      :isFinished='isFinished'
      @onRefresh='onRefresh'
      @onEndReached='onEndReached'
      ref='scroll'
    >
      <!-- 头部 start-->
      <template #header>
        <Friends-preview-header
          ref="FriendsPreviewHeader"
          :realname="realname"
          @avatarClickHandler='avatarClickHandler'
        />
      </template>
      <!-- 头部 start-->
      <!-- 内容  start-->
      <!-- v-scroll-reveal.reset -->
      <template #body>
        <div
          class="skeleton"
          v-for='item in 10'
          v-if='skeleton'
          :key="index"
        >
          <md-skeleton
            avatar
            title
            :row='8'
            :loading="skeleton"
          >
          </md-skeleton>
        </div>
        <div
          class="preview_item"
          v-for="(item, index) in list"
          :key="item.id"
        >
          <Friends-item
            v-if='item.show'
            :id=item.id
            :queryid='item.userId'
            :text='item.content'
            :star='item.star'
            :time='item.createtime'
            :name='item.username'
            :likes='item.like'
            :images='item.image'
            :video='item.video'
            :comment='item.comment'
            :index='index'
            v-model='point'
            @delete='deleteHandler'
            @star-thumbsUp='starThumbsUp($event,index,item.id)'
            @comment-handler='commentHandler(item.id,index)'
            @comment-reply='commentReply($event,item.id)'
          ></Friends-item>
        </div>
      </template>
      <!-- 内容  start-->
    </scroll-page-wrap>
    <!-- 滚动页面 end-->
    <!-- 输入评论 start -->
    <md-popup
      v-model="isPopupShow.bottom"
      position="bottom"
    >
      <div
        class="comment-popup"
        ref='popupTextarea'
      >
        <form>
          <md-field>
            <md-textarea-item
              ref="textarea"
              class="demo2"
              v-model="value"
              :max-length="100"
              :max-height="350"
              row="3"
              :placeholder="textareaPlaceholder"
              clearable
              @keyup='textareaKeyUp()'
            >
              <template slot="footer">
                <div
                  class="footer-content"
                  flex="main:center cross:center"
                >
                  <span
                    class="footer-text"
                    v-if="value.length"
                  >{{ value.length }}</span>
                  <span
                    v-else
                    class="footer-text"
                  >0</span>
                  <span class="footer-text">/100</span>
                </div>
                <div class="textarea-btn">
                  <md-action-bar :actions="TextareaAction"></md-action-bar>
                </div>
              </template>
            </md-textarea-item>
          </md-field>
        </form>
      </div>
    </md-popup>
    <!-- 输入评论 end -->

  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component';
import { Component, Vue, Ref, Watch } from 'vue-property-decorator';
import PageHeader from '@/components/base/PageHeader.vue';
import scrollPageWrap from '@/components/base/scrollPageWrap.vue';
import FriendsPreviewHeader from '@/components/views/friendsPreview/friendsPreviewHeader.vue';
import { getElementStyle } from '@/util/util.assist';
import util from '@/util/util';
import { AsyncGetUser } from '@/api/modules.ts/friend/list';
import FriendsItem from '../components/views/friendsPreview/feirendsItem.vue';
import {
  AsyncGetList,
  AsyncSetStar,
  AsyncSetComment,
  AsyncDeleteComment,
  AsyncDeleteSubject,
} from '../api/modules.ts/friend/list';
import { ceil } from 'lodash';
import { UserModule } from '@/store/modules/user';
import {
  ActionSheet,
  Dialog,
  Popup,
  PopupTitleBar,
  TextareaItem,
  Field,
  InputItem,
  ActionBar,
  Toast,
} from 'mand-mobile';
import ActionSheetMixin from '@/mixin/ActionSheet';
import { Skeleton } from 'mand-mobile';
import nativeMethod from '@/plugin/core/hesc/heschybird';
/*=============================================
=                  Component                  =
=============================================*/

@Component({
  name: 'FriPreview',
  components: {
    FriendsPreviewHeader,
    PageHeader,
    scrollPageWrap,
    FriendsItem,
    [ActionSheet.name]: ActionSheet,
    [Skeleton.name]: Skeleton,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Field.name]: Field,
    [TextareaItem.name]: TextareaItem,
    [InputItem.name]: InputItem,
    [ActionBar.name]: ActionBar,
    // [Toast.name]: Toast
  },
})
export default class FriPreview extends mixins(ActionSheetMixin) {
  /*=============================================
  =                     Data                    =
  =============================================*/
  //滚动条总页数
  private pageCount: any = 1;
  // 当前页
  private curpage: any = 1;
  /**
   *
   * 列表信息
   */
  private list: any[] = [];
  private point: number = 0;

  /**
   * 骨架屏
   */
  private skeleton: boolean = true;

  /**
   * 滚动条位置信息
   */
  private scrollTopNumber: number = 0;
  /**
   * 输入框
   */
  private isPopupShow = {};

  private value: string = '';

  private popupTextareaHeight: number = 0;

  /**
   * textarea ——p laceholder
   */
  private textareaPlaceholder: string = '回复信息在100字以内';
  /**
   * 是否是长按复制来的
   */
  private label: string = '';

  /**
   * 点击评论的索引
   */
  private commentIndex: number | null = null;
  /**
   * 输入按钮
   */
  private TextareaAction = [
    // {
    //   text: '关闭',
    //   onClick: this.subHandleClick,
    //   round: true,
    // },
    {
      text: '提交',
      onClick: this.subHandleClick,
      round: true,
      loading: false,
    },
  ];
  /**
   * 评论提交
   */
  private subjectid: any = '';
  private replyid: any = '';
  /* -------- FriendsItem ------- */

  /* -------- PageHeader ------- */

  /**
   * 头部导航栏透明度
   *
   * @memberof PageHeader
   */
  private headerTransparent: number = 0;

  /**
   * 头部导航栏自适应的高度
   *
   * @memberof PageHeader
   */
  private headerHeight: number = 0;

  /* -------- scrollPageWrap ------- */
  /**
   * 头部图片的高度
   *
   * @private
   */
  private scrollImgHeight: number = 0;

  /**
   * 是否已经加载所有数据
   *
   * @private
   */
  private isFinished: boolean = false;

  /**
   * 单击评价的索引
   */
  private index: number | null = null;
  /**
   * 空白按钮
   *
   * @memberof scrollPageWrap
   */
  private scrollButton: any[] = [
    {
      text: '点击新增',
      type: 'primary',
      icon: 'camera',
      round: true,
      handler() {
        console.log('跳转页面');
      },
    },
  ];
  /**
   * 评论id
   */
  private commentId: any = '';
  /* -------- FriendsPreviewHeader ------- */
  /**
   * 姓名
   *
   * @memberof FriendsPreviewHeader
   */
  private get realname() {
    return UserModule.getRelName;
  }

  /**
   * userId
   *
   * @memberof FriendsPreviewHeader
   */
  private get userId() {
    return UserModule.userId;
  }
  /* -------- list ------- */
  /**
   * 数据长度
   */
  private get listLength(): number {
    return this.list.length;
  }
  /*=============================================
  =                     Watch                   =
  =============================================*/
  /* -------- list 判断是否已经加载全部 ------- */
  /**
   * 检测数据长度
   */
  @Watch('listLength')
  onChildChanged(val: number, oldVal: number) {
    val > 20 ? (this.isFinished = true) : (this.isFinished = false);
  }

  /*=============================================
  =                     Ref                     =
  =============================================*/

  /* -------- FriendsPreviewHeader ------- */
  /**
   * Ref FriendsPreviewHeader
   *
   * @memberof FriendsPreviewHeader
   */
  @Ref('FriendsPreviewHeader') readonly FriendsPreviewHeader!: {
    $el: HTMLElement;
  };
  // 头部菜单栏的高度
  @Ref('header') readonly header!: {
    $el: HTMLElement;
  };
  // 输入弹出框的高度
  @Ref('popupTextarea') readonly popupTextarea!: HTMLElement;
  /* -------- scrollPageWrap ------- */
  /**
   * Ref scrollPageWrap
   *
   * @memberof scrollPageWrap
   */
  @Ref('scroll') readonly scroll!: scrollPageWrap;
  /**
   * Ref textarea
   */
  @Ref('textarea') readonly textarea!: any;
  /*=============================================
  =                    Method                   =
  =============================================*/
  /**
   * 头部点击事件
   */
  private avatarClickHandler() {
    // this.$router.push({ path: '/Friends/self', query: { userId: this.userId } });
    this.$router.push({ path: '/self/history', query: { userId: this.userId } });
  }
  /* -------- start ------- */
  private starThumbsUp(star: boolean, index: number, id: string) {
    const type = star ? 1 : 0;
    // 取反数据，否则会重刷，以后用v-model设计传值
    console.log('点赞');
    this.list[index].star = !this.list[index].star;
    // 上传点赞或者取消赞
    AsyncSetStar({
      subjectid: id,
      type,
    });
  }
  /**
   * 删除本条朋友圈
   */
  private deleteHandler({ index, id }: { index: number; id: any }) {
    Dialog.confirm({
      title: '确认',
      content: '是否删除本条朋友圈',
      confirmText: '确定',
      onConfirm: () => {
        Toast.loading('删除中...');
        AsyncDeleteSubject({
          subjectid: id,
        }).then(res => {
          console.log(res);
          Toast.succeed('操作成功', 1000);
          this.list[index].show = false;
        });
      },
    });
  }
  /* -------- PageHeader ------- */
  /**
   * 监听点击头部左侧功能按钮
   *
   * @memberof PageHeader
   */
  private rightBtnClickHandler(): void {
    this.showActionSheet({
      value: true,
      options: [
        {
          text: '拍摄',
          value: '0',
        },
        {
          text: '从手机相册选择',
          value: '1',
        },
      ],
      cancelText: '取消',
      onSelected: this.rightActionClickHandler,
    });
  }
  /**
   * 选择回调
   */
  private rightActionClickHandler(item: any) {
    Toast.loading('加载中...');
    // 调用原生图片或照相机
    this.nativePhotoOrPicture(item.value)
      .then((res: any) => {
        // 没有选择就直接返回
        if (res.length === 0) {
          Toast.hide();
          return;
        }
        // 有拍照或者选择照相
        // 带查询参数，变成 /register?plan=private
        Toast.hide();
        this.$router.push({ path: '/upload', query: { data: res } });
      })
      .catch((err: any) => {
        Toast.failed(`${err}`, 1000);
        console.log(err);
      });
  }
  /**
   * 选择拍照还是相册
   *
   * @author weiyafei
   * @date 2019-12-03-17:41:44
   * @param {Object} option: number 0 => 拍照，1=> 相册
   */
  private nativePhotoOrPicture(option: number = 1, max: string = '9') {
    return new Promise((resolve, reject) => {
      return option >>> 0 === 0 //保证为数字
        ? nativeMethod(
            'takephone',
            { path: '' },
            (detail: any) => {
              resolve(detail);
            },
            (err: any) => {
              reject(err);
            },
          )
        : nativeMethod(
            'chooseimg',
            { maxSelect: max },
            (detail: any) => {
              resolve(detail);
            },
            (err: any) => {
              reject(err);
            },
          );
    });
  }
  /* -------- scrollPageWrap ------- */
  /**
   * 监听滚动的点位,修改头部背景色的透明度
   *
   * @memberof scrollPageWrap
   */
  private scrollTop({ scrollTop }: { scrollTop: number }) {
    this.scrollTopNumber = scrollTop;
    // 保留一位小数
    const point = ceil(scrollTop / this.scrollImgHeight, 1);

    this.point = point;
    // 修改头部颜色的透明度
    this.headerTransparent = point > 1 ? 1 : point < 0 ? 0 : point;
  }

  /**
   * 下拉刷新
   *
   * @memberof scrollPageWrap
   */
  private onRefresh() {
    this.GetListData(1).then((res: any) => {
      this.curpage = 1;
      this.pageCount = res.pageCount;
      this.list = res.list;
      this.scroll.scrollView.finishRefresh();
      this.isFinished = false;
      this.scroll.scrollView.finishLoadMore();
    });
    // 重置“上拉加载”的状态
  }

  /**
   * 上拉加载
   *
   * @memberof scrollPageWrap
   */
  private onEndReached() {
    console.log(`列表页上拉加载`);
    if (this.isFinished) {
      return;
    }
    this.curpage += this.curpage;
    if (this.curpage > this.pageCount) {
      console.log(111);
      this.isFinished = true;
      return;
    }
    this.GetListData(this.curpage).then((res: any) => {
      this.list.push(...res.list);
      this.scroll.scrollView.finishLoadMore();
    });
  }
  /* -------- async ------- */
  /**
   * 获取user数据
   *
   * @promise
   */
  private GetListData(curpage: any = 1): any {
    console.log('获取数据');
    return AsyncGetList({
      // 参数列表
      curpage,
    })
      .then((res: any) => {
        console.log(res);
        const { queryList } = res;
        const newList = queryList.map((obj: any, index: number) => {
          // 点赞里面移除和自身userId相同的
          obj.like =
            obj.like.length > 0
              ? obj.like.filter((item: any) => item.userId !== this.userId)
              : obj.like;
          // 修改image属性
          // 基础路劲
          obj.image = obj.image.map((img: any[]) => {
            const srcSmall = img.path.replace(
              /\.(png|jpg|gif|jpeg|webp)$/g,
              ($img: string) => `-small${$img}`,
            );
            return {
              src: `${img.path}`,
              msrc: `${srcSmall}`,
              alt: img.alt || '',
              title: img.title || '',
              w: img.width,
              h: img.height,
            };
          });
          // 添加一个 show 属性
          return { show: true, ...obj };
        });
        return Promise.resolve({ pageCount: res.pageCount, list: newList });
      })
      .catch(err => {
        throw new Error(err);
      });
  }
  /* -------- 输入评论 ------- */
  /**
   * 评论按钮被点击
   */
  private commentHandler(id: any, index: any) {
    console.log(index);
    console.log('id', id);
    this.subjectid = id;
    this.index = index;
    this.replyid = '';
    this.showPopUp('bottom');
  }
  /**
   * 删除自己的评论弹出层
   */
  private removeSelfComment() {
    this.showActionSheet({
      value: true,
      options: [
        {
          text: '删除',
          value: '0',
        },
      ],
      defaultIndex: 0,
      cancelText: '取消',
      onSelected: this.removeSelfCommentHandler,
    });
  }

  /**
   * 删除评论
   */
  private removeSelfCommentHandler(id: any) {
    AsyncDeleteComment({
      commentid: this.commentId,
    }).then(res => {
      console.log(res);
      const index = this.commentIndex;
      this.list[this.index as number].comment.splice(index, 1);
      Toast.succeed('删除成功', 1000);
    });
  }
  /**
   * 评论区回复
   */
  private commentReply(
    {
      commentItem,
      index,
      commentIndex,
    }: {
      commentItem: any;
      index: number;
      commentIndex: number;
    },
    id: string,
  ) {
    console.log(id);
    this.index = index;
    this.commentIndex = commentIndex;

    this.subjectid = id;
    this.replyid = commentItem.userId;
    // this.index = index;

    const label = commentItem.username;
    const replyId = commentItem.userId;
    this.commentId = commentItem.id;
    if (this.userId === replyId) {
      this.removeSelfComment();
      return;
    }
    this.showPopUp('bottom', label);
  }
  /**
   * 答复的键盘事件
   */
  private textareaKeyUp(name: string) {}
  /**
   * 显示输入弹窗
   */
  private showPopUp(type: string, label: string = '') {
    // 清空输入框
    this.value = '';
    // 显示输入弹窗
    // 复制给label
    this.label = label;
    // 判断 placeholder 显示的数据
    const Placeholder = this.label === '' ? '回复信息在100字以内' : `回复@${this.label}`;
    this.textareaPlaceholder = Placeholder;
    this.$set(this.isPopupShow, type, true);
    // setTimeout(() => {
    //   this.$nextTick(() => {
    //     this.textarea.focus();
    //   });
    // }, 200);
  }
  /**
   * 提交
   */
  private subHandleClick() {
    if (this.value.length === 0) {
      Toast.failed('回复内容不能为空', 1000);
      return;
    }
    // 开启提交加载
    this.TextareaAction[0].loading = true;
    AsyncSetComment({
      subjectid: this.subjectid,
      content: this.value,
      replyid: this.replyid,
    }).then(res => {
      console.log('id', res);
      // 关闭提交加载
      this.TextareaAction[0].loading = false;
      // 关闭弹窗
      this.$set(this.isPopupShow, 'bottom', false);
      Toast.succeed('答复成功', 1000);
      let result;
      if (this.label === '') {
        result = {
          userId: this.userId,
          content: this.value,
          username: this.realname,
        };
      } else {
        result = {
          userId: this.userId,
          content: this.value,
          username: this.realname,
          replyname: this.label,
        };
      }
      this.list[this.index as number].comment.push(result);
    });
  }
  /**
   * 取消提交
   */
  private cancelHdndleClick() {
    this.$set(this.isPopupShow, 'bottom', false);
  }
  /* -------- public ------- */
  /**
   * 获取元素属性
   *
   * @private
   */
  private getEleStyle(el: HTMLElement, style: string): number {
    return parseFloat(getElementStyle(el, style));
  }

  /*=============================================
  =                    Mounted                  =
  =============================================*/

  private mounted(): void {
    /**
     * 获取头部图片的高度
     */
    this.scrollImgHeight = this.getEleStyle(this.FriendsPreviewHeader.$el, 'height');
    /**
     * 获取导航栏的高度
     */
    this.headerHeight = this.getEleStyle(this.header.$el, 'height');
    /**
     * 初始化滚动条 加载list数据 this.scroll.scrollView.init
     */
    //
    this.GetListData().then((res: any) => {
      this.list = res.list;
      //关闭骨架屏
      this.skeleton = false;
      this.pageCount = res.pageCount;
    });
  }

  /*=============================================
  =                    Created                  =
  =============================================*/
  // private created(): void {
  //   // 获取列表项
  //   // this.GetListData();
  // }
}
</script>

<style scoped lang="scss">
.cg_preview {
  width: 100%;
  height: 100%;
  // min-height: 100%;
  // position: fixed;

  // background-color: #f5f5f5;
  /*=============================================
  =                scroll item                  =
  =============================================*/
  .scroll-view-item {
    padding: 50px 0;
    text-align: center;
    font-size: 28px;
    background-color: #fff;
    border-bottom: 0.5px solid #efefef;
  }
  /* 骨架屏 */
  .skeleton {
    width: 100%;
    background-color: #fff;
    padding: 50px 40px 50px 40px;
  }
  /deep/.md-popup-box {
    border-radius: 25px 25px 0px 0px;
  }
  .comment-popup {
    // height: 500px;
    width: 100%;
    background-color: #fff;
    box-shadow: 1px -7px 12px #9c9c9c;
    border-radius: 25px 25px 0px 0px;

    .footer-content {
      padding-left: 35px;
      // height: 50px;
      width: 100%;
      color: #c5cad5;
      font-weight: 400;
    }
  }
}
</style>
