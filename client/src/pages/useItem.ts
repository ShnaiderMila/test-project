import { useEffect, useState } from 'react';

export function useItem(id: string | undefined) {
  const [item, setItem] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${process.env.API_URL}/items/${id}`);
        if (res.status === 403) throw new Error('Access forbidden (403)');
        if (!res.ok) throw new Error('Failed to fetch item');
        const data = await res.json();
        setItem(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  return { item, isLoading, error };
}
