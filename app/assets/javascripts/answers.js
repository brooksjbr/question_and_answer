$(document).ready(function() {
	
	// Get answer page
	$('body').delegate("#see-answers", "click", function() {
		var url, tmplt;
		url = $(this).data( "url" );
		tmplt = $(this).data( "tmplt" );
		aaqClientService.getPage(url, tmplt)
	});
	
	//Show new answer form
	$('body').delegate("#open-answer-form", "click", function() {
		var uid = $(this).data("uid");
		aaqClientService.toggleCreateAnswer(uid);
	});

	//Hide new answer form
	$('body').delegate("#cancel-answer-form", "click", function() {
		var uid = $(this).data("uid");
		aaqClientService.toggleCreateAnswer(uid)		
	});
	
	$("body").delegate("#new-answer-button", "click", function() {
		var form_id = $(this).data("form");
		aaqClientService.serializeFormData(form_id, aaqClientService.submitAnswerForm);
	});

	$("body").delegate("#answer-button", "click", function() {
		var form_id = $(this).data("form");
		aaqClientService.serializeFormData("#"+form_id, aaqClientService.submitAnswerForm);
	});

	$("body").delegate("#delete-answer", "click", function() {
		var url = $(this).data("url");
		var uid = $(this).data("uid");
		aaqClientService.confirmDelete(url, "answer-container-"+uid)
	});
	
	$('body').delegate("#edit-answer", "click", function() {
		var uid = $(this).data("uid");
		aaqClientService.toggleEditAnswer(uid);
	});
	
	$('body').delegate("#cancel-answer-edit", "click", function() {
		var uid = $(this).data("uid");
		aaqClientService.toggleEditAnswer(uid);		
	});
});