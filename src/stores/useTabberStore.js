import { defineStore } from "pinia";

export const useTabberStore = defineStore("tabber", {
  state: () => {
    return {
      tabberList: [
        {
          title: "工作台",
          icon: "home",
        },
        {
          title: "我的",
          icon: "user",
        },
      ],
      active: "工作台",
      // components: {
      //   工作台: () => import("@/components/workerbench/workerbench.vue"),
      //   我的: () => import("@/components/my/my.vue"),
      // },
    };
  },
  actions: {
    addTabber(item) {
      this.tabberList.push(item);
    },
    removeTabber(item) {
      this.tabberList = this.tabberList.filter((i) => i.path !== item.path);
    },
    setActive(item) {
      this.active = item.value;
    },
  },
  getters: {
    // getComponent() {
    //   return this.components[this.active];
    // },
  },
});
