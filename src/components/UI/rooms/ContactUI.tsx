import { useState, ChangeEvent, FormEvent } from "react";
import emailjs from "emailjs-com";
import ButtonIcon from '../components/ButtonIcon';
import { navigateTo } from '../../../utils/utils';
import { assets } from '../../../assets/assets';
import './ContactUI.css';

export default function ContactUI() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_wks0xbf",
        "template_72gytnc",
        e.target  as HTMLFormElement,
        "EsTRcLw2_fAfuJ4Wn"
      )
      .then(
        () => {
          setStatus("Email sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setStatus("Failed to send email.");
          console.error(error);
        }
      );
  };

  const copyToClipboard = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Email copied to clipboard!');
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="social-buttons">
          <ButtonIcon
            svgPath={assets.svg.github}
            onClick={() => { navigateTo('https://github.com/raimonmerce') }}
            size={'30px'}
            text={'GitHub'}
          />
          <ButtonIcon
            svgPath={assets.svg.linkedin}
            onClick={() => { navigateTo('https://www.linkedin.com/in/raimon-merc%C3%A9-gotsens-27148a166/') }}
            size={'30px'}
            text={'LinkedIn'}
          />
          <ButtonIcon
            svgPath={assets.svg.email}
            onClick={() => { copyToClipboard('raimon.merc.gots@gmail.com') }}
            size={'30px'}
            text={'raimon.merc.gots@gmail.com'}
          />
          <ButtonIcon
            svgPath={assets.svg.location}
            onClick={() => { navigateTo('https://www.google.com/maps/place/Barcelona/@41.3927673,2.0577878,12z/data=!3m1!4b1!4m6!3m5!1s0x12a49816718e30e5:0x44b0fb3d4f47660a!8m2!3d41.3873974!4d2.168568!16zL20vMDFmNjI?entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoASAFQAw%3D%3D') }}
            size={'30px'}
            text={'Barcelona, Spain'}
          />
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="form-textarea"
          />
          <button type="submit" className="submit-button">
            Send
          </button>
          {status && <p className="status-message">{status}</p>}
        </form>
      </div>
    </div>
  );
}
