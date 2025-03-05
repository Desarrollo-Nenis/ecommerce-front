"use client";

const FooterInfoItem = ({ iconClass, title, lines }) => (
  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 m-b30">
    <div className="icon-bx-wraper bx-style-1 p-a20 radius-sm br-col-w1">
      <div className="icon-content">
        <h5 className="dlab-tilte">
          <span className="icon-sm">
            <i className={iconClass} />
          </span>
          {title}
        </h5>
        {lines.map((line, index) => (
          <p key={index} className={index === 0 ? "m-b0 op7" : "op7"}>
            {line}
          </p>
        ))}
      </div>
    </div>
  </div>
);

const FooterQuickLinks = () => (
  <div className="widget border-0">
    <h6 className="m-b20 text-white font-weight-300 text-uppercase">Quick Links</h6>
    <ul className="list-2">
      {[
        "Home",
        "About us",
        "Our Team",
        "Hire Developers",
        "Industries",
        "Portfolio",
        "Contact Us",
        "Blogs",
        "Testimonials",
        "Careers",
      ].map((link, index) => (
        <li key={index}>
          <a href="index.html">{link}</a>
        </li>
      ))}
    </ul>
  </div>
);

const FooterNewsletter = () => (
  <div className="widget">
    <h6 className="m-b20 text-white font-weight-300 text-uppercase">Newsletter</h6>
    <div className="subscribe-form m-b20 m-t30">
      <form className="dzSubscribe" action="script/mailchamp.php" method="post">
        <div className="dzSubscribeMsg" />
        <div className="input-group">
          <input
            name="dzEmail"
            required
            className="form-control radius-no"
            placeholder="Your Email Address"
            type="email"
          />
          <span className="input-group-btn">
            <button
              name="submit"
              value="Submit"
              type="submit"
              className="site-button radius-no"
            >
              SEND
            </button>
          </span>
        </div>
      </form>
    </div>
    <h6 className="m-b10 text-white font-weight-300 text-uppercase">Connect with us</h6>
    <ul className="list-inline m-a0">
      {[
        { className: "facebook", icon: "fab fa-facebook-f" },
        { className: "google-plus", icon: "fab fa-google-plus-g" },
        { className: "linkedin", icon: "fab fa-linkedin-in" },
        { className: "instagram", icon: "fab fa-instagram" },
        { className: "twitter", icon: "fab fa-twitter" },
      ].map(({ className, icon }, index) => (
        <li key={index}>
          <a href="javascript:void(0);" className={`site-button ${className} sharp`}>
            <i className={icon} />
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const FooterCountriesInfo = () => (
  <div className="icon-bx-wraper bx-style-1 p-a30 radius-sm br-col-w1 bg-tpw1">
    <h5 className="text-white font-weight-300">
      Serving in 70+ countries for web, software and mobile app development
    </h5>
    <p>
      United States (USA), United Kingdom (UK), Singapore, Kenya, South Africa
      Germany, Canada, Australia, Netherlands, Norway, United Arab Emirates
      (UAE), Finland etc.
    </p>
  </div>
);

export default function Footer() {
  return (
    <footer className="site-footer footer-gray-1">
      <div className="section-full p-t50 p-b20 bg-primary text-white overlay-primary-dark footer-info-bar">
        <div className="container">
          <div className="row">
            <FooterInfoItem
              iconClass="ti-location-pin"
              title="Company Address"
              lines={["Demo address #8901 Marmora Road Chi Minh City, Vietnam"]}
            />
            <FooterInfoItem
              iconClass="ti-email"
              title="E-mail"
              lines={["info@example.com", "company@example.com"]}
            />
            <FooterInfoItem
              iconClass="ti-mobile"
              title="Phone Numbers"
              lines={["Mobile : +00 234 678 9012", "Phone : +0 1234 5678 90"]}
            />
            <FooterInfoItem
              iconClass="ti-alarm-clock"
              title="Office Hours"
              lines={["Mon To Sat - 08.00-18.00", "Sunday - Close"]}
            />
          </div>
        </div>
      </div>

      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 wow fadeIn" data-wow-delay="0.2s">
              <FooterQuickLinks />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 wow fadeIn" data-wow-delay="0.4s">
              <FooterNewsletter />
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12 wow fadeIn" data-wow-delay="0.6s">
              <FooterCountriesInfo />
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 text-left">
              <span>Copyright © 2022 DexignZone. all rights reserved.</span>
            </div>
            <div className="col-md-6 col-sm-6 text-right">
              <div className="widget-link">
                <ul>
                  <li>
                    <a href="help-desk.html"> Help Desk</a>
                  </li>
                  <li>
                    <a href="privacy-policy.html"> Refund Policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
