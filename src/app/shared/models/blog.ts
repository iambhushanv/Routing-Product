
export interface Iblog {
    title : string
    body : string
    userId : string
    id : string
}

export interface IblogRes{
    [key: string] : Iblog
}