/**
 * Created by Honzik on 6.3.2016.
 */
Loader=function(){
    this.counter=0;
    this.options={
        loaderId:"my-custom-loader",
        src:"./spinner.gif",
        opacity:0.5,
        backgroundColor:"#000000",
        zIndex:99
    };
};

Loader.prototype.init=function(options){
    this.mergeRecursive(this.options,options);
    this.template='' +
    '<div class="loader-center" id="'+this.options.loaderId+'"> ' +
    '<img src="'+this.options.src+'">' +
    '</div>';
    this.loaderDom=jQuery.parseHTML(this.template);
    jQuery(this.loaderDom).css('background-color',this.options.backgroundColor);
    jQuery(this.loaderDom).css('opacity',this.options.opacity);
    jQuery(this.loaderDom).css('z-index',this.options.zIndex);
    jQuery("body").append(this.loaderDom);
    this.hide();
    return this;
};

Loader.prototype.addRequest=function(){
    this.counter++;
    this.watchCounter();
};

Loader.prototype.removeRequest= function () {
    this.counter--;
    this.watchCounter();
};

Loader.prototype.watchCounter=function(){
    if(this.counter<=0){
        this.counter=0;
        this.hide();
    }else{
        this.show();
    }
};

Loader.prototype.show=function(){
    jQuery("#"+this.options.loaderId).removeClass('loader-hidden');
};

Loader.prototype.hide= function () {
    jQuery("#"+this.options.loaderId).addClass('loader-hidden');
};

Loader.prototype.mergeRecursive = function(target, source) {
    if (typeof target !== 'object') {
        target = {};
    }
    for (var property in source) {
        if (source.hasOwnProperty(property)) {
            var sourceProperty = source[property];
            if (typeof sourceProperty === 'object') {
                target[property] = this.mergeRecursive(target[property], sourceProperty);
                continue;
            }
            target[property] = sourceProperty;
        }
    }
    for (var a = 2, l = arguments.length; a < l; a++) {
        this.mergeRecursive(target, arguments[a]);
    }
    return target;
}