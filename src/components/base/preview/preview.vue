<template>
  <div class="warp">
    <!--数量为1的布局 -->
    <div
      class="my-gallery "
      itemscope
      flex='dir:left'
      v-if="[1].includes(slides.length)"
    >
      <template v-for="item in slides">
        <figure
          itemprop="associatedMedia"
          itemscope
          class="layout_img_warpper layout-one"
        >
          <a
            :href="item.src"
            itemprop="contentUrl"
            :data-size="'' + item.w + 'x' + item.h"
          >
            <img
              :src="item.msrc"
              :alt="item.alt"
              itemprop="thumbnail"
            />
          </a>
        </figure>
      </template>
    </div>
    <!-- 2 4 数量的布局 -->
    <div
      class="my-gallery layout-event"
      itemscope
      flex='dir:left'
      v-else-if="[2,4].includes(slides.length)"
    >
      <template v-for="item in slides">
        <figure
          itemprop="associatedMedia"
          itemscope
          class="layout_img_warpper"
        >
          <a
            :href="item.src"
            itemprop="contentUrl"
            :data-size="'' + item.w + 'x' + item.h"
          >
            <img
              :src="item.msrc"
              :alt="item.alt"
              itemprop="thumbnail"
            />
          </a>
        </figure>
      </template>
    </div>
    <!-- 其余的数量布局 -->
    <div
      class="my-gallery layout-odd"
      itemscope
      flex='dir:left'
      v-else
    >
      <template v-for="item in slides">
        <figure
          itemprop="associatedMedia"
          itemscope
          class="layout_img_warpper"
        >
          <a
            :href="item.src"
            itemprop="contentUrl"
            :data-size="'' + item.w + 'x' + item.h"
          >
            <img
              :src="item.msrc"
              :alt="item.alt"
              itemprop="thumbnail"
            />
          </a>
        </figure>
      </template>
    </div>
    <!-- 1111 -->
    <viewer-base></viewer-base>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Model, Ref } from 'vue-property-decorator';
import ViewerBase from './ViewerBase.vue';
@Component({
  name: 'preview',
  components: {
    ViewerBase,
  },
})
export default class preview extends Vue {}
</script>
<style lang="scss" scoped>
.warp {
  width: 100%;
  height: 100%;
}
.my-gallery {
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  .layout-one {
    width: 100%;
    height: 100%;
    text-align: left;
    img {
      height: 100%;
      object-fit: contain;
    }
  }
}

.layout_img_warpper {
  width: 188px;
  height: 188px;
  margin-bottom: 10px;
  margin-right: 10px;
  overflow: hidden;
  vertical-align: middle;
  text-align: center;
  // @include n-between(3, 3, 12) {
  //   margin-right: 0px;
  // }
  // img {
  //   width: 100%;
  //   height: 100%;
  //   object-fit: cover;
  //   // clip: rect(auto, 0);
  // }
}
.layout-odd {
  .layout_img_warpper {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    @include n-between(3, 3, 12) {
      margin-right: 0px;
    }
  }
}
.layout-event {
  // margin-right: 20px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .layout_img_warpper {
    margin-right: 10px;
  }
}
</style>