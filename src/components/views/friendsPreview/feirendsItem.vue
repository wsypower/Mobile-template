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
            白云支队
          </span>
        </div>
        <!-- 6行显示省略号 -->
        <div
          class="status"
          flex
        >
          <!-- 8 行显示省略号 -->
          <span>
            标题字体会加重突出显示标题字体
            会加重突出显示标题字体会加重突出显示标题字
            体会加重突出显示标题字体会加重突出显示标题字体会加重突出显示标
            题字体会加重突出显示标题字体会加重突出显示标题字体会加重
            突出显示标题字体会加重突出显示
            标题字体会加重突出显示标题字体
            会加重突出显示标题字体会加重突出显示标题字
            体会加重突出显示标题字体会加重突出显示标题字体会加重突出显示标
            题字体会加重突出显示标题字体会加重突出显示标题字体会加重
            突出显示标题字体会加重突出显示
          </span>
        </div>
      </header>
      <main></main>
      <!-- 功能栏 -->
      <function-bar />
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
export default class FriendsItem extends Vue {}
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
