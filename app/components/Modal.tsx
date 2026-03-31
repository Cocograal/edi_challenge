// components/Modal.tsx
type ModalProps = {
  message: string;
  onClose: () => void;
};

export default function Modal({ message, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-zinc-800 text-white rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4">
        <p className="text-lg mb-6 break-all">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-zinc-600 hover:bg-zinc-500 active:scale-95 transition-all duration-200 py-2 rounded-xl font-semibold"
        >
          OK
        </button>
      </div>
    </div>
  );
}