import { useCallback, useEffect, useState } from "react";
import TodoListCard from "../../components/TodoListCard";
import {
  createTodoList,
  deleteTodoList,
  getTodoLists,
  updateTodoList,
} from "../../services/todoService";
import { useTheme } from "../../contexts/ThemeContext";

function Dashboard() {
  const [todoLists, setTodoLists] = useState([]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const { isDark } = useTheme();

  const fetchTodoLists = useCallback(async () => {
    try {
      setError("");

      const response = await getTodoLists();

      if (!response.ok) {
        setError(response.message || "Failed to load todo lists");
        return;
      }

      setTodoLists(response.data.todoLists);
    } catch (error) {
      console.error("Failed to fetch todo lists:", error);

      setError("Unable to load todo lists");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodoLists();
  }, [fetchTodoLists]);

  const handleCreateTodoList = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a todo list title");
      return;
    }

    try {
      setIsCreating(true);
      setError("");

      const response = await createTodoList({
        title: title.trim(),
      });

      if (!response.ok) {
        setError(response.message || "Failed to create todo list");
        return;
      }

      setTodoLists((currentLists) => [response.data.todoList, ...currentLists]);

      setTitle("");
    } catch (error) {
      console.error("Failed to create todo list:", error);

      setError("Unable to create todo list");
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateTodoList = async (id, updates) => {
    try {
      const response = await updateTodoList(id, updates);

      if (!response.ok) {
        setError(response.message || "Failed to update todo list");

        return false;
      }

      setTodoLists((currentLists) =>
        currentLists.map((todoList) =>
          todoList._id === id ? response.data.todoList : todoList,
        ),
      );

      return true;
    } catch (error) {
      console.error("Failed to update todo list:", error);

      setError("Unable to update todo list");

      return false;
    }
  };

  const handleDeleteTodoList = async (id) => {
    try {
      const response = await deleteTodoList(id);

      if (!response.ok) {
        setError(response.message || "Failed to delete todo list");

        return false;
      }

      setTodoLists((currentLists) =>
        currentLists.filter((todoList) => todoList._id !== id),
      );

      return true;
    } catch (error) {
      console.error("Failed to delete todo list:", error);

      setError("Unable to delete todo list");

      return false;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className={`text-2xl font-bold sm:text-3xl ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
          Todo Lists
        </h1>

        <p className={`mt-2 text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
          Create and manage your todo lists.
        </p>
      </div>

      <div className={`mb-8 rounded-2xl border shadow-lg p-5 sm:p-6 ${isDark ? 'border-gray-600 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Create a new list</h2>

        <form
          onSubmit={handleCreateTodoList}
          className="mt-4 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Work Tasks"
            className={`min-w-0 flex-1 rounded-xl border px-4 py-3 text-sm outline-none transition ${isDark ? 'border-gray-600 bg-gray-900 placeholder:text-gray-500' : 'border-gray-300 bg-white placeholder:text-gray-400'}  focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10`}
          />

          <button
            type="submit"
            disabled={isCreating}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCreating ? "Creating..." : "Create List"}
          </button>
        </form>

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      </div>

      {isLoading ? (
        <div className={`rounded-2xl border p-6 ${isDark ? 'border-gray-600 bg-gray-900' : 'border-gray-300 bg-white'}`}>
          <p className="text-sm text-gray-400">Loading your todo lists...</p>
        </div>
      ) : todoLists.length === 0 ? (
        <div className={`rounded-2xl border border-dashed p-8 text-center ${isDark ? 'border-gray-600 bg-gray-900' : 'border-gray-300 bg-white'}`}>
          <h2 className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
            No todo lists yet
          </h2>

          <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Create your first todo list to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {todoLists.map((todoList) => (
            <TodoListCard
              key={todoList._id}
              todoList={todoList}
              onUpdate={handleUpdateTodoList}
              onDelete={handleDeleteTodoList}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
