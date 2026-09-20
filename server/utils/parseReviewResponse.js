exports.parseResponse = (res) => {
  try {
    return JSON.parse(res);
  } catch (err) {
    console.log("Error parsing response:", err);
    throw new Error("Invalid AI review response");
  }
}