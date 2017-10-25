import m from 'mithril'
import stream from 'mithril/stream'
import { redraw } from '../../index'

const styles = {
  input: {
    width: '70%'
  },
  frame: {
    border: '0',
    display: 'block',
    height: '300px',
    width: '100%'
  }
}

function Browser () {
  const historyStack = []
  const url = stream('')
  // const currentPage = stream('https://duckduckgo.com')

  const back = function () {
    currentPage(historyStack.pop())
    redraw()
  }

  const navigate = function (e) {
    e.preventDefault()
    historyStack.push(url())
    // currentPage(url())
    redraw()
  }

  return {
    view () {
      return [
        m('form', { onsubmit: navigate },
          m('button', { onclick: back }, '←'),
          m('input[type=url]', {
            oninput (e) { url(e.target.value) },
            placeholder: currentPage(),
            style: styles.input,
            value: url()
          }),
          m('button[type=submit]', 'Go')
        )
      ]
    }
  }
}

export default Browser
