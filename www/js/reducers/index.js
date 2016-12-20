import auth from './modules/auth';
import {Tips,operateDatas,intermediaryContestDataQuotes,preliminaryContestDataQuotes,
memberInfoDataQuotes,settleMentDataQuotes,articleListDataQuotes,articleDetailDataQuotes
} from './modules/fetchSecretQuote';

import { combineReducers } from 'redux'
import { ReduxAsyncConnect, asyncConnect, reducer as reduxAsyncConnect } from 'redux-async-connect'
// 拼装器
const quotesApp = combineReducers({
  auth,
  reduxAsyncConnect,
  Tips,
  operateDatas,
  preliminaryContestDataQuotes,
  intermediaryContestDataQuotes,
  memberInfoDataQuotes,settleMentDataQuotes,
  articleListDataQuotes,articleDetailDataQuotes
})

export default quotesApp