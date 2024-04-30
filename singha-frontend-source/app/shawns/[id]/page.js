import Image from 'next/image'
import React from "react"

export async function generateStaticParams() {
    const res = await fetch('https://www.melivecode.com/api/attractions/static_paths').then((res) => res.json())
    return res
}
export async function generateMetadata({ params }) {
    const res = await fetch('https://www.melivecode.com/api/attractions/' + params.id).then((res) => res.json())
    return {
        title: res.attraction.name,
        openGraph: {
            title: res.attraction.name,
            description: res.attraction.detail,
            siteName: ""
        }
    }
}

async function getAttraction(params) {

    const res = await fetch('https://www.melivecode.com/api/attractions/' + params).then((res) => res.json())
    return res
}


export default async function Page({ params }) {
    return (
        <section className="flex flex-col mt-10 bg-2">
            <div className="mx-auto max-w-[500px] bg-white">
            </div>
        </section>
    )
}
