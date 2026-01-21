const StatusLegend = () => {
  const statuses = [
    { label: "Pending", colorClass: "bg-gray-400" },
    { label: "In Progress", colorClass: "bg-blue-500" },
    { label: "Delivered", colorClass: "bg-green-500" },
    { label: "Issue", colorClass: "bg-red-500" },
    { label: "Slot Issue", colorClass: "bg-yellow-400" },
  ];

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-200 flex-wrap">
      <span className="text-sm font-medium text-gray-700">Status:</span>

      {statuses.map((status) => (
        <div key={status.label} className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${status.colorClass}`}
          />
          <span className="text-xs text-gray-500">{status.label}</span>
        </div>
      ))}
    </div>
  );
};

export default StatusLegend;
