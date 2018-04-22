import './main.scss';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import ChatBot from 'react-simple-chatbot';
import Answer from './answer.jsx';

class App extends  React.Component {
    constructor(){
        super();
        
        this.state = {
            currentQuestion: '',
            currentIndex: 0,
            questions: [],
            answers: []
        };


        this.getQueryValues = () => {
            return {
                question: this.state.currentQuestion,
                index: this.state.currentIndex++
            }
        };

        this.initialSteps = [
              { 
                id: '0',
                message: 'Hi, you can ask me your tax questions!',
                trigger: '1'
              },
              {
                id: '1',
                user: true,
                trigger: '2',
                validator: (value) => {
                    console.log("Setting state.", value);
                    this.setState({
                        currentQuestion: value,
                        currentIndex: 0
                    });
                    return true;
                }
              },
              {
                id: '2',
                message: 'Here is what I found.',
                trigger: '3',
              },
              {
                id: '3',
                component: <Answer valueCallback={this.getQueryValues} />,
                trigger: '4'
              },
              {
                id: '4',
                message: 'Was this answer helpful?',
                trigger: '5'
              },
              {
                id: '5',
                options: [
                    { value: 1, label: 'Yes', trigger: '1', },
                    { value: 2, label: 'No', trigger: '3' },
                ]
              }
        ];
    }

    render() {
        return( 
            <div className="app-view">
                <ChatBot steps={this.initialSteps} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('react-app'));
