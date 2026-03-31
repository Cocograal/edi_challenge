"use client";
export default function BadgePreview({ data }: any) {
  return (
    <div
      id="badge-border"
      className="w-[420px] h-[420px] p-[10px] rounded-[28px] 
      bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400"
      >
      <div
        id="badge-preview"
        className="relative w-full h-full rounded-2xl p-6 text-[#1E293B]
             shadow-inner grid grid-rows-[88px_1fr_20px_48px] gap-0
             bg-cover bg-center bg-no-repeat font-sans"
        style={{
          backgroundImage: `url('/clouds.png')`,
          backdropFilter: 'blur(10px)',
          backgroundBlendMode: 'overlay',
        }}
      >
        <img
          src="/tree.png"
          alt="Logo"
          className="absolute inset-0 w-full h-full opacity-30 -z-1 scale-100"
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

        <div className="flex text-xs font-bold justify-end h-[20px] items-center">
          {data.startDate
            ? new Date(data.startDate).toLocaleDateString('de-CH')
            : "Start"}
          {" → "}
          {data.endDate
            ? new Date(data.endDate).toLocaleDateString('de-CH')
            : "End"}
        </div>

        <div className="h-[70px] overflow-hidden">
          <p className=" w-5/6 font-bold  text-lg">
            {data.details || "Project details will appear here..."}
          </p>
        </div>
      </div>
    </div>
  );
}