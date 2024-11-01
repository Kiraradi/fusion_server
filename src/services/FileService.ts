import fs from "fs";
import path from "path";
const publicPath = path.normalize(__dirname + `/../../public`);
const uploadsPath = `${publicPath}/uploads/`;
const avatarPath = "/uploads/avatars/";
const saveAvatar = (baseImage: string, extension: string) => {
  return new Promise<string>((res, rej) => {
    try {
      const localPath = publicPath + avatarPath;

      const rand = Math.ceil(Math.random() * 1000);
      const filename = `Photo_${Date.now()}_${rand}.${extension}`;

      if (!fs.existsSync(uploadsPath)) {
        fs.mkdirSync(uploadsPath);
      }
      if (!fs.existsSync(localPath)) {
        fs.mkdirSync(localPath);
      }

      fs.writeFile(localPath + filename, baseImage, "base64", function (err) {
        console.log(err);
      });

      const puthToFile = avatarPath + filename;
      return res(puthToFile);
    } catch (error) {
      rej(error);
    }
  });
};

const deleteFile = async (path: string) => {
  fs.unlinkSync(`${publicPath}${path}`);
};

export default {
  save: saveAvatar,
  deleteFile,
};
