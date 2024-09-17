declare namespace App {
  import('enums/app');

  import type { NotificationType, StatusCode } from 'enums/app';

  // eslint-disable-next-line
  type Any = any;

  type Callback = {
    onSuccess?: (...args) => void;
    onError?: (...args) => void;
    onFinally?: (...args) => void;
  };

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

  type PendingRequest = (token: string) => Promise<void>;

  type ToastOptions = {
    title?: string;
    message: string;
    type?: NotificationType;
    duration?: number;
    showClose?: boolean;
    offset?: number;
  };

  type MiddlewareContext = {
    to: RouteLocationNormalizedLoaded;
    next: NavigationGuardNext;
    currentUser: Auth.User;
    isLoggedIn: boolean;
  };

  type RouteMiddleware = (...args: unknown[]) => boolean;

  type ErrorResponse = {
    message: string | string[];
    statusCode?: StatusCode;
    error?: string;
  };

  type BaseResponse = {
    message: string | string[];
    statusCode?: StatusCode;
  };

  type SidebarMenu = {
    icon: string;
    title: string;
    to?: string;
    action?: () => void | Promise<void>;
  };
}
