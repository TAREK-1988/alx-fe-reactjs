import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required")
});

export default function FormikForm() {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm, setSubmitting, setStatus }) => {
        setStatus({ message: "", error: "" });

        try {
          const res = await fetch("https://jsonplaceholder.typicode.com/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
          });

          if (!res.ok) throw new Error("Registration failed");

          await res.json();

          setStatus({ message: "Registered successfully!", error: "" });
          resetForm();
        } catch (err) {
          setStatus({ message: "", error: err.message || "Something went wrong" });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, status }) => (
        <Form>
          <div style={{ display: "grid", gap: 10 }}>
            <div>
              <label>Username</label>
              <Field
                name="username"
                style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              />
              <ErrorMessage name="username" component="p" style={{ color: "crimson", margin: "6px 0 0" }} />
            </div>

            <div>
              <label>Email</label>
              <Field
                name="email"
                style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              />
              <ErrorMessage name="email" component="p" style={{ color: "crimson", margin: "6px 0 0" }} />
            </div>

            <div>
              <label>Password</label>
              <Field
                name="password"
                type="password"
                style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              />
              <ErrorMessage name="password" component="p" style={{ color: "crimson", margin: "6px 0 0" }} />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: 10,
                borderRadius: 10,
                border: 0,
                background: "#5E6AD2",
                color: "white",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              {isSubmitting ? "Submitting..." : "Register"}
            </button>

            {status?.message && <p style={{ color: "green", margin: 0 }}>{status.message}</p>}
            {status?.error && <p style={{ color: "crimson", margin: 0 }}>{status.error}</p>}
          </div>
        </Form>
      )}
    </Formik>
  );
}
