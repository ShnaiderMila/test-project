import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useData from './useData';

function ListPage() {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<any[]>([]);
  const { items, isLoading, error } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (items && Array.isArray(items)) {
      const list = search.trim()
        ? items.filter((item: any) => item.id.toString().includes(search.trim()))
        : items;
      setFiltered(list);
    }
  }, [items, search]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Items</h1>
      <input
        type="text"
        placeholder="Search by ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filtered.length === 0 ? (
        <div>No items found</div>
      ) : (
        <ul>
          {filtered.map((item) => (
            <li key={item.id} onClick={() => navigate(`/${item.id}`)}>
              {item.id}: {item.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListPage;
