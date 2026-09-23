const API_URL = 'http://localhost:3000/api';

export const getTodoLists = async () => {
  const response = await fetch(
    `${API_URL}/todos`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );

  const data = await response.json();

  return {
    ok: response.ok,
    ...data,
  };
};

export const createTodoList = async (todoListData) => {
  const response = await fetch(
    `${API_URL}/todos`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(todoListData),
    }
  );

  const data = await response.json();

  return {
    ok: response.ok,
    ...data,
  };
};

export const getTodoList = async (id) => {
  const response = await fetch(
    `${API_URL}/todos/${id}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );

  const data = await response.json();

  return {
    ok: response.ok,
    ...data,
  };
};

export const updateTodoList = async (id, todoListData) => {
  const response = await fetch(
    `${API_URL}/todos/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(todoListData),
    }
  );

  const data = await response.json();

  return {
    ok: response.ok,
    ...data,
  };
};

export const deleteTodoList = async (id) => {
  const response = await fetch(
    `${API_URL}/todos/${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  );

  const data = await response.json();

  return {
    ok: response.ok,
    ...data,
  };
};