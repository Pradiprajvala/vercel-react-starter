import React from 'react'
import { MutatingDots } from 'react-loader-spinner'
import '../styles/Loading.css'

const Loading = () => {
  return (
    <div className='loading'>
        <MutatingDots 
            height="100"
            width="100"
            color="#3563E9"
            secondaryColor= '#3563E9'
            radius='12.5'
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    </div>
  )
}

export default Loading