export function SpiderEvent(e:Event){
  e.stopPropagation()
  e.preventDefault()
}

export function getElementOffset(el:HTMLElement):{top:number,left:number}{
  const rect = el.getBoundingClientRect()
  const win = el.ownerDocument.defaultView

  return {
    top:rect.top + win!.pageYOffset,
    left:rect.left + win!.pageXOffset
  }
}
