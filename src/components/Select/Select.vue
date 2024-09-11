<script lang="ts" setup>
import { useAttrs, ref, computed } from 'vue';
import { ElSelect, ElOption, useId } from 'element-plus';
import { noop } from 'lodash-es';
import FieldCommon from 'components/FieldCommon';

type Props = {
  options: App.SelectOption[];
  name?: string;
  label?: string;
  inForm?: boolean;
  isOptional: boolean;
  onChange?: (value: App.SelectOption['value'] | App.SelectOption['value'][]) => void;
};

withDefaults(defineProps<Props>(), {
  name: 'select',
  label: '',
  inForm: false,
  isOptional: false,
  onChange: noop,
});
const attrs = useAttrs();
const id = useId();

const isTouched = ref<boolean>(false);
const isFilling = ref<boolean>(false);

const modelValue = computed(() => attrs['modelValue'] as string);

const hasValue = computed<boolean>(() => modelValue.value?.length > 0 || !!modelValue.value);

const onFocus = (): void => {
  isTouched.value = true;
  isFilling.value = false;
};

const onClear = (): void => {
  isTouched.value = false;
};

const onBlur = (): void => {
  isTouched.value = false;
};
</script>

<template>
  <field-common :id="id" :inForm="inForm" :name="name" :label="label" :is-optional="isOptional">
    <el-select
      v-bind="attrs"
      :class="[
        'select-component',
        { 'is-focused': isTouched, 'is-filling': isFilling || !!hasValue },
      ]"
      fitInputWidth
      @change="onChange"
      @focus="onFocus"
      @clear="onClear"
      @blur="onBlur"
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
