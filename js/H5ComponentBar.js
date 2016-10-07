/* 柱图表组件对象 */
function H5ComponetBar( name, cfg ){
    var component = new H5ComponetBase( name, cfg );

    $.each(cfg.data, function(index, item){
        var line = $('<div class="line">');
        var name = $('<div class="name">');
        var rate = $('<div class="rate">');
        var per = $('<div class="per">');

        var bgStyle = '';
        if( item[2] ){
            bgStyle = 'style="background-color: '+item[2]+';"';
        }

        name.text( item[0] );
        rate.width( item[1]*100+'%' );
        rate.html('<div class="bg" '+bgStyle+'></div>');
        per.text( item[1]*100+'%' );

        line.append( name ).append( rate ).append( per );

        component.append( line );
    });

    return component;
}