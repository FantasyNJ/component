/* 雷达图表组件对象 */
function H5ComponetPolyline( name, cfg ){
    var component = new H5ComponetBase( name,cfg );

    //添加一个网格线画布
    var w = cfg.width;
    var h = cfg.height;

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    canvas.width = context.width = w;
    canvas.height = context.height = h;

    component.append(canvas);
    //绘制网格线
    var step = 10;
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = '#000';
    window.context = context;
    for(var i = 0;i < step + 1;i++){
        var y = (h/step)*i;
        context.moveTo( 0, y );
        context.lineTo( w, y );
    }

    var step = cfg.data.length + 1;
    for(var i = 0;i <= step;i++){
        var x = (w/step)*i;
        context.moveTo( x, 0 );
        context.lineTo( x, h );
    }
    context.stroke();

    //绘制折线数据画布
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    //绘制折线
    function draw( per ){
        context.clearRect(0,0,w,h);
        canvas.width = context.width = w;
        canvas.height = context.height = h;
        component.append(canvas);

        //绘制折线数据
        context.beginPath();
        context.lineWidth = 3;
        context.strokeStyle = '#ff8878';
        //画点
        var step = cfg.data.length;
        for(i = 0;i < step;i++){
            var item = cfg.data[i];
            var x = (w/(step+1))*(i+1);
            var y = h*((1-item[1]*per));
            context.moveTo(x,y);
            context.arc(x,y,5,0,2*Math.PI);
        }
        //连线
        context.moveTo( w/(step+1), h*(1-cfg.data[0][1]*per));
        for(i = 0;i < step;i++){
            var item = cfg.data[i];
            var x = (w/(step+1))*(i+1);
            var y = h*((1-item[1]*per));
            context.lineTo(x,y);
        }
        //写数据
        for(i = 0;i < step;i++){
            var item = cfg.data[i];
            var x = (w/(step+1))*(i+1);
            var y = h*((1-item[1]*per));
            context.fillStyle = item[2] ? item[2] : '#595959';
            context.font = '28px Arial';
            context.fillText(((item[1]*100)>>0)+'%',x-10,y-10);
        }

        context.stroke();
        context.lineWidth = 0;
        context.lineTo(x, h);
        context.lineTo(w/(step+1), h);
        context.fillStyle = 'rgba(255, 136, 120, .2)';
        context.fill();
    }
    draw(0);

    //添加项目名称
    var len = cfg.data.length;
    for(var i = 0;i < len;i++){
        var item = cfg.data[i];
        var txt = $('<div class="text">');
        var tWidth = w/2/(len+1);
        txt.css({
            width : tWidth,
            left : tWidth*i+tWidth/2,
        });
        txt.text(item[0]);
        component.append(txt);
    }

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