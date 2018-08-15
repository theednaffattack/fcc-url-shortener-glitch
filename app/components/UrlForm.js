const axios = require('axios');
const React = require('react');
// const styled = require('styled-components');
const { withFormik } = require('formik');



const postData = (url = '', data = {}) => axios.post('shorten', data)
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
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
    handleReset,
    hash,
    status
}) => (
  <form onSubmit={handleSubmit}>
  
  
  <input
    name="url"
    type="text"
    className={`form-control ${errors.uri && touched.uri && 'is-invalid'}`}
    value={values.url}
    onChange={handleChange}
    onBlur={handleBlur}
  />
{JSON.stringify(values)}
{JSON.stringify(status)}

        
      <h1>
Returned Data
      </h1>

{JSON.stringify(errors)}
      <h4>
        {status ? (
          <a href={`http://localhost:8001/${status.hash}`}>
            {`http://localhost:8001/${status.hash}`}
          </a>
        ) : (
          ''
        )}
      </h4>
          
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
      setSubmitting,
      setErrors, setStatus, resetForm /* setValues, setStatus, and other goodies */
    }
  ) => {
    postData('/shorten', values)
.then( (data) => {
        setStatus(data);
        setSubmitting(false);
        // do whatevs...
        // props.updateUser(user)
      }
    )
    .catch(error => setErrors(error));;
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