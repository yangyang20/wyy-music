import {Lyric} from "../../../../service/data-types/common.types";

const timeExp = /\[(\d{1,2}):(\d{2})(?:\.(\d{2,3}))?\]/;
// const timeExp = /\[(.*?)\]/;

export interface BaseLyricLine {
  txt: string;
  txtCn: string;
}

interface LyricLine extends BaseLyricLine {
  time: number;
}

interface Handler extends BaseLyricLine {
  lineNum: number;
}


export interface WyLyricOriginal {
  sgc:boolean ,
  sfy: boolean,
  qfy: boolean,
  lrc: {
    version: number,
    lyric:string
  },
  klyric: {
    version: number,
    lyric: string
  },
  tlyric: {
    version: number,
    lyric: string
  },
  code: number
}

export class WyLyric {
  lrc: Lyric;

  lines: LyricLine[] = [];

  constructor(lrc: Lyric) {
    this.lrc = lrc;
    this.init();
  }

  init(){
    if (this.lrc.tlyric){
      this.generTLyric()
    }else {
      this.generLyric()
    }
  }

  private generLyric(){
    const lineArr = this.lrc.lyric.split("\n")
    lineArr.forEach(line=>{
      this.makeLine(line)
    })
    // console.log(this.lines);
  }

  private generTLyric(){
    const lineArr = this.lrc.lyric.split("\n")
    // const lineCnArr = this.lrc.tlyric.split("\n").filter(item => timeExp.exec(item) !== null)
    lineArr.forEach(line=>{

      let timeArr = timeExp.exec(line)
      if (timeArr){
        let temp = timeArr[0].substring(1, timeArr[0].length - 1)
        const timeCnExp = `${temp}.*?([一-龥]+).*?`
        const cnExp = new RegExp(timeCnExp)
        const lineCnstr = cnExp.exec(this.lrc.tlyric)
        if (lineCnstr){
          this.makeLine(line,lineCnstr[1])
        }else{
          this.makeLine(line)
        }
      }

    })
  }


  private makeLine(line: string, tline = ''){
    let lineTimeArr = timeExp.exec(line)
    let txt = line.replace(timeExp,'').trim()
    if (lineTimeArr){
      const time  = this.lineTimeFormat(<string[]>lineTimeArr)
      const txtCn = tline ? tline.replace(timeExp, '').trim() : '';
      this.lines.push({txt,txtCn,time})
    }

  }

  private lineTimeFormat(lineTimeArr:string[]){
    const thirdResult = lineTimeArr[3] || '00';
    const len = thirdResult.length;
    const _thirdResult = len > 2 ? parseInt(thirdResult) : parseInt(thirdResult) * 10;
    const time = Number(lineTimeArr[1]) * 60 * 1000 + Number(lineTimeArr[2]) * 1000 + _thirdResult;
    return time
  }


  findCurNum(time: number): number {
    const index = this.lines.findIndex(item => time <= item.time);
    return index === -1 ? this.lines.length - 1 : index;
  }


}
