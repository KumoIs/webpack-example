import smile from '../assets/smile.jpg'

function createImg() {
  var img = new Image();
  img.src = smile;
  img.classList.add('avatar');
  
  var dom = document.getElementById('root');
  dom.append(img);
}

export default createImg