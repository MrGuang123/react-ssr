import { createStore } from 'redux'

const initData = {
  data: null
}

function reducer(state = initData, action) {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        ...action.payload
      }
    default:
      return { ...state }
  }
}

export function createClientStore() {
  return createStore(reducer, (window as any).REDUX_STORE)
}
export function createServerStore() {
  return createStore(reducer)
}