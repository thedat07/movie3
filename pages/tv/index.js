import Layout from "../../components/layout/index";
import MovieContent from '../../components/pages/movie/movie'
import HeaderContent from '../../components/header/header'
export default function Movie() {
  return (
    <Layout>
        <HeaderContent></HeaderContent> 
        <MovieContent></MovieContent>
    </Layout>
  );
}
