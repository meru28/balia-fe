"use client"
import Typewriter from "@/components/fancy/typewriter"
import { Button } from "@/components/ui/button";
import {ShoppingBag} from "lucide-react";

export default function Hero() {
    return (
        <section
            className="relative flex items-center justify-start h-screen bg-cover bg-center text-white"
            style={{
                backgroundImage: "url('/images/landing-page/hero-1.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 max-w-4xl px-6 md:px-12 lg:px-20">
                <h1 className="text-4xl font-bold md:text-6xl leading-tight animate-fade-in-up">
                    Summer is here. Always.
                </h1>
                <div className="mt-4 text-lg md:text-xl text-gray-200 animate-fade-in-up delay-200">
                    <Typewriter
                        text={[
                            "Where the Sun Never Sets on Summer."
                        ]}
                        speed={70}
                        className="text-gray-300"
                        waitTime={1500}
                        deleteSpeed={40}
                        cursorChar={"_"}
                    />
                </div>
                <div className="mt-6 space-x-4 animate-fade-in-up delay-400">
                    <Button variant="default" size="lg">
                        <ShoppingBag />
                        Shop Now
                    </Button>
                </div>
            </div>
        </section>
    );
}
