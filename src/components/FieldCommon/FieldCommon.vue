<script setup lang="ts">
import { ElFormItem } from 'element-plus';
import FieldCommonLabel from './FieldCommonLabel.vue';

type Props = {
  id: string;
  name: string;
  inForm: boolean;
  label?: string;
};

withDefaults(defineProps<Props>(), {
  inForm: false,
});
</script>

<template>
  <el-form-item v-if="inForm" :props="name">
    <field-common-label :id="id" :label="label">
      <slot></slot>
    </field-common-label>
  </el-form-item>
  <field-common-label v-else :id="id" :label="label">
    <slot></slot>
  </field-common-label>
</template>

<style lang="scss" scoped>
.el-form-item {
  width: 100%;
  margin-bottom: 24px;
}
</style>
