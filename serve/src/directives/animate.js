import { debounce } from "@/utils/debounce";

let innerWidth = window.innerWidth;
window.addEventListener("resize", debounce(() => {
	innerWidth = window.innerWidth;
}))

export default {
	mounted(el, binding) {
		let options = {
			root: null,
			threshold: 0.15,
		};

		const direction = binding.value?.direction.toUpperCase() || "LEFT";
		const duration = binding.value?.duration || 600;

		const pos = direction === "LEFT" || direction === "RIGHT" ? "X" : "Y";
		const isPositive = direction === "LEFT" || direction === "TOP" ? 1 : -1;

		let observer = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const offset = binding.value?.offset || (innerWidth - el.getBoundingClientRect().width) / 2 - 20;
					const fromStyle = {
						transform: `translate${pos}(${offset * isPositive}px)`,
						opacity: 0,
					};
					const toStyle = {
						transform: `translate(0)`,
						opacity: 1,
					};
					el.animate([fromStyle, toStyle], {
						duration,
						easing: "ease-in-out",
						fill: "forwards",
					});
				} else {
					init();
				}
			});
		}, options);

		function init() {
			observer.observe(el);
		}

		init();
	},
};
