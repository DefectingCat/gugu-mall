import { reactive } from 'vue';
// vant
import { Toast } from 'vant';
// types
import { ProfileEffect } from '@/types/profile';
export const profileEffect = (): ProfileEffect => {
  const listMsg = reactive([
    { id: 1, msg: '我的消息', icon: '#icon-xiaoxi' },
    { id: 2, msg: '我的会员', icon: '#icon-huiyuan' },
    { id: 3, msg: '积分商城', icon: '#icon-jifen' },
    { id: 4, msg: '问候咸鱼作者', icon: '#icon-yu' },
    { id: 5, msg: '看看咸鱼其他项目', icon: '#icon-qitazhengquan' },
  ]);
  // 列表点击事件
  let msg = '🐟';
  const listClick = (e: MouseEvent & { target: HTMLElement }) => {
    const id = e.target.getAttribute('data-xfy-id');
    switch (id) {
      case '1':
        Toast((msg += '°'));
        break;
      case '2':
        Toast((msg += '°'));
        break;
      case '3':
        Toast((msg += '°'));
        break;
      case '4':
        window.open('https://t.me/Defectink');
        break;
      case '5':
        window.open('https://github.com/DefectingCat');
        break;
    }
  };
  return {
    listMsg,
    listClick,
  };
};
