import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from '../SearchInput';

describe('SearchInput Component', () => {
  test('renders SearchInput component', () => {
    const mockHandleSearch = jest.fn(); 
    render(<SearchInput search="Test" handleSearch={mockHandleSearch} />);

    const inputElement = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument(); 
    expect(inputElement.value).toBe('Test'); 
  });

  test('memanggil handleSearch saat input berubah', () => {
    const mockHandleSearch = jest.fn(); 
    render(<SearchInput search="" handleSearch={mockHandleSearch} />);

    const inputElement = screen.getByPlaceholderText('Search...') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'New Search' } });

    expect(mockHandleSearch).toHaveBeenCalledTimes(1);
    expect(mockHandleSearch).toHaveBeenCalledWith('New Search');
  });
});
