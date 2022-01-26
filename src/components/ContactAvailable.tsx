import React from "react";
import Title from "./common/Title";

const ContactAvailable = () => {
  return (
    <>
      <div className="container mx-auto">
        <Title
          title="Let’s Get Together"
          subtitle="We strive to elevate the burger experience"
          description=""
        />
      </div>

      <div className="contact">
        <div className="grid grid-cols-12 gap-4 contact__wrapper">
          <div className="col-span-12 md:col-span-7 contact__content">
            <p className="contact__content__title">
              Contactless delivery available
            </p>
            <p className="text-xl font-bold">Order by phone</p>
            <p className="mb-5 text-xl font-bold text-amazon-600">
              1-800-700-600
            </p>
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-4">
                <div className="">
                  <h4>Location</h4>
                </div>
                <div className="">
                  <ul>
                    <li>Dhaka, Bangladesh</li>
                  </ul>
                </div>
              </div>

              <div className="col-span-12 md:col-span-4">
                <div className="">
                  <h4>Delivery hours</h4>
                </div>
                <div className="">
                  <ul>
                    <li>
                      <b> Monday – Saturday: </b>
                      08AM–11PM
                    </li>
                    <li>
                      <b>Sunday: </b>
                      11AM–03PM
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-span-12 md:col-span-4">
                <div className="">
                  <h4>Takeaway hours</h4>
                </div>
                <div className="">
                  <ul>
                    <li>
                      <b>Monday – Saturday: </b> 08AM–11PM
                    </li>
                    <li>
                      <b>Sunday:</b> Closed
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 contact__map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1839.0179632416985!2d89.5538504127622!3d22.801132631062536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff8f2b1098bf95%3A0xbce09c90b98f8380!2sJust%20Orders%20Khulna!5e0!3m2!1sen!2sbd!4v1636005141952!5m2!1sen!2sbd"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactAvailable;
