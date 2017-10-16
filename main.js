//gloabal vars
var endPoint, input;
var streamers = ['madeupundeinedchannelfortesting', 'freecodecamp', 'swifty', 'hardcorecasualgamers', 'heather1337', 'drdisrespectlive', 'bajheera', 'shadder2k', 'vaporadark', 'esl_sc2', 'grimmmz'];
var channelData = [];
var streamData = [];
// Init WOW.js and get instance
var wow = new WOW();
wow.init();
// Helper function for add element box list in WOW
WOW.prototype.addBox = function (element) {
    this.boxes.push(element);
};
function loadData() {
    for (var i = 0; i < streamers.length; i++) {
        (function (i) { // protects i in an immediately called function
            endPoint = "https://wind-bow.gomix.me/twitch-api/";
            endPoint += "channels/" + streamers[i] + "?callback=?";
            $.getJSON(endPoint, function (channelJson) {
                (function (i) { // protects i in an immediately called function
                    if (!channelJson.error) {
                        endPoint = "https://wind-bow.gomix.me/twitch-api/";
                        endPoint += "streams/" + streamers[i] + "?callback=?";
                        var html = "";
                        $.getJSON(endPoint, function (streamJson) {
                            streamData.push(streamJson);
                            if (streamJson.stream != null) {
                                channelData.push(channelJson);
                                html += "<div class='card text-center wow flipInX m-3' data-wow-delay='.03s' style='width: 20rem;'>";
                                html += "<div id= '" + toLower(channelJson.display_name) + "' class='card-header'>";
                                html += channelJson.display_name;
                                html += " </div>";
                                html += "<img class='card-img-top' src='" + channelJson.profile_banner + "' alt='streamer banner'>";
                                html += '<div class="card-body">';
                                html += '<p class="card-text">' + channelJson.status + '</p>';
                                html += '<h4 class="card-title text-muted">' + channelJson.game + '</h4>';
                                html += '<a href="' + channelJson.url + '"class="btn btn-success">Online</a>';
                                html += '</div>';
                                html += '</div>';
                                $('#streams').append(html);
                            } else {
                                channelData.push(channelJson);
                                html += "<div class='card text-center wow flipInX m-3' data-wow-delay='.03s' style='width: 20rem;'>";
                                html += "<div id= '" + toLower(channelJson.display_name) + "'class='card-header'>";
                                html += channelJson.display_name;
                                html += " </div>";
                                html += "<img class='card-img-top' src='" + channelJson.profile_banner + "' alt='streamer banner'>";
                                html += '<div class="card-body">';
                                html += '<a href="' + channelJson.url + '"class="btn btn-danger">Offline</a>';
                                html += '</div>';
                                html += '</div>';
                                $('#streams').append(html);
                            }
                            // Attach scrollSpy to .wow elements for detect view exit events,
                            // then reset elements and add again for animation
                            $('.wow').on('scrollSpy:exit', function () {
                                $(this).css({
                                    'visibility': 'hidden',
                                    'animation-name': 'none'
                                }).removeClass('animated');
                                wow.addBox(this);
                            }).scrollSpy();
                        });
                    };
                })(i);
            });
        })(i);
    };
}
$(document).ready(function () {
    //get data
    loadData();
    $('#searchChannelButton').on('click', function () {
        input = $('#inputField').val();
        location.href = "#" + toLower(input);
    });
    $('#addChannelButton').on('click', function () {
        input = $('#inputField').val();
        streamers.push(toLower(input));
        $('#streams').html("");
        loadData();
    });
    $('#deleteChannelButton').on('click', function () {
        input = $('#inputField').val();
        streamers.splice($.inArray(toLower(input), streamers), 1);
        $('#streams').html("");
        loadData();
    });
});
function toLower(string) {
    return string.toLowerCase();
}