import MenuController from '../controller/menu';
import '../sass/menu.scss';

/*@ngInject*/
export const Menu = {
    template: require('../view/menu.html'),
    //.restrict = 'E';
    bindings: {},
    controller: MenuController,
    controllerAs: 'ctrl'
  }

