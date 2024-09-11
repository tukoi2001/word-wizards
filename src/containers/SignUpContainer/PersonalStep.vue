<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import InputComponent from 'components/Input';
import ButtonComponent from 'components/Button';
import { AuthStepLayout } from 'components/AuthStep';

type Props = {
  formRef: App.Any;
  onChangeStep: () => void;
  onBackStep: () => void;
};

const props = defineProps<Props>();
const firstName = defineModel<string>('firstName', { required: true });
const lastName = defineModel<string>('lastName', { required: true });

const { t } = useI18n();

const isValidFirstName = ref<boolean>(false);
const isValidLastName = ref<boolean>(false);

onMounted(() => {
  if (firstName.value) {
    onValidateFirstName();
  }
  if (lastName.value) {
    onValidateLastName();
  }
});

const onValidateFirstName = (): void => {
  if (props.formRef) {
    props.formRef.validateField('firstName', (isValid: boolean) => {
      isValidFirstName.value = isValid;
    });
  }
};

const onValidateLastName = (): void => {
  if (props.formRef) {
    props.formRef.validateField('lastName', (isValid: boolean) => {
      isValidLastName.value = isValid;
    });
  }
};
</script>

<template>
  <auth-step-layout
    :title="t('enter_your_personal_information')"
    :description="t('personal_information_step_description')"
    icon="person"
  >
    <template #content>
      <input-component
        v-model="firstName"
        name="firstName"
        :label="t('first_name')"
        :placeholder="t('enter_your_field', { field: t('first_name').toLowerCase() })"
        inForm
        @input="onValidateFirstName"
      />
      <input-component
        v-model="lastName"
        name="lastName"
        :label="t('last_name')"
        :placeholder="t('enter_your_field', { field: t('last_name').toLowerCase() })"
        inForm
        @input="onValidateLastName"
      />
    </template>
    <template #action>
      <button-component type="default" size="default" isFullWidth :onClick="onBackStep">
        {{ t('back') }}
      </button-component>
      <button-component
        size="default"
        isFullWidth
        :disabled="!isValidFirstName || !isValidLastName"
        :onClick="onChangeStep"
      >
        {{ t('continue') }}
      </button-component>
    </template>
  </auth-step-layout>
</template>
