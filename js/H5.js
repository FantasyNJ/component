/* 内容管理对象 */
function H5(){
    this.id = ('h5_'+Math.random()).replace('.', '_');
    this.elem = $('<div id="'+this.id+'" class="h5"></div>');
    this.page = [];
    $('body').append(this.elem);

    this.loader = function( page ){
        this.elem.fullpage({
            sectionsColor : ['purple', 'yellow', 'blue', 'pink'],
            onLeave : function( index, nextIndex, direction ){
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad : function( anchorLink, index, direction ){
                $(this).find('.h5_component').trigger('onLoad');
            }
        });
        this.page[0].find('.h5_component').trigger('onLoad');
        //$('.h5_component').on('onLeave', function(){
        //    $(this).animateOut();
        //});
        //$('.h5_component').on('onLoad', function(){
        //    $(this).animateIn();
        //});

        if(page){
            $.fn.fullpage.moveTo( page );
        }

        return this;
    }
    if(typeof H5Loading === 'function'){
        this.elem.css('opacity', 0);
        this.loader = H5Loading;
    }

    //return this;    //使用new方式创建，可以不写
}

H5.prototype.addPage = function(name, text){
    var page = $('<div class="h5_page section"></div>');

    if( name !== undefined ){
        page.addClass( 'h5_page_'+name );
    }
    if( text !== undefined ){
        page.text( text );
    }
    this.elem.append(page);
    this.page.push(page);
    //添加完page之后才能添加组件
    if(typeof this.whenAddPage === 'function'){
        this.whenAddPage();
    }

    return this;
}
H5.prototype.addComponent = function( name, cfg ){
    var cfg = cfg || {};
    var page = this.page.slice(-1)[0];
    cfg = $.extend({
        type : 'base'
    },cfg);
    var component = null;
    switch ( cfg.type ){
        case 'base' :
            component = new H5ComponetBase( name,cfg );
            break;
        case 'bar' :
            component = new H5ComponetBar( name,cfg );
            break;
        case 'pie' :
            component = new H5ComponetPie( name,cfg );
            break;
        case 'point' :
            component = new H5ComponetPoint( name,cfg );
            break;
        case 'polyline' :
            component = new H5ComponetPolyline( name,cfg );
            break;
        case 'radar' :
            component = new H5ComponetRadar( name,cfg );
            break;
        default :
            break;
    }
    page.append(component);

    return this;
}

