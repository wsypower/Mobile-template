<template>
  <div class="upload_page" v-transition:options='options'>
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
      <!--  -->
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
    </main>
    <!-- main end -->
    <!-- 图片放大器 star-->
    <md-image-viewer
      v-model="isViewerShow"
      :list="imageList.UploadImage"
      :has-dots="true"
      :initial-index="viewerIndex"
    >
    </md-image-viewer>
    <!-- 图片放大器 end-->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Ref, Watch, Model } from 'vue-property-decorator';
import { Toast, ImageReader, Icon, Tag, ImageViewer, TextareaItem, Field } from 'mand-mobile';
import imageProcessor from 'mand-mobile/lib/image-reader/image-processor';
import PageHeader from '../components/base/PageHeader.vue';

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
    disable:false      
  };
  /**
   * 图片上传的配置项
   */
  private amount: number = 9;
  /**
   * 图片上传
   */
  private imageList: any = {
    reader: [],
    UploadImage: [],
    viewer: [],
  };
  /**
   * 图片放大
   */
  private isViewerShow: boolean = false;
  private viewerIndex: number = 0;
  /*=============================================
  =                     Prop                    =
  =============================================*/
  /*=============================================
  =                    Watch                     =
  =============================================*/
  /*=============================================
  =                      Ref                    =
  =============================================*/
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
    // 查看上报的数据
    console.log(this.imageList['UploadImage']);
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
   * 图片选择完成事件，还未开始读取
   * @select(name, { files })
   *
   *
   * @param {String} name 选择器标识
   * @param {Array} files 图片对象集合
   * @author weiyafei
   * @date 2019-12-02 17:13:22
   */
  onReaderSelect(name: string, { files }: { files: File[] }) {
    console.log(files)
    const nums = this.amount;
    if (files.length > nums) {
      Toast.failed(`图片最多${nums}张图片`, 1000);
      return;
    }
    //选取的图片
    Toast.loading('图片读取中...', 500);
  }
  /**
   * 图片选择读取完成事件
   * @complete(name, { dataUrl, blob, file })
   *
   *
   * @param {String} name 选择器标识
   * @param {String} dataUrl 图片Base64
   * @param {Blob} [blob] 图片Blob对象，可用于formData
   * @param {File} [file] 图片对象
   * @author weiyafei
   * @date 2019-12-02 17:13:22
   */
  private onReaderComplete(
    name: string,
    { dataUrl, blob, file }: { dataUrl: string; blob: Blob; file: File },
  ) {
    const nums = this.amount;
    const ImageList = this.imageList[name] || [];
    imageProcessor({
      dataUrl,
      width: 200,
      height: 200,
      quality: 0.1,
    }).then(({ dataUrl }: { dataUrl: string; blob?: Blob; file?: File }) => {
      if (ImageList.length < nums) ImageList.push(dataUrl);
    });
    this.$set(this.imageList, name, ImageList);
    // 推入先上传的图片
    if (ImageList.length < nums) this.imageList['UploadImage'].push(file);
    // 图片放大器
    // const url = this.FiletoUrl(file);
  }

  /**
   * 图片选择读取失败事件
   * @error(name, { code, msg })
   *
   *
   * @param {String} name 选择器标识
   * @param {String} code 错误标识，见附录
   * @param {String} msg 错误信息
   * @author weiyafei
   * @date 2019-12-02 17:13:22
   */
  private onReaderError(name: string, { msg }: { code?: string; msg?: string }) {
    Toast.failed(`${msg}`, 1000);
  }

  /**
   * 删除图片事件
   *
   * @param {String} name 选择器标识
   * @param {Number} index 错误标识，见附录
   * @author weiyafei
   * @date 2019-12-02 17:13:22
   */
  private onDeleteImage(name: string, index: number) {
    const ImageList = this.imageList[name] || [];
    console.log(ImageList);
    ImageList.splice(index, 1);
    this.$set(this.imageList, name, ImageList);
    // 待上传的图片删除当前被删除的图片
    this.imageList['UploadImage'].splice(index, 1);
  }

  /**
   * 图片放大器
   *
   * @param {Number} index 当前选择图片的索引
   * @author weiyafei
   * @date 2019-12-02 17:13:22
   */
  private showViewer(index: number) {
    this.viewerIndex = index;
    this.isViewerShow = true;
  }
  /*=============================================
  =                    Mounted                  =
  =============================================*/
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
