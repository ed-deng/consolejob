import React from "react";

function Header(props) {
  const {
    username,
    gh_id,
    profile_url,
    display_name,
    photo_url,
  } = props.userInfo;
  return (
    <div>
      <h1
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          marginBottom: "4rem",
        }}
      >
        ConsoleJob
      </h1>
      <div className="userInfo">
        <img className="profilePic" src={photo_url} alt="Profile Pic" />
        <p className="displayName">{display_name}</p>
      </div>
    </div>
  );
}

export default Header;
