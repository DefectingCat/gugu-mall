import { reactive } from 'vue';
// types
import { ProfileAnimation } from '@/types/profile';

export const profileAnimation = (): ProfileAnimation => {
  // 保存列表
  const content: { list: HTMLElement[] } = reactive({
    list: [],
  });
  // vfor循环中推送列表
  const setListItem = (el: HTMLElement) => {
    content.list?.push(el);
  };
  const listAnimat = () => {
    // 手搓动画
    // 每个动画间隔增加100ms，持续实际增加100ms
    let time = 0.2;
    let timeout = 0;
    for (const i of content.list) {
      setTimeout(() => {
        i.style.transform = `translateY(0px)`;
        i.style.transition = `all ${time}s`;
        i.style.opacity = `1`;
      }, timeout);
      time += 0.1;
      timeout += 100;
    }
  };
  return {
    setListItem,
    listAnimat,
  };
};
