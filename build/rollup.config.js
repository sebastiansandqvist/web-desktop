import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import node from 'rollup-plugin-node-resolve'
import filesize from 'rollup-plugin-filesize'

export default {
  name: 'pwd',
  input: 'src/index.js',
  output: {
    file: 'public/js/bundle.js',
    format: 'iife'
  },
  plugins: [
    commonjs(),
    node(),
    buble(),
    filesize()
  ]
}
