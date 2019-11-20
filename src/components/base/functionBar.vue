<template>
  <div class="function-bar__layout">
    <main>
      <!-- 功能栏 start-->
      <div
        class="function-bar"
        flex="dir:left main:justify cross:center"
      >
        <!-- 时间 start-->
        <div class="tiemer">
          {{ time | RelativeTime }}
        </div>
        <!-- 时间 end-->
        <!-- 按钮 start-->
        <div
          class="operating"
          flex="dir:left box:mean"
        >
          <!-- 赞 start-->
          <div
            class="thumbs-up border-right-1px tabindex"
            flex='cross:center main:justify dir:left'
            tabindex
            @click="thumbsUp"
          >
            <ty-star
              animate="animated bounceIn"
              color="#409EFF"
              :active='star'
            >
              <md-icon
                slot="icon"
                svg
                name="praise"
                size="md"
                @click="startHandleClick"
              ></md-icon>
            </ty-star>
            <span
              class="thumbs-up-text"
              flex="main:right"
              :style='{color:ColorValue}'
            >
              {{starText}}
            </span>
          </div>
          <!-- 赞 end-->
          <!-- 评论 start-->
          <div
            class="evaluation-btn tabindex"
            flex='cross:center main:justify'
            tabindex
          >
            <md-icon
              svg
              name="message"
              size="md"
              color="#999999"
            ></md-icon>
            <span>
              评论
            </span>
          </div>
          <!-- 评论 end-->
        </div>
        <!-- 按钮 end-->
      </div>
      <!-- 功能栏 end-->
      <!-- 评价点赞 -->
      <div class="evaluation">
        <!-- 点赞 -->
        <div class="like"></div>
        <!-- 评价 -->
        <div class="evaluation"></div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Icon, Button } from 'mand-mobile';
import TyStar from '@/components/base/star/TyStar.vue';
@Component({
  name: 'functionBar',
  components: {
    TyStar,
    [Icon.name]: Icon,
    [Button.name]: Button,
  },
})
export default class FunctionBar extends Vue {
  /*=============================================
  =                     Prop                    =
  =============================================*/
  /**
   * 点赞状态
   * @description 名字
   */
  @Prop({
    type: Boolean,
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
  /*=============================================
  =                   Computed                  =
  =============================================*/

  /* -------- Star  ------- */
  /**
   * 点亮动画
   *
   */
  private get ColorValue(): string {
    return this.star ? `#409EFF` : `#999999`;
  }

  /**
   * 点击后 icon 颜色
   *
   * @param {String} color
   */
  private get starText(): string {
    return this.star ? `取消` : `赞`;
  }

  /*=============================================
  =                    Method                   =
  =============================================*/
  /* -------- Star  ------- */

  /**
   * 点赞按钮点击事件
   * 异步上传点赞切换
   *
   * @author weiyafei
   * @date 2019-11-15-22:26:56
   */
  private thumbsUp() {
    console.log('点击了');
    this.star = !this.star;
    console.log(this.star);
  }

  /**
   * 点赞icon点击事件
   *
   * @author weiyafei
   * @date 2019-11-15-22:25:15
   */
  /*=====  End of Star comment block  ======*/
  /*=============================================
  =                    Mounted                   =
  =============================================*/
  // private mounted() {
  // }
}
</script>

<style scoped lang="scss">
/* 朋友圈item 功能栏 */
.function-bar__layout {
  width: 100%;
  min-height: 88px;
  main {
    /* 功能栏 */
    .function-bar {
      width: 100%;
      height: 88px;
      font-size: 28px;
      color: #999999;
      /* 时间 */
      .tiemer {
        font-size: 28px;
        color: #999999;
      }
      /* 点赞按钮 */
      .operating {
        width: 320px;
        height: 100%;
        font-size: 28px;
        color: #999999;
        .thumbs-up {
          padding-left: 20px;
          padding-right: 10px;
          position: relative;
          /* 点赞文字 */
          .thumbs-up-text {
            width: 60%;
            @include center-translate(x);
            left: 90px;
          }
        }
        .evaluation-btn {
          height: 100%;
          padding-left: 20px;
          padding-right: 10px;
        }
      }
    }
    /* 评价栏 */
    .evaluation {
      width: 100%;
      background-color: #fff;
      /* 点赞的人数 */
      .like {
        width: 100%;
      }
      /* 评价 */
      .evaluation {
        width: 100%;
      }
    }
  }
  /* 1px兼容 */
  .border-right-1px {
    &::after {
      border-color: #e0e0e0;
    }
  }
  /* 给div添加 active fouce */
  .tabindex {
    transition: all 0.3s;
    &:active {
      background-color: #f7f5f5;
    }
  }
}
/* 点赞组件 */
/deep/.TyStar {
  @include center-translate();
  left: 30px;
  top: 47px;
}

// .VueStar {
//   width: 100%;
//   height: 100%;
//   left: 0px;
//   /deep/.VueStar__ground {
//     width: 100%;
//     height: 100%;
//     .VueStar__icon {
//       width: 100%;
//       height: 100%;
//       .md-icon {
//         position: absolute;
//         @include center-translate();
//       }
//     }
//     /deep/.VueStar__decoration {
//       @include center-translate();
//     }
//   }
// }
</style>
