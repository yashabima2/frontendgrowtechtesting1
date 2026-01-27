import Image from "next/image";
import Link from "next/link";

export default function StepTwo() {
  const variants = Array.from({ length: 6 });

  return (
    <section className="max-w-6xl mx-auto px-8 py-10 text-white">

      {/* PRODUCT HEADER */}
      <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

        {/* IMAGE */}
        <div className="rounded-xl overflow-hidden border border-purple-700">
          <Image
            src="/product/redfinger.png"
            width={600}
            height={360}
            alt="Red Finger"
            className="w-full h-[260px] object-cover"
            priority
          />
        </div>

        {/* INFO */}
        <div>
          <span className="inline-block mb-2 text-xs font-medium text-purple-400 uppercase tracking-wide">
            Cloud Phone
          </span>

          <h1 className="text-2xl font-bold text-purple-300 mb-3">
            Red Finger
          </h1>

          <p className="text-sm text-gray-300 leading-relaxed">
            Redfinger adalah layanan ponsel Android virtual berbasis cloud yang
            memungkinkan Anda menjalankan aplikasi dan game Android di perangkat lain
            (PC, iPhone, Android) tanpa mengunduh file berat, serta mendukung aktivitas
            game 24/7 dan tugas AFK (Away From Keyboard).
          </p>
        </div>
      </div>


      {/* VARIANT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {variants.map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-purple-700 bg-black overflow-hidden"
          >
            {/* VARIANT IMAGE */}
            <div className="h-[160px] bg-white">
              <Image
                src="/product/redfinger.png"
                width={300}
                height={200}
                alt="Variant"
                className="w-full h-full object-cover"
              />
            </div>

            {/* VARIANT INFO */}
            <div className="p-4">
              <h3 className="font-semibold mb-1">
                VIP 7D Android 15/12/10
              </h3>

              <p className="text-xs text-gray-400 mb-1">
                Stok Tersedia 1487
              </p>

              {/* RATING */}
              <div className="flex items-center text-yellow-400 text-sm mb-2">
                ★★★★★
                <span className="ml-1 text-yellow-400">(247)</span>
              </div>

              {/* PRICE + BADGE */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-white">
                  Rp 19.000
                </span>
                <span className="text-xs px-2 py-1 rounded bg-purple-800 text-purple-200">
                  Otomatis
                </span>
              </div>

              {/* ACTION */}
              <div className="flex gap-2">
                <Link
                  href="/customer/category/product/detail/"
                  className="flex-1 text-center rounded-lg bg-purple-600 py-2 text-sm font-semibold hover:bg-purple-700"
                >
                  Beli Sekarang
                </Link>

                <Link
                  href="/customer/category/product/detail/cart"
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-purple-600 hover:bg-purple-600/20"
                  title="Masukkan ke Keranjang"
                >
                  🛒
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
