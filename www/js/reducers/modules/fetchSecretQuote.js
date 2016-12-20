import {operateDataQuote_REQUEST,operateDataQuote_SUCCESS,operateDataQuote_FAILURE,tips_STOP,tips_START,
preliminaryContestData_REQUEST, preliminaryContestData_SUCCESS, preliminaryContestData_FAILURE,
intermediaryContestData_REQUEST, intermediaryContestData_SUCCESS, intermediaryContestData_FAILURE,
settleMentData_REQUEST, settleMentData_SUCCESS, settleMentData_FAILURE,
memberInfoData_REQUEST, memberInfoData_SUCCESS, memberInfoData_FAILURE,
articleListData_REQUEST, articleListData_SUCCESS, articleListData_FAILURE,
articleDetailData_REQUEST, articleDetailData_SUCCESS, articleDetailData_FAILURE
} from '../../constants' 

import Assign from 'Object-Assign'
const objectAssign = typeof Object.Assign === 'function' ? Object.Assign : Assign

// The quotes reducer
export function Tips(state = {
    tipText:{},
    tipstate:false,
    tipType:""
  }, action) {
  switch (action.type) {
    case tips_START:
      return objectAssign({}, state, { 
        tipstate: true,
        tipText: action.response || action.text,
        tipType: action.mytype,
        time: action.time
      })
    case tips_STOP:
      return objectAssign({}, state, {
        tipstate: false,
        tipText:{}
      })
    default:
      return state
    }
}

// The quotes reducer
export function operateDatas(state = {
    isFetching: false,
    authenticated: false,
  }, action) {
  switch (action.type) {
    case operateDataQuote_REQUEST:
      return objectAssign({}, state, {
        isFetching: true
      })
    case operateDataQuote_SUCCESS:
      // return objectAssign({}, state, {
      //   isFetching: false,
      //   operateDataResult: action.response,
      //   tipstate:true,
      //   authenticated: action.authenticated || false
      // })
    case operateDataQuote_FAILURE:
      return objectAssign({}, state, {
        isFetching: false
      })
    default:
      return state
    }
}

export function preliminaryContestDataQuotes(state = {
    isFetching: false,
    preliminaryContestData: 0,
    authenticated: false,
    isloaded:false
  }, action) {
  switch (action.type) {
    case preliminaryContestData_REQUEST:
      return objectAssign({}, state, {
        isFetching: true
      })
    case preliminaryContestData_SUCCESS:
      return objectAssign({}, state, {
        isFetching: false,
        isloaded:true,
        preliminaryContestData: action.response,
        authenticated: action.authenticated || false
      })
    case preliminaryContestData_FAILURE:
      return objectAssign({}, state, {
        isFetching: false
      })
    default:
      return state
    }
}

export function intermediaryContestDataQuotes(state = {
    isFetching: false,
    intermediaryContestData: 0,
    authenticated: false,
    isloaded:false
  }, action) {
  switch (action.type) {
    case intermediaryContestData_REQUEST:
      return objectAssign({}, state, {
        isFetching: true
      })
    case intermediaryContestData_SUCCESS:
      return objectAssign({}, state, {
        isFetching: false,
        isloaded:true,
        intermediaryContestData: action.response,
        authenticated: action.authenticated || false
      })
    case intermediaryContestData_FAILURE:
      return objectAssign({}, state, {
        isFetching: false
      })
    default:
      return state
    }
}

export function settleMentDataQuotes(state = {
    isFetching: false,
    settleMentData: '',
    authenticated: false
  }, action) {
  switch (action.type) {
    case settleMentData_REQUEST:
      return objectAssign({}, state, {
        isFetching: true
      })
    case settleMentData_SUCCESS:
      return objectAssign({}, state, {
        isFetching: false,
        settleMentData: action.response,
        authenticated: action.authenticated || false
      })
    case settleMentData_FAILURE:
      return objectAssign({}, state, {
        isFetching: false
      })
    default:
      return state
    }
}

export function articleListDataQuotes(state = {
    isFetching: false,
    articleListData: 0,
    authenticated: false,
    isloaded:false
  }, action) {
  switch (action.type) {
    case articleListData_REQUEST:
      return objectAssign({}, state, {
        isFetching: true
      })
    case articleListData_SUCCESS:
      return objectAssign({}, state, {
        isFetching: false,
        isloaded:true,
        articleListData: action.response,
        authenticated: action.authenticated || false
      })
    case articleListData_FAILURE:
      return objectAssign({}, state, {
        isFetching: false
      })
    default:
      return state
    }
}

export function articleDetailDataQuotes(state = {
    isFetching: false,
    articleDetailData: 0,
    authenticated: false
  }, action) {
  switch (action.type) {
    case articleDetailData_REQUEST:
      return objectAssign({}, state, {
        isFetching: true
      })
    case articleDetailData_SUCCESS:
      return objectAssign({}, state, {
        isFetching: false,
        articleDetailData: action.response,
        authenticated: action.authenticated || false
      })
    case articleDetailData_FAILURE:
      return objectAssign({}, state, {
        isFetching: false
      })
    default:
      return state
    }
}

export function memberInfoDataQuotes(state = {
    isFetching: false,
    memberInfoData: 0,
    authenticated: false
  }, action) {
  switch (action.type) {
    case memberInfoData_REQUEST:
      return objectAssign({}, state, {
        isFetching: true
      })
    case memberInfoData_SUCCESS:
      return objectAssign({}, state, {
        isFetching: false,
        memberInfoData: action.response,
        authenticated: action.authenticated || false
      })
    case memberInfoData_FAILURE:
      return objectAssign({}, state, {
        isFetching: false
      })
    default:
      return state
    }
}
