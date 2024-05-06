import { render, screen } from '@testing-library/react';
import App from './App';

test('renders a h1 header', () => {
  render(<App />);
  const headerElement = screen.getByRole('heading', { level: 1 })
  expect(headerElement).toBeInTheDocument();
});