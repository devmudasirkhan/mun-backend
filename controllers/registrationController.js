import Registration from "../models/Registration.js";
import Season from "../models/Season.js";

// Auto-increment ID
const generateRegistrationId = async () => {
  const last = await Registration.findOne().sort({ id: -1 });
  return last ? last.id + 1 : 1;
};

// CREATE REGISTRATION
export const createRegistration = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      institution,
      department,
      rollNumber,
      priority_1,
      priority_2,
      priority_3,
      priority_4,
      season,
    } = req.body;

    console.log(req.body, "Request Body");

    const seasonExists = await Season.findById(season);
    if (!seasonExists) {
      return res.status(404).json({ message: "Season not found" });
    }

    // ===== File checks =====
    if (!req.files?.profilePicture?.[0]) {
      return res.status(400).json({
        success: false,
        message: "Profile picture file is missing",
      });
    }

    if (!req.files?.id_card?.[0]) {
      return res.status(400).json({
        success: false,
        message: "ID Card file is missing",
      });
    }

    if (!req.files?.payment_proof?.[0]) {
      return res.status(400).json({
        success: false,
        message: "Payment proof file is missing",
      });
    }

    // Prevent duplicate email in same season
    const already = await Registration.findOne({ email, season });
    if (already) {
      return res.status(400).json({
        success: false,
        message: "Email already registered for this season",
      });
    }

    const newId = await generateRegistrationId();

    const registration = await Registration.create({
      id: newId,
      firstName,
      lastName,
      phoneNumber,
      email,
      institution,
      department,
      rollNumber,
      priority_1,
      priority_2,
      priority_3,
      priority_4,
      season: seasonExists._id,
      profilePicture: req.files?.profilePicture?.[0]?.path || "",
      id_card: req.files?.id_card?.[0]?.path || "",
      payment_proof: req.files?.payment_proof?.[0]?.path || "",
    });

    res.status(201).json({
      success: true,
      message: "Registration submitted successfully",
      registration,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL REGISTRATIONS (Admin)
export const getAllRegistrations = async (req, res) => {
  try {
    const list = await Registration.find().sort({ id: -1 });

    res.json({
      success: true,
      registrations: list,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
