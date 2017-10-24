import m from 'mithril'
import App from './app'

const mountNode = document.getElementById('app')
export const redraw = () => m.render(mountNode, m(App))

redraw()
