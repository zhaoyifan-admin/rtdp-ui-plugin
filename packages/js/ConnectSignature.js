import {PDFDocument, rgb} from 'pdf-lib';

import {connectWebSocket} from "./signature";

export async function connectSignature(pdfUrl) {
    try {
        // 加载本地 PDF 文件
        const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // 获取第一页或者创建一个新页
        const pages = pdfDoc.getPages();
        const firstPage = pages[0] || pdfDoc.addPage();

        // 在第一页上绘制文本
        firstPage.drawText('4630000001121407', {
            x: 400,
            y: 330,
            size: 12,
            color: rgb(0, 0, 0),
        });
        firstPage.drawText('231004198908040973', {
            x: 420,
            y: 300,
            size: 12,
            color: rgb(0, 0, 0),
        });

        // 保存修改后的 PDF
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], {type: 'application/pdf'});
        const url = URL.createObjectURL(blob);
        fetch(url)
            .then(response => response.blob())
            .then(fetchedBlob => {
                // 现在你有了实际的Blob对象
                const reader = new FileReader();
                reader.readAsDataURL(fetchedBlob);
                reader.onloadend = () => {
                    const base64String = reader.result; // 这里就是Base64编码的字符串
                    // console.log(base64String); // 可以在这里处理或者显示这个Base64字符串
                    const Base64Split = base64String.split(',')[1];
                    connectWebSocket(Base64Split)
                };
                // 你可以在这里进行进一步处理，例如上传或读取文件内容
            })
            .catch(error => console.error('Error fetching blob:', error));
        // const filePDF = new File([url], 'ceshi', { type:'application/pdf' })
        console.log(url)
        // window.open(url); // 打开包含更改的 PDF 文件
    } catch (error) {
        console.error('Error processing PDF:', error);
    }
}