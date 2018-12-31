import React, { Component } from "react";
import MatchBlock from '../matches/MatchBlock';
import Slide from 'react-reveal/Slide';
import { firebaseMatches } from "../../../firebase";
import { firebaseLooper, reverseArray } from "../../ui/Misc";


class Blocks extends Component {
  state = {
    matches: []
  };

  componentDidMount() {
    firebaseMatches
      .limitToLast(6)
      .once("value")
      .then(snapshot => {
        const matches = firebaseLooper(snapshot);
        this.setState({
          matches: reverseArray(matches)
        });
      });
  }

  showMatches = matches =>
    matches.map(mtch => (
      <Slide bottom key={mtch.id}>
        <div className="item">
          <div className="wrapper"> 
            <MatchBlock match={mtch}/>
          </div>
        </div>
      </Slide>
    ));

  render() {
    return (
      <div className="home_matches">{this.showMatches(this.state.matches)}</div>
    );
  }
}

export default Blocks;
