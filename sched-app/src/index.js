import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import 'semantic-ui-css/semantic.min.css';

fetch("https://raw.githubusercontent.com/UMMS-FCE/UMMS_3rd_Year_Calendar_Generator/master/constants.json")
    .then((r) => r.json())
    .then((data) =>{
        ReactDOM.render(<App constants={data} />,
                        document.getElementById('root'));
    })
