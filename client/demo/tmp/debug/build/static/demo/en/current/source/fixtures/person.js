// ==========================================================================
// Project:   Demo.Person Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Demo */

sc_require('models/person');

Demo.Person.FIXTURES = [

  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See 
  // the example below.

  { guid: 1,
    firstName: "Michael",
    lastName: "Scott",
    isOld: true },
  
  { guid: 2,
    firstName: "Dwight",
    lastName: "Schrute",
    isOld: false },
  
  { guid: 3,
    firstName: "Jim",
    lastName: "Halpert",
    isOld: true },
  
  { guid: 4,
    firstName: "Pam",
    lastName: "Beesly",
    isOld: false },
  
  { guid: 5,
    firstName: "Ryan",
    lastName: "Howard",
    isOld: true }

];
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('demo');