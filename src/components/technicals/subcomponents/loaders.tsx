export const TopCoinsTableRowPlaceholer = () => (
  <tr className="border-b border-border animate-pulse">
    <td className={`sticky left-0 px-6 py-4`}>
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
    </td>
    <td className="px-4 py-4">
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    </td>
    <td className="px-4 py-4">
      <div className="h-4 bg-gray-700 rounded w-1/4"></div>
    </td>
    <td className="px-4 py-4">
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    </td>
  </tr>
);

export const TrendingCoinsTableRowPlaceholder = () => (
  <tr className="border-b border-border animate-pulse">
    <td className={`sticky left-0 px-6 py-4`}>
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
    </td>
    <td className="px-4 py-4">
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    </td>
    <td className="px-4 py-4 flex justify-start">
      <div className="h-4 bg-gray-700 rounded w-1/4"></div>
    </td>
    <td className="px-4 py-4">
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    </td>
    <td className="px-4 py-4">
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    </td>
    <td className="px-4 py-4">
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    </td>
    <td className="px-4 py-4">
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    </td>
  </tr>
);

export const HeatmapPlaceholder = () => {
  return (
    <div className="w-full h-[400px] bg-gray-700 animate-pulse rounded-lg grid grid-cols-4 grid-rows-4 gap-1 p-1"></div>
  );
};
