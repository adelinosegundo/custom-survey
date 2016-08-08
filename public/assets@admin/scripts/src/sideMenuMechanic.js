sideMenuMechanic = function() {
    var openedMenu = $('a[href="' + location.href + '"]');
    var anchors = $('#side-menu li.active').removeClass('active');

    if (openedMenu.length <= 0) {
        try {
            openedMenu = $('a[href="' + location.pathname + '"]');
            // openedMenu = $('a[href="' + /http:\/\/([a-zA-Z0-9:.]+)\/([a-zA-Z_]+)/g.exec(location.href)[0] + '"]');
        } catch(err) {
            console.log('[ERROR] At: engineSideMenu, err: ' + err);
        }
    }

    openedMenu.parents('li').each(function(index){
        $(this).find('ul').first().addClass('in').attr('aria-expanded', 'true');
        $(this).addClass('active');
    });
}

$(document).ready(function() {
    sideMenuMechanic();
})
