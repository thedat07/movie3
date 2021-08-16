import styled from './movie.module.css'
import Posts from '../../posts/posts'
import Sidebar from '../../sidebar/sidebar'
export default function Header(){
    return(
        <div className={styled.home}>
            <Posts></Posts>
            <Sidebar></Sidebar>
        </div>
    )
}