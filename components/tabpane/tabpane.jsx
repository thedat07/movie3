import { Row, Tabs, Col, Pagination } from 'antd'
import Movie from '../movies/popular'
const { TabPane } = Tabs;
export default function TabPanePage({ data, page, loading, changePage, movie }) {
    return (
        <>
            <Movie dataMovies={data} loading={loading} movie={movie}></Movie>
            <Row>
                <Col span={20} offset={2}>
                    <Pagination
                        style={{ textAlign: 'center' }}
                        total={data.total_pages}
                        current={page}
                        onChange={(p) => changePage(p)}
                    />
                </Col>
            </Row>
        </>
    )
}