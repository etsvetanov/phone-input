import React, {Component} from 'react';
import './App.css';
import PhoneInput from './components/PhoneInput';

class App extends Component {
    render() {
        return (
            <div style={{"padding": "5px"}}>
                <PhoneInput />
            </div>
        );
    }
}

export default App;
