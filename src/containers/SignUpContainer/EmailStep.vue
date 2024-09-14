<script lang="ts" setup>
import InputComponent from 'components/Input';
import ButtonComponent from 'components/Button';
import { AuthStepLayout } from 'components/AuthStep';

type Props = {
  formRef: App.Any;
  onChangeStep: () => void;
};

const props = defineProps<Props>();
const email = defineModel<string>({ required: true });

const { t } = useI18n();

const isValidEmail = ref<boolean>(false);

onMounted(() => {
  if (email.value) {
    onValidateEmail();
  }
});

const onValidateEmail = (): void => {
  if (props.formRef) {
    props.formRef.validateField('email', (isValid: boolean) => {
      isValidEmail.value = isValid;
    });
  }
};
</script>

<template>
  <auth-step-layout
    :title="t('enter_your_field', { field: t('email_address').toLowerCase() })"
    :description="t('email_step_description')"
    icon="email"
  >
    <template #content>
      <input-component
        v-model="email"
        name="email"
        :label="t('email_address')"
        :placeholder="
          t('enter_your_field', { field: t('email_address').toLowerCase() })
        "
        in-form
        @input="onValidateEmail"
      />
    </template>
    <template #action>
      <button-component
        size="default"
        is-full-width
        :disabled="!isValidEmail"
        :on-click="onChangeStep"
      >
        {{ t('continue') }}
      </button-component>
    </template>
  </auth-step-layout>
</template>
