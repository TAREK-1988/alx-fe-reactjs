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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Contact Us</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
        <input name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} />
        <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;

