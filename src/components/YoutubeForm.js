import React, { useState } from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
  useFormik,
} from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';

const initialValues = {
  name: 'amar',
  email: '',
  channel: '',
  commennts: '',
  address: '',
  social: {
    facebook: '',
    twitter: '',
  },
  phoneNumbers: ['', ''],
  phNumbers: [''],
};

const savedValues = {
  name: 'Amarnath Rajasekaran',
  email: 'sharewithamar@gmail.com',
  channel: 'aoe',
  commennts: '14',
  address: '21 B',
  social: {
    facebook: '',
    twitter: '',
  },
  phoneNumbers: ['', ''],
  phNumbers: [''],
};

const onSubmit = (values, onSubmitProps) => {
  // console.log(values);
  // console.log('submit props', onSubmitProps);
  onSubmitProps.setSubmitting(false);
  onSubmitProps.resetForm();
};

const validationSchema = Yup.object({
  name: Yup.string().required('Your Name is Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  channel: Yup.string().required('Channel Name is Required'),
  address: Yup.string().required('Your Address is Required'),
});

const validateComments = (value) => {
  let error;
  if (!value) {
    error = 'Required comments';
  }
  return error;
};

function YoutubeForm(props) {
  const [formValues, setFormValues] = useState(null);
  /*  const formik = useFormik({
    initialValues,
    onSubmit,
    //validate,
    validationSchema,
  }); */

  // console.log('form values', formik.values);
  // console.log('form errors', formik.errors);
  //   console.log('Visisted fields', formik.touched);
  //  validateOnChange={false}
  // validateOnBlur = { false };
  //validateOnMount - runs validaiton on load
  //formik.dirty  -Note if you set initial values and if you have same value then it is not dirty

  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      // validateOnMount
      enableReinitialize
    >
      {(formik) => {
        console.log('formik prop', formik); // equivalent to form prop inside render options
        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email">
                {(errorMsg) => {
                  return <div className="error">{errorMsg}</div>;
                }}
              </ErrorMessage>
            </div>
            <div className="form-control">
              <label htmlFor="channel">Name</label>
              <Field
                type="text"
                id="channel"
                name="channel"
                placeholder="youtube channel name"
              />
              <ErrorMessage name="channel" />
            </div>

            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field
                as="textarea"
                id="comments"
                name="comments"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="address">Address</label>
              <FastField name="address">
                {(props) => {
                  //field,form,meta
                  //  console.log(props);
                  //    console.log('form errors', props.form.errors);
                  const { field, form, meta } = props;
                  return (
                    <div>
                      <input id="address" {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </FastField>
            </div>

            <div className="form-control">
              <label htmlFor="facebook">Facebook profile</label>
              <Field type="text" id="comments" name="social.facebook" />
            </div>

            <div className="form-control">
              <label htmlFor="twitter">Twitter profile</label>
              <Field type="text" id="twitter" name="social.twitter" />
            </div>

            <div className="form-control">
              <label htmlFor="primaryPh">Primary Phone Number</label>
              <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
            </div>

            <div className="form-control">
              <label htmlFor="secondaryPh">Secondary Phone Number</label>
              <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
            </div>

            <div className="form-control">
              <label>List of Phone numbers</label>
              <FieldArray name="phNumbers">
                {(fieldArrayProps) => {
                  //console.log('fieldArrayProps', fieldArrayProps);
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { phNumbers } = values;
                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => {
                        return (
                          <div key={index}>
                            <Field name={`phNumbers[${index}]`} />
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                -
                              </button>
                            )}

                            <button type="button" onClick={() => push('')}>
                              +
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            {/*
            <button
              type="button"
              onClick={() => formik.validateField('comments')}
            >
              Validate Comments
            </button>
            <button type="button" onClick={() => formik.validateForm()}>
              Validate All
            </button>
            <button
              type="button"
              onClick={() => formik.setFieldTouched('comments')}
            >
              Visit Comments
            </button>
            <button
              type="button"
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                  comments: true,
                })
              }
            >
              Visit Fields
            </button>
           
            <button type="submit" disabled={!formik.isValid}>
              Submit
            </button>
            */}
            <button type="button" onClick={() => setFormValues(savedValues)}>
              Load saved data
            </button>
            <button type="reset">Reset</button>
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default YoutubeForm;
