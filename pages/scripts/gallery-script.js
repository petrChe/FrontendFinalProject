var videos = [];
var videoElements = document.querySelectorAll("video[class=galleryVideo]");
var videoDirection = "../pages/media/forLoading";
var fileExtension = ".mp4";
var count = 0;

function formVideosList() {
    videoElements.forEach(element =>
    {
        var src = element.src;
        var status = "none";

        if(element.paused)
        {
            status = "stopped";
        }
        else {
            status = "playing";
        }

        element.setAttribute("name", count);

        var video = { id: count, name: src, status: status};
        videos.push(video);
        count++;
    });
};

function setVideoEvents() {
    videoElements.forEach(element =>
    {
        element.addEventListener("play", function(event) {
            event.preventDefault();

            var elementVideoId = element.getAttribute("name");

            var playingVideosIds = videos.filter(element => element.status == "playing");

            playingVideosIds.forEach(video => {
                video.status = "stopped";
                var videoElement = document.getElementsByName(video.id)[0];
                videoElement.pause();
                videoElement.currentTime = 0;
            });

            var currentVideo = videos.filter(element => element.id == elementVideoId)[0];
            currentVideo.status = "playing";        
        });
    });
};

var addVideoButton =  document.getElementsByClassName("addNewVideoButton")[0];
addVideoButton.addEventListener("click", function(){
    $.ajax({
        url:videoDirection,
        success: function (folderData) {
            $(folderData).find("a:contains(" + fileExtension + ")").each(function () {
                var filename = this.href.replace(window.location.host, "").replace("http://", "");
                var videoList = document.getElementsByClassName("video-list")[0];
                var newLiElement = document.createElement("li");
                var newVideoElement = document.createElement("video");
                newVideoElement.setAttribute("width", "220");
                newVideoElement.setAttribute("height", "180");
                newVideoElement.controls = true;
                newVideoElement.preload = "auto";

                var videoSourceElement = document.createElement("source");
                videoSourceElement.src = videoDirection + filename;

                newVideoElement.appendChild(videoSourceElement);
                newLiElement.appendChild(newVideoElement);
                videoList.appendChild(newLiElement);
            });
        }
    });
});

formVideosList();
setVideoEvents();