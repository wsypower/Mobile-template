<template>
  <div class="friend-self">
    <page-header
      ref='header'
      @backClickHandler="backClickHandler"
      icon=''
      title='朋友圈'
    />
    <main>
      <!-- 滚动条 -->
      <md-scroll-view
        ref="scrollView"
        @scroll="$_onScroll"
        :scrolling-x='false'
        auto-reflow
      >
        <!-- 主要内容 -->
        <div class="layout-main">
          <md-field>
            <md-cell-item title="普通条目" />
            <md-cell-item
              title="动作条目"
              arrow
              @click="onClick"
            />
          </md-field>
        </div>
      </md-scroll-view>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Ref, Watch, Model } from 'vue-property-decorator';
import PageHeader from '@/components/base/PageHeader.vue';
import { ScrollView, Field, CellItem, Dialog, Icon } from 'mand-mobile';
@Component({
  name: 'FriendsSelf',
  components: {
    PageHeader,
    [ScrollView.name]: ScrollView,
    [Field.name]: Field,
    [CellItem.name]: CellItem,
    [Icon.name]: Icon,
  },
})
export default class FriendsSelf extends Vue {
  /**
   * 回到上一页
   *
   * @author weiyafei
   * @date 2019-12-12 14:58:43
   */
  private backClickHandler() {
    this.$router.go(-1);
  }
}
</script>

<style scoped lang="scss">
.friend-self {
  width: 100%;
  height: 100%;
  background-color: #f3f3f6;
  main {
    width: 100%;
    height: 100%;
    padding-top: 87px;
    .layout-main {
      width: 100%;
      /deep/.md-cell-item-title {
        text-align: left;
      }
    }
  }
}
</style>