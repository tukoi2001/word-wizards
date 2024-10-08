<script lang="ts" setup>
import { verifyOtp, resendOtp } from 'api/auth';
import { useAuthStore } from 'stores/auth';
import { showErrorMessage, showSuccessMessage } from 'utils/message-error';
import otpInput from 'components/Form/OTP';
import { AuthStepLayout } from 'components/AuthStep';

type Props = {
  onVerifySuccess: () => void;
};

const props = defineProps<Props>();

const { t } = useI18n();
const authStore = useAuthStore();

const otpValue = ref<string>('');

const { isPending: isVerifying, mutate: handleVerifyOtp } = useMutation({
  mutationKey: ['verifyOtp', authStore.currentUserEmail],
  mutationFn: (otp: string) =>
    verifyOtp({ email: authStore.currentUserEmail, otp }),
  onSuccess: (data: App.BaseResponse) => {
    authStore.setUserInfo({ ...authStore.currentUser!, isActive: true });
    showSuccessMessage(data);
    props.onVerifySuccess();
  },
  onError: (error: App.ErrorResponse) => showErrorMessage(error),
});

const { isPending: isResending, mutate: handleResendOtp } = useMutation({
  mutationKey: ['resendOtp', authStore.currentUserEmail],
  mutationFn: () => resendOtp({ email: authStore.currentUserEmail }),
  onSuccess: (data: App.BaseResponse) => {
    showSuccessMessage(data);
  },
  onError: (error: App.ErrorResponse) => showErrorMessage(error),
});
</script>

<template>
  <auth-step-layout
    :title="t('verify_your_account')"
    :description="t('verify_your_account_description')"
    icon="warning"
  >
    <template #content>
      <div class="verify-otp-header">
        <div class="verify-otp-header__email">
          {{ t('we_send_a_verify_code_to') }}
          <span class="verify-otp-header__email--bold">{{
            authStore.currentUserEmail
          }}</span>
        </div>
        <otp-input
          v-model="otpValue"
          class="verify-otp-header__input"
          :on-complete="handleVerifyOtp"
        />
        <loading-component v-if="isVerifying || isResending" />
      </div>
    </template>
    <template #action>
      <div class="verify-otp-action">
        <span class="verify-otp-action__label">{{
          t('did_not_get_a_code')
        }}</span>
        <span class="verify-otp-action__resend" @click="handleResendOtp()">
          {{ t('click_to_resend') }}
        </span>
      </div>
    </template>
  </auth-step-layout>
</template>

<style scoped lang="scss">
.verify-otp-header {
  &__email {
    margin-bottom: 30px;
    @include style-text(13px, 400, 20px);
    color: var(--text-secondary-color);
    text-align: center;

    &--bold {
      color: var(--primary-color);
      font-weight: 600;
    }
  }

  &__input {
    justify-content: center;
    align-items: center;
  }
}

.verify-otp-action {
  &__label {
    @include style-text(13px, 400, 20px);
    margin-right: 8px;
    color: var(--text-secondary-color);
  }

  &__resend {
    @include style-text(13px, 600, 20px);
    color: var(--primary-color);
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
