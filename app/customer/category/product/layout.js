'use client'
import { usePathname } from "next/navigation";

export default function CheckoutLayout({ children }) {
  const pathname = usePathname();

  let step = 1; // DEFAULT = Langkah 1 (Pilih Produk)

  if (pathname.includes("lengkapipembelian")) {
    step = 2;
  }

  if (pathname.includes("payment")) {
    step = 3;
  }

  const steps = [
    "Pilih Produk",
    "Lengkapi Data",
    "Pembayaran",
  ];

  return (
    <main className="min-h-screen bg-black text-white">

      {/* STEPPER */}
      <div className="border-b border-transparent mb-8">
        <div className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-center gap-12">

          {steps.map((label, i) => {
            const active = step === i + 1;
            const done = step > i + 1;

            return (
              <div key={i} className="flex items-center gap-6">

                {/* CIRCLE */}
                <div
                  className={`
                    flex items-center justify-center
                    w-12 h-12 rounded-full
                    text-lg font-bold
                    ${
                      active || done
                        ? "bg-green-500 text-black"
                        : "border-2 border-white text-white"
                    }
                  `}
                >
                  {i + 1}
                </div>

                {/* LABEL */}
                <div className="leading-tight">
                  <div
                    className={`text-sm ${
                      active || done ? "text-green-400" : "text-gray-400"
                    }`}
                  >
                    Langkah {i + 1}
                  </div>

                  <div
                    className={`text-lg font-semibold ${
                      active ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {label}
                  </div>
                </div>

                {/* LINE */}
                {i < steps.length - 1 && (
                  <div
                    className={`mx-6 h-[2px] w-16 ${
                      step > i + 1 ? "bg-green-500" : "bg-white/60"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {children}
    </main>
  );
}
