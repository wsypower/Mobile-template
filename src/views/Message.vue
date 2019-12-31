<template>
  <div class="massage_list">
    <page-header
      ref='header'
      :transparent="1"
      title='消息'
      rightText='清空'
      @backClickHandler="backClickHandler"
      @rightBtnClickHandler='rightBtnClickHandler'
    />
    <main>
      <md-scroll-view
        ref="scrollView"
        :scrolling-x='false'
        auto-reflow
      >
        <div
          class="result_page"
          v-if='list.length==0'
        >
          <md-result-page></md-result-page>
        </div>
        <!-- 列表项 -->
        <div
          class="massage_list_item_warp"
          v-for='(item,index) in list'
          :key='index'
          tabindex
          @click=listClickHandler(item,index)
        >
          <div
            class="massage_list_item border-bottom-1px"
            flex='box:justify'
          >
            <div
              class="layout-left layout-justify"
              flex='main:center'
            >
              <div class="avatar"></div>
            </div>
            <div
              class="layout-center"
              flex='dir:top '
            >
              <div
                class="center-top"
                flex='main:left '
              >{{item.username}}</div>
              <div
                class="center-cen"
                flex='main:left '
              >

                <!--  v-if="new Boolean(item.isread)"-->
                <span v-if='item.replyname'>
                  <md-icon
                    v-if="item.type==0"
                    slot="icon"
                    svg
                    name="heart"
                    size="md"
                    color='#576B95'
                    class="star"
                  ></md-icon>
                  {{`@${item.replyname}: ${item.commentcontent}` }}
                </span>
                <span v-else>
                  <md-icon
                    v-if="item.type==0"
                    slot="icon"
                    svg
                    name="heart"
                    size="md"
                    color='#576B95'
                    class="star"
                  ></md-icon>
                  {{`${item.commentcontent}` }}
                </span>
              </div>
              <div
                class="center-bot"
                flex='main:left '
              >{{item.createtime | date_format}}</div>
            </div>
            <div class="layout-right layout-justify">
              <!-- 优先显示图片 -->
              <div
                class="image-warp"
                v-if='item.image'
              >
                <img
                  :src="SetImageToSmall(item.image)"
                  alt=""
                >
              </div>
              <!-- 其次显示文字 -->
              <div
                class="text-warp"
                v-else
              >
                <span>
                  {{item.subjectcontent ||''}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </md-scroll-view>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Ref, Watch, Model } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import ActionSheetMixin from '@/mixin/ActionSheet';
import PageHeader from '@/components/base/PageHeader.vue';
import { ScrollView, Icon, Toast, ResultPage } from 'mand-mobile';
import { AsyncGetMessageList, AsyncDeleteMessage } from '../api/modules.ts/friend/message';
import { AsyncClearMessage, AsyncGetSubjectDetail } from '@/api/modules.ts/friend/list';
@Component({
  name: 'MessageList',
  components: {
    PageHeader,
    [ScrollView.name]: ScrollView,
    [Icon.name]: Icon,
    [ResultPage.name]: ResultPage,
  },
})
export default class MessageList extends mixins(ActionSheetMixin) {
  private list: any = [];
  /**
   * 大图转为小图
   */
  private SetImageToSmall(image: string): string {
    return image.replace(/\.(png|jpg|gif|jpeg|webp)$/g, ($img: string) => `-small${$img}`);
  }
  /**
   * 后退
   */
  private backClickHandler() {
    this.$router.go(-1);
  }
  /**
   * 列表项点击
   */
  private listClickHandler(item: any, index: number) {
    console.log(item);
    this.showActionSheet({
      value: true,
      options: [
        {
          text: '查看详情',
          value: item,
        },
        {
          text: '删除消息',
          value: { item, index },
        },
      ],
      defaultIndex: 0,
      cancelText: '取消',
      onSelected: this.ItemActionsClickHandler,
    });
  }
  private ItemActionsClickHandler(item: any) {
    if (item.text == '查看详情') {
      AsyncGetSubjectDetail({
        subjectid: item.value.subjectid,
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      // if (item.value.type === 2) {
      //   console.log(111);
      //   Toast.failed('评论已删除');
      //   return;
      // }
      // this.$router.push({
      //   path: '/self/history/look/details',
      //   query: { subjectid: item.value.subjectid },
      // });
    }
    if (item.text == '删除消息') {
      console.log(item);
      AsyncDeleteMessage({
        messageid: item.value.item.messageid,
      }).then(res => {
        console.log(res);
        this.list.splice(item.value.index, 1);
      });
    }
  }
  /**
   * 头部清空按钮
   */
  private rightBtnClickHandler() {
    this.showActionSheet({
      value: true,
      options: [
        {
          text: '清空所有消息',
          value: '0',
        },
      ],
      defaultIndex: 0,
      cancelText: '取消',
      onSelected: this.clearList,
    });
  }
  /**
   * 清楚回调
   */
  private clearList() {
    console.log('清楚列表');
    AsyncClearMessage().then(res => {});
  }
  private mounted() {
    AsyncGetMessageList().then(res => {
      console.log(res);
      this.list = res;
    });
  }
}
</script>

<style lang="scss" scoped>
.massage_list {
  width: 100%;
  height: 100%;
  main {
    width: 100%;
    height: 100%;
    padding-top: 87px;
    background-color: #fff;

    .massage_list_item_warp {
      width: 100%;
      padding: 0px 20px;
      &:active {
        background-color: rgb(242, 242, 242);
      }
      .massage_list_item {
        width: 100%;
        height: 190px;
        .layout-justify {
          height: 100%;
          width: 110px;
        }
        .layout-left {
          padding-top: 15px;
          /* 头像 */
          .avatar {
            width: 84px;
            height: 84px;
            @include switch-img('~@img/friends-items');
          }
        }

        .layout-center {
          padding-top: 15px;
          height: 100%;
          padding-left: 15px;
          .center-top {
            width: 100%;
            height: 40px;
            font-size: 32px;
            color: #576b95;
            text-align: left;
          }
          .center-cen {
            padding-top: 5px;
            width: 100%;
            height: 90px;
            font-size: 28px;
            text-align: left;
            padding-right: 5px;
            overflow: hidden;
            span {
              overflow: hidden;
              @include ellipsis-lines(2);
              padding-top: 5px;
            }
          }
          .center-bot {
            font-size: 27px;
            color: #999999;
            padding-bottom: 7px;
          }
        }
        .layout-right {
          padding-top: 15px;
          height: 146px;
          width: 120px;
          .text-warp {
            overflow: hidden;
            width: 100%;
            height: 100%;
            font-size: 28px;
            text-align: left;
            span {
              @include ellipsis-lines(3);
            }
          }
          .image-warp {
            border-radius: 4px;
            overflow: hidden;
            width: 100%;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }
      /* 1px兼容 */
      .border-bottom-1px {
        &::after {
          border-color: #e0e0e0;
        }
      }
    }
  }
  .star {
    margin-right: 5px;
    vertical-align: sub;
  }
  /deep/.result_page {
    margin-top: 40%;
    .md-result-text {
      color: #bebfc1;
    }
  }
}
</style>