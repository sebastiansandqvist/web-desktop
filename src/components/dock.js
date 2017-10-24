import m from 'mithril'
import Icon from './icon'
import apps from '../apps/app-manifest'
import { spawnWindow, windowState } from '../window-manager'

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
    view () {
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
