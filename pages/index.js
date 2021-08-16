import Layout from '../components/layout/index'
import HomeContent from '../components/pages/home/home'
import HeaderContent from '../components/header/header'

export default function Home() {
  return (
    <>
     <Layout>
        <HeaderContent></HeaderContent> 
        <HomeContent></HomeContent>
     </Layout>
     </>
  
  )
}
