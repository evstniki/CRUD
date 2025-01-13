// import { Button } from "@mui/material";
// import FormControl from "@mui/material/FormControl";
// import { default as Grid } from "@mui/material/Grid2";
// import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
// import React from "react";
// import * as Yup from "yup";

// const CustomErrorMessage: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => <div style={{ color: "red", fontSize: "0.9em" }}>{children}</div>;

// interface FormValues {
//   fname: string;
//   lname: string;
//   address: string;
//   email: string;
// }

// const MyForm: React.FC = () => {
//   const initialValues: FormValues = {
//     fname: "",
//     lname: "",
//     address: "",
//     email: "",
//   };

//   const validationSchema = Yup.object({
//     fname: Yup.string().required("First Name is required"),
//     lname: Yup.string().required("Last Name is required"),
//     address: Yup.string().required("Address is required"),
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),
//   });

//   const onSubmit = (
//     values: FormValues,
//     { setSubmitting }: FormikHelpers<FormValues>
//   ) => {
//     console.log("Form data", values);
//     setSubmitting(false);
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={onSubmit}
//     >
//       {({ isSubmitting }) => (
//         <Form>
//           <FormControl>
//             <Grid container rowSpacing={6} columnSpacing={1}>
//               <Grid size={6}>
//                 <Field
//                   type='text'
//                   id='fname'
//                   name='fname'
//                   placeholder='First Name'
//                 />
//                 <ErrorMessage
//                   name='fname'
//                   component={CustomErrorMessage as never}
//                 />
//               </Grid>
//               <Grid size={6}>
//                 <Field
//                   type='text'
//                   id='lname'
//                   name='lname'
//                   placeholder='Last Name'
//                 />
//                 <ErrorMessage
//                   name='lname'
//                   component={CustomErrorMessage as never}
//                 />
//               </Grid>
//               <Grid size={6}>
//                 <Field
//                   type='text'
//                   id='address'
//                   name='address'
//                   placeholder='Address'
//                 />
//                 <ErrorMessage
//                   name='address'
//                   component={CustomErrorMessage as never}
//                 />
//               </Grid>
//               <Grid size={6}>
//                 <Field
//                   type='email'
//                   id='email'
//                   name='email'
//                   placeholder='Email'
//                 />
//                 <ErrorMessage
//                   name='email'
//                   component={CustomErrorMessage as never}
//                 />
//               </Grid>
//             </Grid>
//           </FormControl>

//           <Button type='submit' disabled={isSubmitting}>
//             Submit
//           </Button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default MyForm;

import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { default as Grid } from "@mui/material/Grid2";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { submitForm } from "../entities/asyncThunks";
import { ApiStatus } from "../entities/slice";
import { AppDispatch, RootState } from "../entities/store";

const CustomErrorMessage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div style={{ color: "red", fontSize: "0.9em" }}>{children}</div>;

export type FormValues = {
  fname: string;
  lname: string;
  address: string;
  email: string;
};

const MyForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector(
    (state: RootState) => state.form
  );

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
    console.log(values);
    dispatch(submitForm(values)).finally(() => setSubmitting(false));
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
            <Grid container rowSpacing={6} columnSpacing={1}>
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

          <Button
            type='submit'
            disabled={isSubmitting || loading === ApiStatus.Pending}
          >
            {loading === ApiStatus.Pending ? "Submitting..." : "Submit"}
          </Button>

          {success && (
            <div style={{ color: "green" }}>Form submitted successfully!</div>
          )}
          {error && <div style={{ color: "red" }}>{error}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
