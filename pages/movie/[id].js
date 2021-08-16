
import Layout from "../../components/layout/index";
import HeaderContent from "../../components/header/header";
import Single from "../../components/pages/single/single";
import MovieProvider from "../../context/MovieProvider";
import MessProvider from "../../context/MessageProvider";
export default function Movie() {
  return (
    <Layout>
      <MovieProvider>
        <MessProvider>
          <HeaderContent></HeaderContent>
          <Single></Single>
        </MessProvider>
      </MovieProvider>
    </Layout>
  );
}
