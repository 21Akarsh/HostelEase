
//  complaintRoutes.get("/complaints", getAllComplaintsByUser);


import express from "express";
import { 
  postComplaints, 
  putComplaintsByid, 
  getAllComplaintsByUser, 
  getUserType, 
  getUserDetails, 
  deleteComplaints 
} from "../controller/complaintController.js";
import { authorizeWarden, authorizeComplaintRoute } from "../middleware/auth.js";

const complaintRoutes = express.Router();

complaintRoutes.post("/complaints", postComplaints);
complaintRoutes.get("/complaints", authorizeComplaintRoute, getAllComplaintsByUser);
complaintRoutes.post("/complaints/:id", putComplaintsByid);
complaintRoutes.delete("/complaints/:id", deleteComplaints);

complaintRoutes.get("/userType", getUserType);
complaintRoutes.get("/userDetails/:id", getUserDetails);

export default complaintRoutes;

