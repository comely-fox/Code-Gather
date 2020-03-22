import bootstrop from './css/bootstrap.css';
import css from './css/index.css';
import scss from './css/base.scss';
//import $ from 'jquery';

{
    const message = 'Hello World!, My content from entry.js';
    document.querySelector('#info').innerHTML = `message`;
    
    $('.jquery').css({
        'display': 'block',
        'line-height': '40px',
        'text-align': 'center',
        'color': '#cc00cc',
        'backgroundColor': 'gray'
    })
    .text('jQuery');
}
