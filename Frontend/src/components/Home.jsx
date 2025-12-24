import React from 'react'
import Hero from '../Home/Hero'
import Trending from '../Home/Trending'
import Games from '../Home/Games'
import Creators from '../Home/Creators'
import Code from '../Home/Code'

export default function Home() {
  return (
    <div>
      <Hero/>
      <Trending/>
      <Games/>
      <Code/>
      <Creators/>
    </div>
  )
}
