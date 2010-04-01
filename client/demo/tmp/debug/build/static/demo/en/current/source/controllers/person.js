// ==========================================================================
// Project:   Demo.personController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Demo */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Demo.personController = SC.ObjectController.create(
/** @scope Demo.personController.prototype */ {

  // TODO: Add your own code here.
  contentBinding: SC.Binding.from("Demo.peopleController.selection").single()
}) ;
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('demo');