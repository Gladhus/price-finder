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
  hideLoader();
}

function sendClarifaiRequest(img) {
  $.ajax({
    type: "POST",
    url: urlClarifai,
    headers: { "grant_type" : clarifaiCredentials.grant_type.toString() },
    data: { 
      "client_id" : clarifaiCredentials.client_id.toString(),
      "client_secret" : clarifaiCredentials.client_secret.toString() 
    },
    success: updateResult,
    dataType: "json"
  });
}

function getTagsInputValues(selector) {
  tagNames = [ ];
  $(selector).find('.bootstrap-tagsinput').find(".tag").each(function(tagIndex) {
    tagNames.push($(this).text())
  });

 return tagNames;
}

function getCategories() {
  categories = [ ];
  categories.push($(".js-category").find(".select2-chosen").text());

  return categories;
}

function getTargets() {

}

function buildRequest() {
  showLoader();
  sendRequest(getTagsInputValues(".js-tags"), getTagsInputValues(".js-keywords"), getCategories());
}

function sendRequest(tagNames, keywords, categories) { 
  $.ajax({
    type: "POST",
    url: urlLocal,
    data: { 
      "region" : 80002,
      "targets" : [ "kijiji" ],
      "languages" : {
	"french" : {
	  "tags" : tagNames, 
	  "keywords" : keywords, 
	  "categories" : categories 
	},
	"english" : {
	  "tags" : tagNames, 
	  "keywords" : keywords, 
	  "categories" : categories 
	}
      }
    },
    success: updateResult,
    dataType: "json"
  });
}

