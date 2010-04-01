// ==========================================================================
// Project:   Example1
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Example1 */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
Example1.main = function main() {

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably 
  // create multiple pages and panes.  
  Example1.getPath('mainPage.mainPane').append();
  
  Example1.usersController.set('content', Example1.store.find(Example1.PEOPLE_QUERY));
  
  // Example1.usersController.set('content', Example1.store.find(Example1.PEOPLE_QUERY));
  
  Example1.currentUserController.bind('selection', SC.Binding.from('MyApp.mainController.title'));
  
  // Example1.projectsController.set('content', Example1.usersController)
  
  // Example1.mainPage.mainPane.labelView.set('value', "aaaa")
  // p.getEach('name');
  
  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!
  
  // TODO: Set the content property on your primary controller
  // ex: Example1.contactsController.set('content',Example1.contacts);

} ;

function main() { Example1.main(); }

function doStuff(t) {
    p = tasks.objectAt(1).get('projects');
    p1 = p.objectAt(0);
    Example1.currentProjectController.set('content', p1);
}