import React, { Component } from "react";
import AdminLayout from "../../../hoc/AdminLayout";
import FormField from "../../ui/FormField";

import { validate } from "../../ui/Misc";

import { firebasePlayers, firebaseDB, firebase } from "../../../firebase";

import FileUploaderCustom from "../../ui/FileUploaderCustom";

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
            { key: "Striker", value: "Striker" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      image: {
        element: "image",
        value: "",
        validation: {
          required: true
        },
        valid: false
      }
    }
  };
  //content default argument is blank
  updateForm = (element, content = '') => {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[element.id] };

    if (content === '') {
      newElement.value = element.event.target.value;
    }
    else {
      newElement.value = content;
    }

    let isValid = validate(newElement);
    newElement.valid = isValid[0];
    newElement.validationMessage = isValid[1];

    newFormData[element.id] = newElement;

    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm(evt){
    evt.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) {
      if (this.state.type === "Edit player") {
        firebaseDB.ref(`players/${this.state.playerId}`).update(dataToSubmit).then(() => {
          this.successForm("Updated")
        }).catch(err => this.setState({
          formError: true
        }))

      } else {
        firebasePlayers.push(dataToSubmit).then(() => {
          this.props.history.push('/admin_players');
        }).catch(err => {
          this.setState({
            formError: true
          })
        })
      }
    } else {
      this.setState({
        formError: true
      });
    }
  };

  updateFields = (player, playerId, type, defaultImg) => {
    const newFormData = { ...this.state.formData }

    for (let key in newFormData) {
      newFormData[key].value = player[key];
      newFormData[key].valid = true;
    }

    this.setState({
      playerId,
      defaultImg,
      type,
      formData: newFormData
    });



  }

  successForm = (message) => {
    this.setState({
      formSuccess: message
    })

    setTimeout(() => {
      this.setState({
        formSuccess: ''
      })
    }, 2000)
  }

  componentDidMount() {
    const playerId = this.props.match.params.id;
    if (!playerId) {
      this.setState({
        type: "Add Player"
      });
    } else {
      firebaseDB.ref(`players/${playerId}`).once('value').then((snapshot) => {
        const playerData = snapshot.val();
        firebase.storage().ref('players').child(playerData.image).getDownloadURL().then(url => {

          this.updateFields(playerData, playerId, 'Edit Player', url);

        }).catch(err => {
          this.updateFields({
            ...playerData,
            image:''
        },playerId,'Edit player','')

        });

      })

    }
  }

  resetImage = () => {
    const newFormData = { ...this.state.formData }
    newFormData['image'].value = '';
    newFormData['image'].valid = false;
    this.setState({
      defaultImg: '',
      formData: newFormData
    })

  }

  storeImg = (filename) => {
    this.updateForm(
      { id: 'image' },
      filename
    )

  }

  render() {
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          <h2>{this.state.type}</h2>
          <div>
            <form onSubmit={evt => this.submitForm(evt)}>
              <FileUploaderCustom
                dir="players"
                tag="Player image"
                defaultImg={this.state.defaultImg}
                defaultImgName={this.state.formData.image.value}
                resetImage={() => this.resetImage()}
                filename={(filename) => this.storeImg(filename)}
              />
              <FormField
                id={"name"}
                formData={this.state.formData.name}
                change={element => this.updateForm(element)}
                resetImage={() => this.resetImage()}
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
                <button onClick={evt => this.submitForm(evt)}>
                  {this.state.type}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default PlayerEditor;
