"use client";

type FormData = {
  firstName: string;
  lastName: string;
  project: string;
  startDate: string;
  endDate: string;
  details: string;
  image: string;
  wallet: string;
};

export default function Form({
  form,
  setForm,
}: {
  form: FormData;
  setForm: (data: FormData) => void;
}) {
  const update = (field: keyof FormData, value: string) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <div className="space-y-3">
      <input className="input" placeholder="First Name" onChange={(e) => update("firstName", e.target.value)} />
      <input className="input" placeholder="Last Name" onChange={(e) => update("lastName", e.target.value)} />
      <input className="input" placeholder="Project" onChange={(e) => update("project", e.target.value)} />

      <div className="flex gap-2">
        <input type="date" className="input w-1/2" onChange={(e) => update("startDate", e.target.value)} />
        <input type="date" className="input w-1/2" onChange={(e) => update("endDate", e.target.value)} />
      </div>

      <textarea className="input" placeholder="Details" onChange={(e) => update("details", e.target.value)} />

      <input className="input" placeholder="Image URL" onChange={(e) => update("image", e.target.value)} />

      <input className="input" placeholder="Recipient Wallet" onChange={(e) => update("wallet", e.target.value)} />
    </div>
  );
}