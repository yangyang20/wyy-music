
export function getHideDomSize(dom:HTMLElement):{w:number,h:number}{
  return {
    w:dom.offsetWidth,
    h:dom.offsetHeight
  }
}

export function getWinSize(){
  return {
    w:window.innerWidth || document.documentElement.clientWidth || document.body.offsetWidth,
    h:window.innerHeight || document.documentElement.clientHeight || document.body.offsetHeight
  }
}

export function keepCenter(modal:HTMLElement,size:{w:number,h:number}){
  const left = (getWinSize().w - size.w) /2
  const top = (getWinSize().h - size.h) /2
  modal.style.left = String(left) + 'px'
  modal.style.top = String(top) + 'px'
}
