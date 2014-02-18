Note: This is now mostly redundant, since Backbone as of 0.9.0 supports both sortBy & classic sort comparators which was the main benefit of this work. It is kept up for historical purposes.

# Resortable Collection for Backbone

ResortableCollection is a handy utility class extension of the Backbone Collection class. Intended to add a bit more flexibility to the ordering of the Collection classes. This is intended for cases where one might want to have the choice to reorder the Collection class by any of several attributes while taking advantage of the Collection classes ability to maintain an ordering.

# Usage

## Collection.sort()

Collection.sort now accepts 2 arguments:

 * silent: behaves exactly as in vanilla Backbone. Set to true to suppress the "reset" event on sort
 * comparator: pass this a comparison function to sort the collection by that comparison. This will override whichever comparator is set as Collection.comparator. To return to sorting by default comparator merely call sort with no comparator option set. This accepts both the sortBy comparator already accepted by Backbone for Collection.comparator as well as the classical (a,b) comparison function supported by javascript's Array.sort.

# License

This code is released under the terms of the MIT license.
