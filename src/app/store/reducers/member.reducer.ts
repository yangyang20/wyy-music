import {Action, createReducer, on} from "@ngrx/store";
import {SetModalType, SetModalVisible, SetUserID} from "../actions/member.action";


export enum ModalTypes {
  Register = 'register',
  LoginByPhone = 'loginByPhone',
  Share = 'share',
  Like = 'like',
  Default = 'default'
}



export interface MemberState {
  modalVisible:boolean,
  modalType:ModalTypes,
  userId:number,
}

export const initialState:MemberState = {
  modalVisible:false,
  modalType:ModalTypes.Default,
  userId:0,
}

const reducer = createReducer(
  initialState,
  on(SetModalVisible,(state,{modalVisible}) => ({...state,modalVisible})),
  on(SetModalType,((state, {modalType}) => ({...state,modalType}))),
  on(SetUserID,(state, {userId}) => ({...state,userId})),

)

export function memberReducer(state: MemberState,action:Action) {
  return reducer(state,action)
}
