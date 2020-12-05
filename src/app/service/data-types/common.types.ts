
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




//歌手
export interface Singer {
  id:number,
  name:string,
  picUrl:string,
  albumSize:number,
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
  picUrl:string,
  playCount:number,
  tracks:Song[],
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
