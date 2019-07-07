export const signUp_validation = {
    first_name: 'required|min:1|alpha',
    last_name: 'required|min:1|alpha',
    email: 'email|required',
    password: 'required|min:6|max:20',
  };

  export const login_validation = {
    email: 'email|required',
    password: 'required|min:6|max:20',
  };