<script lang="ts" setup>
import { RootRouter } from 'enums/app';
import ButtonComponent from 'components/Form/Button';
import { AuthStepLayout } from 'components/AuthStep';

const { t } = useI18n();
const router = useRouter();

const onDone = (): void => {
  router.push({ name: RootRouter.HOME_PAGE });
};
</script>

<template>
  <auth-step-layout
    :title="t('your_account_has_been_activated')"
    :description="t('your_account_has_been_activated_description')"
    icon="verified-user"
  >
    <template #content>
      <div class="verify-success-content">
        {{ t('welcome_to_word_wizards_description') }}
      </div>
    </template>
    <template #action>
      <button-component size="default" is-full-width :on-click="onDone">
        {{ t('welcome_to_word_wizards') }}
      </button-component>
    </template>
  </auth-step-layout>
</template>

<style scoped lang="scss">
.verify-success-content {
  @include style-text(18px, 400, 27px);
  text-align: center;
  color: var(--primary-color);
}
</style>
src/components/Form/Button
