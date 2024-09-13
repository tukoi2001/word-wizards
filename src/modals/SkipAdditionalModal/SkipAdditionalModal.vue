<script setup lang="ts">
import DialogComponent from 'components/Dialog';
import ButtonComponent from 'components/Button';

type Props = {
  isLoading: boolean;
  onSignUp: () => Promise<void>;
};

defineProps<Props>();

const attrs = useAttrs();
const { t } = useI18n();
</script>
<template>
  <dialog-component
    v-bind="attrs"
    :title="t('are_you_sure_you_want_to_skip_filling_data')"
    :description="t('skip_filling_data_description')"
  >
    <template #footer="{ onCancelModal }">
      <button-component type="default" size="default" :on-click="onCancelModal">
        {{ t('cancel') }}
      </button-component>
      <button-component size="default" :loading="isLoading" :on-click="onSignUp">
        {{ t('get_started') }}
      </button-component>
    </template>
  </dialog-component>
</template>
