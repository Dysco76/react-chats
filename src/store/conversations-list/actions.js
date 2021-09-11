import {
  HANDLE_CHANGE_MESSAGE_VALUE,
  CLEAR_MESSAGE_INPUT,
  SET_MESSAGE_ID,
} from "./types"

export const handleChangeMessageValue = (value, roomId) => ({
  type: HANDLE_CHANGE_MESSAGE_VALUE,
  payload: { value, roomId },
})
export const clearMessageInput = (roomId) => ({
  type: CLEAR_MESSAGE_INPUT,
  payload: { roomId },
})

export const setMessageId = (messageId, roomId) => ({
  type: SET_MESSAGE_ID,
  payload: { messageId, roomId },
})
