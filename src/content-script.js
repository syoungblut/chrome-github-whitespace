(function( doc, location ) {
 
  
  var addWhitespaceToggleButton = function(groupSelector, uri, title) {
    
    var group = doc.querySelector(groupSelector);
    
    if (group == null || group.length == 0) {
      return;
    }
    
    var code = doc.createElement( 'code' ); 
    // this is a hack to fix some weird height issues with their CSS
    code.textContent = ' ';

    var a = doc.createElement( 'a' );
    a.className = "minibutton  tooltipped-n";
    a.href = uri.toString();
    a.setAttribute('aria-label', title);
    a.setAttribute('title', title);
    a.textContent = ' \u2423';
    
    var li = document.createElement( 'li' );
    
    li.appendChild(a);
    a.appendChild(code);
    
    var item = group.firstChild;
    if (item == null) {
      item = doc.createElement("span");
      group.appendChild(item);
    }
    
    group.insertBefore(li, item);
    return a;
  };

 
  var buttonGroup = '#files .meta .actions';
  var hasButtonGroup = doc.querySelector(hasButtonGroup) == null;
  
  if (!hasButtonGroup) {
    return;
  }
  
  var uri = new Uri(location);
  var displayWhitespace = Boolean(uri.getQueryParamValue('w'));
  uri.deleteQueryParam("w");
  var text = "Compare with Whitespace";
  if (!displayWhitespace) {
    uri.addQueryParam('w', "true");
    text = "Ignore Whitespace";
  }
  
  
  var button = addWhitespaceToggleButton("ul.pagehead-actions", uri, text);
  if (displayWhitespace) {
    button.style.backgroundImage = "linear-gradient(rgb(150, 150, 150), rgb(238, 238, 238))";
  }


})( document, location );
