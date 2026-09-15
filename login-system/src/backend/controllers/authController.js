export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
    } = req.body;

    console.log({
      name,
      email,
      password,
      confirmPassword,
    });

    return res.status(201).json({
      success: true,
      message: 'Registration endpoint reached',
      data: req.body,
    });
  } catch (error) {
    console.error('Registration error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
