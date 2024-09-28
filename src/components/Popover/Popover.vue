<script setup lang="ts">
import { APP_PROVIDER } from 'config/constants';

type Props = {
  title?: string;
  content?: string;
  popperClass?: string;
};

withDefaults(defineProps<Props>(), {
  title: '',
  content: '',
});

const attrs = useAttrs();
const slots = useSlots();

const { isDarkMode } = inject(APP_PROVIDER.darkMode)!;
</script>

<template>
  <el-popover
    v-bind="attrs"
    :content="content"
    :title="title"
    :effect="isDarkMode ? 'light' : 'dark'"
    :popper-class="['popover-component', popperClass]"
  >
    <template v-if="!content && slots.default">
      <slot></slot>
    </template>
    <template v-if="!title && slots.reference" #reference>
      <slot name="reference"></slot>
    </template>
  </el-popover>
</template>

<style lang="scss">
.popover-component {
  &.el-popover {
    font-size: 12px;
    color: var(--active-color);
  }
}

.el-tooltip {
  &__trigger {
    font-size: 14px;
    line-height: 21px;
    color: var(--text-primary-color);
  }
}
</style>
