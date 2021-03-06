﻿var signalingChannel = new SignalingChannel();
var configuration = {
    'iceServers': [{
        'url': 'stun:stun.example.org'
    }]
};
var pc;

// call start() to initiate

function start() {
    pc = new RTCPeerConnection(configuration);

    // send any ice candidates to the other peer
    pc.onicecandidate = function (evt) {
        if (evt.candidate)
            signalingChannel.send(JSON.stringify({
                'candidate': evt.candidate
            }));
    };

    // let the 'negotiationneeded' event trigger offer generation
    pc.onnegotiationneeded = function () {
        pc.createOffer(localDescCreated, logError);
    }

    // once remote stream arrives, show it in the remote video element
    pc.onaddstream = function (evt) {
        remoteView.src = URL.createObjectURL(evt.stream);
    };

    // get a local stream, show it in a self-view and add it to be sent
    navigator.getUserMedia({
        'audio': true,
        'video': true
    }, function (stream) {
        selfView.src = URL.createObjectURL(stream);
        pc.addStream(stream);
    }, logError);
}

function localDescCreated(desc) {
    pc.setLocalDescription(desc, function () {
        signalingChannel.send(JSON.stringify({
            'sdp': pc.localDescription
        }));
    }, logError);
}

signalingChannel.onmessage = function (evt) {
    if (!pc)
        start();

    var message = JSON.parse(evt.data);
    if (message.sdp)
        pc.setRemoteDescription(new RTCSessionDescription(message.sdp), function () {
            // if we received an offer, we need to answer
            if (pc.remoteDescription.type == 'offer')
                pc.createAnswer(localDescCreated, logError);
        }, logError);
    else
        pc.addIceCandidate(new RTCIceCandidate(message.candidate));
};

function logError(error) {
    log(error.name + ': ' + error.message);
}