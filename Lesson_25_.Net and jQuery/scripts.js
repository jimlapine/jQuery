$('button').on('click', function(e){
	e.preventDefault();
	$(this).submit();          
});

var People = {
	init: function(config){
		this.config = config;
		this.bindEvents();
	},

	bindEvents: function(){
		this.config.configForm.on('submit', this.fetchPeople);
	},

	clearResults: function (){              
          $('#noResults').empty();
          $('div.data').remove();
    },

    registerHelper: function(){
        Handlebars.registerHelper('fullName', function(data){
              return data.LastName + (data.MiddleName != undefined ? " " + data.MiddleName : "") + " , " + data.FirstName;
          });
    },

    processResults: function (data){   
      this.registerHelper();           
      this.template = Handlebars.compile( this.config.configTemplate.html() );
      var temp = this.template(data);
      //console.log(temp);
      this.clearResults();
      $('ul.results').append(temp);
    },

	fetchPeople: function(){
	  var self = People;
      var formContent = $(this).serialize();
      self.config.configDialog.dialog({ 
        modal: true
       }); 

      $.ajax({
		url: "Adventure.aspx",
		type: "POST",
		data: formContent,
		dataType: "json",
		success: function(results){
			self.config.configDialog.dialog('close');

			if(results.length > 0) {
				self.processResults(results);
			} else {
				self.clearResults();

			$('<h2></h2>', {
				text: 'No results found.',
				class: "error"
				}).appendTo('#noResults');      		
	 		}
		}
  	  });
  	}
};

People.init({
	configForm : $('form'),
	configDialog: $( "#dialog" ),
	configTemplate: $('#template')
});