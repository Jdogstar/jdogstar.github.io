//Code came/learned from user David @ https://stackoverflow.com/users/5247200/david
//Code was found and modified from https://stackoverflow.com/questions/32395988/highlight-menu-item-when-scrolling-down-to-section
//These have been listed in compliance with stackoverflow's copyright and attribution necessary for using code. Non commercial product.

// cache the navigation links 
var $navLinks = document.querySelectorAll('nav > ul > li > a');
// cache (in reversed order) the sections
var $sections = document.getElementsByTagName('section');

// map each section id to their corresponding navigation link
var sectionNavLink = {};
for (var i = $sections.length-1; i >= 0; i--) {
	var id = $sections[i].id;
	sectionNavLink[id] = document.querySelectorAll('nav > ul > li > a[href=\\#' + id + ']') || null;
}

function getOffset( el ) {
	var _x = 0;
	var _y = 0;
	while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
		_x += el.offsetLeft - el.scrollLeft;
		_y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}
	return { top: _y, left: _x };
}

function highlightNavigation() {
	// get the current vertical position of the scroll bar
	var scrollPos = window.pageYOffset || document.documentElement.scrollTop;

	// iterate the sections
	for (var i = $sections.length-1; i >= 0; i--) {
		var currentSection = $sections[i];
		// get the position of the section
		var sectionTop = getOffset(currentSection).top;

	   // if the user has scrolled over the top of the section  
		if (scrollPos >= sectionTop - 250) {
			// get the section id
			var id = currentSection.id;
			// get the corresponding navigation link
			var $navLink = sectionNavLink[id];
			// if the link is not active
			if (typeof $navLink[0] !== 'undefined') {
				if (!$navLink[0].classList.contains('active')) {
					// remove .active class from all the links
					for (i = 0; i < $navLinks.length; i++) {
						$navLinks[i].className = $navLinks[i].className.replace(/ active/, '');
					}
					// add .active class to the current link
					$navLink[0].className += (' active');
				}
			} else {
					// remove .active class from all the links
					for (i = 0; i < $navLinks.length; i++) {
						$navLinks[i].className = $navLinks[i].className.replace(/ active/, '');
					}
			}	
			// we have found our section, so we return false to exit the each loop
			return false;
		}
	}
}

window.addEventListener('scroll',highlightNavigation);