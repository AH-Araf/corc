'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import sliderImg1 from '../../../public/assets/images/MOD 1-03.png';
import sliderImg2 from '../../../public/assets/images/MOD 1-02.png';
import sliderImg3 from '../../../public/assets/images/MOD 1-01.png';

const SliderImage = ({ src, alt }) => (
    <div className="relative h-full w-full overflow-hidden">
        <Image
            src={src}
            alt={alt}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-500 ease-in-out opacity-100"
        />
    </div>
);

const SliderButton = ({ onClick, active, label }) => (
    <button
        onClick={onClick}
        className={`px-6 py-1 rounded-[40px] flex-col justify-start items-start gap-[9px] inline-flex ${
            active ? 'bg-[#027373] text-white hover:bg-[#027373]' : 'text-[#231D06]'
        }`}
    >
        <div className="self-stretch text-center text-lg font-semibold leading-10">{label}</div>
    </button>
);

const SliderDotIndicator = ({ active }) => (
    <div
        className={`w-[12px] h-[12px] rounded-full transition-colors ${
            active ? 'bg-[#C25968]' : 'bg-[#D9D9D9]'
        }`}
    />
);

const SliderComponent = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [hasZoomedOnce, setHasZoomedOnce] = useState(false);
    const sliderRef = useRef(null);

    const slideImages = [
        { src: sliderImg1, alt: 'GR activation by cortisol', label: 'GR activation by cortisol' },
        { src: sliderImg2, alt: 'Anti-apoptotic gene expression', label: 'Anti-apoptotic gene expression' },
        { src: sliderImg3, alt: 'Apoptotic suppression', label: 'Apoptotic suppression' },
    ];

    const slideDetails = [
        'When activated by cortisol, the glucocorticoid receptor translocates to the nucleus.',
        'In the nucleus, activated GR promotes expression of anti-apoptotic genes, including SGK1 and DUSP1.',
        'SGK-1 and DUSP1 suppress apoptotic pathways and reduce chemotherapy efficacy.',
    ];

    const handleChangeSlide = (index) => {
        setActiveIndex(index);
        if (index === 2 && isFullScreen) {
            setTimeout(() => {
                setIsFullScreen(false);
            }, 1000);
        }
    };

    const handleScroll = (event) => {
        if (isFullScreen) {
            const direction = event.deltaY; 
            if (direction > 0 && activeIndex < 2) {
                setActiveIndex((prev) => Math.min(prev + 1, 2));
            } else if (direction < 0 && activeIndex > 0) {
                setActiveIndex((prev) => Math.max(prev - 1, 0));
            }

            if (activeIndex === 2) {
                setTimeout(() => {
                    setIsFullScreen(false); 
                }, 1000);
            }
        }
    };

    useEffect(() => {
        const handleScrollEvent = (event) => {
            handleScroll(event);
        };

        window.addEventListener('wheel', handleScrollEvent, { passive: true });
        return () => window.removeEventListener('wheel', handleScrollEvent);
    }, [activeIndex, isFullScreen]);

    useEffect(() => {
        const handleScroll = () => {
            if (!hasZoomedOnce && sliderRef.current) {
                const rect = sliderRef.current.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    requestAnimationFrame(() => {
                        setIsFullScreen(true); 
                        setHasZoomedOnce(true);
                    });
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasZoomedOnce]);

    useEffect(() => {
        setHasZoomedOnce(false); 
    }, []);

    return (
        <div
            ref={sliderRef}
            className={`transition-transform duration-[2s] ${
                isFullScreen
                    ? 'fixed inset-0 z-50 scale-100 bg-white opacity-100'
                    : 'relative scale-75 w-[1094px] mx-auto h-[528px] opacity-100'
            }`}
        >
            <div className="relative w-full h-full">
                <SliderImage
                    src={slideImages[activeIndex].src}
                    alt={slideImages[activeIndex].alt}
                />
            </div>
            <div className={`relative w-full flex flex-col items-center ${isFullScreen ? 'bottom-44' : 'bottom-5'}`}>
                <div className="h-[60px] px-2 py-1.5 bg-[#e9fcf5] rounded-[32px] shadow border border-[#a7f2d7] flex justify-center items-center gap-4">
                    {slideImages.map((slide, index) => (
                        <SliderButton
                            key={index}
                            onClick={() => handleChangeSlide(index)}
                            active={index === activeIndex}
                            label={slide.label}
                        />
                    ))}
                </div>
                <div className="text-[#027373] w-[552px] font-semibold text-center text-xl leading-[30px] mt-4">
                    {slideDetails[activeIndex]}
                </div>
                <div className="flex space-x-2 mt-[25px]">
                    {slideImages.map((_, index) => (
                        <SliderDotIndicator key={index} active={index === activeIndex} />
                    ))}
                </div>
            </div>
        </div>

        
    );
};

export default SliderComponent;