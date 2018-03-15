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
    props: ['modals'],
    template: '<div class="row">'
        + '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3" v-for="modal in modals">'
        + '<a class="navbar-brand" data-toggle="modal" :data-target="\'#\'+modal.target">{{modal.name}}</a>'
        + '</div>'
        + '</div>'
});

Vue.component('win-toolbar', {
    props: ['modals'],
    template: '<div id="winToolBar">'
        + '<div class="navbar navbar-default navbar-fixed-bottom" role="navigation">'
        + '<div class="navbar-header">'
        + '<win-toolbar-button :modals="modals"></win-toolbar-button>'
        + '</div>'
        + '</div>'
        + '</div>'
});

Vue.component('win-toolbar', {
    props: ['modals'],
    template: '<div id="winToolBar">'
        + '<div class="navbar navbar-default navbar-fixed-bottom" role="navigation">'
        + '<div class="navbar-header">'
        + '<win-toolbar-button :modals="modals"></win-toolbar-button>'
        + '</div>'
        + '</div>'
        + '</div>'
});

Vue.component('modal-header', {
    props: ['modal'],
    template: '<div class="modal-header">'
        + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
        + '<h4 class="modal-title" :id="modal.target+\'_label\'">{{modal.title}}</h4>'
        + '</div>'
});

Vue.component('modal-footer', {
    template: '<div class="modal-footer">'
        + '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'
        + '</div>'
});

Vue.component('win-modal', {
    props: ['modals'],
    template: '<div><div v-for="modal in modals" ><div class="modal fade" :id="modal.target" tabindex="-1" role="dialog" :aria-labelledby="modal.target+\'_label\'" aria-hidden="true">'
    +'<div class="modal-dialog">'
        + '<div class="modal-content">'
        + '<modal-header :modal="modal"></modal-header>'
        //+ '<modal-body :modal="modal"></modal-body>'
        + '<modal-footer></modal-footer>'
        + '</div>'
        + '</div>'
        + '</div></div></div>'
});

new Vue({
    el: '#demo',
    data: {
        modals: [{
            name: '角色',
            target: 'modal_c',
            title: '角色modal',
            component: ''
        },
        {
            name: '背包',
            target: 'modal_b',
            title: '背包modal',
            component: ''
        },
        {
            name: '地图',
            target: 'modal_m',
            title: '地图modal',
            component: ''
        },
        {
            name: '技能',
            target: 'modal_s',
            title: '技能modal',
            component: ''
        }]

    }
});