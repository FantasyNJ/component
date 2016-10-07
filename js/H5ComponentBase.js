function H5ComponetBase( name, cfg ){
    var cfg = cfg || {};
    var id = ('h5_c_' + Math.random()).replace('.', '_');
    var cls = ' h5_component_' + cfg.type;
    var component = $('<div class="h5_component h5_component_name_' + name+ cls +'" id="'+ id +'">');
    cfg.text && component.html( cfg.text );
    cfg.width && component.width( cfg.width/2 );
    cfg.height && component.height( cfg.height/2 );

    cfg.bg && component.css( 'background-image', 'url('+cfg.bg+')' );

    if(cfg.center === true){
        component.css({
            left : '50%',
            marginLeft : -(cfg.width/4)+'px',
        });
    }

    cfg.css && component.css( cfg.css );

    //自定义参数
    if(typeof cfg.onclick === 'function'){
        var _this = this;
        component.on('click',cfg.onclick);
    }

    component.on('onLoad', function(){
        setTimeout(function(){
            component.addClass(cls + '_onload').removeClass(cls + '_onleave');
            cfg.animateIn && component.animate( cfg.animateIn );
        },cfg.delay || 0);
    });
    component.on('onLeave', function(){
        $(this).addClass(cls + '_onleave').removeClass(cls + '_onload');
        cfg.animateOut && $(this).animate( cfg.animateOut );
    });

    return component;
}