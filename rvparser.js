var app = angular.module('rvParser', []);

app.controller('parseCtrl', function($scope, $http) {
	
	$scope.getVideo = function() {
		$scope.status = -1;
		var jsonLink = $scope.url;
		if (jsonLink.charAt(jsonLink.length-1) === '/') {
			jsonLink = jsonLink.substring(0, jsonLink.length-1);
		}
		jsonLink += ".json";
		$http.get(jsonLink)
			.then(function(resp) {
				$scope.videoUrl = resp.data[0].data.children[0].data.secure_media.reddit_video.fallback_url;
				console.log(resp);
				if ($scope.videoUrl) {
					$scope.status = 0;
				} else {
					$scope.status = 1;
					console.log(resp);
					$scope.error = resp;
				}
			}, function(error) {
				$scope.status = 1;
				$scope.error = error;
			}
		);
	}
	
});