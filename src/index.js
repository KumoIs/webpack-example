import Header from './components/header';
import Sidebar from './components/sidebar';
import Content from './components/content';

import smile from './assets/smile.jpg'

import './index.scss';

console.log(smile);

var img = new Image();
img.src = smile
img.classList.add("avatar")
var dom = document.getElementById('root');
var img = dom.append(img);

new Header();
new Sidebar();
new Content();

