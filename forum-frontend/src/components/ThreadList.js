import { Link } from 'react-router-dom'
const ThreadList = () => {
  return (
    <div>
      <h2>Threads</h2>
      <Link to='/thread/:id'>Thread</Link>
    </div>
  )
}
export default ThreadList