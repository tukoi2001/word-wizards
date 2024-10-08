<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid';
import FieldCommon from '../FieldCommon';

type Props = {
  type?: 'text' | 'password';
  size?: 'large' | 'default' | 'small';
  name?: string;
  label?: string;
  hint?: string;
  inForm?: boolean;
  isOptional?: boolean;
  onChange?: (value: string) => void;
};

withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'large',
  name: 'input',
  label: '',
  inForm: false,
  isOptional: false,
  onChange: noop,
});
const attrs = useAttrs();
const id = uuidv4();
</script>

<template>
  <field-common
    :id="id"
    :in-form="inForm"
    :name="name"
    :label="label"
    :is-optional="isOptional"
  >
    <el-input
      v-bind="attrs"
      :type="type"
      :size="size"
      class="input-component"
      clearable
      @change="onChange"
    />
    <div v-if="!!hint" class="input-component__hint">{{ hint }}</div>
  </field-common>
</template>

<style lang="scss">
.input-component {
  &.el-input {
    --el-input-text-color: var(--text-primary-color);
    --el-input-hover-border-color: var(--text-primary-color);
    --el-input-border-color: var(--text-tertiary-color);
    --el-input-focus-border-color: var(--primary-color);
    --el-input-clear-hover-color: var(--text-primary-color);
    --el-input-bg-color: var(--active-color);
    --el-input-placeholder-color: var(--text-tertiary-color);
  }

  &__hint {
    @include style-text(12px, 300, 18px);
    color: var(--text-tertiary-color);
  }
}
</style>
