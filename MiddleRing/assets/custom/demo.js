//alert('success');

Vue.component('win-title', {
    template: '<nav class="navbar navbar-default navbar-fixed-top" role="navigation">'
        + '<div class="container-fluid">'
        + '<div class="navbar-header">'
        + '<a class="navbar-brand" href="#">MiddleRing demo</a>'
        + '</div>'
        + '</div>'
        + '</nav>'
});

Vue.component('win-stage', {
    template: '<div style="height:1000px"></div>'
});

Vue.component('win-toolbar-button', {
    props: ['buttons'],
    template: '<div class="row">'
        + '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3" v-for="button in buttons">'
        + '<a class="navbar-brand" data-toggle="modal" :data-target="button.target">{{button.name}}</a>'
        + '</div>'
        + '</div>'
});

Vue.component('win-toolbar', {
    props: ['buttons'],
    template: '<div id="winToolBar">'
        + '<div class="navbar navbar-default navbar-fixed-bottom" role="navigation">'
        + '<div class="navbar-header">'
        + '<win-toolbar-button :buttons="buttons"></win-toolbar-button>'
        + '</div>'
        + '</div>'
        + '</div>'
});

new Vue({
    el: '#demo',
    data: {
        buttons: [{
            name: '角色',
            target: '#modal_c'
        },
        {
            name: '背包',
            target: '#modal_b'
        },
        {
            name: '地图',
            target: '#modal_m'
        },
        {
            name: '技能',
            target: '#modal_s'
        }]

    }
});