"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function StepTwo() {
  const [checkout, setCheckout] = useState(null);
  const [qty, setQty] = useState(1);
  const [voucher, setVoucher] = useState("");

  // ================= FETCH CHECKOUT (POST ✅) =================
  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) return;

        const res = await fetch(`${API}/api/v1/cart/checkout`, {
          method: "POST", // ✅ FIX WAJIB
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            voucher_code: null,
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Checkout fetch failed:", res.status, text);
          return;
        }

        const json = await res.json();

        if (json.success) {
          setCheckout(json.data);
          setQty(json.data.items?.[0]?.qty || 1);

          // ✅ Cache checkout
          sessionStorage.setItem("checkout", JSON.stringify(json.data));
        }
      } catch (err) {
        console.error("Fetch checkout error:", err);
      }
    };

    fetchCheckout();
  }, []);

  // ================= FALLBACK SESSION =================
  useEffect(() => {
    if (checkout) return;

    const stored = sessionStorage.getItem("checkout");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      setCheckout(parsed);
      setQty(parsed.items?.[0]?.qty || 1);
    } catch (err) {
      console.error("Session parse error:", err);
    }
  }, [checkout]);

  // ================= LOADING =================
  if (!checkout) {
    return (
      <section className="max-w-5xl mx-auto px-6 py-12 text-white">
        <p className="text-gray-400">Memuat data checkout...</p>
      </section>
    );
  }

  // ================= GUARD CHECKOUT KOSONG =================
  if (!checkout.items?.length) {
    return (
      <section className="max-w-5xl mx-auto px-6 py-12 text-white text-center">
        <p className="text-gray-400">Checkout kosong</p>

        <Link
          href="/customer/category/product/detail/cart"
          className="mt-4 inline-block px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-600 transition"
        >
          Kembali ke Keranjang
        </Link>
      </section>
    );
  }

  const item = checkout.items[0];
  const product = item?.product;

  const unitPrice = item?.unit_price ?? 0;

  const stockAvailable =
    item?.stock_available ??
    product?.stock ??
    999;

  const subtotal = checkout.summary?.subtotal ?? 0;
  const discount = checkout.summary?.discount_total ?? 0;
  const taxPercent = checkout.summary?.tax_percent ?? 0;
  const taxAmount = checkout.summary?.tax_amount ?? 0;
  const total = checkout.summary?.total ?? 0;

  const handleMinus = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
  };

  const handlePlus = () => {
    if (qty >= stockAvailable) return;
    setQty(qty + 1);
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-12 text-white">

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
              src={
                product?.subcategory?.image_url ||
                product?.image_url ||
                "/placeholder.png"
              }
              fill
              alt={product?.name}
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <p className="font-medium">
              {product?.name || "Produk"}
            </p>

            <p className="text-sm text-gray-400">
              Rp {unitPrice.toLocaleString()} / unit
            </p>

            <p className="text-xs text-yellow-400">
              ⭐ {product?.rating?.toFixed(1) || "0.0"} ({product?.rating_count || 0})
            </p>
          </div>

          <div className="text-right font-semibold">
            Total :{" "}
            <span className="text-purple-400">
              Rp {(unitPrice * qty).toLocaleString()}
            </span>
          </div>
        </div>

        {/* ================= QTY ================= */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Jumlah Pembelian
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={handleMinus}
              disabled={qty <= 1}
              className="h-9 w-9 rounded-full bg-gray-200 text-black font-bold disabled:opacity-40"
            >
              −
            </button>

            <div className="flex items-center gap-1 rounded-full bg-gray-200 px-4 py-1 text-black">
              <span className="font-semibold">{qty}</span>
            </div>

            <button
              onClick={handlePlus}
              disabled={qty >= stockAvailable}
              className="h-9 w-9 rounded-full bg-gray-200 text-black font-bold disabled:opacity-40"
            >
              +
            </button>
          </div>
        </div>

        <p className="mt-2 text-xs text-gray-500">
          Stock tersedia: {stockAvailable}
        </p>

        {product?.track_stock && stockAvailable <= product?.stock_min_alert && (
          <p className="text-xs text-red-400 mt-1">
            ⚠ Stok hampir habis
          </p>
        )}
      </div>

      {/* ================= VOUCHER ================= */}
      <div className="mb-8 rounded-2xl border border-purple-800 bg-black p-6">
        <h3 className="mb-3 text-lg font-semibold">
          Kode Voucher / Promo
        </h3>

        <input
          value={voucher}
          onChange={(e) => setVoucher(e.target.value)}
          placeholder="Contoh: PROMO5K"
          className="w-full rounded-lg border border-purple-800 bg-black px-4 py-3 text-sm outline-none focus:border-purple-500"
        />
      </div>

      {/* ================= ACTION ================= */}
      <div className="mb-10 flex items-center gap-6">
        <Link
          href="/customer/category/product/detail/cart"
          className="flex-1 rounded-xl border border-purple-700 py-3 text-center hover:bg-purple-900/40 transition"
        >
          Kembali
        </Link>

        <Link
          href="/customer/category/product/detail/lengkapipembelian/methodpayment"
          className="flex-1 rounded-xl bg-purple-700 py-3 text-center font-semibold hover:bg-purple-600 transition"
        >
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
            <span>Subtotal</span>
            <span>Rp {subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Diskon</span>
            <span>Rp {discount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Pajak ({taxPercent}%)</span>
            <span>Rp {taxAmount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between border-t border-purple-800 pt-3 text-base font-semibold">
            <span>Total</span>
            <span className="text-purple-400">
              Rp {total.toLocaleString()}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}