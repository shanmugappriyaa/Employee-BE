const empModel = require("../models/employee");
const { cloudinaryUploadImg } = require("../common/cloudinary");
const fs = require("fs");

const createEmp = async (req, res) => {
  console.log("create req body=========> ", req.body);
  try {
    const { userName, imageUrl, email, mobile, designation, gender, course } =
      req.body;

    let emp = await empModel.findOne({ email: email });
    if (!emp) {
      const result = await empModel.create({
        ...req.body,
      });

      res.status(201).send({
        messasge: "Employee created successfully",
        result,
      });
    } else {
      res.status(201).send({
        warnMessasge: "This employee email id already exist",
      });
    }
  } catch (error) {
    res.status(500).send({
      messasge: "Internal server Error",
      error: error.messasge,
    });
  }
};

const getAllEmps = async (req, res) => {
  try {
    let allEmps = await empModel.find({}).sort({ createdAt: 1 });
    res.status(200).send({
      messasge: "emp fetched successfully",
      allEmps,
    });
  } catch (error) {
    res.status(500).send({
      messasge: "Internal server Error",
      error: error.messasge,
    });
  }
};
const getEmpById = async (req, res) => {
  try {
    let empId = req.params.id;
    // console.log("empId===========> ", empId);
    if (empId) {
      let emp = await empModel.findOne({ _id: req.params.id });
      res.status(200).send({
        emp,
      });
    } else {
      res.status(400).send({
        messasge: "Emp id not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      messasge: "Internal server Error",
      error: error.messasge,
    });
  }
};

const editEmp = async (req, res) => {
  try {
    let empId = req.params.id;
    if (empId) {
      const { userName, imageUrl, mobile, designation, gender, course } =
        req.body;
      let emp = await empModel.findOne({ _id: empId });
      (emp.userName = userName),
        (emp.mobile = mobile),
        (emp.designation = designation),
        (emp.gender = gender),
        (emp.course = course);

      await emp.save();
      res.status(200).send({
        messasge: "emp updated successfully",
      });
    } else {
      res.status(400).send({ messasge: "empId not found" });
    }
  } catch (error) {
    res.status(500).send({
      messasge: "Internal server Error",
      error: error.messasge,
    });
  }
};

const getempByUserId = async (req, res) => {
  try {
    let emp = await empModel
      .find(
        { createdBy: req.params.id },
        {
          _id: 1,
          title: 1,
          imageUrl: 1,
          createdAt: 1,
          shortDesc: 1,
          emptatus: 1,
          createdUserName: 1,
        }
      )
      .sort({ createdAt: 1 });
    res.status(200).send({
      message: "emp Fetched Successfully",
      emp,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteEmp = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("dlete id--?", id);
    const result = await empModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(400).json({ message: "User not found" });
    } else {
      return res.status(200).json({ message: "Success" });
    }
  } catch (error) {
    res.status(500).send({
      messasge: "Internal server Error",
      error: error.messasge,
    });
  }
};

const uploadImages = async (req, res) => {
  const { id } = req.params;
  console.log(req.files);
  try {
    const uploader = (path) => cloudinaryUploadImg(path);
    const urls = [];
    const files = req.files;
    for (let i = 0; i < req.files.length; i++) {
      let locaFilePath = req.files[i].path;
      const newpath = await uploader(locaFilePath);

      urls.push({
        url: newpath?.secure_url,
        asset_id: newpath?.asset_id,
        public_id: newpath?.public_id,
      });
      fs.unlinkSync(locaFilePath);
    }

    const findemp = await empModel.findByIdAndUpdate(
      id,
      {
        imageUrl: urls.map((file) => {
          return file;
        }),
      },
      { new: true }
    );

    res.status(200).send({
      msg: "images uploaded Succssfully",
      findemp,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
module.exports = {
  createEmp,
  getAllEmps,
  getEmpById,
  editEmp,
  getempByUserId,
  uploadImages,
  deleteEmp,
};
