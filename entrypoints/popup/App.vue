<script setup lang="ts">
import { Button, Select, Tag } from 'tdesign-vue-next';
import { version } from '../../package.json'
import { contentServiceClient } from './services';


const state = reactive({
  userAgent: '',
})

loadCurrentActiveTabData();

const userAgentOptions = [
  { label: 'Default', value: '' },
  { label: 'Mobile', value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1' },
]

async function loadCurrentActiveTabData() {

}

async function applyUserAgent() {
  await contentServiceClient.userAgent.change(state.userAgent)
}

</script>

<template>
  <div class="page-size">
    <div class="badge p-2 bg-light-4">
      Universal Extension v{{ version }}
    </div>
    <div class="content p-2">
      <div class="user-agent-area">
        <div class="flex items-center gap-2">
          <Tag theme="primary" variant="light-outline">User Agent</Tag>
          <Select v-model="state.userAgent" :options="userAgentOptions" />
          <Button @click="applyUserAgent">Apply</Button>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="less">
.page-size {
  width: 600px;
  aspect-ratio: 16/9;
  --uno: text-gray-7;
}
</style>
