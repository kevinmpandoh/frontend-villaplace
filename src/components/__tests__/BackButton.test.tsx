import { render, screen } from '@testing-library/react';
import BackButton from '../ui/BackButton';
import '@testing-library/jest-dom';

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: (props: any) => <svg data-testid={props['data-testid']} />,
}));

jest.mock('next/link', () => {
  return ({ children }: any) => children;
});

describe('BackButton Component', () => {
  test('Menampilkan teks "Back" dengan teks dan ikon', () => {
    render(<BackButton />);
    const backButtonText = screen.getByText('Back');
    expect(backButtonText).toBeInTheDocument();

    const icon = screen.getByTestId('fa-arrow-left');
    expect(icon).toBeInTheDocument();
  });

  test('Memiliki href yang benar dalam Link', () => {
    render(<BackButton />);
  
    const linkElement = screen.getByRole('link', { name: /back/i, hidden: true });
    expect(linkElement).toHaveAttribute('href', '/');
  });
  

  test('Snapshot testing untuk memastikan struktur elemen', () => {
    const { asFragment } = render(<BackButton />);
    expect(asFragment()).toMatchSnapshot();
  });
});
