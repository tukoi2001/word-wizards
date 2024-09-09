<script lang="ts" setup>
import { useAttrs } from 'vue';
import { ElInput, useId } from 'element-plus';
import { noop } from 'lodash-es';
import FieldCommon from 'components/FieldCommon';

type Props = {
  type?: 'text' | 'password';
  size?: 'large' | 'default' | 'small';
  name?: string;
  label?: string;
  inForm?: boolean;
  onChange?: (value: string) => void;
};

withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'large',
  name: 'input',
  label: '',
  inForm: false,
  onChange: noop,
});
const attrs = useAttrs();
const id = useId();
</script>

<template>
  <field-common :id="id" :inForm="inForm" :name="name" :label="label">
    <el-input
      v-bind="attrs"
      :type="type"
      :size="size"
      class="input-component"
      clearable
      @change="onChange"
    />
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
}

.el-input {
  &__inner {
    font-family: 'Noto Sans', sans-serif;
  }
}
</style>
