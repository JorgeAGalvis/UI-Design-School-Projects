$(document).ready(function() {

    $('#search-form').submit(function(event) {
        var query = $.trim($(" #search-input").val())
        if (!query) {
            event.preventDefault()
            $( "#search-input" ).val("").focus()
        }
    })
    
})
 