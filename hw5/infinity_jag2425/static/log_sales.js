// Video link: https://youtu.be/3PfT0-lJYds

// Default sales agent 
const salesAgent = "Jorge"

/**
 * Display sales 
 * @param {Array} sales - An array of sales
 */
function display_sales_list (sales){
    $.each(sales.reverse(), function(index, item) {
        
        let id = item.id
        let salesPerson = item.salesperson
        let client = item.client
        let reams = item.reams

        var newSalesRow = $(`<div class="row sales-row" data-id="${id}">`)

        var newSalesPerson = $(`<div class="sales-person-log col-3">`)
        $(newSalesPerson).html(salesPerson)
        $(newSalesRow).append(newSalesPerson)

        var newSalesClient = $(`<div class="client-log col-3">`)
        $(newSalesClient).html(client)
        $(newSalesRow).append(newSalesClient)

        var newSalesReams = $(`<div class="reams-log col-3">`)
        $(newSalesReams).html(reams)
        $(newSalesRow).append(newSalesReams)

        var deleteSale = $(`<div class="delete-log-button col-3">`)
        deleteSale.append('<button type="button" class="btn btn-warning delete-button">X</button>')
        $(newSalesRow).append(deleteSale)

        $( "#sales-log-container" ).append(newSalesRow);
        
    })
}

/**
 * Save a new sale 
 * @param {Object} new_sale 
 */
function save_sale(new_sale){      
    $.ajax({
        type: "POST",
        url: "save_sale",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(new_sale),
        success: function(response){
            autocompleteClientsBox(response.clients)
            makeEmptySales()
            display_sales_list(response.sales)
            $( "#client-input" ).val("").focus()
            $( "#reams-input" ).val("")
        },
        error: function(request, status, error){ //where do these param come from the default error?
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}

/**
 * Delete an existing sale 
 * @param {number} id - The ID of the sale (must be an integer)
 */
function delete_sale (id){ 
    $.ajax({
        type: "POST",
        url: "delete_sale",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(id),
        success: function(response){
            makeEmptySales()
            display_sales_list(response.sales)
            $( "#client-input" ).val("").focus()
            $( "#reams-input" ).val("")
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}

/**
 * Add auto-complete to client input
 * @param {Array} clients 
 */
function autocompleteClientsBox(clients) {
    $( "#client-input" ).autocomplete({
        source: clients
    })
}


/**
 * Empty sales container 
 */
function makeEmptySales() {
    $( "#sales-log-container" ).empty()
}


$(document).ready(function() {

    // Load autocomplete 
    autocompleteClientsBox(clients)

    // Default clients list 
    display_sales_list(sales)

    // Focus on the client input
    $( "#client-input" ).val("").focus()

    // Add new row on click 
    // ADD THE IS isNaN
    $( "#submit-button" ).click( function() {
        let client = $( "#client-input" ).val().trim()
        let writtenNumOfReams = $("#reams-input").val()
        let numOfReams = parseInt($("#reams-input").val(), 10);
        let errorDiv = $(`<div class="error-div-style">`)
    
        $(".error-div-style").remove();
    
        if(client.length > 0 && numOfReams >= 0) {
            let newSale = 	{
                "salesperson": salesAgent,
                "client": client,
                "reams": numOfReams
            }
            save_sale(newSale)
        } 
    
        // error checking 
        else if(!client && !writtenNumOfReams) {
             
        } else if (client.length === 0) {
            errorDiv.html("Client cannot be empty");
            $( "#client-input-div" ).append(errorDiv)
            $( "#client-input" ).val("").focus();
        } else if (!numOfReams && writtenNumOfReams) {
            errorDiv.html("Reams must be a number");
            $( "#ream-input-div" ).append(errorDiv)
            $( "#reams-input" ).focus();
        } else if (!numOfReams && !writtenNumOfReams) {
            errorDiv.html("Reams cannot be empty");
            $( "#ream-input-div" ).append(errorDiv)
            $("#reams-input").val("").focus();
        }

        event.preventDefault()
    })

    // Add new row when enter on reams
    $( "#reams-input" ).on("keydown", function(event) {
        if(event.which === 13) {
            $("#submit-button").click();
        }
    })
    
    // Delete row on click  
    $(document).on("click", ".delete-log-button .delete-button", function(event) {
        event.stopPropagation(); //don't delete outside of the button 
        let row = $( this ).closest(".sales-row")
        let id = row.data("id"); // retrieve the id using the data() method
        delete_sale(id)
    })

    // Draggable row
    $(document).on("mouseover", ".sales-row", function() {
        $(this).draggable({
            revert: "invalid",
        }).addClass("draggable-row")
    })
    $(document).on("mouseleave", ".sales-row", function() {
        $(this).removeClass("draggable-row");
    })

    // Delete on drop
    $(" #trash-container ").droppable({
        over: function(event, ui) {
            $(this).addClass("trash-confirmation");
        },
        out: function(event, ui) {
            $(this).removeClass("trash-confirmation");
        },
        drop: function(event, ui) {
            let draggedRow = ui.helper;
            let id = draggedRow.data("id")
            delete_sale(id)
            $(this).removeClass("trash-confirmation");
        }
    })

})