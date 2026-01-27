import Image from "next/image";
import Link from "next/link";
export default function ProductCard() {
  return (
    <div className="
      border border-purple-400/60
      rounded-2xl
      bg-black
      overflow-hidden
      transition
      duration-300
      hover:-translate-y-1
      hover:shadow-[0_0_30px_rgba(183,148,244,0.35)]
    ">
      {/* IMAGE WRAPPER */}
      <div className="relative w-full h-[220px]">
        <Image
          src="/product/redfinger.png"
          alt="Red Finger"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* INFO */}
      <div className="p-4">
        <h3 className="mb-1 font-semibold text-white">
          Red Finger
        </h3>

        <div className="mb-1 text-sm text-yellow-400">
          ★★★★★ <span className="ml-1 text-yellow-400">(247)</span>
        </div>

        <div className="mb-3 font-semibold text-white">
          Rp 20.000
        </div>

        <Link
          href="/customer/category/product"
          className="
            w-full
            rounded-xl
            bg-[#2B044D]
            py-3
            font-semibold
            text-white
            transition
            hover:bg-[#3a0a6a]
            block
            text-center
          "
        >
          Beli Sekarang
        </Link>
      </div>
    </div>
  );
}
