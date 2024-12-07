const getAccessToken = () => {
  const tokenString = sessionStorage.getItem("accessToken");
  if (!tokenString) return false;

  try {
    return JSON.parse(tokenString);
  } catch (error) {
    console.error("Error parsing access token:", error);
    return false;
  }
};

const sendError = (error) => {
  if (error.response) {
    const errMsg = error.response.data.message;
    throw new Error(errMsg);
  } else {
    throw error;
  }
};

const formatNumber = (number) => {
  try {
    const formattedBalance = new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
    return formattedBalance;
  } catch (error) {
    console.log(error);
    throw new Error("Error formatting number.");
  }
};

const devServer = `http://localhost:5000`;
const liveServer = `https://lith-ui.onrender.com`;

export { getAccessToken, sendError, devServer, liveServer, formatNumber };
