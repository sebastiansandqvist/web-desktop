import m from 'mithril'

const icons = {
  empty: m('path', { d: '' }),
  chat: m('g', [
    m('path', { 'fill-opacity': '0.5', d: 'm5.8 11.2v-6.2h-3.8c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h1v3l3-3h5c1.1 0 2-.9 2-2v-1.82c-.064.014-.132.021-.2.021h-7v-.001' }),
    m('path', { d: 'm18 0h-9c-1.1 0-2 .9-2 2v8h7l3 3v-3h1c1.1 0 2-.899 2-2v-6c0-1.1-.9-2-2-2' })
  ])
}

const Icon = {
  view({ attrs }) {
    return [
      m('svg.icon', { className: attrs.className || '', viewBox: '0 0 20 20' }, icons[attrs.name] || icons.empty)
    ]
  }
}

export default Icon
