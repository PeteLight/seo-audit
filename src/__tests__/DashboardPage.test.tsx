import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DashboardPage from '@/app/dashboard/page';
import { AuthProvider } from '@/context/AuthContext';

describe('DashboardPage', () => {
  test('displays an error message when an invalid URL is submitted', async () => {
    render(
      <AuthProvider>
        <DashboardPage />
      </AuthProvider>
    );

    const urlInput = screen.getByPlaceholderText('https://example.com');
    const titleInput = screen.getByPlaceholderText('Your Website Title');
    const submitButton = screen.getByRole('button', { name: /Run SEO Audit/i });

    fireEvent.change(urlInput, { target: { value: 'invalid-url' } });
    fireEvent.change(titleInput, { target: { value: 'Test Website' } });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(screen.getByText(/Please enter a valid URL/)).toBeInTheDocument()
    );
  });

  test('displays a success message when a valid URL is submitted', async () => {
    render(
      <AuthProvider>
        <DashboardPage />
      </AuthProvider>
    );

    const urlInput = screen.getByPlaceholderText('https://example.com');
    const titleInput = screen.getByPlaceholderText('Your Website Title');
    const submitButton = screen.getByRole('button', { name: /Run SEO Audit/i });

    fireEvent.change(urlInput, { target: { value: 'https://example.com' } });
    fireEvent.change(titleInput, { target: { value: 'Test Website' } });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(
        screen.getByText(/SEO audit has been run successfully!/)
      ).toBeInTheDocument()
    );
  });
});
