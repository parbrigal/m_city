import React from "react";
import { Link } from "react-router-dom";

export const Tag = props => {
  const template = (
    <div
      style=
      {{
        background: props.bck,
        fontSize: props.size,
        color: props.color,
        padding: "5px 10px",
        display: "inline-block",
        fontFamily: "Righteous",
        ...props.add
      }}>
      {props.children}
    </div>
  );

  if (props.link) {
    return <Link to={props.linkto}>{template}</Link>;
  } else {
    return template;
  }
};

export const firebaseLooper = (snapshot) => {
    let data = [];
    snapshot.forEach((cSnapshot) => {
        data.push({
            ...cSnapshot.val(),
            id: cSnapshot.key
        })
    }) 
    return data;
}

export const reverseArray = (arr) => {

    let reverse = [];
    for (let i = arr.length-1; i>=0;i--)
    {
        reverse.push(arr[i]);
    }
    return reverse;
}

export const validate = (element) => {
  let error = [true,''];

  if (element.validation.email) {
    const valid = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm.test(element.value)
    const msg = `${!valid ? 'please enter a valid email address' : ''}`

    error = !valid ? [valid,msg] : error
  }

  if(element.validation.required) {

    const valid = element.value.trim() !== "";
    const msg = `${!valid ? 'this field is required' : ''}`;

    error = !valid ? [valid,msg] : error
  }

  return error;

}
