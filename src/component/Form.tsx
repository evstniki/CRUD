import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import * as Yup from "yup";

// Define the shape of the form values
interface FormValues {
  name: string;
  email: string;
}

const MyForm: React.FC = () => {
  // Define the initial values for the form fields
  const initialValues: FormValues = {
    name: "",
    email: "",
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  // Define the onSubmit function
  const onSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    console.log("Form data", values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor='name'>Name</label>
            <Field type='text' id='name' name='name' />
            <ErrorMessage name='name' component='div' />
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <Field type='email' id='email' name='email' />
            <ErrorMessage name='email' component='div' />
          </div>
          <button type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
