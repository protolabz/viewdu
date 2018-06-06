let $service = null;

/*@ngInject*/
export default class userExists {
  constructor(SignupService) {
    this.restrict = 'A';
    this.scope = {};
    this.require = 'ngModel';
    $service = SignupService;
  }

  // optional compile function
  compile(tElement) {
    return this.link.bind(this);
  }

  // optional link function
  link(scope, element, attributes, ngModel, SignupService) {
    //Global marker
           if(!ngModel) 
                return; 

            element.bind('blur', function (e) {
                console.log("Validating user: ", e.currentTarget.value);

                //Reset the validation 
                ngModel.$setValidity('userExists', true);
                ngModel.$setValidity('userExists_Checking', false);

                //If we have no value then fail validation
                if (!e.currentTarget.value)
                    ngModel.$setValidity('userExists', false);

                //Call service to check values
                $service
                    .checkEmail(e.currentTarget.value)
                    .then(function(found) {
                        console.log("Username Check", found);
                        ngModel.$setValidity('userExists', !found);
                        ngModel.$setValidity('userExists_Checking', true);
                    },
                    function(err) {
                       ngModel.$setValidity('userExists', false);//return false;
                       ngModel.$setValidity('userExists_Checking', true);
                    });
            });
  }
}

userExists.$inject = ['SignupService'];
