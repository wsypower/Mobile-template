<template>
  <div class="scroll-page-wrap">
    <md-scroll-view
      ref="scrollView"
      :scrolling-x="false"
      @scroll="onScroll"
      @refreshing="onRefresh"
    >
      <!-- 下拉刷新 -->
      <md-scroll-view-refresh
        slot="refresh"
        slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
        :scroll-top="scrollTop"
        :is-refreshing="isRefreshing"
        :is-refresh-active="isRefreshActive"
      ></md-scroll-view-refresh>
      <slot></slot>
      <div v-for="index in list" class="scroll-view-item" :key="index" @click="onItemClick(i)">
        {{ index }}
      </div>
      <!-- 上拉加载 -->
    </md-scroll-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { ScrollView, ScrollViewRefresh, ScrollViewMore } from 'mand-mobile';
@Component({
  name: 'scrollPageWrap',
  components: {
    [ScrollView.name]: ScrollView,
    [ScrollViewRefresh.name]: ScrollViewRefresh,
    [ScrollViewMore.name]: ScrollViewMore,
  },
})
export default class ScrollPageWrap extends Vue {
  // ── ──────────────────────────────────────────────── I ──────────
  // ──   :::::: data : :  :   :    :     :        :          :
  // ── ──────────────────────────────────────────────────────────

  private list = 1;

  // ── ──────────────────────────────────────────────── I ──────────
  // ──   :::::: mounted : :  :   :    :     :        :          :
  // ── ──────────────────────────────────────────────────────────

  private mounted(): void {}

  // ── ──────────────────────────────────────────────── I ──────────
  // ──   :::::: methods : :  :   :    :     :        :          :
  // ── ──────────────────────────────────────────────────────────

  private onItemClick(i: number): void {
    // Toast.info(`Click ${i}`)
  }
  private onScroll({ scrollLeft, scrollTop }: any): void {
    console.log(` scrollTop: ${scrollTop as number}`);
  }
  private onRefresh() {
    // async data
    setTimeout(() => {
      this.list += 5;
      this.$refs.scrollView.finishRefresh();
    }, 2000);
  }
  addItems(): void {
    this.list += 5;
    // 如果把autoReflow设置为false, 需调用reflowScroller
    // this.$refs.scrollView.reflowScroller();
  }
}
</script>

<style scoped lang="scss">
.scroll-page-wrap {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  // background-image: linear-gradient(180deg, #2676e5 0%, #2676e5 30%, #f5f5f5 31%, #f5f5f5 100%);
  .image-esxperiment {
    width: 100%;
    height: 360px;
    background-color: #66a2f4;
  }
  .scroll-view-item {
    padding: 50px 0;
    text-align: center;
    font-size: 28px;
    font-family: DINAlternate-Bold;
    background-color: #fff;
    border-bottom: 0.5px solid #efefef;
  }
}
</style>
