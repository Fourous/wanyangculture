$('#gy_nav li a').click(function (event){
    event.preventDefault();
    var index= $(this).parent().index();
    $('#gy_nav li').removeClass('current').removeClass('switch_one');
    $(event.target).parent().addClass('current').addClass('switch_one');
    $('#gy_content>div').eq(index).show().siblings().hide();
});