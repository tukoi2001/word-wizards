<script setup lang="ts">
import { ElFormItem } from 'element-plus';
import FieldCommonLabel from './FieldCommonLabel.vue';

type Props = {
  id: string;
  name: string;
  inForm: boolean;
  isOptional: boolean;
  label?: string;
};

withDefaults(defineProps<Props>(), {
  inForm: false,
});
</script>

<template>
  <el-form-item v-if="inForm" :prop="name">
    <field-common-label :id="id" :label="label" :isOptional="isOptional">
      <slot></slot>
    </field-common-label>
  </el-form-item>
  <field-common-label v-else :id="id" :label="label" :isOptional="isOptional">
    <slot></slot>
  </field-common-label>
</template>

<style lang="scss">
.el-form {
  .el-form-item {
    width: 100%;
    margin-bottom: 24px;

    &__error {
      top: auto;
      bottom: -18px;
      font-size: 12px;

      &:first-letter {
        text-transform: uppercase;
      }
    }
  }
}
</style>
