import Delegate from "../models/Delegate.js";



const getAllDeletegates = async (req, res) => {
  try {
    const delegates = await Delegate.find()
      .populate("user")  
      .sort({ _id: -1 });

    if (delegates.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No delegates found",
      });
    }

    res.json({
      success: true,
      delegates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export default getAllDeletegates;