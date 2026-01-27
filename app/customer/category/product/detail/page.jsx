'use client'

import Image from "next/image";
import Link from "next/link";

export default function StepOne() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-10 text-white">

      {/* ================= HERO IMAGE ================= */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-purple-800">
        <Image
          src="/product/redfinger.png"
          alt="Red Finger"
          width={1200}
          height={480}
          priority
          className="h-[320px] w-full object-cover"
        />
      </div>

      {/* ================= THUMBNAILS ================= */}
      <div className="mb-6 flex gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-25 w-38 overflow-hidden rounded-xl border border-purple-700"
          >
            <Image
              src="/product/redfinger.png"
              alt="thumb"
              width={250}
              height={150}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* ================= TITLE ================= */}
      <div className="mb-6">
        <p className="text-sm text-purple-400 mb-1">
          Red Finger
        </p>

        <h1 className="text-3xl font-bold">
          VIP 7D Android 15/12/10
        </h1>
      </div>

      {/* ================= PRICE ================= */}
      <div className="mb-6 rounded-2xl border border-purple-800 bg-gradient-to-b from-purple-900/40 to-black p-6">
        <p className="text-sm text-gray-300 mb-1">
          Harga Member
        </p>
        <p className="text-4xl font-bold">
          Rp 19.000
        </p>
      </div>

      {/* ================= STOCK ================= */}
      <div className="mb-8 rounded-2xl border border-purple-800 bg-black p-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span>Stok Tersedia</span>
          <span>245 Unit</span>
        </div>

        <div className="h-3 w-full rounded-full bg-gray-700 overflow-hidden">
          <div className="h-full w-[85%] bg-green-500 rounded-full" />
        </div>
      </div>

      {/* ================= ACTION BUTTON ================= */}
      <div className="mb-10 space-y-4">
        <Link
          href="/customer/category/product/detail/lengkapipembelian"
          className="block w-full rounded-xl bg-white py-4 text-center text-lg font-semibold text-black"
        >
          Beli Sekarang
        </Link>

        <Link href="/customer/category/product/detail/cart" className="block w-full rounded-xl bg-purple-800 py-4 text-lg font-semibold text-center hover:bg-purple-700">
          Masukkan Ke Keranjang
        </Link>
      </div>

    </section>
  );
}
