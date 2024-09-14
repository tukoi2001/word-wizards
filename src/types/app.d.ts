declare namespace App {
  import('enums/app');

  import type { NotificationType, StatusCode } from 'enums/app';

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

  type QueuedRequest = {
    resolve: (value: string | PromiseLike<string>) => void;
    reject: (reason?: Any) => void;
  };

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
}
