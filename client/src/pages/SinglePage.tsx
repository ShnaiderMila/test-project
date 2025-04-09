import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useItem } from './useItem';

function SinglePage() {
  const { id } = useParams();
  const { item, isLoading, error } = useItem(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!item) return <div>No data found</div>;

  return (
    <div className="detail">
      <Link to="/">Go Back</Link>
      <h2>Item Details</h2>
      <p>ID: {item.id}</p>
      <p>Name: {item.name}</p>
      <p>Description: {item.description}</p>
    </div>
  );
}

export default SinglePage;
