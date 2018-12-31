import React, { Component } from 'react';
import AdminLayout from "../../../hoc/AdminLayout";
import FormField from "../../ui/FormField";

import { validate } from "../../ui/Misc";

import { firebasePlayers, firebaseDB, firebase } from '../../../firebase';

class PlayerEditor extends Component {

    state = {

        playerId: "",
        type: "",
        formError: false,
        formSuccess: "",
        defaultImg: "",
        formData: {
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
                    options: [
                        { key: "Keeper", value: "Keeper" },
                        { key: "Defence", value: "Defence" },
                        { key: "Midfield", value: "Midfield" },
                        { key: "Striker", value: "Striker" },
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

      submitForm = (evt) => {
        evt.preventDefault();
    
        let dataToSubmit = {} 
        let formIsValid = true;
    
        for (let key in this.state.formData) {
          dataToSubmit[key] = this.state.formData[key].value;
          formIsValid = this.state.formData[key].valid && formIsValid 
        }
    
        if (formIsValid) {

        }
        else {
          this.setState({
            formError : true
          })
        }
    }

    componentDidMount() {
        const playerId = this.props.match.params.id;
        if(!playerId) {
            this.setState({
                type:'Add Player'
            })
        }
        else {
            this.setState({
                type:'Edit Player'
            })

        }
    }

    render() {
        return (
            <AdminLayout>
                <div className="editplayers_dialog_wrapper">
                    <h2>{this.state.type}</h2>
                    <div>
                        <form onSubmit={(evt) => this.submitForm(evt)}>
                            <FormField
                                id={"name"}
                                formData={this.state.formData.name}
                                change={element => this.updateForm(element)}
                            />
                            <FormField
                                id={"lastname"}
                                formData={this.state.formData.lastname}
                                change={element => this.updateForm(element)}
                            />
                            <FormField
                                id={"number"}
                                formData={this.state.formData.number}
                                change={element => this.updateForm(element)}
                            />
                            <FormField
                                id={"position"}
                                formData={this.state.formData.position}
                                change={element => this.updateForm(element)}
                            />
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
                </div>
            </AdminLayout>
        )
    }
}

export default PlayerEditor;