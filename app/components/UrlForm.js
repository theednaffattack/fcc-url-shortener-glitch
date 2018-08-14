const axios = require('axios');
const React = require('react');
// const styled = require('styled-components');
const { withFormik } = require('formik');



const postData = (url = '', data = {}) => axios.post('/shorten', data)
  .then(function (response) {
    console.log(response);
    response => response.json()
  })
  .catch(function (error) {
    console.log(error);
  });

// Our inner form component which receives our form's state and updater methods as props
const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  status
}) => (
  <form onSubmit={handleSubmit}>
  
  
  <input
    name="url"
    type="text"
    className={`form-control ${errors.uri && touched.uri && 'is-invalid'}`}
    value={values.uri}
    onChange={handleChange}
    onBlur={handleBlur}
  />
          
            {values.hash}
          
    <button type="submit" disabled={isSubmitting}>
      Submit
    </button>
  </form>
);

// Wrap our form with the using withFormik HoC
const MyForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ email: '', password: '' }),
  // Add a custom validation function (this can be async too!)
  // validate: (values, props) => {
  //   const errors = {};
  //   if (!values.email) {
  //     errors.email = 'Required';
  //   } else if (
  //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  //   ) {
  //     errors.email = 'Invalid email address';
  //   }
  //   return errors;
  // },
  // Submission handler
  handleSubmit: (
    values,
    {
      props,
      resetForm,
      setStatus,
      setErrors,
      setSubmitting,
    }
  ) => {
    postData('/shorten', values).then(
      data => {

        setStatus(data);
        setSubmitting(false);
        // do whatevs...
        // props.updateUser(user)
      },
      errors => {
        setSubmitting(false);
        // Maybe even transform your API's errors into the same shape as Formik's!
        setErrors(errors);
      }
    );
  },
})(InnerForm);

// Use <MyForm /> anywhere
const Basic = () => (
  <div>
    <h1>My Form</h1>
    <p>This can be anywhere in your application</p>
    <MyForm />
  </div>
);

module.exports = Basic;