import mongoose from 'mongoose';

const todoItemSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Todo text is required'],
      trim: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: true,
  }
);

const todoListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
      index: true,
    },

    title: {
      type: String,
      required: [true, 'Todo list title is required'],
      trim: true,
      minlength: [1, 'Todo list title is required'],
      maxlength: [100, 'Todo list title cannot exceed 100 characters'],
    },

    items: {
      type: [todoItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: 'TodoLists',
  }
);

const TodoList = mongoose.model('TodoList', todoListSchema);

export default TodoList;