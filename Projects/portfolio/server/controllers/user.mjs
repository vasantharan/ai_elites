import UserModel from "../Schema/User.mjs";

export const addUser = async (req, res) => {
    try {
        const { firstname, lastname, password, email, number, address } = req.body;
        const previus =await  UserModel.findOne({ firstname })
        console.log(previus)
        if (!previus) {
            const data = new UserModel({
                firstname: firstname,
                lastname: lastname,
                password: password,
                email: email,
                number: number,
                address: address
            })
            await data.save();
            res.send({
                status: 200,
                body: data
            })
        }
        else{
            res.status(200).json({message:"The user is already exists"})
        }
    }
    catch (err) {
        res.send({ message: err })
    }
}