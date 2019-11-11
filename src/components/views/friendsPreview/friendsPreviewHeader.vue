<template>
  <div class="cg_preview_header"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
@Component({
  name: 'friendsPreviewHeader',
  components: {},
})
export default class FriendsPreviewHeader extends Vue {
  // ── ──────────────────────────────────────────────── I ──────────
  // ──   :::::: data : :  :   :    :     :        :          :
  // ── ──────────────────────────────────────────────────────────

  private list = 50;

  // ── ──────────────────────────────────────────────── I ──────────
  // ──   :::::: mounted : :  :   :    :     :        :          :
  // ── ──────────────────────────────────────────────────────────

  private mounted(): void {}

  // ── ──────────────────────────────────────────────── I ──────────
  // ──   :::::: methods : :  :   :    :     :        :          :
  // ── ──────────────────────────────────────────────────────────

  private $_onItemClick(i: number): void {
    // Toast.info(`Click ${i}`)
  }
  private $_onScroll({ scrollLeft, scrollTop }: any): void {
    console.log(` scrollTop: ${scrollTop as number}`);
  }
}
</script>

<style scoped lang="scss">
.cg_preview_header {
  width: 100%;
  height: 360px;
  @include switch-img('~@img/friendsViewHeader');
}
</style>
