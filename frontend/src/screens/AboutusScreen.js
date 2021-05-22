import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Creator from "../components/Creator";

const AboutusScreen = () => {
  const people = [
    {
      name: "Rajarshi",
      img: "https://scontent.fccu10-1.fna.fbcdn.net/v/t1.6435-1/p320x320/159862349_4066896653321708_8610620326343169551_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=7206a8&_nc_ohc=GLMFbHD7umAAX_3iDBC&_nc_ht=scontent.fccu10-1.fna&tp=6&oh=e99a7b60ab1697bdd3047dc77ea504c7&oe=60CE6EE2",
    },
    {
      name: "Reshab",
      img: "https://scontent.fccu10-1.fna.fbcdn.net/v/t1.6435-1/p320x320/45351650_501566073677104_6566972701724901376_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=7206a8&_nc_ohc=sr5mJzo05csAX9xRKXz&_nc_ht=scontent.fccu10-1.fna&tp=6&oh=f39e8a968e727e3e2490d2939f0dc2d0&oe=60CE04C6",
    },
    {
      name: "Sayandeep",
      img: "https://scontent.fccu10-1.fna.fbcdn.net/v/t1.6435-9/33074611_109299436620721_4263972303731163136_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=QAhFmWRa87MAX8V6a5H&_nc_ht=scontent.fccu10-1.fna&oh=ecc43c4694a85d1e9dc22e881e95253c&oe=60CCC29C",
    },
    {
      name: "Sourav",
      img: "https://scontent.fccu10-1.fna.fbcdn.net/v/t1.6435-1/s320x320/165277385_3808293815892352_5703735070284205032_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=7206a8&_nc_ohc=80QNcib1rhYAX_JSYDc&_nc_ht=scontent.fccu10-1.fna&tp=7&oh=03ec32af49c1dea01af677f066bf546e&oe=60CE66AD",
    },
    {
      name: "Swapnil",
      img: "https://lh3.googleusercontent.com/pw/ACtC-3ex5XZ6x0Kokvy-XaVoJkha8--x4yoYJG2SHWudSjf2le0jxKszKQ0W4j-NFKJL9KK-QjxYIBOi9v7SL28Q6xXTxdfZXcnm_IC1bBVEI0MDvJr1r2V1QpwQOv1Ro1Kqms0uZjjhjjI3Gj-2BH8byTBykQ=w1067-h1014-no",
    },
  ];

  return (
    <Container>
      <h1
        style={{
          textAlign: "left",
          marginTop: "100px",
        }}
      >
        ABOUT US
      </h1>
      <p style={{ marginTop: "60px", fontSize: "20px" }}>
        Online shoppers experience a lot of friction and that friction prevents
        the customer from buying from your site, as well as decreases your
        Shopify conversion rate. The biggest friction is the fear of being
        deceived, such as paying money but not receiving anything, or the thing
        you receive is not the same as what you see on the internet. That said,
        brand trust is one of the most important factors that affect eCommerce
        sales and Shopify conversion rates. The first and most important thing
        to build brand trust is to tell the customer who you really are, with
        unique and trustful identity. That is the reason why Shopify about us
        pages become one of the most important elements that help increase
        Shopify conversion rate. In this article, let's have a look at how
        e-Commerce about us page examples help you create your own Shopify about
        us page & increase conversion rates. Other articles you may be
        interested in: Shopify marketing: Shopify SEO Ultimate Guide for
        Beginners Page Building: Launching an eCommerce store? Start building
        Shopify coming soon page now What we have in this article? The best
        example of Shopify e-Commerce "About us" page template Create your own
        Shopify "about us" page. The best example of Shopify e-Commerce "About
        Us" page template The best way to learn something is learning from the
        best! In this article, I will analyse the most outstanding eCommerce
        About Us page examples to help you learn the lesson behind: How Shopify
        About Us pages really increase eCommerce conversion rates.
      </p>

      <h1
        style={{
          textAlign: "center",
          marginTop: "100px",
          marginBottom: "50px",
        }}
      >
        OUR CREATORS
      </h1>

      <Row>
        {people.map((people) => (
          <Col>
            <Creator person={people} />
            <br />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AboutusScreen;
