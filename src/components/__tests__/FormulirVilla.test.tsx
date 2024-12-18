import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FormulirVilla from '../FormulirVilla';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Komponen FormulirVilla', () => {
  test('menampilkan formulir dengan input yang benar', () => {
    render(<FormulirVilla />);

    expect(screen.getByLabelText('Nama Villa')).toBeInTheDocument();
    expect(screen.getByLabelText('Lokasi')).toBeInTheDocument();
    expect(screen.getByLabelText('Harga')).toBeInTheDocument();
    expect(screen.getByLabelText('Deskripsi')).toBeInTheDocument();
    expect(screen.getByText('Fasilitas Tambahan')).toBeInTheDocument();
    expect(screen.getByLabelText('Kategori (pisahkan dengan koma)')).toBeInTheDocument();
    expect(screen.getByText('Upload Galeri')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Unggah/i })).toBeInTheDocument();
  });

  test('menampilkan pesan error jika input kosong', async () => {
    render(<FormulirVilla />);
    fireEvent.click(screen.getByRole('button', { name: /Unggah/i }));

    expect(await screen.findByText('Nama Villa harus diisi.')).toBeInTheDocument();
    expect(await screen.findByText('Lokasi harus diisi.')).toBeInTheDocument();
    expect(await screen.findByText('Harga harus diisi.')).toBeInTheDocument();
    expect(await screen.findByText('Deskripsi harus diisi.')).toBeInTheDocument();
    expect(await screen.findByText('Kategori harus diisi.')).toBeInTheDocument();
  });

  test('memasukkan data valid dan mengunggah formulir', async () => {
    mockedAxios.post.mockResolvedValue({
      data: { data: { _id: '123' } },
    });

    render(<FormulirVilla />);

    await userEvent.type(screen.getByLabelText('Nama Villa'), 'Villa Indah');
    await userEvent.type(screen.getByLabelText('Lokasi'), 'Bali');
    await userEvent.type(screen.getByLabelText('Harga'), '2000000');
    await userEvent.type(screen.getByLabelText('Deskripsi'), 'Villa mewah dengan pemandangan laut');
    await userEvent.type(screen.getByLabelText('Kategori (pisahkan dengan koma)'), 'Mewah, Pantai');

    fireEvent.change(screen.getByLabelText('Upload Galeri'), {
      target: { files: [new File(['image content'], 'image.jpg', { type: 'image/jpeg' })] },
    });

    fireEvent.click(screen.getByRole('button', { name: /Unggah/i }));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledTimes(2);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:8000/api/villa',
        expect.objectContaining({
          nama: 'Villa Indah',
          lokasi: 'Bali',
          harga: 2000000,
          deskripsi: 'Villa mewah dengan pemandangan laut',
          kategori: ['Mewah', 'Pantai'],
        }),
        { withCredentials: true }
      );
    });
  });

  test('menampilkan pesan sukses saat formulir berhasil dikirim', async () => {
    mockedAxios.post.mockResolvedValue({ data: { data: { _id: '123' } } });

    render(<FormulirVilla />);

    await userEvent.type(screen.getByLabelText('Nama Villa'), 'Villa Indah');
    await userEvent.type(screen.getByLabelText('Lokasi'), 'Bali');
    await userEvent.type(screen.getByLabelText('Harga'), '2000000');
    await userEvent.type(screen.getByLabelText('Deskripsi'), 'Villa mewah dengan pemandangan laut');
    await userEvent.type(screen.getByLabelText('Kategori (pisahkan dengan koma)'), 'Mewah, Pantai');

    fireEvent.click(screen.getByRole('button', { name: /Unggah/i }));

    await waitFor(() => {
      expect(screen.getByText('Villa Berhasil Dibuat.')).toBeInTheDocument();
    });
  });

  test('menampilkan pesan error saat API gagal', async () => {
    mockedAxios.post.mockRejectedValue({
      response: { data: { message: 'Terjadi kesalahan server' } },
    });

    render(<FormulirVilla />);

    await userEvent.type(screen.getByLabelText('Nama Villa'), 'Villa Indah');
    fireEvent.click(screen.getByRole('button', { name: /Unggah/i }));

    await waitFor(() => {
      expect(screen.getByText('Terjadi kesalahan server')).toBeInTheDocument();
    });
  });
});
