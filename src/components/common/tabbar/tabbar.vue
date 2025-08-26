<template>
  <view>
    <wd-tabbar v-model="active" @change="onChange">
      <wd-tabbar-item
        v-for="i in tabbars"
        :title="i.title"
        :key="i.title"
        :icon="i.icon"
        :name="i.title"
      ></wd-tabbar-item>
    </wd-tabbar>
  </view>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  tabbars: {
    type: Array,
    default: () => [],
  },
  active: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:active", "change"]);

const tabbars = computed(() => props.tabbars);
const active = computed({
  get() {
    return props.active;
  },
  set(val) {
    emit("update:active", val);
  },
});

function onChange(e) {
  emit("change", e);
}
</script>

<style lang="scss" scoped></style>
