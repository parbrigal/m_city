import React, { Component } from 'react'
import Fade from 'react-reveal/Fade';
import FormField from '../../ui/FormField';
import { validate } from '../../ui/Misc';
import {  firebasePromotions } from '../../../firebase';

 class Enroll extends Component {

  state = {
    formError : false,
    formSuccess : '',
    formData : {
      email : {
        element:'input',
        value:'',
        config: {
          name:'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation : {
          required : true,
          email : true
        },
        valid : false,
        validationMessage : ''
      }
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
        firebasePromotions.orderByChild('email').equalTo(dataToSubmit.email).once("value").then((snapshot) => {
          if (snapshot.val() === null) {
            firebasePromotions.push(dataToSubmit);
            this.resetFormSuccess('Welcome!')
          }
          else {
            this.resetFormSuccess("You've already signed up!");
          }
        })
      }
      else {
        this.setState({
          formError : true
        })
      }
  }

  resetFormSuccess(message) {
    const newFormData = {...this.state.formData}

    for(let key in newFormData){
      newFormData[key].value = ''
      newFormData[key].valid = false;
      newFormData[key].validationMessage = '' 
    }

    this.setState({
      formError:false,
      formData:newFormData,
      formSuccess:message
    })

    this.clearSuccessMessage();

  }

  clearSuccessMessage() {

    setTimeout(() => {  this.setState({
      formSuccess : ''
    })},2000)
  
  }


  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={(evt) => this.submitForm(evt)}>
            <div className="enroll_title">
              Enter your email
            </div>
            <div className="enroll_input">
              <FormField id={'email'} formData={this.state.formData.email} change={(element) =>this.updateForm(element)}/>
            </div>
          </form>
          {this.state.formError ? <div className="error_label">Something went wrong, please try again</div> : null}
          <div className="success_label">{this.state.formSuccess}</div>
          <button onClick={(ev) => this.submitForm(ev) }>Enroll</button>
        </div>
      </Fade>
    )
  }
}

export default Enroll;