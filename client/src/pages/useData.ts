import { useEffect, useState, useRef } from 'react';

function useData() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchItems = () => {
    setIsLoading(true);
    setError(null);

    fetch(`${process.env.API_URL}/items`)
      .then((res) => {
        if (res.status === 403) throw new Error('Access forbidden (403)');
        if (!res.ok) throw new Error('Failed to fetch items');
        return res.json();
      })
      .then((data) => setItems(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchItems();
    intervalRef.current = setInterval(fetchItems, 10000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { items, isLoading, error };
}

export default useData;
