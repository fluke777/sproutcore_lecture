// ==========================================================================
// Project:   Demo.Person
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Demo */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Demo.Person = SC.Record.extend(
/** @scope Demo.Person.prototype */ {

  // TODO: Add your own code here.
  fullName: function(key, value) {
      if (value) {
          var parts = value.split(" ");
          this.beginPropertyChanges()
            .set('firstName', parts[0])
            .set('lastName', parts[1])
          .endPropertyChanges();
      }
      return "%@ %@".fmt(this.get('firstName'), this.get('lastName'));
  }.property('firstName', 'lastName').cacheable()
}) ;
