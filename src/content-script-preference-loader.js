(function(global, doc, location ) {
  
  var uri = new Uri(location);
  var displayWhitespace = Boolean(uri.getQueryParamValue('w'));
  if (displayWhitespace) {
    return;
  }
  
  if(GitHubWitespaceCookie.isEnabled()) {
    uri.addQueryParam('w', "true");
    global.location = uri;
  }


})(window, document, location);
