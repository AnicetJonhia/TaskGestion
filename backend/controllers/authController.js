const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Ajoutez un log pour vérifier le contenu de req.body
    console.log('Request Body:', req.body);

    // Vérifiez la présence de tous les champs requis
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Please provide name, email, and password' });
    }

    // Vérifiez si l'utilisateur existe déjà
    let user = await User.findOne({ $or: [{ name }, { email }] });
    if (user) {
      return res.status(400).json({ msg: 'User already exists with this name or email' });
    }

    // Hash le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crée un nouvel utilisateur
    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Sauvegarde l'utilisateur dans la base de données
    await user.save();

    // Génère un jeton d'accès JWT
    const accessToken = jwt.sign({ username: user.name }, process.env.JWT_SECRET);

    // Envoyez une réponse unique contenant le message de succès et le jeton d'accès
    res.status(201).json({
      msg: 'User registered successfully',
      accessToken: accessToken
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return res.status(400).send('Cannot find user');

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) return res.status(400).send('Not Allowed');

    const accessToken = jwt.sign({ username: user.name }, process.env.JWT_SECRET);
    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

exports.logout = (req, res) => {
  try {
    // Vous pouvez ajouter d'autres opérations de déconnexion ici si nécessaire
    res.status(200).send('Logged out successfully')
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
