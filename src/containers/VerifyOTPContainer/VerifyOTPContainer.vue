<script lang="ts" setup>
import { useAuthStore } from 'stores/auth';
import { VerifyOTPStep } from 'enums/auth';
import { AuthStep, AuthDotStep } from 'components/AuthStep';
import VerifyOtpStep from './VerifyOTPStep.vue';
import VerifiedSuccess from './VerifiedSuccess.vue';

const { t } = useI18n();
const authStore = useAuthStore();

const currentStep = ref<VerifyOTPStep>(VerifyOTPStep.VERIFY);

const steps = computed<App.AuthStep[]>(() => [
  {
    title: t('verify_your_account'),
    description: t('verify_your_account_description'),
    icon: 'warning',
    action: noop,
  },
  {
    title: t('your_account_has_been_activated'),
    description: t('your_account_has_been_activated_description'),
    icon: 'verified-user',
    action: noop,
  },
]);

onBeforeMount(() => {
  if (authStore.currentUser?.isActive) {
    currentStep.value = VerifyOTPStep.DONE;
  }
});

const onVerifySuccess = (): void => {
  currentStep.value = VerifyOTPStep.DONE;
};
</script>

<template>
  <auth-layout>
    <template #sidebar>
      <auth-step :current-step="currentStep" :steps="steps" />
    </template>
    <div class="verify-otp-container">
      <transition name="slide-fade" class="verify-otp-container__content">
        <verify-otp-step
          v-if="currentStep === VerifyOTPStep.VERIFY"
          :on-verify-success="onVerifySuccess"
        />
        <verified-success v-else />
      </transition>
    </div>
    <auth-dot-step :current-step="currentStep" :steps="steps" />
  </auth-layout>
</template>

<style scoped lang="scss">
.verify-otp-container {
  @include flex-box;
  flex-direction: column;
  gap: 45px;
  width: 100%;
  max-width: calc(100vw - 48px);
  height: 100%;
  padding: 60px 24px;

  &__content {
    width: 100%;
    max-width: calc(100vw - 48px);
  }
}

@media (min-width: 420px) {
  .verify-otp-container {
    &__content {
      max-width: 360px;
    }
  }
}

@media (max-width: 420px) {
  .verify-otp-container {
    padding: 30px 24px;
  }
}
</style>
