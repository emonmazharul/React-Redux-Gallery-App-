import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import './gallery/config'
import store from './gallery/redux/store'
import App from './gallery/app'


const root = document.getElementById('container')
ReactDOM.render(<Provider store={store}><App/></Provider>,root);
