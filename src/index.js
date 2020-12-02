import React from 'react';
import ReactDom from 'react-dom';
import dayjs from 'dayjs';
import App from './App';

import 'dayjs/locale/zh-cn';
import './styles/index.css';

dayjs.locale('zh-cn');

ReactDom.render(<App />, document.getElementById('root'));
