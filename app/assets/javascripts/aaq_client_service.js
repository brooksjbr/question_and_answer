// AAQ CLIENT SERVICE LIBRARY
// All client service functions should be namespaced here
// to prevent name collisions
(function( aaqClientService, $, undefined ) {

    /*******************************/
    /**** Begin Public Methods *****/
    /*******************************/

	// Fetch page/template data, render results
	aaqClientService.getPage = function (url, tmplt)
	{
		url = checkJsonRequest(url)
		
		//TODO: Check if theres a data-template attribute to override the service template
		// set it for rendering
		$.get(url, function(data) {

			//Check for template in return data
			if(typeof tmplt == "undefined") {
				if(jQuery.type( data ) == "array" && data.length != 0) {
					tmplt = data[0].tmplt
				} else {
					tmplt = data.tmplt
				}
			}

			//If template is still empty, default to question index
			if (typeof tmplt == "undefined") {
				tmplt = "questions/index" 
			}

			var html = HandlebarsTemplates[tmplt](data); 
			$('.questionable-container').html(html);
		});
	}
	
	// Form submit for create and updates to questions
	aaqClientService.submitForm = function (data) {

		//Retain method type, urls, and callbacks for pre/post form handling
		var postdata = data;
		var url = checkJsonRequest(postdata.url)
		var form_method = String(postdata.method)

		// Clean up dataset for strong params in controller
		delete data.method;
		delete data.url;
		delete data.tmplt;

		$.ajax({
			type: form_method,
		  	url: url,
		  	data: {_method: form_method, question: data},
		  	error: (function() { alert("Something went wrong with form submit, should handle this gracefully and message user.."); }),
		}).done(function (data) { 
			// Determine post form handling by request method
			if (form_method == "put") {
				aaqClientService.updateQuestionContent(data);
				aaqClientService.toggleEditQuestion(data.unique_id)
			} else if (form_method == "post") {
				aaqClientService.getPage(url, postdata.tmplt)
			} else {
				aaqClientService.getPage("http://localhost:3000/service/questions.json")
			}
		});

		return false;
	}
	
	// Form submit for create and updates to questions
	aaqClientService.submitAnswerForm = function (data) {

		//Retain method type, urls, and callbacks for pre/post form handling
		var postdata = data;
		var url = checkJsonRequest(postdata.url)
		var form_method = String(postdata.method)
		var answerUrl = getAnswerUrl(postdata.url);

		// Clean up dataset for strong params in controller
		delete data.method;
		delete data.url;
		delete data.tmplt;
		
		$.ajax({
			type: form_method,
		  	url: url,
		  	data: {_method: form_method, answer: data},
			dataType: 'json',
		  	error: (function() { alert("Something went wrong with form submit, should handle this gracefully and message user.."); }),
		}).done(function (data) {
			if( data ) {
				if (form_method == "put") {
					aaqClientService.updateAnswerContent(data);
					aaqClientService.toggleEditAnswer(data.unique_id)
				} else if (form_method == "post") {
					aaqClientService.consoleLogger("Answer form ajax post")
					data["delete_url"] = answerUrl(data.unique_id)
					data["form_url"] = answerUrl(data.unique_id)
					data["form_method"] = 'put'
					aaqClientService.consoleLogger(data);
					var html = HandlebarsTemplates["answers/answer"](data);
					$('.answer-list').prepend(html);
					aaqClientService.consoleLogger("render new answer, toggle form.")
					aaqClientService.consoleLogger(data)
					$("#open-answer-form").show();
					$("#create-answer-form").hide();
					//aaqClientService.toggleCreateAnswer(data.unique_id)
				}
			}
		});
		
		//aaqClientService.resetForm()
		
		//return false;
	}
	
	aaqClientService.serializeFormData = function(id) {
		
		$('#'+id).submit(function() {			
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

			aaqClientService.submitAnswerForm(json);
			return false;
		});
	}
	
	aaqClientService.resetForm = function (id) {
		if (id) {
			$("form#"+id)[0].reset();	
		} else {
			$("form")[0].reset();	
		}
		
	}
	
	aaqClientService.confirmDelete = function (url, uid) {
		if (confirm("Are you sure you want to delete this item?")){
			aaqClientService.deleteContent(url, uid)
		} else {
			return false;
		}
	}
		
	aaqClientService.deleteContent = function (url, uid) {
		var url = checkJsonRequest( url );
		$.ajax({
			type: "DELETE",
		  	url: url,
		  	success: (function() {$('#'+uid).remove()}),
		  	error: (function() { alert("Something went wrong with form submit, should handle this gracefully.."); })
		});
	}	
	
	aaqClientService.updateQuestionContent = function (data) {		
		$("#title-"+data.unique_id).text(data.title)
		$("#content-"+data.unique_id).text(data.content)
		return false;
	}

	// Hide/Show edit question form
	aaqClientService.toggleEditQuestion = function (uid) {
		$('#index-'+uid).toggle();
		$('#form-'+uid).toggle();
		return false;
	}
	
	aaqClientService.toggleCreateAnswer = function (uid) {
		aaqClientService.consoleLogger("toggle answer response form.."+uid)
		$("#open-answer-form").toggle();
		$("#create-answer-form").toggle();
		//return false;
	}
	
	aaqClientService.toggleEditAnswer = function (uid) {
		$('#answer-'+uid).toggle();
		$('#answer-edit-form-'+uid).toggle();
		return false;
	}
	
	aaqClientService.updateAnswerContent = function (data) {		
		$("#answer-content-"+data.unique_id).text(data.content)
		return false;
	}
	
	// Logger
	aaqClientService.consoleLogger = function(foo) {
		console.log(foo);
	}
	
	/*****************************/
    /**** End Public Methods *****/
    /*****************************/
    

    /****************************************/
    /******* Begin Private Methods **********/
   	/****************************************/

	// requesting url should include .json extension
	function checkJsonRequest(url) {

		if (!url.match(/\.[json]+$/i)) {
			url = url+".json";
		}

		return url
	}
	
	// a closure to build new answer url after the ajax request is complete
	// lose postdata scope and don't have a uid
	var getAnswerUrl = function (url) {	
		return function(uid) {
		    return url+"/"+uid;
		};
	}
	
	/****************************************/
    /********* End Private Methods **********/
   	/****************************************/
    
}( window.aaqClientService = window.aaqClientService || {}, jQuery ));

