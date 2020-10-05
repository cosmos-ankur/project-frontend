import React,{useEffect} from 'react';
import { Route ,Switch} from 'react-router-dom'
import './App.css';
import Layout from './components/Layout';
import Home from './containers/Home';
import Signup from './containers/Signup';
import Signin from './containers/Signin';
import PrivateRoute from './components/HOC/PrivateRoute'
import { useSelector , useDispatch} from 'react-redux';
import {getAllCategory, isUserLoggedin} from './actions'
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
import { getInitialData } from './actions/initialData.action';



function App() {
  const dispatch  = useDispatch();
  const auth = useSelector(state => state.auth)
  useEffect(()=>{
    if(!auth.authenticate){
        dispatch(isUserLoggedin());
    }
    dispatch(getInitialData());
    
},[]);
  return (
    <div className="App">
    
      <Switch>
        <PrivateRoute Route path = '/'  exact component = {Home} />
        <PrivateRoute Route path ='/category' component = {Category}/>
        <PrivateRoute path="/products" component={Products}/>
        <PrivateRoute path="/orders" component={Orders}/>
        <Route path = '/signin' component = {Signin} />
        <Route path = '/signup' component = {Signup} />
      </Switch>
    

    </div>
    
  );
}

export default App;
