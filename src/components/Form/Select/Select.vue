<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid';

import FieldCommon from '../FieldCommon';

type Props = {
  options: App.SelectOption[];
  name?: string;
  label?: string;
  inForm?: boolean;
  isOptional: boolean;
  onChange?: (
    value: App.SelectOption['value'] | App.SelectOption['value'][],
  ) => void;
};

withDefaults(defineProps<Props>(), {
  name: 'select',
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
    <el-select
      v-bind="attrs"
      :class="['select-component']"
      fit-input-width
      @change="onChange"
    >
      <el-option
        v-for="option in options"
        :key="String(option.value)"
        :label="option.label"
        :value="option.value"
        :disabled="option.isDisabled"
      />
    </el-select>
  </field-common>
</template>

<style lang="scss">
.select-component {
  &.el-select {
    color: inherit;
  }
}
</style>
