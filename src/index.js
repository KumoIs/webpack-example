import createImg from './components/createImg';
import createTest from './components/createTest';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Content from './components/content';

import './index.scss';
import './styled.css';
import './styles/font.scss'

createImg()
createTest()



new Header();
new Sidebar();
new Content();

