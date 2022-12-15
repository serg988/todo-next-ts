import { TodoType } from '../../utils/types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { connect } from '../../utils/connection'
import mongoose, { Model } from 'mongoose'

// Define Prop Interface
interface ShowProps {
  todo: TodoType
  url: string
}

// Define Component
function Show(props: ShowProps) {
  // get the next router, so we can use router.push later
  const router = useRouter()
  // set the todo as state for modification
  const [todo, setTodo] = useState<TodoType>(props.todo)

  // function to complete a todo
  const handleComplete = async () => {
    if (!todo.completed) {
      // make copy of todo with completed set to true
      const newTodo: TodoType = { ...todo, completed: true }
      // make api call to change completed in database
      await fetch(props.url + '/' + todo._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // send copy of todo with property
        body: JSON.stringify(newTodo),
      })
      // once data is updated update state so ui matches without needed to refresh
      setTodo(newTodo)
    }
    // if completed is already true this function won't do anything
  }

  // function for handling clicking the delete button
  const handleDelete = async () => {
    await fetch(props.url + '/' + todo._id, {
      method: 'delete',
    })
    //push user back to main page after deleting
    router.push('/')
  }

  //return JSX
  return (
    <div>
      <h1>{todo.item}</h1>
      <h2>{todo.completed ? 'completed' : 'incomplete'}</h2>
      <button onClick={handleComplete}>Complete</button>
      <button onClick={handleDelete}>Delete</button>
      <button
        onClick={() => {
          router.push('/')
        }}
      >
        Go Back
      </button>
    </div>
  )
}

// Define Server Side Props
export async function getServerSideProps(context: any) {
  // fetch the todo, the param was received via context.query.id
  const { Todo } = await connect()
  const todo = await Todo.findById({ _id: context.query.id })

  //return the serverSideProps the todo and the url from out env variables for frontend api calls
  return {
    props: { todo: JSON.parse(JSON.stringify(todo)), url: process.env.API_URL },
  }
}

// export component
export default Show
