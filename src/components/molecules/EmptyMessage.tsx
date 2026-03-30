export const EmptyMessage = () => {
    return (
      <div className="rounded-[28px] border border-dashed border-gray-200 bg-white/85 px-6 py-16 text-center shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-md">
        <h2 className="text-xl font-semibold text-gray-900">No products found</h2>
        <p className="mt-2 text-sm text-gray-500">
          Try changing your search text or category filter.
        </p>
      </div>
    );
  };