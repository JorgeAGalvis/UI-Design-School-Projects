from flask import Flask
from flask import render_template, redirect, url_for
from flask import Response, request, jsonify

# Video: https://youtu.be/aDlbGFrfTrI

app = Flask(__name__)

data = {
    "1": {
        "id": "1",
        "title": "Captain America: The First Avenger",
        "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR9mEP82JfY12jfFuNrRbGQwWMa4iQqHmvnud38iG_Tc5cs91uG",
        "year": "2011",
        "summary": "Steve Rogers, a frail but determined young man, undergoes a super-soldier transformation during World War II, becoming Captain America and leading the fight against Hydra and the Red Skull.",
        "director": ["Joe Johnston"],
        "budget": "$140,000,000",
        "stars": ["Chris Evans", "Hayley Atwell", "Sebastian Stan"],
        "score": "6.9",
        "genres": ["action", "war", "adventure"], 
        "similar movie ids": ["3","2","4"], 
        "sequence":["Captain America: The Winter Soldier"]
    },
    "2": {
        "id": "2",
        "title": "Avengers: Infinity War",
        "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRL8EPSWPqTOpTYOPOE12gXoFrhXqCRu4wkcUI-CoEalqLhZDQg",
        "year": "2018",
        "summary": "Captain America joins forces with Iron Man, Thor, Hulk, Black Widow, and Hawkeye to form the Avengers, a team of superheroes assembled to save the world from the threat of Loki and his alien army.",
        "director": ["Joss Whedon"],
        "budget": "$220,000,000",
        "stars": ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth"],
        "score": "8.1",
        "genres": ["action", "adventure", "sci-fi"],
        "similar movie ids": ["4"], 
        "sequence":["Avengers: Endgame"]
    },
    "3": {
        "id": "3",
        "title": "Captain America: The Winter Soldier",
        "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS3_h4fl5l7FFJpW1uIEIPzduLOomGEiS_s-tXK42bDy5X8v3k6",
        "year": "2014",
        "summary": "Captain America teams up with Black Widow and Falcon to uncover a conspiracy within S.H.I.E.L.D. while facing a mysterious assassin known as the Winter Soldier, who has a personal connection to Steve Rogers.",
        "director": ["Anthony Russo", "Joe Russo"],
        "budget": "$177,000,000",
        "stars": ["Chris Evans", "Scarlett Johansson", "Anthony Mackie"],
        "score": "7.8",
        "genres": ["action", "thriller", "sci-fi"],
        "similar_movie_ids": ["1"],
        "sequence":[]
    },
    "4": {
        "id": "4",
        "title": "Avengers: Endgame",
        "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQIgtoVIPZ7Gfavhuq_Q5CQQP82t1oaClm6UMKzP4qEqnmPmt8e",
        "year": "2019",
        "summary": "Captain America, along with the remaining Avengers, embarks on a time-traveling mission to undo the devastating effects of Thanos' snap and restore balance to the universe.",
        "director": ["Anthony Russo", "Joe Russo"],
        "budget": "$356,000,000",
        "stars": ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth"],
        "score": "8.4",
        "genres": ["action", "adventure", "sci-fi"],
        "similar_movie_ids": ["3"],
        "sequence":[]
    },
    "5": {
        "id": "5",
        "title": "Black Panther",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2EvJxM6r1R2ZOnSev6hqzT9nfW8Y0CRPN1mWHaQzOrd9EGPIh",
        "year": "2018",
        "summary": "T'Challa, the newly crowned king of Wakanda, must defend his nation and the Black Panther mantle when an old adversary challenges him, putting the fate of Wakanda and the world at risk.",
        "director": ["Ryan Coogler"],
        "budget": "$200,000,000",
        "stars": ["Chadwick Boseman", "Michael B. Jordan", "Lupita Nyong'o"],
        "score": "7.3",
        "genres": ["action", "adventure", "sci-fi"],
        "similar_movie_ids": ["3"],
        "sequence":[]
    },
    "6": {
        "id": "6",
        "title": "Thor: Ragnarok",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Z2q1PovL0sLiR3te8fAROw9XCmv-Ep7E76ZWPgfTmvG5qfAo",
        "year": "2017",
        "summary": "Thor finds himself imprisoned on the other side of the universe and must race against time to stop the ruthless Hela from destroying Asgard and its civilization.",
        "director": ["Taika Waititi"],
        "budget": "$180,000,000",
        "stars": ["Chris Hemsworth", "Tom Hiddleston", "Cate Blanchett"],
        "score": "7.9",
        "genres": ["action", "adventure", "comedy"],
        "similar_movie_ids": ["7"],
        "sequence":[]
    },
    "7": {
        "id": "7",
        "title": "Guardians of the Galaxy",
        "image": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTHwG1tMhgfeajy6fxnYWICp46rZM5mfU1_bGkLBfy6AOTON2Jc",
        "year": "2014",
        "summary": "A group of intergalactic misfits, including Star-Lord, Gamora, Drax, Rocket, and Groot, come together to protect a powerful orb from falling into the hands of the villainous Ronan the Accuser.",
        "director": ["James Gunn"],
        "budget": "$170,000,000",
        "stars": ["Chris Pratt", "Zoe Saldana", "Dave Bautista"],
        "score": "8.0",
        "genres": ["action", "adventure", "comedy"],
        "similar_movie_ids": ["6"],
        "sequence":[]
    },
    "8": {
        "id": "8",
        "title": "Doctor Strange",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-TSpra_ikBAnws76-47V0sSvFZrsYrUMaA1FwDxTzGpShcWhl",
        "year": "2016",
        "summary": "Dr. Stephen Strange, a brilliant but arrogant surgeon, seeks mystical help after a car accident robs him of his skills. He discovers a hidden world of magic and alternate dimensions, becoming the Sorcerer Supreme.",
        "director": ["Scott Derrickson"],
        "budget": "$165,000,000",
        "stars": ["Benedict Cumberbatch", "Chiwetel Ejiofor", "Rachel McAdams"],
        "score": "7.5",
        "similar_movie_ids": ["2", "4"],
        "sequence":[]
    },
    "9": {
        "id": "9",
        "title": "Spider-Man: Homecoming",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRAui4j_CP5JitmzERck2NTzo3pgk7OWDttnMIAn3EQjAzLUqA",
        "year": "2017",
        "summary": "Peter Parker balances life as a high school student and his superhero alter ego Spider-Man. When the Vulture emerges as a new villain, Spider-Man must navigate the challenges of being a hero and a teenager.",
        "director": ["Jon Watts"],
        "budget": "$175,000,000",
        "stars": ["Tom Holland", "Michael Keaton", "Zendaya"],
        "score": "7.4",
        "genres": ["action", "adventure", "sci-fi"], 
        "similar_movie_ids": ["2", "4"],
        "sequence":[]
    },
    "10": {
        "id": "10",
        "title": "Captain Marvel",
        "image": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTvwUrWZA7dCe_ggg96fG625dfkSMopojxVqCQAuFBff88WdpV5",
        "year": "2019",
        "summary": "Vers, a Kree warrior with no memory of her past, discovers her true identity as Carol Danvers, aka Captain Marvel. As she unlocks her powers, she becomes a key player in the cosmic battle between the Kree and Skrull races.",
        "director": ["Anna Boden", "Ryan Fleck"],
        "budget": "$152,000,000",
        "stars": ["Brie Larson", "Samuel L. Jackson", "Ben Mendelsohn"],
        "score": "10.0",
        "genres": ["action", "adventure", "sci-fi"],
        "similar_movie_ids": ["4"], 
        "sequence":[]
    }
}


@app.route('/')
def home(): 
    global data
    top_movies = sorted(data.values(), key=lambda x: float(x["score"]), reverse=True)[:3]
    return render_template('home.html', top_movies=top_movies)
      

@app.route('/search')
def search():
    query = request.args.get('search-input', '').strip().lower()
    if not query: 
        return render_template('search.html', search_result=[], query=query)

    global data
    filtered_movies = [movie for movie in data.values() if query in movie["title"].lower().strip()]

    return render_template('search.html', filtered_movies=filtered_movies, query=query)

@app.route('/view/<id>', methods=['GET','POST'])
def view(id=None):
    global data
    movie = data[id]
    return render_template("view.html", movie=movie)

if __name__ == '__main__': 
        app.run()

