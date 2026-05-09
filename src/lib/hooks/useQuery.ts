import { useCallback, useEffect, useState } from "react";

type UseQueryResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

/**
 * Handles an API call and its data, loading and error states.
 *
 * @param queryFn - The async function that fetches the data.
 * @param deps - Dependency list for re-running the query.
 *
 * @returns An object containing the data, loading state, and error message, plus
 * a refetch function.
 */
function useQuery<T>(
  queryFn: () => Promise<T>,
  deps: any[] = [],
): UseQueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  // Stable function to trigger a re-fetch
  const refetch = useCallback(() => {
    setTrigger((x) => x + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await queryFn();

        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [trigger, ...deps]);

  return { data, loading, error, refetch };
}

export default useQuery;
