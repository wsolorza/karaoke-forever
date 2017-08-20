const log = require('debug')('app:socket:player')
const getQueue = require('../Queue/getQueue')

const {
  REQUEST_PLAYER_NEXT,
  PLAYER_NEXT,
  REQUEST_PLAYER_PLAY,
  PLAYER_PLAY,
  REQUEST_PLAYER_PAUSE,
  PLAYER_PAUSE,
  REQUEST_PLAYER_VOLUME,
  PLAYER_VOLUME,
  EMIT_PLAYER_STATUS,
  PLAYER_STATUS,
  EMIT_PLAYER_ERROR,
  PLAYER_ERROR,
  EMIT_PLAYER_ENTER,
  PLAYER_ENTER,
  EMIT_PLAYER_LEAVE,
  PLAYER_LEAVE,
} = require('../../constants/actions')

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_PLAYER_NEXT]: async (sock, { payload }) => {
    // @todo: accept current queueId and pos so server
    // can decide whether to increment song play count
    sock.server.to(sock.user.roomId).emit('action', {
      type: PLAYER_NEXT,
      payload: await getQueue(sock.user.roomId),
    })
  },
  [REQUEST_PLAYER_PLAY]: async (sock, { payload }) => {
    sock.server.to(sock.user.roomId).emit('action', {
      type: PLAYER_PLAY,
    })
  },
  [REQUEST_PLAYER_PAUSE]: async (sock, { payload }) => {
    sock.server.to(sock.user.roomId).emit('action', {
      type: PLAYER_PAUSE,
    })
  },
  [REQUEST_PLAYER_VOLUME]: async (sock, { payload }) => {
    sock.server.to(sock.user.roomId).emit('action', {
      type: PLAYER_VOLUME,
      payload
    })
  },
  [EMIT_PLAYER_STATUS]: async (sock, { payload }) => {
    sock.server.to(sock.user.roomId).emit('action', {
      type: PLAYER_STATUS,
      payload,
    })
  },
  [EMIT_PLAYER_ERROR]: async (sock, { payload }) => {
    sock.server.to(sock.user.roomId).emit('action', {
      type: PLAYER_ERROR,
      payload,
    })
  },
  [EMIT_PLAYER_ENTER]: async (sock, { payload }) => {
    // so we can tell the room when player leaves
    sock._isPlayer = true

    sock.server.to(sock.user.roomId).emit('action', {
      type: PLAYER_ENTER,
      payload: {
        socketId: sock.id,
      }
    })
  },
  [EMIT_PLAYER_LEAVE]: async (sock, { payload }) => {
    sock.server.to(sock.user.roomId).emit('action', {
      type: PLAYER_LEAVE,
      payload: {
        socketId: sock.id,
      }
    })
  },
}

module.exports = ACTION_HANDLERS