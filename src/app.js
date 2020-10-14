import React from 'react'
import ReactDOM from 'react-dom'
import IndecisionApp from './components/IndecisionApp'
import 'normalize.css/normalize.css';
import './styles/styles.scss'

//Renders Indecision to the index.html placing into the div ID 'app'
ReactDOM.render(<IndecisionApp />, document.getElementById('app'))

