'use client';

import classNames from 'classnames';

import { Dispatch, HTMLAttributes, SetStateAction, useState } from 'react';
import { BsCheck, BsCheck2All, BsPencilSquare, BsTrash3 } from 'react-icons/bs';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  title?: string;
  isCompleted?: boolean;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
  isChanged?: boolean;
  isLoading?: boolean;
}

export function Card({
  id,
  title,
  isCompleted,
  setIsChanged,
  isChanged,
  isLoading,
  ...rest
}: CardProps) {
  const [inputValue, setInputValue] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  async function handleChangeTask() {
    const isCompletedChanged = !isCompleted;
    setIsEditing(false);

    const response = await fetch(`api/todos?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: inputValue,
        isCompleted: isCompletedChanged
      })
    });

    if (response.status === 201) {
      setIsChanged(!isChanged);
    }
  }

  async function handleDeleteTask() {
    const response = await fetch(`api/todos?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 201) {
      setIsChanged(!isChanged);
      console.log('success');
    } else {
      console.log('error');
    }
  }

  function handleShowDialogDeleteTask() {
    setShowDialog(!showDialog);
  }

  return (
    <div
      className="relative flex h-20 w-full items-start gap-4 rounded-lg bg-gray-500 p-4 transition-all "
      {...rest}
    >
      <button
        type="button"
        className={classNames(
          'mt-1 flex h-4 w-4 items-center justify-center rounded-full border p-0',
          {
            'border-purple-600 bg-purple-600': isCompleted
          }
        )}
        onClick={handleChangeTask}
        disabled={isLoading}
      >
        {isCompleted && <BsCheck />}
      </button>
      {isEditing ? (
        <div className="flex w-full gap-2">
          <input
            type="text"
            className="h-14 w-full rounded-lg border-2 border-gray-400 bg-gray-500 px-4 text-lg text-gray-200 outline-0 placeholder:text-gray-300 focus:border-purple-600"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="text-md  flex h-14 w-10 items-center justify-center gap-2 rounded-lg border border-gray-400 bg-blue-500 font-bold transition-all hover:brightness-90"
            onClick={handleChangeTask}
          >
            <BsCheck2All className="text-xl" />
          </button>
        </div>
      ) : (
        <p
          className={classNames('w-full', {
            'text-gray-200 line-through opacity-70': isCompleted,
            'text-gray-100': !isCompleted
          })}
        >
          {inputValue}
        </p>
      )}
      {!isEditing && (
        <div className="flex flex-col space-y-4">
          <button
            type="button"
            className="flex h-4 w-4 p-0"
            onClick={handleShowDialogDeleteTask}
            disabled={isLoading}
          >
            <BsTrash3 className="font-thin text-gray-300 hover:text-danger-500" />
          </button>
          <button
            type="button"
            className="flex h-4 w-4 p-0"
            onClick={() => setIsEditing(true)}
            disabled={isLoading}
          >
            <BsPencilSquare className="font-thin text-gray-300 hover:text-blue-500" />
          </button>
        </div>
      )}
      {showDialog && (
        <div className="absolute inset-0 z-20 flex flex-col  bg-gray-700 bg-opacity-70">
          <p className="mx-auto pb-4 font-medium text-gray-100">
            Deseja mesmo apagar esta tarefa?
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              className="text-md h-8 rounded-lg bg-blue-500 px-4"
              onClick={handleShowDialogDeleteTask}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="text-md h-8 rounded-lg bg-danger-500 px-4"
              onClick={handleDeleteTask}
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
