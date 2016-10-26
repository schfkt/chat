module.exports.routes = {
  '/': {
    view: 'app'
  },

  // UserController
  'get /user': 'UserController.find',
  'post /sign-in': 'UserController.signIn',
  'post /sign-up': 'UserController.signUp',
  'post /sign-out': 'UserController.signOut',

  // MessagesController
  'get /messages': 'MessagesController.index',
  'post /messages': 'MessagesController.create'
};
