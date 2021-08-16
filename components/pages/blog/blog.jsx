import styled from './blog.module.css'
import Posts from '../../posts/postsblog'
import Sidebar from '../../sidebar/sidebar'
export default function Header(){
    return(
        <div className={styled.home}>
            <Posts></Posts>
            <Sidebar></Sidebar>
        </div>
    )
}