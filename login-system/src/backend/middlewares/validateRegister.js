export const validateRegister = (req, res, next) => {
  const {
    name,
    email,
    password,
    confirmPassword,
  } = req.body;

  const errors = {};

  if (!name || name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
  }

  if (!password || password.length < 8) {
    errors.password =
      'Password must be at least 8 characters';
  }

  if (!confirmPassword) {
    errors.confirmPassword =
      'Please confirm your password';
  } else if (password !== confirmPassword) {
    errors.confirmPassword =
      'Passwords do not match';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};
