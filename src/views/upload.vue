<template>
  <div
    class="upload_page"
    v-transition:options='options'
  >
    <!-- header start -->
    <page-header
      ref='header'
      @backClickHandler='backClickHandler()'
      :transparent="headerTransparent"
      rightText=''
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
            @focus="focus"
            @blur="blur"
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
      <div
        class="upload-btns"
        v-if='btnShow'
      >
        <md-button
          class="preview-btn"
          type="primary"
          plain
          round
          icon='info-solid'
          @click="showNoMaskHandler"
        >
          预览
        </md-button>
        <md-button
          type="primary"
          round
          icon='success'
          @click='uploadData'
        >
          发布
        </md-button>
      </div>

    </main>
    <!-- main end -->
    <md-landscape
      v-model="showPic"
      full-screen
    >
      <div class="preview-details">
        <md-scroll-view
          ref="scrollView"
          :scrolling-x='false'
        >
          <md-skeleton
            avatar
            title
            :row='3'
          />
          <preview
            :text='value'
            v-if='showPic'
          />
          <md-skeleton
            avatar
            title
            :row='5'
          />
          <md-skeleton
            avatar
            title
            :row='2'
          />
        </md-scroll-view>
      </div>

    </md-landscape>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Ref, Watch, Model } from 'vue-property-decorator';
import {
  Toast,
  ImageReader,
  Icon,
  Tag,
  ImageViewer,
  TextareaItem,
  Field,
  Button,
  Landscape,
  Skeleton,
  ScrollView,
  Dialog,
} from 'mand-mobile';
import imageProcessor from 'mand-mobile/lib/image-reader/image-processor';
import PageHeader from '../components/base/PageHeader.vue';
import ImageUpload from '@/components/base/ImageUpload/ImageUpload.vue';
import Preview from '@/components/base/Preview.vue';
import preview from '../components/base/preview/preview.vue';
import { AsyncPublish } from '@/api/modules.ts/friend/publish';
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
    [Button.name]: Button,
    [Landscape.name]: Landscape,
    [Skeleton.name]: Skeleton,
    [ScrollView.name]: ScrollView,
    [Dialog.name]: Dialog,
    ImageUpload,
    Preview,
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
  private btnShow: boolean = true;
  private maxLength: number = 300;
  private vuegConfig: any = {
    forwardAnim: 'bounceInUp', //前进动画，默认为fadeInRight
    backAnim: 'swing', //后退动画，默认为fedeInLeft
    sameDepthDisable: true, //url深度相同时禁用动画，默认为false
    disable: false,
  };
  private showPic: boolean = false;
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
  private uploadData() {
    console.log(this.value);
    console.log(this.uploadImage.UploadImage);
    // 上传的图片
    const FILES = this.uploadImage.UploadImage.length > 0 ? this.uploadImage.UploadImage : [];
    // 发布的文字
    const VALUE = this.value;
    // 为空打断
    if (VALUE.length === 0 && FILES.length === 0) {
      Toast.failed('请输入要发布的内容', 1000);
      return;
    }
    Toast.loading('发布中');
    AsyncPublish({
      // 发布的文字
      content: this.value,
      // 上传的图片
      files: this.uploadImage.UploadImage,
    }).then(res => {
      console.log(res);
      Toast.hide();
      this.succeedConfirm('发布成功');
    });
  }
  /**
   * 发布成功提示
   */
  succeedConfirm(msg: string) {
    Dialog.succeed({
      title: '发布成功',
      // content: msg,
      confirmText: '确定',
      onConfirm: () => this.$router.go(-1),
      onCancel: () => this.$router.go(-1),
    });
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
  /**
   * 点击预览
   */
  private showNoMaskHandler() {
    this.showPic = true;
  }
  /**
   * 聚焦事件
   */
  private focus() {
    this.btnShow = false;
  }
  private blur() {
    this.btnShow = true;
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
    position: relative;
  }
  .upload-btns {
    width: 100%;
    position: absolute;
    // height: 100px;
    bottom: 100px;
    padding: 0 15px;
    .preview-btn {
      margin-bottom: 30px;
    }
  }
}
/deep/.md-popup-mask {
  width: 100%;
  height: 100%;
}
/deep/.md-popup-box {
  position: relative;
  pointer-events: auto;
  z-index: 2;
  width: 100%;
  height: 100%;
  overflow: auto;
  /deep/.md-landscape-content {
    width: 100%;
    height: 100%;
  }
}
/deep/.md-landscape .md-icon.md-landscape-close {
  z-index: 5;
  color: #3a9dfd;
  opacity: 1;
}
/deep/.md-icon.icon-font:before {
  position: relative;
  @include center-translate();
  z-index: 2;
}
/* 预览 */
.preview-details {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 15px;
  min-height: 500px;
  padding: 40px 15px 40px 15px;
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
/deep/.md-skeleton {
  margin-bottom: 30px;
  margin-top: 30px;
  padding-right: 25px;
  .md-skeleton-avatar {
    margin-right: 25px;
  }
}
/deep/.md-button-content {
  padding-left: 15px;
}
</style>
