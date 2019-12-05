<template>
  <div class="details">
    <!-- header start -->
    <page-header
      ref='header'
      @backClickHandler='backClickHandler()'
      :transparent="1"
      rightText='发布'
      title='动态发布'
    />
    <!-- header end -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch, Ref } from 'vue-property-decorator';
import {
  ActionSheet,
  Dialog,
  Popup,
  PopupTitleBar,
  TextareaItem,
  Field,
  InputItem,
  ActionBar,
  Toast,
} from 'mand-mobile';
import TyStar from '@/components/base/star/TyStar.vue';
import { UserModule } from '@/store/modules/user';
import Ellipsis from 'ellipsis-plus';
@Component({
  name: 'Details',
  components: {
    TyStar,
  },
})
export default class Details extends Vue {
  /*=============================================
  =                     Data                    =
  =============================================*/
  private userId: string = '';
  private id: string = '';

  /*=============================================
  =                    Method                   =
  =============================================*/
  private backClickHandler() {
    this.$router.go(-1);
  }
  /*=============================================
  =                    Mounted                  =
  =============================================*/
  private mounted() {
    /* 首先当前用户 userId*/
    if (this.$route.query.userId) {
      const result = this.$route.query.userId;
      this.userId = result as string;
    }
    console.log(this.userId);
  }
}
</script>

<style scoped lang="scss">
.details {
  width: 100%;
  height: 100%;
  background-color: red;
}
</style>