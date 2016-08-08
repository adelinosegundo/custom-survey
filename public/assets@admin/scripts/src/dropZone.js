$(document).ready(function() {
    var answerDropZone = $("#new-answers-dropzone");

    if (answerDropZone.lenght > 0) {
        var newAnswersDropzone = new Dropzone("#new-answers-dropzone", {
            paramName: "answers",
            autoProcessQueue: false,
        });

        newAnswersDropzone.element.querySelector("button[type=submit]").addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            newAnswersDropzone.processQueue();
        });
    }
})