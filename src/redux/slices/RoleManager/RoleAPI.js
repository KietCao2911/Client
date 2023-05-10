import * as Method from "~/axiosRequest/request";
export const GetRoles =async()=>
{
    try{
        const res = await Method.Get("/api/admin/Role/");
        return res;
    }catch(err)
    {
        throw err
    }
}
export const GetRolesGroup =async()=>
{
    try{
        const res = await Method.Get("/api/admin/Role/GetRolesGroup");
        return res;
    }catch(err)
    {
        throw err
    }
}
export const getStaffs =async()=>
{
    try{
        const res = await Method.Get("/api/admin/Role/GetUsers");
        return res;
    }catch(err)
    {
        throw err
    }
}
export const GetOneStaff =async(id)=>
{
    try{
        const res = await Method.Get("/api/admin/Staff/"+id);
        return res;
    }catch(err)
    {
        throw err
    }
}
export const PostRole =async(body)=>
{
    try{
        const res = await Method.Post("/api/admin/Role/",body);
        return res;
    }catch(err)
    {
        throw err
    }
}
export const PostRoleGroup =async(body)=>
{
    try{
        const res = await Method.Post("/api/admin/Role/PostRoleGroup",body);
        return res;
    }catch(err)
    {
        throw err
    }
}
export const PutRole =async(body)=>
{
    try{
        const res = await Method.Put("/api/admin/Role/",body);
        return res;
    }catch(err)
    {
        throw err
    }
}
export const ChangeRoles =async(body)=>
{
    try{
        const res = await Method.Put("/api/admin/Role/ChangeRoles",body);
        return res;
    }catch(err)
    {
        throw err
    }
}