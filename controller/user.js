import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import errorHandler from "../middlewares/error.js";


export const getAllUser = async (req, res) => { };



export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) return next(new errorHandler("Incorrect Email and Password", 404));
        // if(!user)
        //   return res.status(404).json({
        //     sucess:false,
        //     message:"Incorrect Email and Password",
        // });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(404).json({
                sucess: false,
                message: "Incorrect Email and Password",
            });

        sendCookie(user, res, `Welcome back ,${user.name}`, 202);
    } catch (error) {
        next(error);
    }
};



export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) return next(new errorHandler("user already exist", 404));
        // if(user)
        //   return res.status(404).json({
        //     sucess:false,
        //     message:"User already exist",
        // });

        const hashedpassword = await bcrypt.hash(password, 10);

        user = await User.create({ name, email, password: hashedpassword });

        sendCookie(user, res, "Registered successfully", 201);
    } catch (error) {
        next(error);
    }
};



export const getMyProfile = (req, res) => {

    res
        .status(200)
        .json({
            sucess: true,
            user: req.user,
        })
};

export const logout = (req, res) => {

    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        })
        .json({
            sucess: true,
            // user:req.user,
        })
};



// export const getAllUser = async (req,res)=>{

//     const users = await User.find({});

//     res.json({
//         sucess:true,
//         users,
//     });
// };

// export const register=async (req,res)=>{

//     const{name,email,passoword}=req.body;

//     await User.create({
//         name,
//         email,
//         passoword,
//     });

//     res.status(201).cookie("alok","raj").json({
//         sucess:true,
//         message:"Registered sucessfully",
//     });
// };

// // export const special=async (req,res)=>{
// //     res.json({
// //         sucess:true,
// //         message:"juat djdhd"
// //     });
// // };

// export const getUserDetails=async (req,res)=>{
//     const {id}=req.params;
//     const users= await User.findById(id);
//     res.json({
//         sucess:true,
//         users,
//     });
// };

// export const update=async (req,res)=>{
//     const {id}=req.params;
//     const users= await User.findById(id);
//     res.json({
//         sucess:true,
//         message:"Updated data",
//     });
// };

// export const deleteUser=async (req,res)=>{
//     const {id}=req.params;
//     const user= await User.findById(id);

//     await user.remove();
//     res.json({
//         sucess:true,
//         message:" USER DELETETED ",
//     });
// };