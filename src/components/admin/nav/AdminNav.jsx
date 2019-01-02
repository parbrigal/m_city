import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import { firebase } from "../../../firebase";

const AdminNav = () => {

  const links = [
    {
      title: "Matches",
      linkTo: "/admin_matches"
    },
    {
      title: "Add Matches",
      linkTo: "/admin_matches/new_match"
    },
    {
      title: "Players",
      linkTo: "/admin_players"
    },
    {
      title: "Add Players",
      linkTo: "/admin_players/new_player"
    }
  ];

  const style = {
    color: "#ffffff",
    fontWeight: "300",
    borderBottom: "1px sold #353535"
  };

  const renderItems = () =>
    links.map(link => (
      <Link to={link.linkTo} key={link.title}>
        <ListItem button style={style}>
          {link.title}
        </ListItem>
      </Link>
    ));

  const logOutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {console.log("Logged Out")},(err) => console.log("error logging out"));
  };

  return (
    <div>
      {renderItems()}
      <ListItem button style={style} onClick={() => logOutHandler()}>
        Log Out
      </ListItem>
    </div>
  );
};

export default AdminNav;
