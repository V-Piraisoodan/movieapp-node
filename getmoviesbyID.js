import { client } from './index.js';
import bcrypt from 'bcrypt';

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

//create username and password
async function createuser(data) {
  return await client.db('Movie_list')
    .collection('users')
    .insertOne(data);
}

//generate user password
async function genpassword(password){
  const salt = await bcrypt.genSalt(10);
  console.log("salt :",salt);
  const hashedpassword = await bcrypt.hash(password,salt);
  console.log(hashedpassword);
  return hashedpassword;
}

// check user is exist or not
async function getuserbyName(username) {
  return await client
    .db("Movie_list")
    .collection("users")
    .findOne({ username: username });
}




export {
  getmoviesbyID,
  getmovies,
  createmovie,
  deletemoviesbyID,
  updatemoviesbyID,
  createuser,
  genpassword,
  getuserbyName,
};