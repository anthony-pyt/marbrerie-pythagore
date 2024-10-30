"use client";
import React from "react";
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/react-splide/css";
import Image from 'next/image';

export default function SilderComponent(props) {

    return (
        <div className="container mx-auto rounded-lg overflow-hidden shadow-md ">
            <Splide hasTrack={false} aria-label="slider"
                options={{
                    rewind: true,
                    gap: '1rem',
                }}>
                <div className="custom-wrapper">
                    <SplideTrack>
                        {props.images.map((item, index) => (
                            <SplideSlide key={index}>
                                <div className="flex w-full flex-col md:flex-row">
                                    <Image
                                        src={item.image_url}
                                        alt={item.alt}
                                        width={800}
                                        sizes="100vw"
                                        height={600}
                                        priority={true}
                                        quality={75}
                                        className="h-auto max-h-[45vh]  object-cover md:max-w-[40vw] bg-center"
                                    />
                                    <div className=" flex flex-col basis-1/3 items-center justify-center p-4 gap-6 ms-6">
                                        <h2 className="text-left w-full text-base md:text-3xl">{item.title}</h2>
                                        <p className="text-left text-xs md:text-base">{item.description}</p>

                                    </div>
                                </div>
                            </SplideSlide>
                        ))}
                    </SplideTrack>

                    <div className="splide__arrows" />
                </div>
            </Splide>
        </div>
    )
}