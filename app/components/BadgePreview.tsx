"use client";

export default function BadgePreview({ data }: any) {
  return (
    <div
      id="badge-preview"
      className="w-[400px] h-[400px] rounded-2xl p-6 text-white shadow-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col justify-between"
    >
      <div>
        <h2 className="text-xl font-bold">
          {data.firstName || "First"} {data.lastName || "Last"}
        </h2>

        <p className="text-sm opacity-90 mt-1">
          {data.project || "Project Name"}
        </p>
      </div>

      <div className="text-xs opacity-80">
        {data.startDate || "Start"} → {data.endDate || "End"}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs w-2/3">
          {data.details || "Project details will appear here..."}
        </p>

        {data.image && (
          <img
            // src={data.image}
            src={`/api/image-proxy?url=${encodeURIComponent(data.image)}`}
            className="w-14 h-14 rounded-full object-cover border"
          />
        )}
      </div>
    </div>
  );
}