export const validatePasswordChange = (
  req,
  res,
  next
) => {
  const {
    currentPassword,
    newPassword,
    confirmPassword,
  } = req.body;

  const errors = {};

  if (!currentPassword) {
    errors.currentPassword =
      'Current password is required';
  }

  if (!newPassword) {
    errors.newPassword =
      'New password is required';
  } else if (newPassword.length < 8) {
    errors.newPassword =
      'New password must be at least 8 characters';
  }

  if (!confirmPassword) {
    errors.confirmPassword =
      'Please confirm your new password';
  } else if (newPassword !== confirmPassword) {
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