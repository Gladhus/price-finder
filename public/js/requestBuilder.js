/*Dropzone.autoDiscover = false;

$("#search #dropzone").dropzone({ 
																	url: urlLocal.toString(),
																	clickable: true,
																	uploadMultiple: false
																});
Dropzone.options.myDropzone = {
  init: function() {
        thisDropzone = this;
        this.on("success", function(file, responseText) {
            var responseText = file.id // or however you would point to your assigned file ID here;
            console.log(responseText); // console should show the ID you pointed to
            // do stuff with file.id ...
        });
    }
}; */

function buildClarifaiData() {
	var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  if (file) {
    reader.readAsDataURL(file);
  }

	sendClarifaiRequest(img);
}

function updateResult(data, textStatus, jqXHR) {
	
}

function sendClarifaiRequest(img) {
	$.ajax({
	  type: "POST",
	  url: urlClarifai,
	  headers: { "grant_type" : clarifaiCredentials.grant_type.toString() },
	  data: { "client_id" : clarifaiCredentials.client_id.toString(),
	  				"client_secret" : clarifaiCredentials.client_secret.toString() },
	  success: updateResult,
	  dataType: "json"
	});
}

function sendRequest() {

}

