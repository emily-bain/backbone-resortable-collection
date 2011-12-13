# Resortable Collection for Backbone

Just a little handy extension to the Backbone Collection class. Intended to add a bit more flexibility to the ordering of the Collection classes

# Usage

## Collection.sort()
Collection.sort now excepts 2 arguments:
* silent: behaves exactly the same as in vanilla Backbone. suppresses "reset" event triggering on sort
* comparator: overrides the default comparator for Backbone. For now, this just resorts the array.