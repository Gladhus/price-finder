function getTagsInputValues(selector) {
  tagNames = [ ];
  $(selector).find('.bootstrap-tagsinput').find('.tag').each(function(tagIndex) {
    tagNames.push($(this).text())
  });

  return tagNames;
}

function showLoader() {
  $('.loader-wrap').css('transition', 'all 0.4s ease-in-out');
  $('body').addClass('dark');
  $('.PFBox').css('opacity', '0.3');
  $('.loader-wrap').css('opacity', '1');
}

function hideLoader() {
  $('body').removeClass('dark');
  $('.PFBox').css('opacity', '1');
  $('.loader-wrap').css('opacity', '0');
}

hideLoader();

