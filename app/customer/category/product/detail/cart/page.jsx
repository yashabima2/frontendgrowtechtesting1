"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function CartPage() {
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        setUnauthorized(true);
        setItems([]);
        return;
      }

      const res = await fetch(`${API}/api/v1/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        if (res.status === 401) setUnauthorized(true);
        setItems([]);
        return;
      }

      const json = await res.json();

      if (json.success) {
        setItems(json.data.items || []);
        setSummary(json.data.summary || null);
      }
    } catch (err) {
      console.error("Failed fetch cart:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true);

      const token = Cookies.get("token");
      if (!token) return;

      const res = await fetch(`${API}/api/v1/cart/checkout`, {
        method: "POST",
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
        console.error("Checkout error:", res.status, text);
        alert("Checkout gagal");
        return;
      }

      const json = await res.json();

      if (!json.success) {
        alert(json.message || "Checkout gagal");
        return;
      }

      // ✅ simpan data checkout ke sessionStorage
      sessionStorage.setItem("checkout", JSON.stringify(json.data));

      // ✅ redirect ke StepTwo
      router.push("/customer/category/product/detail/lengkapipembelian");
    } catch (err) {
      console.error("Checkout failed:", err);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const subtotal = summary?.subtotal ?? 0;
  const total = summary?.total ?? subtotal;

  if (!loading && unauthorized) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <p className="text-gray-400 mb-4">
          Kamu harus login untuk melihat keranjang
        </p>

        <Link
          href="/login"
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition"
        >
          Login Sekarang
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-8 pt-10">
        <h1 className="text-4xl font-bold mb-10">Keranjang</h1>
      </div>

      <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT tetap */}
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <p className="text-gray-400">Loading cart...</p>
          ) : items.length === 0 ? (
            <p className="text-gray-500">Keranjang kosong</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-purple-700 p-6 flex items-center gap-6"
              >
                <div className="h-20 w-20 rounded-xl bg-blue-600 flex items-center justify-center">
                  <Image
                    src={item.product?.subcategory?.image_url || "/placeholder.png"}
                    alt={item.product?.name}
                    width={48}
                    height={48}
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {item.product?.name}
                  </h3>

                  <p className="text-sm text-gray-400">
                    Rp {item.unit_price?.toLocaleString()} / item
                  </p>

                  <p className="text-sm text-gray-500">
                    Stock Tersedia: {item.stock_available}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    Rp {item.line_subtotal?.toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* SUMMARY */}
        <div className="rounded-2xl border border-purple-700 p-6 h-fit">
          <h3 className="text-xl font-semibold mb-6">Ringkasan</h3>

          <div className="space-y-3 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-gray-400">Subtotal</span>
              <span>Rp {subtotal.toLocaleString()}</span>
            </div>

            <div className="border-t border-purple-700 pt-4 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-purple-400">
                Rp {total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* ✅ BUTTON bukan Link */}
          <button
            onClick={handleCheckout}
            disabled={checkoutLoading || items.length === 0}
            className="block w-full rounded-xl bg-purple-700 py-3 text-center font-semibold hover:bg-purple-600 transition disabled:opacity-50"
          >
            {checkoutLoading ? "Memproses Checkout..." : "→ Lanjut Checkout"}
          </button>

          <Link
            href="/customer/product"
            className="mt-3 block w-full rounded-xl bg-white py-3 text-center font-semibold text-black hover:bg-gray-200 transition"
          >
            Lanjut Belanja
          </Link>
        </div>
      </section>
    </main>
  );
}