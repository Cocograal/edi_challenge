// components/Modal.tsx
type ModalProps = {
  message: string;
  onClose: () => void;
};

export default function Modal({ message, onClose }: ModalProps) {
  return (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div
      className="bg-white/90 text-[#1E293B] backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-sm w-full mx-4"
      style={{ fontFamily: "'Nunito', Arial, sans-serif" }}
    >
      <p className="text-lg leading-relaxed mb-6 break-words font-bold">
        {message}
      </p>
      <button
        onClick={onClose}
        className="w-full bg-[#1E293B] hover:bg-[#374151] active:scale-95 transition-all duration-200 py-3 rounded-2xl font-semibold text-white"
      >
        OK
      </button>
    </div>
  </div>
);
}