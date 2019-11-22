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
        <div class="status">
          <ellipsis-plus
            :text="text"
            :line="5"
            expandText=''
            ref="ellipsis"
            :show-button="false"
          >
          </ellipsis-plus>
          <!-- 显示全文按钮 -->
          <div
            class="expand-btn"
            @click.stop="expandHandler"
            v-if='!show'
          >{{btnTxt}}</div>
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
import { Vue, Component, Prop, Emit, Ref } from 'vue-property-decorator';
import FunctionBar from '../../base/functionBar.vue';
import Ellipsis from 'ellipsis-plus';

@Component({
  name: 'friendsItem',
  components: {
    FunctionBar,
    [Ellipsis.name]: Ellipsis,
  },
})
export default class FriendsItem extends Vue {
  /*=============================================
  =                     data                    =
  =============================================*/
  private likesData: string[] = [];
  private btnTxt: string = '全文';
  private show: boolean = false;
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
  =                      Ref                    =
  =============================================*/

  /* -------- ellipsis-plus  ------- */
  /**
   *  滚动条Ref
   *
   *  @date 2019-11-11 19:57:20
   */

  @Ref('ellipsis') readonly ellipsis!: any;

  /*=============================================
  =                     Method                  =
  =============================================*/
  /* -------- Star  ------- */
  /**
   * 点亮-取消 赞
   *
   */
  private starThumbsUp(star: boolean) {}

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
        // height: 320px;
        // overflow: hidden;
        text-overflow: ellipsis;
        font-size: 30px;
        color: #333333;
        text-align: left;
        z-index: 16;
        .expand-btn {
          color: #576b95;
          font-size: 30px;
          margin-top: 10px;
          width: 100px;
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
