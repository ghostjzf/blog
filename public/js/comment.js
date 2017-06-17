var prepage = 2;
var page = 1;
var pages = 0;
var comments = [];
/**
 * 提交评论
 */
$('.messageBtn').on('click', function(){
    $.ajax({
        type:"POST",
        url:"/api/comments/post",
        data:{
            contentid: $('#contentid').val(),
            content: $('.message').val()
        },
        dataType:"json",
        success:function(result){
            $('.message').val("");
            console.log(result);
            comments = result.data.comments.reverse();
            renderComment();
        }
    })
});

//每次页面重载的时候获取以下文章的评论
$.ajax({
    type:"GET",
    url:"/api/comments",
    data:{
        contentid: $('#contentid').val()
    },
    dataType:"json",
    success:function(result){
        comments = result.data.reverse();
        renderComment();
    }
});

$('.pager').delegate('a', 'click', function(){
    if($(this).parent().hasClass('previous')){
        page--;
    }else{
        page++;
    }
    renderComment();
});

function renderComment(){
    var $lis = $('.pager li');
    var pages = Math.max(Math.ceil(comments.length/prepage),1);
    var start = Math.max(0,(page -1)* prepage);
    var end = Math.min(start + prepage,comments.length);

    $lis.eq(1).html(page + " / " + pages);
    if(comments.length == 0){
        $('.pager').hidden();
        $('.noEval').show();
    }else{
        if(page <= 1){
            $lis.eq(0).html('<span>没有上一页了</span>');
        }else{
            $lis.eq(0).html('<a href="javascript:;">上一页</a></span>');
        }

        if(page >= pages){
            $lis.eq(2).html('<span>没有下一页了</span>');
        }else{
            $lis.eq(2).html('<a href="javascript:;">下一页</a></span>');
        }
    }
    var html = '';
    for(var i=start;i<end;i++){
        html += '<li class="col-lg-12">' +
                    '<div class="col-lg-6 user">'+ comments[i].username +'</div>' +
                    '<div class="col-lg-6 time">'+ formatDate(comments[i].postTime) +'</div>' +
                    '<div class="col-lg-12 contents">'+ comments[i].content +'</div>' +
                '</li>';
    }
    $('.total').html(comments.length);
    $('.evalList').html(html);

}

function formatDate(d){
    var date1 = new Date(d);
    var Year = date1.getFullYear();
    var Month = date1.getMonth();
    var Dates = date1.getDate();
    var Hours = date1.getHours();
    var Minutes = date1.getMinutes();
    var Seconds = date1.getSeconds();

    if(Minutes < 10){
        Minutes = "0" + Seconds;
    }

    if(Seconds < 10){
        Seconds = "0" + Seconds;
    }

    return Year + "年" + Month + "月" + Dates + "日" +
        Hours + ":" + Minutes + ":" + Seconds;
}
