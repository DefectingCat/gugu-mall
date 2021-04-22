import { reactive } from 'vue';

type ListData = {
  listRefs: HTMLElement[];
  prePrevious: HTMLElement;
  preNext: HTMLElement;
};
type ListEffect = {
  listData: ListData;
  setListRef: (el: HTMLElement) => void;
};

const listEffect = (): ListEffect => {
  const listData: ListData = reactive({
    listRefs: [],
    // 获取到的节点类型时HTMLElement，所以这里需要使用createElement创建一个HTMLElement
    prePrevious: document.createElement('div'),
    preNext: document.createElement('div'),
  });
  const setListRef = (el: HTMLElement) => {
    // 每次节点改变时，都会触发这个方法，会导致一直push
    // 为了防止长度无限增加，需要添加条件判断
    if (el && listData.listRefs.length < 16) {
      listData.listRefs.push(el);
    }
  };

  return {
    listData,
    setListRef,
  };
};

export { listEffect };
