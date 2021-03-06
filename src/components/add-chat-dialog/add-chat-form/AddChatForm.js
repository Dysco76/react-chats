import {
  Paper,
  Button,
  Typography,
  TextField,
  makeStyles,
} from "@material-ui/core"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import { nanoid } from "nanoid"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  addNewChatThunk,
  getConversationsNames,
} from "../../../store/conversations-list"
import { getUserInfo, updateRoomsCreatedFB } from "../../../store/profile"

export const AddChatForm = ({ handleModalClose }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const { roomsCreated, id, name } = useSelector(getUserInfo)
  const existingRooms = useSelector(getConversationsNames)

  const isUserAdmin = id === "inO6lM9qPISh0MTl8XcPgVKAsVf1"
  const [chatName, setChatName] = useState("New Room")
  const [errors, setErrors] = useState([])

  const ableToCreateRoom = () => {
    setErrors([])
    if (!isUserAdmin && roomsCreated > 1) {
      setErrors([
        "Created rooms limit exceeded. Please delete an existing room created by you",
      ])
      return false
    } else {
      if (!validateRoomName()) return false
    }
    return true
  }

  const validateRoomName = () => {
    const errorMessage = []
    if (chatName.trim().length > 100) {
      errorMessage.push("Room name cannot be longer than 100 characters")
    }

    if (!chatName.trim()) errorMessage.push("Room name cannot be empty")

    if (existingRooms.includes(chatName))
      errorMessage.push("Room already exists")

    if (errorMessage.length > 0) {
      setErrors((prev) => [...prev, ...errorMessage])
      return false
    }

    return true
  }

  const handleInputChange = (e) => {
    setChatName(e.target.value)
  }

  const handleAddChat = () => {
    if (!ableToCreateRoom()) return
    const newChat = {
      creator: {
        id,
        name,
      },
      id: String(Date.now()).slice(-4) + nanoid(),
      title: chatName.trim(),
    }

    dispatch(addNewChatThunk(newChat))
    dispatch(updateRoomsCreatedFB(id, "increment"))
    handleModalClose()
  }
  return (
    <Paper className={classes.addChatWrapper}>
      <Typography variant="h4" gutterBottom={true}>
        Add New Room
      </Typography>
      <div className={classes.addChatInputs}>
        <TextField
          variant="outlined"
          id="room_name"
          label="Room name"
          onChange={handleInputChange}
          value={chatName}
          placeholder="Name your room"
        />
        {errors.map((error) => (
          <span key={error} style={{ color: "red" }}>
            {error}
          </span>
        ))}
      </div>
      <div className={classes.buttonsWrapper}>
        <Button
          variant="contained"
          size="large"
          onClick={handleAddChat}
          color="primary"
          startIcon={<AddCircleIcon fontSize="large" />}
        >
          Add
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={handleModalClose}
          className={classes.cancelButton}
        >
          Cancel
        </Button>
      </div>
    </Paper>
  )
}

const useStyles = makeStyles({
  addChatWrapper: {
    position: "absolute",
    width: "580px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  addChatInputs: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
    textAlign: "center",
  },

  buttonsWrapper: {
    display: "flex",
    gap: "10px",
  },

  cancelButton: {
    backgroundColor: "#f44336",
    color: "#fff",
  },
})
