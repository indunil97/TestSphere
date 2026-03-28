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
exports.deleteRequest = (req, res) => {
  const id = parseInt(req.params.id);

  // find index
  const index = requests.findIndex(req => req.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Request not found"
    });
  }

  // remove item
  const deleted = requests.splice(index, 1);

  res.json({
    message: "Request deleted successfully",
    data: deleted[0]
  });
};
exports.updateRequest = (req, res) => {
  const id = parseInt(req.params.id);
  const { testType, location, deadline } = req.body;

  // find request
  const request = requests.find(req => req.id === id);

  if (!request) {
    return res.status(404).json({
      message: "Request not found"
    });
  }

  // update fields (only if provided)
  if (testType) request.testType = testType;
  if (location) request.location = location;
  if (deadline) request.deadline = deadline;

  res.json({
    message: "Request updated successfully",
    data: request
  });
};