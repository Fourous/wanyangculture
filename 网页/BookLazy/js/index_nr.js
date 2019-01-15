/*
$(document).ready(function () {
    $('#switcher ').click(function (event) {
        if( $(event.target).is('a')){

            var nr_className= event.target.id;
            $('#switcher li a').removeClass('sel');
            $(event.target).addClass('sel');
            $('.nr div').hide();
            $('.'+nr_className).show();
            event.preventDefault();
        }
    });
});*/
$('#switcher li a').click(function (event) {
    event.preventDefault();
    var index= $(this).parent().index();
    $('#switcher li a').removeClass('sel');
    $(event.target).addClass('sel');
    $('.nr>div').eq(index).show().siblings().hide();
});
/*
function changeD(name){
    var divs= document.getElementsByName('dv');
    for (var i=0 ; i< divs.length; i++){
        if (divs[i].class== name){
           divs[i].style.display= '';
        }else{
            divs[i].style.display= 'none';
        }
    }
}*/
