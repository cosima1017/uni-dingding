<template>
  <view class="w-full h-screen flex flex-col">
    <view class="flex-1">
    <My v-if="tabberStore.active === '我的'" />
    <Workerbench v-else />
    </view>
    <Tabbar
      :tabbars="tabberStore.tabberList"
      :active="tabberStore.active"
      @change="onChange"
    ></Tabbar>
  </view>
</template>

<script setup>
import Tabbar from "@/components/common/tabbar/tabbar.vue";
import My from "@/components/my/my.vue";
import Workerbench from '@/components/workerbench/workerbench.vue'
import { useTabberStore } from "@/stores/useTabberStore";

const tabberStore = useTabberStore();

function onChange(e) {
  tabberStore.setActive(e);
}
</script>

<style lang="scss" scoped></style>
