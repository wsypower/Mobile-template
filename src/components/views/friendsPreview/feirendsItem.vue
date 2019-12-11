<template>
  <div
    class="frends_item"
    flex="dir:left box:first"
  >
    <div class="frends_item—left">
      <div class="avatar"></div>
    </div>
    <div class="frends_item—right border-bottom-1px">
      <header>
        <div
          class="title"
          flex
        >
          <span>
            {{name}}
          </span>
        </div>
        <!-- 文本外包围 -->
        <div
          class="status"
          v-longtap:[arg]='longTouch'
          ref='textArea'
          :class="{ 'text_active': longTouchShow}"
        >
          <div
            class="tip-btn"
            ref='tipbtn'
            tabindex
            v-if="longTouchShow"
            v-clipboard="text"
            v-clipboard:success="clipboardSuccessHandler"
            v-clipboard:error="clipboardErrorHandler"
          >
            复制
          </div>
          <ellipsis-plus
            :text="text"
            :line="6"
            expandText=''
            ref="ellipsis"
            :show-button="false"
          >
          </ellipsis-plus>
          <!-- 显示全文按钮 -->
          <div
            class="expand-btn"
            @click.stop.prevent="expandHandler"
            v-if='!show'
          >{{btnTxt}}</div>
        </div>
      </header>
      <!-- 图片插看 -->
      <viewer
        v-if='!images.length'
        :images='images'
      />
      <!-- 视屏 -->
      <!-- <video-basic v-if="video!==null"></video-basic> -->
      <!-- 功能栏 -->
      <function-bar
        :star='star'
        :time='time'
        :likes='likes'
        @thumbs-up='starThumbsUp'
        :comment=comment
        v-model='point'
        @comment-handler='commentHandler'
        @comment-reply='commentReply'
        @delete='deleteHandler'
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Ref, Watch, Model } from 'vue-property-decorator';
import FunctionBar from '../../base/functionBar.vue';
import Ellipsis from 'ellipsis-plus';
import { Toast } from 'mand-mobile';
import Viewer from '../../base/viewer/viewer.vue';
import VideoBasic from '../../base/video/video.vue';

@Component({
  name: 'friendsItem',
  components: {
    FunctionBar,
    [Ellipsis.name]: Ellipsis,

    Viewer,
    VideoBasic,
  },
})
export default class FriendsItem extends Vue {
  /*=============================================
  =                     data                    =
  =============================================*/
  private likesData: string[] = [];
  private btnTxt: string = '全文';
  private show: boolean = false;
  private longTouchShow: boolean = false;
  /*=============================================
  =                     Prop                    =
  =============================================*/
  /**
   * 空白按钮
   * @date 2019-11-12 19:55:20
   */
  @Prop({
    type: String,
    default: '',
  })
  text!: string;

  /**
   * 是否激活点赞标记
   */
  @Prop({
    type: Boolean,
    default: '',
  })
  star!: boolean;

  /**
   * 时间戳
   * @description 名字
   */
  @Prop({
    type: String,
  })
  time!: string;

  /**
   * 图片
   */
  @Prop({
    type: Array,
  })
  images!: any[];

  /**
   * 视屏
   */
  @Prop({
    type: String,
  })
  video!: string | null;
  /**
   * 发布者名字
   * @description 名字
   */
  @Prop({
    type: String,
  })
  name!: string;

  /**
   * 点赞的人
   * @description 名字
   */
  @Prop({
    type: Array,
    default: [],
  })
  likes!: string[];

  /**
   * 评论
   */
  @Prop({
    type: Array,
  })
  comment!: any[];

  /**
   * 评论
   */
  @Prop({
    type: Number,
  })
  index!: number;
  /**
   * 滚动条位置
   */
  @Model('change', { type: Number }) readonly point!: number;

  /*=============================================
  =                    Watch                     =
  =============================================*/

  /**
   * 滚动条
   *
   */
  @Watch('point')
  onPointChanged(val: number, oldVal: number): void {
    this.longTouchShow = false;
  }

  /*=============================================
  =                      Ref                    =
  =============================================*/

  /* -------- ellipsis-plus  ------- */
  /**
   *  滚动条Ref
   *
   *  @date 2019-11-11 19:57:20
   */

  @Ref('ellipsis') readonly ellipsis!: any;

  /**
   *  文本区域
   */
  @Ref('textArea') readonly textArea!: any;

  /**
   * 复制按钮
   */
  @Ref('tipbtn') readonly tipbtn!: any;
  /*=============================================
  =                     Method                  =
  =============================================*/
  /* -------- Star  ------- */
  /**
   * 点亮-取消 赞
   *
   */
  @Emit('starThumbsUp')
  private starThumbsUp(star: boolean): boolean {
    return star;
  }
  /**
   * 评论按钮被点击
   */
  @Emit('comment-handler')
  private commentHandler({ e, comment }: { e: Event; comment: number }) {
    return { e, comment, index: this.index };
  }
  /**
   * 删除本条
   */
  @Emit('delete')
  private deleteHandler() {
    return this.index;
  }
  /* -------- ellipsis-plus  ------- */
  /**
   * 点击展开全文
   */
  private expandHandler() {
    if (this.ellipsis.show) {
      this.ellipsis.collapse();
      this.btnTxt = '全文';
    } else {
      this.ellipsis.expand();
      this.btnTxt = '收起';
    }
  }
  /**
   * 开启复制按钮
   */
  private longTouch() {
    this.longTouchShow = true;
    this.$nextTick(() => {
      const btn = document.querySelectorAll('.tip-btn')[0];
      console.log(btn);
      this.$root.$el.addEventListener(
        'touchstart',
        // 关闭复制
        (event: Event) => {
          if (event.target !== btn) {
            this.longTouchShow = false;
          }
        },
        {
          once: true,
        },
      );
    });
  }

  /**
   * 关闭复制按钮
   */
  private closeLongTouch(e: Event) {
    this.longTouchShow = false;
  }
  /**
   * 复制文本 成功
   */
  private clipboardSuccessHandler() {
    this.longTouchShow = false;
    Toast.succeed('复制成功', 1000);
  }

  /**
   * 复制文本 失败
   */
  private clipboardErrorHandler() {
    this.longTouchShow = false;
    Toast.failed('系统不支持', 1000);
  }

  /**
   * 评论栏长按回复他人
   */
  @Emit('comment-reply')
  private commentReply({ label, index }: { label: string; index: number }) {
    console.log({ label, index: this.index, commentIndex: index });
    return { label, index: this.index, commentIndex: index };
  }
  /*=============================================
  =                    Mounted                  =
  =============================================*/

  private mounted(): void {
    // 判断是否显示隐藏展开全文功能那个
    this.show = this.ellipsis.show;
    console.log(this.images.length)
  }
}
</script>

<style scoped lang="scss">
/* 朋友圈 item */
.frends_item {
  width: 100%;
  padding: 30px 30px 0px 30px;
  background-color: #fff;
  /* 左侧布局 */
  .frends_item—left {
    width: 104px;
    /* 头像 */
    .avatar {
      width: 84px;
      height: 84px;
      @include switch-img('~@img/friends-items');
    }
  }
  /* 右侧布局 */
  .frends_item—right {
    header {
      width: 100%;
      /* 姓名 */
      .title {
        span {
          font-size: 32px;
          color: #576b95;
          font-weight: bold;
          text-align: left;
        }
      }
      /* 发布的日志 */

      .status {
        padding-top: 10px;
        // height: 320px;
        // overflow: hidden;
        text-overflow: ellipsis;
        font-size: 30px;
        color: #333333;
        text-align: left;
        z-index: 20;
        position: relative;
        .tip-btn {
          position: absolute;
          width: 150px;
          height: 70px;
          background-color: #41485d;
          font-size: 28px;
          border-radius: 18px;
          @include center-translate(x);
          top: -90px;
          color: #fff;
          text-align: center;
          line-height: 75px;
          &::after {
            content: '';
            position: absolute;
            bottom: -18px; //inherit
            @include triangle(bottom, 20px, #41485d);
            @include center-translate(x);
          }
          &:active {
            background-color: rgb(116, 118, 119);
            &::after {
              @include triangle(bottom, 20px, rgb(116, 118, 119));
            }
          }
        }
        .expand-btn {
          color: #576b95;
          font-size: 30px;
          margin-top: 10px;
          width: 100px;
          display: inline-block;
        }
      }
      .text_active {
        /deep/.ellipsis-plus {
          background-color: rgb(227, 226, 226);
        }
      }
      .fullText {
        width: 100%;
        height: 50px;
        color: #000;
        background-color: sandybrown;
      }
    }
    main {
      width: 100%;
      height: auto;
      background-color: #f5f5f5;
    }
  }
  /* 1px兼容 */
  .border-bottom-1px {
    &::after {
      border-color: #e0e0e0;
    }
  }
}
</style>
