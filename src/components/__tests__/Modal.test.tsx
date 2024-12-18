import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../Modal";

describe("Modal Component", () => {
  test("renders modal dengan title dan children", () => {
    const mockOnClose = jest.fn();
    render(
      <Modal title="Test Modal" onClose={mockOnClose}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  test("memanggil onClose saat tombol close diklik", () => {
    const mockOnClose = jest.fn();
    render(
      <Modal title="Test Modal" onClose={mockOnClose}>
        <p>Modal Content</p>
      </Modal>
    );

    const closeButton = screen.getByTestId("modal-close-button");
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("tambahkan kelas custom ke elemen modal", () => {
    const mockOnClose = jest.fn();
    render(
      <Modal title="Test Modal" onClose={mockOnClose} className="custom-class">
        <p>Modal Content</p>
      </Modal>
    );

    const modalElement = screen.getByTestId("modal-container");
    expect(modalElement.firstChild).toHaveClass("custom-class");
  });

  test("memanggil onClose saat backdrop diklik", () => {
    const mockOnClose = jest.fn();
    render(
      <Modal title="Test Modal" onClose={mockOnClose}>
        <p>Modal Content</p>
      </Modal>
    );

    const backdrop = screen.getByTestId("modal-backdrop");
    fireEvent.click(backdrop);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("tidak memanggil onClose saat konten modal diklik", () => {
    const mockOnClose = jest.fn();
    render(
      <Modal title="Test Modal" onClose={mockOnClose}>
        <p data-testid="modal-content">Modal Content</p>
      </Modal>
    );

    const content = screen.getByTestId("modal-content");
    fireEvent.click(content);
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
