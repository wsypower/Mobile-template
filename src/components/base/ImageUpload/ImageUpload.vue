<template>
  <!-- 图片上传 start -->
  <div class="image-upload-layout ">
    <ul class="image-reader-list">
      <li
        class="image-reader-item"
        v-for="(img, index) in imageList['reader']"
        :key="index"
        :style="{
              'backgroundImage': `url(${img})`,
              'backgroundPosition': 'center center',
              'backgroundRepeat': 'no-repeat',
              'backgroundSize': 'cover'
        }"
        @click.stop="showViewer(index, $event)"
      >
        <md-tag
          class="image-reader-item-del"
          size="small"
          shape="quarter"
          fill-color="#3A9CFC"
          type="fill"
          font-color="#fff"
          @click.native.stop="onDeleteImage('reader', index)"
        >
          <md-icon name="close"></md-icon>
        </md-tag>
      </li>
      <li
        class="image-reader-item add"
        v-if='imageList.reader.length<=8'
      >
        <md-image-reader
          name="reader"
          @select="onReaderSelect"
          @complete="onReaderComplete"
          @error="onReaderError"
          is-multiple
          :amount='amount'
        ></md-image-reader>
        <md-icon
          name="camera"
          svg
          size="lg"
          color="#3A9CFC"
        ></md-icon>
        <p>添加图片</p>
      </li>
    </ul>
  </div>
  <!-- 图片上传 end -->
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Ref, Watch, Model } from 'vue-property-decorator';
import { Toast, ImageReader, Icon, Tag } from 'mand-mobile';
import imageProcessor from 'mand-mobile/lib/image-reader/image-processor';
@Component({
  name: 'ImageUpload',
  components: {
    [ImageReader.name]: ImageReader,
    [Icon.name]: Icon,
    [Tag.name]: Tag,
  },
})
export default class ImageUpload extends Vue {
  /*=============================================
  =                      Model                  =
  =============================================*/
  /*=============================================
  =                      Data                   =
  =============================================*/
  /*=============================================
  =                      Prop                   =
  =============================================*/
  /*=============================================
  =                      Emit                   =
  =============================================*/
  /*=============================================
  =                      Ref                    =
  =============================================*/
  /*=============================================
  =                      Watch                  =
  =============================================*/
  /*=============================================
  =                      Method                 =
  =============================================*/
  /*=============================================
  =                     Mounted                 =
  =============================================*/
}
</script>

<style scoped lang="scss">
/*=============================================
  =                    图片上传                 =
 =============================================*/
/* 图片上传 */
.image-upload-layout {
  width: 100%;
  padding: 0 30px 30px 30px;
  overflow: hidden;
  .image-reader-list {
    float: left;
    width: 100%;
    .image-reader-item {
      position: relative;
      float: left;
      width: 23.5%;
      padding-bottom: 23.5%;
      margin-bottom: 2%;
      margin-right: 2%;
      background: #fff;
      box-shadow: 0 5px 20px rgba(197, 202, 213, 0.25);
      box-sizing: border-box;
      list-style: none;
      border-radius: 4px;
      background-size: cover;
      &:nth-of-type(4n) {
        margin-right: 0;
      }
      &.add {
        border: 2px dashed #3a9cfc;
        .md-icon {
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        p {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          margin-top: 15px;
          font-size: 22px;
          font-weight: bold;
          text-align: center;
          color: #3a9cfc;
        }
      }
      .image-reader-item-del {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 3;
        .md-icon-close {
          font-size: 24px;
        }
      }
    }
  }
}
</style>