import '../sass/comments.scss';
export default class CommentsController {
  constructor($stateParams, $location, comments) {
    this.$stateParams = $stateParams;
    this.$location = $location;
    this.comments = comments;
  }

  testClick(object)
  {
    console.log("Testing Buttons", object);
  }
}

CommentsController.$inject = ['$stateParams', '$location', 'comments'];
