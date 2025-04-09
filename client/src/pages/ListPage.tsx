import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useData from './useData';

import styles from './ListPage.module.scss';

function ListPage() {
  const location = useLocation();
  const [search, setSearch] = useState(location.state?.search || '');
  const [activeId, setActiveId] = useState<number | null>(location.state?.activeId || null);
  const [filtered, setFiltered] = useState<any[]>([]);
  const { items, isLoading, error } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (items && Array.isArray(items)) {
      const list = search.trim()
        ? items.filter((item: any) =>
            item.id.toString().includes(search.trim())
          )
        : items;
      setFiltered(list);
    }
  }, [items, search]);

  const handleClick = (item: any) => {
    setActiveId(item.id);
    navigate(`/${item.id}`, { state: { search, activeId: item.id } });
  };

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
            <li
              key={item.id}
              onClick={() => handleClick(item)}
              className={activeId === item.id ? styles['active-item'] : ''}
            >
              {item.id}: {item.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListPage;
