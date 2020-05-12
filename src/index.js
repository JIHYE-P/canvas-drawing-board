import './style.scss'
import { createElement, COLORS, WIDTH, HEIGHT, INIT_BG_COLOR, INIT_COLOR } from './utils'

const resizeBtn = document.querySelector('.canvas-resize')
const canvasWrap = document.querySelector('.draw-canvas')
const rangeWrap = document.querySelector('.control-range')
const btnWrap = document.querySelector('.control-btn')
const colorsWrap = document.querySelector('.control-colors')
const saveWrap = document.querySelector('.control-save')

const canvas = createElement('canvas', {id: 'canvas', width: WIDTH.value, height: HEIGHT.value})
const ctx = canvas.getContext('2d')
const controlColors = COLORS.map(hex => {
  return createElement('div', {style: `
    display: inline-block;
    margin: 0 8px;
    width: 40px;
    height: 40px;
    background: ${hex};
    border-radius: 50%; 
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    cursor: pointer;
  `})
})

let isFilling = false
let isPainting = false

const initDrawing = () => {
  ctx.fillStyle = INIT_BG_COLOR
  ctx.fillRect(0, 0, WIDTH, HEIGHT)
  // ctx.strokeStyle = INIT_COLOR
  // ctx.lineWidth = 3
  isPainting = false
}

const mousePoint = (canvas, ev) => {
  const {clientX, clientY} = ev
  const rect = canvas.getBoundingClientRect()
  return {pointX: clientX - rect.left, pointY: clientY - rect.top}
}

const handleMouseDown = () => isPainting = true
const handleMouseUp = () => isPainting = false
const handleMouseMove = (ev) => {
  const {pointX, pointY} = mousePoint(canvas, ev)
  const x = ev.offsetX;
  const y = ev.offsetY;
  if(isPainting) {
    ctx.beginPath();
    ctx.moveTo(pointX, pointY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
const main = () => {
  canvasWrap.appendChild(canvas)
  resizeBtn.addEventListener('click', () => {
    canvas.width = WIDTH.value; 
    canvas.height = HEIGHT.value
    // initDrawing()
  })
  controlColors.forEach(el => {
    colorsWrap.appendChild(el)
    el.addEventListener('click', (ev) => console.log(ev.target))
  })
  canvas.addEventListener('mousedown', handleMouseDown)
  canvas.addEventListener('mousemove', handleMouseMove)
  canvas.addEventListener('mouseup', handleMouseUp)
}

initDrawing()
main()


