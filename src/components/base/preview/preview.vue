<template>
  <div>
    <div
      class="my-gallery"
      itemscope
    >
      <template v-for="item in slides">
        <figure
          itemprop="associatedMedia"
          itemscope
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
          <figcaption
            style="display: none"
            itemprop="caption description"
          >
            {{ item.title }}
          </figcaption>
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
    // Previewer: vuePicturePreview,
  },
})
export default class preview extends Vue {}
</script>
<style>
@import '~photoswipe/dist/photoswipe.css';
@import '~photoswipe/dist/default-skin/default-skin.css';
</style>
