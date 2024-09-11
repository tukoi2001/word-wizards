<script lang="ts" setup>
import { useAttrs } from 'vue';
import { ElButton } from 'element-plus';
import { noop } from 'lodash-es';

type Props = {
  type?: 'default' | 'primary' | 'danger';
  nativeType?: 'button' | 'submit' | 'reset';
  size?: 'large' | 'default' | 'small';
  isFullWidth?: boolean;
  onClick?: () => void;
};

withDefaults(defineProps<Props>(), {
  type: 'primary',
  nativeType: 'button',
  size: 'large',
  isFullWidth: false,
  onClick: noop,
});
const attrs = useAttrs();
</script>

<template>
  <el-button
    v-bind="attrs"
    :class="['button-component', { 'is-full-width': isFullWidth }]"
    :size="size"
    :type="type"
    :nativeType="nativeType"
    @click="onClick"
  >
    <slot></slot>
  </el-button>
</template>

<style lang="scss">
.button-component {
  &.is-full-width {
    width: 100%;
  }

  &.el-button {
    --el-button-bg-color: var(--active-color);
    --el-button-border-color: var(--text-tertiary-color);
    --el-button-active-border-color: var(--primary-color);
    --el-button-active-bg-color: transparent;
    --el-button-hover-text-color: var(--primary-color);
    --el-button-hover-bg-color: transparent;
    --el-button-hover-border-color: #{$primary-dark};
    color: var(--text-primary-color);
    font-weight: 500;

    &--primary {
      --el-button-bg-color: var(--primary-color);
      --el-button-border-color: var(--primary-color);
      --el-button-active-border-color: #{$primary-active};
      --el-button-active-bg-color: #{$primary-active};
      --el-button-hover-text-color: var(--primary-color);
      --el-button-hover-bg-color: #{$primary-hover};
      --el-button-hover-border-color: #{$primary-hover};
      color: var(--active-color);

      &.is-text {
        color: var(--primary-color);

        &:not(.is-disabled) {
          &:hover {
            color: var(--active-color);
            background-color: $primary-dark;
          }

          &:active {
            color: var(--active-color);
            background-color: var(--primary-color);
          }
        }
      }

      &.is-disabled {
        --el-button-disabled-text-color: var(--active-color);
        --el-button-disabled-bg-color: #{$primary-dark};
        --el-button-disabled-border-color: #{$primary-dark};
      }
    }

    &--danger {
      --el-button-bg-color: transparent;
      --el-button-border-color: #{$danger};
      --el-button-active-border-color: #{$danger-active};
      --el-button-active-bg-color: #{$danger-active};
      --el-button-hover-text-color: var(--primary-color);
      --el-button-hover-bg-color: #{$danger-hover};
      --el-button-hover-border-color: #{$danger-hover};
      color: var(--text-primary-color);

      &.is-text {
        color: $danger;

        &:not(.is-disabled) {
          &:hover {
            color: $white;
            background-color: $danger-active;
          }

          &:active {
            color: $white;
            background-color: $danger-hover;
          }
        }
      }
    }

    &.is-link {
      color: var(--primary-color);

      &:not(.is-disabled) {
        &:hover {
          color: $primary-dark;
        }

        &:active {
          color: var(--primary-color);
        }
      }
    }
  }
}
</style>
