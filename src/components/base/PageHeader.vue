<template>
  <div
    class="page-header"
    flex="cross:stretch box:justify"
    :style="cssTransparent"
  >
    <!-- 左侧点击区域 -->

    <div
      class="page-features page-header-return"
      flex="main:center cross:center"
      @click="backClickHandler()"
    >
      <md-icon
        name="arrow-left"
        size="lg"
        color="#fff"
      ></md-icon>
    </div>
    <!-- 中间title -->
    <div
      class="page-features page-header-title"
      flex="main:center cross:center"
    >
      {{ title }}
    </div>
    <!-- 右侧点击区域 -->
    <div
      class="page-features page-header-btn"
      flex="main:center cross:center"
      @click="rightBtnClickHandler"
    >
      <md-icon
        :name="icon"
        svg
        size="lg"
        color="#ffffff"
      ></md-icon>
      <span
        class="right-text"
        v-if='rightText.length!==0'
      >
        {{rightText}}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Icon } from 'mand-mobile';
import { diff } from 'prettier';
@Component({
  name: 'PageHeader',
  components: {
    [Icon.name]: Icon,
  },
})
export default class PageHeader extends Vue {
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
   * 头部背景色透明度
   */
  @Prop({
    type: Number,
    default: 1,
  })
  transparent!: number;
  /**
   * 左侧的按钮icon
   *
   * @description 头部栏的透明度
   */
  @Prop({
    type: String,
    default: '',
  })
  icon!: string;

  /**
   * 左侧的按钮icon
   *
   * @description 头部栏的透明度
   */
  @Prop({
    type: String,
    default: '',
  })
  rightText!: string;

  /**
   * Emit传递左侧按钮点击事件
   *
   * @listens backClickHandler
   * @event PageHeader#backClickHandler
   */
  @Emit('backClickHandler')
  private backClickHandler(): void {} // tslint:disable-line

  /**
   * Emit传递右侧按钮点击事件
   *
   * @listens rightBtnClickHandler
   * @event PageHeader#rightBtnClickHandler
   */
  @Emit('rightBtnClickHandler')
  public rightBtnClickHandler() {
    console.log(1);
  } // tslint:disable-line

  /**
   * scss 和 js 共享变量
   */
  private get cssTransparent(): object {
    return { '--transparent': this.transparent };
  }
}
</script>

<style scoped lang="scss">
/* pahgeHader 外部样式*/
.page-header {
  width: 100%;
  height: 87px;
  position: fixed;
  top: 0;
  z-index: 10;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-color: rgba($color: $color-primary, $alpha: var(--transparent));
  }
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
    z-index: 10;
    opacity: var(--transparent);
  }
  /* 右侧功能栏 */
  .page-header-btn {
    width: 87px;
    color: #fff;
    position: relative;
    .right-text {
      @include center-translate();
      width: 100%;
    }
  }
}
/* 头部颜色 */
.page-header-transparent {
  background-color: transparent;
}
</style>
