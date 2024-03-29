function getTagsInputValues(selector) {
  tagNames = [ ];
  $(selector).find('.bootstrap-tagsinput').find('.tag').each(function(tagIndex) {
    tagNames.push($(this).text())
  });

  return tagNames;
}

function showLoader() { 
  //$('.loader-wrap').css('transition', 'all 0.4s ease-in-out');
  $('.loader-wrap').css('opacity', '1');
  $('.loader-wrap').css('display','block'); 
  $('body').addClass('dark');
  $('.PFMain').css('opacity', '0.3');
  $('h1').css('opacity', '0.3');
}

function hideLoader() {
  setTimeout(function() {
    $('.loader-wrap').css('display', 'none');
  }, 900);
  $('body').removeClass('dark');
  $('.PFMain').css('opacity', '1.0');
  $('.loader-wrap').css('opacity', '0');
  $('h1').css('opacity', '1');
}

function movePFBlockAside() {
  $('.PFMain').css('position', 'absolute');
  $('.PFMain').css('left', '-400px');

  $('.js-chart-container').addClass('PFChartBox');
  $('.data-list').css('display', 'block');
  $('.js-stats').css('display', 'block');
  $('#myChart').css('display', 'block');
  
  $('.js-chart-container').css('opacity', '1');
  $('.js-chart-box').css('opacity', '1');
  $('.data-list').css('opacity', '1');
  $('.js-stats').css('opacity', '1');

  $('#myChart').css('opacity', '1');
  var button = $('<span class="hideBtn btn btn-primary fui-triangle-right-large"></span>');
  button.css('position', 'absolute');
  button.css('left', '20px');
  button.css('top', '400px');
  button.click(function() {
    movePFBlockCenter();
  });
  $('body').append(button);
}

function movePFBlockCenter() {
  $('.js-chart-container').removeClass('PFChartBox');
  $('.js-chart-container').css('opacity', '0');
  $('.js-stats').css('opacity', '0');
  $('.PFMain').css('left', '400px');
  $('#myChart').css('opacity', '0');
  $('.data-list').css('opacity', '0');
  setTimeout(function() { 
    $('#myChart').css('display', 'none');
    $('.data-list').css('display', 'none');
    $('.js-chart-box').css('display', 'none');
    $('.PFMain').css('position', 'static');  
    $('.js-stats').css('display', 'none');
  }, 400);
  $('.hideBtn').remove();
}

$('.loader-wrap').css('display', 'none');
hideLoader();
