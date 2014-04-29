function blink(id, num, text) {
    $(id).animate({
        opacity: 0
    }, 200, "linear", function() {
        if (text != undefined) {
            $(id).html(text);
        }
        if (!$(id).hasClass('succ')) {
            $(id).addClass('succ');
        }
        $(this).animate({
            opacity: 1
        }, 200);
        if (--num > 0) {
            blink(id, num);
        }
    });
}

var socket = io.connect();
socket.on('connect', function() {
    socket.on('state', function(data) {
        handleState(JSON.parse(data));
    });
    socket.on('msg', function(data) {
        handleMsg(JSON.parse(data));
    });
    socket.on('credits', function(data) {
        handleCredits(JSON.parse(data));
    });
});


var stateMsg = 0;
var stateCredits = 0;

function handleState(data) {
    if (data.msg > stateMsg) {
        handleMsg(data.msg);
    }
    if (data.credits > stateCredits) {
        handleCredits(data.credits);
    }
}

function handleMsg(data) {
    stateMsg = data;

    blink('#topMsg', 1, '<i class="icon-envelope"></i> ' + data + ' Message' + (data == 1 ? '' : 's'));

    if ($('#mSound').length == 0) {
        var mSound = document.createElement('audio');
        mSound.setAttribute('id', 'mSound');
        mSound.setAttribute('src', '/s/msg.mp3');
        mSound.setAttribute('autoplay', 'autoplay');
        $('body').append(mSound);
    } else {
        $('#mSound').get(0).play();
    }
}

function handleCredits(data) {
    stateCredits = data;
    blink('#credits-str', 1, '<i class="icon-usd"></i> ' + data + ' Credit' + (data == 1 ? '' : 's'));

    if ($('#cSound').length == 0) {
        var cSound = document.createElement('audio');
        cSound.setAttribute('id', 'cSound');
        cSound.setAttribute('src', '/s/notice.mp3');
        cSound.setAttribute('autoplay', 'autoplay');
        $('body').append(cSound);
    } else {
        $('#cSound').get(0).play();
    }

}

$('#content').css('background-image', 'url(/s/img/bg-server-mc.png)');

var expireTime = 7184;
var expireNext = new Date().getTime();

function calcExpire() {
    expireTime--;
    if (expireTime < 0) {
        location.reload();
    } else {
        expireNext += 1000;
        setTimeout(calcExpire, expireNext - new Date().getTime());
    }
}
calcExpire();

function doSave() {
    if ($('#customJar').val() == 'minecraft.jar') {
        alert('The custom jar filename minecraft.jar is not valid. Please select another.');
        return false;
    } else {
        $('#confForm').submit();
        $('.saveBtn').prop('disabled', true);
        $('.saveLoading').show(0);
        return true;
    }
}

prevType = 0;
$('#serverType').focus(function() {
    prevType = $('#serverType').val();
});

$('#serverType').change(function() {
    if ($('#serverType').val() == 'Custom Jar') {
        alert('Custom jar files is a premium feature. Please upgrade to premium if you wish to use this feature.');
        $("#serverType").val(prevType).prop('selected', true);
    } else {
        $('#customJarDiv').hide(0);
        prevType = $('#serverType').val();
    }
});

function showStopped() {
    $('#btnForceStop').hide(0);


    $('#hStatus').removeClass('hwarn').removeClass('hsucc').addClass('herror');
    $('#state').html('<b>Stopped</b>');
    $('#btnStart').show(0);

    $('#statusTable tr:not(:first)').remove();
    $('#statusTable').append('<tr><td class="c" colspan="2">Server is offline</td></tr>');
}

function showError() {
    location.reload();
}

function showRunning(restart) {
    $('#btnForceStop').hide(0);


    $('#hStatus').removeClass('hwarn').removeClass('herror').addClass('hsucc');
    $('#state').html('<b>' + (restart ? 'Restarted' : 'Running') + '</b>');
    $('#btnRestart').show(0);
    $('#btnStop').show(0);

}

$('#hStatus button').click(function() {
    var action = $(this).attr('id');

    $('#hStatus button').hide();
    $('#hStatus').removeClass('hsucc').removeClass('herror').removeClass('hwarn').addClass('hwarn');
    $('#state').html('<img src="/s/img/loading.gif" />');

    $('#statusTable tr:not(:first)').remove();
    $('#statusTable').append('<tr><td colspan="2" class="c"><img src="/s/img/loading2.gif" /></td></tr>');

    if (action == 'btnStart') {
        $.post('/r/server/start/', {
            id: 222914
        }, function(data) {
            if (data[0] === true) {
                showRunning(false);
            } else {
                if (data[1] != null) {
                    alert(data[1]);
                }
                showError();
            }
        }, 'json');
    } else if (action == 'btnStop') {
        $('#btnForceStop').show(0);
        $.post('/r/server/stop/', {
            id: 222914
        }, function(data) {
            if (data[0] === true) {
                showStopped();
            } else {
                showError();
            }
        }, 'json');
    } else if
    
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-9450210-1']);
_gaq.push(['_trackPageview']);
(function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();



