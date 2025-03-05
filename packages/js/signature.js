import moment from "moment";

const url = 'ws://localhost:1919';
let webSocket;
let GWQ_SetLineColorType = 106

function myBrowser() {
  let userAgent = navigator.userAgent;
  let isOpera = userAgent.indexOf("Opera") > -1;
  if (isOpera) {
    return "Opera"
  } else if (userAgent.indexOf("Firefox") > -1) {
    return "FF";
  } else if (userAgent.indexOf("Edge") > -1) {
    return "Edge";
  } else if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome";
  } else if (userAgent.indexOf("Safari") > -1) {
    return "Safari";
  } else {
    return "IE";
  }
}

export function connectWebSocket(url) {
  if (myBrowser() !== 'IE') {
    webSocket = new WebSocket('ws://localhost:1919');
    webSocket.onerror = function (event) {
      console.log("连接错误", event);
      // onError(event)
    };
    webSocket.onopen = function (event) {
      console.log('onopen', event)
      const PDFPath = url
      DoGWQ_StartSign(PDFPath, '', "0,1,450,500|1,1,450,500", 'test', 60)
    };
    webSocket.onclose = function (event) {
      console.log("服务不存在或者被关闭", event);
      //onClose(event);
    };

    webSocket.onmessage = function (event) {
      onMessage(event)
    };
  }

  function onMessage(event) {
    let ret = event.data;
    let obj = JSON.parse(ret);
    if (obj.type === 3) {
      if (obj.ret === 0) {
        OnAfterGWQ_StartSign(obj.ret, obj.SignPdfBase64, obj.SignNameBase64, obj.FingerPrintBase64, obj.XML);
        const name = 'd:\\' + moment().format('YYYYMMDDHHmmss') + 'ceshiBase64.pdf'
        Base64ToFile(obj.SignPdfBase64, name);
        //Base64ToFile(obj.SignNameBase64,"d:\\SignNameBase64.pdf");//签名单独图片
        //Base64ToFile(obj.FingerPrintBase64,"d:\\FingerPrintBase64.pdf");//指纹单独图片
      } else {
        OnAfterCall(obj.ret);
      }
    }
  }

  function DoGWQ_StartSign(PDFPath, XmlPath, mylocation, VoiceStr, timeout) {

    if (PDFPath === "") PDFPath = "D:\\test.pdf";
    if (myBrowser() === "IE") {
      // var ret = GWQ.DoGWQ_StartSign(PDFPath, XmlPath, mylocation, VoiceStr, timeout);
      //OnAfterCall(ret);
    } else {
      let json = {};
      json.PDFPath = PDFPath;
      json.XmlPath = XmlPath;
      json.Location = mylocation;
      json.Retain = VoiceStr;
      json.Timeout = timeout;
      json.type = 3;
      let jsonStr = JSON.stringify(json);
      webSocket.send(jsonStr);
    }
  }

  function OnAfterCall(ErrorCode) {
    if (ErrorCode === 0) {
      console.log("-成功");
    } else if (ErrorCode === -1) {
      console.log("传入参数错误");
    } else if (ErrorCode === -2) {
      console.log("超时");
    } else if (ErrorCode === -3) {
      console.log("打开设备失败");
    } else if (ErrorCode === -4) {
      console.log("写数据错误");
    } else if (ErrorCode === -5) {
      console.log("-读数据错误");
    } else if (ErrorCode === -6) {
      console.log("文件不存在或者为空");
    } else if (ErrorCode === -7) {
      console.log("设备返回错误信息");
    } else if (ErrorCode === -9) {
      console.log("取消操作");
    } else {
      console.log("传入空间太小，内存错误" + ErrorCode);
    }
  }

  function OnAfterGWQ_StartSign(ErrorCode, SignPdfBase64, SignNameBase64, FingerPrintBase64, MixBase64) {
    if (ErrorCode === 0) {
      GWQ_SetLineColor("000000");
      console.log("电子签名成功");
    } else if (ErrorCode === -9) {
      console.log("取消操作");
    } else {
      console.log("错误信息" + ErrorCode);
    }
  }

  function Base64ToFile(Base64, Filename) {
    if (myBrowser() === "IE") {
      // var ret = GWQ.Base64ToFile(Base64, Filename);
      //OnAfterCall(ret);
    } else {
      let json = {};
      json.type = 16;
      json.Base64 = Base64;
      json.Filename = Filename;
      let jsonStr = JSON.stringify(json);
      webSocket.send(jsonStr);
    }
  }


  function GWQ_SetLineColor(LineColor) {
    if (myBrowser() === "IE") {
      // var ret = GWQ.GWQ_SetLineColor(LineColor);
      // OnAfterCall(ret);
    } else {
      let json = {};
      json.type = GWQ_SetLineColorType;
      json.LineColor = LineColor;
      let jsonStr = JSON.stringify(json);
      webSocket.send(jsonStr);
    }
  }
}


