import React, { useState, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";

const DAILY = [
  { date:"2026-03-01",d:"Mar 1",site:356,ctrl:356,pv:428,fv:335,clk:3,scr:57,form:1,vid:0,gscClk:9,gscImp:12177 },
  { date:"2026-03-02",d:"Mar 2",site:684,ctrl:683,pv:805,fv:628,clk:5,scr:41,form:0,vid:0,gscClk:54,gscImp:19123 },
  { date:"2026-03-03",d:"Mar 3",site:728,ctrl:726,pv:867,fv:672,clk:9,scr:38,form:3,vid:0,gscClk:140,gscImp:16428 },
  { date:"2026-03-04",d:"Mar 4",site:906,ctrl:901,pv:1002,fv:836,clk:8,scr:36,form:3,vid:0,gscClk:122,gscImp:20483 },
  { date:"2026-03-05",d:"Mar 5",site:311,ctrl:311,pv:373,fv:258,clk:2,scr:13,form:0,vid:0,gscClk:84,gscImp:19607 },
  { date:"2026-03-06",d:"Mar 6",site:98,ctrl:98,pv:117,fv:71,clk:2,scr:13,form:1,vid:0,gscClk:85,gscImp:21309 },
  { date:"2026-03-07",d:"Mar 7",site:117,ctrl:115,pv:120,fv:102,clk:1,scr:1,form:0,vid:0,gscClk:27,gscImp:10556 },
  { date:"2026-03-08",d:"Mar 8",site:584,ctrl:584,pv:710,fv:573,clk:1,scr:35,form:0,vid:0,gscClk:22,gscImp:12460 },
  { date:"2026-03-09",d:"Mar 9",site:111,ctrl:107,pv:156,fv:61,clk:6,scr:21,form:0,vid:0,gscClk:69,gscImp:16877 },
  { date:"2026-03-10",d:"Mar 10",site:181,ctrl:176,pv:213,fv:147,clk:12,scr:17,form:1,vid:0,gscClk:86,gscImp:8131 },
  { date:"2026-03-11",d:"Mar 11",site:351,ctrl:327,pv:369,fv:288,clk:14,scr:25,form:0,vid:1,gscClk:94,gscImp:7151 },
  { date:"2026-03-12",d:"Mar 12",site:400,ctrl:393,pv:434,fv:369,clk:10,scr:25,form:2,vid:1,gscClk:83,gscImp:12767 },
  { date:"2026-03-13",d:"Mar 13",site:350,ctrl:345,pv:381,fv:319,clk:4,scr:14,form:0,vid:1,gscClk:52,gscImp:10184 },
  { date:"2026-03-14",d:"Mar 14",site:55,ctrl:55,pv:79,fv:44,clk:3,scr:3,form:0,vid:0,gscClk:13,gscImp:5859 },
  { date:"2026-03-15",d:"Mar 15",site:46,ctrl:46,pv:57,fv:39,clk:1,scr:7,form:0,vid:0,gscClk:12,gscImp:7734 },
  { date:"2026-03-16",d:"Mar 16",site:333,ctrl:330,pv:566,fv:304,clk:12,scr:62,form:0,vid:15,gscClk:69,gscImp:11915 },
  { date:"2026-03-17",d:"Mar 17",site:2678,ctrl:2665,pv:3520,fv:2560,clk:40,scr:258,form:4,vid:15,gscClk:77,gscImp:9364 },
  { date:"2026-03-18",d:"Mar 18",site:3103,ctrl:3097,pv:3827,fv:2813,clk:14,scr:205,form:1,vid:6,gscClk:83,gscImp:19423 },
  { date:"2026-03-19",d:"Mar 19",site:1189,ctrl:1186,pv:1448,fv:1026,clk:11,scr:49,form:1,vid:2,gscClk:70,gscImp:18697 },
  { date:"2026-03-20",d:"Mar 20",site:1574,ctrl:1573,pv:1966,fv:1405,clk:10,scr:59,form:0,vid:0,gscClk:69,gscImp:17702 },
  { date:"2026-03-21",d:"Mar 21",site:235,ctrl:234,pv:270,fv:167,clk:3,scr:9,form:1,vid:0,gscClk:33,gscImp:13229 },
  { date:"2026-03-22",d:"Mar 22",site:101,ctrl:100,pv:113,fv:60,clk:6,scr:6,form:0,vid:0,gscClk:48,gscImp:16681 },
  { date:"2026-03-23",d:"Mar 23",site:2722,ctrl:2719,pv:3386,fv:2527,clk:16,scr:96,form:0,vid:3,gscClk:108,gscImp:22663 },
  { date:"2026-03-24",d:"Mar 24",site:371,ctrl:364,pv:431,fv:244,clk:10,scr:28,form:2,vid:0,gscClk:93,gscImp:22762 },
  { date:"2026-03-25",d:"Mar 25",site:263,ctrl:261,pv:359,fv:195,clk:7,scr:13,form:0,vid:0,gscClk:90,gscImp:25940 },
  { date:"2026-03-26",d:"Mar 26",site:129,ctrl:127,pv:139,fv:85,clk:6,scr:13,form:0,vid:0,gscClk:84,gscImp:27706 },
  { date:"2026-03-27",d:"Mar 27",site:151,ctrl:145,pv:187,fv:108,clk:12,scr:14,form:0,vid:0,gscClk:60,gscImp:26858 },
  { date:"2026-03-28",d:"Mar 28",site:94,ctrl:94,pv:110,fv:72,clk:6,scr:10,form:0,vid:1,gscClk:38,gscImp:16797 },
  { date:"2026-03-29",d:"Mar 29",site:201,ctrl:200,pv:242,fv:175,clk:4,scr:14,form:0,vid:0,gscClk:31,gscImp:18183 },
  { date:"2026-03-30",d:"Mar 30",site:345,ctrl:329,pv:414,fv:279,clk:11,scr:21,form:2,vid:1,gscClk:63,gscImp:26005 },
  { date:"2026-03-31",d:"Mar 31",site:209,ctrl:206,pv:252,fv:178,clk:10,scr:15,form:0,vid:0,gscClk:80,gscImp:21343 },
];

const C = { navy:"#1B2A4A",coral:"#E8604C",coralLt:"#F0816F",orange:"#F4A259",teal:"#3A8F8B",tealLt:"#4DB0AC",cream:"#FAF7F2",warm:"#E8E3DC",white:"#FFF",dk:"#1B2A4A",mid:"#5A6578",lt:"#8A92A0",grn:"#4CAF50",red:"#E84C4C",purp:"#7B61FF" };
const CH = [C.coral,C.teal,C.orange,C.navy,C.purp,C.tealLt,C.coralLt,"#C4A35A"];

const Tip = ({active,payload,label})=>{
  if(!active||!payload?.length)return null;
  return <div style={{background:C.navy,borderRadius:8,padding:"10px 14px",boxShadow:"0 4px 20px rgba(0,0,0,.2)"}}>
    <div style={{color:C.warm,fontSize:11,fontWeight:600,marginBottom:6}}>{label}</div>
    {payload.map((p,i)=><div key={i} style={{color:"#fff",fontSize:12,display:"flex",gap:6,alignItems:"center",marginBottom:2}}>
      <span style={{width:7,height:7,borderRadius:4,background:p.color,display:"inline-block",flexShrink:0}}/>
      {p.name}: <strong>{typeof p.value==="number"?p.value.toLocaleString():p.value}</strong>
    </div>)}
  </div>;
};

const Card = ({label,value,sub,icon,color=C.navy,accent})=>(
  <div style={{background:C.white,borderRadius:12,padding:"16px 18px",border:`1px solid ${C.warm}`,position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:color}}/>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div>
        <div style={{fontSize:10,fontWeight:600,color:C.lt,textTransform:"uppercase",letterSpacing:".06em",marginBottom:3}}>{label}</div>
        <div style={{fontSize:26,fontWeight:700,color:C.dk,fontFamily:"serif",lineHeight:1.1}}>{typeof value==="number"?value.toLocaleString():value}</div>
        {sub&&<div style={{fontSize:11,color:accent||C.mid,marginTop:3,fontWeight:500}}>{sub}</div>}
      </div>
      {icon&&<span style={{fontSize:22,opacity:.7}}>{icon}</span>}
    </div>
  </div>
);

const Hdr = ({title,sub,icon,src})=>(
  <div style={{marginBottom:14,marginTop:6}}>
    <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
      {icon&&<span style={{fontSize:18}}>{icon}</span>}
      <h2 style={{fontSize:17,fontWeight:700,color:C.navy,margin:0}}>{title}</h2>
      {src&&<span style={{background:src==="GA4"?"#FFF3E0":src==="Clarity"?"#E3F2FD":"#F3E5F5",color:src==="GA4"?"#E65100":src==="Clarity"?"#1565C0":"#6A1B9A",fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:3,textTransform:"uppercase",letterSpacing:".04em"}}>{src}</span>}
    </div>
    {sub&&<p style={{fontSize:12,color:C.mid,margin:"3px 0 0",lineHeight:1.4}}>{sub}</p>}
  </div>
);

const Note = ({type="info",children})=>{
  const s={info:{bg:"#E8F5E9",b:"#A5D6A7",i:"✅"},warn:{bg:"#FFF8E1",b:"#FFE082",i:"⚠️"},crit:{bg:"#FFEBEE",b:"#EF9A9A",i:"🚨"},tip:{bg:"#E3F2FD",b:"#90CAF9",i:"💡"}};
  const v=s[type]||s.info;
  return <div style={{background:v.bg,border:`1px solid ${v.b}`,borderRadius:8,padding:"10px 14px",fontSize:12,color:C.dk,lineHeight:1.5,display:"flex",gap:8,alignItems:"flex-start",marginTop:12}}>
    <span style={{flexShrink:0}}>{v.i}</span><div>{children}</div>
  </div>;
};

const PBar = ({label,value,max,color=C.coral})=>(
  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
    <div style={{fontSize:11,color:C.dk,fontWeight:500,width:200,flexShrink:0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{label}</div>
    <div style={{flex:1,height:7,background:C.warm,borderRadius:4,overflow:"hidden"}}>
      <div style={{width:`${Math.min((value/max)*100,100)}%`,height:"100%",background:color,borderRadius:4}}/>
    </div>
    <div style={{fontSize:11,color:C.mid,fontWeight:600,minWidth:50,textAlign:"right"}}>{value.toLocaleString()}</div>
  </div>
);

export default function Dashboard() {
  const [tab,setTab] = useState("overview");
  const [phase,setPhase] = useState("all");

  const phases = [
    {id:"all",label:"Full Month",range:"Mar 1–31",color:C.navy,icon:"📅"},
    {id:"pre",label:"Pre-Launch",range:"Mar 1–16",color:C.orange,icon:"⏳"},
    {id:"launch",label:"Launch Week",range:"Mar 17–22",color:C.coral,icon:"🚀"},
    {id:"post",label:"Post-Launch",range:"Mar 23–31",color:C.teal,icon:"🔄"},
  ];

  const filtered = useMemo(()=>{
    if(phase==="all") return DAILY;
    if(phase==="pre") return DAILY.filter(d=>d.date<="2026-03-16");
    if(phase==="launch") return DAILY.filter(d=>d.date>="2026-03-17"&&d.date<="2026-03-22");
    return DAILY.filter(d=>d.date>="2026-03-23");
  },[phase]);

  const tot = useMemo(()=>{
    const f=filtered;
    return {
      sessions:f.reduce((s,d)=>s+d.site,0),ctrl:f.reduce((s,d)=>s+d.ctrl,0),pv:f.reduce((s,d)=>s+d.pv,0),
      fv:f.reduce((s,d)=>s+d.fv,0),clk:f.reduce((s,d)=>s+d.clk,0),scr:f.reduce((s,d)=>s+d.scr,0),
      form:f.reduce((s,d)=>s+d.form,0),vid:f.reduce((s,d)=>s+d.vid,0),
      gscClk:f.reduce((s,d)=>s+d.gscClk,0),gscImp:f.reduce((s,d)=>s+d.gscImp,0),
    };
  },[filtered]);

  const phaseData = useMemo(()=>{
    const calc = (arr)=>({
      sessions:arr.reduce((s,d)=>s+d.site,0),ctrl:arr.reduce((s,d)=>s+d.ctrl,0),
      days:arr.length,dailyAvg:Math.round(arr.reduce((s,d)=>s+d.ctrl,0)/arr.length),
      clk:arr.reduce((s,d)=>s+d.clk,0),scr:arr.reduce((s,d)=>s+d.scr,0),
      form:arr.reduce((s,d)=>s+d.form,0),vid:arr.reduce((s,d)=>s+d.vid,0),
      fv:arr.reduce((s,d)=>s+d.fv,0),
    });
    return {
      pre: calc(DAILY.filter(d=>d.date<="2026-03-16")),
      launch: calc(DAILY.filter(d=>d.date>="2026-03-17"&&d.date<="2026-03-22")),
      post: calc(DAILY.filter(d=>d.date>="2026-03-23")),
    };
  },[]);

  const tabs = [
    {id:"overview",label:"Overview",icon:"📊"},{id:"control",label:"CONTROL Page",icon:"📖"},
    {id:"channels",label:"Channels",icon:"🔀"},{id:"search",label:"Search (GSC)",icon:"🔍"},
    {id:"clicks",label:"Clicks & UX",icon:"🎯"},{id:"tour",label:"Tour & Podcast",icon:"🎙️"},
  ];

  const renderOverview = ()=>(
    <>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
        {phases.map(p=><button key={p.id} onClick={()=>setPhase(p.id)} style={{
          display:"inline-flex",alignItems:"center",gap:5,padding:"7px 14px",borderRadius:8,
          border:`2px solid ${p.color}`,background:phase===p.id?p.color:"transparent",
          color:phase===p.id?"#fff":p.color,fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"inherit",transition:"all .2s"
        }}><span>{p.icon}</span>{p.label}<span style={{opacity:.7,fontSize:10}}>({p.range})</span></button>)}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:10,marginBottom:22}}>
        <Card label="Total Sessions" value={tot.sessions} sub={`${filtered.length} days`} icon="👥" color={C.navy}/>
        <Card label="/control/ Sessions" value={tot.ctrl} sub={`${(tot.ctrl/tot.sessions*100).toFixed(1)}% of total`} icon="📖" color={C.coral} accent={C.coral}/>
        <Card label="GA4 Click Events" value={tot.clk} sub="on /control/" icon="🖱️" color={C.orange}/>
        <Card label="Scroll Events" value={tot.scr} sub="on /control/" icon="📜" color={C.teal}/>
        <Card label="Form Submits" value={tot.form} sub="Free chapter signups" icon="📝" color={C.purp}/>
        <Card label="GSC Clicks" value={tot.gscClk} sub={`${(tot.gscClk/tot.gscImp*100).toFixed(2)}% CTR`} icon="🔍" color={C.grn}/>
      </div>

      <Hdr title="Daily Sessions — Site vs. /control/" sub="The CONTROL page captured the vast majority of all site traffic throughout March" icon="📈" src="GA4"/>
      <div style={{background:C.white,borderRadius:12,border:`1px solid ${C.warm}`,padding:"18px 14px 8px"}}>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={DAILY} margin={{top:5,right:10,left:0,bottom:5}}>
            <defs>
              <linearGradient id="gS" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.navy} stopOpacity={.25}/><stop offset="100%" stopColor={C.navy} stopOpacity={.02}/></linearGradient>
              <linearGradient id="gC" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.coral} stopOpacity={.2}/><stop offset="100%" stopColor={C.coral} stopOpacity={.02}/></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.warm}/>
            <XAxis dataKey="d" tick={{fontSize:10,fill:C.lt}} interval={2}/>
            <YAxis tick={{fontSize:10,fill:C.lt}}/>
            <Tooltip content={<Tip/>}/>
            <Legend wrapperStyle={{fontSize:11}}/>
            <ReferenceLine x="Mar 17" stroke={C.coral} strokeDasharray="4 4" label={{value:"🚀 Launch",fontSize:10,fill:C.coral}}/>
            <ReferenceLine x="Mar 23" stroke={C.teal} strokeDasharray="4 4" label={{value:"🔄 Post",fontSize:10,fill:C.teal}}/>
            <Area type="monotone" dataKey="site" name="Site Sessions" stroke={C.navy} fill="url(#gS)" strokeWidth={2} dot={false}/>
            <Area type="monotone" dataKey="ctrl" name="/control/ Sessions" stroke={C.coral} fill="url(#gC)" strokeWidth={2} dot={false}/>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <Note type="tip"><strong>Key pattern:</strong> Traffic came in waves driven by LinkedIn campaign pushes.</Note>

      <Hdr title="Phase-over-Phase Performance" sub="Comparing the three campaign phases for the CONTROL page" icon="🔄" src="GA4"/>
      <div style={{background:C.white,borderRadius:12,border:`1px solid ${C.warm}`,padding:18,overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"separate",borderSpacing:0,fontSize:12}}>
          <thead><tr>{["Metric","Pre-Launch (Mar 1–16)","Launch Week (Mar 17–22)","Δ vs Pre","Post-Launch (Mar 23–31)","Δ vs Launch"].map((h,i)=>
            <th key={i} style={{padding:"8px 12px",textAlign:i?'center':'left',borderBottom:`2px solid ${C.warm}`,color:C.mid,fontWeight:600,fontSize:10,textTransform:"uppercase",letterSpacing:".04em"}}>{h}</th>
          )}</tr></thead>
          <tbody>{[
            {m:"/control/ Sessions",pre:phaseData.pre.ctrl,launch:phaseData.launch.ctrl,post:phaseData.post.ctrl},
            {m:"Daily Average",pre:phaseData.pre.dailyAvg,launch:phaseData.launch.dailyAvg,post:phaseData.post.dailyAvg},
            {m:"Click Events",pre:phaseData.pre.clk,launch:phaseData.launch.clk,post:phaseData.post.clk},
            {m:"Scroll Events",pre:phaseData.pre.scr,launch:phaseData.launch.scr,post:phaseData.post.scr},
            {m:"Form Submissions",pre:phaseData.pre.form,launch:phaseData.launch.form,post:phaseData.post.form},
            {m:"Video Starts",pre:phaseData.pre.vid,launch:phaseData.launch.vid,post:phaseData.post.vid},
            {m:"First Visits",pre:phaseData.pre.fv,launch:phaseData.launch.fv,post:phaseData.post.fv},
          ].map((r,i)=>{
            const pN=typeof r.pre==="number"?r.pre:null;const lN=typeof r.launch==="number"?r.launch:null;const poN=typeof r.post==="number"?r.post:null;
            const d1=pN&&pN>0?Math.round((lN-pN)/pN*100):null;const d2=lN&&lN>0?Math.round((poN-lN)/lN*100):null;
            return <tr key={i} style={{background:i%2===0?C.cream:C.white}}>
              <td style={{padding:"8px 12px",fontWeight:600,color:C.dk}}>{r.m}</td>
              <td style={{padding:"8px 12px",textAlign:"center"}}>{typeof r.pre==="number"?r.pre.toLocaleString():r.pre}</td>
              <td style={{padding:"8px 12px",textAlign:"center",fontWeight:700,color:C.coral}}>{typeof r.launch==="number"?r.launch.toLocaleString():r.launch}</td>
              <td style={{padding:"8px 12px",textAlign:"center",fontWeight:600,color:d1>0?C.grn:d1<0?C.red:C.mid}}>{d1!==null?`${d1>0?"+":""}${d1}%`:"—"}</td>
              <td style={{padding:"8px 12px",textAlign:"center"}}>{typeof r.post==="number"?r.post.toLocaleString():r.post}</td>
              <td style={{padding:"8px 12px",textAlign:"center",fontWeight:600,color:d2<0?C.red:d2>0?C.grn:C.mid}}>{d2!==null?`${d2>0?"+":""}${d2}%`:"—"}</td>
            </tr>;
          })}</tbody>
        </table>
      </div>
    </>
  );

  const renderControl = ()=>(
    <>
      <Hdr title="CONTROL Landing Page Deep Dive" sub="stupski.org/control/ — 18,722 landing sessions" icon="📖" src="GA4"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:10,marginBottom:20}}>
        <Card label="Landing Sessions" value={18722} sub="76.1% of site total" icon="📖" color={C.coral}/>
        <Card label="Unique Users" value={20134} sub="90.2% new visitors" icon="🧑" color={C.teal}/>
        <Card label="Avg Engagement (Organic)" value="46.3s" sub="vs 2.4s for Direct" icon="⏱️" color={C.orange}/>
        <Card label="Scroll Depth" value="22.0%" sub="Avg across all sessions" icon="📜" color={C.purp}/>
      </div>
      <Note type="warn">LinkedIn attribution issues identified: majority of traffic labeled as Direct.</Note>
    </>
  );

  return (
    <div style={{minHeight:"100vh",background:C.cream,fontFamily:"sans-serif"}}>
      <div style={{background:C.navy,padding:"22px 28px",color:"#fff"}}>
        <h1 style={{margin:0,fontSize:24,fontWeight:700}}>CONTROL <span style={{fontWeight:400,opacity:.6}}>Book Launch Analytics</span></h1>
        <div style={{fontSize:12,color:"rgba(255,255,255,.5)",marginTop:3}}>March 1–31, 2026 — Data: GA4 + Microsoft Clarity + GSC</div>
      </div>
      <div style={{background:C.white,borderBottom:`1px solid ${C.warm}`,padding:"0 28px",display:"flex",overflowX:"auto"}}>
        {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{
          padding:"12px 18px",border:"none",background:"transparent",cursor:"pointer",
          fontSize:12,fontWeight:tab===t.id?700:500,color:tab===t.id?C.coral:C.mid,
          borderBottom:tab===t.id?`3px solid ${C.coral}`:"3px solid transparent",
          display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap"
        }}><span>{t.icon}</span>{t.label}</button>)}
      </div>
      <div style={{padding:"20px 28px",maxWidth:1100}}>
        {tab==="overview"&&renderOverview()}
        {tab==="control"&&renderControl()}
        {tab==="channels"&&<p>Channel Data Section</p>}
        {tab==="search"&&<p>Search Console Section</p>}
        {tab==="clicks"&&<p>Click & UX Section</p>}
        {tab==="tour"&&<p>Tour Section</p>}
      </div>
    </div>
  );
}
