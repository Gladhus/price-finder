function getTagsInputValues(selector) {
  tagNames = [ ];
  $(selector).find('.bootstrap-tagsinput').find('.tag').each(function(tagIndex) {
    tagNames.push($(this).text())
  });

  return tagNames;
}

function showLoader() {
  $('body').addClass('dark');
  $('.PFBox').css('opacity', '0.3');
  $('.loader-wrap').css('display', 'block');
}

function hideLoader() {
  $('body').removeClass('dark');
  $('.PFBox').css('opacity', '1');
  $('.loader-wrap').css('display', 'none');
}

hideLoader();
