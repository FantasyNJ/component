function H5Loading( images, page ){
    var id = this.id;

    if( this._image === undefined ){
        window[id] = this;
        this._image = (images || []).length;
        this._loaded = 0;

        for(var i = 0;i < this._image;i++){
            var item = images[i];
            var img = new Image;
            img.onload = function(){
                window[id].loader();
            }
            img.src = item;
        }
        return this;
    }else{
        this._loaded++;
        $('#rate').text( ((this._loaded/this._image *100) >> 0) + '%' );
        if(this._loaded < this._image){
            return this;
        }
    }

    $('#loading').remove();
    window[id].elem.css('opacity', 1);
    window[id] = null;

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
    this.loader();
}