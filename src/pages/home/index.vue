<template>
  <view class="w-full h-screen flex flex-col">
    <view class="flex-1"> </view>
    <Tabbar
      :tabbars="tabberStore.tabberList"
      :active="tabberStore.active"
      @change="onChange"
    ></Tabbar>
  </view>
</template>

<script setup>
import Tabbar from "@/components/common/tabbar/tabbar.vue";
import { useTabberStore } from "@/stores/useTabberStore";

const tabberStore = useTabberStore();

function onChange(e) {
  tabberStore.setActive(e);
}
</script>

<style lang="scss" scoped></style>
