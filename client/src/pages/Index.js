import Helmet from "react-helmet";

import CallToAction from "../components/index/CallToAction";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/index/Hero";
import Pricing from "../components/index/Pricing";
import PrimaryFeatures from "../components/index/PrimaryFeatures";
import SecondaryFeatures from "../components/index/SecondaryFeatures";
import Testimonials from "../components/index/Testimonials";
import Banner from "../components/index/Banner";

export default function Home(props) {
  const { profile } = props;

  return (
    <>
      <Helmet>
        <title>
          PopUpTeam - Finding a team made simple for small businesses
        </title>
        <meta
          name="description"
          content="Finding a team made simple for small businesses"
        />
      </Helmet>

      <Header profile={profile} />
      
      <>
        <Hero />
        {/* <PrimaryFeatures /> */}
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
      </>

      <Banner />
      <Footer />
    </>
  );
};