'use client';

import { Dispatch, HTMLAttributes, SetStateAction, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';

interface AddTaskProps extends HTMLAttributes<HTMLDivElement> {
  setIsChanged: Dispatch<SetStateAction<boolean>>;
  isChanged?: boolean;
  isLoading?: boolean;
}

export function AddTask({ setIsChanged, isChanged, isLoading }: AddTaskProps) {
  const [inputValue, setInputValue] = useState('');

  async function handleAddTask() {
    if (inputValue === '') {
      const meuInput = document.getElementById('input-task');

      if (meuInput) {
        meuInput.focus();
      }

      return;
    }

    const response = await fetch(`api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: inputValue
      })
    });

    if (response.status === 201) {
      setIsChanged(!isChanged);
      setInputValue('');
    }
  }
  return (
    <div className="flex gap-2">
      <input
        id="input-task"
        type="text"
        placeholder="Adicione uma nova tarefa"
        className="w-[38.875rem] rounded-lg border-2 border-gray-400 bg-gray-500 px-4 text-lg text-gray-200 outline-0 placeholder:text-gray-300 focus:border-purple-600"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="text-md flex h-14 w-24 items-center justify-center gap-2 rounded-lg border border-gray-400 bg-blue-400 font-bold transition-all hover:bg-blue-500"
        onClick={handleAddTask}
      >
        Criar <AiOutlinePlusCircle className="text-xl" />
      </button>
    </div>
  );
}
