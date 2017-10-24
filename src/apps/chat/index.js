import m from 'mithril'
import stream from 'mithril/stream'
import { redraw } from '../../index'

const styles = {
  input: {
    boxSizing: 'border-box',
    margin: '5px',
    padding: '5px',
    width: 'calc(80% - 15px)'
  },
  button: {
    boxSizing: 'border-box',
    width: '20%'
  },
  messages: {
    background: '#eee',
    height: '160px',
    padding: '10px',
    overflowY: 'scroll'
  },
  message (isSelf) {
    const bg = isSelf ? '#bcf' : '#fff'
    return {
      background: bg,
      borderRadius: '3px',
      marginBottom: '10px',
      padding: '5px'
    }
  },
  username: {
    fontWeight: '700',
    padding: '2px 0 5px 0'
  }
}

const address = 'ws://vhost3.lnu.se:20080/socket/'

// NOTE: this opens the websocket immediately on application launch
// (could instead do this in each instance of the chat application)
const connection = {
  socket: new WebSocket(address),
  messages: [],
  isLoggedIn: false,
  username: stream('')
}

function login (e) {
  e.preventDefault()
  connection.isLoggedIn = true
  redraw()
}

const ChatLogin = {
  view () {
    return (
      m('form', { onsubmit: login },
        m('input[type=text]', {
          oninput (e) { connection.username(e.target.value) },
          style: styles.input,
          value: connection.username()
        }),
        m('button[type=submit]', { style: styles.button }, 'Sign in')
      )
    )
  }
}

function message (text) {
  return {
    type: 'message',
    data: text,
    username: connection.username(),
    channel: 'my, not so secret, channel',
    key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
  }
}


let isInitialized = false

function ChatApplication () {
  const currentMessage = stream('')
  let messageElement = null

  if (!isInitialized) {
    isInitialized = true
  
    // NOTE: will currently continue listening after chat is closed
    connection.socket.addEventListener('message', function (e) {
      const response = JSON.parse(e.data)
      if (response.type === 'message') {
        connection.messages.push({ username: response.username, message: response.data })
        redraw()
      }
    })
  }

  const sendMessage = function (e) {
    e.preventDefault()
    connection.socket.send(JSON.stringify(message(currentMessage())))
    currentMessage('')
    redraw()
  }

  const onMessage = () => { messageElement.scrollTop = messageElement.scrollHeight }
  connection.socket.addEventListener('message', onMessage)

  return {
    onremove () {
      connection.socket.removeEventListener('message', onMessage)
    },
    view () {
      return [
        m('', {
          style: styles.messages,
          oncreate({ dom }) {
            messageElement = dom
          }
        },
          connection.messages.map(({ username, message }) => (
            m('', { style: styles.message(username === connection.username()) },
              m('', { style: styles.username }, username),
              m('', message)
            )
          ))
        ),
        m('form', { onsubmit: sendMessage },
          m('input[type=text]', {
            oninput (e) { currentMessage(e.target.value) },
            style: styles.input,
            value: currentMessage()
          }),
          m('button[type=submit]', { style: styles.button }, 'Send')
        )
      ]
    }
  }
}

function Chat () {
  return {
    view () {
      return connection.isLoggedIn ?
        m(ChatApplication) :
        m(ChatLogin)
    }
  }
}

export default Chat
