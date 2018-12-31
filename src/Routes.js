import React from 'react';
import Layout from './hoc/Layout';
import { Switch } from 'react-router-dom';

import Home from './components/home/Home';
import SignIn from './components/signin/SignIn'

import Dashboard from './components/admin/Dashboard';

import Matches from './components/admin/matches/Matches';
import MatchEditor from './components/admin/matches/MatchEditor';

import Players from './components/admin/players/Players';
import PlayerEditor from './components/admin/players/PlayerEditor';

import PrivateRoutes from './components/authRoutes/PrivateRoutes';
import PublicRoutes from './components/authRoutes/PublicRoutes';

const Routes = (props) => {
  return (
    <div>
      <Layout>
        <Switch>
          <PrivateRoutes {...props} exact component={Matches} path="/admin_matches" />
          <PrivateRoutes {...props} exact component={MatchEditor} path="/admin_matches/new_match" />
          <PrivateRoutes {...props} exact component={MatchEditor} path="/admin_matches/edit_match/:id" />
          <PrivateRoutes {...props} exact component={Players} path="/admin_players" />
          <PrivateRoutes {...props} exact component={PlayerEditor} path="/admin_players/edit_player/:id" />
          <PrivateRoutes {...props} exact component={Dashboard} path="/dashboard" />
          <PublicRoutes {...props} restricted={false} exact path="/" component={Home} />
          <PublicRoutes {...props} restricted={true} exact path="/sign_in" component={SignIn} />
        </Switch>
      </Layout>
    </div>
  )
}

export default Routes;
