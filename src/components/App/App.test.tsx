import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders the main page', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText("Shakespear Reviews")).toBeInTheDocument();
  });
});
