import { render, screen } from '@testing-library/react';
import BackButton from '../ui/BackButton';
import '@testing-library/jest-dom';

describe('BackButton Component', () => {
  test('renders BackButton with correct text and icon', () => {
    // Render komponen
    render(<BackButton />);

    // Cari elemen dengan teks "Back"
    const backButtonText = screen.getByText('Back');
    expect(backButtonText).toBeInTheDocument();

    // Cari ikon dengan data-testid
    const icon = screen.getByTestId('fa-arrow-left');
    expect(icon).toBeInTheDocument();
  });

  test('has correct href in Link component', () => {
    // Render komponen
    render(<BackButton />);

    // Cari elemen <a> di dalam Link
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/');
  });
});
