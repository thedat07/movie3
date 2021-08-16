
import Link from 'next/link'
import { helper } from "../../helper/helper";
import Post from '../post/post'
import { Row, Col } from 'antd'
import slugify from 'react-slugify'
export default function PopularMovie({ dataMovies, loading, movie }) {
    if (loading || helper.isEmptyObject(dataMovies)) {
        return (
            <Row gutter={[16, 16]}>
                <Col span={12} >  <Post></Post></Col>
                <Col span={12} >  <Post></Post></Col>
            </Row>
        )
    }
    
    return (
        <>
            {
                movie ?
                    <Row gutter={[16, 16]}>
                        {dataMovies.results.map((item, index) => {
                            return (

                                <Col span={12} key={item.id} >
                                    <Post
                                        backdrop_path={item.backdrop_path}
                                        original_title={item.original_title}
                                        release_date={item.release_date}
                                        overview={item.overview}
                                        genres={helper.isGenresMovie(item.genre_ids)}
                                        loading={loading}
                                        LinkURL={item.id}
                                        movie={movie}
                                    ></Post>
                                </Col>

                            )
                        })}
                    </Row> :
                    <Row gutter={[16, 16]}>
                        {dataMovies.results.map((item, index) => {
                           
                            return (

                                <Col span={12} key={item.id}  >
                                    <Post
                                        backdrop_path={item.backdrop_path}
                                        original_title={item.name}
                                        release_date={item.first_air_date}
                                        overview={item.overview}
                                        genres={helper.isGenresTv(item.genre_ids)}
                                        loading={loading}
                                        LinkURL={item.id}
                                        movie={movie}
                                    ></Post>
                                </Col>

                            )
                        })}
                    </Row>
            }
        </>
    )
}