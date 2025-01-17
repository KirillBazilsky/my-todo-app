export const styles = {
  taskList: "space-y-4 max-w-2xl min-w-96 shadow-lg p-4 rounded-lg",
  taskItem: "flex items-center justify-between border-b pb-2 gap-8",
  taskTitle: "line-through text-gray-500 px-2 w-full",
  taskInProgress: "bg-green-300 text-black px-2 w-full rounded",
  taskPaused: "bg-gray-300 text-black px-2 w-full rounded",
  buttonWrapper: "space-x-2 flex-wrapper",
  buttonBase: "px-3 py-1 text-sm rounded text-white",
  buttonComplete: "bg-green-500 hover:bg-green-600",
  buttonUndo: "bg-yellow-500 hover:bg-yellow-600",
  deleteButton: "bg-red-500 hover:bg-red-600 h-8",
  statusDropdown:
    "bg-white border border-gray-300 text-gray-700 px py rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-8 italic",
};
