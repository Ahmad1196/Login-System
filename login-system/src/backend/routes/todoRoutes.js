import express from 'express';

import {
  createTodoList,
  getTodoLists,
  getTodoList,
  updateTodoList,
  deleteTodoList,
} from '../controllers/todoController.js';

import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.post('/', createTodoList);
router.get('/', getTodoLists);
router.get('/:id', getTodoList);
router.patch('/:id', updateTodoList);
router.delete('/:id', deleteTodoList);

export default router;