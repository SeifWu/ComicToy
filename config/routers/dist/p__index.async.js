(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{QeBL:function(e,t,a){"use strict";a.r(t);var o=a("q1tI"),i=a.n(o),r=(a("jCWc"),a("kPKH")),n=(a("14J3"),a("BMrR")),l=a("6YkS");class c extends o["PureComponent"]{render(){var e=this.props.data,t=void 0===e?[]:e;return console.log(t),i.a.createElement(n["a"],{gutter:32},t.map(e=>{return i.a.createElement(r["a"],{span:12,key:e.id,style:{display:"inline-block",width:"44%",marginLeft:"4%",marginTop:"0.75rem",verticalAlign:"top",overflow:"hidden",backgroundColor:"rgba(244, 244, 244, 0.5)",borderRadius:"0 0 0.3rem 0.3rem",paddingLeft:0,paddingRight:0}},i.a.createElement(l["Link"],{to:"/detail/".concat(e.id)},i.a.createElement("div",{className:"comic-cover",style:{display:"block",position:"relative",width:"100%",paddingBottom:"100%",marginBottom:"0.5rem",borderRadius:"0.3rem 0.3rem 0 0"}},i.a.createElement("img",{className:"cover-image",src:e.cover,alt:"",style:{width:"100%",height:"100%",objectFit:"cover",display:"block",position:"absolute",top:0,left:0,borderRadius:"0.3rem 0.3rem 0 0"}})),i.a.createElement("div",{className:"comic-content",style:{padding:"0 0.6rem"}},i.a.createElement("strong",{className:"comic-title",style:{display:"block",marginBottom:"0.2rem",fontSize:"0.75rem",color:"#333",minHeight:"1.05rem",paddingTop:"1px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}},e.name),i.a.createElement("small",{className:"comic-desc",style:{display:"block",marginBottom:"0.7rem",fontSize:"0.6rem",color:"#0c1220",minHeight:"0.8rem",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}},e.introduce))))}))}}var s=a("io9h");a.d(t,"default",function(){return d});class d extends i.a.Component{constructor(){super(...arguments),this.state={loading:!1,data:[]}}componentDidMount(){this.setState({loading:!0});var e=this;s["a"].get("/api/v1/public/comic").then(function(t){e.setState({loading:!1,data:t.data})}).catch(function(e){console.log(e)})}render(){var e=this.state,t=(e.loading,e.data);return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{style:{padding:12}},i.a.createElement(c,{data:t})))}}}}]);