import { CALL_API } from '../middleware/api'
import {operateDataQuote_REQUEST,operateDataQuote_FAILURE,tips_STOP,register_REQUEST,register_FAILURE,tips_START,register_SUCCESS,
preliminaryContestData_REQUEST, preliminaryContestData_SUCCESS, preliminaryContestData_FAILURE,
intermediaryContestData_REQUEST, intermediaryContestData_SUCCESS, intermediaryContestData_FAILURE,
settleMentData_REQUEST, settleMentData_SUCCESS, settleMentData_FAILURE,
memberInfoData_REQUEST, memberInfoData_SUCCESS, memberInfoData_FAILURE,
articleListData_REQUEST, articleListData_SUCCESS, articleListData_FAILURE,
articleDetailData_REQUEST, articleDetailData_SUCCESS, articleDetailData_FAILURE,
memberInfoListData_REQUEST, memberInfoListData_SUCCESS, memberInfoListData_FAILURE
 } from '../constants' 

export function closeTips() {
  return {
      type: tips_STOP
  }
}

export function openTips(text) {
  return {
      type: tips_START,
      text
  }
}

export function operateDataQuote(url,body,mytype) {
  return {
      endpoint: url,
      authenticated: true,
      types: [operateDataQuote_REQUEST, tips_START, operateDataQuote_FAILURE],
      body:body,
      mytype:mytype
  }
}

export function preliminaryContestDataQuote(url,body) {
  return {
      endpoint: url,
      authenticated: true,
      types: [preliminaryContestData_REQUEST, preliminaryContestData_SUCCESS, preliminaryContestData_FAILURE],
      body:body,
  }
}

export function intermediaryContestDataQuote(url,body) {
  return {
      endpoint: url,
      authenticated: true,
      types: [intermediaryContestData_REQUEST, intermediaryContestData_SUCCESS, intermediaryContestData_FAILURE],
      body:body,
  }
}

export function settleMentDataQuote(url,body) {
  return {
      endpoint: url,
      authenticated: true,
      types: [settleMentData_REQUEST, settleMentData_SUCCESS, settleMentData_FAILURE],
      body:body,
  }
}

export function memberInfoDataQuote(url,body) {
  return {
      endpoint: url,
      authenticated: true,
      types: [memberInfoData_REQUEST, memberInfoData_SUCCESS, memberInfoData_FAILURE],
      body:body,
  }
}

export function articleListDataQuote(url,body) {
  return {
      endpoint: url,
      authenticated: true,
      types: [articleListData_REQUEST, articleListData_SUCCESS, articleListData_FAILURE],
      body:body,
  }
}

export function memberInfoList(url,body) {
  return {
      endpoint: url,
      authenticated: true,
      types: [memberInfoListData_REQUEST, memberInfoListData_SUCCESS, memberInfoListData_FAILURE]
  }
}

export function articleDetailDataQuote(url,body) {
  return {
      endpoint: url,
      authenticated: true,
      types: [articleDetailData_REQUEST, articleDetailData_SUCCESS, articleDetailData_FAILURE],
      body:body,
  }
}

export function registerQuote(url,body) {
  return {
      endpoint: url,
      types: [register_REQUEST, register_SUCCESS, register_FAILURE],
      body:body,
      time:10000
    }
}



