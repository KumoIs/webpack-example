import _ from 'lodash';

import Super from './assets/super.jpg';
import xml from './assets/testXml.xml';
import './styles/index.css';
import './index.css';

function component() {
  const root = document.getElementById('root');
  const span = document.createElement('span');
  span.classList.add('iconfont', 'icon-ziyuan283');
  root.appendChild(span)
  // root.innerText = "This is my first webpack project"
}

function createImage() {
  const root = document.getElementById('root');
  const img = new Image();
  img.src = Super;
  img.className = 'img';
  root.appendChild(img)
}

function createXml() {
  const root = document.getElementById('root');
  const div = document.createElement('div');
  div.innerText = JSON.stringify(xml);
  root.appendChild(div)
}

component();
createXml();
createImage();