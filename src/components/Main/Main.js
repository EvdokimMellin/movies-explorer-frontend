import GlobalNav from "../GlobalNav/GlobalNav";
import NavTab from "./NavTab/NavTab";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Footer from "../Footer/Footer";

export default function Main(props) {
  return (<>
    {props.loginState ? <GlobalNav page="main" /> : <NavTab />}
    <Promo />
    <main>
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
    <Footer />
  </>);
}
