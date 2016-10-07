/* 雷达图表组件对象 */
function H5ComponetRadar( name, cfg ){
    var component = new H5ComponetBase( name,cfg );

    //添加一个网格线画布
    var w = cfg.width;
    var h = cfg.height;

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = context.width = w;
    canvas.height = context.height = h;
    component.append(canvas);

    var r = w/2;
    context.lineWidth = 1;
    context.strokeStyle = '#000';

    /*
    * 计算多边形的顶点坐标
    * 已知：圆心坐标(a, b)、半径r
    * 角度：rad = 2*Math.PI/n*i
    * X = a + Math.sin(rad)*r
    * Y = b + Math.cos(rad)*r
    * */
    var n = cfg.data.length;
    var isBlue = false;
    function drawBg( per ){
        context.beginPath();
        for(var i = 0;i < n;i++){
            var rad = 2*Math.PI/n*i;
            var x = r + Math.sin(rad)*r*per;
            var y = h-(r + Math.cos(rad)*r*per);
            context.lineTo(x, y);
        }
        context.closePath();
        context.fillStyle = (isBlue = !isBlue) ? '#99c0ff' : '#f1f9ff';
        context.fill();
        context.stroke();
    }
    for(var i = 0;i < 9;i++){
        drawBg(1-i*0.1);
    }
    //绘制伞骨和项目名称
    context.beginPath();
    for(var i = 0;i < n;i++){
        var rad = 2*Math.PI/n*i;
        var x = r + Math.sin(rad)*r;
        var y = h-(r + Math.cos(rad)*r);
        context.moveTo(r, r);
        context.lineTo(x, y);
        var text = $('<div class="text">');
        text.text( cfg.data[i][0] );
        if(x < w/2){
            text.css('right', (w-x)/2);
        }else if(x > w/2){
            text.css('left', x/2);
        }else{
            text.css('left', x/2);
            text.css('transform', 'translateX(-50%)');
        }

        if(y < h/2){
            text.css('bottom', (h-y)/2);
        }else if(y > h/2){
            text.css('top', y/2);
        }else{
            text.css('top', y/2);
            text.css('transform', 'translateY(-50%)');
        }
        text.css('color', cfg.data[i][2]);
        text.css('transition', 'all 1s '+(1.5+0.1*i)+'s');
        component.append( text );
    }
    context.strokeStyle = '#e0e0e0';
    context.stroke();

    //数据层
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = context.width = w;
    canvas.height = context.height = h;
    component.append(canvas);

    context.strokeStyle = '#ff7676';
    context.fillStyle = '#ff7676';
    function draw( per ){
        context.clearRect(0,0,w,h);
        context.beginPath();
        for(var i = 0;i < n;i++){
            var rad = 2*Math.PI/n*i;
            var rate = cfg.data[i][1]*per;
            var x = r + Math.sin(rad)*r*rate;
            var y = h-(r + Math.cos(rad)*r*rate);
            context.lineTo(x, y);
        }
        context.closePath();
        context.stroke();
        for(var i = 0;i < n;i++){
            var rad = 2*Math.PI/n*i;
            var rate = cfg.data[i][1]*per;
            var x = r + Math.sin(rad)*r*rate;
            var y = h-(r + Math.cos(rad)*r*rate);
            context.beginPath();
            context.arc(x, y, 5, 0, 2*Math.PI);
            context.fill();
            context.closePath();
        }
        context.stroke();
    }

    component.on('onLoad',function(){
        var s = 0;
        for(var i = 0;i < 100;i++){
            setTimeout(function(){
                s += 0.01
                draw( s );
            },i*10+500);
        }
        $(this).find('.text').css('opacity', 1);
    });
    component.on('onLeave',function(){
        var s = 1;
        for(var i = 0;i < 100;i++){
            setTimeout(function(){
                s -= 0.01;
                draw( s );
            },i*10+500);
        }
        $(this).find('.text').css('opacity',0);
    });

    return component;
}