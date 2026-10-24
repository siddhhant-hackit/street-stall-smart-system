import Link from 'next/link';
import TodoApp from '@/components/todo-app';

export default function TodoPage() {
  return (
    <main className="page-shell todo-page-shell">
      <div className="page-top-row">
        <Link href="/" className="secondary-btn">← Back home</Link>
        <Link href="/dashboard" className="primary-btn">Open dashboard</Link>
      </div>
      <TodoApp />
    </main>
  );
}
