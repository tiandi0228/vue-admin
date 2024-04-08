import { defineStore } from "pinia";
import { PersistedStateOptions } from "pinia-plugin-persistedstate";
import { UserState } from "@/store/interface";

// 持久化参数配置
const persist: PersistedStateOptions = {
  key: "user",
  storage: localStorage,
  paths: ["token", "userInfo"],
};

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    token: "",
    userInfo: { username: "admin", avatar: "" },
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUserInfo(userInfo: UserState["userInfo"]) {
      this.userInfo = userInfo;
    },
  },
  persist: persist,
});
