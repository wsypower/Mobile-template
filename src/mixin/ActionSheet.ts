import { Component, Vue } from 'vue-property-decorator';
import { ActionSheet, Button, Dialog } from 'mand-mobile';

export type ActionSheetItem = {
  value: string;
  text: string;
};

export type ActionSheetCreateOptions = {
  /**
   * 面板是否立即可见
   *
   * @type {boolean}
   */
  value?: boolean;
  /**
   * 面板标题
   *
   * @type {string}
   */
  title?: string;
  /**
   * 面板选项
   *
   * @type {Array<ActionSheetItem>}
   */
  options: Array<ActionSheetItem>;
  /**
   * 默认选中项
   *
   * @type {number}
   */
  defaultIndex?: number;
  /**
   * 禁用选择项索引
   *
   * @type {number}
   */
  invalidIndex?: number;
  /**
   * 取消按钮文案
   *
   * @type {string}
   */
  cancelText?: string;
  /**
   * 面板最高高度, 超出后可滚动
   *
   * @type {number}
   */
  maxHeight?: number;
  /**
   * 面板展示回调
   */
  onShow?: () => void;
  /**
   * 面板隐藏回调
   */
  onHide?: () => void;
  /**
   * 选择回调
   */
  onSelected?: (item: ActionSheetItem) => void;
  /**
   * 取消选择回调
   */
  onCancel?: () => void;
};

@Component({
  name: 'ActionSheetMixin',
  components: {
    [ActionSheet.name]: ActionSheet,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
  },
})
export default class ActionSheetMixin extends Vue {
  showActionSheet(
    CreateOptions: ActionSheetCreateOptions = {
      value: true,
      title: '操作说明的标题',
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
      onSelected: this.selected,
    },
  ) {
    ActionSheet.create(CreateOptions);
  }
  selected(item: ActionSheetItem) {
    console.log(item);
    this.$router.push('/upload');
  }
}
