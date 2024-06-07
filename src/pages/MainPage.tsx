import React from 'react'
import cl from '../styles/MainPage.module.css';

export const MainPage = () => {
  return (
    <div className={cl.container}>
      <div className={cl.text}>
        <span>Download our mobile application!</span>
          <a href={"/app-debug.apk"} download={"app-debug.apk"}>Download</a>
      </div>
    </div>
  )
}
