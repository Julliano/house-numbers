import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Index from './../_index';

describe('Index route', () => {
  it('renders app landing page', async () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );
    expect(await screen.findByText(/Welcome to/i)).toBeInTheDocument();
  });
});
