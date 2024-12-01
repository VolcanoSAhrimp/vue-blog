<script setup>
import BlogHeader from "./header/blog-header.vue";
import BlogMain from "./main/blog-main.vue";
import BlogFooter from "./footer/blog-footer.vue";
</script>
<template>
  <div class="layout">
    <!-- 导航栏-开始 -->
    <BlogHeader></BlogHeader>
    <!-- 导航栏-结束 -->
     <!-- 主体-开始 -->
    <BlogMain></BlogMain>
    <!-- 主体-结束 -->
     <!-- 底部-开始 -->
    <BlogFooter></BlogFooter>
    <!-- 底部-结束 -->
  </div>
</template>

<style lang="scss" scoped></style>
