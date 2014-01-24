// Questions and Answers Client Service Library
// All client service functions should be namespaced here
// to prevent name collisions
(function( qaClientService, $, undefined ) {

  /*******************************/
  /**** Begin Public Methods *****/
  /*******************************/

  /**********************************/
  /**** Question Public Methods *****/
  /**********************************/
		
	// Form submit for create and updates to questions
	qaClientService.submitQuestionForm = function (data) {

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
		  	data: {_method: form_method, question: data}
		}).fail(function (data) {
			alert(" We're sorry, something went wrong with you submission. Please try again.")
		}).done(function (data) { 
			// Determine post form handling by request method
			if (form_method == "put") {
				qaClientService.updateQuestionContent(data);
				qaClientService.toggleEditQuestion(data.unique_id)
			} else if (form_method == "post") {
				qaClientService.getPage(url, postdata.tmplt)
			} else {
				qaClientService.getPage("/service/questions.json")
			}
		});

		return false;
	}

	/**********************************/
  /**** Answer Public Methods *******/
  /**********************************/
	
	// Form submit for create and updates to questions
	qaClientService.submitAnswerForm = function (data) {

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
			dataType: 'json'
		}).fail(function (data) {
			alert(" We're sorry, something went wrong with you submission. Please try again.")
		}).done(function (data) {
			if( data ) {
				if (form_method == "put") {
					qaClientService.updateAnswerContent(data);
					qaClientService.toggleEditAnswer(data.unique_id)
				} else if (form_method == "post") {
					data["delete_url"] = answerUrl(data.unique_id)
					data["form_url"] = answerUrl(data.unique_id)
					data["form_method"] = 'put'
					var html = HandlebarsTemplates["answers/answer"](data);
					$('.answer-list').prepend(html);
					qaClientService.toggleCreateAnswer(data.unique_id)
				}
			}
		});
		
		qaClientService.resetForm()
		
		return false;
	}

	/***********************************************/
	/*  Shared Question and Answer methods */
	/***********************************************/

	// Fetch page/template data, render results
	qaClientService.getPage = function (url, tmplt)
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
	
	//Pull form data for submission
	qaClientService.serializeFormData = function(id, ajaxcallback) {

		$(id).submit(function() {
			event.preventDefault();		
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

		  // callback ajax handler for question or answers
      ajaxcallback(json)

      // Prevent double submits
      $(id).unbind();

			return false;
		});
	}
	
	// Empty form fields
	qaClientService.resetForm = function (id) {
		if (id) {
			$("form#"+id)[0].reset();	
		} else {
			$("form")[0].reset();	
		}
		
	}
	
	// Force user to confirm delete action
	qaClientService.confirmDelete = function (url, uid) {
		if (confirm("Are you sure you want to delete this item?")){
			qaClientService.deleteContent(url, uid)
		} else {
			return false;
		}
	}
	
	// Ajax request to delete content	
	qaClientService.deleteContent = function (url, uid) {
		var url = checkJsonRequest( url );
		$.ajax({
			type: "DELETE",
		  url: url,
		  success: (function() {$('#'+uid).remove()}),
		  error: (function() { alert("Something went wrong with form submit, should handle this gracefully.."); })
		});
	}	
	
	qaClientService.updateQuestionContent = function (data) {		
		$("#title-"+data.unique_id).text(data.title)
		$("#content-"+data.unique_id).text(data.content)
		return false;
	}

	// Hide/Show edit question form
	qaClientService.toggleEditQuestion = function (uid) {
		$('#index-'+uid).toggle();
		$('#form-'+uid).toggle();
		return false;
	}
	
	qaClientService.toggleCreateAnswer = function (uid) {
		$("#open-answer-form").toggle();
		$("#create-answer-form").toggle();
		return false;
	}
	
	qaClientService.toggleEditAnswer = function (uid) {
		$('#answer-'+uid).toggle();
		$('#answer-edit-form-'+uid).toggle();
		return false;
	}
	
	qaClientService.updateAnswerContent = function (data) {		
		$("#answer-content-"+data.unique_id).text(data.content)
		return false;
	}
	
	// Logger
	qaClientService.consoleLogger = function(msg) {
		console.log(msg);
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
    
}( window.qaClientService = window.qaClientService || {}, jQuery ));

