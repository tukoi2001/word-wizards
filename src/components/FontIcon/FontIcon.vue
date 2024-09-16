<script lang="ts" setup>
type Props = {
  name: string;
  size?: number;
  color?: string;
  cursor?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  name: '',
  size: 16,
  color: '#000',
  cursor: false,
});

const computedStyle = computed<{ fontSize: string; color: string }>(() => ({
  fontSize: `${props.size}px`,
  color: props.color,
  cursor: props.cursor ? 'pointer' : 'auto',
}));
</script>

<template>
  <span :class="['icon', `icon-${name}`]" :style="computedStyle"></span>
</template>
