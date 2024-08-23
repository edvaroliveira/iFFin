const user = JSON.parse(localStorage.getItem("user"));
const config = {
  headers: {
    Authorization: `Bearer ${user?.token}`,
  },
};

export default config;
