//=require ../libs/js/jquery.js
//=require ../libs/js/bootstrap.js
//=require ../libs/js/slick.js
$(document).ready(function(){
  $('.about__slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows:false,
  });
  $('.what-they-say__blog-slider-items').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows:true,
    prevArrow: $('.prev'),
    nextArrow: $('.next')
  });
});



