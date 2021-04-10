import React from 'react'
import ReactDOM from 'react-dom'
import App from '#/app'
import RootContext, { RootAPI } from './controller'

ReactDOM.render(
    <RootContext.Provider value={new RootAPI()}>
        <App />
    </RootContext.Provider>,
    document.getElementById('root')
)
