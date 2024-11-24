'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import sliderImg1 from '../../../public/assets/images/a.png';
import sliderImg2 from '../../../public/assets/images/b.png';
import sliderImg3 from '../../../public/assets/images/c.png';
import './SliderComponent.css'

const SliderImage = ({ src, alt }) => (
    <div className="relative h-full w-full overflow-hidden">
        <Image src={src} alt={alt} layout="fill" objectFit='contain' className="transition-opacity duration-500 ease-in-out opacity-100 w-full pt-3" />
    </div>
);

const SliderButton = ({ onClick, active, label }) => (
    <button
        onClick={onClick}
        className={`px-2 md:px-6 py-3 rounded-[40px] flex-col justify-start items-start gap-[9px] inline-flex ${active ? 'bg-[#027373] text-white hover:bg-[#027373]' : 'text-[#231D06]'}`}
    >
        <div className="self-stretch text-center button-text-details ">{label}</div>
    </button>
);

const SliderDotIndicator = ({ onClick, active }) => (
    <div
        onClick={onClick}
        className={`w-[12px] h-[12px] rounded-full transition-colors cursor-pointer ${active ? 'bg-[#C25968]' : 'bg-[#D9D9D9]'}`}
    />
);

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const SliderComponent = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [hasLeftComponent, setHasLeftComponent] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('none');
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
        if (activeIndex - 1 === 0) {
            setTimeout(() => setIsFullScreen(false), 1000);
        }
    };

    const handleScroll = (event) => {
        if (isFullScreen) {
            const direction = event.deltaY;

            if (direction > 0 && activeIndex < 2) {
                setActiveIndex((prev) => Math.min(prev + 1, 2));
                if (activeIndex + 1 === 2) {
                    setTimeout(() => setIsFullScreen(false), 1000);
                }
            } else if (direction < 0 && activeIndex > 0) {
                setActiveIndex((prev) => Math.max(prev - 1, 0));
                if (activeIndex - 1 === 0) {
                    setTimeout(() => setIsFullScreen(false), 1000);
                }
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

    const checkComponentVisibility = debounce(() => {
        if (sliderRef.current) {
            const rect = sliderRef.current.getBoundingClientRect();
            const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
            if (isInView) {
                if (!isFullScreen && hasLeftComponent) {
                    if (scrollDirection === 'top') {
                        setActiveIndex(0);
                    } else if (scrollDirection === 'bottom') {
                        setActiveIndex(2);
                    }
                    setIsFullScreen(true);
                    setHasLeftComponent(false);
                }
            } else {
                const isCompletelyOut = rect.bottom < 0 || rect.top > window.innerHeight;
                if (isCompletelyOut) {
                    setHasLeftComponent(true);
                    if (isFullScreen) {
                        setIsFullScreen(false);
                    }
                }
            }
        }
    }, 100);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollDirection(currentScrollY > lastScrollY ? 'bottom' : 'top');
            lastScrollY = currentScrollY;
            checkComponentVisibility();
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasLeftComponent]);

    useEffect(() => {
        if (isFullScreen) {
            document.body.classList.add('overflow-hidden', 'h-screen');
        } else {
            document.body.classList.remove('overflow-hidden', 'h-screen');
        }
        return () => {
            document.body.classList.remove('overflow-hidden', 'h-screen');
        };
    }, [isFullScreen]);

    return (
        <div>
            <div
                ref={sliderRef}
                className={`transition-transform duration-[2s] ${isFullScreen ? 'fixed inset-0 z-50 scale-100 bg-white opacity-100 flex flex-col justify-center items-center' : 'relative transform scale-75 max-w-[1096px] w-full mx-auto h-[528px] opacity-100'}`}
            >
                <div className="relative w-full h-full">
                    <SliderImage src={slideImages[activeIndex].src} alt={slideImages[activeIndex].alt} />
                </div>
                <div className={`relative w-full flex flex-col items-center ${isFullScreen ? 'absolute bottom-36 md:bottom-10 lg:bottom-5' : 'bottom-36 md:bottom-10 lg:bottom-5'}`}>
                    <div className="h-[60px] px-2 py-1.5 bg-[#E9FCF5] rounded-[32px] shadow border border-[#A7F2D7] flex justify-center items-center gap-4">
                        {slideImages.map((slide, index) => (
                            <SliderButton key={index} onClick={() => handleChangeSlide(index)} active={index === activeIndex} label={slide.label} />
                        ))}
                    </div>
                    <div className="text-[#027373] w-[350px] md:w-[552px] font-semibold text-center text-sm md:text-xl leading-[30px] mt-4">
                        {slideDetails[activeIndex]}
                    </div>
                    <div className="flex space-x-2 mt-[25px]">
                        {slideImages.map((_, index) => (
                            <SliderDotIndicator key={index} active={index === activeIndex} onClick={() => handleChangeSlide(index)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SliderComponent;
