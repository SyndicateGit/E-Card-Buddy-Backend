const handleErrors = (error: any) => {

  if(error.code === 11000){
    error.message = "Email already registered.";
    return error;
  }

  return error;
};

export default handleErrors;