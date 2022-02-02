import express from 'express';
import { getmoviesbyID,getmovies,createmovie,deletemoviesbyID,updatemoviesbyID } from '../getmoviesbyID.js';
const router = express.Router();

// mongodb all in one simple solution   ********   important answer

router.get("/",async(request,response)=>{
 const filter = request.query;
 if(filter.rating){
   filter.rating = +filter.rating;
   console.log(filter.rating);
 } 
 const movies = await getmovies(filter); //cursor to array conversion
    response.send(movies);

});

router.post('/',async (request,response)=>{
  const data = request.body;
  console.log('incoming',data);
  const result = await createmovie(data);
  response.send(result);
});

router.get("/:id",async(request,response)=>{
  const {id} = request.params;
  // console.log(id);
  const movie = await getmoviesbyID(id);
  // console.log(movie);
  movie 
    ?response.send(movie)
    :response.status(404).send({msg:"Movie not found"})
});

router.delete("/:id",async(request,response)=>{
    const {id} = request.params;
    // console.log(id);
    const movie = await deletemoviesbyID(id);
    // console.log(movie);
    movie 
      ?response.send(movie)
      :response.status(404).send({msg:"Movie not found"})
});

router.put("/:id",async(request,response)=>{
  const {id} = request.params;
  const update = request.body;
  // console.log(id);
  const movie = await updatemoviesbyID(id,update);
  // console.log(movie);
  movie 
    ?response.send(movie)
    :response.status(404).send({msg:"Movie not found"})
});







export const movieRouter = router;