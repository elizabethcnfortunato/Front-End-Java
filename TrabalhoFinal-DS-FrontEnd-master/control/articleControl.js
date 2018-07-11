var app = angular.module('articleModule',[]);

app.controller('articleControl',function($scope,$http){
	
	var url = 'http://localhost:8080/FlowTime/rs/article';
	
	$scope.pesquisar = function(){
		$http.get(url).success(function (artigosRetorno){
			$scope.artigos = artigosRetorno;
		}).error(function(mensagemErro){
		        alert('Encontramos um erro Huston!')
				alert(mensagemErro);
		});
	}
	
	$scope.novo = function(){
		$scope.article = {};
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
		if ($scope.article.id == undefined || $scope.article.id == '') {    		
			alert('Tentou salvar!');
			$http.post(url,$scope.article).success(function(artigoRetornado) {				
				$scope.artigos.push(artigoRetornado);
				$scope.novo();
				$scope.mensagens.push('Artigo salvo com sucesso');
				
			}).error(function (erro) {
				$scope.mensagens.push('Erro ao salvar o Artigo: '+JSON.stringify(erro));
			});
		}
		
		// ATUALIZANDO UM OBJETO
		else{
		
			alert('Método Atualizar!');
				$http.put(url,$scope.article).success(function(artigo) {
					$scope.pesquisar();
					$scope.novo();
					$scope.mensagens.push('Artigo atualizado com sucesso');
				
				}).error(function (erro) {
				alert('Erro ao atualizar o artigo')
			});
		
		}
	}
	
	
	$scope.excluir = function() {
		
		if ($scope.article.id == '') {
			alert('Selecione um Artigo');
		} else {
		    $http.delete(url+"/"+$scope.article.id).success(function() {
				$scope.artigos.splice($scope.artigos.indexOf($scope.artigo),1);
				$scope.pesquisar();
				$scope.novo();
				$scope.mensagens.push('Artigo excluído com sucesso');
			}).error(function (erro) {
				alert("Erro ao excluir!")
			});
		}
	}

	$scope.seleciona = function(artigoTabela) {
		$scope.article = artigoTabela;
	}
	
	$scope.pesquisar();
	$scope.novo();
});