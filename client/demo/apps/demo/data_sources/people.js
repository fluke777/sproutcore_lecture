// ==========================================================================
// Project:   Demo.PeopleDataSource
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Demo */

sc_require('models/person');

Demo.PEOPLE_QUERY = SC.Query.local(Demo.Person, {
  orderBy: 'lastName'
});

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
Demo.PeopleDataSource = SC.DataSource.extend(
/** @scope Demo.PeopleDataSource.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query) {

    // TODO: Add handlers to fetch data for specific queries.  
    // call store.dataSourceDidFetchQuery(query) when done.
    if (query === Demo.PEOPLE_QUERY) {
        SC.Request.getUrl('/people').json()
          .notify(this, 'didFetchPeople', store, query)
          .send();
        return YES;
    }
    return NO ; // return YES if you handled the query
  },
  
  didFetchPeople: function(response, store, query) {
    if (SC.ok(response)) {
      store.loadRecords(Demo.Person, response.get('body').content);
      store.dataSourceDidFetchQuery(query);

    } else store.dataSourceDidErrorQuery(query, response);
  },
  
  // ..........................................................
  // RECORD SUPPORT
  // 
  
  retrieveRecord: function(store, storeKey) {
    
    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  createRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  updateRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO ; // return YES if you handled the storeKey
  },
  
  destroyRecord: function(store, storeKey) {
    
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    
    return NO ; // return YES if you handled the storeKey
  }
  
}) ;
