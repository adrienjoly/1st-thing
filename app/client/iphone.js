Template.iphone.rendered = function(){
  var ua = navigator.userAgent;
  if (ua && ua.indexOf("Mobile") != -1 && ua.indexOf("iPad") == -1)
    if (confirm("Go to mobile version?"))
      top.location.href = "/";
};
