<script lang="ts" setup>
import InputComponent from 'components/Input';
import ButtonComponent from 'components/Button';
import { AuthStepLayout } from 'components/AuthStep';

type Props = {
  formRef: App.Any;
  onChangeStep: () => void;
  onBackStep: () => void;
};

const props = defineProps<Props>();
const password = defineModel<string>('password', { required: true });
const passwordConfirm = defineModel<string>('passwordConfirm', { required: true });

const { t } = useI18n();

const isValidPassword = ref<boolean>(false);
const isValidPasswordConfirm = ref<boolean>(false);

onMounted(() => {
  if (password.value) {
    onValidatePassword();
  }
  if (passwordConfirm.value) {
    onValidatePasswordConfirm();
  }
});

const onValidatePassword = (): void => {
  if (props.formRef) {
    props.formRef.validateField('password', (isValid: boolean) => {
      isValidPassword.value = isValid;
    });
  }
  onValidatePasswordConfirm();
};

const onValidatePasswordConfirm = (): void => {
  if (props.formRef) {
    props.formRef.validateField('passwordConfirm', (isValid: boolean) => {
      isValidPasswordConfirm.value = isValid;
    });
  }
};
</script>

<template>
  <auth-step-layout
    :title="t('choose_a_password')"
    :description="t('choose_a_password_description')"
    icon="password"
  >
    <template #content>
      <input-component
        v-model="password"
        name="password"
        type="password"
        :label="t('password')"
        :placeholder="t('enter_your_field', { field: t('password').toLowerCase() })"
        :hint="t('password_hint')"
        show-password
        in-form
        @input="onValidatePassword"
      />
      <input-component
        v-model="passwordConfirm"
        name="passwordConfirm"
        type="password"
        :label="t('password_confirm')"
        :placeholder="t('enter_your_field', { field: t('password_confirm').toLowerCase() })"
        show-password
        in-form
        @input="onValidatePasswordConfirm"
      />
    </template>
    <template #action>
      <button-component type="default" size="default" isFullWidth :onClick="onBackStep">
        {{ t('back') }}
      </button-component>
      <button-component
        size="default"
        is-full-width
        :disabled="!isValidPassword || !isValidPasswordConfirm"
        :onClick="onChangeStep"
      >
        {{ t('continue') }}
      </button-component>
    </template>
  </auth-step-layout>
</template>
