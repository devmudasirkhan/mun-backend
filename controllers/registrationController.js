import Registration from "../models/Registration.js";
import Season from "../models/Season.js";
import User from "../models/User.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import Delegate from "../models/Delegate.js";
import nodemailer from "nodemailer";

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

    const latest = await Registration.findOne({ email, season }).sort({
      createdAt: -1,
    });

    console.log("Latest registration:", latest);

    if (latest && latest.status !== "Rejected") {
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

export const acceptRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    const registration = await Registration.findOne({ id });
    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }
    
    const existingUser = await User.findOne({ email: registration.email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists for this registration",
      });
    }

    // Generate password
    const plainPassword = crypto.randomBytes(6).toString("hex");
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Create user
    const newUser = await User.create({
      id: registration.id,
      firstName: registration.firstName,
      lastName: registration.lastName,
      phoneNumber: registration.phoneNumber,
      email: registration.email,
      profilePicture: registration.profilePicture,
      institution: registration.institution,
      department: registration.department,
      rollNumber: registration.rollNumber,
      id_card: registration.id_card,
      userType: "user",
      password: hashedPassword,
    });

    // Create delegate
    const delegate = await Delegate.create({
      user: newUser._id,
      priority_1: registration.priority_1,
      priority_2: registration.priority_2,
      priority_3: registration.priority_3,
      season: registration.season,
      assigned_commitee: null,
      country: null,
      member: null,
      delegate_id: `DEL-${Date.now()}`, // or any format you want
    });

    registration.status = "Accepted";
    registration.status_code = "ACCEPTED";
    await registration.save();

    res.json({
      success: true,
      message: "Registration accepted → User created → Delegate created",
      registration,
      user: newUser,
      delegate,
      password: plainPassword,
    });
  } catch (error) {
    console.error("Error accepting registration:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const rejectRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({
        success: false,
        message: "Rejection reason is required",
      });
    }

    const registration = await Registration.findOne({ id });
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    // Update registration
    registration.status = "Rejected";
    registration.status_code = "REJECTED";
    registration.rejection_reason = reason;
    await registration.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"MunMUET Portal" <${process.env.EMAIL_USER}>`,
      to: registration.email,
      subject: "Your Registration Has Been Rejected",
      html: `
        <h2>Dear ${registration.firstName},</h2>
        <p>We regret to inform you that your registration has been <strong>rejected</strong>.</p>
        <p><strong>Reason:</strong> ${reason}</p>
        <br/>
        <p>Regards,<br/>MunMUET Team</p>
      `,
    });

    res.json({
      success: true,
      message: "Registration rejected and email sent successfully",
      registration,
    });
  } catch (error) {
    console.error("Reject Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

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
