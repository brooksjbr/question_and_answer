$(document).ready(function() {
	
    // INITIALIZE CONTAINER
	// if container is empty render index of questions
	// NOTE: maybe add flag to turn off init and serve rails view from engine.
	if ($.trim( $('.questionable-container').text() ).length == 0) {
		aaqClientService.getPage("http://localhost:3000/service/questions.json")
	}
	
	// On click, grab link url and template info to fetch page
	$('body').delegate("#click-event", "click", function() {
		var url, tmplt;
		url = $(this).data( "url" );
		tmplt = $(this).data( "tmplt" );
		
		// TODO: Make default url configurable
		if(typeof url == "undefined") {
			url = "http://localhost:3000/service/questions.json"
			tmplt = "questions/index"
		}
		
		aaqClientService.getPage(url, tmplt)
	});
	
	//Show the edit form, hide index
	$('body').delegate("#edit-event", "click", function() {
		aaqClientService.toggleEditQuestion($(this).data("uid"));
	});
	
	// Hide edit form, show index
	$('body').delegate("#cancel-question-edit", "click", function() {
		aaqClientService.toggleEditQuestion($(this).data("uid"));
	});
	
	$("body").delegate("#delete-question", "click", function() {
		var url = $(this).data("url");
		var uid = $(this).data("unique-id")
		aaqClientService.confirmDelete(url, uid)
	});
	
	//fetch form data, format json, and submit formdata
	$('body').delegate("#submit-form", "click", function() {
		var form_id = $(this).data("form-id");
		var id;
			
		if (form_id == undefined) {
			id = '#new-question-form'
		} else {
			id = '#edit-question-form-'+form_id
		}
		
		$(id).submit(function(){
			var json = {};
		    var formdata = $(this).serializeArray();
		    $.each(formdata, function() {
		        if (json[this.name] !== undefined) {
		            if (!json[this.name].push) {
		                json[this.name] = [json[this.name]];
		            }
		            json[this.name].push(this.value || '');
		        } else {
		            json[this.name] = this.value || '';
		        }
		    });
		
			aaqClientService.submitForm(json);
			return false
		});
	});
	
});