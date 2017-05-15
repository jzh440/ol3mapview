// dragzoom 构造函数
ol.interaction.DragZoom = function(opt_options) {
    var options = opt_options ? opt_options : {};
    // 触发拉框放大功能的情形
    // 此处为按下 shift 键，mac 是 cmd 键
    var condition = options.condition ? options.condition :  ol.events.condition.shiftKeyOnly;
    // 放大过程的时间
    this.duration_ = options.duration !== undefined ? options.duration : 200;
    // 是放大还是缩小，默认放大
    this.out_ = options.out !== undefined ? options.out : false;
    // 调用 dragbox 的构造函数，并将样式赋予 dragbox，如果没有指定，默认 `ol-dragzoom`
    ol.interaction.DragBox.call(this, {
        condition: condition,
        className: options.className || 'ol-dragzoom'
    });
};
// 继承 dragzoom
ol.inherits(ol.interaction.DragZoom, ol.interaction.DragBox);
ol.interaction.DragZoom.prototype.onBoxEnd = function() {
    // 获取 map 实例
    var view = /** @type {!ol.View} */ (this.getMap().getView());
    var size = /** @type {!ol.Size} */ (this.getMap().getSize());
    // 获取用户框定的坐标范围
    var extent = this.getGeometry().getExtent();
    // 设置为拉框缩小时应进行的处理
    if (this.out_) {
        var mapExtent = view.calculateExtent(size);
        var boxPixelExtent = ol.extent.createOrUpdateFromCoordinates([
            map.getPixelFromCoordinate(ol.extent.getBottomLeft(extent)),
            map.getPixelFromCoordinate(ol.extent.getTopRight(extent))]);
        var factor = view.getResolutionForExtent(boxPixelExtent, size);
        ol.extent.scaleFromCenter(mapExtent, 1 / factor);
        extent = mapExtent;
    }

    var resolution = view.constrainResolution(view.getResolutionForExtent(extent, size));
    var center = ol.extent.getCenter(extent);
    center = view.constrainCenter(center);
    // 设置缩放时动画效果
    view.animate({
        resolution: resolution,
        center: center,
        duration: this.duration_,
        easing: ol.easing.easeOut
    });

};

