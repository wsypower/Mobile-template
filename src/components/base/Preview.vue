<template>
  <div class="details-basic">
    <div
      class="layout-header"
      flex="dir:left box:first"
    >
      <div class="frends_item—left">
        <div class="avatar"></div>
      </div>
      <div class="frends_item—right">
        <header>
          <!-- 姓名 star-->
          <div
            class="title"
            flex
          >
            <span>
              {{name}}
            </span>
          </div>
          <!-- 姓名 end-->
          <!-- 文本外包围 -->
          <div
            class="status"
            ref='textArea'
          >
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
        <!-- 图片插看 star-->
        <viewer
          v-if='images.length!==0'
          :images='images'
        />
        <!-- 图片插看 star-->

        <!-- 日期和删除 -->
        <div
          class="function-bar"
          flex="main:left cross:center"
        >
          <div class="timer">
            {{+new Date |  date_format}}
          </div>
          <div class="delete">
            删除
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="layout-main">
      11111
    </div> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Model } from 'vue-property-decorator';
import Viewer from '@/components/base/viewer/viewer.vue';
import Ellipsis from 'ellipsis-plus';
@Component({
  name: 'Preview',
  components: {
    [Ellipsis.name]: Ellipsis,
    Viewer,
  },
})
export default class Preview extends Vue {
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
  })
  text!: string;

  /**
   * 时间戳(发布的时间)
   */
  @Prop({
    type: String,
    default: '1572943299000',
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
   * 发布者名字
   * @description 名字
   */
  @Prop({
    type: String,
    default: '张三',
  })
  name!: string;

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
  /*=============================================
  =                    Mounted                  =
  =============================================*/

  private mounted(): void {
    // 判断是否显示隐藏展开全文功能那个
    this.show = this.ellipsis.show;
  }
  /*=============================================
  =                    Mounted                  =
  =============================================*/
}
</script>

<style scoped lang="scss">
.details-basic {
  margin-top: 15px;
  width: 100%;
  background-color: #fff;
  /* 上半部分 */
  .layout-header {
    width: 100%;
    // padding: 30px 30px 0px 30px;
    /* 头像 */
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
    .function-bar {
      width: 100%;
      height: 80px;
      .timer {
        font-size: 28px;
      }
      .delete {
        font-size: 30px;
        margin-left: 25px;
        color: #566b94;
      }
    }
  }
  /* 功能栏和评论 */
  .layout-main {
    width: 100%;
    height: 50px;
    background-color: red;
  }
}
</style>