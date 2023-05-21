import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas';
const element2canvas =async(element)=>
{
    let canvasEle = null;
    var canvas  = await html2canvas(element)
    document.body.appendChild(canvas)
    return canvas;
}
const handleGeneratePdf=async(element)=>
{
    console.log({element})
    var canvas =await element2canvas(element)
    
}
export default handleGeneratePdf;