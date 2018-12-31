import React from "react";
import { Link } from "react-router-dom";

import m_city_logo from "../../resources/images/logos/manchester_city_logo.png";
const CityLogo = props => {
  const template = (
    <div
      className="img_cover"
      style={{ width: props.width, height: props.height,background:`url(${m_city_logo}) no-repeat` }}
    >
    </div>
  );
  if (props.link) {
    return (
      <Link to={props.linkTo} className="link_logo">
        {template}
      </Link>
    );
  } else {
    return template;
  }
};

export default CityLogo;
