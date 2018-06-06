import '../sass/home.scss';
export default class HomeController {
  constructor($location) {
    this.$location = $location;
    this.title = 'Base Seed Testing';
    this.description = 'Base Seed Testing';
  }
}

HomeController.$inject = ['$location'];
