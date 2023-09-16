import { TasksList } from './componentes/list-tasks';

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col items-center border-t border-gray-400 bg-gray-600">
      <div className="absolute -top-7 flex w-full max-w-[45.4375rem] flex-col items-center">
        <TasksList />
      </div>
    </main>
  );
}
