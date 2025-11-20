import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client"
import { TextField, Button } from "@mui/material";
// backend server = socket server
const server_url = "http://localhost:8080";

let connection = {}

const peerConfigConnection = {
    "iceServer": [
        { "urls": "stun.altar.com.pl:3478" }
    ]
}

export default function VideoMeet() {

    let socketRef = useRef()

    let socketIdRef = useRef()

    let localVideoRef = useRef()

    let [videoAvailable, setVideoAvailable] = useState(true)

    let [audioAvailable, setAudioAvailable] = useState(true)

    // video on off option ke liye
    let [video, setVideo] = useState([])

    // audio on off option ke liye
    let [audio, setAudio] = useState()

    // screen on off option ke liye
    let [screen, setScreen] = useState()

    //pop ya notification ke liye
    let [showModel, setShowModel] = useState()

    // screen shere available hai ya nhi
    let [screenAvailable, setScreenAvailable] = useState()

    // sare messages ko handle karne ke liye 
    let [messages, setMessages] = useState([])

    // message ham khud likhenge 
    let [message, setMessage] = useState("")

    // ye message notification ke liye hai
    let [newMessage, setNewMessage] = useState(0)

    // jab v koi guest id se app use krega to  username puchne ke liye
    let [askForUsername, setAskForUsername] = useState(true)

    // ye user name ham likhenge
    let [username, setUsername] = useState("")

    //
    let videoRef = useRef([])

    // video list
    let [videos, setVideos] = useState([])


    // if (isChrome === false) {

    // }

    const getPermissions = async () => {
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true })

            if (videoPermission) {
                setVideoAvailable(true)
            } else {
                setVideoAvailable(false)
            }

            const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true })

            if (audioPermission) {
                setAudioAvailable(true)
            } else {
                setAudioAvailable(false)
            }

            if (navigator.mediaDevices.getDisplayMedia) {
                setScreenAvailable(true)
            } else {
                setScreenAvailable(false)
            }

            if (videoPermission || audioPermission) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable })

                if (userMediaStream) {
                    window.localStream = userMediaStream;
                    // UI = localVideo
                    if (localVideoRef.current) {
                        localVideoRef.current.srcObject = userMediaStream;
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getPermissions()
    }, [])

    let getUserMediaSuccess = (stream) => {

    }


    // mute unmute and video off and video on 
    let getUserMedia = () => {

        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(getUserMediaSuccess)
                .then((stream) => { })
                .catch((err) => console.log(err))
        } else {
            try {
                let tracks = localVideoRef.current.srcObject.getTracks()
                tracks.forEach(track => track.stop());
            } catch (err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia();
        }
    }, [audio, video])

    let gotMessageFromServer = (fromId, message) => {

    }

    let addMessage = () => {

    }
    let connectToSocketServer = () => {
        socketRef.current = io.connect(server_url, { secure: false })

        socketRef.current.on('signal', gotMessageFromServer)

        socketRef.current.on("connect", () => {

            socketRef.current.emit("join-call", window.location.href)

            socketRef.current = socketRef.current.id

            socketRef.current.on("chat-message", addMessage)

            socketRef.current.on("user-left", (id) => {
                setVideo((videos) => videos.filter((video) => video.socketId !== id))
            })

            socketRef.current.on("user-joind", (id, clients) => {
                clients.forEach((socketListId) => {
                    connections[socketListId] = new RTCPeerConnection(peerConfigConnection)
                })
            })
        })
    }

    let getMedia = () => {
        setVideo(videoAvailable)
        setAudio(audioAvailable)
        // connectToSocketServer();
    }

    let connect = () => {
        setAskForUsername(false)
        getMedia()
    }
    return (
        <>
            {askForUsername === true ?
                <div>

                    <h1>Enter into in Lobby</h1>
                    <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        name='username'
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <Button variant="contained" onClick={connect}>Connect</Button>

                    <div>
                        <video ref={localVideoRef} autoPlay muted></video>
                    </div>
                </div> : <div>


                </div>}
        </>

    )
}
