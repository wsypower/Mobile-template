<template>
  <div>
    <!-- 图片上传 start -->
    <div class="image-upload-layout ">
      <ul class="image-reader-list">
        <li
          class="image-reader-item"
          v-for="(img, index) in reader"
          :key="index"
          :style="{
              'backgroundImage': `url(${img.msrc})`,
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
            @click.native.stop="onDeleteImage(index)"
          >
            <md-icon name="close"></md-icon>
          </md-tag>
        </li>
        <li
          class="image-reader-item add"
          v-if='reader.length < amount'
          @click.stop="onAddClickHandle"
        >
          <div class="image-reader-btn"></div>
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
    <!-- 图片放大器 star-->
    <md-image-viewer
      v-model="isViewerShow"
      :list="list"
      :has-dots="true"
      :initial-index="viewerIndex"
    >
    </md-image-viewer>
    <!-- 图片放大器 end-->
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component';
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator';
import { Toast, ImageReader, Icon, Tag, ImageViewer } from 'mand-mobile';
import imageProcessor from 'mand-mobile/lib/image-reader/image-processor';
import ActionSheetMixin from '@/mixin/ActionSheet';
import nativeMethod from '@/plugin/core/hesc/heschybird';
@Component({
  name: 'ImageUpload',
  components: {
    [ImageReader.name]: ImageReader,
    [Icon.name]: Icon,
    [Tag.name]: Tag,
    [ImageViewer.name]: ImageViewer,
  },
})
export default class ImageUpload extends mixins(ActionSheetMixin) {
  /*=============================================
  =                      Model                  =
  =============================================*/
  // @Model('change', { type: Array })
  // checked!: boolean;
  /*=============================================
  =                      Data                   =
  =============================================*/

  private reader: any[] = [];
  private UploadImage: any[] = [];
  /**
   * 图片放大
   */
  private isViewerShow: boolean = false;
  private viewerIndex: number = 0;

  /*=============================================
  =                      Prop                   =
  =============================================*/
  @Prop({
    type: String,
    default: '9',
  })
  amount!: string;

  private get list() {
    return this.reader.map(item => {
      return item.src;
    });
  }
  /*=============================================
  =                      Emit                   =
  =============================================*/
  /*=============================================
  =                      Ref                    =
  =============================================*/
  /*=============================================
  =                      Watch                  =
  =============================================*/
  /**
   * 返回上传的展示的图
   */
  @Watch('UploadImage')
  onChildChanged(val: any, oldVal: any) {
    const srcUrl = val.map((item: any) => {
      const srcSmall = item.newPath.replace(
        /\.(png|jpg|gif|jpeg|webp)$/g,
        ($img: string) => `-small${$img}`,
      );
      return {
        src: item.newPath,
        msrc: srcSmall,
        alt: item.alt || '',
        title: item.title || '',
        w: item.width,
        h: item.height,
      };
    });
    console.log(srcUrl);
    this.reader = srcUrl;
  }

  /*=============================================
  =                      Method                 =
  =============================================*/

  // private get srcUrl() {
  //   const srcUrl = this.UploadImage.map((item: any) => item.newPath);
  //   this.$set(this.imageList, 'reader', srcUrl);
  //   return;
  // }
  private onAddClickHandle() {
    this.showActionSheet({
      value: true,
      options: [
        {
          text: '拍摄',
          value: '0',
        },
        {
          text: '从手机相册选择',
          value: '1',
        },
      ],
      cancelText: '取消',
      onSelected: this.ActionSelected,
    });
  }
  private ActionSelected(item: any) {
    Toast.loading('加载中...');
    // 最多几张图
    const nums = Number(this.amount);
    // 现在有几张图
    const imageLength = this.UploadImage.length;
    // 需要补几张图
    const imageUpdateIndex = nums - imageLength + '';
    // 调用原生图片或照相机
    this.nativePhotoOrPicture(item.value, imageUpdateIndex)
      .then((res: any) => {
        console.log(res);
        // 没有选择就直接返回
        if (res.length === 0) {
          Toast.hide();
          return;
        }
        const result = res.slice(0, nums - imageLength);
        this.onReaderSelect(result);
      })
      .catch((err: any) => {
        Toast.failed(`${err}`, 1000);
        console.log(err);
      });
  }
  /**
   * 选择拍照还是相册
   *
   * @author weiyafei
   * @date 2019-12-03-17:41:44
   * @param {Object} option: number 0 => 拍照，1=> 相册
   */
  private nativePhotoOrPicture(option: number = 1, max: string = this.amount) {
    return new Promise((resolve, reject) => {
      return option >>> 0 === 0 //保证为数字
        ? nativeMethod(
            'takephone',
            { path: '' },
            (detail: any) => {
              resolve(detail);
            },
            (err: any) => {
              reject(err);
            },
          )
        : nativeMethod(
            'chooseimg',
            { maxSelect: max },
            (detail: any) => {
              resolve(detail);
            },
            (err: any) => {
              reject(err);
            },
          );
    });
  }
  /**
   * 图片选择完成事件
   *
   * @param {Array} res 图片对象集合
   * @author weiyafei
   * @date 2019-12-02 17:13:22
   */
  private onReaderSelect(res: any[]) {
    // 推入数组
    this.UploadImage.push(...res);
    Toast.hide();
    // 取一个src 数组
  }
  /**
   * 删除图片事件
   *
   * @param {String} name 选择器标识
   * @param {Number} index 错误标识，见附录
   * @author weiyafei
   * @date 2019-12-02 17:13:22
   */
  private onDeleteImage(index: number) {
    this.UploadImage.splice(index, 1);
    // this.imageList['reader'].splice(index, 1);
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
  =                     Mounted                 =
  =============================================*/
  private mounted() {
    const srcUrl = this.UploadImage.map((item: any) => item && item.newPath);
    // this.$set(this.imageList, 'reader', srcUrl);
    this.reader = srcUrl;
  }
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
        /* 图片上传按钮 */
        .image-reader-btn {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
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
/deep/.md-image-viewer .viewer-item-wrap .item {
  display: block !important;
}
</style>