'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { getClasses } from 'utils/getClasses';
import styles from './Carousel.module.css';

type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];

interface CarouselProps {
	children: React.ReactNode[];
	options?: CarouselOptions;
	className?: string;
}

export const Carousel = ({ children, options, className }: CarouselProps) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: false,
		align: 'start',
		containScroll: 'trimSnaps',
		...options,
	});

	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const hasMultipleSlides = children.length > 1;

	const handleControlClick = useCallback(
		(e: React.MouseEvent, action: () => void) => {
			e.preventDefault();
			e.stopPropagation();
			action();
		},
		[]
	);

	const scrollPrev = useCallback(() => {
		emblaApi?.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		emblaApi?.scrollNext();
	}, [emblaApi]);

	const scrollTo = useCallback(
		(index: number) => {
			emblaApi?.scrollTo(index);
		},
		[emblaApi]
	);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
		setCanScrollPrev(emblaApi.canScrollPrev());
		setCanScrollNext(emblaApi.canScrollNext());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		onSelect();
		emblaApi.on('select', onSelect);
		emblaApi.on('reInit', onSelect);
		return () => {
			emblaApi.off('select', onSelect);
			emblaApi.off('reInit', onSelect);
		};
	}, [emblaApi, onSelect]);

	const wrapperClasses = getClasses([styles.wrapper, className ?? null]);

	if (!hasMultipleSlides) {
		return (
			<div className={wrapperClasses}>
				<div className={styles.singleSlide}>{children[0]}</div>
			</div>
		);
	}

	return (
		<div className={wrapperClasses}>
			<div className={styles.viewport} ref={emblaRef}>
				<div className={styles.container}>
					{children.map((child, index) => (
						<div className={styles.slide} key={index}>
							{child}
						</div>
					))}
				</div>
			</div>

			<button
				className={getClasses([
					styles.arrow,
					styles.arrowPrev,
					!canScrollPrev ? styles.arrowDisabled : null,
				])}
				onClick={(e) => handleControlClick(e, scrollPrev)}
				disabled={!canScrollPrev}
				aria-label="Previous slide"
				type="button"
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					aria-hidden="true"
				>
					<path
						d="M12.5 15L7.5 10L12.5 5"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>

			<button
				className={getClasses([
					styles.arrow,
					styles.arrowNext,
					!canScrollNext ? styles.arrowDisabled : null,
				])}
				onClick={(e) => handleControlClick(e, scrollNext)}
				disabled={!canScrollNext}
				aria-label="Next slide"
				type="button"
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					aria-hidden="true"
				>
					<path
						d="M7.5 15L12.5 10L7.5 5"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>

			<div className={styles.dots} role="tablist" aria-label="Slides">
				{children.map((_, index) => (
					<button
						key={index}
						className={getClasses([
							styles.dot,
							index === selectedIndex ? styles.dotActive : null,
						])}
						onClick={(e) => handleControlClick(e, () => scrollTo(index))}
						aria-label={`Go to slide ${index + 1}`}
						aria-selected={index === selectedIndex}
						role="tab"
						type="button"
					/>
				))}
			</div>
		</div>
	);
};
