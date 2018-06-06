//import '../sass/footer.scss';
import LineChartController from '../controller/controller';

/*@ngInject*/
export default class LineChart {
  constructor() {
    this.template = require('../view/view.html');
    this.restrict = 'E';
    this.scope =  {
            datachart: '=?',
            xaxislabel: '<?',
            yaxislabel: '<?',
            showYAxis: "<?",
            smoothLine: "<?",
            isdate: '<?'
      };
    this.controller = LineChartController;
  }

  // optional compile function
  compile(tElement) {
    return this.link.bind(this);
  }

  // optional link function
  link(scope, element, attributes) {
    
  }
}
