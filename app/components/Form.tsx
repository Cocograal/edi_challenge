"use client";

export type FormFields = {
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
  form: FormFields;
  setForm: React.Dispatch<React.SetStateAction<FormFields>>;
}) {
  const update = (field: keyof FormFields, value: string) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <div className="space-y-3">
      <input
        className="input"
        placeholder="First Name"
        value={form.firstName}
        onChange={(e) => update("firstName", e.target.value)}
        maxLength={12}
      />

      <input
        className="input"
        placeholder="Last Name"
        value={form.lastName}
        onChange={(e) => update("lastName", e.target.value)}
        maxLength={12}
      />
      <input className="input"
        placeholder="Project"
        value={form.project}
        onChange={(e) => update("project", e.target.value)}
        maxLength={40}
      />

      <div className="flex gap-2">
        <input
          type="date"
          className="input w-1/2"
          min="1900-01-01"
          value={form.startDate}
          onChange={(e) => {
            const start = e.target.value;
            setForm(prevForm => {
              const newEndDate = !prevForm.endDate || prevForm.endDate <= start ? start : prevForm.endDate;

              return { ...prevForm, startDate: start, endDate: newEndDate };
            });
          }}
        />

        <input
          id="endDateInput"
          type="date"
          className="input w-1/2"
          min="1900-01-01"
          value={form.endDate}
          onChange={(e) => {
            const end = e.target.value;
            if (form.startDate && end < form.startDate) {
              return;
            }
            update("endDate", end);
          }}
        />
      </div>

      <textarea
        className="input"
        placeholder="Details"
        value={form.details}
        onChange={(e) => update("details", e.target.value)}
        maxLength={100}
      />

      <input className="input"
        placeholder="Image URL"
        value={form.image}
        onChange={(e) => update("image", e.target.value)} />

      <input className="input"
        placeholder="Recipient Wallet"
        value={form.wallet}
        onChange={(e) => update("wallet", e.target.value)} />
    </div>
  );
}