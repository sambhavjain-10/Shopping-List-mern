import React,{useEffect} from 'react'
import './style.css'
import Nav from './components/Nav'
import ShoppingList from './components/ShoppingList'
import Store from './store'
import {Provider} from 'react-redux'
import { loadUser } from "./actions/authActions"
import store from './store'

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={Store}>
    <div>
      <Nav />
      <ShoppingList />
    </div>
    </Provider>
  )
}

export default App

