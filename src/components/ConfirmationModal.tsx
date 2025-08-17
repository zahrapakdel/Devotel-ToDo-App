const ConfirmationModal = ({ onConfirm, onCancel, todoTitle }: { onConfirm: () => void, onCancel: () => void, todoTitle: string }) => {
  return (
    <div className="fixed inset-0 bg-gray-600/20 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-6">Are you sure you want to delete the todo: <span className="font-semibold">"{todoTitle}"</span>?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmationModal;