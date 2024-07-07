// YouTube video: https://youtu.be/sme9M6QEel8

$(document).ready( function() {
    let dropped = false; 

    $( "#draggable" ).draggable({ revert: "invalid" }); //only drop in dropplable
    $( "#droppable" ).droppable({
    drop: function( event, ui ) {
        if(!dropped) {
            $( this )
            .removeClass( "hover-color ")
            .addClass( "ui-state-highlight" )
            .find( "p" )
            .html( "Dropped!" );
            dropped = true; 
        }

    },
    // when hovered in  
    over: function( event, ui ) {
        if(!dropped) {
            $( this )
            .addClass( "hover-color" )
        }
    }, 
    // when leaving hovering area
    out: function( event, ui ) {
        if(!dropped) {
            $( this )
            .removeClass( "hover-color" )
        }
    }
    });
} );


