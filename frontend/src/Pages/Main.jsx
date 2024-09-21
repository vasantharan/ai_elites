import React from 'react'
import '../Stylesheet/background.css'
import '../Stylesheet/Main.css'
import Header from '../Components/Header'
import Button from '../Components/Button'
import { Link } from 'react-router-dom'

function Main() {
  return (
    <>
      <Header />
      <div className='flex-div'>
      <div className='main-whole'>
        <div className='main-title'>Getting started with Us</div>
        <div className='main-buttons'>
          <Link to={'/signup'}><Button props="signup" disable={true} /></Link>
          <Link to={"/login"}><Button props="login" disable={true} /></Link>
        </div>
      </div>
      </div>
    </>
  )
}
export default Main
