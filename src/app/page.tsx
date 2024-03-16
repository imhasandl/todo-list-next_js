import { prisma } from '@/db'
import Link from 'next/link'
import React from 'react'
import TodoItem from './components/TodoItem'

function getTodos(){
  return prisma.todo.findMany() 
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"

  await prisma.todo.update({ where: { id }, data: { complete } })
}

export default async function page() {

  const todos = await getTodos()

  return (
    <>
      <header className='flex justify-between items-center m-4'>
        <h1 className='text-4xl'>Todos</h1>
        <Link
          href='/new'
          className='border text-3xl border-slate-300 text-slate-300 px-2 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none p-2'
        >
          New
        </Link>
      </header>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  )
}
