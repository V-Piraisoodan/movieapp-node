import express from 'express';
import { getmoviesbyID,getmovies,createmovie,deletemoviesbyID,updatemoviesbyID } from '../getmoviesbyID.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

// mongodb all in one simple solution   ********   important answer

router.route("/")
  .get(auth,async(request,response)=>{
  const filter = request.query;
  if(filter.rating){
  filter.rating = +filter.rating;
   console.log(filter.rating);
  } 
  const movies = await getmovies(filter); //cursor to array conversion
  response.send(movies);     
})
  .post(async (request,response)=>{
  const data = request.body;
  console.log('incoming',data);
  const result = await createmovie(data);
  response.send(result);
});

router.route("/:id")
  .get(async(request,response)=>{
  const {id} = request.params;
  // console.log(id);
  const movie = await getmoviesbyID(id);
  // console.log(movie);
  movie 
  ?response.send(movie)
  :response.status(404).send({msg:"Movie not found"})
})
  .delete(async(request,response)=>{
  const {id} = request.params;
  // console.log(id);
  const movie = await deletemoviesbyID(id);
  // console.log(movie);
  movie 
  ?response.send(movie)
  :response.status(404).send({msg:"Movie not found"})
})
  .put(async(request,response)=>{
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