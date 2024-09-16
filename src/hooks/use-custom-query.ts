export const useCustomQuery = <T>(options: CustomQuery.TQueryOptions<T>) => {
  const { queryKey } = options;
  const queryClient: QueryClient = useQueryClient();
  const initialData: CustomQuery.TInitialData<T> =
    queryClient.getQueryData<CustomQuery.TInitialData<T>>(queryKey);
  const removeQueries = () => queryClient.removeQueries({ queryKey });
  const queryResponse = useQuery<T>({ ...options, initialData });
  return { ...queryResponse, removeQueries };
};
