from flask import Flask
from flask import render_template
from flask import Response, request, jsonify

# Video link: https://youtu.be/3PfT0-lJYds

# Function declaration style  
from typing import List 

# Initialize the Flask application 
app = Flask(__name__)

########
# DATA #
########

current_id = 4

sales = [ 
    {
        "id": 1,
        "salesperson": "James D. Halpert", 
        "client": "Shake Shack",
        "reams": 1000
    }, 
    {
        "id": 2,
        "salesperson": "Stanley Hudson", 
        "client": "Toast",
        "reams": 4000
    }, 
    {
        "id": 3,
        "salesperson": "Michael G. Scott", 
        "client": "Computer Science Department", 
        "reams": 10000
    }, 
]


clients = [
    "Shake Shack",
    "Toast",
    "Computer Science Department", "Teacher's College",
    "Starbucks",
    "Subsconsious",
    "Flat Top",
    "Joe's Coffee",
    "Max Caffe",
    "Nussbaum & Wu",
    "Taco Bell",
]


##########
# ROUTES #
##########

@app.route('/')
def index():
   return render_template('welcome.html')   


@app.route('/infinity')
def log_sale():
    return render_template('log_sales.html', sales=sales, clients=clients) 


###################################
# REQUIRED ROUTES PER ASSIGMNMENT #
###################################

@app.route('/save_sale', methods=['GET', 'POST'])
def save_sale() -> List[dict]: 
    """
    i.   It takes in a sale (like in part 11.b.i),
    ii.  It adds a unique id
    iii. It updates the data
    iv.  It returns two things: all the sales and all the clients
    """
    global sales
    global clients
    global current_id 

    json_data = request.get_json()  
    salesperson = json_data["salesperson"] 
    client = json_data["client"] 
    reams = json_data["reams"] 
    
    new_sale = {
        "id": current_id,
        "salesperson": salesperson,
        "client":  client, 
        "reams": reams
    }
    sales.append(new_sale) 
    current_id += 1

    if not client in clients: 
        clients.append(client)

    return jsonify(sales=sales, clients=clients)
 

@app.route('/delete_sale', methods=['GET', 'POST'])
def delete_sale() -> List[dict]: 
    """
    i. It takes in an id of a sale
    ii. It updates the data
    iii. It returns all the sales.
    """
    global sales 
    json_data = request.get_json()

    for sale in sales: 
        if sale["id"] == json_data: 
            sales.remove(sale)
    
    return jsonify(sales=sales)

if __name__ == '__main__':
   app.run(debug = True) 




