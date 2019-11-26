<template>
  <div>
    <div
      class="my-gallery"
      itemscope
      itemtype="http://schema.org/ImageGallery"
    >
      <template v-for="item in slides">
        <figure
          itemprop="associatedMedia"
          itemscope
          itemtype="http://schema.org/ImageObject"
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
          >{{item.title}}</figcaption>
        </figure>
      </template>
    </div>
    <!-- 弹窗模板 -->
    <div
      class="pswp"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="pswp__bg"></div>
      <div class="pswp__scroll-wrap">
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
        <div class="pswp__ui pswp__ui--hidden">

          <div class="pswp__top-bar">
            <div class="pswp__counter"></div>
            <button
              class="pswp__button pswp__button--close"
              title="Close (Esc)"
            ></button>
            <button
              class="pswp__button pswp__button--share"
              title="Share"
            ></button>
            <button
              class="pswp__button pswp__button--fs"
              title="Toggle fullscreen"
            ></button>
            <button
              class="pswp__button pswp__button--zoom"
              title="Zoom in/out"
            ></button>
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>
          <button
            class="pswp__button pswp__button--arrow--left"
            title="Previous (arrow left)"
          >
          </button>
          <button
            class="pswp__button pswp__button--arrow--right"
            title="Next (arrow right)"
          >
          </button>
          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Model, Ref } from 'vue-property-decorator';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';

@Component({
  name: 'PictureViewer',
})
export default class PictureViewer extends Vue {
  /**
   * 图像对象数组
   */
  @Prop({
    type: Array,
  })
  slides!: any[];

  /**
   * 打开的索引
   */
  @Prop({
    type: Number,
  })
  index!: number;

  /**
   * 配置项
   */
  @Prop()
  option!: any;

  // 初始化函数
  initPhotoSwipeFromDOM(gallerySelector) {
    // 保存this
    const self = this;
    // 从DOM元素解析幻灯片数据（URL，标题，大小...）
    // （gallerySelector的子代）
    const parseThumbnailElements = function(el) {
      let thumbElements = el.childNodes;
      let numNodes = thumbElements.length;
      let items = [];
      let figureEl;
      let linkEl;
      let size;
      let item;
      for (let i = 0; i < numNodes; i++) {
        figureEl = thumbElements[i]; // <figure> element
        //仅包含元素节点
        if (figureEl.nodeType !== 1) {
          continue;
        }
        linkEl = figureEl.children[0]; // <a> element
        size = linkEl.getAttribute('data-size').split('x');
        // 创建幻灯片对象
        item = {
          src: linkEl.getAttribute('href'),
          w: parseInt(size[0], 10),
          h: parseInt(size[1], 10),
        };
        if (figureEl.children.length > 1) {
          // <figcaption>内容
          item.title = figureEl.children[1].innerHTML;
        }
        if (linkEl.children.length > 0) {
          // <img>缩略图元素，检索缩略图URL
          item.msrc = linkEl.children[0].getAttribute('src');
        }
        item.el = figureEl; // 保存指向getThumbBoundsFn的元素的链接
        items.push(item);
      }
      return items;
    };
    // 查找最近的父元素
    const closest = function closest(el, fn) {
      return el && (fn(el) ? el : closest(el.parentNode, fn));
    };
    // 当用户单击缩略图时触发
    const onThumbnailsClick = function(e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      let eTarget = e.target || e.srcElement;
      // 找到幻灯片的根元素
      let clickedListItem = closest(eTarget, function(el) {
        return el.tagName && el.tagName.toUpperCase() === 'FIGURE';
      });
      if (!clickedListItem) {
        return;
      }
      // 通过遍历所有子节点查找被单击项的索引
      // 或者，您可以通过data-Attribute定义索引
      let clickedGallery = clickedListItem.parentNode;
      let childNodes = clickedListItem.parentNode.childNodes;
      let numChildNodes = childNodes.length;
      let nodeIndex = 0;
      let index;
      for (let i = 0; i < numChildNodes; i++) {
        if (childNodes[i].nodeType !== 1) {
          continue;
        }
        if (childNodes[i] === clickedListItem) {
          index = nodeIndex;
          break;
        }
        nodeIndex++;
      }
      if (index >= 0) {
        // 如果找到有效索引，则打开PhotoSwipe
        openPhotoSwipe(index, clickedGallery);
      }
      return false;
    };
    // 从URL（＃＆pid = 1＆gid = 2）解析图片索引和画廊索引
    const photoSwipeParseHash = function() {
      let hash = window.location.hash.substring(1);
      let params = {};
      if (hash.length < 5) {
        return params;
      }
      let vars = hash.split('&');
      for (let i = 0; i < vars.length; i++) {
        if (!vars[i]) {
          continue;
        }
        let pair = vars[i].split('=');
        if (pair.length < 2) {
          continue;
        }
        params[pair[0]] = pair[1];
      }
      if (params.gid) {
        params.gid = parseInt(params.gid, 10);
      }
      return params;
    };
    const openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
      let gid = galleryElement.getAttribute('data-pswp-uid') - 1 || 0;
      let pswpElement = document.querySelectorAll('.pswp')[gid];
      let gallery;
      let photoSwipeOptions;
      let items;
      items = parseThumbnailElements(galleryElement);
      // 定义photoSwipeOptions（如果需要）
      photoSwipeOptions = {
        // 定义画廊索引（用于URL）
        galleryUID: galleryElement.getAttribute('data-pswp-uid'),
        getThumbBoundsFn: function(index) {
          // 有关更多信息，请参见文档的“选项”->“ getThumbBoundsFn”部分
          let thumbnail = items[index].el.getElementsByTagName('img')[0]; // 查找缩略图
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
          let rect = thumbnail.getBoundingClientRect();
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        },
        ...self.options,
      };
      // 从URL打开PhotoSwipe
      if (fromURL) {
        if (photoSwipeOptions.galleryPIDs) {
          // 使用自定义PID时解析实数索引
          // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
          for (let j = 0; j < items.length; j++) {
            if (items[j].pid === index) {
              photoSwipeOptions.index = j;
              break;
            }
          }
        } else {
          // in URL indexes start from 1
          photoSwipeOptions.index = parseInt(index, 10) - 1;
        }
      } else {
        photoSwipeOptions.index = parseInt(index, 10);
      }
      // 如果找不到索引则退出
      if (isNaN(photoSwipeOptions.index)) {
        return;
      }
      if (disableAnimation) {
        photoSwipeOptions.showAnimationDuration = 0;
      }
      // 将数据传递到PhotoSwipe并对其进行初始化
      gallery = new PhotoSwipe(pswpElement, PhotoSwipeUIDefault, items, photoSwipeOptions);
      gallery.init();
      // Gallery starts closing
      gallery.listen('close', function() {
        self.$emit('close');
      });
    };
    // 遍历所有图库元素并绑定事件
    const galleryElements = document.querySelectorAll(gallerySelector);
    for (let i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute('data-pswp-uid', i + 1);
      galleryElements[i].onclick = onThumbnailsClick;
    }
    // 解析URL并打开画廊（如果包含＃＆pid = 3＆gid = 1）
    const hashData = photoSwipeParseHash();
    if (hashData.pid && hashData.gid) {
      openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
  }
  mounted() {
    this.initPhotoSwipeFromDOM('.my-gallery');
  }
}
</script>

<style>
@import '~photoswipe/dist/photoswipe.css';
@import '~photoswipe/dist/default-skin/default-skin.css';
</style>
