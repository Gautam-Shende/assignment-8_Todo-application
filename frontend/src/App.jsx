import { useState, useEffect } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./services/todoService"
import toast from "react-hot-toast"
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"

function App() {
  // const [todos, setTodos] = useState("")
  const [todos, setTodoItems] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadTodo = async () => {
    try {
      setLoading(true);
      // const data = getTodos();
      const data = await getTodos();
      setTodoItems(data);
    } catch (error) {
      toast.error(error.message || "Todo Loading Fail....");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    loadTodo();
  }, []);

  const handleSave = async (todoData) => {
    try {
      if (todoData._id) {
        // const update = await updateTodo(todoData)
        const updated = await updateTodo(todoData._id, todoData);
        setTodoItems((prev) =>
          prev.map((item) => (item._id === updated._id ? updated : item)),
        );
        // console.log(updateTodo)
        toast.success("Todo Updated successfully");
      } else {
        const created = await createTodo(todoData);
        setTodoItems((prev) => [created, ...prev]);
        // console.log(created)
        toast.success("Todo created successfully");
      }
      setEditTodo(null);
    } catch (error) {
      // console.log(error.message )
      toast.error(error.message || "Todo Not created...");
    }
  };

  const handleDelete = (id) => {
    toast((t) => (
      <div className="p-3 bg-white text-black">
        <p>Delete this todo?</p>

        <button className="bg-slate-200 px-3 py-1 m-2 rounded-lg " onClick={() => toast.dismiss(t.id)}>Cancel</button>

        <button className="bg-red-400 px-3 py-1 m-2 rounded-lg "
          onClick={async () => {
            try {
              await deleteTodo(id)
              // toast.clear(id)
              toast.dismiss(t.id)
              setTodoItems((prev) => prev.filter((item) => item._id !== id));

              toast.success("Todo deleted");
            } catch {
              // console.log(error)
              toast.error("Delete failed");
            }
          }}
        >
          Delete
        </button>
      </div>
    ));
  };

  const handleToggle = async (todo) => {
    try {
      // const updated = await updateTodo(todo._id, {
      //   status: todo.status === "completed" ,
      // });
      const updated = await updateTodo(todo._id, {
        status: todo.status === "pending" ? "completed" : "pending",
      });

      setTodoItems((prev) =>
        prev.map((item) => (item._id === updated._id ? updated : item)),
      );
      if (todo.status == "pending") {
        toast.success("Todo Status completed....")
      } else {
        toast.error("Todo Status Pending....")
      }
    } catch {
      // console.log(error) 
      toast.error(err.message || "Failed update status...")
    }
  };

  const handleEdit = (todo) => {
    setEditTodo(todo);
  };

  const handleCancelEdit = () => {
    setEditTodo(null);
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-slate-200 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Todo App
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <TodoForm
              onSave={handleSave}
              editingTodo={editTodo}
              onCancel={handleCancelEdit}
            />
          </div>

          {loading ? (
            <div className="text-center py-4 max-h-max">
              <span className="animate-pulse text-gray-600">
                Fetching todos...
              </span>
            </div>
          ) : (
            <div className="w-full lg:w-1/2">
              <TodoList
                todos={todos}
                onDelete={handleDelete}
                onToggle={handleToggle}
                onEdit={handleEdit}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
