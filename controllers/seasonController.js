import Season from "../models/Season.js";

// Auto-increment ID generator
const generateSeasonId = async () => {
  const lastSeason = await Season.findOne().sort({ id: -1 });
  return lastSeason ? lastSeason.id + 1 : 1;
};

// CREATE SEASON
export const createSeason = async (req, res) => {
  try {
    const newId = await generateSeasonId();

    const season = await Season.create({
      id: newId,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      message: "Season created successfully",
      season,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL SEASONS
export const getAllSeasons = async (req, res) => {
  try {
    const seasons = await Season.find().sort({ id: -1 });

    res.json({
      success: true,
      seasons,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET CURRENT SEASON
export const getCurrentSeason = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const season = await Season.findOne({ year: currentYear });

    if (!season) {
      return res.status(404).json({
        success: false,
        message: `No season found for year ${currentYear}`,
      });
    }

    res.json({
      success: true,
      season,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// UPDATE SEASON
export const updateSeason = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedSeason = await Season.findOneAndUpdate(
      { id },
      req.body,
      { new: true }
    );

    if (!updatedSeason) {
      return res.status(404).json({
        success: false,
        message: "Season not found",
      });
    }

    res.json({
      success: true,
      message: "Season updated successfully",
      season: updatedSeason,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE SEASON
export const deleteSeason = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Season.findOneAndDelete({ id });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Season not found",
      });
    }

    res.json({
      success: true,
      message: "Season deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
