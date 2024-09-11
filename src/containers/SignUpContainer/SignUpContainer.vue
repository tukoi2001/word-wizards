<script lang="ts" setup>
import { ref } from 'vue';
import { ElForm } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { RootRouter } from 'enums/app';
import { SignUpStep } from 'enums/auth';
import { AuthStep, AuthDotStep } from 'components/AuthStep';
import useSignUp from './use-sign-up';
import EmailStep from './EmailStep.vue';
import PersonalStep from './PersonalStep.vue';
import PasswordStep from './PasswordStep.vue';
import AdditionalStep from './AdditionalStep.vue';
import type { FormInstance } from 'element-plus';

const { t } = useI18n();

const { currentStep, isLoading, rules, formFields, steps, onChangeStep, onBackStep, onSignUp } =
  useSignUp();

const formRef = ref<FormInstance>();
</script>

<template>
  <auth-layout>
    <template #sidebar>
      <auth-step :currentStep="currentStep" :steps="steps" />
    </template>
    <el-form ref="formRef" :model="formFields" :rules="rules" @submit.prevent.native="">
      <div class="sign-up-right">
        <transition name="slide-fade" class="sign-up-right__content">
          <email-step
            v-if="currentStep === SignUpStep.EMAIL"
            v-model="formFields.email"
            :form-ref="formRef"
            :on-change-step="onChangeStep"
          />
          <personal-step
            v-else-if="currentStep === SignUpStep.PERSONAL"
            v-model:firstName="formFields.firstName"
            v-model:lastName="formFields.lastName"
            :form-ref="formRef"
            :on-change-step="onChangeStep"
            :on-back-step="onBackStep"
          />
          <password-step
            v-else-if="currentStep === SignUpStep.PASSWORD"
            v-model:password="formFields.password"
            v-model:passwordConfirm="formFields.passwordConfirm"
            :form-ref="formRef"
            :on-change-step="onChangeStep"
            :on-back-step="onBackStep"
          />
          <additional-step
            v-else
            v-model:phoneNumber="formFields.phoneNumber"
            v-model:address="formFields.address"
            :form-ref="formRef"
            :is-loading="isLoading"
            :on-sign-up="onSignUp"
            :on-back-step="onBackStep"
          />
        </transition>
        <div class="sign-up-right-footer">
          <div class="sign-up-right-footer__navigate">
            <span class="sign-up-right-footer__title">{{ t('already_have_an_account') }}</span>
            <router-link class="sign-up-right-footer__link" :to="{ name: RootRouter.SIGN_IN }">
              {{ t('login') }}
            </router-link>
          </div>
          <auth-dot-step :currentStep="currentStep" :steps="steps" />
        </div>
      </div>
    </el-form>
  </auth-layout>
</template>

<style scoped lang="scss">
.sign-up-right {
  @include flex-box;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  height: 100%;
  padding: 60px 0;

  &__content {
    width: 100%;
    max-width: calc(100vw - 48px);
  }
}

.sign-up-right-footer {
  &__navigate {
    padding-bottom: 40px;
  }

  &__title {
    @include style-text(13px, 400, 20px);
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
  .sign-up-right {
    &__content {
      max-width: 400px;
    }
  }
}

@media (max-width: 420px) {
  .sign-up-right {
    padding: 30px 0;
  }
}
</style>
