<template>
  <!-- 当元素滚动宽度超过当前宽度的时候，就显示tooltip -->
  <el-tooltip :content="name" placement="top" effect="light" :disabled="tooltipDisabled">
    <span
      class="tooltip-text-overflow animate__animated animate__fadeIn"
      :style="`width: ${width};font-size:${size};color: ${color};font-weight: ${weight};text-align: ${align};line-height: ${lineHeight}`"
      :data-name="name"
      @mouseenter="onMouseEnter"
      >{{ name }}
    </span>
  </el-tooltip>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  width: {
    type: [String, Number],
    default: "100%",
  },
  size: {
    type: [String, Number],
    default: "1rem",
  },
  color: {
    type: String,
    default: "#676767",
  },
  weight: {
    type: [String, Number],
    default: "400",
  },
  align: {
    type: String,
    default: "left",
  },
  lineHeight: {
    type: Number,
    default: 1,
  },
});

const tooltipDisabled = ref(true);

/**
 * 当鼠标进入元素时触发的函数
 * 该函数的目的是决定是否根据元素的滚动宽度和当前宽度来显示tooltip
 */
const onMouseEnter = () => {
  // 根据props的name属性查找对应的数据节点
  const nameNode = document.querySelector(`[data-name="${props.name}"]`);
  if (nameNode) {
    // 当元素滚动宽度超过当前宽度的时候，就显示tooltip
    if (nameNode.offsetWidth < nameNode.scrollWidth) {
      // 显示
      tooltipDisabled.value = false;
    } else {
      // 不显示
      tooltipDisabled.value = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.tooltip-text-overflow {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
</style>
