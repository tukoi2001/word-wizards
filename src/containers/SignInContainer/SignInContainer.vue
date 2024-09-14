<script lang="ts" setup>
import resources from 'config/resources';
import { RootRouter } from 'enums/app';
import { AuthStepLayout } from 'components/AuthStep';
import InputComponent from 'components/Input';
import ButtonComponent from 'components/Button';
import useSignIn from './use-sign-in';

const { t } = useI18n();

const { isLoading, rules, formFields, onSignIn } = useSignIn();

const formRef = ref<FormInstance>();
const isValidEmail = ref<boolean>(false);
const isValidPassword = ref<boolean>(false);

const onValidateEmail = (): void => {
  if (formRef.value) {
    formRef.value.validateField('email', (isValid: boolean) => {
      isValidEmail.value = isValid;
    });
  }
};

const onValidatePassword = (): void => {
  if (formRef.value) {
    formRef.value.validateField('password', (isValid: boolean) => {
      isValidPassword.value = isValid;
    });
  }
};
</script>

<template>
  <el-form ref="formRef" :model="formFields" :rules="rules" @submit.prevent="">
    <auth-layout>
      <div class="sign-in-container">
        <div class="sign-in-container-header">
          <img :src="resources.APP_LOGO" alt="app-logo" />
        </div>
        <auth-step-layout
          :title="t('login_to_your_account')"
          :description="t('welcome_back_please_enter_your_details')"
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
              in-form
              @input="onValidateEmail"
            />
            <input-component
              v-model="formFields.password"
              name="password"
              type="password"
              :label="t('password')"
              :placeholder="
                t('enter_your_field', { field: t('password').toLowerCase() })
              "
              show-password
              in-form
              @input="onValidatePassword"
            />
            <router-link
              class="sign-in-container__action"
              :to="{ name: RootRouter.FORGOT_PASSWORD }"
            >
              {{ t('forgot_password') }}
            </router-link>
          </template>
          <template #action>
            <button-component
              size="default"
              is-full-width
              :loading="isLoading"
              :disabled="!isValidPassword || !isValidEmail"
              :on-click="onSignIn"
            >
              {{ t('sign_in') }}
            </button-component>
          </template>
        </auth-step-layout>
        <div class="sign-in-container-footer">
          <span class="sign-in-container-footer__title">{{
            t('do_not_have_an_account')
          }}</span>
          <router-link
            class="sign-in-container-footer__link"
            :to="{ name: RootRouter.SIGN_UP }"
          >
            {{ t('sign_up') }}
          </router-link>
        </div>
      </div>
    </auth-layout>
  </el-form>
</template>

<style scoped lang="scss">
.sign-in-container {
  width: 100%;
  max-width: calc(100vw - 48px);
  padding: 60px 0;
  margin: 0 auto;

  &__action {
    @include style-text(12px, 600, 20px);
    display: block;
    color: var(--primary-color);
    text-decoration: none;
    text-align: right;
  }
}

.sign-in-container-header {
  display: none;
}

.sign-in-container-footer {
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

@media (min-width: 1024px) {
  .sign-in-container-header {
    @include flex-box;
    padding-bottom: 20px;
  }
}

@media (min-width: 420px) {
  .sign-in-container {
    max-width: 360px;
  }
}

@media (max-width: 420px) {
  .sign-in-container {
    padding: 30px 0;
  }
}
</style>
