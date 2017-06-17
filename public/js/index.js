/**
 * Created by Administrator on 2017/4/4.
 */

$(function(){
    var $login = $('.submit');
    var $register  = $('.register');
    var $success = $('.success');
    var $cancel = $('#cancel');
    //切换到注册面板
    $login.find("a").on('click',function(){
        $register.show();
        $login.hide();
    })

    //切换到登录面板
    $register.find("a").on('click',function(){
        $login.show();
        $register.hide();
    })

    //注册
    $('.registerBox').on('click', function(){

        $.ajax({
            type:"POST",
            url:"/api/user/register",
            data:{
                username: $register.find('input[name=username]').val(),
                password: $register.find('input[name=password]').val(),
                rePassword: $register.find('input[name=rePassword]').val()
            },
            dataType:"json",
            success:function(result){
                console.log(result);
                $('.registerMsg').html(result.message);
                if(!result.code){

                    setTimeout(function(){
                        $login.show();
                        $register.hide();
                    },1000)
                }
            }
        })

    })

    //登录
    $('.loginBox').on('click', function(){
        $.ajax({
            type:"POST",
            url:"/api/user/login",
            data:{
                username: $login.find('input[name=username]').val(),
                password: $login.find('input[name=password]').val()
            },
            dataType:"json",
            success:function(result){
                console.log(result);
                $('.loginMsg').html(result.message);
                if(result.code == 0) {
                    setTimeout(function(){
                        $('.loginMsg').html('');
                        window.location.reload();
                    },1000);

                }


            }
        })
    });

    //退出
    $cancel.click(function(){
        $.ajax({
            url: '/api/user/logout',
            success:function(result){
                if(!result.code){
                    window.location.reload();
                }
            }
        })
    });

});