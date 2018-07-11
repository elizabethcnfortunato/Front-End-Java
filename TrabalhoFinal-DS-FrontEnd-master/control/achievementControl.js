var app = angular.module('achievementModule',[]);

app.controller('achievementControl',function($scope,$http){
	
	var url = 'http://localhost:8080/FlowTime/rs/achievement';
	
	$scope.pesquisar = function(){
		 $http.get(url).success(function (conquistasRetorno){
			$scope.conquistas = conquistasRetorno;
		}).error(function(mensagemErro){
				alert(mensagemErro);
				alert('Encontramos um problema ao carregar a lista');
		});
	}
	
	$scope.novo = function(){
		$scope.achievement = {};
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
	
		//alert('ID descoberta '+$scope.achievement.id);
		//alert('Nome descoberta '+$scope.achievement.description);
		//alert('Fator Impacto descoberta '+$scope.achievement.impact);
		
		// CRIANDO UM NOVO OBJETO
		if ($scope.achievement.id == undefined || $scope.achievement.id == '') {    		
			alert('Tentou salvar!');
			$http.post(url,$scope.achievement).success(function(conquistaRetornada) {				
				$scope.conquistas.push(conquistaRetornada);
				$scope.novo();
				$scope.mensagens.push('Conquista salva com sucesso');
				
			}).error(function (erro) {
				$scope.mensagens.push('Erro ao salvar a Conquista: '+JSON.stringify(erro));
			});
		}
		
		// ATUALIZANDO UM OBJETO
		else{
		
			alert('Método Atualizar!');
				$http.put(url,$scope.achievement).success(function(conquista) {
					$scope.pesquisar();
					$scope.novo();
					$scope.mensagens.push('Conquista atualizada com sucesso');
				
				}).error(function (erro) {
				alert('Erro ao atualizar a conquista')
			});
		
		}
	}
	
	$scope.excluir = function() {
		if ($scope.achievement.id == '') {
			alert('Selecione uma descoberta');
		} else {
		    $http.delete(url+"/"+$scope.achievement.id).success(function() {
				$scope.conquistas.splice($scope.conquistas.indexOf($scope.achievement),1);
				$scope.pesquisar();
				$scope.novo();
				$scope.mensagens.push('Conquista excluída com sucesso');
			}).error(function (erro) {
				alert("Erro ao excluir!")
			});
		}
	}

	$scope.seleciona = function(conquistaTabela) {
		$scope.achievement = conquistaTabela;
		//alert('Referencia do Paper:'+$scope.achievement.refPaper.id);
	}
	
	
	$scope.pesquisar();
	$scope.novo();
});