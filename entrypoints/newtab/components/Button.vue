<script lang="ts" setup>
export interface ButtonProps {
  active?: boolean
}

const props = defineProps<ButtonProps>();
</script>

<template>
  <button class="btn px-4 py-2" :class="{ active }">
    <slot></slot>
  </button>
</template>

<style lang="less" scoped>
.btn {
  border: none;
  cursor: pointer;
  background: none;

  --uno: text-gray-6 flex gap-1 items-center;
  text-decoration: none;

  &.active,

  &:hover {
    --uno: bg-gray-1 text-gray-8;
  }

  &:active {
    --uno: bg-gray-2 text-gray-8;
  }

}
</style>
