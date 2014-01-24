$(document).ready(function() {
	
    // INITIALIZE CONTAINER
	// if container is empty render index of questions
	// NOTE: maybe add flag to turn off init and serve rails view from engine.
	if ($.trim( $('.questionable-container').text() ).length == 0) {
		qaClientService.getPage("/service/questions.json")
	}
	
	// On click, grab link url and template info to fetch page
	$('body').delegate("#click-event", "click", function() {
		var url, tmplt;
		url = $(this).data( "url" );
		tmplt = $(this).data( "tmplt" );
		
		// TODO: Make default url configurable
		if(typeof url == "undefined") {
			url = "/service/questions.json"
			tmplt = "questions/index"
		}
		
		qaClientService.getPage(url, tmplt)
	});
	
	//Show the edit form, hide index
	$('body').delegate("#edit-event", "click", function() {
		qaClientService.toggleEditQuestion($(this).data("uid"));
	});
	
	// Cancel edit, hide form, retore originial content, show index
	$('body').delegate("#cancel-question-edit", "click", function() {
		var id = $(this).data("uid")
		qaClientService.toggleEditQuestion(id);
	});
	
	// Delete question
	$("body").delegate("#delete-question", "click", function() {
		var url = $(this).data("url");
		var uid = $(this).data("unique-id")
		qaClientService.confirmDelete(url, uid)
	});
	
	//fetch form data, format json, and submit formdata
	$('body').delegate("#question-button", "click", function() {
		var form_id = "#"+$(this).data("form");

		var form = $( form_id );
		form.validate({});

		if ( form.valid() ) {
			qaClientService.serializeFormData(form_id, qaClientService.submitQuestionForm);
		} else {
			return false;
		} 
	});
});
