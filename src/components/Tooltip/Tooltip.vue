<script setup lang="ts">
import { APP_PROVIDER } from 'config/constants';

type Props = {
  content?: string;
};

withDefaults(defineProps<Props>(), {
  content: '',
});

const attrs = useAttrs();
const slots = useSlots();

const { isDarkMode } = inject(APP_PROVIDER.darkMode)!;
</script>

<template>
  <el-tooltip
    v-bind="attrs"
    :content="content"
    :effect="isDarkMode ? 'light' : 'dark'"
  >
    <slot></slot>
    <template v-if="!content && slots.content" #content>
      <slot name="content"></slot>
    </template>
  </el-tooltip>
</template>
