
import AboutUsBlock from "./home_components/AboutUsBlock";
import CatalogList from "./home_components/CatalogList";
import HomeCatalogBlock from "./home_components/HomeCatalogBlock";
import Main from "./home_components/Main";
import Presentation from "./home_components/Presentaition";

import './styles/home.scss';


export default function Home() {

  return (
    <div className="home">
            
        <Main />

        <HomeCatalogBlock />

        <AboutUsBlock />

        <Presentation />

        <CatalogList />

    </div>
  );
}
