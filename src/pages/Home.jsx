import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: "",
    tag: "",
  });

  useEffect(() => {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newContact.name || !newContact.tag) return;

    const updatedContacts = [...contacts, { ...newContact, id: Date.now() }];

    Swal.fire({
      title: "Berhasil",
      text: "Kontak berhasil ditambahkan",
      icon: "success",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        setContacts(updatedContacts);
        localStorage.setItem("contacts", JSON.stringify(updatedContacts));
      }
    });

    setNewContact({ name: "", tag: "" });
  };

  const handleDelete = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);

    Swal.fire({
      title: "Berhasil",
      text: "Kontak berhasil dihapus",
      icon: "success",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        setContacts(updatedContacts);
        localStorage.setItem("contacts", JSON.stringify(updatedContacts));
      }
    });
  };

  return (
    <section className="mx-auto w-2/3 py-5">
      <div>
        <h1 className="text-2xl font-medium">Aplikasi Kontak</h1>
        <div className="mt-3">
          <h3 className="font-bold">Tambah Kontak</h3>

          <form
            onSubmit={handleSubmit}
            className="mt-1 flex flex-col gap-3 rounded border border-dashed bg-gray-300 p-3"
          >
            <input
              type="text"
              name="name"
              value={newContact.name}
              onChange={handleInputChange}
              placeholder="Nama"
              className="rounded bg-white px-2 py-1"
            />
            <input
              type="text"
              name="tag"
              value={newContact.tag}
              onChange={handleInputChange}
              placeholder="Tag (misal: teman, keluarga, kerja)"
              className="rounded bg-white px-2 py-1"
            />
            <button
              type="submit"
              className="mt-2 cursor-pointer rounded border bg-gray-300 py-1.5 text-sm transition duration-100 hover:bg-gray-400/50"
            >
              Tambah kontak +
            </button>
          </form>
        </div>
      </div>

      <div className="mt-5">
        <h1 className="text-2xl font-medium">Daftar Kontak</h1>

        <div className="mt-3 space-y-2">
          {contacts.length === 0 ? (
            <p className="text-gray-500 italic">
              Tidak ada kontak yang tersimpan
            </p>
          ) : (
            contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between rounded border border-dashed p-3"
              >
                <div>
                  <h3 className="font-medium">{contact.name}</h3>
                  <p className="text-sm text-gray-600">@{contact.tag}</p>
                </div>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="cursor-pointer rounded bg-red-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
