<template>
  <div class="main_box">
    <router-view v-slot="{ Component }">
      <!-- 还有分割？ -->
      <keep-alive>
        <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.fullPath"></component>
      </keep-alive>
      <!-- 这里难道是同时存在的？ -->
      <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.fullPath"></component>
      <!-- 那这里又是个啥？ -->
    </router-view>
  </div>
</template>