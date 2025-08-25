<template>
  <view class="content px-5">
    <view class="text-2xl">欢迎使用</view>
    <wd-button block :round="false" custom-class="w-full"
      >钉钉授权登录</wd-button
    >
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
    }
  },
  onLoad() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  :deep() {
    .custom-button {
      width: 100%;
    }
  }
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
