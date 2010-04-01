// ==========================================================================
// Project:   Example1.Example1DataSource
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Example1 */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/

sc_require('models/person');
Example1.PEOPLE_QUERY = SC.Query.local(Example1.Person, {
  
});


Example1.Example1DataSource = SC.DataSource.extend(
/** @scope Example1.Example1DataSource.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query) {
    console.log("fetch");
    // TODO: Add handlers to fetch data for specific queries.  
    // call store.dataSourceDidFetchQuery(query) when done.
    if (query === Example1.PEOPLE_QUERY) {
        SC.Request.getUrl('/people/').json()
          .notify(this, 'didFetchPeople', store, query)
          .send();
        return YES;
    }
    return NO; // return YES if you handled the query
  },
  
  didFetchPeople: function(response, store, query) {
    if (SC.ok(response)) {
      store.loadRecords(Example1.Person, response.get('body').content);
      store.dataSourceDidFetchQuery(query);
    } else store.dataSourceDidErrorQuery(query, response);
  },
  // ..........................................................
  // RECORD SUPPORT
  // 
  
  // retrieveRecords: function(store, storeKeys) {
  //   console.log("retrieveRecords", arguments);
  //   stuff = Example1.store.findAll(Example1.Project, storeKeys);
  //   
  //   SC.Request.getUrl('/projects/').json()
  //     .notify(this, 'didFetchPeople', store, query)
  //     .send();
  //   
  //   return NO;
  // },
  
  retrieveRecord: function(store, storeKey, id) {
    console.log("retrieveRecord", storeKey, id);
    // c = store.find(Example1.Project, [7]);
    // stuff = store.find(Example1.Project, storeKey);
    var url = store.idFor(storeKey);
    SC.Request.getUrl(url).json()
      .notify(this, 'didFetchProject', store, storeKey)
      .send();
    
    return YES;
  },
  
  didFetchProject: function(response, store, storeKey) {
      if (SC.ok(response)) {
          var dataHash = response.get('body').content;
          console.log("DID fetch", dataHash) 
          
          store.dataSourceDidComplete(storeKey, dataHash);
        } else store.dataSourceDidError(storeKey, response);
      
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
