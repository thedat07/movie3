import styled from './header.module.css'
export default function Header(){
    return(
        <div className={styled.header}>
            <div className={styled.headerTitles}>
                <span className={styled.headerTitleSm}>Movies</span>
                <span className={styled.headerTitleLg}>Blog</span>
            </div>
            
            <img className={styled.headerImg} src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"></img>
        </div>
    )
}