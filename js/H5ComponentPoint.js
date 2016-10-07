/* 散点图表组件对象 */
function H5ComponetPoint( name, cfg ){
    var component = new H5ComponetBase( name,cfg );

    var base = cfg.data[0][1];  //以第一个数据的比例大小为100%
    $.each( cfg.data,function( index,item ){
        var point = $('<div class="point point_'+index+'"></div>');

        var name = $('<div class="name">'+item[0]+'</div>');
        var rate = $('<div class="rate">'+(item[1]*100)+'%</div>')
        name.append(rate);
        point.append(name);

        if( item[2] ){
            point.css('background-color', item[2]);
        }
        var per = item[1]/base;
        point.width( 100*per+'%' ).height( 100*per+'%' );

        if(item[3] !== undefined && item[4] !== undefined){
            point.css({
                left : item[3],
                top : item[4]
            });
        }
        component.append(point);
    } );

    return component;
}