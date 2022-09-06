import React from "react";
import ContactStyles from "./contact.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { FiPhone, FiMail, FiHome } from "react-icons/fi";

const Contact = () => {
  return (
    <>
      <Breadcrumb name="CONTACT US" breadcrumbpath={" > Contact"} auth="no" />
      <div className={`container-fluid ${ContactStyles.contact}`}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-6 p-md-5 p-2">
              <div className={ContactStyles.contactinfocards}>
                <h3>Contact Details:</h3>
                <p>Contact Us We Are Available 24/7 For Your Services.</p>
                <div>
                  <FiPhone size={30} />
                  <a href="tel:+16826518211">+1 682 651 8211</a>
                </div>
                <div>
                  <FiMail size={30} />
                  <a href="mailto:sales@brickwind.com">sales@brickwind.com</a>
                </div>
                <div>
                  <FiHome size={30} />
                  <span>30 N Gould St Ste 25404, Sheridan, Wyoming, 82801</span>
                </div>
              </div>
              <h3 className={ContactStyles.ourlocation}>Our Location:</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1883.528779508354!2d-106.956675829437!3d44.79796952381946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5335fabc2a66677f%3A0x8f85bd068d1afb8a!2s30%20N%20Gould%20St%2C%20Sheridan%2C%20WY%2082801%2C%20USA!5e0!3m2!1sen!2s!4v1658435263307!5m2!1sen!2s"
                width="100%"
                height="450"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-lg-6">
              <form className="shadow px-4 py-5" encType="multipart/form-data">
                <h2>Contact Us</h2>
                <input type="text" name="name" placeholder="Your Name" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Adress"
                />
                <input
                  type="text"
                  name="number"
                  placeholder="Your Phone Number"
                />
                <input type="text" name="subject" placeholder="Subject" />
                <textarea name="message" placeholder="Message"></textarea>
                <input type="submit" value="Send" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
