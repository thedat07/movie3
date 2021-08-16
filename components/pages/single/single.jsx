import styled from './single.module.css'
import Sidebar from '../../sidebar/sidebar'
import SinglePost from '../../singlePost/singlePost'
export default function Single(){
    return(
        <div className={styled.single}>
          <SinglePost></SinglePost>
            <Sidebar></Sidebar>
        </div>
    )
}