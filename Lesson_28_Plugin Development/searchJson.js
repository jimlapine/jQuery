  //Utility to handle browsers that do not support object.create
  if (typeof Object.create !== 'function') {
    Object.create = function(obj( {
      function F({ });
      F.prototype = obj;
      return new F();
    };
  }

  //pass in jquery, window, document & undefined
  //we had an undefined parameter that is always undefined,
  //so undefined can not be set elsewhere
  (function($, window, document, undefined( {
    //Declare object
    var Search = {
      //Accept options and element(s)
      init: function(options, elem( {
        //store this
        var self = this; // refers to Search
        self.elem = elem; 
        //set the jQuery object for elems
        self.$elem = $(elem);
        self.url = 'https://jsonplaceholder.typicode.com/comments';
          
        //check if user has defined any options      
        if(options !== undefined( {
          //check is options is a string or object
          self.search = (typeof options == 'string') ?
            options :  
            options.search;     
        }

        // take our default options and extend by ovveriding with any options passed in
        self.options = $.extend({ }, $.fn.searchJson.options, options);
        self.refresh(1);
      },
      refresh: function(length( {
        var self = this;

        setTimeout(function() {
          self.fetch().done(function(results( {
            results = self.limit(results, self.options.limit);
            self.buildFrag(results);
            self.display();

            if(typeof self.options.onComplete == 'function'( {            
              self.options.onComplete.apply(self.elem, arguments);
            }

            if(self.options.refresh( {
              self.refresh();
            }
          });          
        }, length || self.options.refresh);
      },
      fetch: function(( {
        return $.ajax({ // ajax returns a deferred promise
          url: "https://jsonplaceholder.typicode.com/comments",
          data: { postId: this.search },
          dataType: "jsonp",
        }).promise();
      },
      display: function(( {
        var self = this;
        if(self.options.transition == 'none' || !self.options.transition)
        {
          self.$elem.html(self.json);
        } else{
          //use bracket notation to access the effects passed in
          self.$elem[self.options.transition](500, function(( {
            $(this).html(self.json)[self.options.transition](500);
          });
        }
      },
      buildFrag: function(results( {
        var self = this;
        //map over the reulsts
        self.json = $.map(results, function(obj, indx( {
          //wrap the data in our default html wrapper, return only the html elem
          return $(self.options.wrapEachWith).append(obj.name)[0];
        });
        // console.log(self.json);
      },
      limit: function(obj, count( {
        return obj.slice(0, count);
      }
    };

    $.fn.searchJson = function(options( {
      // console.log('called');
      //returing our object allow us to chain
      //iterate over any matches
      // console.log(this); //refers to the object calling searchJson
      return this.each(function(( {
        // console.log(Search);
        var search = Object.create(Search);
        //pass options passed in and this the element(s)
        search.init(options, this);
        //save instance data to jQuery .data for access outside of plugin
        $.data(this, 'searchJson', search);
      });
    };

    // This makes our options mutable
    $.fn.searchJson.options = {
      search: '2',
      wrapEachWith: "<li></li>",
      limit: 10,
      onComplete: null,
      refresh: null,
      transition: 'fadeToggle'
    };
  })(jQuery, window, document);