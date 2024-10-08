import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

export const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.error('somewhere')
    navigate('/')
  }
  return (
    <div>
      <Outlet />
      <button onClick={handleSubmit}>Submit Form</button>
    </div>
  )
}
