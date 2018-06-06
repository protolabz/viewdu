//import '../sass/footer.scss';
import BarChartController from '../controller/controller';

/*@ngInject*/
export default class BarChart {
  constructor() {
    this.template = require('../view/view.html');
    this.restrict = 'E';
    this.scope =  {
            datachart: '=?',
            xaxislabel: '<?',
            yaxislabel: '<?',
            height: '<?'
      };
    this.controller = BarChartController;
  }

  // optional compile function
  compile(tElement) {
    return this.link.bind(this);
  }

  // optional link function
  link(scope, element, attributes) {
    
  }
}
