import React, { Component } from "react";
import AdminLayout from "../../../hoc/AdminLayout";
import FormField from "../../ui/FormField";
import { validate } from "../../ui/Misc";

import {firebaseTeams, firebaseDB, firebaseMatches} from '../../../firebase';
import { firebaseLooper } from "../../ui/Misc";

class MatchEditor extends Component {
  state = {
    matchId: "",
    type: "",
    formError: false,
    formSuccess: "",
    teams: [],
    formData: {
      date: {
        element: "input",
        value: "",
        config: {
          label: "Event Date",
          name: "date_input",
          type: "date"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      local: {
        element: "select",
        value: "",
        config: {
          label: "Local Team",
          name: "select_local",
          type: "select",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      },
      resultLocal: {
        element: "input",
        value: "",
        config: {
          label: "Result Local",
          name: "result_local_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      },
      away: {
        element: "select",
        value: "",
        config: {
          label: "Away Team",
          name: "select_away",
          type: "select",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      },
      resultAway: {
        element: "input",
        value: "",
        config: {
          label: "Result Away",
          name: "result_away_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      },
      referee: {
        element: "input",
        value: "",
        config: {
          label: "Referee",
          name: "referee_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      stadium: {
        element: "input",
        value: "",
        config: {
          label: "Stadium",
          name: "stadium_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      result: {
        element: "select",
        value: "",
        config: {
          label: "Team Result",
          name: "select_result",
          type: "select",
          options: [
            {
              key: "W",
              value: "W"
            },
            {
              key: "L",
              value: "L"
            },
            {
              key: "D",
              value: "D"
            },
            {
              key: "n/a",
              value: "n/a"
            }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      final: {
        element: "select",
        value: "",
        config: {
          label: "Game Played",
          name: "select_played",
          type: "select",
          options: [
            {
              key: "Y",
              value: "Yes"
            },
            {
              key: "N",
              value: "No"
            }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      }
    }
  };

  updateForm = (element) => {
    const newFormData = {...this.state.formData}
    const newElement = {...newFormData[element.id]}
    newElement.value = element.event.target.value;

    let isValid = validate(newElement);
    newElement.valid = isValid[0];
    newElement.validationMessage = isValid[1];

    newFormData[element.id] = newElement;

    this.setState({
      formError : false, 
      formData : newFormData
    })
  }

  updateFieldOptions(match,teamOptions,teams,type,matchId) {
    const newFormData = {
      ...this.state.formData
    }

    for (let key in newFormData) {
      if(match) {
        newFormData[key].value = match[key]
        newFormData[key].valid = true
      }
      if (key === 'local' || key === 'away') {
        newFormData[key].config.options = teamOptions;
      }
    }
    this.setState({
      matchId,
      type,
      formData : newFormData,
      teams
    })
  }

  successForm(message) {
    this.setState({
      formSuccess : message
    })

    setTimeout(() => {
      this.setState({
        formSuccess : ''
      })
    },2000); 
  }

  submitForm = (evt) => {
    evt.preventDefault();

    let dataToSubmit = {} 
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid 
    }

    this.state.teams.forEach((team) => {
      if(team.shortName === dataToSubmit.localteam)
      {
        dataToSubmit['localThmb'] = team.thmb;
      }
      if(team.shortName === dataToSubmit.awayteam)
      {
        dataToSubmit['awayThmb'] = team.thmb;
      }
    })

    if (formIsValid) {
      if (this.state.type === 'Edit Match') {
        firebaseDB.ref(`matches/${this.state.matchId}`).update(dataToSubmit).then(() => {this.successForm("Updated!")}).catch(err => {
          this.setState({
            formError: true

          })
        })
      }
      else {
        firebaseMatches.push(dataToSubmit).then(() => {
          this.props.history.push('/admin_matches')
        }).catch((err) => {
          this.setState({
            formError: true
          })
        })
      }
    }
    else {
      this.setState({
        formError : true
      })
    }
}

  componentDidMount() {
    const matchId = this.props.match.params.id;

    const getTeams = (match,type) => {
      firebaseTeams.once('value').then((snapshot) => {
        const teams = firebaseLooper(snapshot);
        const teamOptions = [];

        snapshot.forEach(childSnapshot => {
          teamOptions.push(
            {
             key : childSnapshot.val().shortName,
             value : childSnapshot.val().shortName
            })
        })
        this.updateFieldOptions(match,teamOptions,teams,type,matchId);
      })
    }

    if (!matchId) {
      getTeams(false,'Add Match')
    }
    else{
        firebaseDB.ref(`matches/${matchId}`).once('value').then((snapshot) => {
          const match = snapshot.val();
          getTeams(match,'Edit Match');
        })
    }
  }

  render() {
    return (
      <AdminLayout>
        <div className="editmatch_dialog_wrapper">
          <h2>{this.state.type}</h2>
          <form onSubmit={evt => this.submitForm(evt)}>
            <FormField
              id={"date"}
              formData={this.state.formData.date}
              change={element => this.updateForm(element)}
            />
            <div className="select_team_layout">
              <div className="label_inputs">Local</div>
              <div className="wrapper">
                <div className="left">
                  <FormField
                    id={"local"}
                    formData={this.state.formData.local}
                    change={element => this.updateForm(element)}
                  />
                </div>
                <div>
                  <FormField
                    id={"resultLocal"}
                    formData={this.state.formData.resultLocal}
                    change={element => this.updateForm(element)}
                  />
                </div>
              </div>
            </div>
            <div className="select_team_layout">
              <div className="label_inputs">Away</div>
              <div className="wrapper">
                <div className="left">
                  <FormField
                    id={"away"}
                    formData={this.state.formData.away}
                    change={element => this.updateForm(element)}
                  />
                </div>
                <div>
                  <FormField
                    id={"resultAway"}
                    formData={this.state.formData.resultAway}
                    change={element => this.updateForm(element)}
                  />
                </div>
              </div>
            </div>
            <div className="split_fields">
              <FormField
                id={"referee"}
                formData={this.state.formData.referee}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={"stadium"}
                formData={this.state.formData.stadium}
                change={element => this.updateForm(element)}
              />
            </div>
            <div className="split_fields last">
              <FormField
                id={"result"}
                formData={this.state.formData.result}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={"final"}
                formData={this.state.formData.final}
                change={element => this.updateForm(element)}
              />
            </div>
            <div className="success_label">{this.state.formSuccess}</div>
            {this.state.formError ? (
              <div className="error_label">Something went wrong!</div>
            ) : null}
           <div className="admin_submit">
            <button onClick={(evt) => this.submitForm(evt)}>
              {this.state.type}
            </button>
           </div> 
          </form>
        </div>
      </AdminLayout>
    );
  }
}

export default MatchEditor;
