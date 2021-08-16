import { Row, Tabs, Pagination } from 'antd'
import Movie from '../movies/popular'
const { TabPane } = Tabs;
export default function TabPanePage({ data, page, loading, changePage, movie }) {
    return (
        <Row gutter={[16, 16]}>
            <Movie dataMovies={data} loading={loading} movie={movie}></Movie>
            <Pagination
                total={data.total_pages}
                current={page}
                onChange={(p) => changePage(p)}
            />
        </Row>
    )
}