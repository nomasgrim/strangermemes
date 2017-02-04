$(function(){
  $('nav').on('click', 'li', function(e){
    $('nav').find('.active').removeClass('active');
    $(this).toggleClass('active');
  });

  $('.button').on('mouseup', function(e){
    var logoCheck = $('.nav__logo').hasClass('active');
    var memeCheck = $('.nav__meme').hasClass('active');
    var image;

    $('.meme__form').fadeOut();
    $('.meme__custom').fadeIn();
    var lineOne = $('#line-one').val();
        lineOne = lineOne.toUpperCase();
    var lineTwo = $('#line-two').val();
        lineTwo = lineTwo.toUpperCase();
    
    if(logoCheck)
      image = 'black_bkg.jpg';
    if(memeCheck)
      image = 'strangerthings.jpg';

    
    window.blkblnkt.createCanvas(lineOne, image);

  });

  $('.close').on('click', function(){
    $('.meme__custom').fadeOut();
    $('.meme__form').fadeIn();
  });

});