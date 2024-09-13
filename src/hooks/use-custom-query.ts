import { MaybeRefDeep } from '@tanstack/vue-query/build/legacy/types';
import type { UseQueryOptions, QueryObserverOptions } from '@tanstack/vue-query';

type TInitialData<T> = MaybeRefDeep<T | InitialDataFunction<T>>;
type IInitialValue<T> = TInitialData<T> | undefined;
type TQueryOptions<T> = QueryObserverOptions<T> & UseQueryOptions<T>;

export function useCustomQuery<T>(options: TQueryOptions<T>) {
  const { queryKey } = options;
  const queryClient: QueryClient = useQueryClient();
  const initialValue: IInitialValue<T> = queryClient.getQueryData<TInitialData<T>>(queryKey);
  const initialData = ref<IInitialValue<T>>(initialValue);
  const removeQueries = () => queryClient.removeQueries({ queryKey });

  const { data: queryData, ...queryResult } = useQuery<T>({
    ...options,
    initialData: initialValue,
  });

  return { data: queryData || initialData, queryResult, removeQueries };
}
