import React from 'react'; 
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ListPage from '../pages/ListPage';

jest.mock('../pages/useData', () => () => ({
  items: [
    { id: 1, description: 'Item one' },
    { id: 3, description: 'Item three' },
    { id: 5, description: 'Item five' },
  ],
  isLoading: false,
  error: null,
}));

describe('ListPage', () => {
  test('renders item list', () => {
    render(<BrowserRouter><ListPage /></BrowserRouter>);
    expect(screen.getByText('Item one')).toBeInTheDocument();
    expect(screen.getByText('Item three')).toBeInTheDocument();
    expect(screen.getByText('Item five')).toBeInTheDocument();
  });

  test('filters list by search input', () => {
    render(<BrowserRouter><ListPage /></BrowserRouter>);
    fireEvent.change(screen.getByPlaceholderText('Search by ID'), {
      target: { value: '3' },
    });
    expect(screen.queryByText('Item one')).not.toBeInTheDocument();
    expect(screen.getByText('Item three')).toBeInTheDocument();
  });

  test('shows message when no items found', () => {
    render(<BrowserRouter><ListPage /></BrowserRouter>);
    fireEvent.change(screen.getByPlaceholderText('Search by ID'), {
      target: { value: '999' },
    });
    expect(screen.getByText('No items found')).toBeInTheDocument();
  });
});