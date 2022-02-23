import React from 'react'

const Date = ({ date }) => {
  const day = date.split('T')
  const time = date.slice(11, 16)
  return (
    <span>{day[0]} {time}</span>
  )
}
export default Date