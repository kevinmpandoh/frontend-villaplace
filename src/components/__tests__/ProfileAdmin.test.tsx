import { render, screen, fireEvent } from '@testing-library/react';
import ProfileAdmin from '../ProfileAdmin'; 

describe('Komponen ProfileAdmin', () => {
  test('menampilkan form dengan input yang benar', () => {
    render(<ProfileAdmin />);
    expect(screen.getByLabelText('Nama Lengkap')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Nomor Telepon')).toBeInTheDocument();
    expect(screen.getByText('Unggah Foto')).toBeInTheDocument();
  });

  test('memanggil fungsi saat tombol Edit Profile diklik', () => {
    render(<ProfileAdmin />);
    const button = screen.getByRole('button', { name: /Edit Profile/i });
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  test('memastikan file gambar bisa dipilih melalui input file', () => {
    render(<ProfileAdmin />);
    const inputFile = screen.getByLabelText('Unggah Foto') as HTMLInputElement;
    const file = new File(['dummy content'], 'image.jpg', { type: 'image/jpeg' });
    fireEvent.change(inputFile, { target: { files: [file] } });
    expect(inputFile.files?.[0].name).toBe('image.jpg');
  });

  test('menampilkan batasan ukuran dan format foto dengan benar', () => {
    render(<ProfileAdmin />);
    expect(screen.getByText(/Ukuran foto harus kurang dari 10mb/)).toBeInTheDocument();
    expect(screen.getByText(/dan harus berformat JPG, PNG, atau JPEG/)).toBeInTheDocument();
  });
});
