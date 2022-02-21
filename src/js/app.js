const navigation_show = document.querySelector('#show_navigation');
const navigation = document.querySelector('#navigation');
const hamburgers = document.querySelectorAll('.hamburger');
const links_container = document.querySelector('#links-container');

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
let prevScrollPosition = window.pageYOffset;
window.onscroll = function () {
	if (!navigation_show.classList.contains('show')) {
		let currentScrollPosition = window.pageYOffset;
		if (prevScrollPosition > currentScrollPosition) {
			navigation.style.opacity = '1';
		} else {
			navigation.style.opacity = '0.5';
		}
		prevScrollPosition = currentScrollPosition;
	}
};

// Mobil nav
const mobileMenu = () => {
	hamburgers.forEach((element) => element.classList.toggle('active'));
	navigation_show.classList.toggle('show');
	links_container.classList.toggle('show');

	if (navigation.style.opacity === '0') {
		navigation.style.opacity = '1';
	} else {
		navigation.style.opacity = '0';
	}
};

hamburgers.forEach((element) => element.addEventListener('click', mobileMenu));

const mediaQueries = () => {
	console.log('hi');
	if (window.matchMedia('(max-width: 776px)').matches) {
		console.log('works!');
		// Check the breakpoint in _breakpoints.scss and the slider class
		const slider = document.querySelector('#slider');
		const innerSlider = document.querySelector('#inner-slider');

		let pressed = false;
		let startX;
		let X;

		slider.addEventListener('mousedown', (e) => {
			pressed = true;
			startX = e.offsetX - innerSlider.offsetLeft;
			slider.style.cursor = 'grabbing';
			console.log('grab');
		});

		slider.addEventListener('mouseenter', () => {
			slider.style.cursor = 'grab';
		});

		slider.addEventListener('mouseup', () => {
			slider.style.cursor = 'grab';
		});

		window.addEventListener('mouseup', () => {
			pressed = false;
		});

		slider.addEventListener('mousemove', (e) => {
			if (!pressed) return;
			e.preventDefault();

			X = e.offsetX;

			innerSlider.style.left = `${X - startX}px`;
			checkBoundary();
		});

		function checkBoundary() {
			let outer = slider.getBoundingClientRect();
			let inner = innerSlider.getBoundingClientRect();
			if (parseInt(innerSlider.style.left) > 0) {
				innerSlider.style.left = '0px';
			} else if (inner.right < outer.right) {
				innerSlider.style.left = `-${inner.width - outer.width}px`;
			}
		}

		// Mobile slider
		slider.addEventListener(
			'touchstart',
			(e) => {
				pressed = true;
				startX = e.targetTouches[0].clientX - innerSlider.offsetLeft;
			},
			{ passive: true }
		);

		slider.addEventListener(
			'touchmove',
			(e) => {
				if (!pressed) return;
				X = e.targetTouches[0].clientX;

				innerSlider.style.left = `${X - startX}px`;
				checkBoundary();
			},
			{ passive: true }
		);
	} 
};

window.onresize = mediaQueries;
