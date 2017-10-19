import m from 'mithril'
import Icon from './icon'
import { spawnWindow } from '../window-manager'

// TODO: store this in another file
const apps = [
  { appName: 'Browser', appIcon: 'TODO' },
  { appName: 'Chat', appIcon: 'chat' },
  { appName: 'Memory', appIcon: 'TODO' },
  { appName: 'Tetris', appIcon: 'TODO' }
]

function Dock() {
  // const model = dockModel()
  return {
    view() {
      return [
        m('ul.dock',
          apps.map(({ appName, appIcon }) => (
            m('li.dock-app', { onclick() { alert('would spawn window') } },
              m(Icon, { className: 'icon-large', name: appIcon }),
              m('.dock-app-title', appName)
            )
          ))
         )
      ]
    }
  }
}

export default Dock
