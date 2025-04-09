import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

type ItemType = {
  id: number;
  name: string;
  description: string;
};

function SinglePage() {
  const { id } = useParams();
  const [item, setItem] = useState<ItemType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`${process.env.API_URL}/items/${id}`);
        if (res.status === 403) {
          throw new Error('Access forbidden (403)');
        }
        if (!res.ok) {
          throw new Error('Failed to fetch item');
        }
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!item) return <div>No data found</div>;

  return (
    <div className="detail">
      <Link to="/" state={{}}>Go Back</Link>
      <h2>Item Details</h2>
      <p>ID: {item.id}</p>
      <p>Name: {item.name}</p>
      <p>Description: {item.description}</p>
    </div>
  );
}

export default SinglePage;
