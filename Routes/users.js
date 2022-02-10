import express from 'express';
import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken';
import {createuser, genpassword ,getuserbyName} from '../getmoviesbyID.js';
const router = express.Router();


// async function genpassword(password){
//   const salt = await bcrypt.genSalt(10);
//   console.log("salt :",salt);
//   const hashedpassword = await bcrypt.hash(password,salt);
//   console.log(hashedpassword);
//   return hashedpassword
// }
// genpassword("password@12345")


router
  .route("/signup").post(async (request,response)=>{
  // const data = request.body;
  const {username,password} = request.body;
  // const hashedpassword = await genpassword(password);
  // console.log('incoming user',data);

  //unique user name checking 
  const userexist = await getuserbyName(username);
  console.log(userexist);
  if(userexist){
    response.status(400).send({Message : "The user name is already exists"});
    return;
  }

  //password strength checking
  if(!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)){
    response.status(400).send({Message : "Password pattern did not match"});
    return;
  }
  
  const hashedpassword = await genpassword(password);

  const result = await createuser({username : username,password : hashedpassword})
  response.send(result);
});

router.route("/signin").post(async (request,response)=>{
  const {username,password} = request.body;

  const userfromdb = await getuserbyName(username);
  console.log(userfromdb);
  if(!userfromdb){
    response.status(401).send({Message : "Invalid credentials"});
    return;
  }

  const storedpassword = userfromdb.password;
  console.log(storedpassword);
  const ispasswordismatch = await bcrypt.compare(password,storedpassword)
 
  if(ispasswordismatch){
     //issue the token
    const token = jwt.sign({id:userfromdb._id},process.env.SECRET_KEY);
    response.send({Message:"Successful login",token:token});
    return;
  }
  else{
    response.status(401).send({Message : "Invalid credentials"});
    return;
  }
  // response.send(ispasswordismatch)
  
})



export const usersRouter = router;

// router
//      .route("/signup")
//      .post(async (request,response)=>{
//   const username= "V.Piraisoodan";
//   const password = await genpassword(password);

//   response.send(password);
// });
