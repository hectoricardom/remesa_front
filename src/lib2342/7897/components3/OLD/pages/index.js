import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { withRedux } from '../lib/redux'
import useInterval from '../lib/useInterval'
import Clock from '../components/clock'
import Counter from '../components/counter'
import DialogHRM from '../components/DialogHRM'
import Link from 'next/link'
import MyLayout from '../components/MyLayout'

// import * as _Util from '../lib/Util'

const IndexPage = () => {
  // Tick the time every second
  useEffect(() => {
    console.log('mounted or updated');   
  });
  const dispatch = useDispatch()
  useInterval(() => {
    dispatch({
      type: 'TICK',
      light: true,
      lastUpdate: Date.now(),
    })
  }, 1000)
  return (
    <>
      <MyLayout />      
    </>
  )
}

IndexPage.getInitialProps = ({ reduxStore }) => {
  // Tick the time once, so we'll have a
  // valid time before first render
  const { dispatch } = reduxStore
  dispatch({
    type: 'TICK',
    light: typeof window === 'object',
    lastUpdate: Date.now(),
  })

  return {}
}

export default withRedux(IndexPage)
