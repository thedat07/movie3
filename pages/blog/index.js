import Layout from "../../components/layout/index";
import BLogContent from '../../components/pages/blog/blog'
import HeaderContent from '../../components/header/header'
export default function Movie() {
  return (
    <Layout>
        <HeaderContent></HeaderContent> 
        <BLogContent></BLogContent>
    </Layout>
  );
}
