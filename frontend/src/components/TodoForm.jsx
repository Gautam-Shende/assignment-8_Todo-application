import { useState, useEffect } from "react"
import { FiEdit, FiPlus, FiX } from "react-icons/fi"
import toast from "react-hot-toast"

const TodoForm = ({ onSave, editTodo, onCancel }) => {
  // const [formData, setFormData] = useState();
  const [formData, setFormData] = useState({ title: "", description: "" })
  const [error, setError] = useState("")

  useEffect(() => {
    if (editTodo) {
      setFormData({
        title: editTodo.title || "",
        description: editTodo.description || "",
      });
    } else {
      setFormData({ title: "", description: "" });
    }
  }, [editTodo]);

  const handleSubmit = (e) => {
    e.preventDefault()
    // if (!formData.title) {
    if (!formData.title.trim()) {
      setError("Title is required")
      toast.error(error);
      // console.log(error)
      return;
    }

    onSave({
      ...editTodo,
      // title: formData.title,
      title: formData.title.trim(),
      description: formData.description,
    });
    setFormData({ title: "", description: "" })

    if (oncancel) {
      // return oncancel();
      oncancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <div>
        <input
          className="w-full bg-white px-4 py-2 border-none shadow-md shadow-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="What do you need to do?"
          value={formData.title}
          // onChange={() => setFormData({  ...formData, title: input.value.trim() })}
          onChange={(e) => setFormData({  ...formData, title: e.target.value })}
        />
      </div>

      <div>
        <textarea
          className="w-full bg-white px-4 py-2 border-none shadow-md shadow-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 "
          placeholder="Any details about this todo..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      <div className="flex items-center justify-center gap-2 pt-2">
        <button
          type="submit"
          className="flex flex-1 items-center justify-center gap-2 py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {editTodo ? (
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

        {editTodo && (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center justify-center gap-2 py-2 px-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 "
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
