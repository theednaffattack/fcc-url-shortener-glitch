const axios = require('axios');
const React = require('react');
const styled = require('styled-components');
const { withFormik } = require('formik');

// const SubmitButton = styled.button`
//   display: inline-block;
//   font-weight: 400;
//   text-align: center;
//   white-space: nowrap;
//   vertical-align: middle;
//   -webkit-user-select: none;
//   -moz-user-select: none;
//   -ms-user-select: none;
//   user-select: none;
//   border: 1px solid transparent;
//   padding: 0.5rem 0.75rem;
//   font-size: 1rem;
//   line-height: 1.25;
//   border-radius: 0.25rem;
//   transition: all 0.15s ease-in-out;
//   color: #007bff;
//   background-color: transparent;
//   background-image: none;
//   border-color: #007bff;
//   &:hover {
//     color: #fff;
//     background-color: #007bff;
//     border-color: #007bff;
//   }
// `;

// const ErrorLabel = styled.span`
//   display: inline-block;
// background-color: goldenrod;
// `;

// Our inner form component which receives our form's state and updater methods as props
const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit}>
  
        <div>
          <label htmlFor="url">
Link Address
          </label>
          <input
            name="url"
            type="text"
            className={`form-control ${errors.uri && touched.uri && 'is-invalid'}`}
            value={values.url}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          </div>
    <input
      type="email"
      name="email"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.email}
    />
    {touched.email && errors.email && <div>{errors.email}</div>}
    <input
      type="password"
      name="password"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.password}
    />
    {touched.password && errors.password && <div>{errors.password}</div>}
    <button type="submit" disabled={isSubmitting}>
      Submit
    </button>
  </form>
);


const postData = (url = '', data = {}) => axios.post('/user', data)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// Wrap our form with the using withFormik HoC
const MyForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ email: '', password: '' }),
  // Add a custom validation function (this can be async too!)
  validate: (values, props) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    return errors;
  },
  // Submission handler
  handleSubmit: (
    values,
    {
      props,
      setSubmitting,
      setErrors /* setValues, setStatus, and other goodies */,
    }
  ) => {
    postData(values).then(
      user => {
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