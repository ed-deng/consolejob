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
        <p className="displayName">{display_name || username}</p>

        <div style={{ position: "relative", left: "50rem", top: "-6.5rem" }}>
          <a href="/logout">
            <img
              src="https://i.imgur.com/MCLYIJS.png"
              style={{
                borderRadius: 20,
                border: "1px solid grey",
              }}
            ></img>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
