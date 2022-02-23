import React from 'react'
const ResetPassword = ({ user }) => {
  if (user.token === user.token){
    console.log('token is a match')
  }
  return (
    <div>
      <h2>Reset Password</h2>
      <p></p>
    </div>
  )
}
export default ResetPassword