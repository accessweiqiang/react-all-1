// @flow

type a = {
    name:string
}

function sayname(name?:a){
    return name;
}

sayname({name:""})