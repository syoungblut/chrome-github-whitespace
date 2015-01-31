
$("a").each(function(i, x) {
  var $x = $(x);
  var oldAttr = $x.attr('href');
  if (oldAttr) {
    if (oldAttr.indexOf('?') < 0) {
      if (oldAttr.indexOf('/') == 0 && oldAttr.indexOf('//') !== 0) {
        $x.attr('href', $x.attr('href') + '?w=true');
      }
    }
  }
});

/*
function onReplaceState(callback) {
  (function(replaceState) {
    history.replaceState = function() {
      replaceState.apply(this, arguments);
      callback.apply(window, arguments);
    };
  })(history.replaceState);
}
onReplaceState(function() {
});
*/
