import ua from "ua-parser";

export default async (req, res, next) => {
  // const uaData = ua.parse(req.headers["user-agent"]);
  req.userAgent = req.headers["user-agent"];
  // console.log(uaData);
  next();
};
