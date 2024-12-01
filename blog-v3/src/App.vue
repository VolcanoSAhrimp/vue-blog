<script setup>
import { ref, reactive, onMounted, h } from "vue";
import { isMobile, getWelcomeSay } from "@/utils/tool";
import { addView, getAllPageHeader } from "@/api/config";
import { useRoute, useRouter } from "vue-router";
import { ElNotification } from "element-plus";

import { storeToRefs } from "pinia";
import { user, staticData } from "@/store/index.js";

import MusicPlayer from "@/components/Music/index";
import BackTop from "@/components/BackTop/index";
import ChatRoom from "@/components/ChatRoom/index";

// 初始化用户存储和路由相关对象
const userStore = user();
const router = useRouter();
const route = useRoute();
const { getUserInfo } = storeToRefs(userStore);
// 定义返回顶部组件的属性和设备类型判断变量
const backTopProps = reactive({
  right: "",
  svgWidth: 0,
});
const isPc = ref(true);

// 返回上一页的方法
const goBack = () => {
  router.go(-1);
};

// 获取所有的网站页面背景图
const getAllPageHeaderBg = async () => {
  const res = await getAllPageHeader();
  if (res.code == 0) {
    staticData().setPageHeaderLIst(res.result);
  } else {
    ElNotification({
      offset: 60,
      title: "错误提示",
      message: h("div", { style: "color: #f56c6c; font-weight: 600;" }, res.message),
    });
  }
};

// 显示欢迎信息
const welcome = () => {
  let msg = getWelcomeSay(getUserInfo.value.nick_name);
  if (getUserInfo.value.id == 3) {
    msg = "小婷光临，真是三生有幸";
  }
  ElNotification({
    offset: 60,
    title: "欢迎光临～～～",
    message: h("div", { style: "font-weight: 600;" }, msg),
  });
};

// 页面加载时执行的初始化操作
onMounted(async () => {
  backTopProps.right = 0;
  backTopProps.svgWidth = 6;
  isPc.value = !isMobile();

  await addView();
  if (window.name == "") {
    getAllPageHeaderBg();
    welcome();
  }
});
</script>

<template>
  <div class="app">
    <router-view></router-view>
    <!-- 根据路由路径和设备类型条件渲染组件 -->
    <BackTop
      v-if="route.path !== '/'"
      :right="backTopProps.right"
      :svgWidth="backTopProps.svgWidth"
      :rotateDeg="-42"
    />
    <i
      v-if="!isPc && ['home', '/'].includes(route.path)"
      class="iconfont icon-fanhui"
      @click="goBack"
    ></i>
    <MusicPlayer />
    <ChatRoom :isPc="isPc" v-if="route.path !== '/'" />
  </div>
</template>

<style lang="scss">
.app {
  width: 100%;
  box-sizing: border-box;
}

// 定义返回图标的位置和样式
.icon-fanhui {
  position: fixed;
  left: 5px;
  top: 60px;
  font-size: 2.2rem;
  color: var(--font-color);
  z-index: 999;
}
</style>