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
    </main>
  );
}