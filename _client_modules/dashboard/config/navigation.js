/*@ngInject*/
class NavigationBuilder
{
    static build(NavigationService, SessionService) {
        NavigationService.addNewMenuItem('Dashboard', '/dashboard', 'dashboard', () => {return SessionService.LoggedIn;}, null, 'right');
        console.log('NavigationBuilder', NavigationService);
    }
}

export default NavigationBuilder;
  