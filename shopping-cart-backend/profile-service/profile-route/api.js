const router=require('express').Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../profile-model/model');


//API gateway for user registration
/**
 * @swagger
 * /signup:
 *  post:
 *   summary: create a JSONPlaceholder user.
 *   reponses:
 *   201:
 *     description: User created
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *          data:
 *            type: object
 *            properties:
 *              id: 
 *                type: integer
 *                description: The user id
 *                example: 0
 *              name:
 *                type: string
 *                description: The user name.
 *                example: marry
 * 
 *     
 */

router.post('/signup',async (req,res)=>{


    const emailExists = await User.findOne({emailid:req.body.emailid});
    if(emailExists) return res.status(400).json({message:'This email-id already exixted'});
    
    else{
    console.log("post req"); 
    
    //creatinh new user instance
    var user= new User(req.body);
    //generating salt to hash with password inorder to save it in database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    //assign hsahed password with given password 
    user.password=hashedPassword;
    //save the user instance in database
    try{
        await user.save(); 
    
       res.status(200);
       res.send(user);
       console.log(user);
       res.send('user created');

    } catch(err){
        if(err){
            res.send('cannot create user');
        }
    }
    
    }

});

//api gateway for user login
/**
 * @swagger
 * /login:
 *  post:
 *   summary: chechs whether user has account or not.
 *   reponses:
 *   201:
 *     description: creates token whn user needs to login
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *          data:
 *            type: object
 *            properties:
 *              id: 
 *                type: integer
 *                description: The user id
 *                example: 0
 *              name:
 *                type: string
 *                description: The user name.
 *                example: marry
 * 
 *     
 */



router.post('/login',async (req,res)=>{
    const user=await User.findOne({emailid:req.body.emailid});
    if(!user) return res.status(400).json({message:'oops...user does not exist!'});
    
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).json({message:"Oops...password is incorrect"});

    const token =await jwt.sign({_id:user._id},'tokensecret',{expiresIn:'12h'});
    if(token) {
   // return res.status(200).json(token);
    res.send(token);
    console.log('succesfully loged in');
    }
   
    
});







//authentication for sign up - user

    /*
    const emailExists =await User.findOne({email:req.body.email});
    if(emailExists) return res.status(400).json({message:'This email-id already exixted'});
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });

    try{
        const userSave =await user.save();
        res.json({message:"user added"});
    } catch(error){
        console.log("oops...failed to add the user!");
    }  
});
*/


//authentication for login -user
/*
router.post('/login', async (req,res)=>{
    const user=await Usesr.findOne({email:req.body.email});
    if(!user) return res.status(400).json({message:'oops...user does not exist!'});

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).json({message:"Oops...password is incorrect"});


    const token =await jwt.sign({_id:user._id},process.env.TOKEN_SECRET,{expiresIn:'12h'});
    if(token) return res.status(200).json(token);


    res.json({message:'Successfully loged in'});
});
*/
module.exports=router;
