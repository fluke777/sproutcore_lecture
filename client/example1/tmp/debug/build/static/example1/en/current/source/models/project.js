// ==========================================================================
// Project:   Example1.Project
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Example1 */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Example1.Project = SC.Record.extend(
/** @scope Example1.Project.prototype */ {

  // TODO: Add your own code here.
  people: SC.Record.toMany("Example1.Person", {
      inverse: "projects", isMaster: NO
    })
  
}) ;
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('example1');