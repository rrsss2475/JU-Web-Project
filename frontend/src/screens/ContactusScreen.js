import React from "react";

const ContactusScreen = () => {
  return (
    <div class="container" style={{ marginTop: "100px" }}>
      <div class="row">
        <div class="col-lg-5">
          <h2 style={{ fontWeight: "700", fontFamily: "Reggae One" }}>
            LIVE SUPPORT
          </h2>
          <p>
            <h4>
              24 hours | 7 days a week | 365 days a year Live Technical Support
            </h4>
          </p>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its content. The
            point of using Lorem Ipsum is that it hs a more-or-less normal
            distribution of letters. There are many variations of passages of
            Lorem Ipsum available, but the majority have suffered alteration in
            some form, by injected humour, or randomised words which don't look
            even slightly believable. If you are going to use a passage of Lorem
            Ipsum, you need to be sure there isn't anything embarrassing hidden
            in the middle of text.
          </p>
        </div>

        <div class="col-lg-2">
          <img
            src="https://raw.githubusercontent.com/SouravSaha1999/Mobile-o-Mania/master/ls.jpg"
            class="img-responsive"
            alt=""
          />
        </div>
      </div>

      <div class="row">
        <div class="col-lg-8">
          <h2
            style={{
              marginBottom: "20px",
              fontWeight: "700",
              fontFamily: "Reggae One",
            }}
          >
            CONTACT US
          </h2>
          <form>
            <div class="form-group">
              <label
                style={{ fontWeight: "500" }}
                class="contact-us-label"
                for="name"
              >
                Name :
              </label>
              <input type="text" name="name" class="form-control" />
            </div>

            <div class="form-group">
              <label style={{ fontWeight: "500" }} for="email">
                Email :
              </label>
              <input type="email" name="email" class="form-control" />
            </div>

            <div class="form-group">
              <label style={{ fontWeight: "500" }} for="msg">
                Message :
              </label>
              <textarea name="msg" class="form-control"></textarea>
            </div>

            <button
              style={{ marginTop: "10px", fontWeight: "700" }}
              type="button"
              class="btn btn-warning"
            >
              Submit
            </button>
          </form>
        </div>

        <div style={{ marginTop: "70px" }} class="col-lg-4">
          <h2
            style={{
              marginBottom: "20px",
              fontWeight: "700",
              fontFamily: "Reggae One",
            }}
          >
            Company Information -
          </h2>
          <p>833 Mayflower Ave, GD-700106,</p>
          <p>Street No. 3A, Rajarhat, Kolkata</p>
          <p>Phone: +91-6666699999</p>
          <p>Email: justintime@gmail.com</p>
          <p>Follow on: Facebook, Instagram</p>
        </div>
      </div>
    </div>
  );
};

export default ContactusScreen;
