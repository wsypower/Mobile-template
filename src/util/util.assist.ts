/**
 * 获取元素样式
 * @param {HTMLElement} dom
 * @param {styleClass} styleClass
 */
interface GetElementStyle {
  (dom: HTMLElement, styleClass: string): string;
}

export const getElementStyle: GetElementStyle = (dom: HTMLElement, styleClass: string): string =>
  window.getComputedStyle(dom).getPropertyValue(styleClass);

//assist
