const GroupBy=(arr,con)=>
{
 const temp=    arr.reduce((x,y)=>
    {
        const id = y[con]?.trim();
        if(!x[id])
        {
          x[id] = [];
        }
        x[id]?.push(y)
        return x;
    },{})
    return temp;
}
export default GroupBy