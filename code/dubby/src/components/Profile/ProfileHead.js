import React from "react";
import User from "../../image/user.svg";

const styles = {
  chat: {
    container: { textAlign: "center" },
    img: {
      width: "60px",
      height: "60px",
      overflow: "hidden",
      borderRadius: "30px",
      border: "2px solid #eee",
    },
  },
  profile: {
    container: { textAlign: "center", display: "block", margin: "1rem" },
    img: {
      width: "200px",
      height: "200px",
      overflow: "hidden",
      borderRadius: "100px",
      border: "5px solid #eee",
    },
  },
  friend: {
    container: { textAlign: "center" },
    img: {
      width: "2rem",
      height: "2rem",
      overflow: "hidden",
      borderRadius: "1rem",
      border: "1px solid #eee",
    },
  },
  inline: {
    container: { textAlign: "center" },
    img: {
      width: "1rem",
      height: "1rem",
      overflow: "hidden",
      borderRadius: "0.5rem",
      border: "1px solid #eee",
    },
  },
  default: {
    container: { display: "none" },
    img: { display: "none" },
  },
};

const ProfileHead = ({ src, size }) => {
  // src = profileImageSrc in user data
  // size = any of "chat", "profile", "friend", "inline"
  let style;
  switch (size) {
    case "chat":
      style = styles.chat;
      break;
    case "profile":
      style = styles.profile;
      break;
    case "friend":
      style = styles.friend;
      break;
    case "inline":
      style = styles.inline;
      break;
    default:
      style = styles.default;
      break;
  }

  // render
  return (
    <span style={style.container}>
      <img src={src || User} style={style.img} alt="" />
    </span>
  );
};

export default ProfileHead;
