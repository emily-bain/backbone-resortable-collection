# Resortable Collection for Backbone

Just a little handy extension to the Backbone Collection class. Intended to add a bit more flexibility to the ordering of the Collection classes

# Usage

## Collection.sort()
Collection.sort now accepts 2 arguments:
* silent: behaves exactly the same as in vanilla Backbone. suppresses "reset" event triggering on sort
* comparator: overrides the default comparator for Backbone. This becomes "active comparator" and inserts will keep the collection ordered via this comparator until the list is sorted by a new comparator
