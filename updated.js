// update-version.js
// const fs = require('fs');
// const path = require('path');
//
// // 读取当前版本
// const packagePath = path.join(__dirname, 'package.json');
// const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
// const currentVersion = packageJson.version;
//
// // 这里可以根据需要自定义版本更新规则，例如使用semver库
// const versionParts = currentVersion.split('.');
// const nextVersion = `${versionParts[0]}.${versionParts[1]}.${Number(versionParts[2]) + 1}`;
//
// // 更新package.json中的版本号
// packageJson.version = nextVersion;
//
// // 写回文件
// fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
// console.log(`Version updated to ${nextVersion}`);

let fs = require("fs");
const getPackageJson = () => {
    // 读取文件
    let data = fs.readFileSync("./package.json");
    // 转换为 JSON 对象
    return JSON.parse(data);
};

let packageData = getPackageJson();

const updateVersion = () => {
    let version = packageData.version.split(".");
    console.log(version)
    let major = parseInt(version[0]); // 主版本号
    let minor = parseInt(version[1]); // 次版本号
    let patch = parseInt(version[2]); // 小版本号

    // 检查并更新版本号
    if (patch < 99) {
        patch++; // 递增小版本号
    } else {
        patch = 0; // 重置小版本号
        if (minor < 9) {
            minor++; // 递增次版本号
        } else {
            minor = 0; // 重置次版本号
            major++; // 递增主版本号
        }
    }

    // 更新版本号
    packageData.version = `${major}.${minor}.${patch}`;

    // 获取当前日期和时间
    let now = new Date();
    let formattedDate = `${now.getFullYear()}-${String(
        now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
        now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
        now.getSeconds()
    ).padStart(2, "0")}`;

    // 更新最后打包时间
    packageData.lastBuildTime = formattedDate;
};

updateVersion();

fs.writeFile(
    "./package.json",
    JSON.stringify(packageData, null, "\t"),
    (err) => {
        if (err) {
            console.log("写入版本失败", err);
        } else {
            console.log("写入版本成功 " + packageData.version);
        }
    }
);

