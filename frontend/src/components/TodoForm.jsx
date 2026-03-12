import { useState, useEffect } from "react";
import { FiEdit, FiPlus, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

const TodoForm = ({ onSave, editingTodo, onCancel }) => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title || "",
        description: editingTodo.description || "",
      });
    } else {
      setFormData({ title: "", description: "" });
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError("Title is required");
      toast.error(error);
      return;
    }
    onSave({
      ...editingTodo,
      title: formData.title.trim(),
      description: formData.description,
    });
    setFormData({ title: "", description: "" });

    if (oncancel) {
      oncancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      {/* Todo title input */}
      <div>
        <input
          className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="What do you need to do?"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      {/*  description */}
      <div>
        <textarea
          className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical h-20"
          placeholder="Any details about this todo (optional)..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      {/* Add/Update/cancle buttons */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <button
          type="submit"
          className="flex flex-1 items-center justify-center gap-2 py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {editingTodo ? (
            <>
              <FiEdit className="text-lg" />
              Update Todo
            </>
          ) : (
            <>
              <FiPlus className="text-lg" />
              Add Todo
            </>
          )}
        </button>

        {/* Cancel button only shows when editing */}
        {editingTodo && (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center justify-center gap-2 py-2 px-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <FiX className="text-lg" />
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
