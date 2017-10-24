// import stream from 'mithril/stream'
import m from 'mithril'
import AppWindow from './components/app-window'
import { redraw } from './'

// App:
//  {
//    name: String,
//    icon: String or SVG path?,
//    height: Number,
//    width: Number
//  }

const WINDOW_V_SPACING = 30
const WINDOW_H_SPACING = 20
const V_OFFSET = 120
const H_OFFSET = 80
const MAX_HEIGHT = () => window.innerHeight - V_OFFSET
const MAX_WIDTH = () => window.innerWidth - H_OFFSET

export const windowState = {
  wrapCount: 0,
  nextX: WINDOW_H_SPACING,
  nextY: WINDOW_V_SPACING,
  zIndexOrder: [] // array of window references (mousedown on any window does a `push`)
}

export function spawnWindow (app) {
  console.log(windowState.nextX, windowState.nextY, MAX_WIDTH(), MAX_HEIGHT())
  if (windowState.nextY >= MAX_HEIGHT()) {
    windowState.wrapCount++
    windowState.nextX = windowState.wrapCount * WINDOW_H_SPACING * 2 // * 2 is arbitrary multiplier for aesthetics
    windowState.nextY = 0
  }
  if (windowState.nextX >= MAX_WIDTH()) {
    windowState.wrapCount = 0
    windowState.nextX = 0
    windowState.nextY = 0
  }
  windowState.nextX += WINDOW_H_SPACING
  windowState.nextY += WINDOW_V_SPACING
  windowState.zIndexOrder.push(app)
  // console.log(windowState)
  redraw()
}
