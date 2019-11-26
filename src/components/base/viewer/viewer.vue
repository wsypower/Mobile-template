<template>
  <div
    class="viewer"
    v-if='images.length>=1'
  >
    <!-- 只有一张图的布局 -->
    <div
      class="layout_one"
      v-if='[1].includes(images.length)'
      flex='corss:left'
    >
      <!-- <img
        preview
        :src="images[0]"
        alt="1"
        @click="showPhotoSwipe(index,$event)"
      > -->
      <vue-preview
        :slides="images"
        @close="handleClose"
      ></vue-preview>
    </div>
    <!-- 2 4 数量的布局 -->
    <div
      class="layout_odd"
      flex="dir:left"
      v-else-if="[2,4].includes(images.length)"
    >
      <vue-preview
        :slides="images"
        @close="handleClose"
      ></vue-preview>
      <!-- <picture-viewer
        :slides="images"
        @close="handleClose"
      ></picture-viewer> -->
      <!-- <div
        class="layout_img_warpper"
        v-for="(item,index) in images"
        :key="index"
        v-preview="item"
      >

        <img
          preview
          class="previewer-demo-img"
          :src="item"
          :alt="index+1"
          @click="showPhotoSwipe(index,$event)"
        >
      </div> -->

    </div>
    <!-- 其余数量的布局 -->
    <div
      class="layout_even"
      v-else
      flex="dir:left"
    >
      <!-- <picture-viewer
        :slides="images"
        @close="handleClose"
      ></picture-viewer> -->

      <vue-preview
        :slides="images"
        @close="handleClose"
      ></vue-preview>
      <!-- <div
        class="layout_img_warpper"
        v-for="(item,index) in images"
        :key="index"
      >
        <img
          class="previewer-demo-img"
          :src="item"
          :alt="index+1"
          @click="showPhotoSwipe(index,$event)"
        >

      </div> -->
    </div>
    <!-- 图片查看器 -->
    <!-- <picture :slides='images'></picture> -->

  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Model, Ref } from 'vue-property-decorator';
// import PictureViewer from '@/components/base/picture/picture.vue';
// import VuePreview from '@/components/base/preview/index';

@Component({
  name: 'Viewer',
  components: {
    // VuePreview,
    // PictureViewer,
  },
})
export default class Viewer extends Vue {
  /*=============================================
  =                      Data                   =
  =============================================*/
  private oddOrEven: boolean = false;
  private isOpen = false;
  private isOpenGallery = false;
  private options = {
    index: 0,
  };
  private optionsGallery = {};
  /*=============================================
  =                      Model                  =
  =============================================*/
  /*=============================================
  =                    Props                    =
  =============================================*/
  /**
   * 图片
   * @description 名字
   */
  @Prop({
    type: Array,
  })
  images!: string[];
  /*=============================================
  =                    Watch                    =
  =============================================*/
  /*=============================================
  =                   Computed                  =
  =============================================*/

  /*=============================================
  =                     Method                  =
  =============================================*/
  handleClose() {
    console.log('close event');
  }
  // showPhotoSwipe(index: number, event: Event) {
  //   this.$imagePreview({
  //     images: this.images,
  //     index: index,
  //     // defaultOpt: {
  //     //   getThumbBoundsFn: function(index: number) {
  //     //     let thumbnail = event.path[0];
  //     //     let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
  //     //     let rect = thumbnail.getBoundingClientRect();
  //     //     return {
  //     //       x: rect.left,
  //     //       y: rect.top + pageYScroll,
  //     //       w: rect.width,
  //     //     };
  //     //   },
  //     // },
  //   });
  // }
  // hidePhotoSwipe() {
  //   this.isOpen = false;
  // }
  /*=============================================
  =                    Mounted                  =
  =============================================*/
}
</script>

<style lang="scss" scoped>
.viewer {
  width: 100%;
  // min-height: 386px;
  margin-top: 30px;
  margin-bottom: 20px;
  position: relative;
  .layout_one {
    width: 100%;
    height: 386px;
    overflow: hidden;
    text-align: left;
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  /* 奇数图片 */
  .layout_odd {
    flex-wrap: wrap;
    position: relative;
    .layout_img_warpper {
      width: 188px;
      height: 188px;
      margin-bottom: 10px;
      margin-right: 10px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  /* 只有一张图片 */
  .layout_even {
    width: 100%;
    flex-wrap: wrap;
    position: relative;
    .layout_img_warpper {
      width: 188px;
      height: 188px;
      margin-bottom: 10px;
      margin-right: 10px;
      overflow: hidden;
      @include n-between(3, 3, 12) {
        margin-right: 0px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>