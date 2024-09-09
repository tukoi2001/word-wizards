<script setup lang="ts">
type Props = {
  id: string;
  label?: string;
};

defineProps<Props>();
</script>

<template>
  <div class="field-common">
    <label v-if="!!label" class="field-common__label" :for="id">{{ label }}</label>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.field-common {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__label {
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    color: var(--text-primary-color);
  }
}
</style>
