
const express = require("express");
const empController = require("../controller/employee");
const Auth = require("../common/Auth");
const router = express.Router();
const {uploadPhoto}  = require('../common/uploadImage')

router.post("/create", Auth.validate, empController.createEmp);
router.put('/upload/:id',uploadPhoto.array('images',1),empController.uploadImages)
router.get("/all", Auth.validate, empController.getAllEmps);
router.get("/:id", empController.getEmpById);
router.put("/edit/:id", empController.editEmp);
router.delete("/delete/:id", empController.deleteEmp);


module.exports = router;
