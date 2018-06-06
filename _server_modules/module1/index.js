module.exports = 
class ModuleOne {

    constructor(processPackage, baseRoute) {
        this.app = processPackage.app;
        this.express = processPackage.express;
        this.routeprovider = processPackage.routerProvider;
        this.baseRoute = baseRoute;
        this.performanceProvider = processPackage.performanceProvider;
        this.processPackage = processPackage;

        //console.log('Process Package',processPackage);
    }

    SetUp() {
        //Load Environment Variables
        console.log('Loading environment modules');
        this.LoadEnvVariables();
        
        //Sets up a base route
        console.log('Loading routes for module', this.baseRoute);
        this.app.use(this.baseRoute, require('./routes')(this.app, this.routeprovider, this.performanceProvider));
    }

    LoadEnvVariables() {
        var envs = require('./config');
        for(var key in envs) {
                process.env[key] = envs[key];
                console.log('env: ', key, envs[key]);
        }
    }
}
