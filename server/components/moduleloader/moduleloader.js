var fs = require('file-system');
var path = require('path');
var getDirs = p => fs.readdirSync(p).filter(f => fs.statSync(p+"/"+f).isDirectory());

module.exports = 
class ModuleLoader {

    /*constructor(app, express, routeprovider, performanceProvider, location) {
        this.app = app;
        this.express = express;
        this.routeprovider = routeprovider;
        this.location = location;
        this.performanceProvider = performanceProvider;
    }*/

    constructor(processPackage, location) {
        this.processPackage = processPackage;
        this.location = location;
    }

    Load() {
        var dirs = this.GetFolders();
        console.log(dirs);
        dirs.forEach((element) => (this.ProcessModule(element)));
    }

    GetFolders() {
        //Get all directories in location
        return getDirs(this.location);
    }

    ProcessModule(moduleLocation) {
        
        try {
            var routeBase = '/api/' + moduleLocation;
            var moduleDir = path.resolve(path.join(this.location, moduleLocation, 'index.js'));
            console.log('Loading module located', moduleDir, routeBase);

            var moduleClass = new require(moduleDir); 
            console.log('Module Class', moduleClass);

            var module = new moduleClass(this.processPackage, routeBase);
            if (module) {
                module.SetUp();
            }
        } 
        catch (error) {
            console.error('Failed to load module', moduleClass, error);
        }
    }
}
