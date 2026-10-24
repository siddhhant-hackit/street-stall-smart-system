"use client";

import { useEffect, useMemo, useState } from 'react';

export type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

const STORAGE_KEY = 'restaurantos-todos';

const seedTodos: TodoItem[] = [
  { id: '1', text: 'Review today\'s reservations', completed: false, createdAt: Date.now() },
  { id: '2', text: 'Prepare staff briefing for lunch rush', completed: true, createdAt: Date.now() - 60000 },
  { id: '3', text: 'Update festive WhatsApp campaign', completed: false, createdAt: Date.now() - 120000 },
];

export default function TodoApp() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as TodoItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
          return;
        }
      } catch (error) {
        console.error('Failed to parse saved todos:', error);
      }
    }
    setItems(seedTodos);
  }, []);

  useEffect(() => {
    if (items.length > 0 || localStorage.getItem(STORAGE_KEY) !== null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  const filteredItems = useMemo(() => {
    switch (filter) {
      case 'active':
        return items.filter((item) => !item.completed);
      case 'completed':
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  }, [filter, items]);

  const addItem = () => {
    const value = input.trim();
    if (!value) return;

    const newItem: TodoItem = {
      id: crypto.randomUUID(),
      text: value,
      completed: false,
      createdAt: Date.now(),
    };

    setItems((current) => [newItem, ...current]);
    setInput('');
  };

  const toggleItem = (id: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const clearCompleted = () => {
    setItems((current) => current.filter((item) => !item.completed));
  };

  const remainingCount = items.filter((item) => !item.completed).length;

  return (
    <div className="todo-page">
      <div className="todo-shell">
        <div className="todo-header">
          <div>
            <span className="eyebrow">Daily workflow</span>
            <h1>To-do list</h1>
          </div>
          <div className="todo-count">{remainingCount} remaining</div>
        </div>

        <div className="todo-input-row">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') addItem();
            }}
            placeholder="Add a task..."
            aria-label="Add a task"
          />
          <button className="primary-btn" onClick={addItem}>Add</button>
        </div>

        <div className="todo-filter-row">
          {(['all', 'active', 'completed'] as const).map((value) => (
            <button
              key={value}
              className={filter === value ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter(value)}
            >
              {value}
            </button>
          ))}
        </div>

        <div className="todo-list">
          {filteredItems.length === 0 ? (
            <div className="todo-empty">No tasks in this view.</div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className={item.completed ? 'todo-item completed' : 'todo-item'}>
                <button
                  className={item.completed ? 'todo-check checked' : 'todo-check'}
                  onClick={() => toggleItem(item.id)}
                  aria-label={item.completed ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  {item.completed ? '✓' : ''}
                </button>

                <span className="todo-text">{item.text}</span>

                <button className="todo-delete" onClick={() => deleteItem(item.id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <div className="todo-footer">
          <span>{items.length} total tasks</span>
          <button className="secondary-btn" onClick={clearCompleted}>Clear completed</button>
        </div>
      </div>
    </div>
  );
}
