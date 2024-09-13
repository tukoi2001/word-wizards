<script setup lang="ts">
type Props = {
  id: string;
  label?: string;
  isOptional: boolean;
};

defineProps<Props>();

const { t } = useI18n();
</script>

<template>
  <div class="field-common">
    <label v-if="!!label" class="field-common__label" :for="id">
      {{ label }}
      <span v-if="isOptional" class="field-common__label--optional">({{ t('optional') }})</span>
    </label>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.field-common {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  &__label {
    @include style-text(14px, 500, 20px);
    color: var(--text-primary-color);

    &--optional {
      @include style-text(12px, 300, 18px);
      color: var(--text-tertiary-color);
    }
  }
}
</style>
