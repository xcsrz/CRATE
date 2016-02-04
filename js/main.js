// #1 initialize
// #A initialize model
var m = new Model();
// #B initialize view
var vv = new VersionView(m.version, $("#version"), $("#homeIcon"));
var vd = new Documents($("#documents"),$("#menu-center-header"));
var vf = new Features(m.features, $("#features"));
var vad = new RoundButton($("#menu-right-header"),
                          "<i class='fa fa-plus'></i>",
                          "add a document");
var vmad = new ModalAddDocument($("body"));
var vgb = new RoundButton($("#menu-right-header"),
                          "<i class='fa fa-github'></li>",
                          "contribute on Github");
// #C initialize controllers
var cad = new AddDocument(vad, vmad, vd);
var cg = new Github(vgb);

// #2 get stun servers
$.ajax({
    type: "POST",
    url: "https://api.xirsys.com/getIceServers",
    data: {
        ident: "chatwane",
        secret: "8105d907-564a-4213-8c91-21b0a2f7344b",
        domain: "www.crate.com",
        application: "crate",
        room: "default",
        secure: 1
    },
    success: function (addresses, status) {
        // data.d is where the iceServers object lives
        console.log(addresses);
        var connectionOptions = (addresses && JSON.parse(addresses.d)) ||
            {iceServers: [ {
                url: 'stun:23.21.150.121', // default google ones if xirsys not
                urls: 'stun:23.21.150.121' } ] }; // responding
        initialize(connectionOptions);
    },
    async: true
});

function initialize(connectionOptions){
    cad.connectionOptions = connectionOptions;
    // #A check the url if the editor must create documents already
    if ((document.URL.split("?")).length>1){
        var editingSessions = (document.URL.split('?')[1]).split('&');
        for (var i = 0; i<editingSessions.length; ++i){
            cad.justDoIt({server:  'https://ancient-shelf-9067.herokuapp.com',
                          session: editingSessions[i],
                          connect: true});
        };
    };
};

$(function(){ $('[data-toggle="popover"]').popover() });
