export default function PopupPengumuman({
  title,
  content,
  image,
  buttonText,
  onClose,
  preview = false,
}) {
  return (
    <div className="w-[520px] rounded-2xl overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between bg-purple-800 px-6 py-4 text-white">
        <div className="font-semibold">📢 {title}</div>
        {!preview && (
          <button onClick={onClose} className="text-white/80 hover:text-white">
            ✕
          </button>
        )}
      </div>

      <div className="bg-white text-black px-8 py-10 text-center space-y-6">
        {image && <img src={image} className="mx-auto max-h-40 object-contain" />}
        <p className="text-gray-700 whitespace-pre-line">{content}</p>

        {buttonText && (
          <button className="bg-blue-600 px-6 py-3 text-white rounded-lg font-semibold">
            {buttonText}
          </button>
        )}
      </div>
    </div>
  )
}
