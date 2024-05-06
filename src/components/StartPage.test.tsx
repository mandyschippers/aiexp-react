import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import StartPage from './StartPage.tsx';
import userEvent from '@testing-library/user-event'; // Make sure to import userEvent

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Use all the actual exported objects from the original module
  useNavigate: jest.fn(), // Mock only the useNavigate function
}));

beforeEach(() => {
  jest.clearAllMocks(); // Clear mocks before each test
});

afterAll(() => {
  jest.restoreAllMocks(); // Restore all mocks to their original values after all tests
});

test('displays a list of conversations', () => {
  render(
    <BrowserRouter>
      <StartPage />
    </BrowserRouter>
  );

  // Assert that a list of conversations is displayed
  const heading = screen.getByRole('heading', { name: /conversations/i });
  expect(heading).toBeInTheDocument();
  const list = screen.getByRole('list');
  expect(list).toBeInTheDocument();
});
