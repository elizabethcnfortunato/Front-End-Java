var app = angular.module('researcherModule',[]);

app.controller('researcherControl',function($scope,$http){
	
	var url = 'http://localhost:8080/FlowTime/rs/researcher';
	
	$scope.pesquisar = function(){
		 $http.get(url).success(function (pesquisadoresRetorno){
			$scope.pesquisadores = pesquisadoresRetorno;
		}).error(function(mensagemErro){
				alert(mensagemErro);
		});
	}
	
	$scope.novo = function(){
		$scope.researcher = {};
		$scope.mensagens = [];
	}
	
	$scope.montaMensagemErro = function(listaErro) {
		$scope.mensagens = [];
		$scope.mensagens.push('Falha de validação retornada do servidor');
		angular.forEach(listaErro, function(value, key){
			 $scope.mensagens.push(value.message);
		});
	}

	
	/*
    $scope.salvar = function() {    	
    	$scope.researcher.push($scope.reseacher);
		$scope.novo();
		$scope.mensagens.push('Pesquisador salvo com sucesso');
	}
	*/
	$scope.salvar = function() {
		
		// CRIANDO UM NOVO OBJETO
		if ($scope.researcher.id == undefined || $scope.researcher.id == '') {    		
			alert('Tentou salvar!');
			$http.post(url,$scope.researcher).success(function(pesquisadorRetornado) {				
				$scope.pesquisadores.push(pesquisadorRetornado);
				$scope.novo();
				$scope.mensagens.push('Pesquisador salvo com sucesso');
				
			}).error(function (erro) {
				$scope.mensagens.push('Erro ao salvar o Pesquisador: '+JSON.stringify(erro));
			});
		}
		
		// ATUALIZANDO UM OBJETO
		else{
		
			alert('Método Atualizar!');
				$http.put(url,$scope.researcher).success(function(pesquisador) {
					$scope.pesquisar();
					$scope.novo();
					$scope.mensagens.push('Pesquisador atualizado com sucesso');
				
				}).error(function (erro) {
				alert('Erro ao atualizar o pesquisador');
			});
		
		}
	}

	
	$scope.excluir = function() {
	
		if ($scope.researcher.id == '') {
			alert('Selecione um Pesquisador');
		} else {
		    $http.delete(url+"/"+$scope.researcher.id).success(function() {
				$scope.pesquisadores.splice($scope.pesquisadores.indexOf($scope.researcher),1);
				$scope.pesquisar();
				$scope.novo();
				$scope.mensagens.push('Pesquisador excluído com sucesso');
			}).error(function (erro) {
				alert("Erro ao excluir!")
			});
		}
	}

	$scope.seleciona = function(pesquisadorTabela) {
		$scope.researcher = pesquisadorTabela;
	}
	
	$scope.pesquisar();
	$scope.novo();
});