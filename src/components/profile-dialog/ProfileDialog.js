import {
  Drawer,
  Paper,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Modal,
  Backdrop,
  Fade,
  makeStyles,
} from "@material-ui/core"
import { Close, AccountCircle } from "@material-ui/icons"
import React, { useState, useCallback } from "react"
import { useSelector } from "react-redux"
import { EditProfileForm, Logout } from "../"
import { getUserInfo } from "../../store/profile"

export const ProfileDialog = () => {
  const classes = useStyles()

  const { name, phone, id, roomsCreated } = useSelector(getUserInfo)

  const [openProfile, setOpenProfile] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const handleProfileOpen = () => {
    setOpenProfile(true)
  }

  const handleProfileClose = () => {
    setOpenProfile(false)
  }

  const handleEditOpen = () => {
    setOpenEdit(true)
  }

  const handleEditClose = useCallback(() => {
    setOpenEdit(false)
  }, [setOpenEdit])

  return (
    <div className={classes.wrapper}>
      <Button
        color="primary"
        startIcon={<AccountCircle />}
        className={classes.openButton}
        onClick={handleProfileOpen}
      >
        Profile
      </Button>
      <Drawer
        open={openProfile}
        anchor="left"
        variant="persistent"
        classes={{
          docked: classes.docked,
          paper: classes.paper,
        }}
      >
        <Paper className={classes.paper}>
          <IconButton
            data-action="close-profile"
            onClick={handleProfileClose}
            className={classes.closeButton}
          >
            <Close />
          </IconButton>
          <Paper className={classes.infoWrapper} elevation={0}>
            <Avatar className={classes.avatar}>
              <AccountCircle className={classes.avatarIcon} />
            </Avatar>
            <List className={classes.profileList}>
              <ListItem>
                <ListItemText className={classes.profileLi}>
                  Name: {name}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText className={classes.profileLi}>
                  Phone: {phone}
                </ListItemText>
              </ListItem>
            </List>
            <Button variant="outlined" onClick={handleEditOpen}>
              Edit Profile
            </Button>
          </Paper>
          <Logout style={{ margin: "auto 0 20px" }} />
        </Paper>
      </Drawer>

      <Modal
        open={openEdit}
        onClose={handleEditClose}
        closeAfterTransition={true}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openEdit}>
          <>
            <EditProfileForm
              handleEditClose={handleEditClose}
              info={{ name, phone, id, roomsCreated }}
            />
          </>
        </Fade>
      </Modal>
    </div>
  )
}

const useStyles = makeStyles({
  paper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  openButton: {
    marginLeft: "20px",
  },

  closeButton: {
    position: "absolute",
    right: "5px",
    top: "5px",
  },

  infoWrapper: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box",
  },

  avatar: {
    width: "70px",
    height: "70px",
  },

  avatarIcon: {
    width: "100%",
    height: "100%",
  },

  profileList: {
    width: "100%",
  },

  profileLi: {
    wordWrap: "break-word",
  },
})
