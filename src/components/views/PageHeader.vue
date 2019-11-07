<template>
  <div
    class="page-header"
    flex="cross:stretch box:justify"
    :class="{'page-header-transparent':transparent}"
  >
    <!-- 左侧点击区域 -->
    <div
      class="page-features page-header-return"
      flex="main:center cross:center"
      @click="leftBtnClickHandler()"
    >
      <md-icon name="arrow-left" size="lg" color="#fff"></md-icon>
    </div>
    <!-- 中间title -->
    <div class="page-features page-header-title" flex="main:center cross:center">{{title}}</div>
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
  @Prop({
    type: String,
    default: '',
  })
  title!: String;
  @Prop({
    type: Boolean,
    default: false,
  })
  transparent!: Boolean;
  /**
   * Emit传递左侧按钮点击事件
   */
  @Emit('leftBtnClickHandler')
  private leftBtnClickHandler(): void {}
  /**
   * Emit传递右侧按钮点击事件
   */
  @Emit('rightBtnClickHandler')
  private rightBtnClickHandler(): void {}
}
</script>

<style scoped lang='scss'>
.page-header {
  width: 100%;
  height: 87px;
  background-color: $color-primary;
  position: fixed;
  top: 0;
  .page-features {
    height: 100%;
  }
  .page-header-return {
    width: 87px;
  }
  .page-header-title {
    color: #ffffff;
    font-size: 32px;
    user-select: none;
  }
  .page-header-btn {
    width: 87px;
  }
}
.page-header-transparent {
  background-color: transparent;
}
</style>