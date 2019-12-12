<template>
  <div class="scroll-page-wrap">
    <!-- 滚动组件 start :manual-init='true'-->
    <md-scroll-view
      ref="scrollView"
      :scrolling-x="false"
      @scroll="onScroll"
      @refreshing="onRefresh"
      @end-reached="onEndReached"
      auto-reflow
      
    >
      <!-- 下拉刷新 start-->
      <md-scroll-view-refresh
        slot="refresh"
        slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
        :scroll-top="scrollTop"
        :is-refreshing="isRefreshing"
        roller-color="#fff"
      ></md-scroll-view-refresh>
      <!-- 下拉刷新 end-->
      <!-- 头部插槽 -->
      <slot name="header"></slot>
      <!-- 主要滚动区域插槽 start-->
      <slot name="body">
        <!-- 插槽默认空白页面 start-->
        <div class="result-page">
          <md-result-page :buttons="scrollButton"></md-result-page>
        </div>
        <!-- 插槽默认空白页面 end-->
      </slot>
      <!-- 主要滚动区域插槽 end-->

      <!-- 尾部插槽 start-->
      <slot name="footer"></slot>
      <!-- 上拉加载 start -->
      <md-scroll-view-more
        slot="more"
        :is-finished="isFinished"
      >
      </md-scroll-view-more>
      <!-- 上拉加载 end -->

      <!-- 尾部插槽 end-->
    </md-scroll-view>
    <!-- 滚动组件 end-->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Ref, Watch } from 'vue-property-decorator';
import { ScrollView, ScrollViewRefresh, ScrollViewMore, ResultPage } from 'mand-mobile';
import { MandComponent } from 'mand-mobile/types/component';

@Component({
  name: 'scrollPageWrap',
  components: {
    [ScrollView.name]: ScrollView,
    [ScrollViewRefresh.name]: ScrollViewRefresh,
    [ScrollViewMore.name]: ScrollViewMore,
    [ResultPage.name]: ResultPage,
  },
})
export default class ScrollPageWrap extends Vue {
  /*=============================================
  =                    空白页面                  =
  =============================================*/
  @Prop({
    type: String,
    default: '',
  })
  scrollButtonText!: String;
  /**
   * 空白按钮
   * @date 2019-11-12 19:55:20
   */
  @Prop({
    default: '',
  })
  scrollButton!: any[];

  /**
   * 上拉加载
   * 全部已加载
   */
  @Prop({
    type: Boolean,
  })
  isFinished!: boolean;

  /*==========       空白页面 End     *==========*/

  /*=============================================
  =                滚动条事件 Start               =
  =============================================*/
  /**
   *  滚动条Ref
   *
   *  @date 2019-11-11 19:57:20
   */

  @Ref('scrollView') readonly scrollView!: { [propName: string]: () => void };

  /**
   *  抛出滚动点位 point
   *  @param { scrollLeft, scrollTop }
   *  @date 2019-11-11 19:57:20
   */
  @Emit('scrollTop')
  private onScroll({ scrollLeft, scrollTop }: { scrollLeft: number; scrollTop: number }) {
    // console.log(` scrollTop: ${scrollTop as number}`);
  }

  /**
   *  下拉刷新触发事件
   *  @prompt 需要 finishRefresh 触发刷新
   *  @date 2019-11-11 19:57:20
   */
  @Emit('onRefresh')
  private onRefresh() {
    console.log(`下拉读取数据事件`);
  }
  /**
   *  上拉加载
   *  @prompt 需要 finishRefresh 触发刷新
   *  @date 2019-11-11 19:57:20
   */
  @Emit('onEndReached')
  private onEndReached() {
    console.log('上拉读取数据事件');
  }
  mounted() {}
  /*==========      滚动条事件end    *==========*/
}
</script>

<style scoped lang="scss">
/* 滚动组件 */
.scroll-page-wrap {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(180deg, #2676e5 0%, #2676e5 45%, #ffffff 46%, #ffffff 100%);
  /*=============================================
  =                    滚动组件                  =
  =============================================*/
  /* 上拉刷新 */
  /deep/ .scroll-view-refresh {
    .refresh-tip {
      color: #fff;
    }
  }
  /*=============================================
  =                  空白页面                    =
  =============================================*/
  .result-page {
    width: 100%;
    background-color: #fff;
    padding-top: 100px;
    /* 空白提示 */
    /deep/.md-result-text {
      color: rgb(158, 165, 177);
    }
    /* 空白提示按钮 */
    /deep/.md-result-buttons {
      margin-top: 50px;
    }
  }
}
</style>
