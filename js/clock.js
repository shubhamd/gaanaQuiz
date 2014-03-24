var d = new Date(),
    s = d.getSeconds(),
    m = d.getMinutes(),
    h = d.getHours();

$('.h').data('targetValue', h);
$('.m').data('targetValue', m);
$('.s').data('targetValue', s);
//basic setup
$('.knob').knob({
    value: 0,
        'readOnly': true,
        'width': 120,
        'height': 120,
        'dynamicDraw': true,
        'thickness': 0.2,
        'tickColorizeValues': true,
        'fgColor':'red',
        'inputColor':'red'
});
$.when(
    $('.knob').each(function(){
        $(this).animate({
    value: parseInt($(this).data('targetValue'))
}, {
    duration: 1000,
    easing: 'swing',
    progress: function () {
        $(this).val(Math.round(this.value)).trigger('change')
    }
});
})).then(function () {
    myDelay();
});

function myDelay() {
    var d = new Date(),
        s = d.getSeconds(),
        m = d.getMinutes(),
        h = d.getHours();
    $('.h').val(h).trigger("change");
    $('.m').val(m).trigger("change");
    $('.s').val(s).trigger("change");
    setTimeout(myDelay, 1000)
}