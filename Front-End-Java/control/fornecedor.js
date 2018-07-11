var app = angular.module('fornecedorModule',[]);

app.controller('fornecedorControl',function($scope,$http){
	
	var url = 'http://localhost:8080/CervejariaServer/rs/article';
	
	$scope.pesquisar = function(){
		$http.get(url).success(function (fornecedoresRetorno){
			$scope.fornecedores = fornecedoresRetorno;
		}).error(function(mensagemErro){
				alert(mensagemErro);
		});
	}
	
	$scope.novo = function(){
		$scope.fornecedor = {};
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
		
		// CRIANDO UM NOVO OBJETO
		if ($scope.fornecedor.id == undefined || $scope.fornecedor.id == '') {    		
			alert('Deu Certo!');
			$http.post(url,$scope.fornecedor).success(function(fornecedorRetornado) {				
				$scope.fornecedores.push(fornecedorRetornado);
				$scope.novo();
				$scope.mensagens.push('Fornecedor salvo com sucesso');
				
			}).error(function (erro) {
				$scope.mensagens.push('Erro ao salvar: '+JSON.stringify(erro));
			});
		}
		
		// ATUALIZANDO UM OBJETO
		else{
		
			alert('Atualizando!');
				$http.put(url,$scope.fornecedor).success(function(artigo) {
					$scope.pesquisar();
					$scope.novo();
					$scope.mensagens.push('Fornecedor atualizado');
				
				}).error(function (erro) {
				alert('Deu Ruim.')
			});
		
		}
	}
	
	
	$scope.excluir = function() {
		
		if ($scope.fornecedor.id == '') {
			alert('Selecione um Fornecedor');
		} else {
		    $http.delete(url+"/"+$scope.fornecedor.id).success(function() {
				$scope.fornecedor.splice($scope.fornecedores.indexOf($scope.fornecedor),1);
				$scope.pesquisar();
				$scope.novo();
				$scope.mensagens.push('Fornecedor Excluido');
			}).error(function (erro) {
				alert("Erro ao excluir!")
			});
		}
	}

	$scope.seleciona = function(fornecedorTabela) {
		$scope.fornecedor = fornecedorTabela;
	}
	
	$scope.pesquisar();
	$scope.novo();
});