var touchStartPoint = 0,
	currentTransform = 0,
	switcherStartTransform = [];

var localSwitchBooks = (switchElem) => {
	if(window.innerWidth >= 1000) return;
	event.stopPropagation();
	let directMove = event.changedTouches[0].clientX - touchStartPoint; // local switch coordinates, while touch is move

	let transformProp = Modernizr.prefixed('transform'), // prefix for transform at the different browser
		startTransform = parseInt(switchElem.getAttribute("data-startTransform")), // position with which the switch is start
		theta = 0;

    theta = startTransform + directMove;

    switchElem.style[ transformProp ] = 'translate(' + theta + 'px, 0) translateZ(0)';
    switchElem.style.transition = 'transform 0s ease-out';
}

var getStartSwitchPos = (event) => {
	if(window.innerWidth >= 1000) return;
	event.stopPropagation();
	touchStartPoint = event.changedTouches[0].clientX;
}

var finishSwitchBooks = (switchElem) => {
	if(window.innerWidth >= 1000) return;
	event.stopPropagation();
	let transformProp = Modernizr.prefixed('transform'),
		stepSize = parseInt(getComputedStyle(switchElem).width), // step size of switch, when touch is end
		startTransform = parseInt(switchElem.getAttribute("data-startTransform")), // position with which the switch is start
		activeDot = switchElem.nextElementSibling.childNodes, // for dot mark active book
		touchEndPoint = event.changedTouches[0].clientX,
		theta = 0;

		for (let i = activeDot.length - 1; i >= 0; i--) {
			if(activeDot[i].className.search('books-switcher__dot_active') != -1) {
				activeDot[i].className = 'fa fa-circle books-switcher__dot';
			}
		}

		let directionTr = (touchStartPoint - touchEndPoint) > 0 ? -1 : 1; // calc the direction based on start and end touch position

		theta += startTransform + stepSize * directionTr; // summary calc of switch size based on current transform, step size and direction

		// if we reach the end or the start of switch position.
		// TODO change this mechanism on carusel.
		if(theta <= stepSize * switchElem.children.length * -1) { 
			theta = 0;
		}
		else if (theta > 0) {
			theta = stepSize * (switchElem.children.length - 1) * -1;
		}

		let dotC = (theta - stepSize) / -stepSize; // offset begin with -272 or -350 in different client width;

		activeDot[dotC-1].className += ' books-switcher__dot_active';

		switchElem.setAttribute("data-startTransform", theta);

	switchElem.style[ transformProp ] = 'translate(' + theta + 'px, 0) translateZ(0)';
	switchElem.style.transition = 'transform .4s ease-out';

}

var createDots = (switchElems) => {
	if(switchElems.length == 0) return;

	for (let i = switchElems.length - 1; i >= 0; i--) {

		switcherStartTransform[i] = -parseInt(getComputedStyle(switchElems[i]).width);
		switchElems[i].setAttribute("data-startTransform", switcherStartTransform[i]);

		let dotsBlock = switchElems[i].nextElementSibling || '';
		let books = switchElems[i].getElementsByClassName('book') || '';

		for (let j = 0; j <= books.length - 1; j++) {
			let dotElem = document.createElement('i');

			dotElem.className = j == 1 ? "fa fa-circle books-switcher__dot books-switcher__dot_active" : "fa fa-circle books-switcher__dot";
			dotElem.setAttribute("aria-hidden", "true");

			dotsBlock.appendChild(dotElem);
		}
		dotsBlock.style.display = window.innerWidth >= 1000 ? "none" : 'block';
	}
}

var hideSwitchOnWidth = (switchElems, hideWidth) => {
	if(switchElems.length == 0) return;

	for (let i = switchElems.length - 1; i >= 0; i--) {
		let dotsBlock = switchElems[i].nextElementSibling;
		let startTransform = parseInt(switchElems[i].getAttribute("data-startTransform"));

		dotsBlock.style.display = window.innerWidth >= hideWidth ? "none" : 'block';
		switchElems[i].style = window.innerWidth >= hideWidth ? '' : 'transform: translate(' + startTransform +'px, 0) translateZ(0)';
		switchElems[i].setAttribute('data-startTransform', window.innerWidth > 767 ? '-350' : '-272');
	}
}