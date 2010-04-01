// ==========================================================================
// Project:   Demo - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Demo */

// This page describes the main user interface for your application.  
Demo.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'peopleView firstNameView lastNameView'.w(),
    
    peopleView: SC.ListView.design({
      layout: { centerX: 0, top: 0, width: 200, height: 400 },
      contentBinding: 'Demo.peopleController.arrangedObjects',
      selectionBinding: 'Demo.peopleController.selection',
      contentValueKey: 'fullName'
      
    }),
    firstNameView: SC.LabelView.design({
        layout: {left: 0, top: 0, width: 200, height: 30},
        tagName: "h1",
        valueBinding: "Demo.personController.firstName" 
    }),
    lastNameView: SC.LabelView.design({
        layout: {left: 0, top: 40, width: 200, height: 30},
        tagName: "h1",
        valueBinding: "Demo.personController.lastName" 
    })
  })

});
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('demo');