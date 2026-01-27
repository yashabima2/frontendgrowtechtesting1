'use client'
import Navbar from '../../app/components/Navbar'
import Footer from '../../app/components/Footer'

export default function ContactPage() {
  return (
    <>
    <Navbar />
    <section className="max-w-6xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold text-center mb-4">Hubungi Kami</h1>
      <p className="text-center text-gray-400 mb-16">Kami siap membantu Anda 24/7</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { title: 'WhatsApp', value: '+62811-1111-111', icon: '🟢' },
          { title: 'Email', value: 'support@growtech.id', icon: '📧' },
          { title: 'Discord', value: 'https://discord.gg/growtech', icon: '💬' },
          { title: 'Instagram', value: '@growtech.id', icon: '📸' },
        ].map((c, i) => (
          <div key={i} className="border border-purple-700 rounded-2xl p-8 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
              <p className="text-lg">{c.value}</p>
            </div>
            <span className="text-4xl">{c.icon}</span>
          </div>
        ))}
      </div>
    </section>
    <Footer/>
    </>
  )
}