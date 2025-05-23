// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import snackbar from './snackbar';
import college from 'store/college';
import year from 'store/year';
import qualityControl from 'store/qualityControl';
import university from 'store/university';
import user from 'store/user';
import category from 'store/category';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  snackbar,
  college,
  year,
  qualityControl,
  university,
  user,
  category
});

export default reducers;
