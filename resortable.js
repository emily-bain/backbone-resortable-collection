// A Backbone Collection designed to behave nicely with regards
// to sorting by multiple criteria

var ResortableCollection = Backbone.Collection.extend({
  // sort: This takes the Backbone sort function and adds some logic to check
  // for a comparator object to override it. It also stores the current
  // Comparator as _comparator in contrast to comparator which is treated
  // as the default
  sort: function(options) {
    options || (options = {})
    if (options.comparator) {
      // Set current comparitor so add knows how to do
      this._comparator = options.comparator
    } else if (this.comparator) {
      // Set current comparator to the default
      this._comparator = this._comparator
    } else throw new Error('Cannot sort a set without a comparator')
    // Check whether comparator is sortBy comparator or classic js sort
    if (this._comparator.length == 1) {
      this.models = this.sortBy(this._comparator)
    } else if (this._comparator.length == 2) {
      this.models.sort(this._comparator)
    }
    if (!options.silent) this.trigger('reset', this, options)
    return this
 },

  // This function mirrors the Backbone _add function but uses _comparator instead of comparator as its comparator to pass to sortedIndex
  _add: function(model, options) {
    options || (options = {})
    model = this._prepareModel(model, options)
    if (!model) return false
    var already = this.getByCid(model)
    if (already) throw new Error(["Can't add the same model to a set twice", already.id])
    this._byId[model.id] = model
    this._byCid[model.cid] = model
    var index = options.at != null? options.at :
                this._comparator ? this.sortedIndex(model, this._comparator) :
                this.length
    this.models.splice(index, 0, model)
    model.bind('all', this._onModelEvent)
    this.length++
    if (!options.silent) model.trigger('add', model, this, options)
    return model
  },

  // Override the sortedIndex underscore.js function to be capable of handling
  //both sortBy style comparators and classic js sort comparison functions
  sortedIndex: function(obj, iterator) {
    iterator || (iterator = _.identity)
    console.log(arguments.length)
    // determines whether function is sortBy style sort or classic js sort
    var comparison = iterator.length == 1 ?
      function(a, b){ return iterator(a) < iterator(b) } :
      function(a, b){ var x = iterator(a,b); return x < 0 }
    var low = 0, high = this.length
    while (low < high) {
      var mid = (low + high) >> 1
      comparison(this.at(mid), obj) ? low = mid + 1 : high = mid
      console.log("obj: ")
      console.log("Iterator length:" + iterator.length)
      console.log("low: " + low + " mid: " + mid + " high: " + high)
    }
    return low
  }
})
