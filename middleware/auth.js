import  jwt  from 'jsonwebtoken';

export const auth =(request,response,next)=>{
  try{
    const token = request.header("x-auth-token");
    console.log(token);
    //Verify the token and secret key
    jwt.verify(token,process.env.SECRET_KEY);
    next();
  }
  catch(err){
    response.status(401).send({Error:err.message})
  }
}