
import React, { Component, useEffect, useState } from 'react';
import './style.css';
require('cors')

//get request arrow function
const getRequest = (table) => {
    const xhr = new XMLHttpRequest();
    var url = 'http://127.0.0.1:5000/answers/'+table +'/null/null';
    xhr.open('GET', url);
    xhr.onload = () => {
        const data = JSON.parse(xhr.response)
        return data
    }
    xhr.send()

}

//post request arrow function
const postRequest = (table, name, message) => {
    const xhr = new XMLHttpRequest();
    var url = 'http://127.0.0.1:5000/answers/'+table +'/' + message + '/' + name;
    xhr.open('POST', url);
    xhr.onload = () => {
        const data = JSON.parse(xhr.response)
        return data
    }
    xhr.send()

}

class Network extends Component {
    constructor(){
        super();
        this.state = {
            topic: 'Test',
            name: '',
            message: 'No data avaliable',
            value: '',
            valueMessage: '',
            valueName: ''
        }
    };
    //handeling change of the title to change the topic
    handleChange = (event) => {
        this.setState({value: event.target.value});
      }
    //handeling the search button submit
      handleSubmit = (event) => {
        this.setState({topic: this.state.value});
        this.setState({message: ''});
        getRequest(this.state.value);
        event.preventDefault();
      }
      //when someone changes there name
      handleChangeName = (event) => {
        this.setState({valueName: event.target.value});
      }
    //when someone changes the message input
      handleChangeMessage = (event) => {
          
        this.setState({valueMessage: event.target.value});
      }
    // when a message is submited
      handleSubmitMessage = (event) => {
        var message = this.state.valueName + ': ' + this.state.valueMessage
        this.setState({message: message});
        postRequest(this.state.value, this.state.valueMessage, this.state.valueName);
        event.preventDefault();
      }
    render() {  

        return (
        <div> 
            <form className='input' onSubmit={this.handleSubmit}>
                <input placeholder='Topic' className='input-box' value={this.state.value} onChange={this.handleChange}/>
                
                <input type="submit" value="Submit" className='button'/>
            </form>
            
            <div>
                {this.state.topic}
            </div>
            <div>
                {this.state.message}
            </div>
            <form  onSubmit={this.handleSubmitMessage}>
                <div>
                    <input placeholder='Name' className='input-box' value={this.state.valueName} onChange={this.handleChangeName}/>
      
                </div>
                <div>
                    
                    <input placeholder='Message' className='input-box' value={this.state.valueMessage} onChange={this.handleChangeMessage}/>

                </div>
                <div>
                     <input type="submit" value="Submit" className='button'/>
                </div>
                
            </form>
            <form onSubmit={this.handleSubmitMessage}>
                
            </form>
            
        </div>
        );
    }
}

export default Network;