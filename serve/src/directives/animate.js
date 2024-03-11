export default {
	mounted(el, binding) {
		let options = {
			root: null,
			threshold: 0.2,
		};

		const direction = binding.value?.direction || "left";
		const offset = binding.value?.offset || 200;
		const duration = binding.value?.duration || "0.6s";
		const transform = `translate${
			direction.toUpperCase() === "LEFT" ||
			direction.toUpperCase() === "RIGHT"
				? "X"
				: "Y"
		}(${
			direction.toUpperCase() === "LEFT" ||
			direction.toUpperCase() === "TOP"
				? "-"
				: "+"
		}${offset}px)`;

		let observer = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					el.style.transition = `all ${duration} ease-in-out`;
					el.style.transform = `translate(0)`;
					el.style.opacity = 1;
				} else {
					init()
				}
			});
		}, options);

		function init() {
			el.style.transform = transform;
			el.style.opacity = 0;
			observer.observe(el);
		}

        init()
	},
};
