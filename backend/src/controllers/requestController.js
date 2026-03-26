exports.createRequest = (req, res) => {
  const { testType, location, deadline } = req.body;

  // validation
  if (!testType || !location || !deadline) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  // fake save (for now)
  const newRequest = {
    id: Date.now(),
    testType,
    location,
    deadline
  };

  console.log("Saved Request:", newRequest);

  res.status(201).json({
    message: "Request created successfully",
    data: newRequest
  });
};