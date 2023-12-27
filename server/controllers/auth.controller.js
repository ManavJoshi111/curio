exports.getVerificationOTP = async (req, res) => {
  const { name, email } = req.body;
  const { error } = authValidtor.validate(req.body);
  console.log("Error: ", error);
  //   if(error){
  //     return res.status(400).json({success:false})
  //   }
};
