import styled from './home.module.css'
import Slider from '../../slider/slider'
import Sidebar from '../../sidebar/sidebar'
export default function Header() {
    return (
        <div className={styled.home}>
            <Slider></Slider>
            <Sidebar></Sidebar>
        </div>
    )
}