(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"8VZ8":function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),r=a.n(n),i=a("io9h"),o=(a("jCWc"),a("kPKH")),d=(a("14J3"),a("BMrR")),l=a("6YkS");class s extends n["Component"]{constructor(){super(...arguments),this.state={}}render(){var e=this.props.data,t=void 0===e?[]:e;return r.a.createElement("div",{style:{padding:16}},r.a.createElement(d["a"],{gutter:[8,8]},t.map((e,a)=>{a-1<0||t[a-1].ID,a+1>t.length-1||t[a+1].ID;return r.a.createElement(o["a"],{key:e.ID,span:8},r.a.createElement(l["Link"],{to:{pathname:"/detail/content",search:"?id=".concat(e.ID)},style:{display:"block",width:"100%",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",padding:4,border:"1px dashed #d9d9d9",borderRadius:2,textAlign:"center"}},e.num))})))}}class c extends n["PureComponent"]{constructor(e){super(e),this.state={data:{},loading:!1}}componentDidMount(){var e=this.props.location.query.id;this.setState({loading:!0});var t=this;i["a"].get("/api/v1/public/comic/".concat(e)).then(function(e){t.setState({loading:!1,data:e.data})}).catch(function(e){console.log(e)})}render(){var e=this.state.data;return r.a.createElement("div",null,r.a.createElement("div",{className:"lay-head",style:{margin:0,padding:0,border:0,outline:0,fontSize:"100%",verticalAlign:"baseline",background:"transparent"}},r.a.createElement("section",{className:"mod-head",style:{height:"13.45rem",width:"100%",position:"relative",display:"block"}},r.a.createElement("div",{className:"head-banner",style:{position:"relative",overflow:"hidden",width:"100%",height:"100%",zIndex:1}},r.a.createElement("img",{style:{width:"100%",height:"100%",objectFit:"cover"},src:e.cover,className:"head-cover",alt:""})))),r.a.createElement("div",{className:"lay-content",style:{position:"absolute",width:"100%",top:0,left:0,zIndex:4}},r.a.createElement("section",{className:"head-info",style:{margin:"8.2rem 0.9rem 0",backgroundColor:"#fff",border:"1px solid #fff",borderRadius:"0 0 0.3rem 0.3rem",boxShadow:"0 5px 30px 0px #cccccc",paddingBottom:" 0.7rem"}},r.a.createElement("div",{className:"head-info-detail",style:{display:"flex",flexDirection:"row",paddingTop:"1rem",paddingBottom:"0.75rem"}},r.a.createElement("div",{className:"head-title-tags",style:{paddingLeft:"0.975rem",flex:1}},r.a.createElement("h1",{style:{fontSize:"1.2rem",color:"#25262b",textShadow:"0 0 0.075rem rgba(9, 2, 4, 0.1)",maxWidth:"10rem",marginBottom:"0.6rem",paddingTop:"0.2rem"}},e.name))),r.a.createElement("div",{className:"head-info-desc",style:{color:"#666666",fontSize:"0.6rem",lineHeight:"0.9rem",marginBottom:"0.5rem",padding:"0 1.2rem"}},e.introduce),r.a.createElement("div",{className:"head-info-author",style:{padding:"0 1.2rem"}},"\u4f5c\u8005: ",e.author)),r.a.createElement(s,{data:e.ComicChapter})))}}t["default"]=c}}]);