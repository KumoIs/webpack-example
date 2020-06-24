import _ from 'lodash';

import { ergodic }  from './utils/utils';
import Super from './assets/super.jpg';
import xml from './assets/testXml.xml';
import './styles/index.css';
import './index.css';

const arr = [1, 2, 3, 4, 5, 6, 7]

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
  div.className = 'content'
  root.appendChild(div)
}

function createBut () {
  const root = document.getElementById('root');
  const but = document.createElement('button');
  but.addEventListener('click', () => {
    createXml()
  }, false);
  but.innerText = '增加ssssdd';
  root.appendChild(but);
}

createXml();
createImage();
createBut();

ergodic(arr)