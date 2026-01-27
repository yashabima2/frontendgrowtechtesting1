"use client";

import { useState } from "react";
import { X, Lock } from "lucide-react";
import { apiFetch } from "../../../app/lib/utils";

export default function ChangePasswordModal({ open, onClose }) {
  const [form, setForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (form.password !== form.password_confirmation) {
      alert("Password baru dan konfirmasi tidak sama");
      return;
    }

    setLoading(true);
    try {
      await apiFetch("/api/v1/auth/me/password", {
        method: "PATCH",
        body: JSON.stringify(form),
      });

      alert("Password berhasil diubah");
      onClose();
    } catch (err) {
      alert(err?.message || "Gagal ganti password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-black border border-purple-500 rounded-2xl w-full max-w-md p-6 relative">

        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400">
          <X />
        </button>

        <h3 className="text-xl font-semibold text-white mb-6">
          Ganti Password
        </h3>

        <div className="space-y-4">
          <Field label="Password Lama" name="current_password" onChange={handleChange} />
          <Field label="Password Baru" name="password" onChange={handleChange} />
          <Field label="Konfirmasi Password" name="password_confirmation" onChange={handleChange} />
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-6 w-full bg-purple-700 py-2 rounded-xl text-white font-semibold disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan Password"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, name, onChange }) {
  return (
    <div>
      <label className="text-sm text-purple-300">{label}</label>
      <div className="flex items-center gap-2 mt-1">
        <Lock size={16} className="text-purple-400" />
        <input
          type="password"
          name={name}
          onChange={onChange}
          className="flex-1 rounded-xl bg-purple-900/60 border border-purple-500 px-4 py-2 text-white"
        />
      </div>
    </div>
  );
}
