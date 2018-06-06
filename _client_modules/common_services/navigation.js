/*@ngInject*/
class NavigationService {
  constructor() {
    //Menu Collection 
    this.leftMenu = [];
    this.rightMenu = [];
    console.log('Navigation Service Created');
  }

  //Returns collection of menus
  get Menus() {
    return {right: this.rightMenu, left: this.leftMenu};
  }

  addNewMenuItem(name, url, urlstate, visibleFunction, parentMenu, side) {
    var id = this.rightMenu.length + this.leftMenu.length + 1;
    var item = {_id: id, name: name, url:url, visible: visibleFunction, urlstate: urlstate, parent: parentMenu};
    if (side === 'right') {
      this.rightMenu.push(item);
    }
    else if (side === 'left') {
      this.leftMenu.push(item);
    }
    else {
      throw Error('Side parameter must be left or right');
    }

    console.log('We have added a new menu item');
    return item;
  }
}

export default NavigationService;
