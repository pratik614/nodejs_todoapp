import express from "express";
import {getAllusers, register, login, getMyprofile, logout } from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

router.get("/",(req,res)=>{
    res.send("working");
});



router.post("/new",register);
router.post("/login",login);
router.get("/logout",logout);
router.get("/me",isAuthenticated, getMyprofile);

// router.route("/userid/:id").get(getUserdetail).put(updateUserdetail).delete(deleteUserdetail);   //prefered method then below
// router.put("/userid/:id",updateUserdetail);      these 3 lines of code written in single code above
// router.delete("/userid/:id",deleteUserdetail);
 
     export default router;