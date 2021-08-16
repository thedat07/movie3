import { Breadcrumb } from 'antd'
import styled from './breadcrumb.module.css'
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import Link from 'next/link'
export default function BreadcrumbPage() {
    const router = useRouter();
    const breadcrumb = router.asPath.split('/').filter((x) => x);
    const breadcrumbPage = breadcrumb.pop().split('~').filter((x) => x);
    useEffect(() => {
        if (!router.isReady) return;
    }, [breadcrumb, breadcrumbPage]);
    return (
        <div className={styled.breadcrumb} >
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link href="/" className={styled.link}>
                        <a style={{ textTransform: 'capitalize' }}>home</a>
                    </Link>
                </Breadcrumb.Item>
                {
                    breadcrumb.map((item, index) => {
                        return (
                            <Breadcrumb.Item key={index} >
                                <Link href={`/${item}`} >
                                    <a style={{ textTransform: 'capitalize' }}>{item}</a>
                                </Link>
                            </Breadcrumb.Item>
                        )
                    })
                }
                <Breadcrumb.Item>
                    <a href={`/movie/${breadcrumbPage[0]}~${breadcrumbPage[1]}`} style={{ textTransform: 'capitalize' }}>
                        {(breadcrumbPage[1].replace('-', ' '))}
                    </a>
                </Breadcrumb.Item>
            </Breadcrumb>
        </div>

    )
}