/* 饼图表组件对象 */
function H5ComponetPie( name, cfg ){
    var component = new H5ComponetBase( name, cfg );

    //添加一个网格线画布
    var w = cfg.width;
    var h = cfg.height;
    var r = w/2;
    //加入一个底图层
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.style.zIndex = 1;
    canvas.width = context.width = w;
    canvas.height = context.height = h;
    component.append(canvas);

    context.beginPath();
    context.lineWidth = 1;
    context.fillStyle = '#eee';
    context.strokeStyle = '#eee';
    context.arc(r,r,r,0,2*Math.PI);
    context.fill();
    context.stroke();
    //加入数据图层
    var canvas = document.createElement('canvas');
    canvas.style.zIndex = 2;
    var context = canvas.getContext('2d');
    canvas.width = context.width = w;
    canvas.height = context.height = h;
    component.append(canvas);

    var n = cfg.data.length;
    var sAngel = 1.5*Math.PI;

    for(var i = 0;i < n;i++){
        var item = cfg.data[i];
        context.beginPath();
        context.lineWidth = .1;
        context.fillStyle = context.strokeStyle = item[2];
        var tAngel = 2*Math.PI*item[1];
        var eAngel = sAngel + tAngel;
        context.moveTo(r, r);
        context.arc(r,r,r,sAngel,eAngel);
        context.fill();
        context.stroke();
        //加入所有的项目文本
        var text = $('<div class="text">');
        text.text( cfg.data[i][0] );
        var per = $('<div class="per">');
        per.text( cfg.data[i][1]*100+'%' );

        //var x = r + Math.sin( .5*Math.PI - sAngel ) * r;
        //var y = r + Math.cos( .5*Math.PI - sAngel ) * r;
        var x = r + Math.sin( .5*Math.PI - (sAngel + tAngel/2) ) * r;
        var y = r + Math.cos( .5*Math.PI - (sAngel + tAngel/2) ) * r;

        if(x < w/2){
            text.css('right', (w-x)/2);
        }else{
            text.css('left', x/2);
        }

        if(y < h/2){
            text.css('bottom', (h-y)/2);
        }else{
            text.css('top', y/2);
        }
        text.css('opacity', 0);
        text.append( per );
        component.append( text );

        sAngel = eAngel;
    }


    //加入一个蒙板层
    var canvas = document.createElement('canvas');
    canvas.style.zIndex = 3;
    var context = canvas.getContext('2d');
    canvas.width = context.width = w;
    canvas.height = context.height = h;
    component.append(canvas);

    sAngel = 1.5*Math.PI;

    var _this = this;

    function draw(per){
        context.clearRect(0,0,w,h);
        context.lineWidth = 1;
        context.beginPath();
        context.fillStyle = context.strokeStyle = '#eee';
        context.moveTo(r,r);
        if(per <= 0){
            context.arc(r,r,r,sAngel, sAngel+2*Math.PI);
            component.find('.text').css('opacity', 0);
        }else{
            context.arc(r,r,r,sAngel, sAngel+2*Math.PI*per,true);
        }
        context.fill();
        context.stroke();
        if(per >= 1){
            //错位重排,放在元素动画渲染之后,元素显示之前
            //_this.resort( component.find('.text') );
            component.find('.text').css('opacity', 1);
        }
    }
    draw(0);

    component.on('onLoad',function(){
        var s = 0;
        for(var i = 0;i < 100;i++){
            setTimeout(function(){
                s += 0.01
                draw( s );
            },i*10+500);
        }
    });
    component.on('onLeave',function(){
        var s = 1;
        for(var i = 0;i < 100;i++){
            setTimeout(function(){
                s -= 0.01;
                draw( s );
            },i*10+500);
        }
    });

    return component;
}

//H5ComponetPie.prototype.resort = function( list ){
//
//    /*
//     * 碰撞检测函数
//     * mObj 移动的元素
//     * */
//    function pz( domA, domB ){
//        var m = $(domA);
//        var s = $(domB);
//        var l1 = m.offset().left;
//        var r1 = m.offset().left + m.width();
//        var t1 = m.offset().top;
//        var b1 = m.offset().top + m.height();
//
//        var l2 = s.offset().left;
//        var r2 = s.offset().left + s.width();
//        var t2 = s.offset().top;
//        var b2 = s.offset().top + s.height();
//
//        if(r1 > l2 && l1 < r2 && b1 > t2 && t1 < b2){
//            return true;
//        }else{
//            return false;
//        }
//    }
//
//    function reset( domA, domB ){
//        if($(domA).css('top') !== 'auto'){
//            $(domA).css('top', parseInt($(domA).css('top'))+$(domB).height());
//        }
//        if($(domA).css('bottom') !== 'auto'){
//            $(domA).css('bottom', parseInt($(domA).css('bottom'))+$(domB).height());
//        }
//    }
//    console.log($(list))
//     var willResult = [];
//     $(list).each(function(index, item){
//         var target = item;
//         var i = index;
//         $(list).each(function(index, item){
//             if(index !== i && pz( target, item ) ){
//                 if(willResult.indexOf(target) === -1){
//                     willResult.push(target);
//                 }
//             }
//         })
//     })
//     //willResult.each(function(index, item){
//     //    var domA = item;
//     //    willResult.each(function(index, item){
//     //        reset( domA, domB )
//     //    })
//     //})
//    console.log(willResult)
//    for(var i = 0;i < willResult.length;i++){
//        var domA = willResult[i];
//        if(i !== willResult.length-2){
//            var domB =willResult[i+1];
//        }else {
//            break;
//        }
//        reset(domA, domB);
//    }
//}
