import Head from 'next/head';
import React from 'react'
interface PageMeta {
    title: string;
    description: string;
    keywords?: string;
}
export default function PageMetaComponent({ title, description }: PageMeta) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}
