import { combineReducers } from 'redux'

import listReduces from '@pages/List/module';

export default combineReducers({
  list: listReduces
})