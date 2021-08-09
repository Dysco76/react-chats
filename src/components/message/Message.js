import { Paper, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  message: {
    position: "relative",
    margin: "10px 0",
    marginRight: "5%",
    alignSelf: "flex-end",
    backgroundColor: "#e0f2f1",
    maxWidth: "500px",
    textAlign: "left",
    borderRadius: "5px",
    padding: "10px",
    overflowWrap: "break-word",

    "&::before": {
      content: '""',
      width: "0px",
      height: "0px",
      position: "absolute",
      borderLeft: "10px solid #e0f2f1",
      borderRight: "10px solid transparent",
      borderTop: "10px solid #e0f2f1",
      borderBottom: "10px solid transparent",
      right: "-10px",
      top: "6px",
    },
  },

  messageIncoming: {
    marginLeft: "5%",
    alignSelf: "flex-start",
    backgroundColor: "#fff",

    "&::before": {
      content: '""',
      width: "0px",
      height: "0px",
      position: "absolute",
      borderLeft: "10px solid transparent",
      borderRight: "10px solid #fff",
      borderTop: "10px solid #fff",
      borderBottom: "10px solid transparent",
      left: "-10px",
      top: "6px",
    },
  },

  messageContent: {
    fontSize: "20px",
  },

  author: {
    color: "#4caf50",
    margin: 0,
  },

  sb1: {},
})

export function Message({ message: { value, author } }) {
  const classes = useStyles()
  return (
    <Paper
      className={`${classes.message} ${classes.sb1} ${
        author === "bot" ? classes.messageIncoming : ""
      }`}
      elevation={3}
    >
      <div className={classes.messageContent}>
        <p className={classes.author}>{author}:</p> {value}
      </div>
    </Paper>
  )
}
