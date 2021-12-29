const User = ({ user }) => {
  console.log(user)
  return (
    <div>
      <h2>{user.username} • {user.name}</h2>
    </div>
  )
}
export default User