import auth from './modules/auth';
import {Tips,operateDatas,intermediaryContestDataQuotes,preliminaryContestDataQuotes,memberInfoListDataQuotes,
memberInfoDataQuotes,settleMentDataQuotes,articleListDataQuotes,articleDetailDataQuotes,registerQuotes
} from './modules/fetchSecretQuote';

import { combineReducers } from 'redux'
import { ReduxAsyncConnect, asyncConnect, reducer as reduxAsyncConnect } from 'redux-async-connect'
// 拼装器
const quotesApp = combineReducers({
  auth,
  reduxAsyncConnect,
  Tips,
  operateDatas,
  memberInfoListDataQuotes,registerQuotes,
  preliminaryContestDataQuotes,
  intermediaryContestDataQuotes,
  memberInfoDataQuotes,settleMentDataQuotes,
  articleListDataQuotes,articleDetailDataQuotes
})

export default quotesApp