import User from "../models/user.js";

export const changeRole = async (req, res) => {
  const { newRole, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.role = newRole;
    await user.save();
    res.status(200).json({ message: "Role updated successfully", user });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};
