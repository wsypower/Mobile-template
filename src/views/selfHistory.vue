<template>
  <div class="self_history">
    <page-header
      ref="header"
      :transparent="headerTransparent"
      :icon="moreIcon"
      title="历史动态"
      @backClickHandler="backClickHandler"
      @rightBtnClickHandler="rightBtnClickHandler"
    />
    <main class="layout-main">
      <!-- 滚动条 -->
      <div class="layout-main-scroll">
        <md-scroll-view
          ref="scrollView"
          :scrolling-x="false"
          @scroll="onScroll"
          auto-reflow
        >
          <!-- 头部 -->
          <Friends-preview-header
            ref="FriendsPreviewHeader"
            :realname="name"
            @avatarClickHandler="avatarClickHandler"
            style="z-index:10"
          />
          <!-- 今日 star-->
          <div class="scroll-view-list today-view-list">
            <div
              class="scroll-view-item tody-item"
              flex="box:first"
            >
              <div
                class="timer"
                flex="main:left cross:baseline"
              >
                <span class="day">
                  今日
                </span>
              </div>
              <div class="details">
                <!-- 拍照片上传 star-->
                <div
                  class="details-item"
                  flex="box:first"
                  v-if="userId === selfUserId"
                >
                  <div
                    class="picture"
                    @click.stop="uploadClickHandler"
                  >
                    <div class="photo"></div>
                  </div>
                </div>
                <!-- 拍照片上传 end-->

                <!-- 今日的循环 star-->
                <div
                  class="details-item"
                  flex="box:first"
                  v-for="item in current"
                  :key='item.id'
                  @click="detailsClick(item.id)"
                  tabindex
                >
                  <div
                    class="picture"
                    v-if='item.image.length>0'
                  >
                    <img
                      :src="SetImageToSmall(item.image)"
                      alt=""
                    />
                  </div>
                  <div
                    class="text"
                    flex="dir:top main:justify"
                    v-if='item.image.length>0'
                  >
                    <span class="textarea">{{item.content}}</span>
                    <span
                      class="image-page"
                      flex="main:left"
                    > 共{{ item.count }}张</span>
                  </div>
                  <!-- 没有图片启用的布局 -->
                  <div
                    class="textarea-noimg"
                    v-if='item.image.length===0'
                  >
                    <span>{{item.content}}</span>
                  </div>
                </div>
                <!-- 今日的循环 end-->

              </div>
            </div>
          </div>
          <!-- 今日 end-->
          <!-- 以年为分割 -->
          <div
            v-for="(item, index) in list"
            :key="index"
            class="scroll-view-category"
          >
            <p
              class="scroll-view-category-title"
              v-show="index"
              flex="main:left cross:center"
            >
              {{ item.year }}年
            </p>
            <!-- 以日为分割 -->

            <div
              v-for="(MonthandDay, i) in item.data"
              :key="i"
              class="scroll-view-list"
            >
              <!-- 月日 star-->
              <div
                class="scroll-view-item"
                flex="box:first"
              >
                <div
                  class="timer"
                  flex="main:left cross:baseline"
                >
                  <span class="day">
                    {{ MonthandDay.day.substring(3) }}
                  </span>
                  <span class="month"> {{ month(MonthandDay.day) }}月 </span>
                </div>
                <div class="details">
                  <!-- 详情 -->
                  <div
                    class="details-item"
                    flex="box:first"
                    v-for="(j, k) in MonthandDay.data"
                    :key="k"
                    @click="detailsClick(j.id)"
                  >
                    <div
                      class="picture"
                      v-if="j.image.length > 0"
                    >
                      <img
                        :src="SetImageToSmall(j.image)"
                        alt=""
                      />
                    </div>
                    <div
                      class="text"
                      flex="dir:top main:justify"
                      v-if="j.image.length > 0"
                    >
                      <span class="textarea">{{ j.content }}</span>
                      <span
                        class="image-page"
                        flex="main:left"
                      > 共{{ j.count }}张</span>
                    </div>
                    <div
                      v-if="j.image.length === 0"
                      class="textarea-noimg"
                    >
                      <span>{{ j.content || '暂无数据' }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 月日 end-->
            </div>
          </div>
        </md-scroll-view>
        <!-- <md-transition name='md-fade-up'> -->
        <transition
          name="custom-classes-transition"
          enter-active-class="animated fadeInUp"
        >
          <p
            v-if="activeBlockIndex !== ''"
            class="scroll-view-striky-title"
            flex="main:left cross:center"
          >
            {{ activeBlockIndex }}
          </p>
        </transition>
        <!-- </md-transition> -->
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import PageHeader from '@/components/base/PageHeader.vue';
import FriendsPreviewHeader from '@/components/views/friendsPreview/friendsPreviewHeader.vue';
import { UserModule } from '@/store/modules/user';
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator';
import { ScrollView, Transition, Icon, Toast } from 'mand-mobile';
import { ceil } from 'lodash';
import { AsyncGetHistory, AsyncGetHeader } from '../api/modules.ts/friend/list';
import { getElementStyle } from '@/util/util.assist';
import { mixins } from 'vue-class-component';
import ActionSheetMixin from '@/mixin/ActionSheet';
import nativeMethod from '@/plugin/core/hesc/heschybird';
import dayjs from 'dayjs';
@Component({
  name: 'SelfHistory',
  components: {
    PageHeader,
    FriendsPreviewHeader,
    [ScrollView.name]: ScrollView,
    [Transition.name]: Transition,
  },
})
export default class SelfHistory extends mixins(ActionSheetMixin) {
  private list: any = [];
  private current: any = [];
  private dimensions = [];
  private scrollY = 0;
  private userId: any = '';
  private name: any = '';
  private isMe: any = true;
  /**
   * 头部图片的高度
   *
   * @private
   */
  private scrollImgHeight: number = 0;
  /**
   * 头部导航栏透明度
   */
  private headerTransparent: number = 0;

  /**
   * Ref FriendsPreviewHeader
   *
   * @memberof FriendsPreviewHeader
   */
  @Ref('FriendsPreviewHeader') readonly FriendsPreviewHeader!: {
    $el: HTMLElement;
  };
  /**
   * 姓名
   *
   * @memberof FriendsPreviewHeader
   */
  private get realname() {
    return UserModule.getRelName;
  }
  /**
   * 是否是本人查看
   */
  private get moreIcon() {
    return this.isMe ? 'more' : '';
  }
  private get activeBlockIndex() {
    let activeIndex: any = '';
    // let activeIndex = -1;
    this.dimensions.forEach((dimension, index) => {
      if (this.scrollY >= dimension[0] && this.scrollY <= dimension[1]) {
        activeIndex = this.list[index].year;
      }
    });
    return activeIndex;
  }
  /**
   * 本人userid
   */
  private get selfUserId() {
    return UserModule.userId;
  }
  /**
   * 后退事件
   */
  private backClickHandler() {
    this.$router.go(-1);
  }
  /**
   * 左侧点击事件
   */
  private rightBtnClickHandler() {
    if (!this.isMe) {
      return;
    }
    this.showActionSheet({
      value: true,
      options: [
        {
          text: '消息列表',
          value: '0',
        },
      ],
      cancelText: '取消',
      onSelected: this.checkedMessageList,
    });
  }
  /**
   * 日期是否一致
   */
  private isSame(day: any) {
    return !dayjs(+new Date()).isSame(dayjs(day), 'day');
  }
  /**
   * 查看历史消息
   */
  private checkedMessageList() {
    this.$router.push('/self/history/message');
  }
  /**
   * 拍照或者相册
   */
  private uploadClickHandler() {
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
   * 点击查看详情
   */
  private detailsClick(id: any) {
    this.$router.push({ path: '/self/history/look/details', query: { subjectid: id } });
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
   * 大图转为小图
   */
  private SetImageToSmall(image: string): string {
    return image.replace(/\.(png|jpg|gif|jpeg|webp)$/g, ($img: string) => `-small${$img}`);
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
  /**
   * 获取月 去除前置位0
   */
  private month(str: string): string {
    const o = ['11', '12'];
    const month = str.substring(0, 2);
    return o.includes(month) ? month : month.substring(1, 2);
  }
  private initScrollBlock() {
    // 获取滚动条元素所有的元素
    const blocks = this.$el.querySelectorAll('.scroll-view-category');
    // 获取今日div块的高度
    const todyHeight = this.$el.querySelectorAll('.today-view-list')[0].clientHeight;
    let offset = this.scrollImgHeight;
    Array.prototype.slice.call(blocks).forEach((block, index) => {
      // 每一个元素的高度
      const innerHeight = block.clientHeight;
      // 如果是第一条需要加上tody的高度
      if (index === 0) {
        this.$set(this.dimensions, index, [offset, offset + innerHeight + todyHeight]);
        offset += innerHeight + todyHeight;
      } else {
        this.$set(this.dimensions, index, [offset, offset + innerHeight]);
        offset += innerHeight;
      }
    });
  }
  private onScroll({ scrollTop }: { scrollTop: number }) {
    this.scrollY = scrollTop;
    // 保留一位小数
    const point = ceil(scrollTop / this.scrollImgHeight, 1);
    // 修改头部颜色的透明度
    this.headerTransparent = point > 1 ? 1 : point < 0 ? 0 : point;
  }
  /**
   * 获取元素属性
   *
   * @private
   */
  private getEleStyle(el: HTMLElement, style: string): number {
    return parseFloat(getElementStyle(el, style));
  }
  /* -------- async ------- */
  /**
   * 获取头部信息数据
   */
  private AsyncGetHeader() {
    AsyncGetHeader({
      // 参数列表
      lookid: this.userId,
    }).then((res: any) => {
      const { username, isMe } = res;
      this.name = username;
      this.isMe = isMe;
    });
  }
  /**
   * 获取user数据
   *
   * @promise
   */
  private GetListData(): any {
    return AsyncGetHistory({
      // 参数列表
      lookid: this.userId,
    })
      .then((res: any) => {
        this.list = res;
        const currentTime = +new Date(); //当前时间
        const year = dayjs(currentTime).format('YYYY'); //当前年
        const day = dayjs(currentTime).format('MM-DD'); //当前月
        // 提取当日的数据
        const list = [];
        res.forEach((item: any, index: number) => {
          if (item.year === year) {
            item.data.forEach((days: any, i: number) => {
              if (days.day === day) {
                this.current.push(...days.data);
                this.list[index].data.splice(i, 1);
              }
            });
          }
        });
        this.$nextTick(() => {
          this.initScrollBlock();
        });
      })
      .catch(err => {
        throw new Error(err);
      });
  }
  private mounted() {
    this.userId = this.$route.query.userId;
    this.GetListData();
    this.AsyncGetHeader();
    /**
     * 获取头部图片的高度
     */
    this.scrollImgHeight = this.getEleStyle(this.FriendsPreviewHeader.$el, 'height');
    // 如果内容发生变化，需重新初始化block和scroller
  }
}
</script>

<style scoped lang="scss">
.animated {
  animation-duration: 0.3s; // 动画执行时间
  animation-fill-mode: both;
}
.self_history {
  width: 100%;
  height: 100%;

  .layout-main {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(180deg, #2676e5 0%, #2676e5 40%, #ffffff 41%, #ffffff 100%);
    // padding-top: 87px;
    /* 滚动条内部 */
    .layout-main-scroll {
      position: relative;
      height: 100%;
      width: 100%;
      .scroll-view-category {
        background-color: #fff;
        padding-bottom: 60px;
        .scroll-view-category-title {
          height: 87px;
          font-size: 50px;
          color: #000;
        }
      }

      .scroll-view-striky-title {
        position: absolute;
        top: 87px;
        left: 0;
        right: 0;
        z-index: 2;
      }
      .scroll-view-category-title,
      .scroll-view-striky-title {
        padding: 0 0 0 30px;
        font-size: 32px;
      }
      .scroll-view-striky-title {
        padding: 5px 0px 5px 30px;
        background-color: #f2f2f2;
        color: #999999;
      }
    }
  }

  .scroll-view-list {
    width: 100%;
    background-color: #fff;
    .scroll-view-item {
      // min-height: 211px;
      width: 100%;
      padding: 30px 30px 0 30px;
      margin-bottom: 15px;
      .timer {
        width: 169px;
        .month {
          font-size: 28px;
          color: #333333;
          font-weight: normal;
          margin-left: 5px;
        }
        .day {
          font-size: 48px;
          color: #333333;
          font-weight: bold;
        }
      }
      .details {
        .details-item {
          width: 100%;
          margin-bottom: 20px;
          // &:active {
          //   background-color: rgb(228, 227, 227);
          // }
          .picture {
            margin-right: 7px;
            width: 150px;
            height: 150px;
            background-color: #f5f5f5;
            .photo {
              width: 100%;
              height: 100%;
              @include switch-img('~@img/photo');
              background-size: 68px;
              background-position: center;
            }
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .text {
            overflow: hidden;
            .textarea {
              font-size: 28px;
              color: #333333;
              text-align: left;
              padding-left: 6px;
              @include ellipsis-lines(2);
            }
            .image-page {
              padding-left: 6px;
              color: #4e4e4e;
              font-size: 22px;
            }
          }
          .textarea-noimg {
            width: 100%;
            background-color: #f5f5f5;
            padding: 10px;
            text-align: left;
            span {
              @include ellipsis-lines(3);
              font-size: 28px;
              color: #333333;
            }
          }
        }
      }
    }
    .tody-item {
      margin-bottom: 0px;
      padding-bottom: 30px;
      padding-top: 60px;
    }
  }
}
</style>
