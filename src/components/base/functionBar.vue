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
          2小时前
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
            flex='cross:center main:justify'
            tabindex
            @click="thumbsUp"
          >
            <vue-star
              animate="animated bounceIn"
              color="#409EFF"
            >
              <md-icon
                slot="icon"
                svg
                name="praise"
                size="md"
                @click="startHandleClick"
              ></md-icon>
            </vue-star>
            <span>
              赞
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
import VueStar from 'vue-star';
@Component({
  name: 'functionBar',
  components: {
    VueStar,
    [Icon.name]: Icon,
    [Button.name]: Button,
  },
})
export default class FunctionBar extends Vue {
  /*=============================================
  =                    Star                     =
  =============================================*/

  /**
   * 点赞按钮点击事件
   *
   * @author weiyafei
   * @date 2019-11-15-22:26:56
   */
  private thumbsUp() {
    console.log('dianji');
    this.startHandleClick();
  }
  /**
   * 点赞icon点击事件
   *
   * @author weiyafei
   * @date 2019-11-15-22:25:15
   */
  private startHandleClick(): void {
    console.log('点击了');
  }

  /*=====  End of Star comment block  ======*/
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
      /* 点赞 */
      .operating {
        width: 289px;
        height: 100%;
        font-size: 28px;
        color: #999999;
        .thumbs-up {
          padding-left: 20px;
          padding-right: 10px;
          position: relative;
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
      /* 点赞的人数 */
      .like {
      }
      /* 评价 */
      .evaluation {
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
// /* 点赞组件 */
// .VueStar {
//   width: 100%;
//   height: 100%;
//   left: 0px;
//   /deep/.VueStar__ground {
//     width: 100%;
//     height: 100%;
//     justify-content: left;
//     padding-left: 15px;
//     /deep/.VueStar__decoration {
//       left: -34px;
//       top: -27px;
//     }
//     .VueStar__icon {
//       // width: 100%;
//       // height: 100%;

//       // .md-icon {
//       //   position: absolute;
//       //   @include center-translate(y);
//       //   left: 10px;
//       // }
//     }
//     // /deep/.VueStar__decoration{
//     //     width: 100%;
//     //     height: 100%;
//     // }
//   }
// }
</style>
