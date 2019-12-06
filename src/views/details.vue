<template>
  <div class="details">
    <!-- header start -->
    <header>
      <page-header
        ref='header'
        @backClickHandler='backClickHandler()'
        :transparent="1"
        rightText=''
        title='详情'
      />
    </header>
    <!-- header end -->
    <main class="details-layout-main">
      <!-- 滚动条 star -->
      <md-scroll-view
        ref="scrollView"
        @scroll="onScroll"
        :scrolling-x='false'
      >
        <!-- 朋友圈详情 star -->
        <details-basic
          :comment='requestedData.comment'
          @delete='deleteHandler'
          @comment-handler='commentHandler'
        ></details-basic>
        <!-- 朋友圈详情 end -->
      </md-scroll-view>
      <!-- 滚动条 end -->

    </main>
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
import { Vue, Component, Prop, Emit, Model, Watch, Ref } from 'vue-property-decorator';
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
  ScrollView,
} from 'mand-mobile';
import TyStar from '@/components/base/star/TyStar.vue';
import { UserModule } from '@/store/modules/user';
import Ellipsis from 'ellipsis-plus';
import PageHeader from '../components/base/PageHeader.vue';
import DetailsBasic from '../components/base/detailsBasic.vue';
@Component({
  name: 'Details',
  components: {
    TyStar,
    PageHeader,
    DetailsBasic,
    [ScrollView.name]: ScrollView,
    [ActionSheet.name]: ActionSheet,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Field.name]: Field,
    [TextareaItem.name]: TextareaItem,
    [ActionBar.name]: ActionBar,
  },
})
export default class Details extends Vue {
  /*=============================================
  =                     Data                    =
  =============================================*/
  //数据
  private requestedData: any = {
    comment: [
      {
        label: ['张三', '李四'],
        value:
          '战歌随地便溺节点是否皇家贝蒂斯不减肥背景色的放不进四大皆空加快速度发加快速度就开发商的借款方就和你',
      },
      {
        label: ['张三'],
        value:
          '战歌随地便溺节点是否皇家贝蒂斯不减肥背景色的放不进四大皆空加快速度发加快速度就开发商的借款方就和你',
      },
    ],
  };
  private userId: string = '';
  private id: string = '';
  private value: string = '';
  /**
   * 输入框
   */
  private isPopupShow = {};
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
  /*=============================================
  =                    计算属性                   =
  =============================================*/
  /**
   * 姓名
   *
   * @memberof FriendsPreviewHeader
   */
  private get realname() {
    return UserModule.getRelName;
  }

  /*=============================================
  =                    Method                   =
  =============================================*/
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
    setTimeout(() => {
      // 关闭提交加载
      this.TextareaAction[0].loading = false;
      // 关闭弹窗
      this.$set(this.isPopupShow, 'bottom', false);
      Toast.succeed('答复成功', 1000);
      // 判断是不是回复谁，还是自己回复的 textareaPlaceholder
      const Resultlabel = this.label === '' ? [this.realname] : [this.realname, this.label];
      console.log(this.textareaPlaceholder);
      const result = {
        label: Resultlabel,
        value: this.value,
      };
      this.requestedData.comment.push(result);
    }, 1000);
  }
  /**
   * 后退按钮
   */
  private backClickHandler() {
    this.$router.go(-1);
  }
  /**
   * 评论按钮被点击
   */
  private commentHandler() {
    // console.log('dianji ')
    this.showPopUp('bottom');
  }
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
  }
  /*=============================================
  =                    Mounted                  =
  =============================================*/

  private onScroll({ scrollTop }: { scrollTop: number }) {
    // console.log(scrollTop);
  }
  /**
   * 删除本条
   */
  private deleteHandler() {
    Dialog.confirm({
      title: '确认',
      content: '是否删除本条朋友圈',
      confirmText: '确定',
      onConfirm: () => {
        Toast.loading('删除中...');
        setTimeout(() => {
          Toast.succeed('操作成功', 1000);
          this.$router.go(-1);
        }, 1000);
      },
    });
  }
  private mounted() {
    /* 首先当前用户 userId*/
    if (this.$route.query.userId) {
      const result = this.$route.query.userId;
      this.userId = result as string;
    }
    console.log(this.userId);
  }
}
</script>

<style scoped lang="scss">
.details {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .details-layout-main {
    width: 100%;
    height: 100%;
    padding-top: 87px;
    .scroll-view-item {
      background-color: red;
      width: 100%;
      height: 150px;
    }
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
      border-radius: 25px 25px 0px 0px;
    }
  }
}
</style>