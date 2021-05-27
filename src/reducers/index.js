import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import alerts from './alerts';
import register from './register';
import apis from './getAPIReducer';
import { authentication } from './authentication.reducer';
import { users } from './users.reducer';

export default combineReducers({
  alerts,
  auth,
  navigation,
  register,
  apis,
  authentication,
  users,
});
