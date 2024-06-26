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

		const direction = binding.value?.direction || "left";
		const duration = binding.value?.duration || "0.6s";

		let observer = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					el.style.transition = `all ${duration} ease-in-out`;
					el.style.transform = `translate(0)`;
					el.style.opacity = 1;
				} else {
					init();
				}
			});
		}, options);

		function init() {
			el.style.transform = `translate${
				direction.toUpperCase() === "LEFT" ||
				direction.toUpperCase() === "RIGHT"
					? "X"
					: "Y"
			}(${
				direction.toUpperCase() === "LEFT" ||
				direction.toUpperCase() === "TOP"
					? "-"
					: "+"
			}${
				binding.value?.offset ||
				(innerWidth - el.getBoundingClientRect().width) / 2 - 20
			}px)`;
			el.style.opacity = 0;
			observer.observe(el);
		}

		init();
	},
};
