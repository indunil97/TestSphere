const express = require("express");
const router = express.Router();

const { createRequest, getAllRequests, deleteRequest,updateRequest } = require("../controllers/requestController");

router.post("/", createRequest);
router.get("/", getAllRequests);
router.delete("/:id",deleteRequest);
router.put("/:id",updateRequest)

module.exports = router;