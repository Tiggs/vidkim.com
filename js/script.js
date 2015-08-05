var vidApp = angular.module('vidApp', ['ngRoute', 'ui.bootstrap']);

// routes
vidApp.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'templates/main.html',
			controller: 'mainController',
			title: 'Welcome'
		})
		.when('/about', {
			templateUrl: 'templates/about.html',
			controller: 'aboutController',
			title: 'About'
		})
		.when('/projects', {
			templateUrl: 'templates/projects.html',
			controller: 'projectsController',
			title: 'Projects'
		})
		.when('/resume', {
			templateUrl: 'templates/resume.html',
			controller: 'resumeController',
			title: 'Resume'
		})
		.when('/contact', {
			templateUrl: 'templates/contact.html',
			controller: 'contactController',
			title: 'Contact'
		});
		
	$locationProvider.html5Mode(true);
});

vidApp.factory('Page', function(){
	var title = 'welcome';
	return {
		title: function() { return title; },
		setTitle: function(newTitle) { title = newTitle; }
	};
});

// individual controllers
vidApp.controller('mainController', function($scope, Page, $location) {
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

	$scope.myInterval = 0;
	$scope.slide_title = ''
	$scope.slides = ''
	
	var gallery_id = 0;

	$('.project-selector').click(function() {
		$('.gallery_frame').slideToggle(400, null);
		gallery_id = $(this).attr('id').match(/\d+/)[0];
		set_gallery(gallery_id);
		
		$('.project-selector').removeClass('project-selected');
		$('#project-selector-' + gallery_id).addClass('project-selected');
	
	});

	function set_gallery(id) {
		/*
		if (id == '0') {
			$scope.slide_title = 'TiggsBot';
			$scope.slides = [
				{
					image: '/images/gallery_mid_preview.png',
					caption: 'Hello world'					
				}, 
				{
					image: '/images/gallery_mid_preview.png',
					caption: 'Hello world'		
				}		
			];	
		}
		*/
		if (id == '0') {
			$scope.slide_title = 'Ambilight Clone';
			$scope.slides = [
				{
					image: '/images/projects/ambilight/10.jpg',
					caption: 'This project is an Ambilight Clone, based off the Philips Ambilight feature in TV sets. '
				},	
				{
					image: '/images/projects/ambilight/3.jpg',
					caption: 'A source video stream goes to a 2 to 1 HDMI splitter, sending one signal to the TV, and the other to an RCA to USB adapter.'
				}, 
				{
					image: '/images/projects/ambilight/1.jpg',
					caption: 'Gutting the LED strip.'
				}, 
				{
					image: '/images/projects/ambilight/2.jpg',
					caption: 'I cut the WS2801 LED into 3 sections to allow for an easier bend around the corner.'
				}, 			
				{
					image: '/images/projects/ambilight/4.jpg',
					caption: 'I took apart an ethernet cable for a long enough cable to reach the TV.'
				}, 
				{
					image: '/images/projects/ambilight/5.jpg',
					caption: 'To ensure portability, I soldered a 4 pin male header onto the ethernet cable to run to the LED strip.'
				}, 			
				{
					image: '/images/projects/ambilight/6.jpg',
					caption: 'I also wanted to make space in the Raspberry Pi when it will be enclosed, so I desoldered the unnecessary RCA jack.'
				}, 
				{
					image: '/images/projects/ambilight/7.jpg',
					caption: 'I wrote a simple program to write to the LEDs on an Arduino micro controller to ensure the wiring was correct and there was sufficient power.'
				}, 
				{
					image: '/images/projects/ambilight/8.jpg',
					caption: 'The magic of this project lies in the conversion software. https://github.com/tvdzwan/hyperion/wiki'
				}, 			

				{
					image: '/images/projects/ambilight/11.jpg',
					caption: 'And here\'s the final result! Movies look amazing, but video games with vivid color palettes look fantastic!'
				}					
			];	
		}
		/*
		if (id == '2') {
			$scope.slide_title = 'vidkim.com';
			$scope.slides = [
				{
					image: '/images/gallery_mid_preview.png',
					caption: 'Hello world'
				}, 
				{
					image: '/images/gallery_mid_preview.png',
					caption: 'Hello world'		
				}, 				
				{
					image: '/images/gallery_mid_preview.png',
					caption: 'Hello world'		
				}		
			];	
		}
		if (id == '3') {
			$scope.slide_title = 'works in progress';
			$scope.slides = [
				{
					image: '/images/gallery_mid_preview.png',
					caption: 'Hello world'
				}, 
				{
					image: '/images/gallery_mid_preview.png',
					caption: 'Hello world'		
				}, 				
				{
					image: '/images/gallery_mid_preview.png',
					caption: 'Hello world'
				}		
			];	
		}
		*/	
	}

	$scope.init = function () {
		set_gallery(0);
		console.log('starting')
	}

	$scope.init();
	


});

vidApp.controller('aboutController', function($scope, Page) {
	Page.setTitle('about');
});

vidApp.controller('projectsController', function($scope, Page) {
	Page.setTitle('projects');	
});

vidApp.controller('resumeController', function($scope, Page) {
	Page.setTitle('resume');
});

vidApp.controller('contactController', function($scope, Page) {
	Page.setTitle('contact');
});


vidApp.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);