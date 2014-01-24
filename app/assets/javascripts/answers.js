$(document).ready(function() {
	
	// Get answer page
	$('body').delegate("#see-answers", "click", function() {
		var url, tmplt;
		url = $(this).data( "url" );
		tmplt = $(this).data( "tmplt" );
		qaClientService.getPage(url, tmplt)
	});
	
	//Show new answer form
	$('body').delegate("#open-answer-form", "click", function() {
		var uid = $(this).data("uid");
		qaClientService.toggleCreateAnswer(uid);
	});

	//Hide new answer form
	$('body').delegate("#cancel-answer-form", "click", function() {
		var uid = $(this).data("uid");
		qaClientService.toggleCreateAnswer(uid)		
	});

  // Validate form, submit form
	$("body").delegate("#answer-button", "click", function() {
		var form_id = "#"+$(this).data("form");

		var form = $( form_id );
		form.validate({});

		if ( form.valid() ) {
			qaClientService.serializeFormData(form_id, qaClientService.submitAnswerForm);
		} else {
			return false;
		}
	});

	// Remove answer
	$("body").delegate("#delete-answer", "click", function() {
		var url = $(this).data("url");
		var uid = $(this).data("uid");
		qaClientService.confirmDelete(url, "answer-container-"+uid)
	});
	
	//Open edit answer form
	$('body').delegate("#edit-answer", "click", function() {
		var uid = $(this).data("uid");
		qaClientService.toggleEditAnswer(uid);
	});
	
	// Cancel answer editting
	$('body').delegate("#cancel-answer-edit", "click", function() {
		var uid = $(this).data("uid");
		qaClientService.toggleEditAnswer(uid);		
	});
});