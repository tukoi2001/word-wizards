<script setup lang="ts">
type Props = {
  width?: number;
  title?: string;
  description?: string;
  showClose?: boolean;
  closeOnClickModal?: boolean;
};

withDefaults(defineProps<Props>(), {
  width: 600,
  showClose: false,
  closeOnClickModal: false,
});

const attrs = useAttrs();
const slots = useSlots();

const isVisible = defineModel<boolean>();

const onCancelModal = (): void => {
  isVisible.value = false;
};
</script>
<template>
  <el-dialog
    v-model="isVisible"
    v-bind="attrs"
    class="dialog-component"
    :width="width"
    :showClose="showClose"
    :closeOnClickModal="closeOnClickModal"
    alignCenter
    destroyOnClose
    appendToBody
  >
    <template #header>
      <div v-if="!!title && !slots.header" class="dialog-component__title">{{ title }}</div>
      <slot v-else name="header"></slot>
    </template>
    <template #default>
      <div v-if="!!description && !slots.default" class="dialog-component__description">
        {{ description }}
      </div>
      <slot v-else></slot>
    </template>
    <template v-if="slots.footer" #footer>
      <slot name="footer" :onCancelModal="onCancelModal"></slot>
    </template>
  </el-dialog>
</template>

<style lang="scss">
.dialog-component {
  padding: 24px;
  border-radius: 8px;

  &.el-dialog {
    --el-dialog-bg-color: var(--active-color);
  }

  .el-dialog {
    &__header {
      padding-bottom: 16px;
    }

    &__footer {
      @include flex-box(flex-end);
      padding-top: 24px;
    }
  }

  &__title {
    @include style-text(20px, 600, 30px);
    color: var(--text-primary-color);
  }

  &__description {
    @include style-text(14px, 400, 21px);
    color: var(--text-secondary-color);
  }
}

.el-overlay {
  --el-overlay-color-lighter: var(--overlay-color);
}
</style>
