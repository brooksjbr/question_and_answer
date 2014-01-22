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
	
	// Cancel edit, hide form, retore originial content, show index
	$('body').delegate("#cancel-question-edit", "click", function() {
		var id = $(this).data("uid")
		aaqClientService.toggleEditQuestion(id);
		aaqClientService.enableButton('input[type="submit"]#question-button');
		aaqClientService.restoreQuestionForm(id);
	});
	
	$("body").delegate("#delete-question", "click", function() {
		var url = $(this).data("url");
		var uid = $(this).data("unique-id")
		aaqClientService.confirmDelete(url, uid)
	});
	
	//fetch form data, format json, and submit formdata
	$('body').delegate("#question-button", "click", function() {
		var form_id = $(this).data("form");
		aaqClientService.serializeFormData("#"+form_id, aaqClientService.submitQuestionForm);
	});

	$("body").delegate(".input_error", "click", function() {
		$(this).val("");
		aaqClientService.enableButton('input[type="submit"]#question-button');
		$(".input_error").removeClass( "input_error" );
	});
});