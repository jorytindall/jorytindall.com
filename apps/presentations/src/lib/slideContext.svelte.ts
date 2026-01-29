import { getContext, setContext } from 'svelte';

const SLIDE_CONTEXT_KEY = Symbol('slide-context');

export interface SlideMetadata {
	index: number;
	section?: string;
	title?: string;
	hideHeader?: boolean;
}

export interface SlideContextValue {
	currentSlide: SlideMetadata | null;
	totalSlides: number;
	registerSlide: (metadata: Omit<SlideMetadata, 'index'>) => number;
	setCurrentSlideIndex: (index: number) => void;
}

export function createSlideContext(): SlideContextValue {
	let slides = $state<Omit<SlideMetadata, 'index'>[]>([]);
	let currentIndex = $state<number>(0);

	const context: SlideContextValue = {
		get currentSlide() {
			if (slides.length === 0) return null;
			const slide = slides[currentIndex];
			return slide ? { ...slide, index: currentIndex } : null;
		},
		get totalSlides() {
			return slides.length;
		},
		registerSlide(metadata: Omit<SlideMetadata, 'index'>) {
			const index = slides.length;
			slides.push(metadata);
			return index;
		},
		setCurrentSlideIndex(index: number) {
			currentIndex = index;
		},
	};

	setContext(SLIDE_CONTEXT_KEY, context);
	return context;
}

export function getSlideContext(): SlideContextValue {
	return getContext<SlideContextValue>(SLIDE_CONTEXT_KEY);
}
