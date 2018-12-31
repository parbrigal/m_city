import React, { Component } from 'react';
import AdminLayout from "../../../hoc/AdminLayout";
import FormField from "../../ui/FormField";

import {firebasePlayers, firebaseDB, firebase} from '../../../firebase';

 class PlayerEditor extends Component {

    state ={

        playerId: "",
        type: "",
        formError: false,
        formSuccess: "",
        defaultImg : "",
        formData : {
            name: {
                element: "input",
                value: "",
                config: {
                  label: "Player Name",
                  name: "name_input",
                  type: "text"
                },
                validation: {
                  required: true
                },
                valid: false,
                validationMessage: "",
                showLabel: true
              },
              lastname: {
                element: "input",
                value: "",
                config: {
                  label: "Player Last Name",
                  name: "lastname_input",
                  type: "text"
                },
                validation: {
                  required: true
                },
                valid: false,
                validationMessage: "",
                showLabel: true
              },
              number: {
                element: "input",
                value: "",
                config: {
                  label: "Player Number",
                  name: "number_input",
                  type: "text"
                },
                validation: {
                  required: true
                },
                valid: false,
                validationMessage: "",
                showLabel: true
              },
              position: {
                element: "select",
                value: "",
                config: {
                  label: "Select a position",
                  name: "number_position",
                  type: "select",
                  options : [
                    {key:"Keeper",value:"Keeper"},
                    {key:"Defence",value:"Defence"},
                    {key:"Midfield",value:"Midfield"},
                    {key:"Striker",value:"Striker"},
                    ]
                },
                validation: {
                  required: true
                },
                valid: false,
                validationMessage: "",
                showLabel: true
              },
        }

    }


  render() {
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
            <h2>
                {this.state.type}
            </h2>
            <div>
                <form onSubmit={(evt) => this.submitForm(evt)}>
                    <FormField
                        id={"name"}
                        formData={this.state.formData.name}
                        change={element => this.updateForm(element)}
                    />
                </form>    
            </div>
        </div>
      </AdminLayout>
    )
  }
}

export default PlayerEditor;