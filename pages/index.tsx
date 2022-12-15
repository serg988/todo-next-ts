import { TodoType } from '../utils/types'
import Link from 'next/link'
import { connect } from '../utils/connection'

// Define the components props
interface IndexProps {
  todos: TodoType[]
}

// define the page component
function Index({ todos }: IndexProps) {

  return (
    <div>
      <h1>My Todo List</h1>
      <h2>Click On Todo for details</h2>
      <Link href='/todos/create'>
        <button>Create a New Todo</button>
      </Link>
      {/* MAPPING OVER THE TODOS */}
      {todos.map((t) => (
        <div key={t._id}>
          <Link href={`/todos/${t._id}`}>
            <h3 style={{ cursor: 'pointer' }}>
              {t.item} - {t.completed ? 'completed' : 'incomplete'}
            </h3>
          </Link>
        </div>
      ))}
    </div>
  )
}

// GET PROPS FOR SERVER SIDE RENDERING
export async function getServerSideProps() {
  // get todo data from API
  // const res = await fetch(process.env.API_URL as string)
  // const todos = await res.json()
  // await connect()
  const { Todo } = await connect()
  const todos = await Todo.find()

  // return props
  return {
    props: { todos: JSON.parse(JSON.stringify(todos)) },
  }
}

export default Index
