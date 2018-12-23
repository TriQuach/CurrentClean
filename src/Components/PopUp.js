import React, {Component} from 'react';
import '../CSS/PopUp.css'
import { render } from 'react-dom';
import * as constClass from '../Const/utils.js'
import Popup from 'react-popup';
render(
    <Popup />,
    document.querySelector('#root'),
);

Popup.create({
    title: 'Hello World!',
    content: (
        <div>
            It takes more than just a good looking body. You've got to have the heart and soul to go with it.
        </div>
    ),
    className: 'alert',
    buttons: {
        left: ['cancel'],
        right: [
            <span style={{padding: '0 15px'}}>🦄</span>,
            {
                text: 'Ok!',
                className: 'success',
                action: Popup.close
            }
        ]
    },
});