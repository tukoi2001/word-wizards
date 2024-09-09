declare namespace App {
  type Any = any;

  type SelectOption = {
    value: string | number | boolean;
    label?: string;
    isDisabled?: boolean;
  };

  type DarkModeProvider = {
    isDarkMode: Ref<boolean>;
    toggleTheme: (value: boolean) => void;
  };

  type LanguageOption = {
    flag: string;
    value: string;
    label: string;
  };

  type AuthStep = {
    icon: string;
    title: string;
    description: string;
    action: () => void;
  };
}
