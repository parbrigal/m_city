import React from "react";
import Blocks from './Blocks';
import { Tag } from "../../ui/Misc";

const Matches = () => {
  return (
    <div className="home_matches_wrapper">
      <div className="container">
        <Tag bck="#0e1731" size="50px" color="#ffffff" /*add ={{}}*/>
          Matches
        </Tag>
        <Blocks />
        <Tag bck="#fff" size="22px" color="#0e1731" link={true} linkto="/admin_matches">See more matches</Tag>
      </div>
    </div>
  );
};

export default Matches;
