import { compose, Dispatch, Middleware, Action, Store, MiddlewareAPI } from 'redux'
import partial from 'lodash/fp/partial'
import partialRight from 'lodash/fp/partialRight'

// Action types to be dispatched by the user
export const WEBSOCKET_CONNECT = 'WEBSOCKET:CONNECT'
export const WEBSOCKET_DISCONNECT = 'WEBSOCKET:DISCONNECT'
export const WEBSOCKET_SEND = 'WEBSOCKET:SEND'

// Action types dispatched by the WebSocket implementation
export const WEBSOCKET_CONNECTING = 'WEBSOCKET:CONNECTING'
export const WEBSOCKET_OPEN = 'WEBSOCKET:OPEN'
export const WEBSOCKET_CLOSED = 'WEBSOCKET:CLOSED'
export const WEBSOCKET_MESSAGE = 'WEBSOCKET:MESSAGE'
export const WEBSOCKET_DISCONNECTING = 'WEBSOCKET:DISCONNECTING'

export type WebSocketConfig = {
  url: string,
  protocols?: string | Array<string>
  restart?: false,
  binaryType?: 'arraybuffer' | 'blob' | 'nodebuffer'
}

interface WebSocketEvent extends Action {
  payload: {
    timestamp: Date,
    event: Event
  }
}

function createWebsocket(config: WebSocketConfig): WebSocket {
  const socket = new WebSocket(config.url, config.protocols)
  socket.binaryType = config.binaryType || socket.binaryType
  return socket
}

function open(event: Event): WebSocketEvent {
  return {
    type: WEBSOCKET_OPEN,
    payload: {
      timestamp: new Date(),
      event
    }
  }
}

function closed(event: Event): WebSocketEvent {
  return {
    type: WEBSOCKET_CLOSED,
    payload: {
      timestamp: new Date(),
      event
    }
  }
}

function message(event: Event): WebSocketEvent {
  return {
    type: WEBSOCKET_MESSAGE,
    payload: {
      timestamp: new Date(),
      event
    }
  }
}

type WebSocketInitAction = Action & {
  payload: WebSocketConfig
}

function isConnectAction(action: Action): action is WebSocketInitAction {
  return action.type === WEBSOCKET_CONNECT
}


const createMiddleware = (): Middleware => {
  let websocket: WebSocket | null = null

  function createSocket({ dispatch }: Store<any>, config: WebSocketConfig) {
    websocket = createWebsocket(config)

    // Function will dispatch actions returned from action creators.
    const dispatchAction = partial(compose, [dispatch])

    // Setup handlers to be called like this:
    // dispatch(open(event))
    websocket.onopen = dispatchAction(open)
    websocket.onclose = dispatchAction(closed)
    websocket.onmessage = dispatchAction(message)
  }

  const close = () => {
    websocket.close()
    websocket = null
  }
  return (api: MiddlewareAPI<any>) => (next: Dispatch<void>) => (action: A extends Action) => {
    if (isConnectAction(action)) {
      close()
      createSocket(api, action.payload)
      return next(action)
    } else if (action.type === WEBSOCKET_DISCONNECT) {

    }

      // User request to disconnect
      case WEBSOCKET_DISCONNECT:
close()
next(action)
break

      // User request to send a message
      case WEBSOCKET_SEND:
if (websocket) {
  websocket.send(JSON.stringify(action.payload))
}
next(action)
break

      case WEBSOCKET_OPEN:
attempts = 1
next(action)
break

      case WEBSOCKET_CLOSED: {
  const time = generateInterval(attempts)

  setTimeout(() => {
    // We've tried to reconnect so increment the attempts by 1
    attempts += 1
    createSocket(store, websocketConfig)
  }, time)
  next(action)
}
break
      default:
next(action)
    }
  }
}

export default createMiddleware()
