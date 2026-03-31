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
    // <main className="min-h-screen p-10 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.35),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(173,216,255,0.25),_transparent_20%),linear-gradient(135deg,#cfe9ff_0%,#7ba7ff_40%,#4c63d2_100%)] relative overflow-hidden">      
    <main className="min-h-screen p-10 bg-[radial-gradient(circle_at_top_left,_#0d0d2b,_transparent_40%),radial-gradient(circle_at_bottom_right,_#1a1a40,_transparent_35%),linear-gradient(135deg,#0f0c29_0%,#302b63_70%,#24243e_100%)] relative overflow-hidden">
      {modal && <Modal message={modal} onClose={() => setModal(null)} />}
      {/* Orbit lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[1400px] h-[1400px] border border-white/15 rounded-full top-[-500px] left-[-500px] animate-[spin_90s_linear_infinite]" />
        <div className="absolute w-[1100px] h-[1100px] border border-cyan-300/15 rounded-full top-[-200px] right-[-350px] animate-[spin_70s_linear_infinite_reverse]" />
        <div className="absolute w-[900px] h-[900px] border border-indigo-300/15 rounded-full bottom-[-300px] left-[-200px] animate-[spin-reverse_70s_linear_infinite]" />
        <div className="absolute w-[700px] h-[700px] border border-white/10 rounded-full bottom-[-150px] right-[10%] animate-[spin_60s_linear_infinite_reverse]" />
        {/* Elliptical orbit rings */}
        <div className="absolute w-[1200px] h-[500px] border border-white/15 rounded-full rotate-[-18deg] top-[5%] left-[-15%] animate-[spin_100s_linear_infinite]" />
        <div className="absolute w-[1000px] h-[400px] border border-cyan-200/15 rounded-full rotate-[22deg] top-[30%] right-[-1%] animate-[spin_85s_linear_infinite_reverse]" />
        <div className="absolute w-[900px] h-[350px] border border-indigo-200/15 rounded-full rotate-[12deg] bottom-[10%] left-[15%] animate-[spin_75s_linear_infinite]" />

        {/* Triangles */}
        <div
          className="absolute w-[500px] h-[500px] top-[45%] right-[15%] animate-[spin_100s_linear_infinite]"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            background: "rgba(255,255,255,0.02)",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] top-[20%] right-[40%] animate-[spin_100s_linear_infinite]"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            background: "rgba(255,255,255,0.02)",
          }}
        /><div
          className="absolute w-[500px] h-[500px] top-[30%] right-[80%] animate-[spin_100s_linear_infinite]"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            background: "rgba(255,255,255,0.02)",
          }}
        />
      </div>
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
          <div className="w-[560px] h-[560px] rounded-[32px] border border-white/30 bg-white/10 backdrop-blur-2xl shadow-[0_8px_40px_rgba(31,38,135,0.25)] p-8 relative overflow-hidden flex justify-center items-center">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent pointer-events-none" />
            <div className="relative z-10 scale-120">
              <BadgePreview data={form} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
