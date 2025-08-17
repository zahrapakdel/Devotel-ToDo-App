import type { FilterStatus } from "../types/Types";



const FilterByStatus = ({ filterStatus, onSetFilter }: { filterStatus: FilterStatus, onSetFilter: (status: FilterStatus) => void }) => {
  const baseClasses = "px-4 py-2 rounded-md font-semibold transition-colors min-w-32";
  const activeClasses = "bg-blue-600 text-white";
  const inactiveClasses = "bg-gray-200 text-gray-700 hover:bg-gray-300";

  return (
    <div className="flex justify-center space-x-4 mb-6">
      <button
        onClick={() => onSetFilter('all')}
        className={`${baseClasses} ${filterStatus === 'all' ? activeClasses : inactiveClasses}`}
      >
        All
      </button>
      <button
        onClick={() => onSetFilter('active')}
        className={`${baseClasses} ${filterStatus === 'active' ? activeClasses : inactiveClasses}`}
      >
        Active
      </button>
      <button
        onClick={() => onSetFilter('completed')}
        className={`${baseClasses} ${filterStatus === 'completed' ? activeClasses : inactiveClasses}`}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterByStatus;