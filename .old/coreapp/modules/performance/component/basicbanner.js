import '../sass/basicbanner.scss';
/*@ngInject*/
export const PerformanceBasicBanner  = {
    template: require('../view/basicbanner.html'),
    controllerAs: "ctrl",
    controller: 
    class PerformanceBasicBannerController {
      constructor($scope, $state, ViewduPerformanceLog) {
          this.$scope = $scope;
          this.$scope.state = $state;
          this.ViewduPerformanceLog = ViewduPerformanceLog
          this.analysis = {
              available: false,
              c2s: 'initialising...',
              s2s: 'initialising...',
              s2c: 'initialising...',
              count: 'initialising...'
          };

          this.$scope.$on('performance_update', this.update());

      }
      
      $onInit() {
        // fired first
      }

     //Data will always be an array
      update(event, data) {
        return (event, data) => {
          console.log('we have new performance data', data);
          var c2s = 0, s2s = 0, s2c = 0, count = 0;

          //accummulate values
          data.forEach(function(element) {
              c2s += element.c2s;
              s2s += element.s2s;
              s2c += element.s2c;
              count += element.count;
          }, this);

          //write to screen object
          this.analysis.available = true;
          this.analysis.c2s = c2s / data.length;
          this.analysis.s2s = s2s /  data.length;
          this.analysis.s2c = s2c /  data.length;
          this.analysis.count = count;
        };
      }
      
      // injection here
	    static get $inject() {
	      return [
	      '$scope', 
          '$state',
          'ViewduPerformanceLog'
	      ];
      }
    }
  }