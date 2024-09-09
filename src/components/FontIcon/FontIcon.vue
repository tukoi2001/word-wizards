<script lang="ts" setup>
import { computed } from 'vue';

type Props = {
  name: string;
  size?: number;
  color?: string;
};

const props = withDefaults(defineProps<Props>(), {
  name: '',
  size: 16,
  color: '#000',
});

const computedStyle = computed<{ fontSize: string; color: string }>(() => ({
  fontSize: `${props.size}px`,
  color: props.color,
}));
</script>

<template>
  <span :class="['icon', `icon-${name}`]" :style="computedStyle"></span>
</template>
