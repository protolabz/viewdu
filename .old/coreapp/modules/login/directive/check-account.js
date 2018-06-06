let $service = null;

/*@ngInject*/
export default class CheckAccount {
  constructor(LoginService) {
    this.restrict = 'A';
    this.scope = {};
    this.require = 'ngModel';
    $service = LoginService;
  }

  // optional compile function
  compile(tElement) {
    return this.link.bind(this);
  }

  // optional link function
  link(scope, element, attributes, ngModel, LoginService) {
    //Global marker
           if(!ngModel) 
                return; 

            element.bind('blur', function (e) {
                console.log("Validating user: ", e.currentTarget.value);

                //Reset the validation 
                ngModel.$setValidity('userDoesNotExist', true);
                ngModel.$setValidity('userDoesNotExist_Checking', false);

                //If we have no value then fail validation
                if (!e.currentTarget.value)
                    ngModel.$setValidity('userDoesNotExist', false);

                //Call service to check values
                $service
                    .checkEmail(e.currentTarget.value)
                    .then(function(found) {
                        console.log("Username Check", found);
                        ngModel.$setValidity('userDoesNotExist', found);
                        ngModel.$setValidity('userDoesNotExist_Checking', true);
                    },
                    function(err) {
                       ngModel.$setValidity('userDoesNotExist', true);//return false;
                       ngModel.$setValidity('userDoesNotExist_Checking', true);
                    });
            });
  }
}

CheckAccount.$inject = ['LoginService'];
