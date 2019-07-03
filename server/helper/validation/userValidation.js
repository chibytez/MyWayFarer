export const signUpValidation = {
    firstName: 'required|min:1|alpha',
    lastName: 'required|min:1|alpha',
    email: 'email|required',
    password: 'required|min:6|max:20',
  };