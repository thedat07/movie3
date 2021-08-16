import styled from './movie.module.css'
import PostsGenres from '../../posts/postsgenres'
import Sidebar from '../../sidebar/sidebar'
export default function Header(){
    return(
        <div className={styled.home}>
            <PostsGenres></PostsGenres>
            <Sidebar></Sidebar>
        </div>
    )
}