import USER from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    const newUser = new USER(req.body);
    const { email } = newUser;

    const userExit = await USER.findOne({ email });

    if (userExit) {
      return res.status(400).json({ message: "User is already exists." });
    }
    const saveData = await newUser.save();
    // res.status(200).json(saveData);
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const userData = await USER.find();
    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "User data is not found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const userDataById = await USER.findById(id);

    if (!userDataById) {
      return res.status(404).json({ message: "User  not found" });
    }

    res.status(200).json(userDataById);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userDataById = await USER.findById(id);

    if (!userDataById) {
      return res.status(404).json({ message: "User  not found" });
    }
    const updatedData = await USER.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // res.status(200).json(updatedData);
    res.status(200).json({ message: "User update successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userDataById = await USER.findById(id);

    if (!userDataById) {
      return res.status(404).json({ message: "User  not found" });
    }
    const deleteData = await USER.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
