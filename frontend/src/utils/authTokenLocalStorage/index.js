export const saveAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  }
};

export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  return token;
};
