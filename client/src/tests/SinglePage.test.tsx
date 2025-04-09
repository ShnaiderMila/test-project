import React from 'react'; 
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SinglePage from '../pages/SinglePage';

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('SinglePage', () => {
  test('renders item data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ id: 1, name: 'Test', description: 'Some info' })
    });

    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path='/:id' element={<SinglePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Item Details')).toBeInTheDocument();
    expect(screen.getByText('ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Name: Test')).toBeInTheDocument();
  });

  test('handles 403 error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
      json: async () => ({})
    });

    render(
      <MemoryRouter initialEntries={['/3']}>
        <Routes>
          <Route path='/:id' element={<SinglePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Access forbidden (403)')).toBeInTheDocument();
  });

  test('shows error on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(
      <MemoryRouter initialEntries={['/5']}>
        <Routes>
          <Route path='/:id' element={<SinglePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Network error')).toBeInTheDocument();
  });
});