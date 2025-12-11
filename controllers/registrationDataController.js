import { institutions, departments, committees } from "../constants/registrationData.js";

export const getRegistrationData = (req, res) => {
  return res.json({
    success: true,
    institutions,
    departments,
    committees
  });
};