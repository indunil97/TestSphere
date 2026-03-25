exports.createRequest = (req, res) => {
    const data = req.body;
  
    console.log("New Request:", data);
  
    res.json({
      message: "Request created successfully",
      data: data
    });
  };