import styled from './footer.module.css'
import Link from 'next/link'
export default function footer() {
    return (
        <div className={styled.footer}>
            <div className={styled.footerContent}>
                <div className={styled.social}>
                    <a> <i className="fab fa-facebook-f"></i></a>
                    <a> <i className="fab fa-instagram"></i></a>
                </div>
                <ul className={styled.listInline}>
                    <li className={styled.listInlineItem}>
                        <Link href="/">
                            HOME
                        </Link>
                    </li>
                    <li className={styled.listInlineItem}>
                        <Link href="/movie">
                            MOVIES
                        </Link>
                    </li>
                    <li className={styled.listInlineItem}>
                        <Link href="/tv">
                            TV SHOWS
                        </Link>
                    </li>
                </ul>
                <p className={styled.copyright}>Company Name © 2021</p>
            </div>

        </div>
    )
}