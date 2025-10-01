import { Button } from '@/components/ui/button'
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog'
import { Textarea } from '@/components/ui/textarea'
import { ArrowDown, Globe2, Send } from 'lucide-react'
import React from 'react'

const suggestions = [
    {
        title: "Create New Trip",
        icon: <Globe2 className='text-blue-400 h-5 w-5' />
    },
    {
        title: "Create New Trip",
        icon: <Globe2 className='text-blue-400 h-5 w-5' />
    },
    {
        title: "Create New Trip",
        icon: <Globe2 className='text-blue-400 h-5 w-5' />
    },
    {
        title: "Create New Trip",
        icon: <Globe2 className='text-blue-400 h-5 w-5' />
    },
]

const Hero = () => {
    return (
        <div className='mt-24 flex justify-center'>
            {/* content */}
            <div className='max-w-3xl w-full text-center space-y-6'>
                <h1 className='text-xl md:text-5xl font-bold'>Hey, I'm your personal <span className="text-[#322c8b]">Trip Planner</span> </h1>
                <p className='text-lg'>Tell me what you want,and I'll handle the rest:Flights,Hotels,trip Planner -all in seconds</p>
                {/* input box */}
                <div className='border rounded-2xl p-4 shadow relative'>
                    <Textarea placeholder='Create a trip For Paris To Newyork'
                        className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none' />
                    <Button size={'icon'} className='absolute bottom-6 right-6'>
                        <Send className='h-4 w-4' />
                    </Button>
                </div>

                {/* Suggestion list (moved below input) */}
                <div className='mt-4 flex flex-wrap justify-center gap-3'>
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className='flex items-center gap-2 border px-4 py-2 rounded-full cursor-pointer  hover:bg-primary hover:shadow-md hover:scale-105 hover:text-white transition-all'>
                            {suggestion.icon}
                            <h2>{suggestion.title}</h2>
                        </div>
                    ))}
                </div>
                <div className='flex items-center justify-center flex-col'>
                {/* video section */}
                <h2 className='my-7 mt-14 flex gap-2 text-center'>Not Sure Where to Start?<strong>See how it Works</strong><ArrowDown/></h2>
                <HeroVideoDialog
                    className="block dark:hidden"
                    animationStyle="from-center"
                    videoSrc="https://www.example.com/dummy-video"
                    thumbnailSrc="	https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
                    thumbnailAlt="Dummy Video Thumbnail"
                />
            </div>
            </div>



        </div>
    )
}

export default Hero
