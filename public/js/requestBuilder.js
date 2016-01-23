var myDropzone = new Dropzone("search#myId", { url: "/file/post"});

function buildClarifaiData() {
	//var input = $( "#dropZoneImg" );
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

