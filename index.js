import express from 'express'; // "type" : "module"
import { MongoClient } from "mongodb"; // "type" : "module"
import dotenv from "dotenv"

dotenv.config(); //getting all env keys // first line after import (import ku aduthu ithai than eluthanum)

// console.log(process.env)

// const express = require("express");
// const {MongoClient} = require("mongodb");

const app = express();

// const PORT = 9000;
const PORT = process.env.PORT;

const movies = [
    {
      id : "100",
      name: "RRR",
      poster:
        "https://englishtribuneimages.blob.core.windows.net/gallary-content/2021/6/Desk/2021_6$largeimg_977224513.JPG",
      rating: 8.8,
      language : "telugu",
      summary:
        "RRR is an upcoming Indian Telugu-language period action drama film directed by S. S. Rajamouli, and produced by D. V. V. Danayya of DVV Entertainments.",
      trailer: "https://www.youtube.com/embed/f_vbAtFSEc0"
    },
    {
      id : "101",
      name: "Iron man 2",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
      rating: 7,
      language : "english",
      summary:
        "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
      trailer: "https://www.youtube.com/embed/wKtcmiifycU"
    },
    { 
        id : "102",
      name: "No Country for Old Men",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
      rating: 8.1,
      language : "english",
      summary:
        "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
      trailer: "https://www.youtube.com/embed/38A__WT3-o0"
    },
    {
        id : "103",
      name: "Jai Bhim",
      poster:
        "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
      summary:
        "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
      rating: 9,
      language : "tamil",
      trailer: "https://www.youtube.com/embed/nnXpbTFrqXA"
    },
    {
        id : "104",
      name: "The Avengers",
      rating: 8,
      language : "english",
      summary:
        "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
      poster:
        "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
      trailer: "https://www.youtube.com/embed/eOrNdBpGMv8"
    },
    {
        id : "105",
      name: "Interstellar",
      poster: "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
      rating: 8.6,
      language : "english",
      summary:
        "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
      trailer: "https://www.youtube.com/embed/zSWdZVtXT7E"
    },
    {
        id : "106",
      name: "Baahubali",
      poster: "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
      rating: 8,
      language : "telugu",
      summary:
        "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
      trailer: "https://www.youtube.com/embed/sOEg_YZQsTI"
    },
    {
        id : "107",
      name: "Ratatouille",
      poster:
        "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
      rating: 8,
      language : "english",
      summary:
        "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
      trailer: "https://www.youtube.com/embed/NgsQ8mVkN8w"
    }
  ];

// const MONGO_URL = "mongodb://localhost"; //"mongodb://localhost:27017"
const MONGO_URL = process.env.MONGO_URL; // hidden the url from git

async function createConnection(){
  const client = new MongoClient(MONGO_URL);
  await client.connect(); //promise
  console.log("Mongo connected");
  return client;
}

const client = await createConnection(); //allowed or working with latest import only ("type":"module")-idhil mattume await function work agum.

// const PORT = 9000;

app.get("/",(request,response)=>{
    response.send("Hello,World🥰😍😘🤩✨🎉🍫🥤");
});

// app.get("/movies/:id",async(request,response)=>{
//     const {id} = request.params;
//     console.log(id);
//     const movie = await client
//            .db("movies")
//            .collection("movies")
//            .findOne({id: id });
//     console.log(movie);

//     movie 
//       ?response.send(movie)
//       :response.status(404).send({msg:"Movie not found"})

// });

// mongodb all in one simple solution   ********   important answer

app.get("/movies",async(request,response)=>{

 const filter = request.query;
 if(filter.rating){
   filter.rating = +filter.rating;
   console.log(filter.rating);
 }

 const movies = await client
        .db("Movie_list")
        .collection("movies")
        .find(filter) // cursor -> pagination -> 20documents per page
        .toArray(); //cursor to array conversion

    response.send(movies);

});

app.post('/movies',express.json(),async (request,response)=>{
  const data = request.body;
  console.log('incoming',data);
  const result = await client.db('Movie_list')
  .collection('movies')
  .insertMany(data);

  response.send(result);
})



app.listen(PORT,()=>console.log("The server is started",PORT));