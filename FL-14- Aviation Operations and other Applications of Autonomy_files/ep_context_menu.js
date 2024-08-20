/*
ep_context_menu.js

This script is required when using an ep_context_menu and css

Written by R Raymond
Copyright ATIV Software, 2015.
*/

$('html').click(function() {
 $('.selectedMenu').removeClass('selectedMenu');
});

function ToggleDropdownMenu(event, $this){
	if($this.next('.ep_context_menu').hasClass('selectedMenu')){
		$this.next('.ep_context_menu').removeClass('selectedMenu');
		$this.removeClass('selectedMenu');
	} else {
		$('.selectedMenu').removeClass('selectedMenu');
		$this.next('.ep_context_menu').addClass('selectedMenu');
		$this.addClass('selectedMenu');
	}
	event.stopPropagation();
}

function GoToLink(href, e){
	e.preventDefault();
	e.stopPropagation();
	window.location.href=href;
}