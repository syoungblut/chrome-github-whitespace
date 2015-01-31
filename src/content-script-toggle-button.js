
(function(global, doc ) {
 
  var appendHtmlScript = function() {
    var url = chrome.extension.getURL('page-script-link-rewriter.js'); 
    
    
    var headID = document.getElementsByTagName("head")[0];         
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = url;
    headID.appendChild(newScript);
  };
  
  var addWhitespaceToggleButton = function(glbl, groupSelector, uri, title, displayingWhitespace) {
    
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
    a.addEventListener("click", function() {
      if (displayingWhitespace) {
        GitHubWitespaceCookie.disable();
      } else {
        GitHubWitespaceCookie.enable();
      }
      
      var newUri = generateUrl(glbl, displayingWhitespace);
      var newHref = newUri.path() + newUri.query();
      a.href = newHref;
      
      //return false;
    });
    
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
  
  var generateUrl = function(glbl, displayWhitespace) {
    
    var uri = new Uri(glbl.location);
    uri.deleteQueryParam("w");
    if (!displayWhitespace) {
      uri.addQueryParam('w', "true");
    }
    
    return uri;
  };

 
  var buttonGroup = '#files .meta .actions';
  var hasButtonGroup = doc.querySelector(hasButtonGroup) == null;
  
  if (!hasButtonGroup) {
    return;
  }
  
  var uri = new Uri(global.location);
  var displayWhitespace = Boolean(uri.getQueryParamValue('w'));
  var text = (!displayWhitespace) ? "Ignore Whitespace" : "Compare with Whitespace";
  
  var button = addWhitespaceToggleButton(
    global,
    "ul.pagehead-actions", 
    generateUrl(global, displayWhitespace), 
    text, 
    displayWhitespace);
    
  if (displayWhitespace) {
    button.style.backgroundImage = "linear-gradient(rgb(150, 150, 150), rgb(238, 238, 238))";
    appendHtmlScript();
  }


})(window, document);
