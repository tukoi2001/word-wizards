<script lang="ts" setup>
import { useSlots, useAttrs } from 'vue';
import { ElSwitch } from 'element-plus';
import { noop } from 'lodash-es';

type Props = {
  onChange?: (value: boolean) => void;
};

const props = withDefaults(defineProps<Props>(), {
  onChange: noop,
});
const slots = useSlots();
const attrs = useAttrs();

const onToggleSwitch = (value: string | number | boolean): void => {
  props.onChange(value as boolean);
};
</script>

<template>
  <el-switch v-bind="attrs" class="switch-component" @change="onToggleSwitch">
    <template v-if="slots.activeAction" #active-action>
      <slot name="activeAction"></slot>
    </template>
    <template v-if="slots.inactiveAction" #inactive-action>
      <slot name="inactiveAction"></slot>
    </template>
  </el-switch>
</template>

<style lang="scss">
.switch-component {
  &.el-switch {
    .el-switch {
      &__core {
        background-color: var(--secondary-color);
        border-color: var(--secondary-color);
      }

      &__label {
        height: auto;
        color: var(--text-secondary-color);

        &.is-active {
          color: var(--primary-color);
        }
      }
    }

    &.is-checked {
      .el-switch {
        &__core {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
        }
      }
    }
  }
}
</style>
