<template>
  <div class="cg_preview_header" flex="dir:right cross:bottom">
    <div class="user_avatar"></div>
    <div class="user_name" flex="cross:center main:right">高圆圆</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
@Component({
  name: 'friendsPreviewHeader',
})
export default class FriendsPreviewHeader extends Vue {}
</script>

<style scoped lang="scss">
.cg_preview_header {
  width: 100%;
  height: 360px;
  @include switch-img('~@img/friendsViewHeader');
  padding: 0px 30px 30px 30px;
  .user_avatar {
    width: 120px;
    height: 120px;
    background-color: #ffffff;
    border-radius: 60px;
    border: solid 2px #ffffff;
    @include switch-img('~@img/Headpic');
  }
  .user_name {
    min-width: 120px;
    height: 120px;
    font-size: 32px;
    font-weight: 600;
    color: #ffffff;
    margin-right: 30px;
  }
}
</style>
