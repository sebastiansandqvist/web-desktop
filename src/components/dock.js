import m from 'mithril'
import Icon from './icon'
import { spawnWindow, windowState } from '../window-manager'

// TODO: own file in ../apps/browser!
const Browser = {
  view () {
    return m('div', 'browser!!!!!')
  }
}

const Chat = {
  view () {
    return m('div', 'chat!!!!!!')
  }
}

// TODO: own file (app manifest in root of apps folder)
const apps = [
  { name: 'Browser', icon: 'globe', component: Browser },
  { name: 'Chat', icon: 'chat', component: Chat },
  { name: 'Memory', icon: 'eye' },
  { name: 'Tetris', icon: 'TODO' }
]

let instanceCounter = 0
function makeAppInstance ({ name, icon, component }) {
  return {
    name,
    icon,
    component,
    x: windowState.nextX,
    y: windowState.nextY,
    windowNumber: instanceCounter++
  }
}

function Dock () {
  // const model = dockModel()
  return {
    view() {
      return [
        m('ul.dock',
          apps.map((app) => (
            m('li.dock-app', { onclick: () => spawnWindow(makeAppInstance(app)) },
              m(Icon, { className: 'icon-large', name: app.icon }),
              m('.dock-app-title', app.name)
            )
          ))
         )
      ]
    }
  }
}

export default Dock
