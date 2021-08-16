import styled from './list.module.css'
import ListItem from '../listitem/listitem'
import Slider from "react-slick";
import {helper} from '../../helper/helper'
import {api} from '../../api/api'
import { Spin } from 'antd'
export default function Header({ isLoading, isData = {}, isMovie }) {
    const NextArrow = ({ onClick }) => {
        return (
            <div className={styled.arrow + " " + styled.next} onClick={onClick}>
                <i className="fas fa-arrow-right"></i>
            </div>
        );
    };
    const PrevArrow = ({ onClick }) => {
        return (
            <div className={styled.arrow + " " + styled.prev} onClick={onClick}>
                <i className="fas fa-arrow-left"></i>
            </div>
        );
    };
    var settings = {
        infinite: true,
        lazyload: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        centerMode: true,
        centerPadding: 0,
        initialSlide: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    if (isLoading || helper.isEmptyObject(isData)) {
        return (
            <Spin style={{ position: 'fixed', inset: 0 }} />
        );
    }
    return (
        <div>
            <Slider {...settings} className={styled.container}>
                {
                    isData.map((item, index) => {
                        return (
                            <div key={item.id}>
                                <ListItem isImage={item.poster_path} isLink={item.id} isMovie={isMovie} isName={isMovie?item.original_title:item.original_name}></ListItem>
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    );
}

