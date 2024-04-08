export interface UserState {
  token: string;
  userInfo: { username: string; avatar: string };
}

export interface MenuState {
  id?: string;
  path: string;
  title: string;
  icon?: any;
}

export interface TabsState {
  tabs: MenuState[];
}
