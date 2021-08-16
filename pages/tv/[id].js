import Layout from "../../components/layout/index";
import HeaderContent from "../../components/header/header";
import SingleTv from "../../components/pages/single/singleTv";
import TvProvider from "../../context/TvProvider";
import MessProvider from "../../context/MessageProvider";
export default function Movie() {
  return (
    <Layout>
      <TvProvider>
        <MessProvider>
          <HeaderContent></HeaderContent>
          <SingleTv></SingleTv>
        </MessProvider>
      </TvProvider>
    </Layout>
  );
}
