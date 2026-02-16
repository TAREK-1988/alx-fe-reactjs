import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

function mockRegisterApi(payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (String(payload.email || "").toLowerCase().includes("fail")) {
        reject(new Error("Mock API: Registration failed for this email."));
        return;
      }
      resolve({ ok: true, userId: Math.floor(Math.random() * 100000), ...payload });
    }, 700);
  });
}

const schema = Yup.object({
  username: Yup.string().trim().required("Username is required"),
  email: Yup.string().trim().email("Invalid email").required("Email is required"),
  password: Yup.string().trim().min(6, "Min 6 characters").required("Password is required")
});

export default function FormikForm() {
  const [apiError, setApiError] = useState("");
  const [apiResult, setApiResult] = useState(null);

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={schema}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        setApiError("");
        setApiResult(null);
        try {
          const res = await mockRegisterApi(values);
          setApiResult(res);
          resetForm();
        } catch (err) {
          setApiError(err?.message || "Something went wrong");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form noValidate>
          <label htmlFor="username">Username</label>
          <Field id="username" name="username" placeholder="e.g. noah" />
          <ErrorMessage name="username" component="div" className="error" />

          <label htmlFor="email">Email</label>
          <Field id="email" name="email" placeholder="e.g. noah@mail.com" />
          <ErrorMessage name="email" component="div" className="error" />

          <label htmlFor="password">Password</label>
          <Field id="password" name="password" type="password" placeholder="••••••••" />
          <ErrorMessage name="password" component="div" className="error" />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </button>

          {apiError && <div className="error">{apiError}</div>}
          {apiResult?.ok && (
            <div className="success">
              Registered successfully. User ID: <b>{apiResult.userId}</b>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}
