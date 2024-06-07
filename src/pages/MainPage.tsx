import React from 'react'
import cl from '../styles/MainPage.module.css';

export const MainPage = () => {
  return (
    <div className={cl.container}>
      <div className={cl.text}>
        <span>Download our mobile application!</span>
        <a href="https://drive.google.com/file/d/1X2fXuhhZsVEnnW6x6ZzXqLPH4YTtjxAR/view?usp=sharing">Download</a>
      </div>
    </div>
  )
}
