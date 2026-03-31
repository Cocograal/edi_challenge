"use client";

import { useState } from "react";
import Form, { FormFields } from "../components/Form";

import BadgePreview from "../components/BadgePreview";
import Modal from "../components/Modal";


export default function Home() {
  const [modal, setModal] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isValidWalletAddress = (address: string) =>
    /^0x[a-fA-F0-9]{40}$/.test(address);

  const defaultForm = {
    firstName: "",
    lastName: "",
    project: "",
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
    details: "",
    image: "",
    wallet: "",
  };

  const [form, setForm] = useState<FormFields>(defaultForm);

  async function handleMint() {
    setLoading(true);
    try {
      const node = document.getElementById("badge-border");
      const hasEmpty = Object.values(form).some(
        (value) => value === "" || value === null || value === undefined);

      if (hasEmpty) {
        setModal("Missing fields");
        return;
      }

      const imageCheckRes = await fetch(`/api/image-proxy?url=${encodeURIComponent(form.image)}`);
      if (!imageCheckRes.ok) {
        setModal("Invalid image URL — please check the link and try again.");
        return;
      }

      if (!isValidWalletAddress(form.wallet)) {
        setModal("Invalid wallet address.");
        return;
      }

      if (!node) return;
      const { toPng } = await import("html-to-image");
      const image = await toPng(node, { skipFonts: true });

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.project,
          description: form.details,
          image, // data URL
        }),
      });

      const data_upload = await uploadRes.json();
      if (data_upload.success) {
        // setModal(`Uploaded to Pinata\nimg_url: ${data_upload.imageUrl}`)
      } else {
        setModal(`Upload to Pinata failed`)
        return;
      }

      const res = await fetch("/api/mint", {
        method: "POST",
        body: JSON.stringify({
          form,
          imageUrl: data_upload.imageUrl,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setModal(`Minted! Tx: ${data.txHash}`);
        setForm({ ...defaultForm });
      } else {
        setModal("Mint failed");
        // setModal(data.error);
      }
    } finally {
      setLoading(false)
    }

  }

  return (
    <main className="min-h-screen p-10 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.35),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(173,216,255,0.25),_transparent_20%),linear-gradient(135deg,#cfe9ff_0%,#7ba7ff_40%,#4c63d2_100%)] relative overflow-hidden">      {modal && <Modal message={modal} onClose={() => setModal(null)} />}

      <h1 className="text-5xl font-bold text-white text-center mb-10 drop-shadow-[0_2px_10px_rgba(255,255,255,0.35)]">
        NFT Badge Generator
      </h1>      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold text-white/90 mb-6 tracking-wide">
            Badge Specs
          </h2>
          <div className="w-full max-w-2xl rounded-[32px] border border-white/30 bg-white/10 backdrop-blur-2xl shadow-[0_8px_40px_rgba(31,38,135,0.25)] p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <Form form={form} setForm={setForm} />
            </div>
          </div>
          <button
            onClick={handleMint}
            disabled={loading}
            className="mt-6 px-8 py-3 rounded-[20px] border border-cyan-200/40 bg-gradient-to-r from-sky-300/70 via-cyan-200/60 to-blue-300/70 backdrop-blur-xl text-slate-800 font-bold tracking-wide shadow-[0_8px_30px_rgba(120,180,255,0.45)] hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(120,180,255,0.55)] active:scale-95 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Minting...
              </span>
            ) : (
              "Mint Badge"
            )}
          </button>
        </div>

        <div className="w-full max-w-xl mx-auto">
          {/* Header outside the glass panel */}
          <h2 className="text-3xl font-semibold text-white/90 mb-6 text-center tracking-wide">
            Badge Preview
          </h2>

          {/* Glass panel wrapping only the badge */}
          <div className="w-full rounded-[32px] border border-white/30 bg-white/10 backdrop-blur-2xl shadow-[0_8px_40px_rgba(31,38,135,0.25)] p-8 relative overflow-hidden flex justify-center items-center min-h-[540px]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <BadgePreview data={form} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
