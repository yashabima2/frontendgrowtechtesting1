import Image from "next/image";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import Link from "next/link";
import {
  CheckCircle,
  CreditCard,
  Wallet,
  Lock,
  AlertCircle,
} from "lucide-react";

export default function PaymentPage() {
  return (
    <>

      <main className="bg-black min-h-screen px-4 pb-24">
        <div className="max-w-5xl mx-auto">

          {/* TITLE */}
          <h1 className="text-4xl font-bold text-white mb-8">
            Pilih Metode Pembayaran
          </h1>

          {/* PAYMENT METHODS */}
          <div className="space-y-4 mb-10">
            <PaymentOption
              active
              icon={<CreditCard className="text-green-400" />}
              title="QRIS"
              desc="Bayar QRIS dari semua Bank"
            />

            <PaymentOption
              icon={<Wallet className="text-white" />}
              title="Wallet"
              desc="Saldo Tersedia: Rp 245.000"
            />

            <div className="border border-purple-500/40 rounded-2xl p-5 flex gap-3">
              <AlertCircle className="text-white mt-1" />
              <p className="text-gray-300 text-sm">
                Produk digital akan dikirim ke email dan profile Anda setelah
                pembayaran berhasil diverifikasi dalam beberapa menit.
              </p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 mb-12">
            <button className="flex-1 border border-purple-500 rounded-xl py-4 text-white hover:bg-purple-500/10 transition">
              Kembali
            </button>

            <Link href="./methodpayment/process" className="flex-1 bg-gradient-to-r from-purple-700 to-purple-900 rounded-xl py-4 text-white font-semibold flex items-center justify-center gap-2">
              <Lock size={18} />
              Proses Pembayaran
            </Link>
          </div>

          {/* ORDER DETAIL */}
          <div className="border border-purple-500/40 rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">
              Detail Pesanan
            </h2>

            {/* PRODUCT */}
            <div className="flex items-center gap-4 pb-6 border-b border-purple-500/30">
              <Image
                src="/product/redfinger.png"
                alt="product"
                width={64}
                height={64}
                className="rounded-xl"
              />

              <div className="flex-1">
                <p className="text-white font-semibold">
                  VIP 7D Android 15/12/10
                </p>
                <p className="text-gray-400 text-sm">Qty : 2</p>
              </div>

              <p className="text-white font-semibold">Rp 48.000</p>
            </div>

            {/* PRICE */}
            <div className="py-6 space-y-3 border-b border-purple-500/30">
              <Row label="Sub Total" value="Rp 48.000" />
              <Row label="Diskon" value="Rp 0" />
            </div>

            <div className="flex justify-between items-center py-6">
              <p className="text-xl text-white font-semibold">Total Bayar</p>
              <p className="text-xl text-white font-bold">Rp 48.000</p>
            </div>

            {/* PAYMENT INFO */}
            <div className="bg-gradient-to-r from-purple-900 to-black border border-purple-500/40 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-300">Metode Pembayaran</p>
              <p className="text-lg font-semibold text-white">QRIS</p>
            </div>

            <div className="border border-purple-500/40 rounded-xl p-4 flex items-center gap-2">
              <Lock size={18} className="text-white" />
              <p className="text-sm text-gray-300">Pembayaran Terenkripsi</p>
            </div>
          </div>
        </div>
      </main>

    </>
  );
}

/* ================= COMPONENTS ================= */

function Step({ active, number, label, title }) {
  return (
    <div className="flex items-center gap-3">
      {active ? (
        <CheckCircle className="text-green-400" />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-200 text-black flex items-center justify-center font-bold">
          {number}
        </div>
      )}

      <div>
        <p className="text-sm text-purple-400">{label}</p>
        <p className="text-white font-semibold">{title}</p>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="flex-1 h-1 bg-green-400 rounded-full" />;
}

function PaymentOption({ active, icon, title, desc }) {
  return (
    <div
      className={`flex items-center gap-4 p-5 rounded-2xl border ${
        active
          ? "border-purple-500 bg-purple-500/10"
          : "border-purple-500/40"
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full ${
          active ? "bg-green-400" : "border border-white"
        }`}
      />
      {icon}
      <div>
        <p className="text-white font-semibold">{title}</p>
        <p className="text-gray-400 text-sm">{desc}</p>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-gray-300">
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
}
