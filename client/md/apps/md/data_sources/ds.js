// ==========================================================================
// Project:   Md.Ds
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Md */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
sc_require('models/person');

Md.Ds = SC.DataSource.extend(
/** @scope Md.Ds.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query) {
      options = {
        store:    store,
        query:    query,
        isQuery:  YES
      };
      
      if (query === Md.PEOPLE_QUERY) {
          options['type'] = Md.Person;
          return this._getFromUri('/people', options);
      } else if (query === Md.PEOPLE_OF_MONTH_QUERY) {
        options['type'] = Md.Person;
        return this._getFromUri('/best_people', options);
      } else if (query === Md.PEOPLE_LIST_QUERY) {
        options['type'] = Md.Person;
        options['deffered'] = YES;
        return this._getFromUri('/people_list', options);
      } else if (query === Md.PROJECTS_QUERY) {
        options['type'] = Md.Project;
        return this._getFromUri('/projects', options);
      }
    return NO;
  },
  
  
  _getFromUri: function(uri, options) {
      var notifyMethod;
      if (options.isQuery) {
        notifyMethod = this._didGetQuery;
      // } else if (options.isBulk) {
      } else {
        
        notifyMethod = this._didRetrieveRecords;
      // } else {
        // notifyMethod = this._didRetrieveRecord;
      }
      
      
      SC.Request.getUrl(uri)
          .set('isJSON', YES)
          .notify(this, notifyMethod, options)
          .send();
     return YES;
  },
  
  _didGetQuery: function(response, params) {
      var store     = params.store,
          query     = params.query, 
          type      = params.type,
          deffered  = params.deffered;
          
      if (SC.ok(response)) {
        // load the contacts into the store...
        var storeKeys = store.loadRecords(type, response.get('body'));

        // notify store that we handled the fetch
        if (query.get('isLocal')) {
            console.log("fetch local");
            store.dataSourceDidFetchQuery(query);
        } else if (deffered) {
          console.log("fetch remote deffered");
          var storeKeys = response.get('body').map(function(id) {
            return Md.Person.storeKeyFor(id);
          }, this);
          store.loadQueryResults(query, storeKeys);
        } else {
            console.log("fetch remote");
            store.loadQueryResults(query, storeKeys);
        }
      // handle error case
      } else store.dataSourceDidErrorQuery(query, response);
  },
  
  // ..........................................................
  // RECORD SUPPORT
  // 
  
  retrieveRecords: function(store, storeKeys, ids) {
    // console.log("retrieveRecords", storeKeys);
    if (storeKeys.length > 1) {
      this._getFromUri('/people?ids=%@'.fmt(ids.join(',')), {
        isBulk:         YES,
        storeKey:       storeKeys,
        store:          store,
        type:           store.recordTypeFor(storeKeys[0])
      });
      return YES;
    } else {
      // console.log("Calling super");
      return sc_super();
    }
  },
  
  retrieveRecord: function(store, storeKey) {
    console.log("Retrieve record");
    console.log("store", store, "storeKey", storeKey);
    this._getFromUri(store.idFor(storeKey), {
      storeKey:       storeKey,
      store:          store,
      type:           store.recordTypeFor(storeKey)
      
    });
    return YES;
  },
  
  _didRetrieveRecords: function(response, params) {
    console.log('_didRetrieveRecords', params.store, params.type);
    var store = params.store,
        type = params.type;
        // data;

    // normal: load into store...response == dataHash
    if (SC.ok(response)) {
      data = response.get('body');
      store.loadRecords(type, data.isEnumerable ? data : [data]);

    // error: indicate as such...response == error
    } else store.dataSourceDidError(storeKey, response.get('body'));
  },
    
  createRecord: function(store, storeKey) {
    console.log("createRecord");    
    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  updateRecord: function(store, storeKey) {
    console.log("updateRecord");
    
    SC.Request.putUrl(store.idFor(storeKey)).json()
      .notify(this, this._didUpdateRecord, store, storeKey)
      .send(store.readDataHash(storeKey));
    return YES;
    
  },
  
  _didUpdateRecord: function(response, store, storeKey) {
    if (SC.ok(response)) {
      var data = response.get('body');
      if (data) data = data.content; // if hash is returned; use it.
      store.dataSourceDidComplete(storeKey, data) ;
    } else store.dataSourceDidError(storeKey); 
  },
  
  destroyRecord: function(store, storeKey) {
        console.log("destroyRecord");
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    
    return NO ; // return YES if you handled the storeKey
  }
  
}) ;


SC.ManyArray.prototype.retrieveIfNeeded = function() {
  var ids = this.get('readOnlyStoreIds'),
      type = this.get('recordType'),
      store = this.get('store');
      
  ids = ids.filter(function(id) {
    var storeKey = store.storeKeyFor(type, id);
    return store.readStatus(storeKey) & SC.Record.EMPTY;
  }, this);
  
  store.retrieveRecords(type, ids);
};