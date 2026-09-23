import { useState } from 'react';
import {
  IoCheckmark,
  IoClose,
  IoCreateOutline,
  IoTrashOutline,
} from 'react-icons/io5';

function TodoItem({
  item,
  onToggle,
  onDelete,
  onUpdate,
  isUpdating,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(
    item.text
  );
  const [error, setError] = useState('');

  const handleStartEditing = () => {
    setEditText(item.text);
    setError('');
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setEditText(item.text);
    setError('');
    setIsEditing(false);
  };

  const handleUpdate = async () => {
    const text = editText.trim();

    if (!text) {
      setError('Todo text cannot be empty');
      return;
    }

    if (text === item.text) {
      setIsEditing(false);
      return;
    }

    try {
      setError('');

      const success = await onUpdate(
        item._id,
        text
      );

      if (success) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error(
        'Failed to update todo:',
        error
      );

      setError('Unable to update todo');
    }
  };

  if (isEditing) {
    return (
      <div className="rounded-xl border border-gray-700 bg-gray-800 px-3 py-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={editText}
            onChange={(event) =>
              setEditText(event.target.value)
            }
            autoFocus
            disabled={isUpdating}
            className="min-w-0 flex-1 rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
          />

          <button
            type="button"
            onClick={handleUpdate}
            disabled={isUpdating}
            title="Save"
            aria-label="Save todo"
            className="shrink-0 rounded-lg p-2 text-green-400 transition hover:bg-gray-700 hover:text-green-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <IoCheckmark className="text-xl" />
          </button>

          <button
            type="button"
            onClick={handleCancelEditing}
            disabled={isUpdating}
            title="Cancel"
            aria-label="Cancel editing"
            className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-gray-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <IoClose className="text-xl" />
          </button>
        </div>

        {error && (
          <p className="mt-2 text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="relative flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-800 px-3 py-3">
      <button
        type="button"
        onClick={() => onToggle(item._id)}
        disabled={isUpdating}
        aria-label={
          item.completed
            ? 'Mark todo as incomplete'
            : 'Mark todo as complete'
        }
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
          item.completed
            ? 'border-green-500 bg-green-500 text-white'
            : 'border-gray-500 text-transparent hover:border-blue-500'
        } disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {item.completed && (
          <IoCheckmark className="text-sm" />
        )}
      </button>

      <p
        className={`min-w-0 flex-1 break-words text-sm ${
          item.completed
            ? 'text-gray-500 line-through'
            : 'text-gray-200'
        }`}
      >
        {item.text}
      </p>

      <button
        type="button"
        onClick={handleStartEditing}
        disabled={isUpdating}
        aria-label="Edit todo"
        title="Edit todo"
        className="absolute right-10 shrink-0 rounded-lg p-2 text-blue-400 transition hover:bg-gray-700 hover:text-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <IoCreateOutline className="text-lg" />
      </button>

      <button
        type="button"
        onClick={() => onDelete(item._id)}
        disabled={isUpdating}
        aria-label="Delete todo"
        title="Delete todo"
        className="shrink-0 rounded-lg p-2 text-red-400 transition hover:bg-gray-700 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <IoTrashOutline className="text-lg" />
      </button>
    </div>
  );
}

export default TodoItem;