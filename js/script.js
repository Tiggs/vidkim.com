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
	$scope.Page = Page;
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };	
});

vidApp.controller('aboutController', function($scope, Page) {
	Page.setTitle('about');
});

vidApp.controller('projectsController', function($scope, Page) {
	Page.setTitle('projects');
	$scope.myInterval = 0;
	$scope.slide_title = ''
	$scope.slides = ''
	
	var gallery_id = 0;

	$scope.init = function () {
		set_gallery(0);
	}

	$('.project-selector').click(function() {
		gallery_id = $(this).attr('id').match(/\d+/)[0];
		set_gallery(gallery_id);
		
		$('.project-selector').removeClass('project-selected');
		$('#project-selector-' + gallery_id).addClass('project-selected');
	});
	function set_gallery(id) {
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
		if (id == '1') {
			$scope.slide_title = 'Ambilight Clone';
			$scope.slides = [
				{
					image: '/images/projects/ambilight/10.jpg',
					caption: 'This project is an Ambilight Clone, based off the Philips Ambilight feature in TV sets. It accepts a video feed from any HDMI source and with the help of a Raspberry Pi computer, illuminates LEDs based off that source. The LEDs are mounted behind a TV, giving an incredible visual effect that the image is being \'projected\' off the wall.'
				},	
				{
					image: '/images/projects/ambilight/3.jpg',
					caption: 'Here\'s the paper diagram I drew out of the project. A source video stream goes to a 2 to 1 HDMI splitter, sending one signal to the TV, and the other to an RCA to USB adapter. This USB adapter plugs in to a Raspberry Pi. Attached to the GPIO (General Input Output) pins on the Pi, will be connections to an LED strip that recieves signals and power. A 5v power cable will be spliced into a Y shape to feed power and ground to the Pi and the LED power pins.'
				}, 
				{
					image: '/images/projects/ambilight/1.jpg',
					caption: 'Gutting the LED strip. The LEDs are of type WS2801, significant due to each individual LED being addressable via a simple array. For example, to light the first LED, you would just write to Led 0 a color and that LED would stay lit.'
				}, 
				{
					image: '/images/projects/ambilight/2.jpg',
					caption: 'I cut the WS2801 LED into 3 sections to allow for an easier bend around the corner, then soldered the connections together. The strips are also double backed with adhesive, easing the mounting process later.'
				}, 			
				{
					image: '/images/projects/ambilight/4.jpg',
					caption: 'I needed a reasonable length of wire to run from the Raspberry Pi to the TV, so I took apart an ethernet cable. Ethernet cables (generally) have 4 pairs of wires, each pair corresponding to Transmit and Recieve, so I removed the striped connections and left the solids.'
				}, 
				{
					image: '/images/projects/ambilight/5.jpg',
					caption: 'To ensure portability, I soldered a 4 pin male header onto the ethernet cable to run to the LED strip. This will connect to a corresponding female adapter I soldered on the LED strip.'
				}, 			
				{
					image: '/images/projects/ambilight/6.jpg',
					caption: 'I also wanted to make space in the Raspberry Pi when it will be enclosed, so I desoldered the unnecessary RCA jack.'
				}, 
				{
					image: '/images/projects/ambilight/7.jpg',
					caption: 'First power test with the LEDs. It\'s alive! I wrote a simple program to write to the LEDs on an Arduino micro controller to ensure the wiring was correct and there was sufficient power.'
				}, 
				{
					image: '/images/projects/ambilight/8.jpg',
					caption: 'The magic of this project lies in the conversion software. https://github.com/tvdzwan/hyperion/wiki Hyperion watches a /dev/video0 feed and based on a configuration, writes an array to the Serial Peripheral Interface, lighting the LED strip. This image shows what the Raspberry Pi is seeing.'
				}, 			

				{
					image: '/images/projects/ambilight/11.jpg',
					caption: 'And here\'s the final result! Movies look amazing, but video games with vivid color palettes look fantastic!'
				}					
			];	
		}
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
				
		$scope.$apply(function() {
			//$scope.setActive(slide_title);
			//$scope.setActive(slides);
		});
	}
	$scope.init();
	
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