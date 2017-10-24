import m from 'mithril'
import Dock from './components/dock'
import AppWindow from './components/app-window'
import { windowState } from './window-manager'

const App = {
  view () {
    return [
      m(Dock),
      m('.app-windows', windowState.zIndexOrder.map((app) => (
        m(AppWindow, { app, windowState, key: app.windowNumber })
      )))
    ]
  }
}

export default App
