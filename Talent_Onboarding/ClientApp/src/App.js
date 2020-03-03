import React from 'react'
import Home from './components/Home'
import ProductsList from './components/ProductsList'
import CustomersList from './components/CustomersList'
import SalesList from './components/SalesList'
import StoresList from './components/StoresList'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NavBar from './components/NavBar'

class App extends React.Component
{
  render(){
    return(
      <BrowserRouter>
      <div>
      <NavBar/>
      <Switch>
      <Route path='/' component={Home} exact/>
      <Route path='/Customers' component={CustomersList}/>
      <Route path='/Products' component={ProductsList}/>
      <Route path='/Sales' component={SalesList}/>
      <Route path='/Stores' component={StoresList}/>
      </Switch>
      </div>
      </BrowserRouter>
    )
  }
}

export default App