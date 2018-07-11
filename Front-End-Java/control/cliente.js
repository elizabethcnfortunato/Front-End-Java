var app = angular.module('clienteModule',[]);

app.controller('clienteControl',function($scope){
	
	$scope.cliente = []
	
	$scope.pesquisar = function(){
		 
	}
	
	$scope.novo = function(){
		$scope.cliente = {};
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
    	$scope.cliente.push($scope.cliente);
		$scope.novo();
		$scope.mensagens.push('Cliente salvo com sucesso');
;}
	
	$scope.excluir = function() {
		if ($scope.cliente.codigo == '') {
			alert('Selecione um pessoa atravez do código.');
		} else {
			$scope.cliente.splice($scope.cliente.indexOf($scope.cliente),1);
			$scope.pesquisar();
				$scope.novo();
				$scope.mensagens.push('Cliente excluído com sucesso');
		}
	}
	
	$scope.seleciona = function(clienteTabela) {
		$scope.cliente = clienteTabela;
	}
	
	$scope.pesquisar();
	$scope.novo();
});