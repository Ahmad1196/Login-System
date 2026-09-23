import { useState } from "react";
import {
  IoCheckmark,
  IoClose,
  IoCreateOutline,
  IoTrashOutline,
} from "react-icons/io5";

import { BsFillPlusCircleFill } from "react-icons/bs";
import { LuPlus } from "react-icons/lu";
import ConfirmModal from "./ConfirmModal";
import TodoItem from "./TodoItem";

function TodoListCard({ todoList, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todoList.title);
  const [newTodo, setNewTodo] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTodoId, setDeleteTodoId] = useState(null);
  const [showDeleteListModal, setShowDeleteListModal] = useState(false);

  const [error, setError] = useState("");

  const handleStartEditing = () => {
    setEditTitle(todoList.title);
    setError("");
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setEditTitle(todoList.title);
    setError("");
    setIsEditing(false);
  };

  const handleUpdate = async () => {
    if (!editTitle.trim()) {
      setError("List title cannot be empty");
      return;
    }

    if (editTitle.trim() === todoList.title) {
      setIsEditing(false);
      return;
    }

    try {
      setIsUpdating(true);
      setError("");

      const success = await onUpdate(todoList._id, {
        title: editTitle.trim(),
      });

      if (success) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update todo list:", error);

      setError("Unable to update todo list");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError("");

      const success = await onDelete(todoList._id);

      if (success) {
        setShowDeleteListModal(false);
      }
    } catch (error) {
      console.error("Failed to delete todo list:", error);

      setError("Unable to delete todo list");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddTodo = async (event) => {
    event.preventDefault();

    const text = newTodo.trim();

    if (!text) {
      setError("Todo text cannot be empty");
      return;
    }

    const updatedItems = [
      ...todoList.items,
      {
        text,
        completed: false,
      },
    ];

    try {
      setIsUpdating(true);
      setError("");

      const success = await onUpdate(todoList._id, {
        items: updatedItems,
      });

      if (success) {
        setNewTodo("");
      }
    } catch (error) {
      console.error("Failed to add todo:", error);

      setError("Unable to add todo");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleTodo = async (itemId) => {
    const updatedItems = todoList.items.map((item) =>
      item._id === itemId
        ? {
            ...item,
            completed: !item.completed,
          }
        : item,
    );

    try {
      setIsUpdating(true);
      setError("");

      await onUpdate(todoList._id, {
        items: updatedItems,
      });
    } catch (error) {
      console.error("Failed to toggle todo:", error);

      setError("Unable to update todo");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateTodo = async (itemId, text) => {
    const updatedItems = todoList.items.map((item) =>
      item._id === itemId
        ? {
            ...item,
            text,
          }
        : item,
    );

    try {
      setIsUpdating(true);
      setError("");

      return await onUpdate(todoList._id, {
        items: updatedItems,
      });
    } catch (error) {
      console.error("Failed to update todo:", error);

      setError("Unable to update todo");

      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteTodo = async (itemId) => {
    const updatedItems = todoList.items.filter((item) => item._id !== itemId);

    try {
      setIsUpdating(true);
      setError("");

      const success = await onUpdate(todoList._id, {
        items: updatedItems,
      });

      if (success) {
        setDeleteTodoId(null);
      }
    } catch (error) {
      console.error("Failed to delete todo:", error);

      setError("Unable to delete todo");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-700 bg-gray-900 p-5 shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(event) => setEditTitle(event.target.value)}
              autoFocus
              disabled={isUpdating}
              className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
            />
          ) : (
            <>
              <h2 className="truncate text-lg font-semibold text-white">
                {todoList.title}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {todoList.items.length} item
                {todoList.items.length !== 1 ? "s" : ""}
              </p>
            </>
          )}

          {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleUpdate}
                disabled={isUpdating}
                title="Save"
                aria-label="Save changes"
                className="rounded-lg p-2 text-green-400 transition hover:bg-gray-800 hover:text-green-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <IoCheckmark className="text-xl" />
              </button>

              <button
                type="button"
                onClick={handleCancelEditing}
                disabled={isUpdating}
                title="Cancel"
                aria-label="Cancel editing"
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <IoClose className="text-xl" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleStartEditing}
                title="Edit list"
                aria-label="Edit list"
                className="rounded-lg p-2 text-blue-400 transition hover:bg-gray-800 hover:text-blue-300"
              >
                <IoCreateOutline className="text-xl" />
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                title="Delete list"
                aria-label="Delete list"
                className="rounded-lg p-2 text-red-400 transition hover:bg-gray-800 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <IoTrashOutline className="text-xl" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="my-5 border-t border-gray-700" />

      <div className="space-y-2">
        {todoList.items.length === 0 ? (
          <p className="py-3 text-center text-sm text-gray-500">
            No todos yet.
          </p>
        ) : (
          todoList.items.map((item) => (
            <TodoItem
              key={item._id}
              item={item}
              onToggle={handleToggleTodo}
              onDelete={() => setDeleteTodoId(item._id)}
              onUpdate={handleUpdateTodo}
              isUpdating={isUpdating}
            />
          ))
        )}
      </div>

      <form onSubmit={handleAddTodo} className="mt-4 flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          placeholder="Add a todo..."
          disabled={isUpdating}
          className="min-w-0 flex-1 rounded-xl border border-gray-600 bg-gray-800 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={isUpdating}
          className="rounded-full bg-green-600 px-2 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LuPlus size={25} />
        </button>
      </form>
    </div>
  );
}

export default TodoListCard;
