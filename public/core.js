var simpleTodo = angular.module('simpleTodo', []);

function mainController($scope, $http){
	$scope.formData = {};

	//when on landing page, get all todos and show them

	$http.get('/api/todos')
		.success(function(data){
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		});

		//when submitting the add form, send the text to our node API

		$scope.createTodo = function(){
			$http.post('/api/todos', $scope.formData)
				.success(function(date){
					$scope.formData = {}; //clear the form so the user can enter another todo
					$scope.todos = data;
					console.log(data);
				})
				.error(function(data){
					console.log('Error: ' + data);
				});
		};
		//delete todo after checking it
		$scope.deleteTodo = function(id){
			$http.delete('/api/todos/' + id)
			.success(function(data){
				$scope.todos= data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
		};
}