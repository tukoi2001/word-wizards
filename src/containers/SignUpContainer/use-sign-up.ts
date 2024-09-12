import { computed, ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { SignUpStep } from 'enums/auth';
import { REGEX } from 'config/constants';
import type { FormRules } from 'element-plus';

export default function useSignUp() {
  const { t } = useI18n();
  const isLoading = ref<boolean>(false);
  const currentStep = ref<SignUpStep>(SignUpStep.EMAIL);

  const formFields = reactive<Auth.SignUpForm>({
    email: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
  });

  const rules = computed<FormRules<Auth.SignUpForm>>(() => ({
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
    firstName: [
      {
        required: true,
        whitespace: true,
        message: t('required_field', { field: t('first_name').toLowerCase() }),
        trigger: ['blur', 'change'],
      },
      {
        min: 2,
        max: 50,
        message: t('between_error', { field: t('first_name').toLowerCase(), min: 2, max: 50 }),
        trigger: ['blur', 'change'],
      },
    ],
    lastName: [
      {
        required: true,
        whitespace: true,
        message: t('required_field', { field: t('last_name').toLowerCase() }),
        trigger: ['blur', 'change'],
      },
      {
        min: 2,
        max: 50,
        message: t('between_error', { field: t('last_name').toLowerCase(), min: 2, max: 50 }),
        trigger: ['blur', 'change'],
      },
    ],
    password: [
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
    passwordConfirm: [
      {
        required: true,
        whitespace: true,
        message: t('required_field', { field: t('password_confirm').toLowerCase() }),
        trigger: ['blur', 'change'],
      },
      {
        message: t('confirm_password_error'),
        validator: (_, value: string) => value === formFields.password,
        trigger: ['blur', 'change'],
      },
    ],
    phoneNumber: [
      {
        whitespace: true,
        pattern: REGEX.phoneNumber,
        message: t('phone_number_error'),
        trigger: ['blur', 'change'],
      },
    ],
    address: [
      {
        whitespace: true,
        min: 2,
        max: 50,
        message: t('between_error', { field: t('address').toLowerCase(), min: 2, max: 50 }),
        trigger: ['blur', 'change'],
      },
    ],
  }));

  const steps = computed<App.AuthStep[]>(() => [
    {
      title: t('enter_your_field', { field: t('email_address').toLowerCase() }),
      description: t('email_step_description'),
      icon: 'email',
      action: () => onSwitchStep(SignUpStep.EMAIL),
    },
    {
      title: t('enter_your_personal_information'),
      description: t('personal_information_step_description'),
      icon: 'person',
      action: () => onSwitchStep(SignUpStep.PERSONAL),
    },
    {
      title: t('choose_a_password'),
      description: t('choose_a_password_description'),
      icon: 'password',
      action: () => onSwitchStep(SignUpStep.PASSWORD),
    },
    {
      title: t('enter_your_additional_information'),
      description: t('enter_your_additional_information_description'),
      icon: 'settings',
      action: () => onSwitchStep(SignUpStep.OTHER),
    },
  ]);

  const onSwitchStep = (step: SignUpStep): void => {
    currentStep.value = step;
  };

  const onChangeStep = (): void => {
    switch (currentStep.value) {
      case SignUpStep.EMAIL:
        onSwitchStep(SignUpStep.PERSONAL);
        break;
      case SignUpStep.PERSONAL:
        onSwitchStep(SignUpStep.PASSWORD);
        break;
      case SignUpStep.PASSWORD:
        onSwitchStep(SignUpStep.OTHER);
        break;
      default:
        break;
    }
  };

  const onBackStep = (): void => {
    switch (currentStep.value) {
      case SignUpStep.PERSONAL:
        onSwitchStep(SignUpStep.EMAIL);
        break;
      case SignUpStep.PASSWORD:
        onSwitchStep(SignUpStep.PERSONAL);
        break;
      case SignUpStep.OTHER:
        onSwitchStep(SignUpStep.PASSWORD);
        break;
      default:
        break;
    }
  };

  const onSignUp = async (): Promise<void> => {
    //TODO: Handle sign up
  };

  return { currentStep, isLoading, rules, formFields, steps, onChangeStep, onBackStep, onSignUp };
}
