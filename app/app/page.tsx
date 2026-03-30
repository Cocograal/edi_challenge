"use client";

import { useState } from "react";
import Form from "../components/Form";
import BadgePreview from "../components/BadgePreview";


export default function Home() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    project: "",
    startDate: "",
    endDate: "",
    details: "",
    image: "",
    wallet: "",
  });

  async function handleMint() {
    const node = document.getElementById("badge-preview");

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
      alert(`Uploaded to Pinata\nimg_url: ${data_upload.imageUrl}`)
    } else {
      alert(data_upload.error);
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
      alert(`Minted! Tx: ${data.txHash}`);
    } else {
      alert("Mint failed");
      // alert(data.error);
    }
  }

  return (
    <main className="min-h-screen p-10 bg-blue-200">
      <h1 className="text-3xl font-bold mb-8">NFT Badge Generator</h1>

      <div className="grid grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <Form form={form} setForm={setForm} />
        </div>

        <div className="flex items-center justify-center">
          <BadgePreview data={form} />
        </div>
      </div>
      <button
        onClick={handleMint}
        className="mt-4 bg-black text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-gray-800 hover:shadow-lg active:scale-95 transition-all duration-200"
      >
        Mint Badge
      </button>
    </main>
  );
}
