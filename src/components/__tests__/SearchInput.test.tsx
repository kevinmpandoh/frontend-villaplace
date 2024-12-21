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

  test('mengupdate nilai input dengan benar', () => {
    const mockHandleSearch = jest.fn(); 
    render(<SearchInput search="" handleSearch={mockHandleSearch} />);

    const inputElement = screen.getByPlaceholderText('Search...') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'Updated Value' } });

    expect(inputElement.value).toBe('Updated Value');
  });

  test('input memiliki atribut yang benar', () => {
    const mockHandleSearch = jest.fn();
    render(<SearchInput search="" handleSearch={mockHandleSearch} />);

    const inputElement = screen.getByPlaceholderText('Search...');

    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveClass(
      'w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-700 placeholder-gray-400'
    );
  });

  test('render dengan nilai awal search', () => {
    const mockHandleSearch = jest.fn();
    render(<SearchInput search="Initial Value" handleSearch={mockHandleSearch} />);

    const inputElement = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    expect(inputElement.value).toBe('Initial Value');
  });
});
