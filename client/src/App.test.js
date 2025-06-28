import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders login page', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const loginElement = screen.getByText(/login/i);
  expect(loginElement).toBeInTheDocument();
});
