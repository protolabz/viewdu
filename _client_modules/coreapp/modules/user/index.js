import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from './config/routes';
import UserService from './service/service';
import UserController from './controller/user';
import { UserSaveModal } from './component/savemodal';
import { UploadProfileImage } from './component/uploadprofileimage';

export default angular.module('user', [uirouter])
  .config(routes)
  .service('UserService', UserService)
  .controller('UserController', UserController)
  .component('userSaveModal',UserSaveModal)
  .component('uploadProfileImageModal',UploadProfileImage)
  .name;
