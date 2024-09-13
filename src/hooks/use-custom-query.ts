export function useCustomQuery<T>(options: CustomQuery.TQueryOptions<T>) {
  const { queryKey } = options;
  const queryClient: QueryClient = useQueryClient();
  const initialValue: CustomQuery.IInitialValue<T> =
    queryClient.getQueryData<CustomQuery.TInitialData<T>>(queryKey);
  const initialData = ref<CustomQuery.IInitialValue<T>>(initialValue);
  const removeQueries = () => queryClient.removeQueries({ queryKey });

  const { data: queryData, ...queryResult } = useQuery<T>({
    ...options,
    initialData: initialValue,
  });

  return { data: queryData || initialData, queryResult, removeQueries };
}
