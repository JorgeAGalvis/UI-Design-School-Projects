// Video link: https://youtu.be/NRS33Qtw9f8

// Provide by HW specs for autocomplete clients 
let clients = [
    "Shake Shack",
    "Toast",
    "Computer Science Department",
    "Teacher's College",
    "Starbucks",
    "Subsconsious",
    "Flat Top",
    "Joe's Coffee",
    "Max Caffe",
    "Nussbaum & Wu",
    "Taco Bell",
];


// Provided by HW specs for initial sales records 
let sales = [
	{
		"salesperson": "James D. Halpert",
		"client": "Shake Shack",
		"reams": 100
	},
	{
		"salesperson": "Stanley Hudson",
		"client": "Toast",
		"reams": 400
	},
	{
		"salesperson": "Michael G. Scott",
		"client": "Computer Science Department",
		"reams": 1000
	},
]

// Default sales agent 
const salesAgent = "Jorge"

// Link the client input with the default clients autocomplete 
function autocompleteClientsBox(clients) {
    $( "#client-input" ).autocomplete({
        source: clients
    })
}

// Update the autocomplete with new clients 
function updatedClientsAutocomplete(newClient) {
    if(!clients.includes(newClient)) {
        clients.push(newClient)
        autocompleteClientsBox(clients)
    }
}

// Auto populate some sales rows by default 
function addSales(sales) {
    $.each(sales, function(index, item) {
        
        let salesPerson = item.salesperson
        let client = item.client
        let reams = item.reams

        var newSalesRow = $(`<div class="row sales-row">`)

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

// Add single new sales row 
function addSingleSale() {

    let client = $( "#client-input" ).val().trim()
    let writtenNumOfReams = $("#reams-input").val()
    let numOfReams = parseInt($("#reams-input").val(), 10);
    let errorDiv = $(`<div class="error-div-style">`)

    $(".error-div-style").remove();

    if(client.length > 0 && numOfReams >= 0) {
        updatedClientsAutocomplete(client)
        let newSale = 	{
            "salesperson": salesAgent,
            "client": client,
            "reams": numOfReams
        }
        sales.unshift(newSale) 
        makeEmptySales()
        addSales(sales)
        $( "#client-input" ).val("").focus()
        $( "#reams-input" ).val("")
    } 

    // error checking 
    if(!client && !writtenNumOfReams) {
         
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

}

// Empty the sales 
function makeEmptySales() {
    $( "#sales-log-container" ).empty()
}

// Find sale and return its index 
function findSale(salesPerson, client, reams) {
    return sales.findIndex(item => 
        salesPerson.trim() === item.salesperson &&
        client.trim() === item.client &&
        reams === item.reams
    );
}


$(document).ready(function() {

    // Load autocomplete 
    autocompleteClientsBox(clients)

    // Default clients list 
    addSales(sales)

    // Focus on the client input
    $( "#client-input" ).val("").focus()

    // Add new row on click 
    $( "#submit-button" ).click( function() {
        addSingleSale()
    })

    // Delete row on click  
    $(document).on("click", ".delete-log-button .delete-button", function(event) {

        event.stopPropagation(); //don't delete outside of the button 
        let row = $( this ).closest(".sales-row")
        
        let salesPerson = row.find(".sales-person-log").text();
        let client = row.find(".client-log").text();
        let reams = parseInt(row.find(".reams-log").text(), 0);
        
        let saleToRemove = findSale(salesPerson, client, reams)
        sales.splice(saleToRemove, 1)
        makeEmptySales()
        addSales(sales)
        $( "#client-input" ).val("").focus()
    })

    // Add new row when enter on reams
    $( "#reams-input" ).on("keydown", function(event) {
        if(event.which === 13) {
            addSingleSale()
        }
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

            let salesPerson = draggedRow.find(".sales-person-log").text()
            let client = draggedRow.find(".client-log").text()
            let reams = parseInt(draggedRow.find(".reams-log").text(), 0)
    
            let saleToRemove = findSale(salesPerson, client, reams)
            sales.splice(saleToRemove, 1)
            makeEmptySales()
            addSales(sales)
            
            $(this).removeClass("trash-confirmation");
        }
    })

})