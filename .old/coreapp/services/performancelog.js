/*@ngInject*/
class PerformanceLog {

  constructor($rootScope, $http) {
    this.$rootScope = $rootScope;
    this.$http = $http;

    this.measureWindow = 10; //timing in minutes
    
    //Current temp window
    this.currentWindow = null;

    //Local storage of window loging objects
    this.storedWindows = [];
  }

  //Creates a new window and saves old window
  CreateNewWindow() {

    //if we have a current window
    if (this.currentWindow) {
        this.storedWindows.push({
            start: this.currentWindow.start, 
            window: this.measureWindow, 
            c2s: this.currentWindow.c2s_avg,
            s2s: this.currentWindow.s2s_avg,
            s2c: this.currentWindow.s2c_avg,
            count: this.currentWindow.count
        })

        //push the values through to the server
        this.$http.post('/api/performance', 
        {
            date: this.currentWindow.start, 
            clientToServer: this.currentWindow.c2s_avg,
            serverProcessing: this.currentWindow.s2s_avg,
            serverToClient: this.currentWindow.s2c_avg,
            callCount: this.currentWindow.count
        })

        //Broadcast an update to performance is available
        this.$rootScope.$broadcast('performance_update', this.storedWindows);
    }

    //create new window
    var startDate = new Date();
    var endDate = new Date(startDate);
    endDate.setSeconds(startDate.getSeconds() + this.measureWindow);
    this.currentWindow = {
        start: startDate,
        end: endDate,
        c2s_avg: 0,
        s2s_avg: 0,
        s2c_avg:0,
        count:0
    }
  }

  //Log the details from ViewDuHttp for client to server, server to server and server to client
  LogReadings(c2s, s2s, s2c) {

    //Server will return -1 if turned off
    if (c2s <= 0)
        return;

    console.log("Current Monitoring Window", this.currentWindow);
    
    //check we have a moving window of data
    if (!this.currentWindow || this.currentWindow.end.getTime() < Date.now())
        this.CreateNewWindow();

    //only process if we have a value
    if (c2s > 0)
        this.currentWindow.c2s_avg = (this.currentWindow.c2s_avg + c2s) / 2;

    //only process if we have a value
    if (s2s > 0)
        this.currentWindow.s2s_avg = (this.currentWindow.s2s_avg + s2s) / 2;

    //only process if we have a value
    if (s2c > 0)
        this.currentWindow.s2c_avg = (this.currentWindow.s2c_avg + s2c) / 2;

    //Increment the counts
    this.currentWindow.count++;
  }

  get MonitorReadings() {
      return this.storedWindows;
  }

}

export default PerformanceLog;