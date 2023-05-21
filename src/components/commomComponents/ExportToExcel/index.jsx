import { Button } from 'antd';
import { read, utils, writeFile,writeFileXLSX  } from 'xlsx';
const ExportToExcel=({data,name})=>
{
   const handleExport =()=>
   {
    const t = data();
    if(data&&t.length>0)
    {
        const ws = utils.json_to_sheet(t);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, name+".xlsx");
    }
  
   }
    return<Button onClick={handleExport}>Export to excel</Button>
}
export default ExportToExcel