import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { withFormik } from '../../../node_modules/formik';
import DisplayFormikState from './DisplayFormikState';

// const postData = (url = '', data = {}) => fetch(url, {
//   method: 'POST', // *GET, POST, PUT, DELETE, etc.
//   mode: 'cors', // no-cors, cors, *same-origin
//   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//   credentials: 'same-origin', // include, same-origin, *omit
//   headers: {
//     'Content-Type': 'application/json; charset=utf-8'
//     // "Content-Type": "application/x-www-form-urlencoded",
//   },
//   redirect: 'follow', // manual, *follow, error
//   referrer: 'no-referrer', // no-referrer, *client
//   body: JSON.stringify(data) // body data type must match "Content-Type" header
// })
//   .then(responseText => responseText.json()) // parses response to JSON
// // .then(response => this.setState(response))
//   .catch(error => ({ errors: { msg: error.message } }));

const postData = (url = '', data = {}) => axios.post('/user', data)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

const SubmitButton = styled.button`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.25;
  border-radius: 0.25rem;
  transition: all 0.15s ease-in-out;
  color: #007bff;
  background-color: transparent;
  background-image: none;
  border-color: #007bff;
  &:hover {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }
`;

const ErrorLabel = styled.span`
  display: inline-block;
`;

const UriForm = (props) => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    hanldeBlur,
    handleSubmit,
    handleReset,
    hash,
    status
  } = props;

  return (
    <div>
      <form className="" onSubmit={handleSubmit}>
        <h1>
URI Shortener
        </h1>
        <div>
          <label htmlFor="uri">
Link Address
          </label>
          <input
            name="uri"
            type="text"
            className={`form-control ${errors.uri && touched.uri && 'is-invalid'}`}
            value={values.uri}
            onChange={handleChange}
            // onBlur={_handleBlur}
          />
          <div>
            {values.hash}
          </div>
          {errors.uri && touched.uri && (
          <div className="invalid-feedback">
            {errors.uri}
          </div>
          )}
        </div>
        <SubmitButton type="submit">
          {isSubmitting ? 'WAIT PLZ' : 'SUBMIT'}
        </SubmitButton>
        {/* <DisplayFormikState {...props} /> */}
      </form>
      <h1>
Returned Data
      </h1>
      <h4>
        {status ? (
          <a href={`http://localhost:8001/${status.hash}`}>
            {`http://localhost:8001/${status.hash}`}
          </a>
        ) : (
          ''
        )}
      </h4>
    </div>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    uri: props.uri.uri
  }),

  validationSchema: Yup.object().shape({
    uri: Yup.string()
      .url('Invalid URI format')
      .required('A valid link is required')

    //       .test(
    //         'is-google',
    //       <ErrorLabel>
    // Uhhh this isn't google
    //       </ErrorLabel>,
    //       value => value === 'http://www.google.com'
    //       )
  }),

  handleSubmit: (values, {
    resetForm, setStatus, setErrors, setSubmitting
  }) => {
    console.log('shortening');
    console.log(JSON.stringify(values));
    postData('/shorten', values)
      // postData('/shorten', values)
      .then((data) => {
        // postData('/api/getShortLink', { hash: e.target.value })
        // if (data.errors) {
        //   return () => {
        //     this.setState({ errors: { msg: data.errors } }, () => console.error(`state in 'then-if' ${this.state}`));
        //   };
        // }
        // console.log(`data ${JSON.stringify(data, null, 2)}`);
        // return data;

        setStatus(data);
        console.log(`state in 'then' ${JSON.stringify(data)}`);
        console.log(data);
        // if (data == { errors: { msg: error } })
      }) // JSON from `response.json()` call
      .catch(error => console.error(error));
    setSubmitting(false);

    // setTimeout(() => {
    //   // alert(JSON.stringify(values, null, 2));
    //   JSON.stringify(values, null, 2);
    //   setSubmitting(false);
    // }, 1000);
  }
})(UriForm);
