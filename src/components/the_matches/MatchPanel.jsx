import React, { Component } from 'react'
import CircularProgress from "@material-ui/core/CircularProgress";

import { firebaseMatches } from '../../firebase';
import { firebaseLooper, reverseArray } from '../ui/Misc';

import LeagueTable from './table';
import MatchesList from './MatchesList';

class MatchPanel extends Component {

  state = {
    isLoading: true,
    matches: [],
    filterMatches: [],
    playedFilter: 'All',
    resultFilter: 'All'
  }

  componentDidMount() {
    firebaseMatches.once('value').then((snapshot) => {
      const matches = firebaseLooper(snapshot);

      this.setState({
        loading: false,
        matches: reverseArray(matches),
        filterMatches: reverseArray(matches)
      })
    })

  }

  showPlayed = (status) => {
    const list = this.state.matches.filter((match) => {
      return match.final === status;
    })

    this.setState({
      filterMatches: status === 'All' ? this.state.matches : list,
      playedFilter: status,
      resultFilter: 'All'
    })
  }

  showResult = (result) => {

    const list = this.state.matches.filter((match) => {
      return match.result === result;
    })

    this.setState({
      filterMatches: result === 'All' ? this.state.matches : list,
      playedFilter: 'All',
      resultFilter: result
    })

  }

  render() {
    const { isLoading, filterMatches, playedFilter,resultFilter } = this.state
    return (
      <div className="the_matches_container">
        <div className="the_matches_wrapper">
          <div className="left">
            <div className="match_filters">
              <div className="match_filters_box">
                <div className="tag">
                  Show Match
                </div>
                <div className="cont">
                  <div className={`option ${playedFilter === 'All' ? 'active' : ''}`} onClick={() => this.showPlayed('All')}>
                    All
                  </div>
                  <div className={`option ${playedFilter === 'Yes' ? 'active' : ''}`} onClick={() => this.showPlayed('Yes')}>
                    Played
                  </div>
                  <div className={`option ${playedFilter === 'No' ? 'active' : ''}`} onClick={() => this.showPlayed('No')}>
                    Not Played
                  </div>
                </div>
              </div>
              <div className="match_filters_box">
                <div className="tag">
                  Game Results
                </div>
                <div className="cont">
                  <div className={`option ${resultFilter === 'All' ? 'active' : ''}`} onClick={() => this.showResult('All')}>
                    All
                  </div>
                  <div className={`option ${resultFilter === 'W' ? 'active' : ''}`} onClick={() => this.showResult('W')}>
                    W
                  </div>
                  <div className={`option ${resultFilter === 'L' ? 'active' : ''}`} onClick={() => this.showResult('L')}>
                    L
                  </div>
                  <div className={`option ${resultFilter === 'D' ? 'active' : ''}`} onClick={() => this.showResult('D')}>
                    D
                  </div>
                </div>
              </div>
            </div>

            <MatchesList matches={filterMatches} />

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