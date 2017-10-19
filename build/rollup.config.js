import buble from 'rollup-plugin-buble'
import filesize from 'rollup-plugin-filesize'

export default {
  input: 'src/index.js',
  output: {
    file: 'public/js/bundle.js',
    format: 'iife'
  },
  plugins: [
    buble(),
    filesize()
  ]
}
