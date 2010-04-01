// ==========================================================================
// Project:   Example1.Person
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Example1 */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Example1.Person = SC.Record.extend(
/** @scope Example1.Person.prototype */ {

  // TODO: Add your own code here.
  projects: SC.Record.toMany("Example1.Project", {
      inverse: "people", isMaster: YES
    })
  
}) ;
