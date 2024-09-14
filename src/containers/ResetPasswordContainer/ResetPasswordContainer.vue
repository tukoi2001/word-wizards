<script lang="ts" setup>
import { resetPassword } from 'api/auth';
import { showErrorMessage, showSuccessMessage } from 'utils/message-error';
import { RootRouter } from 'enums/app';
import { ForgotPasswordStep } from 'enums/auth';
import { REGEX } from 'config/constants';
import { AuthStepLayout, AuthStep, AuthDotStep } from 'components/AuthStep';
import InputComponent from 'components/Input';
import ButtonComponent from 'components/Button';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const currentStep = ref<ForgotPasswordStep>(ForgotPasswordStep.RESET);
const formRef = ref<FormInstance>();
const isValidPassword = ref<boolean>(false);
const isValidPasswordConfirm = ref<boolean>(false);

const formFields = reactive<Auth.ResetPassword>({
  newPassword: '',
  confirmNewPassword: '',
});

const token = computed<string>(() => route.query.token as string);

const rules = computed<FormRules<Auth.ResetPassword>>(() => ({
  newPassword: [
    {
      required: true,
      whitespace: true,
      message: t('required_field', { field: t('password').toLowerCase() }),
      trigger: ['blur', 'change'],
    },
    {
      pattern: REGEX.password,
      message: t('password_error'),
      trigger: ['blur', 'change'],
    },
  ],
  confirmNewPassword: [
    {
      required: true,
      whitespace: true,
      message: t('required_field', {
        field: t('password_confirm').toLowerCase(),
      }),
      trigger: ['blur', 'change'],
    },
    {
      message: t('confirm_password_error'),
      validator: (_, value: string) => value === formFields.newPassword,
      trigger: ['blur', 'change'],
    },
  ],
}));

const steps = computed<App.AuthStep[]>(() => [
  {
    title: t('create_a_new_password'),
    description: t('create_a_new_password_description'),
    icon: 'password',
    action: noop,
  },
  {
    title: t('password_reset_successfully'),
    description: t('password_reset_successfully_description'),
    icon: 'check-circle',
    action: noop,
  },
]);

onBeforeMount(() => {
  if (!token.value) {
    router.push({ name: RootRouter.NOT_FOUND });
  }
});

const { isPending, mutate: handleResetPassword } = useMutation({
  mutationKey: ['resetPassword', formFields.newPassword, token.value],
  mutationFn: () =>
    resetPassword({ newPassword: formFields.newPassword, token: token.value }),
  onSuccess: (data: App.BaseResponse) => {
    showSuccessMessage(data);
    onSwitchStep(ForgotPasswordStep.DONE);
  },
  onError: (error: App.ErrorResponse) => showErrorMessage(error),
});

const onSwitchStep = (step: ForgotPasswordStep): void => {
  currentStep.value = step;
};

const onValidatePassword = (): void => {
  if (formRef.value) {
    formRef.value.validateField('newPassword', (isValid: boolean) => {
      isValidPassword.value = isValid;
    });
  }
  onValidatePasswordConfirm();
};

const onValidatePasswordConfirm = (): void => {
  if (formRef.value) {
    formRef.value.validateField('confirmNewPassword', (isValid: boolean) => {
      isValidPasswordConfirm.value = isValid;
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
      <div name="slide-fade" class="reset-password-container">
        <transition name="slide-fade" class="reset-password-container__content">
          <auth-step-layout
            v-if="currentStep === ForgotPasswordStep.RESET"
            :title="t('create_a_new_password')"
            :description="t('create_a_new_password_description')"
            icon="password"
          >
            <template #content>
              <input-component
                v-model="formFields.newPassword"
                name="newPassword"
                type="password"
                :label="t('password')"
                :placeholder="
                  t('enter_your_field', { field: t('password').toLowerCase() })
                "
                :hint="t('password_hint')"
                :disabled="isPending"
                show-password
                in-form
                @input="onValidatePassword"
              />
              <input-component
                v-model="formFields.confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                :label="t('password_confirm')"
                :placeholder="
                  t('enter_your_field', {
                    field: t('password_confirm').toLowerCase(),
                  })
                "
                :disabled="isPending"
                show-password
                in-form
                @input="onValidatePasswordConfirm"
              />
            </template>
            <template #action>
              <button-component
                size="default"
                is-full-width
                :loading="isPending"
                :disabled="!isValidPassword || !isValidPasswordConfirm"
                :on-click="handleResetPassword"
              >
                {{ t('apply_your_changes') }}
              </button-component>
            </template>
          </auth-step-layout>
          <auth-step-layout
            v-else
            :title="t('password_reset_successfully')"
            :description="t('password_reset_successfully_description')"
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
        <div class="reset-password-container-footer">
          <span class="reset-password-container-footer__title">
            {{ t('already_have_an_account') }}
          </span>
          <router-link
            class="reset-password-container-footer__link"
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
.reset-password-container {
  width: 100%;
  max-width: calc(100vw - 48px);
  padding: 60px 0;
  margin: 0 auto;
}

.reset-password-container-success {
  @include style-text(18px, 400, 27px);
  text-align: center;
  color: var(--primary-color);
}

.reset-password-container-footer {
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
  .reset-password-container {
    max-width: 360px;
  }
}

@media (max-width: 420px) {
  .reset-password-container {
    padding: 30px 0;
  }
}
</style>
