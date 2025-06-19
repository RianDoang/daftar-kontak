import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-2 text-9xl font-bold text-gray-800">404</h1>
        <h2 className="mb-4 text-3xl font-medium text-gray-600">
          Halaman Tidak Ditemukan
        </h2>
        <p className="mb-8 text-gray-500">
          Maaf, halaman yang Anda cari tidak dapat ditemukan.
        </p>
        <Link
          to="/"
          className="inline-block rounded bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
