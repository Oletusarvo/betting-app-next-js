import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useQueryParam(
  initialQueryParam: string,
  queryParamName: string,
  queryDelay: number = 1000
) {
  const [currentQuery, setQurrentQuery] = useState(initialQueryParam);
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateQuery = (newQuery: string) => {
    setQurrentQuery(newQuery);
  };

  useEffect(() => {
    setStatus('loading');

    const timeout = setTimeout(() => {
      const newQuery = new URLSearchParams(searchParams);
      newQuery.set(queryParamName, currentQuery);
      router.push(pathname + `?${newQuery.toString()}`);
      setStatus('idle');
    }, queryDelay);

    return () => {
      clearTimeout(timeout);
      setStatus('idle');
    };
  }, [currentQuery]);

  return {
    updateQuery,
    status,
  } as const;
}
