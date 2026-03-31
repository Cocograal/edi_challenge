// components/Modal.tsx
type ModalProps = {
  message: string;
  onClose: () => void;
};

export default function Modal({ message, onClose }: ModalProps) {
  return (
  <div className="fixed inset-0 bg-[#050816]/70 flex items-center justify-center z-50">
  <div
    className="relative overflow-hidden rounded-[32px] border border-white/15 bg-white/10 backdrop-blur-2xl shadow-[0_10px_50px_rgba(0,0,0,0.45)] p-8 max-w-sm w-full mx-4"
    style={{ fontFamily: "'Nunito', Arial, sans-serif" }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent pointer-events-none" />

    <div className="relative z-10">
      <p className="text-lg leading-relaxed mb-6 break-words font-bold text-white">
        {message}
      </p>

      <button
        onClick={onClose}
        className="w-full rounded-2xl border border-cyan-300/20 bg-gradient-to-r from-cyan-300/20 via-sky-300/20 to-indigo-300/20 backdrop-blur-xl py-3 font-semibold text-white shadow-[0_6px_24px_rgba(103,232,249,0.15)] transition-all duration-300 hover:scale-[1.02] hover:border-cyan-200/40 hover:shadow-[0_10px_30px_rgba(103,232,249,0.25)] active:scale-95"
      >
        OK
      </button>
    </div>
  </div>
</div>
);
}