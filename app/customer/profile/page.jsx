"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ChangePasswordModal from "../../components/customer/ChangePasswordModal";
import { User, Mail, MapPin, Pencil } from "lucide-react";
import { useAuth } from "../../../app/hooks/useAuth";
import { apiFetch } from "../../../app/lib/utils";

export default function ProfilePage() {
  const { user, setUser, loading } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [initialForm, setInitialForm] = useState(null);

  const [form, setForm] = useState({
    name: "",
    full_name: "",
    email: "",
    address: "",
  });

  /* =============================
   * SYNC USER → FORM
   * ============================= */
  useEffect(() => {
    if (loading || !user) return;

    const fetchProfile = async () => {
      try {
        const res = await apiFetch("/api/v1/auth/me/profile", {
          method: "GET",
        });

        const data = res.data;

        setForm({
          full_name: data.full_name || "",
          name: data.name || "",
          email: data.email || "",
          address: data.address || "",
        });

        setInitialForm({
          full_name: data.full_name || "",
          name: data.name || "",
          email: data.email || "",
          address: data.address || "",
        });
      } catch (err) {
        console.error("GET PROFILE ERROR:", err);
        alert("Gagal mengambil data profil");
      }
    };

    fetchProfile();
  }, [loading, user]);

  if (loading) return null;
  if (!user) return <p className="text-white text-center">User tidak ditemukan</p>;

  /* =============================
   * HELPERS
   * ============================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFilled = (value) => value && value.trim() !== "";

  const isChanged = (key) => {
    if (!initialForm) return false;
    return form[key] !== initialForm[key];
  };

  const hasChanges =
    initialForm &&
    Object.keys(form).some((key) => form[key] !== initialForm[key]);

  /* =============================
   * SAVE PROFILE
   * ============================= */
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await apiFetch("/api/v1/auth/me/profile", {
        method: "PATCH",
        body: JSON.stringify({
          name: form.name,
          full_name: form.full_name,
          address: form.address,
        }),
      });

      const data = res.data;

      setForm({
        name: data.name || "",
        full_name: data.full_name || "",
        email: data.email || "",
        address: data.address || "",
      });

      setInitialForm({
        name: data.name || "",
        full_name: data.full_name || "",
        email: data.email || "",
        address: data.address || "",
      });

      alert("Profil berhasil diperbarui");
    } catch (err) {
      alert(err?.message || "Gagal update profil");
    } finally {
      setSaving(false);
    }
  };


  return (
    <>
      <main className="min-h-screen bg-black px-4 pt-28 pb-24">
        <div className="max-w-5xl mx-auto">

          {/* PROFILE IMAGE */}
          <div className="flex justify-center mb-10">
            <div className="relative w-56 h-56 rounded-3xl border-2 border-purple-500">
              <Image
                src="/logoherosection.png"
                alt="Profile"
                fill
                className="rounded-2xl object-cover"
              />
              <button className="absolute bottom-3 right-3 bg-purple-700 p-2 rounded-lg">
                <Pencil size={16} className="text-white" />
              </button>
            </div>
          </div>

          {/* PROFILE FORM */}
          <div className="border border-purple-500/50 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Profil Akun
            </h2>

            <div className="space-y-5">
              <Input
                icon={<User />}
                label="Nama Pengguna"
                name="name"
                value={form.name}
                onChange={handleChange}
                filled={isFilled(form.name)}
                changed={isChanged("name")}
              />

              <Input
                icon={<User />}
                label="Nama Lengkap"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                filled={isFilled(form.full_name)}
                changed={isChanged("full_name")}
              />

              <Input
                icon={<Mail />}
                label="Email"
                name="email"
                value={form.email}
                disabled
                filled
              />

              <Input
                icon={<MapPin />}
                label="Alamat"
                name="address"
                value={form.address}
                onChange={handleChange}
                filled={isFilled(form.address)}
                changed={isChanged("address")}
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setOpenModal(true)}
                className="border border-purple-500 px-6 py-2 rounded-xl text-white hover:bg-purple-500/10"
              >
                Ganti Password
              </button>

              <button
                onClick={handleSave}
                disabled={saving || !hasChanges}
                className="bg-purple-700 px-6 py-2 rounded-xl text-white font-semibold hover:bg-purple-800 disabled:opacity-50"
              >
                {saving ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <ChangePasswordModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}

/* =============================
 * INPUT COMPONENT
 * ============================= */
function Input({
  icon,
  label,
  name,
  value,
  onChange,
  disabled = false,
  filled = false,
  changed = false,
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm text-purple-300 mb-1">
        {icon} {label}
        {changed && (
          <span className="text-xs text-purple-400">(diubah)</span>
        )}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={disabled ? "" : "Belum diisi"}
        className={`
          w-full rounded-xl px-4 py-2 outline-none text-white
          border
          ${
            filled
              ? "bg-purple-900/60 border-purple-500"
              : "bg-black border-purple-700/30 text-gray-400"
          }
          ${changed ? "ring-2 ring-purple-500/40" : ""}
          disabled:opacity-60
        `}
      />
    </div>
  );
}
