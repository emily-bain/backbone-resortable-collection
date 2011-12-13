// A Backbone Collection designed to behave nicely with regards
// to sorting by multiple criteria

var ResortableCollection = Backbone.Collection.extend({
  sort : function(options) {
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
  }
})
