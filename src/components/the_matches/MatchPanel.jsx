import React, { Component } from 'react'
import CircularProgress from "@material-ui/core/CircularProgress";

import { firebaseMatches } from '../../firebase';
import { firebaseLooper, reverseArray } from '../ui/Misc';

import LeagueTable from './table';
import MatchesList from './MatchesList';

 class MatchPanel extends Component {

  state = {
    isLoading : true,
    matches : [],
    filterMatches :[],
    playerFilter : 'All',
    resultFilter : 'All'
  }

  componentDidMount() {
    firebaseMatches.once('value').then((snapshot) => {
      const matches = firebaseLooper(snapshot);

      this.setState({
        loading : false,
        matches : reverseArray(matches),
        filterArray : reverseArray(matches)
      }) 
    }) 

  }

  render() {
    const { isLoading, filterMatches } = this.state
    return (
      <div className="the_matches_container">
        <div className="the_matches_wrapper">
          <div className="left">
            <div className="match_filters">

            </div> 

            <MatchesList matches={filterMatches}/>

          </div>
          <div className="right">
            <LeagueTable />
          </div>
        </div>
      </div>
    )
  }
}

export default MatchPanel;