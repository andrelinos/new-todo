'use client';

import Image from 'next/image';

import clipboard from '@/assets/clipboard.svg';

export function NoTodos() {
  return (
    <div className="flex h-full min-h-[256px] w-full flex-1 flex-col items-center justify-center gap-4">
      <Image src={clipboard} alt="" priority className="h-auto w-auto" />
      <div className="text-gray-300">
        <p className="font-bold">Você ainda não tem tarefas cadastradas</p>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </div>
    </div>
  );
}
