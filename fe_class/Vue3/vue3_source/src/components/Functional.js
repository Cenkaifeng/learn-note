import { h } from 'vue'

export default function Functional(props, context) {
  return h('div',
    context.attrs,
    props.id
  )
}

Functional.props = ['id']