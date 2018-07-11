var app = angular.module('cascosModule',[]);

app.controller('cascosControl',function($scope){
	
	$scope.cascos = []
	
	$scope.pesquisar = function(){
		 
	}
	
	$scope.novo = function(){
		$scope.cascos = {};
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
    	$scope.cascos.push($scope.casco);
		$scope.novo();
		$scope.mensagens.push('Cascos alvos com sucesso');
;}
	
	$scope.excluir = function() {
		if ($scope.cascos.codigo == '') {
			alert('Selecione um pessoa atravez do código.');
		} else {
			$scope.cascos.splice($scope.cascos.indexOf($scope.casco),1);
			$scope.pesquisar();
				$scope.novo();
				$scope.mensagens.push('Casco excluído com sucesso');
		}
	}
	
	$scope.seleciona = function(cascoTabela) {
		$scope.cascos = cascosTabela;
	}
	
	$scope.pesquisar();
	$scope.novo();
});