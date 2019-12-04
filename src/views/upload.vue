<template>
  <div
    class="upload_page"
    v-transition:options='options'
  >
    <!-- header start -->
    <page-header
      ref='header'
      @rightBtnClickHandler="rightBtnClickHandler()"
      @backClickHandler='backClickHandler()'
      :transparent="headerTransparent"
      rightText='发布'
      title='动态发布'
    />
    <!-- header end -->
    <!-- main star -->
    <main class="upload_page_main">
      <!-- 状态文字 -->
      <div class="textarea-item">
        <md-field>
          <md-textarea-item
            v-model="value"
            :max-length="maxLength"
            :max-height="450"
            :autosize="true"
            placeholder="请输入内容..."
            clearable
          >
            <template slot="footer">
              <p
                class="textarea-footer-text"
                flex='main:right'
              >
                <span class="textarea-footer-left">{{ value.length }}/{{maxLength}}</span>
              </p>
            </template>
          </md-textarea-item>
        </md-field>
      </div>
      <!-- 图片上传器 -->
      <image-upload
        amount='9'
        ref='uploadImage'
      ></image-upload>
    </main>
    <!-- main end -->

  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Ref, Watch, Model } from 'vue-property-decorator';
import { Toast, ImageReader, Icon, Tag, ImageViewer, TextareaItem, Field } from 'mand-mobile';
import imageProcessor from 'mand-mobile/lib/image-reader/image-processor';
import PageHeader from '../components/base/PageHeader.vue';
import ImageUpload from '../components/base/ImageUpload/ImageUpload.vue';

@Component({
  name: 'upload',
  components: {
    PageHeader,
    [ImageReader.name]: ImageReader,
    [Icon.name]: Icon,
    [Tag.name]: Tag,
    [TextareaItem.name]: TextareaItem,
    [Field.name]: Field,
    [ImageViewer.name]: ImageViewer,
    ImageUpload,
  },
})
export default class Upload extends Vue {
  /*=============================================
  =                     data                    =
  =============================================*/
  /**
   * 上传的文字
   */
  private value: string = '';
  private maxLength: number = 300;
  private vuegConfig: any = {
    forwardAnim: 'bounceInUp', //前进动画，默认为fadeInRight
    backAnim: 'swing', //后退动画，默认为fedeInLeft
    sameDepthDisable: true, //url深度相同时禁用动画，默认为false
    disable: false,
  };

  /*=============================================
  =                     Prop                    =
  =============================================*/
  /*=============================================
  =                    Watch                     =
  =============================================*/
  /*=============================================
  =                      Ref                    =
  =============================================*/
  @Ref('uploadImage') readonly uploadImage!: any;
  /*=============================================
  =                     Method                  =
  =============================================*/

  /**
   * 点击左侧头部按钮
   *
   * @author weiyafei
   * @date 2019-12-02 09:55:25
   */
  private rightBtnClickHandler() {
    // 查看上报的图像数据
    // this.uploadImage.UploadImage.push(1);
    console.log(this.uploadImage.UploadImage);
  }

  /**
   * 点击右侧头部按钮
   *
   * @author weiyafei
   * @date 2019-12-02 09:55:25
   */
  private backClickHandler() {
    this.$router.go(-1);
  }

  /*=============================================
  =                    Mounted                  =
  =============================================*/
  private mounted() {
    if (this.$route.query.data) {
      const result = this.$route.query.data;
      this.uploadImage.UploadImage.push(...result);
    }
  }
}
</script>

<style scoped lang="scss">
/* 上报页面 */
.upload_page {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .upload_page_main {
    width: 100%;
    height: 100%;
    // background-color: red;
    padding-top: 87px;
  }
}
/* 上传文字 */
.textarea-item {
  width: 100%;
  // background-color: red;
  .textarea-footer-text {
    color: #d1d5de;
    font-size: 27px;
  }
}
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
