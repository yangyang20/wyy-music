
export interface Banner  {
  targetId:number,
  url:string,
  imageUrl:string
}

export interface HotTag {
  id:number,
  name:string,
  position:number,
}

//歌手详情
export interface SingerDetail {
  artist: Singer;
  hotSongs: Song[];
}



//歌手
export interface Singer {
  id:number,
  name:string,
  picUrl:string,
  albumSize:number,
  alias:string[]
}


//歌曲
export interface Song {
  id:number,
  name:string,
  url:string,
  ar:Singer[],
  al:{id:number,name:string,picUrl:string},
  dt:number,
}

//歌单
export interface SongSheet {
  id:number,
  name:string,
  picUrl?:string,
  playCount:number,
  tracks:Song[],
  coverImgUrl?:string,
  creator?:Creator,
  createTime?:number,
  subscribedCount?:number,
  shareCount?:number,
  tags?:string[],
  userId?:number,
  subscribed?:boolean,
  description?:string,
}

export interface Creator {
  avatarUrl:string,
  nickname:string,

}

//播放地址
export interface SongUrl{
  id:number,
  url:string,
}


//歌词
export interface Lyric {
  lyric: string;
  tlyric: string;
}

//歌单
export interface SheetParams {
  offset: number;
  limit: number;
  order: 'new' | 'hot';
  cat: string;
}

// 歌单列表
export interface SheetList {
  playlists: SongSheet[];
  total: number;
}


//搜索
export interface SearchResult {
  artists?:Singer[],
  playlists?:SongSheet[],
  songs?:Song[],
}


export interface AnyJson {
  [key:string]:any
}
