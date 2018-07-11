var app = angular.module('cervejaModule',[]);

app.controller('cervejaControl',function($scope){
	
	$scope.temas = []
	
	$scope.pesquisar = function(){
		 
	}
	
	$scope.novo = function(){
		$scope.cerveja = {};
		$scope.mensagens = [];
	}
	
	$scope.montaMensagemErro = function(listaErro) {
		$scope.mensagens = [];
		$scope.mensagens.push('Falha de validação retornada do servidor');
		angular.forEach(listaErro, function(value, key){
			 $scope.mensagens.push(value.message);
		});
	}

    $scope.salvar = function() {    	
    	$scope.cervejas.push($scope.cerveja);
		$scope.novo();
		$scope.mensagens.push('O produto foi salvo com sucesso');
	}
	
	$scope.excluir = function() {
		if ($scope.cerveja.codigo == '') {
			alert('Selecione um produto');
		} else {
			$scope.cervejas.splice($scope.cervejas.indexOf($scope.cerveja),1);
			$scope.pesquisar();
				$scope.novo();
				$scope.mensagens.push('Cerveja excluído com sucesso');
		}
	}
	
	$scope.seleciona = function(cervejaTabela) {
		$scope.cerveja = cervejaTabela;
	}
	
	$scope.pesquisar();
	$scope.novo();
});