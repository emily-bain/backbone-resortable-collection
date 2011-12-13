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
    this.models = this.sortBy(this._comparator)
    if (!options.silent) this.trigger('reset', this, options)
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
                this._comparator ? this.sortedIndex(model, this.comparator) :
                this.length
    this.model.splice(index, 0, model)
    model.bind('all', this._onModelEvent)
    this.length++
    if (!options.silent) model.trigger('add', model, this, options)
    return model
  }
})
