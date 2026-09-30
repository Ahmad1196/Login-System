// import { useState } from "react";
// import {
//   IoCheckmark,
//   IoClose,
//   IoCreateOutline,
//   IoTrashOutline,
// } from "react-icons/io5";
// import { useTheme } from "../contexts/ThemeContext";

// function TodoItem({ item, onToggle, onDelete, onUpdate, isUpdating }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editText, setEditText] = useState(item.text);
//   const [error, setError] = useState("");
//   const { isDark } = useTheme();

//   const itemClass = isDark
//     ? "border-gray-700 bg-gray-800"
//     : "border-gray-200 bg-gray-50";

//   const todoTextClass = isDark ? "text-gray-200" : "text-gray-700";

//   const handleStartEditing = () => {
//     setEditText(item.text);
//     setError("");
//     setIsEditing(true);
//   };

//   const handleCancelEditing = () => {
//     setEditText(item.text);
//     setError("");
//     setIsEditing(false);
//   };

//   const handleUpdate = async () => {
//     const text = editText.trim();

//     if (!text) {
//       setError("Todo text cannot be empty");
//       return;
//     }

//     if (text === item.text) {
//       setIsEditing(false);
//       return;
//     }

//     try {
//       setError("");

//       const success = await onUpdate(item._id, text);

//       if (success) {
//         setIsEditing(false);
//       }
//     } catch (error) {
//       console.error("Failed to update todo:", error);

//       setError("Unable to update todo");
//     }
//   };

//   if (isEditing) {
//     return (
//       <div className="rounded-xl border border-gray-700 bg-gray-800 px-3 py-3">
//         <div className="flex items-center gap-2">
//           <input
//             type="text"
//             value={editText}
//             onChange={(event) => setEditText(event.target.value)}
//             autoFocus
//             disabled={isUpdating}
//             className="min-w-0 flex-1 rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
//           />

//           <button
//             type="button"
//             onClick={handleUpdate}
//             disabled={isUpdating}
//             title="Save"
//             aria-label="Save todo"
//             className="shrink-0 rounded-lg p-2 text-green-400 transition hover:bg-gray-700 hover:text-green-300 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             <IoCheckmark className="text-xl" />
//           </button>

//           <button
//             type="button"
//             onClick={handleCancelEditing}
//             disabled={isUpdating}
//             title="Cancel"
//             aria-label="Cancel editing"
//             className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-gray-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             <IoClose className="text-xl" />
//           </button>
//         </div>

//         {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
//       </div>
//     );
//   }

//   return (
//     <div className="relative flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-800 px-3 py-3">
//       <button
//         type="button"
//         onClick={() => onToggle(item._id)}
//         disabled={isUpdating}
//         aria-label={
//           item.completed ? "Mark todo as incomplete" : "Mark todo as complete"
//         }
//         className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
//           item.completed
//             ? "border-green-500 bg-green-500 text-white"
//             : "border-gray-500 text-transparent hover:border-blue-500"
//         } disabled:cursor-not-allowed disabled:opacity-60`}
//       >
//         {item.completed && <IoCheckmark className="text-sm" />}
//       </button>

//       <p
//         className={`min-w-0 flex-1 break-words text-sm ${
//           item.completed ? "text-gray-500 line-through" : "text-gray-200"
//         }`}
//       >
//         {item.text}
//       </p>

//       {/* NEW BUTTONS LOGIC */}
//       <span className="group relative">
//         <button
//           type="button"
//           onClick={() => setIsEditing(true)}
//           disabled={isUpdating}
//           aria-label="Edit todo"
//           className="rounded-lg p-2 text-blue-400 transition hover:bg-gray-700 hover:text-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           <IoCreateOutline className="text-lg" />
//         </button>

//         <span className="pointer-events-none absolute right-0 top-full z-20 mt-2 whitespace-nowrap rounded-lg bg-gray-700 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
//           Edit todo
//         </span>
//       </span>

//       <span className="group relative">
//         <button
//           type="button"
//           onClick={() => onDelete(item._id)}
//           disabled={isUpdating}
//           aria-label="Delete todo"
//           className="rounded-lg p-2 text-red-400 transition hover:bg-gray-700 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           <IoTrashOutline className="text-lg" />
//         </button>

//         <span className="pointer-events-none absolute right-0 top-full z-20 mt-2 whitespace-nowrap rounded-lg bg-gray-700 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
//           Delete todo
//         </span>
//       </span>
//     </div>
//   );
// }

// export default TodoItem;













import { useState } from "react";
import {
  IoCheckmark,
  IoClose,
  IoCreateOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { useTheme } from "../contexts/ThemeContext";

function TodoItem({ item, onToggle, onDelete, onUpdate, isUpdating }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);
  const [error, setError] = useState("");
  const { isDark } = useTheme();

  const itemClass = isDark
    ? "border-gray-700 bg-gray-800"
    : "border-gray-200 bg-gray-50";

  const todoTextClass = isDark ? "text-gray-200" : "text-gray-700";

  const editInputClass = isDark
    ? "border-gray-600 bg-gray-900 text-white placeholder:text-gray-500"
    : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400";

  const checkboxIdleClass = isDark
    ? "border-gray-500 text-transparent hover:border-blue-500"
    : "border-gray-400 text-transparent hover:border-blue-500";

  const errorClass = isDark ? "text-red-400" : "text-red-600";

  const tooltipClass = isDark
    ? "bg-gray-700 text-white"
    : "bg-gray-900 text-white";

  const saveBtnClass = isDark
    ? "text-green-400 hover:bg-gray-700 hover:text-green-300"
    : "text-green-600 hover:bg-gray-200 hover:text-green-700";

  const cancelBtnClass = isDark
    ? "text-gray-400 hover:bg-gray-700 hover:text-white"
    : "text-gray-500 hover:bg-gray-200 hover:text-gray-900";

  const editBtnClass = isDark
    ? "text-blue-400 hover:bg-gray-700 hover:text-blue-300"
    : "text-blue-600 hover:bg-gray-200 hover:text-blue-700";

  const deleteBtnClass = isDark
    ? "text-red-400 hover:bg-gray-700 hover:text-red-300"
    : "text-red-600 hover:bg-gray-200 hover:text-red-700";

  const handleStartEditing = () => {
    setEditText(item.text);
    setError("");
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setEditText(item.text);
    setError("");
    setIsEditing(false);
  };

  const handleUpdate = async () => {
    const text = editText.trim();

    if (!text) {
      setError("Todo text cannot be empty");
      return;
    }

    if (text === item.text) {
      setIsEditing(false);
      return;
    }

    try {
      setError("");

      const success = await onUpdate(item._id, text);

      if (success) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update todo:", error);

      setError("Unable to update todo");
    }
  };

  if (isEditing) {
    return (
      <div className={`rounded-xl border px-3 py-3 ${itemClass}`}>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={editText}
            onChange={(event) => setEditText(event.target.value)}
            autoFocus
            disabled={isUpdating}
            className={`min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 ${editInputClass}`}
          />

          <button
            type="button"
            onClick={handleUpdate}
            disabled={isUpdating}
            title="Save"
            aria-label="Save todo"
            className={`shrink-0 rounded-lg p-2 transition disabled:cursor-not-allowed disabled:opacity-50 ${saveBtnClass}`}
          >
            <IoCheckmark className="text-xl" />
          </button>

          <button
            type="button"
            onClick={handleCancelEditing}
            disabled={isUpdating}
            title="Cancel"
            aria-label="Cancel editing"
            className={`shrink-0 rounded-lg p-2 transition disabled:cursor-not-allowed disabled:opacity-50 ${cancelBtnClass}`}
          >
            <IoClose className="text-xl" />
          </button>
        </div>

        {error && <p className={`mt-2 text-xs ${errorClass}`}>{error}</p>}
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center gap-2 rounded-xl border px-3 py-3 ${itemClass}`}
    >
      <button
        type="button"
        onClick={() => onToggle(item._id)}
        disabled={isUpdating}
        aria-label={
          item.completed ? "Mark todo as incomplete" : "Mark todo as complete"
        }
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
          item.completed
            ? "border-green-500 bg-green-500 text-white"
            : checkboxIdleClass
        } disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {item.completed && <IoCheckmark className="text-sm" />}
      </button>

      <p
        className={`min-w-0 flex-1 break-words text-sm ${
          item.completed ? "text-gray-500 line-through" : todoTextClass
        }`}
      >
        {item.text}
      </p>

      {/* NEW BUTTONS LOGIC */}
      <span className="group relative">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          disabled={isUpdating}
          aria-label="Edit todo"
          className={`rounded-lg p-2 transition disabled:cursor-not-allowed disabled:opacity-50 ${editBtnClass}`}
        >
          <IoCreateOutline className="text-lg" />
        </button>

        <span
          className={`pointer-events-none absolute right-0 top-full z-20 mt-2 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium opacity-0 shadow-lg transition-opacity group-hover:opacity-100 ${tooltipClass}`}
        >
          Edit todo
        </span>
      </span>

      <span className="group relative">
        <button
          type="button"
          onClick={() => onDelete(item._id)}
          disabled={isUpdating}
          aria-label="Delete todo"
          className={`rounded-lg p-2 transition disabled:cursor-not-allowed disabled:opacity-50 ${deleteBtnClass}`}
        >
          <IoTrashOutline className="text-lg" />
        </button>

        <span
          className={`pointer-events-none absolute right-0 top-full z-20 mt-2 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium opacity-0 shadow-lg transition-opacity group-hover:opacity-100 ${tooltipClass}`}
        >
          Delete todo
        </span>
      </span>
    </div>
  );
}

export default TodoItem;