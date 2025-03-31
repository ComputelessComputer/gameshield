import {forwardRef,useRef,useImperativeHandle,useEffect,useState,useCallback}from'react';import {createGameShield}from'@gameshield/core';import {jsx}from'react/jsx-runtime';var M=forwardRef(function({gameType:o="random",size:e="400px",difficulty:a="medium",onSuccess:t,onFailure:u,onTimeout:n,className:d,style:l},m){let i=useRef(null),r=useRef(null),c=typeof e=="number"?`${e}px`:e;return useImperativeHandle(m,()=>({reset:()=>{r.current&&r.current.reset();}})),useEffect(()=>{if(i.current)return r.current=createGameShield({container:i.current,gameType:o,size:e,difficulty:a,onSuccess:t,onFailure:u,onTimeout:n}),()=>{r.current&&(r.current.destroy(),r.current=null);}},[o,e,a,t,u,n]),jsx("div",{className:`gameshield-container ${d||""}`,style:{width:c,maxWidth:"500px",aspectRatio:"1/1",position:"relative",overflow:"hidden",borderRadius:"8px",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)",...l},children:jsx("div",{ref:i,className:"gameshield-content aspect-square",style:{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#1a1a1a"}})})});function W(g={}){let o=useRef(null),e=useRef(null),[a,t]=useState(false),[u,n]=useState(false),[d,l]=useState(null),[m,i]=useState(null),{gameType:r="random",size:c="400px",difficulty:y="medium",onSuccess:p,onFailure:h,onTimeout:S}=g,x=useCallback(()=>{t(true),n(false),l(null),i(null),e.current&&e.current.reset();},[]);return useEffect(()=>{if(!o.current)return;t(true),n(false),l(null),i(null);let b=s=>{t(false),n(true),l(s),p&&p(s);},T=s=>{t(false),n(false),i(s),h&&h(s);},V=()=>{t(false),n(false),i("Verification timed out"),S&&S();};return e.current=createGameShield({container:o.current,gameType:r,size:c,difficulty:y,onSuccess:b,onFailure:T,onTimeout:V}),()=>{e.current&&(e.current.destroy(),e.current=null);}},[r,c,y,p,h,S]),{ref:o,isVerifying:a,isVerified:u,token:d,error:m,reset:x}}export{M as GameShield,W as useGameShield};//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map