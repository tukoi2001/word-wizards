declare namespace CustomQuery {
  import { MaybeRefDeep } from '@tanstack/vue-query/build/legacy/types';
  import type { UseQueryOptions, QueryObserverOptions } from '@tanstack/vue-query';

  type TInitialData<T> = MaybeRefDeep<T | InitialDataFunction<T>>;
  type IInitialValue<T> = TInitialData<T> | undefined;
  type TQueryOptions<T> = QueryObserverOptions<T> & UseQueryOptions<T>;
}
