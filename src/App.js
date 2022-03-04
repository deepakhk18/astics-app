import {Switch,Route} from 'react-router-dom'
import Dashboard from "./component/Dashboard";
import React,{useState} from 'react';
import Login from './component/Login';
import Signup from './component/Signup';

function App() {
  const [isAuthorised,setISAuthorised]=useState(false);
  return(
    <React.Fragment>
      <Switch>
      <Route path="/" exact component={()=><Login isAuthorised={isAuthorised} setISAuthorised={setISAuthorised}/>} />
      <Route path="/signup" exact component={Signup}/>
      {isAuthorised && <Route path="/dashboard" component={Dashboard}/>
    }
      </Switch>
    </React.Fragment>
    
  )
}

export default App;
