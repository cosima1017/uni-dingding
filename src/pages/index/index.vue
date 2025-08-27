<template>
  <view class="content px-7">
    <view class="text-2xl">欢迎使用</view>
    <wd-button
      block
      :round="false"
      size="large"
      custom-class="w-full"
      @click="login"
      >钉钉授权登录</wd-button
    >
    <view class="agree-box flex items-center gap-1">
      <wd-checkbox v-model:modelValue="check" shape="square"> </wd-checkbox>
      <span
        >登录即同意<view
          class="text-blue-500 inline-block"
          @click="showMessage('serve')"
          >服务协议</view
        >
        和<view class="text-blue-500 inline-block">用户隐私政策</view></span
      >
    </view>
  </view>
  <wd-message-box :closeOnClickModal="false" type="confirm">
    <view
      >您还未勾选<view class="text-blue-500 inline-block">服务协议</view>、<view
        class="text-blue-500 inline-block"
        >用户隐私政策</view
      >， <br />
      请问是否已经阅读并同意改协议和政策？</view
    >
  </wd-message-box>
</template>

<script setup>
import dd from "dingtalk-jsapi";
import { ref } from "vue";
import { request } from "@/utils/request";
import { corpId, clientId, clientSecret } from "@/constants";
import { useUserStore } from "@/stores/useUserStore";
import { useMessage } from "wot-design-uni";
const message = useMessage();
// import { onShow } from "@dcloudio/uni-app";
const userStore = useUserStore();
const check = ref(false);
/**
 * 登录
 */
async function login() {
  if (!check.value) return showMessage();
  try {
    const [authCode, access_token] = await Promise.all([
      getAuthCode(),
      getAccessToken(),
    ]);
    if (authCode && access_token) {
      getUserInfo(authCode, access_token);
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * 获取access_token
 * @returns {Promise<string>}
 */
async function getAccessToken() {
  try {
    const res = await request({
      url: `https://api.dingtalk.com/v1.0/oauth2/${corpId}/token`,
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      data: {
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      },
    });
    // console.log(res);
    return res.access_token;
  } catch (error) {
    console.error("请求出错:", error);
  }
}
/**
 * 获取授权码
 * @returns {Promise<string> | null>}
 */
async function getAuthCode() {
  return new Promise((resolve, reject) => {
    dd.getAuthCode({
      corpId,
      clientId,
      success: function (res) {
        resolve(res.authCode);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
}

/**
 * 获取用户id
 * @param {string} authCode 授权码
 * @param {string} accectToken 访问令牌
 * @returns {Promise<object>}
 */
async function getUserId(authCode, accectToken) {
  try {
    const res = await request({
      url: `https://oapi.dingtalk.com/topapi/v2/user/getuserinfo?access_token=${accectToken}`,
      method: "POST",
      data: { code: authCode },
    });
    if (res.errcode === 0) {
      return res.result.userid;
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * 获取用户信息
 * @param {string} userId
 * @param {string} accectToken
 * @returns {Promise<object>}
 */
async function getUserInfo(authCode, accectToken) {
  try {
    const userid = await getUserId(authCode, accectToken);
    const res = await request({
      url: `https://oapi.dingtalk.com/topapi/v2/user/get?access_token=${accectToken}`,
      method: "POST",
      data: {
        userid,
      },
    });
    if (Object.is(res.errcode, 0)) {
      userStore.setUserInfo(res.result);
      console.log(userStore.userInfo);
      uni.navigateTo({
        url: "/pages/home/index",
      });
    }
    // console.log(res);
  } catch (error) {
    console.log(error);
  }
}

function showMessage(type) {
  message
    .alert({
      msg: "提示",
    })
    .then(() => {})
    .catch(() => {});
}

// onMounted(() => {
//   console.log(123);
// });

// onShow(() => {
//   console.log(123, "show");
// });
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
