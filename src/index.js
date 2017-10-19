import m from 'mithril'
import Dock from './components/dock'

const app = {
  view() {
    return [
      m('', 'test'),
      m(Dock)
    ]
  }
}

const mountNode = document.getElementById('app')
m.render(mountNode, m(app))
