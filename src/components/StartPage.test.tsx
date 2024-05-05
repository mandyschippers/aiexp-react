import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import StartPage from './StartPage';

jest.mock('axios');

describe('StartPage', () => {
  it('renders the component', () => {
    render(<StartPage />);
    // Add your assertions here
  });

  it('updates the input value on change', () => {
    const { getByLabelText } = render(<StartPage />);
    const input = getByLabelText('message') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(input.value).toBe('Hello');
  });

  it('sends a message when the send button is clicked', async () => {
    const { getByLabelText, getByText } = render(<StartPage />);
    const input = getByLabelText('message');
    const sendButton = getByText('Send');

    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/message', { message: 'Hello' });
      // Add your assertions for the response here
    });
  });

  // Add more tests as needed
});