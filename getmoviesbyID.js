import { client } from './index.js';

async function getmoviesbyID(id) {
  return await client
    .db("Movie_list")
    .collection("movies")
    .findOne({ id: id });
}
async function getmovies(filter) {
    return await client
      .db("Movie_list")
      .collection("movies")
      .find(filter) // cursor -> pagination -> 20documents per page
      .toArray();
  }
  
async function createmovie(data) {
    return await client.db('Movie_list')
      .collection('movies')
      .insertMany(data);
  }

async function deletemoviesbyID(id) {
    return await client
      .db("Movie_list")
      .collection("movies")
      .deleteOne({ id: id });
}

async function updatemoviesbyID(id,update) {
  return await client
    .db("Movie_list")
    .collection("movies")
    .updateOne({ id: id },{$set:update});
}

export {getmoviesbyID,getmovies,createmovie,deletemoviesbyID,updatemoviesbyID};