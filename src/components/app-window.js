import m from 'mithril'
import Icon from './icon'
import { closeActiveWindow } from '../window-manager'
import { removeFromArray } from '../util'
import { redraw } from '../index'

const isTopWindow = (app, zIndexOrder) => zIndexOrder[zIndexOrder.length -1] === app

const MIN_Z_INDEX = 10
function getAppWindowStyle ({ app, windowState }) {
  return {
    transform: `translate(${app.x}px, ${app.y}px)`,
    zIndex: String(MIN_Z_INDEX + windowState.zIndexOrder.indexOf(app))
  }
}

function AppWindow ({ attrs }) {
  const { app, windowState } = attrs
  
  let el = null
  let canDragWindow = false
  let x = 0
  let y = 0

  const moveWindow = function(e) {
    if (!canDragWindow) return
    
    // update within app just in case of redraw, but this only keeps the data in sync (does not actually reposition until a redraw)
    app.x = e.clientX - x
    app.y = e.clientY - y

    // actually perform move:
    el.style.transform = `translate(${app.x}px, ${app.y}px)`
  }

  const endMoveWindow = function() {
    // handles snap on edge overflow:
    const rightEdge = window.innerWidth - 200
    const bottomEdge = window.innerHeight - 40
    if (app.x < 0) app.x = 0
    if (app.y < 0) app.y = 0
    if (app.x > rightEdge) app.x = rightEdge
    if (app.y > bottomEdge) app.y = bottomEdge
    el.style.transform = `translate(${app.x}px, ${app.y}px)`
    canDragWindow = false
  }

  const beginMoveWindow = function(e) {
    const rect = el.getBoundingClientRect()
    canDragWindow = true
    x = e.clientX - rect.left
    y = e.clientY - rect.top
    document.onmousemove = moveWindow
    document.onmouseup = endMoveWindow
  }


  return {
    view () {
      return (
        m('.app-window', {
          oncreate ({ dom }) { el = dom },
          className: isTopWindow(app, windowState.zIndexOrder) ? 'active' : '',
          style: getAppWindowStyle(attrs),
          onmousedown () {
            removeFromArray(windowState.zIndexOrder, app)
            windowState.zIndexOrder.push(app)
            redraw()
          }
        },
          m('.app-header', { onmousedown: beginMoveWindow },
            m(Icon, { className: 'icon-small', name: app.icon }),
            m('span.app-title', app.name),
            m('span.app-close', { onclick: closeActiveWindow }, '×')
          ),
          m('.app-body',
            m(app.component)
          )
        )
      )
    }
  }
}

export default AppWindow
