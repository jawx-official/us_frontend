import React from 'react'
import { NextSeo } from 'next-seo';
import { SeoInterface } from '@/data/seo.interfaces';

export default function SEO({ title }: SeoInterface) {
    return (
        <NextSeo
            title={`Urbanspaces - ${title ? title : "Find the Best Properties for Sale and Rent in Nigeria"}`}
            description="Looking for properties for sale or rent in Nigeria? Urbanspaces offers a wide range of options for your next home or investment. Find your dream property today!"
            canonical="https://urbanspaces.ng"
            openGraph={{
                url: 'https://urbanspaces.ng',
                title: `Urbanspaces - ${title ? title : "Find the Best Properties for Sale and Rent in Nigeria"}`,
                description: "Looking for properties for sale or rent in Nigeria? Urbanspaces offers a wide range of options for your next home or investment. Find your dream property today!",
                images: [
                    {
                        url: 'https://urbanspaces.ng/android-chrome-512x512.png',
                        alt: 'App logo.',
                    },
                ],
                site_name: 'Urbanspaces Nigeria',
            }}
        />
    )
}
