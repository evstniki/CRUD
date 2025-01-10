import FormControl from "@mui/material/FormControl";
import { default as Grid } from "@mui/material/Grid2";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import * as Yup from "yup";

const CustomErrorMessage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <span style={{ color: "red", fontSize: "0.9em" }}>{children}</span>;

// Define the shape of the form values
interface FormValues {
  fname: string;
  lname: string;
  address: string;
  email: string;
}

const MyForm: React.FC = () => {
  const initialValues: FormValues = {
    fname: "",
    lname: "",
    address: "",
    email: "",
  };

  const validationSchema = Yup.object({
    fname: Yup.string().required("First Name is required"),
    lname: Yup.string().required("Last Name is required"),
    address: Yup.string().required("Address is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

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
          <FormControl>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid size={6}>
                <Field
                  type='text'
                  id='fname'
                  name='fname'
                  placeholder='First Name'
                />
                <ErrorMessage
                  name='fname'
                  component={CustomErrorMessage as never}
                />
              </Grid>
              <Grid size={6}>
                <Field
                  type='text'
                  id='lname'
                  name='lname'
                  placeholder='Last Name'
                />
                <ErrorMessage
                  name='lname'
                  component={CustomErrorMessage as never}
                />
              </Grid>
              <Grid size={6}>
                <Field
                  type='text'
                  id='address'
                  name='address'
                  placeholder='Address'
                />
                <ErrorMessage
                  name='address'
                  component={CustomErrorMessage as never}
                />
              </Grid>
              <Grid size={6}>
                <Field
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Email'
                />
                <ErrorMessage
                  name='email'
                  component={CustomErrorMessage as never}
                />
              </Grid>
            </Grid>
          </FormControl>
          <button type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
