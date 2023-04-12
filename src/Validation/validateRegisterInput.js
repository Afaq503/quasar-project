import validator from "validator";

const validateRegisterInput = (data) => {
  let errors = {};

  const { full_name, user_name, email, password, password2 } = data;

  if (localStorage.users) {
    let lsUsers = localStorage.users;
    lsUsers = JSON.parse(lsUsers);
    let index = lsUsers.findIndex((user) => user.user_name === user_name);
    if (index > -1) {
      errors.user_name = "Username already exists!";
    }
  }
  if (validator.isEmpty(full_name)) {
    errors.full_name = "Full name field is required.";
  }
  if (validator.isEmpty(user_name)) {
    errors.user_name = "Username field is required.";
  }

  if (!validator.isEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (validator.isEmpty(email)) {
    errors.email = "Email field is required.";
  }

  if (validator.isEmpty(password)) {
    errors.password = "Password field is required.";
  }

  if (!validator.equals(password, password2)) {
    errors.password2 = "Password should match!";
  }

  if (validator.isEmpty(password2)) {
    errors.password2 = "Confirm Password field is required.";
  }

  return {
    isInvalid: Object.keys(errors).length > 0,
    errors: errors,
  };
};

export default validateRegisterInput;
