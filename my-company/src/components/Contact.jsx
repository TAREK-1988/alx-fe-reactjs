import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  const inputStyle = {
    display: "block",
    margin: "10px 0",
    padding: "10px",
    width: "100%",
    maxWidth: "400px",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Contact Us</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          style={{ ...inputStyle, minHeight: "120px" }}
        />

        <button
          type="submit"
          style={{ padding: "10px 16px", cursor: "pointer" }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
