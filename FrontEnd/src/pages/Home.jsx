import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';

const Home = () => {
  const {assets} = useContext(AppContext)
  return (
    <div className='pt-[10vh]'>
      <div className="max-[900px]:columns-4 max-[600px]:columns-3 max-[300px]:columns-2 mx-auto mb-10 w-full max-w-6xl columns-5 gap-4 space-y-4 pb-10 pt-10">

      {assets.imageUrls.map((url, index) => (
        <img key={index} className="rounded-[20px]" src={url} alt={`Gallery image ${index + 1}`} />
      ))}

      </div>
    </div>
  )
}

export default Home
