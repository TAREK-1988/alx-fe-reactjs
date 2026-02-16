import RegistrationForm from "./components/RegistrationForm.jsx";
import FormikForm from "./components/formikForm.js";

export default function App() {
  return (
    <div className="container">
      <h1>Form Handling: Controlled + Formik</h1>
      <p className="muted">
        Demo registration using a mock API simulation (setTimeout).
      </p>

      <div className="grid">
        <div className="card">
          <h2>1) Controlled Components</h2>
          <RegistrationForm />
        </div>

        <div className="card">
          <h2>2) Formik + Yup</h2>
          <FormikForm />
        </div>
      </div>
    </div>
  );
}
