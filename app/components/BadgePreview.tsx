"use client";
export default function BadgePreview({ data }: any) {
  return (
    <div
      id="badge-border"
      className="w-[420px] h-[420px] p-[10px] rounded-[28px] 
      bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 shadow-2xl"
    >
      <div
        id="badge-preview"
        className="relative w-full h-full rounded-2xl p-6 text-white
                   shadow-inner bg-gradient-to-br from-slate-950 
                   via-blue-950 to-slate-900 grid grid-rows-[88px_1fr_20px_48px] gap-0"
      >
        <img
          src="/tree.png"
          alt="Logo"
          className="absolute inset-0 w-full h-full opacity-10 z-0 scale-100"
        />

        <div className="min-h-[72px]">
          <h2 className="text-3xl font-bold">
            {data.firstName || "First"} {data.lastName || "Last"}
          </h2>
          <p className="text-lg opacity-90 mt-1 break-all line-clamp-2">
            {data.project || "Project Name"}
          </p>
        </div>

        <div className="flex justify-center items-center">
          <img
            src={
              data.image
                ? `/api/image-proxy?url=${encodeURIComponent(data.image)}`
                : "/tree_with_border.png"
            }
            className="w-32 h-32 rounded-full object-cover border z-10"
          />
        </div>

        <div className="flex text-xs font-bold justify-end opacity-80 h-[20px] items-center">
          {data.startDate || "Start"} → {data.endDate || "End"}
        </div>

        <div className="h-[48px] overflow-hidden">
          <p className="text-xs w-2/3 line-clamp-3">
            {data.details || "Project details will appear here..."}
          </p>
        </div>
      </div>
    </div>
  );
}