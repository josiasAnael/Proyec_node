import User from "../models/User.js";
import { sendEmail } from "../controllers/google.controller.js";
import Role from "../models/Role.js";

export const createUser = async (req, res) => {
  try {
    const { username, accountNumber, email, password, career } = req.body;
    var accountnumber = accountNumber;
    //validar que no exista el usuario
    const user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: "El usuario ya existe" });
    //validar que no exista el email
    const userEmail = await User.findOne({ email });
    if (userEmail)
      return res.status(400).json({ message: "El email ya existe" });
    //validar que no exista el numero de cuenta
    const userAccountNumber = await User.findOne({ accountnumber });
    if (userAccountNumber)
      return res.status(400).json({ message: "El numero de cuenta ya existe" });

    const newUser = new User({
      accountnumber,
      username,
      email,
      password,
      career,
    });
    // encrypting password
    newUser.password = await User.encryptPassword(newUser.password);
    const role = await Role.findOne({ name: "user" }); //designa un rol por defecto
    newUser.roles = role._id;

    // saving the new user
    newUser.save();
  } catch (error) {
    res.status(404).json(`Error al crear un usuario: ${error}`);
  }
};

export const getUsers = (req, res) => {
  try {
    // getting all the users whit roles "user"
    User.find()
      .populate("roles")
      .then((users) => {
        res.json(users.filter((x) => x.roles.name === "user"));
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (error) {
    res.status(401).json(`Error al obtener los usuario: ${error}`);
  }
};

export const getUser = (req, res) => {
  try {
    User.findById(req.params.id)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (error) {
    res.status(401).json(`Error al obtener el usuario ${error}`);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      username,
      accountNumber,
      email,
      career,
      roles,
      status,
      InitPractice,
      EndPractice,
    } = req.body;

    var accountnumber = accountNumber;
    const rolesId = await Role.findOne({ name: { $in: roles } }).then(
      (role) => role._id
    );
    User.findByIdAndUpdate(
      id,
      {
        username,
        email,
        accountnumber,
        career,
        roles: rolesId,
        InitPractice,
        EndPractice,
        status,
      },
      { new: true }
    )
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (error) {
    res.status(401).json(`Error al actualizar el usuario ${error}`);
  }
};

export const deleteUser = (req, res) => {
  try {
    User.findByIdAndUpdate(req.params.id, { status: false }, { new: true })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (error) {
    res.status(401).json(`Error al eliminar el usuario ${error}`);
  }
};

export const sendCode = async (req, res) => {
  try {
    const { email } = req.body;
    let code = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    User.findOneAndUpdate({ email }, { code }, { new: true })
      .then(async (user) => {
        if (await sendEmail(user)) {
          res.json({ message: "Se envio el codigo de verificacion" });
        } else {
          res.status(404).json({ message: "No se pudo enviar el correo" });
        }
      })
      .catch((err) => {
        res.status(401).json({ err });
      });
  } catch (error) {
    res.status(401).json(`Error al enviar el codigo ${error}`);
  }
};

export const verifyCode = async (req, res) => {
  try {
    const { code, email } = req.body;
    const user = await User.findOne({ email });
    if (user.code === code) {
      res.json({ message: "El codigo es correcto" });
    } else {
      res.status(401).json({ message: "El codigo es incorrecto" });
    }
  } catch (error) {
    res.status(401).json(`Error al verificar el codigo ${error}`);
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, code } = req.body;
    if (!id) return res.status(400).json({ message: "El id es requerido" });
    if (!password)
      return res.status(400).json({ message: "El password es obligatorio" });
    if (!code)
      return res.status(400).json({ message: "El codigo es obligatorio" });
    const user = await User.findById(id);
    if (!user.code === code)
      return res.status(400).json({ message: "El codigo es incorrecto" });
    user.password = await User.encryptPassword(password);
    user.save();
    res.json({ user });
  } catch (error) {
    res.status(401).json(`Error al actualizar el usuario ${error}`);
  }
};

export const getProfile = (req, res) => {
  try {
    const { _id } = req.userLogged; //obteniendo el id del usuario logueado

    User.findById(_id)
      .populate("roles")
      .then((user) => {
        res.json({ user });
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (error) {
    res.status(401).json(`Error al ob tener el usuario ${error}`);
  }
};
