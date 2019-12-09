var nowFunc = Date.now || function() {
    return new Date().getTime();
};

var throttle = function(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function() {
    previous = options.leading === false ? 0 : nowFunc();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function() {
    var now = nowFunc();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
};


$(document).on('ready', function() {  
  var winHeight = $(window).height(), 
      // docHeight = $(document).height(),
      anchor = $("#comments"),
      docHeight = $("#comments").offset().top,
      progressBar = $('progress'),
      max, value;

      var updateMax = throttle(function(){
        winHeight = $(window).height(),
        docHeight = anchor.offset().top,

        max = docHeight - winHeight;
        progressBar.attr('max', max);

        value = $(window).scrollTop();
        progressBar.attr('value', value);
      }, 10);

      max = docHeight - winHeight;
      progressBar.attr('max', max);

      $(document).scroll(updateMax);

      $(window).resize(updateMax);
    });


(function($) {
$(document).ready(function() {
    var navChildren = $("#header > .links li").children();
    var aArray = [];
    for (var i = 0; i < navChildren.length; i++) {
        var aChild = navChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    }
    $(window).scroll(function() {
        var windowPos = $(window).scrollTop();
        var windowHeight = $(window).height();
        var docHeight = $(document).height();
        for (var i = 0; i < aArray.length; i++) {
            var theID = aArray[i];
            var secPosition = $(theID).offset().top;
            secPosition = secPosition - 135;
            var divHeight = $(theID).height();
            divHeight = divHeight + 90;
            if (windowPos >= secPosition && windowPos < (secPosition + divHeight)) {
                $("a[href='" + theID + "']").parent().addClass("currentsection");
            } else {
                $("a[href='" + theID + "']").parent().removeClass("currentsection");
            }
        }
    });
 
});
})(jQuery);