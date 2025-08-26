import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userInfo: {},
    };
  },
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
  },
});
