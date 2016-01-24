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
  var myChart = $("#myChart");
  var table = $('.table>tbody');
  table.empty();

  myChart.css("display","block");
  $('.data-list').css('display', 'block');
  var ctx = myChart.get(0).getContext("2d");

  var graphData = {
    labels: [data.ranges[0].min.toFixed(2) + " - " + data.ranges[0].max.toFixed(2) + " $",
             data.ranges[1].min.toFixed(2) + " - " + data.ranges[1].max.toFixed(2) + " $",
             data.ranges[2].min.toFixed(2) + " - " + data.ranges[2].max.toFixed(2) + " $",
             data.ranges[3].min.toFixed(2) + " - " + data.ranges[3].max.toFixed(2) + " $",
             data.ranges[4].min.toFixed(2) + " - " + data.ranges[4].max.toFixed(2) + " $"],
    datasets: [
      {
        label: "Number of items per price range",
        fillColor: "rgba(120,120,120,0.5)",
        strokeColor: "rgba(160,160,160,0.8)",
        highlightFill: "rgba(26, 188, 156, 0.3)",
        highlightStroke: "rgba(210,210,210, 0.6)",
        data: [data.ranges[0].ads.length,
               data.ranges[1].ads.length,
               data.ranges[2].ads.length,
               data.ranges[3].ads.length,
               data.ranges[4].ads.length]
      }
    ]
  };

  var ctx = $("#myChart").get(0).getContext("2d");
  var myBarChart = new Chart(ctx).Bar(graphData, {
      responsive: true, scaleFontColor: "#0c0c0c" });

  $('.data-list').css('display', 'block');

  var rank = 1;

  for(var j = 0; j < 5; ++j){
    for(var i = 0; i < data.ranges[j].ads.length; ++i){
      table.append($('<tr><td>' + rank + '</td><td><a href="' + data.ranges[j].ads[i].link + '">' + data.ranges[j].ads[i].title + '</a></td> <td>' + data.ranges[j].ads[i].price.toFixed(2) + ' $</td></tr>'));
      ++rank;
    }
  }
  hideLoader();
  movePFBlockAside();
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
  targets = [ ];
  $(".js-target").find(".select2-choices").find(".select2-search-choice").each(function(categoryIndex) {
    targets.push($(this).find('div').html().toLowerCase());
  });

  return targets;
}

function buildRequest() {
  showLoader();
  sendRequest(getTagsInputValues(".js-tags"), getTagsInputValues(".js-keywords"), getCategories(), getTargets());
}

function sendRequest(tagNames, keywords, categories, targets) {
  $.ajax({
    type: "POST",
    url: urlLocal,
    data: {
      "region" : 80002,
      "targets" : targets,
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
