import {onMounted, onUnmounted, ref} from 'vue'
import {debounce} from 'lodash-es';

export const useWindowSize = () => {
	const width = ref(0);
	const height = ref(0);
	const sideWidth = ref(0);

	const resize = () => {
		width.value = window.innerWidth;
		height.value = window.innerHeight;
	}

	onMounted(() => {
		sideWidth.value = Math.max(0, document.querySelector('.s-aside')!.clientWidth);
		window.addEventListener('resize', debounce(resize, 80));
	});

	onUnmounted(() => {
		window.removeEventListener('resize', resize);
	});

	return {width, height, sideWidth};
}