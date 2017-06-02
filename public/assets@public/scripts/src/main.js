$(function () {
  // Reply form
  function replyFromWrapperMinHeight() {
    var windowHeight = $(window).outerHeight();
    var replyHeagerHeight = $('.reply .reply-header').outerHeight();
    console.log(replyHeagerHeight);
    var replyFooterHeight = $('.reply .reply-footer').outerHeight();
    console.log(replyFooterHeight);

    var minReplyFormWrapperHeight = windowHeight - replyHeagerHeight - replyFooterHeight - 20;

    $('.reply .reply-form-wrapper').css('min-height', minReplyFormWrapperHeight);
  }

  replyFromWrapperMinHeight();
});
