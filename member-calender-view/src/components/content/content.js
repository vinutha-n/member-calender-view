import React from 'react'
// import axios, { post } from 'axios';
import {
    Card,
    CardBody,
    CardTitle,
    Input,
} from 'reactstrap';
import { BrowserRouter, Link ,Switch, HashRouter, Route,} from "react-router-dom";
import Cal from './calender';

class Content extends React.Component {
	constructor(props) {
    super(props)
    this.state = {
      todos: [],

    }; 
  }
  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:3000/members');
      const todos = await res.json();
      this.setState({
        todos
      });
    } 
    catch (e) {
      console.log(e);
    }
  }  
        
   
  render() {
    return (
    	<BrowserRouter>
	      
	            <div>
	              {this.state.todos.map((item, i) => (
	                <div key={i}>
	                  <h1>{item.real_name}</h1>
	                  <Link to="/Cal">{item.real_name}
	                  <Route exact path="/calender" component={Cal} /></Link>
	                </div>

	              ))}
	             
             <Cal/>
           
	              
	            </div>
	       
      </BrowserRouter>
    );
  }

}
export default Content