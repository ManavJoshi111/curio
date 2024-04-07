// user can request other user/space to answer the question. 
// space owner can request user to join the space as a contributor/admin/moderator/follower.   
// request can be accepted/declined by the receiver.

const createRequest = async (req, res) => {
  try {
    const { receiverId, spaceId, role, questionId } = req.body;
    const senderId = req.user.id;

    const request = new Request({
      senderId,
      receiverId,
      spaceId,
      role,
      questionId,
    });

    await request.save();
    res.status(201).send(request);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getRequests = async (req, res) => {
  try {
    const { status } = req.query;
    const receiverId = req.user.id;

    let requests;
    if (status) {
      requests = await Request.find({ receiverId, status });
    } else {
      requests = await Request.find({ receiverId });
    }

    res.send(requests);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).send();
    }
    res.send(request);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createRequest,
  getRequests,
  updateRequest,
};
