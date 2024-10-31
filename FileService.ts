import fs from "fs";
const publicPath = __dirname + `/public`;
const avatarPath = "/uploads/avatars/";
const saveAvatar = (baseImage: string, extension: string) => {
  const localPath = publicPath + avatarPath;

  const rand = Math.ceil(Math.random() * 1000);
  const filename = `Photo_${Date.now()}_${rand}.${extension}`;

  if (!fs.existsSync(__dirname + `/public/uploads/`)) {
    fs.mkdirSync(__dirname + `/public/uploads/`);
  }
  if (!fs.existsSync(localPath)) {
    fs.mkdirSync(localPath);
  }

  fs.writeFile(localPath + filename, baseImage, "base64", function (err) {
    console.log(err);
  });

  const puthToFile = avatarPath + filename;
  return puthToFile;
};

export default {
  save: saveAvatar,
};
