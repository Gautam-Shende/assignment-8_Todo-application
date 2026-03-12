import { useState, useMemo } from "react";
import { FiTrash2, FiEdit, FiCheck, FiX } from "react-icons/fi";

const TodoList = ({ todos, onDelete, onToggle, onEdit }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  // Search anf Filter Function 
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const text = `${todo.title} ${todo.description || ""}`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      const matchesStatus = status === "all" ? true : todo.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [todos, search, status]);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (todos.length == 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        No todos yet. Start by adding one.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters  */}
      <div className="flex flex-col lg:flex-row gap-3 mb-6 p-4 bg-white rounded-lg">
        <input
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search todos or descriptions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All Todos</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {filteredTodos.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          {search
            ? "No search results found"
            : status !== "all"
              ? "No todos match this filter"
              : "No todos yet. Add one above!"}
        </p>
      ) : (
        <div className="space-y-3">
          {filteredTodos.map((todo) => (
            <div
              key={todo._id}
              className="p-5 border border-gray-200 rounded-xl hover:shadow-md transition-all bg-white"
            >
              <div
                className={`cursor-pointer mb-2 ${
                  todo.status === "completed"
                    ? "line-through text-gray-500"
                    : "hover:text-blue-600"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">{todo.title}</h3>
                  <div className="text-xs text-gray-500 mt-2">
                    {todo.createdAt && (
                      <p>Created: {formatDate(todo.createdAt)}</p>
                    )}

                    {todo.updatedAt &&
                      new Date(todo.updatedAt).getTime() !==
                        new Date(todo.createdAt).getTime() && (
                        <p>Updated: {formatDate(todo.updatedAt)}</p>
                      )}
                  </div>
                </div>
              </div>

              {todo.description && (
                <p
                  className={`text-sm ${todo.status === "completed" ? "text-gray-300" : "text-gray-800"}`}
                >
                  {todo.description}
                </p>
              )}

              <div className="flex gap-2 mt-4 pt-3 border-t">
                <button
                  onClick={() => onToggle(todo)}
                  className="px-4 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                  {todo.status == "completed" ? (
                    <FiX className="text-gray-600 text-xl cursor-pointer" />
                  ) : (
                    <FiCheck className="text-green-500 text-xl cursor-pointer" />
                  )}
                </button>
                {/* Edit button  */}
                <button
                  onClick={() => onEdit(todo)}
                  className="px-4 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                  <FiEdit className="text-blue-500 text-xl cursor-pointer" />
                </button>
                {/* Delete button  */}
                <button
                  onClick={() => onDelete(todo._id)}
                  className="px-4 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                >
                  <FiTrash2 className="text-red-500 text-xl cursor-pointer" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
