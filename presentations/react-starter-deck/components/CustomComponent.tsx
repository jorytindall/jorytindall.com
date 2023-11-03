import React from 'react'

export default function CustomComponent({ title }: { title: string }) {
  return (
    <>
      <h1>{title}</h1>
      <p>Lorem ipsum dolor sit amet.</p>
    </>
  )
}