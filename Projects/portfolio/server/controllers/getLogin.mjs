import UserModel from "../Schema/User.mjs"


export const getLogin = async(req,res) =>{
    const {email,password} = req.body
    console.log(req.body);
    const data = await UserModel.findOne({email:email,password:password})
    console.log(data);
    if(data.email == email && data.password==password){
        res.send(data)
    }
    else{
        res.status(400).json({messang:"Enter the Password or email correctly"})
    }
}