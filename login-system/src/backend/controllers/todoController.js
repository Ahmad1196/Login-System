import TodoList from '../models/TodoList.js';

export const createTodoList = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Todo list title is required',
      });
    }

    const todoList = await TodoList.create({
      user: req.user._id,
      title: title.trim(),
    });

    return res.status(201).json({
      success: true,
      message: 'Todo list created successfully',
      data: {
        todoList,
      },
    });
  } catch (error) {
    console.error('Create todo list error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getTodoLists = async (req, res) => {
  try {
    const todoLists = await TodoList.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: {
        todoLists,
      },
    });
  } catch (error) {
    console.error('Get todo lists error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getTodoList = async (req, res) => {
  try {
    const { id } = req.params;

    const todoList = await TodoList.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!todoList) {
      return res.status(404).json({
        success: false,
        message: 'Todo list not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        todoList,
      },
    });
  } catch (error) {
    console.error('Get todo list error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const updateTodoList = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, items } = req.body;

    const todoList = await TodoList.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!todoList) {
      return res.status(404).json({
        success: false,
        message: 'Todo list not found',
      });
    }

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Todo list title cannot be empty',
        });
      }

      todoList.title = title.trim();
    }

    if (items !== undefined) {
      todoList.items = items;
    }

    await todoList.save();

    return res.status(200).json({
      success: true,
      message: 'Todo list updated successfully',
      data: {
        todoList,
      },
    });
  } catch (error) {
    console.error('Update todo list error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const deleteTodoList = async (req, res) => {
  try {
    const { id } = req.params;

    const todoList = await TodoList.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!todoList) {
      return res.status(404).json({
        success: false,
        message: 'Todo list not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Todo list deleted successfully',
    });
  } catch (error) {
    console.error('Delete todo list error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};