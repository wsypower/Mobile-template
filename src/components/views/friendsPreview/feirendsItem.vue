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
        <!-- 6行显示省略号 -->
        <div
          class="status"
          flex
        >
          <!-- 8 行显示省略号 -->
          <span>
            {{text}}
          </span>
        </div>
      </header>
      <main></main>
      <!-- 功能栏 -->
      <function-bar
        :star='star'
        :time='time'
        :likes='likes'
        @thumbs-up='starThumbsUp'
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import FunctionBar from '../../base/functionBar.vue';
@Component({
  name: 'friendsItem',
  components: {
    FunctionBar,
  },
})
export default class FriendsItem extends Vue {
  /*=============================================
  =                     data                    =
  =============================================*/
  private likesData: string[] = [];
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
  /*=============================================
  =                   Computed                  =
  =============================================*/

  /*=============================================
  =                     Method                  =
  =============================================*/
  /* -------- Star  ------- */
  /**
   * 点亮-取消 赞
   *
   */
  private starThumbsUp(star: boolean) {}
  /*=============================================
  =                    Mounted                  =
  =============================================*/

  private mounted(): void {
    //   // 复制likes
    // this.likesData = this.likes;
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
          font-weight: 600;
          text-align: left;
        }
      }
      /* 发布的日志 */
      .status {
        padding-top: 10px;
        span {
          font-size: 30px;
          color: #333333;
          text-align: left;
          //8 行显示省略号
          @include ellipsis-lines(8);
        }
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
