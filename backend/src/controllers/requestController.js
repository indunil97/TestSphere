let requests = [];

exports.createRequest = (req, res) => {
  const { testType, location, deadline } = req.body;

  if (!testType || !location || !deadline) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const newRequest = {
    id: Date.now(),
    testType,
    location,
    deadline
  };

  // ✅ ADD THIS LINE
  requests.push(newRequest);

  console.log("Saved Request:", newRequest);

  res.status(201).json({
    message: "Request created successfully",
    data: newRequest
  });
};

exports.getAllRequests = (req, res) => {
  res.json({
    data: requests
  });
};