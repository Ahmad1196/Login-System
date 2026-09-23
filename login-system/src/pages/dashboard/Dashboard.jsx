import { useCallback, useEffect, useState } from "react";
import TodoListCard from "../../components/TodoListCard";
import {
  createTodoList,
  deleteTodoList,
  getTodoLists,
  updateTodoList,
} from "../../services/todoService";

function Dashboard() {
  const [todoLists, setTodoLists] = useState([]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

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
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Todo Lists
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Create and manage your todo lists.
        </p>
      </div>

      <div className="mb-8 rounded-2xl border border-gray-700 bg-gray-900 p-5 shadow-lg sm:p-6">
        <h2 className="text-lg font-semibold text-white">Create a new list</h2>

        <form
          onSubmit={handleCreateTodoList}
          className="mt-4 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Work Tasks"
            className="min-w-0 flex-1 rounded-xl border border-gray-600 bg-gray-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
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
        <div className="rounded-2xl border border-gray-700 bg-gray-900 p-6">
          <p className="text-sm text-gray-400">Loading your todo lists...</p>
        </div>
      ) : todoLists.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-600 bg-gray-900 p-8 text-center">
          <h2 className="text-lg font-semibold text-white">
            No todo lists yet
          </h2>

          <p className="mt-2 text-sm text-gray-500">
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
