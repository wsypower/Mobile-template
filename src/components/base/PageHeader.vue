<template>
  <div
    class="page-header"
    flex="cross:stretch box:justify"
    :class="{ 'page-header-transparent': transparent }"
  >
    <!-- 左侧点击区域 -->

    <div
      class="page-features page-header-return"
      flex="main:center cross:center"
      @click="backClickHandler()"
    >
      <md-icon name="arrow-left" size="lg" color="#fff"></md-icon>
    </div>
    <!-- 中间title -->
    <div class="page-features page-header-title" flex="main:center cross:center">{{ title }}</div>
    <!-- 右侧点击区域 -->
    <div
      class="page-features page-header-btn"
      flex="main:center cross:center"
      @click="rightBtnClickHandler()"
    >
      <md-icon name="camera" svg size="lg"></md-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Icon } from 'mand-mobile';
@Component({
  name: 'PageHeader',
  components: {
    [Icon.name]: Icon,
  },
})
export default class PageHeader extends Vue {
  // ── ──────────────────────────────────────────────── I ──────────
  // ──   :::::: Prop : :  :   :    :     :        :          :
  // ── ──────────────────────────────────────────────────────────
  /**
   * title
   * @description 标题
   * @param {String} default: ''
   */
  @Prop({
    type: String,
    default: '',
  })
  title!: String;

  /**
   * transparent
   * @description 头部栏的透明度
   * @param {Boolean} default: false
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  transparent!: Boolean;

  // ── ──────────────────────────────────────────────── I ──────────
  // ──   :::::: Emit : :  :   :    :     :        :          :
  // ── ──────────────────────────────────────────────────────────

  /**
   * Emit传递左侧按钮点击事件
   * @event backClickHandler
   */

  @Emit('backClickHandler')
  private backClickHandler(): void {}

  /**
   * Emit传递右侧按钮点击事件
   * @event rightBtnClickHandler
   */

  @Emit('rightBtnClickHandler')
  private rightBtnClickHandler(): void {}
}
</script>

<style scoped lang="scss">
/* pahgeHader 外部样式*/
.page-header {
  width: 100%;
  height: 87px;
  background-color: $color-primary;
  position: fixed;
  top: 0;
  z-index: 10;
  /* 左右按钮 */
  .page-features {
    height: 100%;
  }
  /* 左变返回按钮 */
  .page-header-return {
    width: 87px;
  }
  /* title */
  .page-header-title {
    color: #ffffff;
    font-size: 32px;
    user-select: none;
  }
  /* 右侧功能栏 */
  .page-header-btn {
    width: 87px;
  }
}
/* 头部颜色 */
.page-header-transparent {
  background-color: transparent;
}
</style>
