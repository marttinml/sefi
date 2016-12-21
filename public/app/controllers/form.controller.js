(function(){

	var controller = function($rootScope, $scope, $service, $serviceLogin){
		$scope.toggleContentBool = false; 
		$scope.data = {baseAddress:{}};
		$scope.result = {};
		$scope.backgroundPicture = {};
		$scope.sexList = [
			{id: 'H', name: 'Hombre'},
			{id: 'M', name: 'Mujer'}
	    ];
	    $scope.spin = $rootScope.spin;
		$scope.statesList = [
			{no:'09',id:'DF', name:'Distrito Federal', local:[
				{id:"010", name:"Alvaro ObregÛn"},
				{id:"002", name:"Azcapotzalco"},
				{id:"014", name:"Benito Ju·rez"},
				{id:"003", name:"Coyoac·n"},
				{id:"004", name:"Cuajimalpa de Morelos"},
				{id:"015", name:"CuauhtÈmoc"},
				{id:"005", name:"Gustavo A. Madero"},
				{id:"006", name:"Iztacalco"},
				{id:"007", name:"Iztapalapa"},
				{id:"008", name:"La Magdalena Contreras"},
				{id:"016", name:"Miguel Hidalgo"},
				{id:"009", name:"Milpa Alta"},
				{id:"011", name:"Tl·huac"},
				{id:"012", name:"Tlalpan"},
				{id:"017", name:"Venustiano Carranza"},
				{id:"013", name:"Xochimilco"}
			]},
			{no:'15',id:'MEX.', name:'Estado de México', local:[
				{id:"046", name:"JILOTEPEC"},
				{id:"092", name:"TEOLOYUCAN"},
				{id:"014", name:"ATLACOMULCO"},
				{id:"061", name:"NICOLAS ROMERO"},
				{id:"093", name:"TEOTIHUACAN"},
				{id:"020", name:"COACALCO DE BERRIOZABAL"},
				{id:"025", name:"CUAUTITLAN IZCALLI"},
				{id:"110", name:"TULTITLAN"},
				{id:"043", name:"IXTLAHUACA"},
				{id:"034", name:"ECATEPEC DE MORELOS"},
				{id:"040", name:"IXTAPALUCA"},
				{id:"013", name:"ATIZAPAN DE ZARAGOZA"},
				{id:"105", name:"TLALNEPANTLA DE BAZ"},
				{id:"038", name:"HUIXQUILUCAN"},
				{id:"060", name:"NEZAHUALCOYOTL"},
				{id:"058", name:"NAUCALPAN DE JUAREZ"},
				{id:"111", name:"VALLE DE BRAVO"},
				{id:"032", name:"CHIMALHUACAN"},
				{id:"107", name:"TOLUCA"},
				{id:"055", name:"METEPEC"},
				{id:"121", name:"ZUMPANGO"},
				{id:"122", name:"VALLE DE CHALCO SOLIDARIDAD"},
				{id:"026", name:"CHALCO"},
				{id:"089", name:"TENANCINGO"},
				{id:"083", name:"TEJUPILCO"},
				{id:"024", name:"CUAUTITLAN"},
				{id:"100", name:"TEXCOCO"},
				{id:"071", name:"LA PAZ"},
				{id:"119", name:"ZINACANTEPEC"}
			]},
			{no:'17',id:'MOR',		name:'Morelos', local:[]},
			{no:'22',id:'QRO',		name:'Querétaro', local:[]},
			{no:'11',id:'GTO',		name:'Guanajuato', local:[]},
			{no:'24',id:'S.L.P',	name:'San Luis Potosí', local:[]},
			{no:'01',id:'AGS',name:'Aguascalientes', local:[]},
		];

		$scope.toggleContent = function(){
			$scope.toggleContentBool = !$scope.toggleContentBool;
			console.log(':)');
		};
		$scope.isToggleContent = function(){
			return $scope.toggleContentBool;
		};

		$scope.readURL = function(input) {
			console.log('up parriba');
	        if (input.files && input.files[0]) {
	        	console.log('up parriba 3');
	            var reader = new FileReader();

	            reader.onload = function (e) {
	                $scope.backgroundPicture = {
	                	'background-image' : 'url('+e.target.result +')'
					};
					$scope.$apply();
	            };

	            reader.readAsDataURL(input.files[0]);

	            
	        }
	    };

		$scope.create = function(){
			console.log($scope.data);
			$scope.data.user = $rootScope.getUser();
			$service.build($scope.data)
                .then(function(data) {
                	console.log(data);
                    $scope.result = data;
                    $scope.result.picture = $scope.backgroundPicture;
                    $scope.result.pictureSign = {'background-image':'url(https://cryptic-tundra-29048.herokuapp.com'+$scope.result.sign+')'};
                }, function(error) {
                    console.log(error);
                });
		};

		$scope.clear = function(){
			$scope.clearResult();
			$scope.data.name 			= '';
			$scope.data.lastName 		= '';
			$scope.data.sex 			= {id:"",name:""};
			$scope.data.birthdate 		= {day:'',month:'',year:''};
			$scope.data.registerYear	= null;
			$scope.data.old 			= null;
			$scope.data.street 			= '';
			$scope.backgroundPicture 	= { 'background-image' : '' };
		};
		$scope.clearResult = function(){
			$scope.result.curp 			= '';
			$scope.result.folioIFE 		= '';
			$scope.result.folio 		= '';			
			$scope.result.lastName1		= '';
			$scope.result.lastName2 	= '';
			$scope.result.name 			= '';
			$scope.result.address1 		= '';
			$scope.result.address2 		= '';
			$scope.result.address3 		= '';
			$scope.result.registerYear 	= '';
			$scope.result.no 			= '';
			$scope.result.localN 		= '';
			$scope.result.delN 			= '';
			$scope.result.section 		= '';
			$scope.result.old 			= '';
			$scope.result.sex 			= '';
			$scope.result.picture 		= { 'background-image' : '' };
			$scope.result.pictureSign 	= { 'background-image' : '' };
			$scope.result.ID 			= '';
		}
		$scope.clearAll = function(){
			$scope.clear();
			$scope.clearResult();
			$scope.data.baseAddress.state 		=  '{"no":"","id":"","name":"","local":[]}';
			$scope.data.baseAddress.local 		= '';
			$scope.data.baseAddress.del 		= '';
			$scope.data.baseAddress.localN 		= { id:"", name:"" };
			$scope.data.baseAddress.delN 		= '';
			$scope.data.baseAddress.cp 			= '';
			$scope.data.baseAddress.section 	= '';
			$scope.localList = [];
		};


		$scope.clearAll();

		$scope.$watch('data.baseAddress.state', function(){
			console.log($scope.data.baseAddress.state);
			var temp = JSON.parse($scope.data.baseAddress.state);
			$scope.localList = temp.local || [];
			console.log(temp);
		});

		
	};
	controller.$inject = ['$rootScope','$scope','service','serviceLogin'];
	angular.module('app',['http','httpLogin','Components']).controller('FormController',controller);
})();