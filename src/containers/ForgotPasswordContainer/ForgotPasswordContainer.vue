<script lang="ts" setup>
import { forgotPassword } from 'api/auth';
import { showErrorMessage, showSuccessMessage } from 'utils/message-error';
import { RootRouter } from 'enums/app';
import { ForgotPasswordStep } from 'enums/auth';
import { AuthStepLayout, AuthStep, AuthDotStep } from 'components/AuthStep';
import InputComponent from 'components/Form/Input';
import ButtonComponent from 'components/Form/Button';

const { t } = useI18n();
const router = useRouter();

const currentStep = ref<ForgotPasswordStep>(ForgotPasswordStep.RESET);
const formRef = ref<FormInstance>();
const isValidEmail = ref<boolean>(false);

const formFields = reactive<Auth.ForgotPasswordForm>({
  email: '',
});

const rules = computed<FormRules<Auth.ForgotPasswordForm>>(() => ({
  email: [
    {
      required: true,
      whitespace: true,
      message: t('required_field', { field: t('email_address').toLowerCase() }),
      trigger: ['blur', 'change'],
    },
    {
      type: 'email',
      message: t('email_error'),
      trigger: ['blur', 'change'],
    },
  ],
}));

const steps = computed<App.AuthStep[]>(() => [
  {
    title: t('forgot_password'),
    description: t('forgot_password_description'),
    icon: 'email',
    action: noop,
  },
  {
    title: t('check_your_instructions'),
    description: t('check_your_instructions_description'),
    icon: 'check-circle',
    action: noop,
  },
]);

const { isPending, mutate: handleForgotPassword } = useMutation({
  mutationKey: ['forgotPassword', formFields],
  mutationFn: () => forgotPassword(formFields),
  onSuccess: (data: App.BaseResponse) => {
    showSuccessMessage(data);
    onSwitchStep(ForgotPasswordStep.DONE);
  },
  onError: (error: App.ErrorResponse) => showErrorMessage(error),
});

const onSwitchStep = (step: ForgotPasswordStep): void => {
  currentStep.value = step;
};

const onValidateEmail = (): void => {
  if (formRef.value) {
    formRef.value.validateField('email', (isValid: boolean) => {
      isValidEmail.value = isValid;
    });
  }
};

const onGoHome = (): void => {
  router.push({ name: RootRouter.SIGN_IN });
};
</script>

<template>
  <el-form ref="formRef" :model="formFields" :rules="rules" @submit.prevent="">
    <auth-layout>
      <template #sidebar>
        <auth-step :current-step="currentStep" :steps="steps" />
      </template>
      <div name="slide-fade" class="forgot-password-container">
        <transition
          name="slide-fade"
          class="forgot-password-container__content"
        >
          <auth-step-layout
            v-if="currentStep === ForgotPasswordStep.RESET"
            :title="t('forgot_password')"
            :description="t('forgot_password_description')"
            icon="email"
          >
            <template #content>
              <input-component
                v-model="formFields.email"
                name="email"
                :label="t('email_address')"
                :placeholder="
                  t('enter_your_field', {
                    field: t('email_address').toLowerCase(),
                  })
                "
                :disabled="isPending"
                in-form
                @input="onValidateEmail"
              />
            </template>
            <template #action>
              <button-component
                size="default"
                is-full-width
                :loading="isPending"
                :disabled="!isValidEmail"
                :on-click="handleForgotPassword"
              >
                {{ t('reset_password') }}
              </button-component>
            </template>
          </auth-step-layout>
          <auth-step-layout
            v-else
            :title="t('check_your_instructions')"
            :description="t('check_your_instructions_description')"
            icon="check-circle"
          >
            <template #action>
              <button-component
                size="default"
                is-full-width
                :on-click="onGoHome"
              >
                {{ t('continue') }}
              </button-component>
            </template>
          </auth-step-layout>
        </transition>
        <div class="forgot-password-container-footer">
          <span class="forgot-password-container-footer__title">
            {{ t('already_have_an_account') }}
          </span>
          <router-link
            class="forgot-password-container-footer__link"
            :to="{ name: RootRouter.SIGN_IN }"
          >
            {{ t('sign_in') }}
          </router-link>
        </div>
      </div>
      <auth-dot-step :current-step="currentStep" :steps="steps" />
    </auth-layout>
  </el-form>
</template>

<style scoped lang="scss">
.forgot-password-container {
  width: 100%;
  max-width: calc(100vw - 48px);
  padding: 60px 0;
  margin: 0 auto;
}

.forgot-password-container-footer {
  padding-top: 20px;
  text-align: center;

  &__title {
    @include style-text(12px, 400, 20px);
    color: var(--text-primary-color);
    margin-right: 4px;
  }

  &__link {
    @include style-text(13px, 600, 20px);
    color: var(--primary-color);
    text-decoration: none;
  }
}

@media (min-width: 420px) {
  .forgot-password-container {
    max-width: 360px;
  }
}

@media (max-width: 420px) {
  .forgot-password-container {
    padding: 30px 0;
  }
}
</style>
