<script setup lang="ts">
import { backgroundServiceClient } from './services';

async function test() {
  const resp = await backgroundServiceClient.gesture.execGestures([])
  console.log('Popup test response:', resp)
}
</script>

<template>
  <div class="mt-100px">
    <button @click="test">Test</button>
    Popup Content
  </div>
</template>

<style lang="less"></style>
