'use client'

import Image from "next/image";
import Link from "next/link";

export default function StepTwo() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12 text-white">

      {/* ================= TITLE ================= */}
      <h1 className="mb-8 text-3xl font-bold">
        Lengkapi Data Pembelian
      </h1>

      {/* ================= PRODUK ================= */}
      <div className="mb-8 rounded-2xl border border-purple-800 bg-black p-6">

        <h3 className="mb-4 text-lg font-semibold">
          Produk Yang Dipilih
        </h3>

        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-purple-700">
            <Image
              src="/product/redfinger.png"
              fill
              alt="Red Finger"
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <p className="font-medium">
              VIP 7D Android 15/12/10
            </p>
            <p className="text-sm text-gray-400">
              Rp 19.000 / unit
            </p>
          </div>

          <div className="text-right font-semibold">
            Total : <span className="text-purple-400">Rp 48.000</span>
          </div>
        </div>

        {/* JUMLAH */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Jumlah Pembelian
          </span>

          <div className="flex items-center gap-3">
            <button className="h-9 w-9 rounded-full bg-gray-200 text-black font-bold">
              −
            </button>

            <div className="flex items-center gap-1 rounded-full bg-gray-200 px-4 py-1 text-black">
              <span className="font-semibold">2</span>
              <span className="text-xs">↕</span>
            </div>

            <button className="h-9 w-9 rounded-full bg-gray-200 text-black font-bold">
              +
            </button>
          </div>
        </div>
      </div>

      {/* ================= VOUCHER ================= */}
      <div className="mb-8 rounded-2xl border border-purple-800 bg-black p-6">
        <div className="mb-3 flex items-center gap-3">
          <h3 className="text-lg font-semibold">
            Kode Voucher / Promo
          </h3>
          <span className="rounded-full bg-white px-3 py-0.5 text-xs text-black">
            Optional
          </span>
        </div>

        <input
          placeholder="Contoh: PROMO5K"
          className="w-full rounded-lg border border-purple-800 bg-black px-4 py-3 text-sm outline-none focus:border-purple-500"
        />
      </div>

      {/* ================= SALDO ================= */}
      <div className="mb-10 rounded-2xl border border-purple-800 bg-black p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold mb-1">
              Saldo Wallet
            </h3>
            <p className="text-sm text-gray-400">
              Gunakan Saldo Wallet
            </p>
            <p className="text-sm text-gray-400">
              Saldo Tersedia: Rp 245.000
            </p>
          </div>

          <Link href="/customer/topup" className="rounded-full bg-purple-700 px-6 py-2 text-sm font-medium hover:bg-purple-600">
            Top up
          </Link>
        </div>
      </div>

      {/* ================= ACTION ================= */}
      <div className="mb-10 flex items-center gap-6">
      <Link
        href="/customer/category/product/detail/"
        className="flex-1 rounded-xl border border-purple-700 py-3 text-center hover:bg-purple-900/40"
      >
        Kembali
      </Link>

        <Link href="/customer/category/product/detail/lengkapipembelian/methodpayment" className="flex-1 rounded-xl bg-purple-700 py-3 text-center font-semibold hover:bg-purple-600">
          Lanjut Ke Pembayaran &gt;
        </Link>
      </div>

      {/* ================= RINGKASAN ================= */}
      <div className="rounded-2xl border border-purple-800 bg-black p-6">
        <h3 className="mb-4 text-lg font-semibold">
          Ringkasan
        </h3>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Harga Unit</span>
            <span>Rp 19.000</span>
          </div>

          <div className="flex justify-between">
            <span>Jumlah</span>
            <span>2x</span>
          </div>

          <div className="flex justify-between">
            <span>Sub Total</span>
            <span>Rp 48.000</span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>10%</span>
          </div>

          <div className="flex justify-between border-t border-purple-800 pt-3">
            <span>Diskon</span>
            <span>Rp 0</span>
          </div>

          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span className="text-purple-400">
              Rp 48.480
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}
