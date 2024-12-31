/*数据解密处理====center服务*/
/**截取字符串一部分*/
function GetSlice(str, start, end) {
    return str.slice(start, end)
}

/**16进制转10进制*/
function hex_to_dec(num) {
    return parseInt(num, 16)
}

/**为字符串插入字符*/
function insertStr(soure) {
    return soure.slice(0, 2) + ":" + soure.slice(2);
}

/**拼接字符串为一个数组*/
function str_to_array(start, end) {
    let Array = [];
    Array.push(start);
    Array.push(end);
    Array.join(",");
    return Array;
}

/**为字符串插入字符*/
function insertStrline(soure) {
    return soure.slice(0, 2) + "-" + soure.slice(2);
}

/**十六进制转换二进制*/
function hex_to_bin(str) {
    let hex_array = [{key: 0, val: "0000"}, {key: 1, val: "0001"}, {key: 2, val: "0010"}, {key: 3, val: "0011"}, {
        key: 4, val: "0100"
    }, {key: 5, val: "0101"}, {key: 6, val: "0110"}, {key: 7, val: "0111"}, {key: 8, val: "1000"}, {
        key: 9, val: "1001"
    }, {key: 'a', val: "1010"}, {key: 'b', val: "1011"}, {
        key: 'c', val: "1100"
    }, {key: 'd', val: "1101"}, {key: 'e', val: "1110"}, {key: 'f', val: "1111"}]

    let value = ""
    for (let i = 0; i < str.length; i++) {
        for (let j = 0; j < hex_array.length; j++) {
            if (str.charAt(i).toLowerCase() === hex_array[j].key) {
                value = value.concat(hex_array[j].val)
                break
            }
        }
    }
    return value
}

/** 10进制转16进制位 */
function dec_to_hex(data) {
    return Number(data).toString(16);
}

/**字符串长度不够补0(前补位)（N位）*/
function PrefixZero(num, N) {
    return (Array(N).join(num)).slice(-N);
}


/**等分字符串*/
export function groups(str) {
    let strArr = [];
    for (let i = 0; i < str.length; i += 40) {
        strArr.push(str.slice(i, i + 40))
    }
    return strArr;
}

/**字符串长度不够补0（2位）*/
function PrefixTwoZero(num) {
    return (Array(2).join(num)).slice(-2);
}

function hexCharCodeToStr(hexCharCodeStr) {
    const trimedStr = hexCharCodeStr.trim();
    const rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
    const len = rawStr.length;
    if (len % 2 !== 0) {
        alert("存在非法字符!");
        return "";
    }
    let curCharCode;
    const resultStr = [];
    for (let i = 0; i < len; i = i + 2) {
        curCharCode = parseInt(rawStr.substr(i, 2), 16);
        resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join("");
}

function anaData10(data) {
    let part10con = data.substring(2, data.length)
    let net = part10con.slice(2)
    let netlen = net.substring(0, 2)
    let netvalue = net.substring(2, net.length)
    let netlen10 = parseInt(netlen, 16)
    let gateway = netvalue.substring(0, netlen10 * 2)
    let port = netvalue.substring(gateway.length, netvalue.length)
    let portvalue = parseInt(port, 16)
    let gatewayvalue = hexCharCodeToStr(gateway)
    return {
        ipAddres: gatewayvalue,
        gateway: gatewayvalue,
        port: portvalue
    }
}


export function encryptionData(data) {
    if (typeof data === 'object') {
        let simpleData1 = data.filePart1;
        let simpleData2 = data.filePart2;
        let simpleData3 = data.filePart3;
        let simpleData4 = data.filePart4;
        let simpleData5 = data.filePart5;
        let simpleData6 = data.filePart6;
        let simpleData7 = data.filePart7;
        let simpleData8 = data.filePart8;
        let simpleData9 = data.filePart9;
        let simpleData10 = data.filePart10;
        let simpleData11 = data.filePart11;
        let simpleData12 = data.filePart12;
        let simpleData13 = data.filePart13;
        let simpleData14 = data.filePart14;
        let simpleData15 = data.filePart15;
        let simpleData16 = data.filePart16;

        let TabData1 = {};
        let TabData2 = {};
        let TabData3 = {};
        let TabData4 = {};
        let TabData5 = {};
        let TabData6 = [];
        let TabData7 = {};
        let TabData8 = {};
        let allTabData;
        let ArrayAllobject = [];
        console.log('===========>Enter data file 1 for decryption<==========')
        /**公司名称*/
        TabData1.deptName = data.deptName;
        TabData1.deptCode = data.deptCode;
        TabData1.deptNo = data.deptNo;
        /**路队名称*/
        TabData1.groupName = data.groupName;
        TabData1.groupCode = data.groupCode;
        TabData1.groupNo = data.groupNo;
        /**路队名称*/
        TabData1.lineName = data.lineName;
        TabData1.lineCode = data.lineCode;
        TabData1.lineNo = data.lineNo;
        /**生效日期*/
        TabData1.effectiveDate = GetSlice(simpleData1, 24, 32);
        console.log('===========>Data file 1 decryption completed<==========')
        console.log('===========>Enter data file 2 for decryption<==========')
        TabData2.deptCode = parseInt(GetSlice(simpleData1, 0, 8), 10);
        TabData2.groupCode = parseInt(GetSlice(simpleData1, 8, 16), 10);
        TabData2.lineCode = parseInt(GetSlice(simpleData1, 16, 24), 10);
        console.log('===========>Data file 2 decryption completed<==========')
        console.log('===========>Enter data file 3 for decryption<==========')
        /**区域  "031900 006400000000 000000000000000000000000 03e8 000007d0"*/
        TabData3.region = parseInt(GetSlice(simpleData4, 8, 9), 10);
        /**线路票制*/
        TabData3.lineticket = parseInt(GetSlice(simpleData4, 9, 10), 10);
        /**月票消费次数*/
        TabData3.monthly = hex_to_dec(GetSlice(simpleData4, 10, 12));
        /**空调月票消费次数*/
        TabData3.airmonthly = hex_to_dec(GetSlice(simpleData4, 12, 14));
        /**空调月票消费次数 数值为0时,防止操作失误 赋默认值为 1*/
        if (TabData3.airmonthly === 0) TabData3.airmonthly = 1;
        /**基本票价*/
        TabData3.benchmarkfare = hex_to_dec(GetSlice(simpleData3, 6, 10)) / 100;
        /**空调票价*/
        TabData3.conditioningfare = hex_to_dec(GetSlice(simpleData3, 10, 14)) / 100;
        /**夜间票价*/
        TabData3.nightfare = hex_to_dec(GetSlice(simpleData3, 14, 18)) / 100;
        /**优惠时间限制*/
        TabData3.discount = hex_to_dec(GetSlice(simpleData4, 6, 8));
        /**请年检天数*/
        TabData3.yearly = hex_to_dec(GetSlice(simpleData4, 20, 22));
        /**待播报最小金额*/
        TabData3.minmoney = hex_to_dec(GetSlice(simpleData4, 16, 20)) / 100;
        /**最大票价*/
        TabData3.quota = hex_to_dec(GetSlice(simpleData3, 46, 54)) / 100;
        /**岛式站台*/
        TabData3.platform = hex_to_dec(GetSlice(simpleData3, 40, 42));
        /**禁用 M1 卡*/
        TabData3.disabledMcard = hex_to_dec(GetSlice(simpleData4, 14, 16));
        /**最大票价 数值为0时,防止操作失误 赋默认值为 1*/
        if (TabData3.quota === 0) TabData3.quota = 25;
        console.log('===========>Data file 3 decryption completed<==========')
        console.log('===========>Enter data file 4 for decryption<==========')
        /**启用标志位*/
        let timeFlag = hex_to_bin(GetSlice(simpleData8, 6, 7));
        TabData4.peakcheck = parseInt(GetSlice(timeFlag, 0, 1), 10);
        TabData4.peakCoolcheck = parseInt(GetSlice(timeFlag, 1, 2), 10);
        TabData4.peakWarmcheck = parseInt(GetSlice(timeFlag, 2, 3), 10);
        TabData4.peakNightcheck = parseInt(GetSlice(timeFlag, 3, 4), 10);
        /**高峰*/
        TabData4.peakFirst = str_to_array(insertStr(GetSlice(simpleData8, 8, 12)), insertStr(GetSlice(simpleData8, 12, 16)));
        TabData4.peakSecond = str_to_array(insertStr(GetSlice(simpleData8, 16, 20)), insertStr(GetSlice(simpleData8, 20, 24)));
        TabData4.peakThird = str_to_array(insertStr(GetSlice(simpleData8, 24, 28)), insertStr(GetSlice(simpleData8, 28, 32)));
        TabData4.peakFourth = str_to_array(insertStr(GetSlice(simpleData8, 32, 36)), insertStr(GetSlice(simpleData8, 36, 40)));
        /**冷气*/
        let peakCool = str_to_array(insertStrline(GetSlice(simpleData8, 40, 44)), insertStrline(GetSlice(simpleData8, 44, 48)));
        if (peakCool.toString() === ['00-00', '00-00'].toString()) TabData4.peakCool = ""; else TabData4.peakCool = peakCool;

        /**暖气*/
        let peakWarm = str_to_array(insertStrline(GetSlice(simpleData8, 48, 52)), insertStrline(GetSlice(simpleData8, 52, 56)));
        if (peakWarm.toString() === ['00-00', '00-00'].toString()) TabData4.peakWarm = ""; else TabData4.peakWarm = peakWarm;

        /**夜间*/
        TabData4.peakNight = str_to_array(insertStr(GetSlice(simpleData8, 56, 60)), insertStr(GetSlice(simpleData8, 60, 64)));
        console.log('===========>Data file 4 decryption completed<==========')
        console.log('===========>Enter data file 5 for decryption<==========')
        /**钱包换乘权限*/
        let wallet = hex_to_bin(GetSlice(simpleData7, 6, 8));
        TabData5.walletLineAllowed = parseInt(GetSlice(wallet, 0, 1), 10);
        TabData5.walletVehiclesAllowed = parseInt(GetSlice(wallet, 1, 2), 10);
        TabData5.walletLineTimes = parseInt(GetSlice(wallet, 4, 8), 2);
        TabData5.publicTimes = hex_to_dec(GetSlice(simpleData3, 34, 36));
        TabData5.publicAmount = hex_to_dec(GetSlice(simpleData3, 36, 40));
        if (TabData5.walletLineTimes > 0 && TabData5.walletLineTimes < 10) {
            TabData5.walletLineTimesAllowed = 1
        } else {
            TabData5.walletLineTimes = ""
            TabData5.walletLineTimesAllowed = 0
            TabData5.walletLineNoTimes = "不限制次数"
        }
        if (TabData5.walletLineAllowed || TabData5.walletVehiclesAllowed || (TabData5.walletLineTimes > 0 && TabData5.walletLineTimes < 10)) TabData5.wallet = 1; else TabData5.wallet = 0;

        /**月票换乘权限*/
        let Monthly = hex_to_bin(GetSlice(simpleData7, 8, 10));
        TabData5.monthlyLineAllowed = parseInt(GetSlice(Monthly, 0, 1), 10);
        TabData5.monthlyVehiclesAllowed = parseInt(GetSlice(Monthly, 1, 2), 10);
        TabData5.monthlyLineTimes = parseInt(GetSlice(Monthly, 4, 8), 2);
        if (TabData5.monthlyLineTimes > 0 && TabData5.monthlyLineTimes < 10) {
            TabData5.monthlyLineTimesAllowed = 1
        } else {
            TabData5.monthlyLineTimes = ""
            TabData5.monthlyLineTimesAllowed = 0
            TabData5.monthlyLineNoTimes = "不限制次数"
        }
        if (TabData5.monthlyLineAllowed || TabData5.monthlyVehiclesAllowed || (TabData5.monthlyLineTimes > 0 && TabData5.monthlyLineTimes < 10)) TabData5.monthly = 1; else TabData5.monthly = 0;

        TabData5.seconds = hex_to_dec(GetSlice(simpleData7, 18, 22));
        TabData5.minTransfer = hex_to_dec(GetSlice(simpleData7, 10, 14));
        TabData5.maxTransfer = hex_to_dec(GetSlice(simpleData7, 14, 18));
        if (![undefined, null, ''].includes(data.transferRules)) {
            if (data.transferRules.walletLineTimes > 0) data.transferRules.walletLineTimesAllowed = 1; else data.transferRules.walletLineTimesAllowed = 0;
            if (data.transferRules.monthlyLineTimes > 0) data.transferRules.monthlyLineTimesAllowed = 1; else data.transferRules.monthlyLineTimesAllowed = 0;
            Object.assign(TabData5, data.transferRules)
        }
        console.log('===========>Data file 5 decryption completed<==========')
        console.log('===========>Enter data file 6 for decryption<==========')
        if (data.realCardTypeList && data.typeInfoNew)
            TabData6 = [...data.realCardTypeList, ...data.typeInfoNew];
        else if (data.realCardTypeList && !data.typeInfoNew)
            TabData6 = [...data.realCardTypeList];
        else if (!data.realCardTypeList && data.typeInfoNew)
            TabData6 = [...data.typeInfoNew];

        /**拼接返回的数据====等待分割等长的字段回显数据*/
        const simpleData2String = simpleData2.slice(6, 8) > 0 ? simpleData2.slice(8) : '';
        const simpleData5String = simpleData5.slice(6, 8) > 0 ? simpleData5.slice(8) : '';
        const simpleData6String = simpleData6.slice(6, 8) > 0 ? simpleData6.slice(8) : '';
        const simpleData11String = simpleData11.slice(6, 8) > 0 ? simpleData11.slice(8) : '';
        const simpleData12String = simpleData12.slice(6, 8) > 0 ? simpleData12.slice(8) : '';
        const simpleData13String = simpleData13.slice(6, 8) > 0 ? simpleData13.slice(8) : '';
        const simpleData14String = simpleData14.slice(6, 8) > 0 ? simpleData14.slice(8) : '';
        const simpleData15String = simpleData15.slice(6, 8) > 0 ? simpleData15.slice(8) : '';
        const simpleData16String = simpleData16.slice(6, 8) > 0 ? simpleData16.slice(8) : '';

        const validsimpleData2String = simpleData2String.slice(0, Number(simpleData2.slice(6, 8)) * 40);
        const validsimpleData5String = simpleData5String.slice(0, Number(simpleData5.slice(6, 8)) * 40);
        const validsimpleData6String = simpleData6String.slice(0, Number(simpleData6.slice(6, 8)) * 40);
        const validsimpleData11String = simpleData11String.slice(0, Number(simpleData11.slice(6, 8)) * 40);
        const validsimpleData12String = simpleData12String.slice(0, Number(simpleData12.slice(6, 8)) * 40);
        const validsimpleData13String = simpleData13String.slice(0, Number(simpleData13.slice(6, 8)) * 40);
        const validsimpleData14String = simpleData14String.slice(0, Number(simpleData14.slice(6, 8)) * 40);
        const validsimpleData15String = simpleData15String.slice(0, Number(simpleData15.slice(6, 8)) * 40);
        const validsimpleData16String = simpleData16String.slice(0, Number(simpleData16.slice(6, 8)) * 40);

        const resultString = validsimpleData2String + validsimpleData5String + validsimpleData6String + validsimpleData11String +
            validsimpleData12String + validsimpleData13String + validsimpleData14String + validsimpleData15String + validsimpleData16String;
        ArrayAllobject = groups(resultString)
        TabData6.forEach((item) => {
            /**截取发卡机构*/
            if ("cardTypeComplex" in item) {
                if (item.recType === 0) {
                    item.CardIssuer = "00";
                    item.CardTtc = item.CardIssuer + PrefixZero(dec_to_hex(item.cardType), 2) + PrefixZero(dec_to_hex(item.cardSubType), 2);
                } else {
                    item.CardIssuer = "00";
                    item.CardTtc = PrefixTwoZero(dec_to_hex(Number(item.recType))) + PrefixZero(dec_to_hex(item.cardType), 2) + PrefixZero(dec_to_hex(item.cardSubType), 2);
                }
            } else {
                item.CardIssuer = PrefixTwoZero(dec_to_hex(Number(item.value)));
                item.CardTtc = item.CardIssuer;
            }
            Object.assign(item, {
                wallet: 0,
                walletPeople: 0,
                month: 0,
                monthPeople: 0,
                change: 0,
                airwallet: 0,
                airmonth: 0,
                yearly: 0,
                exceed: 0,
                validity: 0,
                emcard: 0,
                pFeng: 100,
                gFeng: 100,
                pFengPeople: 100,
                gFengPeople: 100,
                discountType: 0,
                firstDiscount: 100,
                secondDiscount: 100,
                multiDiscount: 100,
                FoDiscount: 100,
                SiDiscount: 100,
                firstMoney: 0,
                secondMoney: 0,
                multiMoney: 0,
                air: 100,
                night: 100,
                Start: "00",
                End: "00"
            })
            ArrayAllobject.forEach((v) => {
                if (item.CardIssuer === '00') {
                    if (item.CardTtc === v.slice(0, 6)) {
                        Object.assign(item, {
                            cardTypeParam: v,
                            Permissionbit: hex_to_bin(GetSlice(v, 6, 10)), /**权限位*/
                            preferential: GetSlice(v, 10, 36), /**优惠参数*/
                            vuiceaddress: GetSlice(v, 36, 40).toLowerCase(), /**语音地址*/
                            discountType: hex_to_dec(GetSlice(v, 10, 36).slice(8, 10))
                        })
                        if (item.discountType) {
                            Object.assign(item, {
                                wallet: Number(item.Permissionbit.slice(0, 1)),
                                walletPeople: Number(item.Permissionbit.slice(1, 2)),
                                month: Number(item.Permissionbit.slice(2, 3)),
                                monthPeople: Number(item.Permissionbit.slice(3, 4)),
                                change: Number(item.Permissionbit.slice(4, 5)),
                                yearly: Number(item.Permissionbit.slice(5, 6)),
                                exceed: Number(item.Permissionbit.slice(6, 7)),
                                validity: Number(item.Permissionbit.slice(7, 8)),
                                emcard: Number(item.Permissionbit.slice(8, 9)),
                                airwallet: Number(item.Permissionbit.slice(9, 10)),
                                airmonth: Number(item.Permissionbit.slice(10, 11)),
                                pFeng: hex_to_dec(item.preferential.slice(0, 2)),
                                pFengPeople: hex_to_dec(item.preferential.slice(2, 4)),
                                gFeng: hex_to_dec(item.preferential.slice(4, 6)),
                                gFengPeople: hex_to_dec(item.preferential.slice(6, 8)),
                                discountType: hex_to_dec(item.preferential.slice(8, 10)),
                                firstDiscount: 0,
                                secondDiscount: 0,
                                multiDiscount: 0,
                                air: hex_to_dec(item.preferential.slice(16, 18)),
                                night: hex_to_dec(item.preferential.slice(18, 20)),
                                firstMoney: hex_to_dec(item.preferential.slice(10, 12)),
                                secondMoney: hex_to_dec(item.preferential.slice(12, 14)),
                                multiMoney: hex_to_dec(item.preferential.slice(14, 16)),
                                Start: item.vuiceaddress.slice(0, 2),
                                End: item.vuiceaddress.slice(2, 4)
                            })
                        } else {
                            Object.assign(item, {
                                wallet: Number(item.Permissionbit.slice(0, 1)),
                                walletPeople: Number(item.Permissionbit.slice(1, 2)),
                                month: Number(item.Permissionbit.slice(2, 3)),
                                monthPeople: Number(item.Permissionbit.slice(3, 4)),
                                change: Number(item.Permissionbit.slice(4, 5)),
                                yearly: Number(item.Permissionbit.slice(5, 6)),
                                exceed: Number(item.Permissionbit.slice(6, 7)),
                                validity: Number(item.Permissionbit.slice(7, 8)),
                                emcard: Number(item.Permissionbit.slice(8, 9)),
                                airwallet: Number(item.Permissionbit.slice(9, 10)),
                                airmonth: Number(item.Permissionbit.slice(10, 11)),
                                pFeng: hex_to_dec(item.preferential.slice(0, 2)),
                                pFengPeople: hex_to_dec(item.preferential.slice(2, 4)),
                                gFeng: hex_to_dec(item.preferential.slice(4, 6)),
                                gFengPeople: hex_to_dec(item.preferential.slice(6, 8)),
                                discountType: hex_to_dec(item.preferential.slice(8, 10)),
                                firstDiscount: hex_to_dec(item.preferential.slice(10, 12)),
                                secondDiscount: hex_to_dec(item.preferential.slice(12, 14)),
                                multiDiscount: hex_to_dec(item.preferential.slice(14, 16)),
                                air: hex_to_dec(item.preferential.slice(16, 18)),
                                night: hex_to_dec(item.preferential.slice(18, 20)),
                                firstMoney: 0,
                                secondMoney: 0,
                                multiMoney: 0,
                                Start: item.vuiceaddress.slice(0, 2),
                                End: item.vuiceaddress.slice(2, 4)
                            })
                        }
                    }
                } else {
                    if (item.CardTtc === v.slice(0, 2)) {
                        Object.assign(item, {
                            Permissionbit: hex_to_bin(GetSlice(v, 6, 10)), /**权限位*/
                            preferential: GetSlice(v, 10, 36), /**优惠参数*/
                            vuiceaddress: GetSlice(v, 36, 40).toLowerCase(), /**语音地址*/
                            discountType: hex_to_dec(GetSlice(v, 10, 36).slice(8, 10))
                        })
                        if (item.discountType) {
                            Object.assign(item, {
                                wallet: Number(item.Permissionbit.slice(0, 1)),
                                walletPeople: Number(item.Permissionbit.slice(1, 2)),
                                month: Number(item.Permissionbit.slice(2, 3)),
                                monthPeople: Number(item.Permissionbit.slice(3, 4)),
                                change: Number(item.Permissionbit.slice(4, 5)),
                                yearly: Number(item.Permissionbit.slice(5, 6)),
                                exceed: Number(item.Permissionbit.slice(6, 7)),
                                validity: Number(item.Permissionbit.slice(7, 8)),
                                emcard: Number(item.Permissionbit.slice(8, 9)),
                                airwallet: Number(item.Permissionbit.slice(9, 10)),
                                airmonth: Number(item.Permissionbit.slice(10, 11)),
                                pFeng: hex_to_dec(item.preferential.slice(0, 2)),
                                pFengPeople: hex_to_dec(item.preferential.slice(2, 4)),
                                gFeng: hex_to_dec(item.preferential.slice(4, 6)),
                                gFengPeople: hex_to_dec(item.preferential.slice(6, 8)),
                                discountType: hex_to_dec(item.preferential.slice(8, 10)),
                                firstDiscount: 0,
                                secondDiscount: 0,
                                multiDiscount: 0,
                                air: hex_to_dec(item.preferential.slice(16, 18)),
                                night: hex_to_dec(item.preferential.slice(18, 20)),
                                firstMoney: hex_to_dec(item.preferential.slice(10, 12)),
                                secondMoney: hex_to_dec(item.preferential.slice(12, 14)),
                                multiMoney: hex_to_dec(item.preferential.slice(14, 16)),
                                Start: item.vuiceaddress.slice(0, 2),
                                End: item.vuiceaddress.slice(2, 4)
                            })
                        } else {
                            Object.assign(item, {
                                wallet: Number(item.Permissionbit.slice(0, 1)),
                                walletPeople: Number(item.Permissionbit.slice(1, 2)),
                                month: Number(item.Permissionbit.slice(2, 3)),
                                monthPeople: Number(item.Permissionbit.slice(3, 4)),
                                change: Number(item.Permissionbit.slice(4, 5)),
                                yearly: Number(item.Permissionbit.slice(5, 6)),
                                exceed: Number(item.Permissionbit.slice(6, 7)),
                                validity: Number(item.Permissionbit.slice(7, 8)),
                                emcard: Number(item.Permissionbit.slice(8, 9)),
                                airwallet: Number(item.Permissionbit.slice(9, 10)),
                                airmonth: Number(item.Permissionbit.slice(10, 11)),
                                pFeng: hex_to_dec(item.preferential.slice(0, 2)),
                                pFengPeople: hex_to_dec(item.preferential.slice(2, 4)),
                                gFeng: hex_to_dec(item.preferential.slice(4, 6)),
                                gFengPeople: hex_to_dec(item.preferential.slice(6, 8)),
                                discountType: hex_to_dec(item.preferential.slice(8, 10)),
                                firstDiscount: hex_to_dec(item.preferential.slice(10, 12)),
                                secondDiscount: hex_to_dec(item.preferential.slice(12, 14)),
                                multiDiscount: hex_to_dec(item.preferential.slice(14, 16)),
                                air: hex_to_dec(item.preferential.slice(16, 18)),
                                night: hex_to_dec(item.preferential.slice(18, 20)),
                                firstMoney: 0,
                                secondMoney: 0,
                                multiMoney: 0,
                                Start: item.vuiceaddress.slice(0, 2),
                                End: item.vuiceaddress.slice(2, 4)
                            })
                        }
                    }
                }
            });

            if (!['', null, undefined].includes(data.transferSettingList)) {
                data.transferSettingList.forEach((setItem) => {
                    if (setItem.cardSubType === item.cardSubType && setItem.cardType === item.cardType) {
                        if (setItem.discountType) {
                            setItem.firstDiscount = 100;
                            setItem.secondDiscount = 100;
                            setItem.multiDiscount = 100;
                            setItem.firstMoney = setItem.firstMoney * 100;
                            setItem.secondMoney = setItem.secondMoney * 100;
                            setItem.multiMoney = setItem.multiMoney * 100;
                        } else {
                            setItem.firstDiscount = setItem.firstDiscount * 100;
                            setItem.secondDiscount = setItem.secondDiscount * 100;
                            setItem.multiDiscount = setItem.multiDiscount * 100;
                            setItem.firstMoney = 0;
                            setItem.secondMoney = 0;
                            setItem.multiMoney = 0;
                        }
                        Object.assign(item, setItem);
                    }
                })
            }
        });
        console.log('===========>Data file 6 decryption completed<==========')
        console.log('===========>Enter data file 7 for decryption<==========')
        TabData7.apnandvpn = data.apnVpnFlag;
        TabData7.apnorvpn = data.apnVpn;
        TabData7.username = data.user;
        TabData7.password = data.passWord;
        let filePart10 = simpleData10.slice(2);
        let part10Data = anaData10(filePart10);// ipAddres
        TabData7.ipAddres = part10Data.ipAddres;
        TabData7.IPaddress = part10Data.gateway;
        TabData7.portNumber = part10Data.port;
        if (!['', undefined, null].includes(data.note)) TabData7.remark = data.note;
        console.log('===========>Data file 7 decryption completed<==========')
        console.log('===========>Enter data file 8 for decryption<==========')
        TabData8.fareSchemeName = data.fareSchemeName;
        TabData8.fareSchemeNote = data.fareSchemeNote;
        console.log('===========>Data file 8 decryption completed<==========')
        allTabData = {
            TabData1: TabData1,
            TabData2: TabData2,
            TabData3: TabData3,
            TabData4: TabData4,
            TabData5: TabData5,
            TabData6: TabData6,
            TabData7: TabData7,
            TabData8: TabData8,
        }
        return allTabData;
    } else {
        console.log('===========>Data decryption processing failed<==========')
    }
}