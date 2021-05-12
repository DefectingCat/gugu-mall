export type ProfileEffect = {
  listMsg: {
    id: number;
    msg: string;
    icon: string;
  }[];
  listClick: (
    e: MouseEvent & {
      target: HTMLElement;
    }
  ) => void;
};

export type ProfileAnimation = {
  setListItem: (el: HTMLElement) => void;
  listAnimat: () => void;
};
