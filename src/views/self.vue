<template>
  <div class="friend-self">
    <page-header
      ref="header"
      @backClickHandler="backClickHandler"
      icon=""
      title="朋友圈"
    />
    <main>
      <!-- 滚动条 -->
      <md-scroll-view
        ref="scrollView"
        @scroll="$_onScroll"
        :scrolling-x="false"
        auto-reflow
      >
        <!-- 主要内容 -->
        <div class="layout-main">

          <!-- 头部设置 -->
          <header
            class="layout-self"
            flex="box:first"
          >
            <div
              class="selt-left"
              flex="cross:center"
            >
              <div class="user_avatar"></div>
            </div>
            <div
              class="self-right"
              flex='main:center dir:top'
            >
              <div class="user_name">
                {{selfData.username}}
                <md-icon
                  name="man"
                  size="sm"
                  color="#3A9DFD"
                  svg
                  v-if='!sex'
                ></md-icon>
                <md-icon
                  name="woman"
                  size="sm"
                  color="#F5766C"
                  v-else
                  svg
                ></md-icon>
              </div>
              <md-cell-item
                :title="area"
                no-border
              />
              <md-cell-item
                :title="phone"
                arrow
                no-border
              />
            </div>
          </header>
          <div class="layout-centet">
            <md-cell-item
              title="朋友圈"
              arrow
            />
            <md-cell-item
              v-if="selfId === userId"
              title="个人设置"
              arrow
              @click="onClick"
            />
          </div>

        </div>
      </md-scroll-view>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Ref, Watch, Model } from 'vue-property-decorator';
import PageHeader from '@/components/base/PageHeader.vue';
import { ScrollView, Field, CellItem, Dialog, Icon } from 'mand-mobile';
import { AsyncGetUserInfo } from '@/api/modules.ts/friend/list';
import { UserModule } from '@/store/modules/user';

@Component({
  name: 'FriendsSelf',
  components: {
    PageHeader,
    [ScrollView.name]: ScrollView,
    [Field.name]: Field,
    [CellItem.name]: CellItem,
    [Icon.name]: Icon,
  },
})
export default class FriendsSelf extends Vue {
  userId: any = '';
  selfData: any = {};
  private get area() {
    console.log(this.selfData);
    return `地区：${this.selfData.area}`;
  }
  private get phone() {
    return `手机：${this.selfData.phone}`;
  }
  private get selfId() {
    return UserModule.userId;
  }
  /**
   * 回到上一页
   *
   * @author weiyafei
   * @date 2019-12-12 14:58:43
   */
  private backClickHandler() {
    this.$router.go(-1);
  }
  /**
   * 请求数据
   */
  private AsyncGetUserInfo() {
    AsyncGetUserInfo({
      lookid: this.userId,
    }).then((res: any) => {
      console.log(res);
      this.selfData = res;
    });
  }
  /**
   * mounted
   */
  private mounted() {
    this.userId = this.$route.query.userId;
    console.log(this.userId);
    this.AsyncGetUserInfo();
  }
}
</script>

<style scoped lang="scss">
.friend-self {
  width: 100%;
  height: 100%;
  background-color: #f3f3f6;
  main {
    width: 100%;
    height: 100%;
    padding-top: 87px;
    .layout-main {
      width: 100%;
      /* 个人设置累头部 */
      .layout-self {
        width: 100%;
        height: 250px;
        background-color: #fff;
        padding: 0 30px;
        margin-bottom: 20px;
        .selt-left {
          height: 100%;
          width: 130px;
          .user_avatar {
            width: 130px;
            height: 130px;
            background-color: #ffffff;
            border-radius: 50%;
            border: solid 2px #ffffff;
            background: url('~@img/self.png') no-repeat;
            background-size: 100%;
          }
        }
        .self-right {
          height: 100%;
          padding-left: 35px;
          // padding-top: 35px;
          /deep/.md-cell-item-body {
            padding: 5px;
            padding-top: 15px;
            min-height: 0.5rem;
          }
          /deep/.md-cell-item-title {
            color: rgb(155, 157, 161);
            font-size: 27px;
          }
          .user_name {
            width: 100%;
            text-align: left;
            font-size: 35px;
            font-weight: bold;
            margin-right: 30px;
            padding-left: 5px;
          }
        }
      }
      .layout-centet {
        padding: 0 30px;
        background-color: #fff;
      }
      /deep/.md-cell-item-title {
        text-align: left;
      }
    }
  }
}
</style>