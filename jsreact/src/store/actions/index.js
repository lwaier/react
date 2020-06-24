export const SETNAME = "setName"; //修改存储在state里面的name
export function setName ({name}){
    return {
        type:SETNAME,
        name,
    }
}