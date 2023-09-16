'use client';

import { useEffect, useState } from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';

import { AddTask } from '../add-task';
import { Card } from '../card';
import { NoTodos } from '../no-todos';

interface TasksProps {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function TasksList() {
  const [tasks, setTasks] = useState<TasksProps[]>([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function getTasks() {
    setIsLoading(true);
    await fetch('http://localhost:3000/api/todos')
      .then((response) => {
        return response.json();
      })
      .then((data: TasksProps[]) => {
        const completed = data?.filter((todo) => todo.isCompleted).length;

        setCompletedTasks(completed);
        setTasks(data);
      })
      .catch(() => {
        return [];
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getTasks();
  }, [isChanged]);

  return (
    <div className="h-full w-full flex-1">
      <AddTask
        setIsChanged={setIsChanged}
        isChanged={isChanged}
        isLoading={isLoading}
      />
      <div className="mx-auto mt-16 flex w-full max-w-[45.4375rem] py-4">
        <div className="flex w-full justify-between gap-2">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-blue-400">Tarefas criadas</span>
            <span className="flex h-5 w-auto min-w-[26px] items-center justify-center rounded-full bg-gray-500 p-2 text-xs text-gray-200">
              {tasks?.length}
            </span>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-purple-600">Concluídas</span>
            <span className="flex h-5 w-auto min-w-[26px] items-center justify-center rounded-full bg-gray-500 p-2 text-xs text-gray-200">
              {`${completedTasks} de ${tasks?.length}`}
            </span>
          </div>
        </div>
      </div>
      <div className="border-top itens-center flex max-h-[800px] min-h-[256px] w-full flex-col gap-4 overflow-x-auto rounded-lg border-gray-400 ">
        {tasks.length > 0 ? (
          tasks.map((todo) => (
            <Card
              key={todo.id}
              title={todo.title}
              id={todo.id}
              isCompleted={todo.isCompleted}
              setIsChanged={setIsChanged}
              isChanged={isChanged}
              isLoading={isLoading}
            />
          ))
        ) : isLoading ? (
          <div className="absolute inset-0 z-20 flex  items-center justify-center bg-gray-700 bg-opacity-30">
            <PacmanLoader color="#4ea8de" />
          </div>
        ) : (
          <NoTodos />
        )}
      </div>
      {isLoading && (
        <div className="absolute inset-0 z-20 flex  items-center justify-center bg-gray-700 bg-opacity-30">
          <PacmanLoader color="#4ea8de" />
        </div>
      )}
    </div>
  );
}
