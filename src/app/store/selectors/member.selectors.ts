import {createFeatureSelector, createSelector} from "@ngrx/store";
import {MemberState} from "../reducers/member.reducer";
import {PlayState} from "../reducers/player.reducer";


const selectMemberStates = (state:MemberState) =>state
export const getMember = createFeatureSelector<MemberState>('member');
export const getModalVisible = createSelector(selectMemberStates,(state:MemberState) => state.modalVisible)
export const getModalType = createSelector(selectMemberStates,(state:MemberState) =>state.modalType)
