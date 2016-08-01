app.controller('CartController', function($scope, CartFactory, $log, $state) {
  CartFactory.getCurrOrderProds()
  .then(products => {
    $scope.order = products;
  })
  .catch($log.error);

  $scope.checkout = function() {
    CartFactory.checkout()
    .then(function() {
      $state.go('checkout');
    })
    .catch($log.error); 
  }

});

app.factory('CartFactory', function($http) {
  let cartF = {};
  cartF.getCurrOrderProds = function () {
    return $http.get('/api/orders/cart')
    .then(function(res) {
      return res.data;
    });
  }
  cartF.checkout = function () {
    return $http.put('api/orders/checkout')
    .then(function (res) {
      return res;
    });
  }
  return cartF;
});

app.config(function($stateProvider) {
  $stateProvider.state('cart', {
    url: '/cart',
    templateUrl: 'js/cart/cart.html',
    controller: 'CartController'
  });
});

//go through and display every thing in the current cart (session id?)
//