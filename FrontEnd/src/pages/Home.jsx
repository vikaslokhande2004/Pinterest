import React from 'react'
import { assets } from "../assets/assets";

const Home = () => {
  return (
    <div>
      <div className="max-[900px]:columns-4 max-[600px]:columns-3 max-[300px]:columns-2 mx-auto mb-10 w-full max-w-6xl columns-5 gap-4 space-y-4 pb-10 pt-10">

      {assets.imageUrls.map((url, index) => (
        <img key={index} className="rounded-[20px]" src={url} alt={`Gallery image ${index + 1}`} />
      ))}

      </div>
    </div>
  )
}

export default Home
