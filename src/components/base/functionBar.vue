<template>
  <div
    class="function-bar__layout"
    ref='bar'
  >
    <main>
      <!-- 时间栏 （当属于详情时候显示） -->
      <div
        class="detailsTime"
        flex='main:left'
        v-if='isDetails'
      >{{time | date_format}}</div>
      <!-- 功能栏 start-->
      <div
        class="function-bar"
        :class="{ details: isDetails }"
        flex="dir:left main:justify cross:center"
      >
        <!-- 时间 start-->
        <div class="tiemer">
          <span v-if='!isDetails'>{{ time | RelativeTime }}</span>
          <span
            class="delete"
            :class="{ detailsDelete: isDetails }"
            v-if='queryid === UserId'
            @click='deleteRoleHandler'
          > 删除 </span>
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
            @click='commentHandler'
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
      <div
        class="evaluation"
        ref='evaluation'
      >
        <!-- 点赞 -->
        <div
          transition="md-slide-down"
          class="like"
          v-if='likes.length>0|| star'
          flex="dir:left cross:center"
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
          <div class="like_people">
            <span v-if='star'>
              {{`${realName}`}}
              <i v-if='likes.length'>,</i>
            </span>
            <span
              v-for="(item,index) in likes"
              :key='item.userId'
            >
              {{`${item.username}`}}
              <i v-if='index+1!==likes.length'>,</i>
            </span>
          </div>
        </div>
        <!-- 评价 star-->
        <div
          class="comment"
          v-if='comment.length!==0'
        >
          <div
            class="comment-items "
            :class="{'border-top-1px':borderActive}"
          >
            <div
              class="comment-item"
              v-for="(item,index) in comment"
              :key='index'
              :class="{'clipboard-success':longTouchShow === index}"
              tabindex
              v-longtap:[index]='{time: 600,handler:longTouch}'
            >
              <sapn v-if='item.replyname'>
                <span class="item-label">{{item.username}}</span>
                回复
                <span class="item-label">{{`${item.replyname}：`}}</span>
              </sapn>

              <sapn
                class="item-label"
                v-else
              >{{`${item.username}：`}}</sapn>

              <sapn
                class="item-value"
                @click='commentReply(item,index)'
              >{{item.content}} </sapn>
              <!-- 长按复制 -->
              <div
                class="tip-btn"
                tabindex
                v-if="longTouchShow === index"
                flex
              >
                <div
                  class="press-btn"
                  ref='copybtn'
                  tabindex
                  v-clipboard="item.content"
                  v-clipboard:success="clipboardSuccessHandler"
                  v-clipboard:error="clipboardErrorHandler"
                >复制</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch, Ref } from 'vue-property-decorator';
import { Icon, Button, Transition } from 'mand-mobile';
import TyStar from '@/components/base/star/TyStar.vue';
import { UserModule } from '@/store/modules/user';
import Ellipsis from 'ellipsis-plus';
import { Toast } from 'mand-mobile';
import { deleteRole } from '../../api/example';
import { getElementStyle } from '@/util/util.assist';
@Component({
  name: 'functionBar',
  components: {
    TyStar,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Transition.name]: Transition,
    [Ellipsis.name]: Ellipsis,
  },
})
export default class FunctionBar extends Vue {
  /*=============================================
  =                     Data                    =
  =============================================*/
  /**
   * 评论条目复制
   */
  private longTouchShow: number = -1;
  private clipboardSuccess: boolean = false;
  /*=============================================
  =                     Prop                    =
  =============================================*/
  /**
   * 如果是详情页面布局具有部分差异
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  isDetails!: boolean;
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

  /**
   * 评论
   */
  @Prop({
    type: Array,
  })
  comment!: any[];

  /**
   * 案卷id
   */
  @Prop({
    type: String,
  })
  id!: string;

  /**
   * 案卷发布人id
   */
  @Prop({
    type: String,
  })
  queryid!: string;
  /**
   * 滚动条位置
   */
  /*=============================================
  =                    Ref                     =
  =============================================*/

  @Ref('evaluation') readonly evaluation!: HTMLElement;
  @Ref('bar') readonly bar!: HTMLElement;
  @Ref('copybtn') readonly copybtn!: HTMLElement;
  /*=============================================
  =                    Watch                     =
  =============================================*/

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
  /**
   * userId
   *
   * @memberof FriendsPreviewHeader
   */
  private get UserId() {
    return UserModule.userId;
  }
  /* -------- 点赞人数  ------- */
  /**
   * 数组转为字符串
   * @description
   * 添加或者取消自己姓名
   */
  private get likeString(): any {
    return !this.star
      ? this.likes.join(`, `)
      : this.likes.length === 0
      ? `${this.realName}`
      : `${this.realName}, ${this.likes.join(`, `)}`;
    // return this.star
  }

  private get borderActive(): boolean {
    return this.likes.length > 0 || this.star;
  }

  /*=============================================
  =                    Method                   =
  =============================================*/
  /**
   * 删除本条
   */
  @Emit('delete')
  private deleteRoleHandler() {
    return this.id;
  }
  /**
   * 开启复制按钮
   */
  private longTouch(event: Event, index: number) {
    console.log(index);
    this.longTouchShow = index;
    this.$nextTick(() => {
      const btn: any = this.copybtn;
      this.$root.$el.addEventListener(
        'touchstart',
        // 关闭复制
        (event: Event) => {
          if (event.target === btn[0]) {
            return;
          } else {
            this.longTouchShow = -1;
          }
        },
        // 只调用一次
        {
          once: true,
        },
      );
    });
  }

  /**
   * 复制文本 成功
   */
  private clipboardSuccessHandler() {
    this.longTouchShow = -1;
    Toast.succeed('复制成功', 1000);
  }

  /**
   * 复制文本 失败
   */
  private clipboardErrorHandler() {
    this.longTouchShow = -1;
    Toast.failed('系统不支持', 1000);
  }
  /**
   * 点击文本回复
   */
  @Emit('comment-reply')
  private commentReply(item: any, index: number) {
    console.log(index);
    console.log(item);
    if (this.longTouchShow !== -1) {
      return { label: '', index };
    }
    return { commentItem: item, index };
  }
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
  /**
   * 评论按钮被点击
   */
  @Emit('comment-handler')
  private commentHandler() {
    /**
     * 获取头部图片的高度
     */
    console.log('初始点击');
  }

  /**
   * 获取元素属性
   *
   * @private
   */
  private getEleStyle(el: HTMLElement, style: string): number {
    return parseFloat(getElementStyle(el, style));
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
  margin-bottom: 30px;
  .detailsTime {
    font-size: 28px;
    color: #999999;
    padding-left: 100px;
  }
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
        .delete {
          margin-left: 10px;
          color: #62759b;
        }
        .detailsDelete {
          margin-left: 0px;
        }
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
    .details {
      padding-left: 100px;
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
        // margin-bottom: 30px;
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
          // position: relative;
          // top: 6px;
          // left: 5px;
        }
        .like_people {
          color: #576b95;
          padding-left: 20px;
          font-size: 28px;
          font-weight: bold;
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
// 评论
.comment {
  width: 100%;
  background-color: #f7f5f5;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: -14px;
    left: 35px;
    @include triangle(top, 15px, #f5f5f5);
  }
  .comment-items {
    width: 100%;
    min-height: 68px;
    &.border-top-1px {
      &::before {
        border-color: #dddddd;
      }
    }
    .comment-item {
      padding: 5px 20px 5px 20px;
      width: 100%;
      min-height: 50px;
      text-align: left;
      color: #333333;
      font-size: 28px;
      position: relative;
      span {
        font-size: 28px;
      }
      &.clipboard-success {
        background-color: #dcdada;
      }
      .item-label {
        color: #576b95;
        font-weight: bold;
        font-size: 28px;
      }
      .item-value {
        color: #333333;
        font-size: 28px;
      }
      &:active {
        background-color: #dcdada;
      }
      @include first(1) {
        padding-top: 15px;
      }
      @include last(1) {
        padding-bottom: 15px;
      }
      .tip-btn {
        position: absolute;
        // width: 150px;
        height: 70px;
        background-color: #41485d;
        font-size: 28px;
        border-radius: 18px;
        @include center-translate(x);
        top: -90px;
        color: #fff;
        text-align: center;
        line-height: 75px;
        z-index: 15;
        &::after {
          content: '';
          position: absolute;
          bottom: -18px;
          @include center-translate(x);
        }
        .press-btn {
          width: 150px;
          height: 70px;
          background-color: red;
          border-radius: 18px;
          background-color: #41485d;
          position: relative;
          &:active {
            background-color: rgb(116, 118, 119);
          }
          @include last(1) {
            &::after {
              content: '';
              position: absolute;
              bottom: -18px;
              left: 0px;
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
        }
      }
    }
  }
}
</style>
