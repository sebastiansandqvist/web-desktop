import stream from 'mithril/stream'

// App:
//  {
//    name: String,
//    icon: String or SVG path?,
//    height: Number,
//    width: Number
//  }

const state = {
  windows: {}, // { app: AppReference, x: Number, y: Number, 
  zIndexOrder: [] // array of window references (mousedown on any window does a `push`)
}

export function spawnWindow(contents) {

}
