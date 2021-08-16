import styled from './single.module.css'
import Sidebar from '../../sidebar/sidebar'
import SinglePostTv from '../../singlePost/singlePostTv'
export default function Single(){
    return(
        <div className={styled.single}>
          <SinglePostTv></SinglePostTv>
            <Sidebar></Sidebar>
        </div>
    )
}