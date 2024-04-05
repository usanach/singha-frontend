import { Metadata } from "next/types";
import React from "react"

export async function generateStaticParams() {
    const res = await fetch('https://www.melivecode.com/api/attractions/static_paths').then((res) => res.json())
    return res
}
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const res = await fetch('https://www.melivecode.com/api/attractions/' + params.id).then((res) => res.json())
    return {
        title: res.attraction.name,
        openGraph: {
            title: res.attraction.name,
            description: res.attraction.detail,
            siteName:""
        }
    }
}

async function getAttraction(params: any) {

    const res = await fetch('https://www.melivecode.com/api/attractions/' + params).then((res) => res.json())
    return res
}


export default async function Page({ params }: { params: { id: string } }) {
    const data = await getAttraction(params.id);

    return (
        <section className="flex flex-col mt-10">
            <div className="mx-auto max-w-[500px] bg-white">
                <img src={data.attraction.coverimage} alt="" />
                <div className="pt-2 px-5 pb-10">
                    <h1 className="mt-5 uppercase">{data.attraction.name} </h1>
                    <p className="mt-10">
                        {data.attraction.detail}
                    </p>
                </div>
            </div>
        </section>
    )
}
