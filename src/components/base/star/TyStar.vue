<template>
  <div class="TyStar">
    <div class="TyStar__ground">
      <div
        class="TyStar__icon"
        :class="AnimateClass"
        :style='{color:ColorValue}'
      >
        <slot name="icon"></slot>
      </div>
      <div
        class="TyStar__decoration"
        :class="{ 'TyStar__decoration--active':active }"
      ></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Model } from 'vue-property-decorator';
import { isColors } from './colorRE';
@Component({
  name: 'TyStar',
})
export default class TyStar extends Vue {

  /*=============================================
  =                      Data                   =
  =============================================*/

  /**
   * 加载时没有动效的判断依据
   *
   */
  private activeNew: boolean | null = null;
  /*=============================================
  =                      Model                  =
  =============================================*/

  /**
   * 点赞状态
   *
   * @param {String} color
   */
  @Model('change', { type: Boolean })
  active!: boolean;

  /*=============================================
  =                    Props                    =
  =============================================*/

  /**
   * 点击后 icon 动画
   *
   * @param {String} animate
   */
  @Prop({
    type: String,
    default: '',
  })
  animate!: string;

  /**
   * 点击后 icon 颜色
   *
   * @param {String} color
   */
  @Prop({
    type: String,
    default: '',
  })
  color!: string;

  /*=============================================
  =                    Watch                    =
  =============================================*/

  @Watch('active')
  onChildChanged(val: boolean, oldVal: boolean) {
    this.activeNew = val
  }

  /*=============================================
  =                   Computed                  =
  =============================================*/
  /**
   * 点亮动画
   *
   */

  private get AnimateClass(): string {
    return this.active && typeof this.activeNew === 'boolean' ? this.animate : '';
  }
  /**
   * 颜色动效
   */
  private get ColorValue(): string {
    return this.active ? this.color : '';
  }

  /*=============================================
  =                    Mounted                  =
  =============================================*/
  private mounted(): void {
    if (this.color) {
      if (isColors(this.color)) {
        return;
      } else {
        console.error('this color must be hexcolor or rgbcolor  ---TyStar');
      }
    } else {
      return;
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'CoreBase64.scss';
.TyStar {
  position: absolute;
}
.TyStar__ground {
  width: 100Px;
  height: 100Px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.TyStar__icon {
  z-index: 888; /*❤今年888大发*/
}
.TyStar__decoration {
  width: 100Px;
  height: 100Px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  @extend %base64;

  background-position: 0 0;
  transition: background-position 0.75s steps(25);
  transition-duration: 0s;

  &--active {
    transition-duration: 0.75s;
    background-position: -2500Px 0;
  }
}
</style>