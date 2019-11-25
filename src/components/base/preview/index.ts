import PreviewComponent from './preview.vue';
import PhotoSwipe from 'photoswipe/dist/photoswipe';
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';

const VuePreview = {
  install(Vue, options) {
    Vue.component('VuePreview', {
      mixins: [PreviewComponent],
      props: {
        slides: Array,
      },
      methods: {
        initPhotoSwipeFromDOM(gallerySelector) {
          const self = this;
          // parse slide data (url, title, size ...) from DOM elements
          // (children of gallerySelector)
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
              // 仅包含元素节点
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
                // See选项->文档的getThumbBoundsFn部分以获取更多信息
                let thumbnail = items[index].el.getElementsByTagName('img')[0]; // find thumbnail
                let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                let rect = thumbnail.getBoundingClientRect();
                return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
              },
              ...options,
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
                // 在URL索引中从1开始
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
        },
      },
      mounted() {
        this.initPhotoSwipeFromDOM('.my-gallery');
      },
    });
  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VuePreview);
}

export default VuePreview;
