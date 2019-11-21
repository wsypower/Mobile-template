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
            class="thumbs-up  verticalLine"
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
            class="evaluation-btn "
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
        <!-- <md-transition name='md-fade-up'> -->
        <div
          transition="md-slide-down"
          class="like"
          v-if='likes.length>0 || star'
        >
          <!-- 心 -->
          <md-icon
            slot="icon"
            svg
            name="heart"
            size="md"
            color='#576B95'
          ></md-icon>
          <!-- 点赞的人 -->
          <span class="like_people">
            {{ likeString }}
            <!-- 李渊，李康，李航，李渊，李康，李航，李渊，李康，李航，李渊，李康，李航， -->
          </span>
        </div>
        <!-- </md-transition> -->
        <!-- 评价 -->
        <div class="evaluation"></div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Icon, Button, Transition } from 'mand-mobile';
import TyStar from '@/components/base/star/TyStar.vue';
import { UserModule } from '@/store/modules/user';
@Component({
  name: 'functionBar',
  components: {
    TyStar,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Transition.name]: Transition,
  },
})
export default class FunctionBar extends Vue {
  /*=============================================
  =                     Prop                    =
  =============================================*/
  /**
   * 点赞状态
   * @description
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

  /**
   * 点赞的人
   * @description 名字
   */
  @Prop({
    type: Array,
    default: ['李渊', '李康', '李航'],
  })
  likes!: string[];
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

  /**
   * 用户名字
   *
   * @param {String} color
   */
  private get realName(): string {
    return UserModule.getRelName;
  }
  /* -------- 点赞人数  ------- */
  /**
   * 数组转为字符串
   * @description
   * 添加或者取消自己姓名
   */
  private get likeString(): string {
    return !this.star
      ? this.likes.join(`, `)
      : this.likes.length === 0
      ? `${this.realName}`
      : `${this.realName}, ${this.likes.join(`, `)}`;
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
  @Emit('thumbs-up')
  private thumbsUp(): boolean {
    this.star = !this.star;
    return this.star;
  }
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
      height: auto;
      background-color: #fff;
      &.border-bottom-1px {
        &::after {
          border-color: #dddddd;
        }
      }
      /* 点赞的人数 */
      .like {
        width: 100%;
        min-height: 68px;
        background-color: #f5f5f5;
        margin-bottom: 30px;
        position: relative;
        padding: 10px 20px;
        color: #576b95;
        text-align: left;
        &::before {
          content: '';
          position: absolute;
          top: -14px;
          left: 35px;
          @include triangle(top, 15px, #f5f5f5);
        }
        /deep/.md-icon {
          position: relative;
          top: 6px;
          left: 5px;
        }
        .like_people {
          color: #576b95;
          padding-left: 20px;
          font-size: 28px;
          font-weight: 600;
        }
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
/* 竖线 */
.verticalLine {
  position: relative;
  &::after {
    content: '';
    width: 1px;
    height: 30px;
    background-color: #dddddd;
    position: absolute;
    right: 0px;
  }
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
