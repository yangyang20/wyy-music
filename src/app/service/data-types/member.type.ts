import {Song, SongSheet} from './common.types';


export interface Profile{
  userId: number;
  nickname: string;
  avatarUrl: string;
  backgroundUrl: string;
  signature: string;

  // 性别
  gender: number;

  // 粉丝
  followeds: number;

  // 关注
  follows: number;

  // 动态
  eventCount: number;
}

export interface User {
  // 等级
  level?: number;

  // 听歌记录
  listenSongs?: number;

  profile: Profile
}


export interface LoginParams {
  phone: string;
  password: string;
  remember: boolean;
}


export interface LoginRes {
  code:number,
  msg:string,
  profile?:Profile,
  token?:string,
  cookie?:string,
}


export interface Signin {
  code: number;
  point?: number;
  msg?: string;
}

type recordKeys = 'weekData' | 'allData';
export type UserRecord = {
  [key in recordKeys]: RecordVal[];
};

export interface RecordVal {
  playCount: number;
  score: number;
  song: Song;
}

export interface UserSheet {
  self: SongSheet[];
  subscribed: SongSheet[];
}
