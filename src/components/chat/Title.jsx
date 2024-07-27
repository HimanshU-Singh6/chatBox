import React from 'react'

const Title = ({username}) => {
  return (
    <div className='text-text text-[2.5rem] capitalize m-4 flex'> 
        <h1 className='items-center'>{username}</h1>
    </div>
  )
}

export default Title