const t=r=>({ok:!0,value:r}),o=r=>({error:r,ok:!1}),a=()=>({_t:"infra"}),n=async r=>{try{return t(await r())}catch{return o(a())}};export{o as e,t as o,n as w};
