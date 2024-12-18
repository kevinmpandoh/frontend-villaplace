import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';

describe('Modal Component', () => {
  test('renders modal dengan title dan children', () => {
    const mockOnClose = jest.fn();
    render(
      <Modal title="Test Modal" onClose={mockOnClose}>
        <p>Modal Content</p>
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('memanggil onClose saat tombol close diklik', () => {
    const mockOnClose = jest.fn();
    render(
      <Modal title="Test Modal" onClose={mockOnClose}>
        <p>Modal Content</p>
      </Modal>
    );
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('tambahkan kelas custom ke elemen modal', () => {
    const mockOnClose = jest.fn();
    render(
      <Modal title="Test Modal" onClose={mockOnClose} className="custom-class">
        <p>Modal Content</p>
      </Modal>
    );
    const modalElement = screen.getByText('Test Modal').closest('div');
    expect(modalElement).toHaveClass('custom-class');
  });

  test('tidak memanggil onClose saat backdrop diklik', () => {
    const mockOnClose = jest.fn();
    render(
      <Modal title="Test Modal" onClose={mockOnClose}>
        <p>Modal Content</p>
      </Modal>
    );
    const backdrop = screen.getByRole('presentation'); 
    fireEvent.click(backdrop);
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
