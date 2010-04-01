// ==========================================================================
// Project:   Md.Project
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Md */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Md.Project = SC.Record.extend(
/** @scope Md.Project.prototype */ {

  // TODO: Add your own code here.
  name: SC.Record.attr("String"),
  people: SC.Record.toMany("Md.Person", { 
      inverse: "project", isMaster: YES
  }),
  
  removePerson: function(aPerson) {
      var people = this.get('people');
      if (people.indexOf(aPerson) !== -1) {
          aPerson.quitProject(this);
      }
  }
  
}) ;
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('md');