/*! For license information please see wallet-app.js.LICENSE.txt */
			svg.icon{
				width:28px;
				height:28px;
				margin:0px 5px;
				fill:var(--flow-primary-color);
			}
		`}static createElement(e,t={},r={}){let i=document.createElement(e);return Object.keys(t).forEach((e=>{i.setAttribute(e,t[e])})),Object.keys(r).forEach((e=>{i[e]=r[e]})),i}static setLocalSetting(e,t,r="flow-"){window.localStorage&&(window.localStorage[r+e]=t)}static getLocalSetting(e,t,r="flow-"){if(!window.localStorage)return t;let i=window.localStorage[r+e];return void 0===i?t:i}static fire(e,t={},r={},i=null,n=!1){let o=new CustomEvent(e,Object.assign({},r,{detail:t})),s=(i||window).dispatchEvent(o);return n?o:s}static get sizeClsMap(){return p.hm}static setElementSizeClass(e,t){t=t||e.getBoundingClientRect().width;let r=[...this.sizeClsMap.entries()].find((([e,r])=>t<=r))||["LG"],i=[...this.sizeClsMap.keys(),"LG"],[n]=r;i.splice(i.indexOf(n),1),e.classList.remove(...i),e.classList.add(n),e.sizeCls=n}constructor(){super();const e=this.constructor.name;this.__cname=e.toLowerCase().replace("flow",""),this._initLog()}initPropertiesDefaultValues(e=null){this.constructor.elementProperties.forEach(((e,t)=>{let r=typeof e.value;["undefined","function"].includes(r)||(this[t]=e.value)})),e&&Object.keys(e).forEach((t=>{void 0!==e[t].value&&(this[t]=e[t].value)}))}_initLog(e=!1,t){let{localStorage:r}=window,{debug:i}=r||{};t=t||this.constructor.name,e||"all"==i||"*"==i||(i+"").indexOf(this.__cname)>-1||(i+"").indexOf(t)>-1?this.log=Function.prototype.bind.call(console.log,console,`%c[${t}]`,`font-weight:bold;color:${this.constructor.strToColor(t)}`):this.log=()=>{}}cloneValue(e){if(e instanceof Array)return e.map((e=>this.cloneValue(e)));if(e instanceof Object){let t={};return Object.entries(e).forEach((([e,r])=>{t[e]=this.cloneValue(r)})),t}return e}set(e,t){const r=e.split(".");let i=this,n=r.length-1,o=!1,s=this.cloneValue(i[r[0]]);return r.find(((e,r)=>{if(i instanceof Object)return r==n?(i[e]=t,o=!0,!0):void(i=i[e])})),o&&this.requestUpdate(r[0],s),o}fire(e,t={},r={},i=null,n=!1){let o=new CustomEvent(e,Object.assign({},r,{detail:t})),s=(i||this).dispatchEvent(o);return n?o:s}debounce(e,t,r){return this._debounce=this._debounce||new Map,this._debounce.has(e)&&this._debounce.get(e).cancel(),this._debounce.set(e,{id:setTimeout(t,r),cancel(){this.id||(clearTimeout(this.id),this.id=null)}}),this._debounce.get(e)}buildUrl(e){return this.constructor.baseUrl+e}iconPath(e,t){return(0,p.ig)(this.__cname,e,t)}log(...e){}renderOnStateChange(e,t=!0){this._renderOnStateChange||(this._renderOnStateChange={}),this._renderOnStateChange[e]=t}connectedCallback(){super.connectedCallback();let e=this._renderOnStateChange||{},t=e[p.gG.ONLINE],r=e[p.gG.AUTH],i=!1;if((this.onlineCallback||t)&&(this.onlineCallback_=(...e)=>{this.__online=!0,this.onlineCallback?.(...e),t&&this.requestUpdate("FLOW-NETWORK-ONLINE",!1)},window.addEventListener("network-iface-online",this.onlineCallback_),i=!0),(this.offlineCallback||t)&&(this.offlineCallback_=(...e)=>{this.__online=!1,this.offlineCallback?.(...e),t&&this.requestUpdate("FLOW-NETWORK-ONLINE",!0)},window.addEventListener("network-iface-offline",this.offlineCallback_),i=!0),(this.signinCallback||r)&&(this.signinCallback_=(...e)=>{this.__signedin=!0,this.signinCallback?.(...e),r&&this.requestUpdate("FLOW-USER-AUTH",!1)},window.addEventListener("flow-user-signin",this.signinCallback_),i=!0),(this.signoutCallback||r)&&(this.signoutCallback_=(...e)=>{this.__signedin=!1,this.signoutCallback?.(...e),r&&this.requestUpdate("FLOW-USER-AUTH",!0)},window.addEventListener("flow-user-signout",this.signoutCallback_),i=!0),i){let e=this.fire("flow-network-and-user-state-get",{},{},window,!0),{signedin:t,online:r}=e.detail||{};void 0!==r&&(r?this.onlineCallback_?.():this.offlineCallback_?.()),void 0!==t&&(t?this.signinCallback_?.():this.signoutCallback_?.())}this.onReCaptchaReady&&(this._onReCaptchaReady=this.onReCaptchaReady.bind(this),window.addEventListener("g-recaptcha-ready",this._onReCaptchaReady)),this.registeredListeners&&this.registeredListeners.forEach((({name:e,handler:t})=>{window.addEventListener(e,t)})),this.socketSubscriptions&&this.socketSubscriptions.forEach((e=>{e.resubscribe()}))}onlineCallback(){super.onlineCallback?.(),this.pendingSocketSubscriptions&&this.pendingSocketSubscriptions.forEach((e=>{const{subject:t}=e;this.subscribe(t,e)}))}disconnectedCallback(){super.disconnectedCallback(),this.onlineCallback_&&(window.removeEventListener("network-iface-online",this.onlineCallback_),delete this.onlineCallback_),this.offlineCallback_&&(window.removeEventListener("network-iface-offline",this.offlineCallback_),delete this.offlineCallback_),this.signinCallback_&&(window.removeEventListener("flow-user-signin",this.signinCallback_),delete this.signinCallback_),this.signoutCallback&&(window.removeEventListener("flow-user-signout",this.signoutCallback),delete this.signoutCallback),this._onReCaptchaReady&&window.removeEventListener("g-recaptcha-ready",this._onReCaptchaReady),this.registeredListeners&&this.registeredListeners.forEach((({name:e,handler:t})=>{window.removeEventListener(e,t)})),this.socketSubscriptions&&this.socketSubscriptions.forEach((e=>{e.unsubscribe()}))}registerListener(e,t){const{name:r,handler:i}=this.addToListenersStack(e,t);window.addEventListener(r,i)}addToListenersStack(e,t,r){this.registeredListeners||(this.registeredListeners=[]);const i=t||(()=>{this.requestUpdate()});return(r||this.registeredListeners).push({name:e,handler:i}),{name:e,handler:i}}removeListeners(){this.registeredListeners&&this.registeredListeners.forEach((({name:e,handler:t})=>{window.removeEventListener(e,t)})),this.registeredListeners=[]}bindDDTriggers(e=!1){this.renderRoot.querySelectorAll("[data-trigger-for]").forEach((t=>{let r=t.getAttribute("data-trigger-for");if(!r)return;let i=r;"#"!=r[0]&&(i="#"+i);let n=t.dataset.ddKey;n||(n=r.replace("#",""),/DD$/.test(n)||(n+="DD"));let o=this[n]||this.renderRoot.querySelector(i);o||(t.flowDropdown=null),this[n]=o,t.flowDropdown=o,e||t["event-bind-"+r]||(t["event-bind-"+r]=!0,t.addEventListener("click",(()=>{this[n]&&this[n].toggle()})))}))}isOnline(){return this.__online}isSignedin(){return this.__signedin}serialize(){return{nodeName:this.nodeName}}deserialize(){}subscribe(e,t){return p.ls.app.defaultRPC?(t=p.ls.app.defaultRPC.subscribe(e,t),this.socketSubscriptions||(this.socketSubscriptions=new Map),this.socketSubscriptions.set(t.uid,t),t):(t=new f.qk(null,e),this.pendingSocketSubscriptions||(this.pendingSocketSubscriptions=[]),this.pendingSocketSubscriptions.push(t),t)}request(e,t,r){return p.ls.app.defaultRPC.request(e,t,r)}}const y=i.iv`
*::-webkit-scrollbar-track,
:host::-webkit-scrollbar-track{
    box-shadow:var(--flow-scrollbar-track-box-shadow, initial);
    background:var(--flow-scrollbar-track-bg, initial);
}

*::-webkit-scrollbar,
:host::-webkit-scrollbar{
	width:var(--flow-scrollbar-width, initial);
	height:var(--flow-scrollbar-width, initial);
	background:var(--flow-scrollbar-bg, initial);
}
*::-webkit-scrollbar-thumb,
:host::-webkit-scrollbar-thumb{
    box-shadow:var(--flow-scrollbar-thumb-box-shadow, initial);
    background:var(--flow-scrollbar-thumb-bg, initial);
}
`;y.appendTo=(0,p.Zw)(y);let w=v.getLocalSetting,_=v.setLocalSetting;const x=i.iv`
	@keyframes spinner-animation{0%{transform:rotate(0deg)}100%{transform:rotate(359deg)}}
	.spinner{
		webkit-animation: spinner-animation 2s linear infinite;
	    animation: spinner-animation 2s linear infinite;
	    transform-origin:center;
	}
	fa-icon.spinner:not([hidden]){display:inline-block;position:relative}
`},4213:(e,t,r)=>{"use strict";r.d(t,{dt:()=>a,qk:()=>s});var i=r(2170);const n=()=>{let e,t;const r=new Promise(((r,i)=>{e=r,t=i}));return r.resolve=e,r.reject=t,r};class o{constructor(e){this.pending=[],this.processed=0,this.inflight=0,this.signal=n(),this.done=!1,this.max=e?.max||0}[Symbol.asyncIterator](){return this.iterator()}post(e){if(!this.done){if(this.max)for(;this.pending.length>=this.max;)this.pending.shift();this.pending.push(e),this.signal.resolve()}}stop(e){this.err=e,this.abort=!0,this.done=!0,this.inflight||this.signal.resolve()}clear(){this.pending=[],this.inflight&&(this.abort=!0,this.reset_=!0)}get length(){return this.pending.length+this.inflight}async*iterator(){for(this.done&&(this.done=!1,this.pending.length||(this.signal=n()));;){if(0===this.pending.length&&await this.signal,this.err)throw this.err;const e=this.pending;this.inflight=e.length,this.pending=[];let t=0;for(;t<e.length&&!this.abort;t++)this.processed++,yield e[t],this.inflight--;if(this.reset_&&(this.abort=!1,this.reset_=!1,e.length=0),this.done){this.abort=!1;const r=this.pending.length;this.pending=r?t?e.slice(t).concat(this.pending):e.concat(this.pending):t?e.slice(t):e,this.inflight=0;break}0===this.pending.length&&(this.inflight=0,e.length=0,this.pending=e,this.signal=n())}}}class s{constructor(e,t){this.uid=(0,i.FG)(),this.queue=new o,this.manager=e,this.subject=t,this.events={}}[Symbol.asyncIterator](){return this.queue.iterator()}subscribe(e){this.unsubscribe(),this.subject=e,this.manager.subscribe(e,this)}unsubscribe(){this.manager.remove(this);let{subject:e,uid:t,queue:r}=this;r.clear(),this.event("unsubscribe")}resubscribe(){this.manager.subscribe(this.subject,this)}close(){this.unsubscribe(),this.queue.stop()}stop(){this.queue.stop()}on(e,t){this.events[e]||(this.events[e]=[]),this.events[e].push(t)}event(e,t){(0,i.Kg)((()=>{for(const r of this.events[e]||[])r(t)}))}}class a{constructor(){this.map=new Map}subscribe(e,t=null){let r=this.map.get(e);return r||(r=new Map,this.map.set(e,r)),t?t.manager=this:t=new s(this,e),r.set(t.uid,t),t.event("subscribe",e),t}remove(e){let{subject:t,uid:r}=e,i=this.map.get(t);i?(i.delete(r),i.size||this.map.delete(t)):console.log("note","no previous subscription for subject",t)}post(e,t){let r=this.map.get(e);r&&r.size&&r.forEach((e=>{e.queue.post(t)}))}shutdown(){this.map.forEach((e=>{e.forEach((e=>{const{uid:t,queue:r}=e;r.stop(),r.clear()}))})),this.map.clear()}forEach(e){this.map.forEach(((t,r)=>{t.forEach((t=>{e(t)}))}))}}},9309:(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{i:()=>FlowBtn});var _base_element_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(3523),_flow_i18n_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(2853);class FlowBtn extends _base_element_js__WEBPACK_IMPORTED_MODULE_0__.Hc{static get properties(){return{disabled:{type:Boolean,reflect:!0},"on-click":{type:Function},icon:{type:String,reflect:!0},i18n:{type:Boolean,reflect:!0}}}static get styles(){return _base_element_js__WEBPACK_IMPORTED_MODULE_0__.iv`
			:host{
				display:var(--flow-btn-display, inline-flex);
				margin: var(--flow-btn-margin);
				padding:var(--flow-btn-padding, 5px);
				border: var(--flow-btn-border, 2px solid var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1))));
				border-radius:var(--flow-btn-radius, 8px);
				border-width:var(--flow-btn-border-width, 2px);
				font-family:var(--flow-btn-font-family, var(--flow-font-family, initial));
				font-weight:var(--flow-btn-font-weight, var(--flow-font-weight, bold));
				font-size:var(--flow-btn-font-size, initial);
				line-height:var(--flow-btn-line-height, inherit);
				text-transform:var(--flow-btn-text-transform, inherit);
				user-select: none;
				--fa-icon-size-temp:var(--fa-icon-size);
			}
			:host([icon]){
				padding:var(--flow-iconbtn-padding, var(--flow-btn-padding, 5px));
			}
			fa-icon{

				--fa-icon-size:var(--flow-btn-icon-size, var(--fa-icon-size-temp, 20px))
			}
			:host([disabled]){
				opacity:0.5;
				cursor:default;
				pointer-events:none;
			}
			:host(.start-justifed){
				justify-self:flex-start;
			}
			:host(.end-justifed){
				justify-self:flex-end;
			}
			:host(:not([disabled])){
				cursor:pointer;
				background-color:var(--flow-btn-bg-color, inherit);
				border-color:var(--flow-btn-border-color, inherit);
				color:var(--flow-btn-color, inherit);
			}
			:host(:not([disabled]):hover){
				background-color:var(--flow-btn-hover-bg-color, inherit);
				border-color:var(--flow-btn-hover-border-color, inherit);
				color:var(--flow-btn-hover-color, inherit);
				--fa-icon-color:var(--flow-btn-hover-color, inherit);
			}
			:host([primary]),
			:host(.primary){
				background-color:var(--flow-btn-primary-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-color:var(--flow-btn-primary-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
				color:var(--flow-btn-primary-invert-color, var(--flow-primary-invert-color, #FFF));
				--fa-icon-color:var(--flow-btn-primary-invert-color, var(--flow-primary-invert-color, #FFF));
			}
			:host([primary]:not([disabled]):hover),
			:host(.primary:not([disabled]):hover){
				background-color:var(--flow-btn-hover-primary-bg-color, var(--flow-btn-hover-border-color, var(--flow-primary-color, rgba(0,151,115,1))));
				color: var(--flow-btn-hover-primary-color);
			}

			:host(.secondary){
				background-color:var(--flow-btn-secondary-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-color:var(--flow-btn-secondary-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				color:var(--flow-btn-secondary-color, #FFF);
			}

			:host(.secondary:not([disabled]):hover){
				background-color:var(--flow-btn-hover-secondary-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-color:var(--flow-btn-hover-secondary-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				color:var(--flow-btn-hover-secondary-color, var(--flow-btn-secondary-color, #FFF));
			}

			:host(.success){
				background-color:var(--flow-btn-success-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-color:var(--flow-btn-success-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				color:var(--flow-btn-success-color, #FFF);
			}

			:host(.success:not([disabled]):hover){
				background-color:var(--flow-btn-hover-success-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-color:var(--flow-btn-hover-success-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				color:var(--flow-btn-hover-success-color, var(--flow-btn-success-color, #FFF));
			}

			:host(.warning){
				background-color:var(--flow-btn-warning-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-color:var(--flow-btn-warning-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				color:var(--flow-btn-warning-color, #FFF);
			}

			:host(.warning:not([disabled]):hover){
				background-color:var(--flow-btn-hover-warning-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-color:var(--flow-btn-hover-warning-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				color:var(--flow-btn-hover-warning-color, var(--flow-btn-warning-color, #FFF));
			}

			:host(.danger){
				background-color:var(--flow-btn-danger-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-color:var(--flow-btn-danger-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				color:var(--flow-btn-danger-color, #FFF);
			}

			:host(.danger:not([disabled]):hover){
				background-color:var(--flow-btn-hover-danger-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-color:var(--flow-btn-hover-danger-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				color:var(--flow-btn-hover-danger-color, var(--flow-btn-danger-color, #FFF));
			}

			:host(.info){
				background-color:var(--flow-btn-info-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-color:var(--flow-btn-info-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				color:var(--flow-btn-info-color, #FFF);
			}

			:host(.info:not([disabled]):hover){
				background-color:var(--flow-btn-hover-info-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-color:var(--flow-btn-hover-info-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				color:var(--flow-btn-hover-info-color, var(--flow-btn-info-color, #FFF));
			}

			.wrapper{
				display:flex;
				align-items:center;
				margin:var(--flow-btn-wrapper-margin,5px);
				min-width:var(--flow-btn-wrapper-min-width,50px);
				text-align:center;
				justify-content:center;
				box-sizing:border-box;
			}
			:host([full-height-wrapper]) .wrapper,
			:host([icon]) .wrapper{
				height:100%;
				margin:0px;
			}
			:host([i18n]) slot,
			:host(:not([i18n])) #text-element{
				display:none
			}
		`}constructor(){super(),this.addEventListener("click",(()=>{this.click()})),this.i18nSupport=null!=this.getAttribute("i18n"),this.i18nSupport&&_flow_i18n_js__WEBPACK_IMPORTED_MODULE_1__.UL.set(this,{})}render(){let{icon:e=""}=this;return _base_element_js__WEBPACK_IMPORTED_MODULE_0__.dy`<div 
			class="wrapper">${e?_base_element_js__WEBPACK_IMPORTED_MODULE_0__.dy`<fa-icon icon=${e}></fa-icon>`:""} <slot id="text-slot"></slot><span id="text-element"></span></div>`}firstUpdated(...e){super.firstUpdated(...e),this.setAttribute("role","button"),this.i18nSupport&&(this.slotElement=this.renderRoot.querySelector("#text-slot"),this.textElement=this.renderRoot.querySelector("#text-element"),this.slotElement.addEventListener("slotchange",(e=>{this.slotElementChidren=this.slotElement.assignedNodes();let t=[];this.slotElementChidren.forEach((e=>{t.push(e.textContent)})),this.__i18nText=_flow_i18n_js__WEBPACK_IMPORTED_MODULE_1__.ag.cleanText(t.join("")),this.setI18nValue(this.__i18nText?_flow_i18n_js__WEBPACK_IMPORTED_MODULE_1__.ag.t(this.__i18nText):"")})))}setI18nValue(e){this.textElement&&(this.textElement.innerHTML=e)}click(){if(this.disabled)return;this.fire("flow-btn-click",{el:this});let clickFn=this["on-click"];if(clickFn)if("string"==typeof clickFn)try{eval(clickFn)}catch(e){}else"function"==typeof clickFn&&clickFn()}connectedCallback(){super.connectedCallback(),this.i18nSupport&&_flow_i18n_js__WEBPACK_IMPORTED_MODULE_1__.UL.set(this,{})}disconnectedCallback(){super.disconnectedCallback(),this.i18nSupport&&_flow_i18n_js__WEBPACK_IMPORTED_MODULE_1__.UL.delete(this,{})}}FlowBtn.define("flow-btn")},2853:(e,t,r)=>{"use strict";r.d(t,{FU:()=>l,T:()=>d,UL:()=>o,ag:()=>s,iV:()=>p,qv:()=>u});var i=r(3523);const n=new Map,o=new Map;class s extends i.Hc{static hash(e){for(var t=5381,r=9835,i=e.length;i;){var n=e.charCodeAt(--i);r=55*r^n^(t=33*t^n)}return r=r>=0?r:2147483648+(2147483647&r),(t=t>=0?t:2147483648+(2147483647&t)).toString(16)+r.toString(16)}static entriesChanged(){let e=this.getAllEntries(),t=this.getEntries(),r=new CustomEvent("flow-i18n-entries-changed",{detail:{entries:t,entriesAll:e}});window.dispatchEvent(r)}static stripWhitespace(e){return e.replace(/\s\s+/g," ").trim()}static createEntry(e,t=!1){let r=this.hash(e);return this.entries[r]?t&&(Object.assign(this.entries[r],t),this.entriesChanged()):(this.entries[r]=Object.assign({en:e},t||{}),this.entriesChanged()),r}static t(e,t,r){e=this.stripWhitespace(e);let i=this.createEntry(e);return this.testing?`[${r||this.locale}:${e}]`:this.entries[i][r||this.locale]||t||e}static setConfig(e){a=e}static getConfig(){return a}static setActiveLanguages(e){let t=!1;a.languages.forEach((r=>{r.active=e.includes(r.locale),r.locale!=this.locale||r.active||(t="en")})),t&&this.setLocale(t)}static getActiveLanguages(){return a.languages.filter((e=>e.active))}static getActiveLocales(){return this.getActiveLanguages().map((e=>e.locale))}static setEntries(e){(e||[]).forEach((e=>{this.entries[this.hash(e.en)]=e})),f()}static setTesting(e){this.testing=e,f()}static getEntries(){let e,t=this.getActiveLocales();return this.getAllEntries().map((r=>(e={en:r.en},t.forEach((t=>{e[t]=r[t]||""})),e)))}static getAllEntries(){return Object.values(this.entries)}static get properties(){return{text:{type:String}}}static setLocale(e="en"){this.locale=e,this.setLocalSetting("i18n-locale",e),f()}static cleanText(e){return e.replace(/<\!\-\-\?lit([^>]*)\$-\->/g,"").replace(/<\!\-\-\-\->/g,"")}constructor(){super(),this.text=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._cb=this._cb||this.onLocaleChange.bind(this),window.addEventListener("flow-i18n-locale",this._cb),this.update()}disconnectedCallback(){super.disconnectedCallback(),this._cb&&window.removeEventListener("flow-i18n-locale",this._cb)}onLocaleChange(){this.update()}render(){null==this.innerHTML_&&(this.innerHTML_=s.cleanText(this.innerHTML),this.innerHTML="");let e=[s.t(this.text||this.innerHTML_)];return e.raw=[],(0,i.dy)(e)}}let a={languages:[{title:"العربية‎",locale:"ar",rtl:!0},{title:"Български",locale:"bg"},{title:"বাংলা",locale:"bn"},{title:"English",locale:"en"},{title:"Español",locale:"es"},{title:"Greek",locale:"el"},{title:"Esti",locale:"et"},{title:"Français",locale:"fr"},{title:"Deutsch",locale:"de"},{title:"Danish",locale:"da"},{title:"Czech",locale:"cs"},{title:"Farsi",locale:"fa"},{title:"Finnish",locale:"fi"},{title:"Filipino",locale:"fil"},{title:"עברית",locale:"he",rtl:!0},{title:"Hindi",locale:"hi"},{title:"Croatian",locale:"hr"},{title:"Hungarian",locale:"hu"},{title:"Italiano",locale:"it"},{title:"Icelandic",locale:"is"},{title:"Indonesian",locale:"id"},{title:"日本語",locale:"ja"},{title:"Korean",locale:"ko"},{title:"Korean",locale:"kr"},{title:"Lithuanian",locale:"lt"},{title:"Norwegian",locale:"nb"},{title:"Dutch",locale:"nl"},{title:"Norwegian",locale:"no"},{title:"Polski",locale:"pl"},{title:"Português",locale:"pt"},{title:"Português (Brazil)",locale:"pt_BR"},{title:"Romanian",locale:"ro"},{title:"Русский",locale:"ru"},{title:"Slovak",locale:"sk"},{title:"Serbian",locale:"sr"},{title:"Slovenian",locale:"sl"},{title:"Swedish",locale:"sv"},{title:"Tamil",locale:"ta"},{title:"Thai",locale:"th"},{title:"Turkish",locale:"tr"},{title:"Ukrainian",locale:"uk"},{title:"Urdu",locale:"ur"},{title:"Vietnamese",locale:"vi"},{title:"Mongolian",locale:"mn"},{title:"中文",locale:"zh"}],aliases:{"en-GB":"en","en-US":"en","zh-CN":"zh","zh-TW":"zh"}};s.entries={},s.locale=i.Hc.getLocalSetting("i18n-locale","en"),s.entries[s.hash("Hello")]={en:"Hello",ru:"Ð-Ð´Ñ€Ð°Ð²ÑÑ‚Ð²ÑƒÐ¹Ñ‚Ðµ",pu:"ਸਤ ਸ੍ਰੀ ਅਕਾਲ",hi:"नमस्ते!"},window.addEventListener("flow-i18n-entries",(e=>{s.setEntries(e.detail.entries)}));let c=(e,t)=>{customElements.define("i18n-"+t,class extends e{connectedCallback(){this.innerHTML_||(this.innerHTML_=s.cleanText(this.innerHTML)),this._cb=this._cb||this.onLocaleChange.bind(this),window.addEventListener("flow-i18n-locale",this._cb),this.onLocaleChange()}disconnectedCallback(){this._cb&&window.removeEventListener("flow-i18n-locale",this._cb)}onLocaleChange(){this.innerHTML=this.htmlToElement(s.t(this.innerHTML_))}htmlToElement(e){let t=document.createElement("template");return t.innerHTML=`<span>${e.trim()}</span>`,t.content.firstChild.innerHTML}},{extends:t})};c(HTMLDivElement,"div"),c(HTMLSpanElement,"span"),c(HTMLParagraphElement,"p"),c(HTMLLabelElement,"label"),c(HTMLTableCellElement,"td"),c(HTMLTableCellElement,"th"),c(HTMLAnchorElement,"a");const l=(e,...t)=>(e=s.t(e),t.forEach((t=>{e=e.replace("[n]",t)})),e),u=(e,...t)=>(e=s.t(e),t.forEach((t=>{e=e.replace("[n]",t)})),((...e)=>{let t=[...e];return t.raw=[],(0,i.dy)(t)})(e));class h extends i.sR{constructor(...e){super(...e),n.set(this,{})}render(e){return this.__text=e,s.t(e)}disconnected(){n.delete(this)}reconnected(){n.set(this,{})}}const d=(0,i.XM)(h);let f=()=>{let e=new CustomEvent("flow-i18n-locale",{detail:{locale:s.locale}});window.dispatchEvent(e),n.forEach(((e,t)=>{t.setValue(t.__text?s.t(t.__text):"")})),o.forEach(((e,t)=>{t.setI18nValue(t.__i18nText?s.t(t.__i18nText):"")}))};s.setLocale(s.locale);class p{static open(e){if(this.dialog)return;this._click=this._click||this.onClick.bind(this);let t=this._open(e);return setTimeout((()=>{window.addEventListener("click",this._click)}),100),t}static close(e){this.dialog&&(this.dialog.resolve(e),this.dialog=null),this.removeEventListener()}static onClick(e){if(!this.dialog)return void this.removeEventListener();let t=e.target;(t&&t.closest&&t.closest("flow-dialog.flow-menu"))!=this.dialog&&(this.removeEventListener(),this.close())}static removeEventListener(){window.removeEventListener("click",this._click)}static _open(e){let t=i.dy`<ul class="menu" @click="${e=>{let t=e.target.closest("li").getAttribute("data-locale");s.setLocale(t),n.resolve({locale:t}),this.dialog=!1,this.removeEventListener()}}">${a.languages.filter((e=>e.active)).map((e=>i.dy`<li data-locale="${e.locale}" 
						class="${e.locale==s.locale?"active":""}">${e.title}</li>`))}</ul>`,r=FlowDialog.show({body:t,btns:[],cls:"flow-menu hide-close-btn",modal:!1}),{dialog:n}=r;if(this.dialog=n,e){let t=n.getBoundingClientRect();FlowDialog.alignTo(e,n,{targetPos:"right-bottom",dialogPos:"left-top",hOffset:-t.width,vOffset:2})}return r}}class g extends i.oi{static get styles(){return i.iv`:host{display:inline-block;border:1px solid #DDD;padding:10px;}`}static get properties(){return{loop:{type:Boolean}}}constructor(){super(),this.start()}start(){let e=0,t=["ru","pu","hi","en"];this.intervalId=setInterval((()=>{let r=t[e++];r||(this.loop?(e=0,r=t[e++]):(this.remove(),clearInterval(this.intervalId))),s.setLocale(r)}),1e3)}render(){return i.dy`Hello: ${d("Hello")} <div title="${d("abc")}">How are You</div>`}}customElements.define("i18n-test",g),customElements.define("flow-i18n",s)},5830:(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{"use strict";var _base_element_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(3523),lit_html_directives_if_defined_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(577);class FlowInput extends _base_element_js__WEBPACK_IMPORTED_MODULE_0__.Hc{static get properties(){return{btnText:{type:String},value:{type:String},type:{type:String},disabled:{type:Boolean,reflect:!0},pattern:{type:String},validator:{type:Function},placeholder:{type:String},label:{type:String},readonly:{type:Boolean},expression:{type:Boolean},maxlength:{type:Number},max:{type:Number},min:{type:Number},enterkeyhint:{type:String},"tab-index":{type:Number},"clear-btn":{type:Boolean,reflect:!0}}}static get styles(){return _base_element_js__WEBPACK_IMPORTED_MODULE_0__.iv`
			:host{
				display:var(--flow-input-display, inline-block);
				vertical-align:middle;
				font-family:var(--flow-font-family, "Julius Sans One");
				font-weight:var(--flow-font-weight, bold);
				width:var(--flow-input-width, 100%);
				min-width:var(--flow-input-min-width, 100px);
				max-width:var(--flow-input-max-width, 500px);
				margin:var(--flow-input-margin, 5px 0px);
				font-size:0px;
			}
			:host(:not([disabled])) .btn{
				cursor:pointer;
			}
			
			:host(:not([apply-btn])) .btn{
				display: none;
			}
			
			.wrapper{
				display:flex;
				align-items:stretch;
				min-width_:50px;
				text-align:left;
				justify-content:center;
				margin-top:var(--flow-input-wrapper-margin-top,-0.5rem);
				height:var(--flow-input-wrapper-height);
			}
			label{
				font-size:var(--flow-input-label-font-size, 0.7rem);
				padding:var(--flow-input-label-padding,2px 5px);
				border: var(--flow-input-label-border, 2px) solid  var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-radius:var(--flow-input-label-border-radius, 8px);
				margin-left: var(--flow-input-label-margin-left,10px);
				margin-right: var(--flow-input-label-margin-right,20px);
				z-index: var(--flow-input-label-z-index, 1);
				position: var(--flow-input-label-position, relative);
				background-color:var(--flow-input-bg, inherit);
			}
			.btn{
				position:relative;
				padding:var(--flow-input-btn-padding, 5px);
				min-width:var(--flow-input-btn-min-width, 10px);
				background-color:var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border: 2px solid var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
				overflow:hidden;
				border-radius:8px;
				border-top-left-radius: var(--flow-input-btn-tlbr, 0px);
    			border-bottom-left-radius: var(--flow-input-btn-blbr, 0px);
    			color:var(--flow-border-invert-color, var(--flow-primary-invert-color, #FFF));
    			display:var(--flow-input-btn-display, flex);
			    justify-content: center;
			    align-items: center;
			}
			:host(:not([disabled])) .btn:hover{
				background-color:var(--flow-border-hover-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-color:var(--flow-border-hover-color, var(--flow-primary-color, rgba(0,151,115,1)))
			}
			.input{
				width:var(--flow-input-input-width,100px);
				flex:1;box-sizing:border-box;
				height:var(--flow-input-height);
				border: var(--flow-input-border, 2px) solid var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-radius:var(--flow-input-border-radius, 8px);
    			margin:0px;
    			padding:var(--flow-input-padding,10px);
				background-color:var(--flow-input-bg, inherit);
				color:var(--flow-input-color, inherit);
				font-size:var(--flow-input-font-size, 1rem);
				font-weight:var(--flow-input-font-weight, 400);
				font-family:var(--flow-input-font-family);
				line-height:var(--flow-input-line-height, 1.2);
				box-shadow:var(--flow-input-box-shadow);
				text-align:var(--flow-input-text-align);
				min-width:var(--flow-input-input-min-width, 10px);
				letter-spacing:var(--flow-input-letter-spacing, inherit);
			}
			/*
			:host(:not([outer-border])) .input{
				box-shadow:var(--flow-input-box-shadow);
			}
			*/
			.btn .text{
				font-size:var(--flow-input-btn-font-size, 1rem);
			}

			:host([apply-btn]) .input,
			:host([sufix-btn]) .input,
			:host([suffix-btn]) .input{
			    border-right-width:0px;
				border-top-right-radius: 0px;
				border-bottom-right-radius: 0px;
			}
			:host([sufix-btn]) ::slotted([slot="sufix"]),
			:host([suffix-btn]) ::slotted([slot="suffix"]){
				border-top-left-radius: 0px;
				border-bottom-left-radius: 0px;
				margin-bottom:0px;
			}

			:host([outer-border]) .input,
			:host([clear-btn]) .input{
				border:0px;
				height:calc(var(--flow-input-height) - 4px);
				background-color:transparent;
				box-shadow:none;
			}
			:host([outer-border]) .wrapper,
			:host([clear-btn]) .wrapper{
				border:var(--flow-input-border, 2px) solid var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-radius:var(--flow-input-border-radius, 8px);
				background-color:var(--flow-input-bg, inherit);
				color:var(--flow-input-color, inherit);
				box-shadow:var(--flow-input-wrapper-box-shadow);
			}
			:host([outer-border]) .wrapper{
				box-shadow:var(--flow-input-wrapper-box-shadow, var(--flow-input-box-shadow));
			}


			.input:focus{outline:none}
			.input::-webkit-input-placeholder { color: var(--flow-input-placeholder, #888 ); }
			:host([disabled]) .value{
				padding-right:10px;
			}
			.clear-btn{margin:5px 10px;align-self:center;cursor:pointer}
			:host(.invalid) .input{color:var(--flow-input-invalid-color, red)}
			.wrapper:not([has-value]) ::slotted([hide-on-empty]),
			.wrapper:not([has-value]) .clear-btn{
				display:none
			}
			.wrapper[has-label] input{
				padding-top:var(--flow-input-with-label-input-padding-top, 15px)
			}
		`}constructor(){super(),this.type="text",this.value="",this.expression=!1}render(){let e=!!this.label;return _base_element_js__WEBPACK_IMPORTED_MODULE_0__.dy`<label ?hidden=${!e}>${this.label||""}</label>
		<div class="wrapper" @click=${this.onClick} ?has-value=${!!this.value} ?has-label=${e}>
			<slot name="prefix"></slot>
			<input class="input" type="${this.type}" spellcheck="false"
				placeholder="${this.placeholder||""}"
				pattern="${(0,lit_html_directives_if_defined_js__WEBPACK_IMPORTED_MODULE_1__.o)(this.pattern)}"
				maxlength="${this.maxlength||""}"
				max="${this.max||""}"
				min="${this.min||""}"
				enterkeyhint="${this.enterkeyhint||"done"}"
				tabindex="${null==this["tab-index"]?"":this["tab-index"]}"
				?readonly=${this.readonly}
				?disabled=${this.disabled}
				@change=${this.onChange}
				@input=${this.onInput}
				.value="${this.value}" />
			<div class="btn" @click=${this.onBtnClick}>
				<div class="text"><flow-i18n text="${this.btnText||"Apply"}"></flow-i18n></div>
			</div>
			${this["clear-btn"]?_base_element_js__WEBPACK_IMPORTED_MODULE_0__.dy`
				<fa-icon clear-input class="clear-btn"
					icon="times"></fa-icon>
			`:""}
			<slot name="sufix"></slot>
			<slot name="suffix"></slot>
		</div>
		`}firstUpdated(...e){super.firstUpdated(...e),this.renderRoot.addEventListener("click",(e=>{this._onClick(e)}))}setClear(){this.setValue("")}_onClick(e){e.target.closest("[clear-input]")&&this.clear()}onClick(e){this.fire("flow-input-click",{el:this})}onBtnClick(e){this.disabled||this.fire("btn-click",{el:this,e})}validate(e){let{pattern:t}=this;if(t){try{t=new RegExp(t)}catch(e){return this.log("pattern error:",e),!1}if(!t.test(e))return!1}return"function"!=typeof this.validator||this.validator(e,this)}clear(){this.value="",this.fire("changed",{el:this,value:""}),this.fire("inputted",{el:this,value:""})}onChange(e){let t=this.renderRoot.querySelector("input").value;t=this.parseExpressionValue(t),this.validate(t)?(this.classList.remove("invalid"),this.value=t,this.fire("changed",{el:this,value:t})):this.classList.add("invalid")}onInput(e){let t=this.renderRoot.querySelector("input").value;this.validate(t)?(this.classList.remove("invalid"),this.value=t,this.fire("inputted",{el:this,value:t})):this.classList.add("invalid")}setValue(e){this.value=e,this.renderRoot.querySelector("input").value="",this.fire("changed",{el:this,value:this.value})}getInputValue(){return this.renderRoot.querySelector("input").value}parseExpressionValue(value){if(!this.expression)return value;value=value.replace(/,/g,""),value=value.replace(/\d+\.?\d*\s*[km]/gi,(e=>(/m/i.test(e)?e=1e6*parseFloat(e):/k/i.test(e)&&(e=1e3*parseFloat(e)),e)));try{value=eval(`(${value})`)}catch(e){console.log(e)}return value}}FlowInput.define("flow-input")},2170:(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Dc:()=>setTheme,FG:()=>UID,FH:()=>baseUrl,I8:()=>deepClone,IE:()=>DeferComponent,Kg:()=>dpc,OZ:()=>chunks,P6:()=>utils,TV:()=>shuffle,X$:()=>trigger,XF:()=>getRandomInt,XS:()=>contain,Zw:()=>styleAppendTo,gG:()=>FlowStates,gh:()=>getTheme,hm:()=>sizeClsMap,ig:()=>resolveIcon,ls:()=>flow,rA:()=>isSmallScreen});const toString=Object.prototype.toString,is=(e,t)=>toString.call(e)=="[object "+t+"]",utils={};utils.toString=toString,utils.is=is,utils.isArray=e=>Array.isArray(e),utils.isObject=e=>is(e,"Object"),utils.isString=e=>is(e,"String"),utils.isNumber=e=>is(e,"Number"),utils.isBoolean=e=>is(e,"Boolean"),utils.isFunction=e=>is(e,"Function"),utils.isUndefined=e=>is(e,"Undefined"),utils.valueToDataType=e=>window[toString.call(e).split("object")[1]?.replace("]","").trim()||""];const storage=()=>"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:window;let uid_vec=new Uint32Array(6);const UID=(e=26)=>(window.crypto.getRandomValues(uid_vec),[...uid_vec].map((e=>bs58e(e))).join("").substring(0,e));window.UID=UID,window.OnReCaptchaLoad||(window.OnReCaptchaLoad=()=>{trigger("g-recaptcha-ready"),buildReCaptcha()});const universe=storage(),default_flow_global={},flow=universe.flow=universe.flow||default_flow_global;let{debug,baseUrl,theme}=window.flowConfig||flow,{iconPath,icons,resolveIcon,iconMap,iconFile}=theme||{};baseUrl||(baseUrl=new URL(__webpack_require__(9745),__webpack_require__.b).href,debug&&console.log("FlowUX: baseUrl",baseUrl));const isSmallScreen=navigator.userAgent.toLowerCase().includes("mobi"),IconMap=Object.assign({fal:"light",far:"regular",fab:"brands",fa:"solid",fas:"solid"},iconMap||{});iconFile=iconFile||"icons";const NativeIcons=baseUrl+"resources/icons/sprites/",FlowIconPath=iconPath||"/resources/fonts/sprites/",FlowIcons=icons||{},FlowStates=Object.freeze({ONLINE:"online",AUTH:"auth"});resolveIcon||(resolveIcon=(e,t,r)=>{if(!t)return`${e}:invalid icon`;if(/\.(.{3,4}|.{3,4}#.*)$/.test(t))return t;let i=FlowIcons[`${e}:${t}${r?"-"+r:""}`]||FlowIcons[t]||(t.indexOf(":")>-1?t:iconFile+":"+t);if(/\.(.{3,4}|.{3,4}#.*)$/.test(i))return i;let[n,o]=i.split(":");return"icons"==n?`${NativeIcons}icons.svg#${o}`:`${FlowIconPath}${IconMap[n]||n}.svg#${o}`});const dpc=(e,t)=>"function"==typeof e?setTimeout(e,t||0):setTimeout(t,e||0),clearDPC=e=>{clearTimeout(e)},deferred=()=>{let e={};const t=new Promise(((t,r)=>{e={resolve:t,reject:r}}));return Object.assign(t,e)},setTheme=e=>{const t=document.body;[...t.classList].filter((e=>e.startsWith("flow-theme"))).forEach((e=>t.classList.remove(e))),t.classList.add(`flow-theme-${e}`),localStorage.flowtheme=e,trigger("flow-theme-changed",{theme:e},{bubbles:!0},t)},DefaultTheme=theme?.default||"light",getTheme=(e=DefaultTheme)=>{if(localStorage.flowtheme)return localStorage.flowtheme;let t=[...document.body.classList].find((e=>e.startsWith("flow-theme")));return t?t.replace("flow-theme-",""):e},styleAppendTo=(e,t="head")=>r=>{let i=document.querySelector(r||t);if(i||(i=document.head),i.matches("style"))i.innerHTML=e.cssText;else{let t=document.createElement("style");t.innerHTML=e.cssText,i.appendChild(t)}},bs58e=(alphabet="123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",function(e){for(var t="";e;){var r=e%58;e=Math.floor(e/58),t=alphabet[r].toString()+t}return t});var alphabet;const resolveConditions=src=>(src=Object.entries(src).map((([k,v])=>eval(k)?void 0:v)).filter((e=>void 0!==e)),src.length?src:null),DeferComponent=(e,t,r,i)=>{if(r&&"object"==typeof r&&!Array.isArray(r)&&(r=resolveConditions(r)),r&&Array.isArray(r)){let n=0;for(r=r.slice();r.length;){let o,s=r.shift();switch(typeof s){case"function":if(s=s(),!s)continue;if(Array.isArray(s)){r=r.concat(s);continue}break;case"object":if(s=resolveConditions(s),!s)continue;if(1!=s.length){r=r.concat(s);continue}s=s.shift()}console.log("Flow - loading dep:",s),n++,/\.css$/.test(s)?(o=document.createElement("link"),o.setAttribute("rel","stylesheet"),o.setAttribute("type","text/css"),o.href=s):(o=document.createElement("script"),o.src=s),document.head.appendChild(o),o.onload=()=>{n--,n||(i&&"function"==typeof i&&i(),e.defineElement(t))}}}else e.defineElement(t)},sizeClsMap=new Map;sizeClsMap.set("TINY",400),sizeClsMap.set("XXS",550),sizeClsMap.set("XS",768),sizeClsMap.set("SM",992),sizeClsMap.set("MD",1200);const isArray=e=>Array.isArray(e),isObject=e=>"[object Object]"==Object.prototype.toString.call(e),camelCase=e=>(e+"").toLowerCase().replace(/[-_\.]+/g," ").replace(/[^\w\s]/g,"").replace(/ (.)/g,(function(e){return e.toUpperCase()})).replace(/ /g,""),humanize=e=>(e=(e+"").toLowerCase().replace(/[-_\.]+/g," ").replace(/[^\w\s]/g,"").replace(/ (.)/g,(function(e){return e.toUpperCase()})))[0].toUpperCase()+e.substring(1),deepClone=(e,t)=>{if(t&&console.log("deepClone:",e,e instanceof HTMLElement),"undefined"!=typeof jQuery&&e instanceof jQuery||e?.constructor?.prototype.jquery)return e.clone();if(e instanceof HTMLElement)return e.cloneNode(!0);if(isArray(e))return e.map((e=>deepClone(e,t)));if(isObject(e)){let r={};return Object.entries(e).forEach((([e,i])=>{r[e]=deepClone(i,t)})),r}return e};class ExtendedMap extends Map{constructor(...e){super(...e),this.handlers=new Map}setListener(e,t){if(!["set","clear","delete"].includes(e))return!1;let r=this.handlers.get(e);r||(r=[]),r.includes(t)||r.push(t),this.handlers.set(e,r)}callHandlers(e,...t){let r=this.handlers.get(e);r&&r.forEach((e=>{e(...t)}))}set(e,t){super.set(e,t),this.callHandlers("set",e,t)}}const trigger=(e,t={},r={},i=null,n=!1)=>{let o=new CustomEvent(e,Object.assign({},r,{detail:t})),s=(i||window).dispatchEvent(o);return n?o:s},buildReCaptcha=e=>{window.grecaptcha&&grecaptcha.ready((()=>{(e=e||document).querySelectorAll(".g-recaptcha").forEach((e=>{let t=e.dataset.grecaptchaId;void 0===t?(t=grecaptcha.render(e,{sitekey:e.dataset.sitekey||document.body.dataset.recaptchaKey,callback(t){trigger("g-recaptcha",{code:"success",data:t},{bubbles:!0},e)},"expired-callback":()=>{trigger("g-recaptcha",{code:"expired"},{bubbles:!0},e)},"error-callback":()=>{trigger("g-recaptcha",{code:"error"},{bubbles:!0},e)}}),e.dataset.grecaptchaId=t):grecaptcha.reset(t)}))}))},chunks=(e,t)=>e.length?[e.slice(0,t),...chunks(e.slice(t),t)]:[],getRandomInt=(e,t)=>(e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t+1-e)+e)),abbreviateNumber=(e,t)=>{if(null===e)return null;if(0===e||!e)return"0";t=!t||t<0?2:t;var r=e.toPrecision(2).split("e"),i=1===r.length?0:Math.floor(Math.min(r[1].slice(1),14)/3),n=i<1?e.toFixed(0+t):(e/Math.pow(10,3*i)).toFixed(1+t);return(n<0?n:Math.abs(n))+["","K","M","B","T"][i]},shuffle=e=>{let t,r,i=e.length;for(;0!==i;)r=Math.floor(Math.random()*i),i-=1,t=e[i],e[i]=e[r],e[r]=t;return e},fit=e=>(t,r,i,n,o=1,s=.5,a=.5)=>{const c=i/n,l=t/r;let u=t*o,h=r*o;return(e?c>l:c<l)?h=u/c:u=h*c,{width:u,height:h,offsetX:(t-u)*s,offsetY:(r-h)*a}},contain=fit(!0),cover=fit(!1)},7318:(e,t,r)=>{"use strict";r.d(t,{YS:()=>a,fF:()=>c,vp:()=>s});var i=r(5464),n=r(7157),o=r(2170);const s=i.iv`
	.pagination-box{text-align:center;padding:10px 5px;}
	.pagination{display: inline-block;}
    .pagination-box[disabled]{display:none}
	.pagination a{
		color: var(--k-pagination-color);
		float: left;
		padding: 8px 16px;
		text-decoration: none;
		transition: background-color .3s;
		border: 1px solid #555;
		border-color:var(--k-pagination-border-color, var(--k-btn-border-color, #555));
		margin:var(--flow-pagination-margin, 2px 4px);
        cursor:pointer;
        user-select:none;
	}
	@media (max-width:768px){
		.pagination a{
			padding:8px 6px;
			margin: 0px 2px;
			font-size:0.8rem;
		}
	}
	.pagination a.disabled{
		opacity:0.5;
	}
	.pagination a.hidden{display:none}
	.pagination a.active{
		background:var(--k-pagination-active-bg, #2489da);
		color:var(--k-pagination-active-color, #FFF);
		border:1px solid #2489da;
		border-color:var(--k-pagination-active-border-color, #2489da);
	}
	.pagination a.active,
	.pagination a.disabled{
		cursor:default;
	}
	.pagination a:hover:not(.active):not(.disabled){
        border-color:var(--k-pagination-hover-border-color, var(--k-btn-hover-border-color, #777 ));
		background-color:var(--k-pagination-hover-bg-color, var(--k-btn-hover-bg-color, rgba(255,255,255, 0.2) ));
		color:var(--k-pagination-hover-color, var(--k-btn-hover-color, inherit));
	}
`,a=(e,t=0,r=25)=>{t=+t,r=+r,e=+e;let i=Math.ceil(e/r),n=Math.min(Math.ceil((t+1)/r),i),s=Math.min(o.rA?3:10,i),a=Math.floor(s/2),c=Math.max(n-1,1),l=Math.min(n+1,i),u=1;n-a>1&&(u=n-s+Math.min(i-n,a)+1);let h=[];for(let e=0;e<s;e++)h.push({p:u,skip:(u-1)*r,active:n==u}),u++;return{totalPages:i,activePage:n,isLast:n==i,isFirst:1==n,prev:c,next:l,last:i,lastSkip:(i-1)*r,prevSkip:(c-1)*r,nextSkip:(l-1)*r,total:e,skip:t,limit:r,pages:h,maxPages:s,half:a}},c=(e,t,r={})=>{e||(e={pages:[],isFirst:!0,isLast:!0,totalPages:0,type:""});let{pages:o,isFirst:s,isLast:a,prevSkip:c,nextSkip:l,totalPages:u,lastSkip:h,type:d}=e,f=0==o.length?" hidden":"",p=r.first||"FIRST",g=r.last||"LAST",m=r.prev||"<",b=r.next||">";return t=t||(e=>{}),i.dy`
    <div class="pagination-box" ?disabled="${!o.length}" @click=${t}>
        <div class="pagination" data-pagination="${d}">
            <a class="first ${(s?"disabled":"")+f}" data-skip="0">${p}</a>
            <a class="prev ${(s?"disabled":"")+f}" data-skip="${c}">${m}</a>
            ${(0,n.r)(o,(e=>e.p),(e=>i.dy`
                <a class="${e.active?"active":""}" data-skip="${e.skip}">${e.p}</a>
            `))}
            <a class="next ${(a?"disabled":"")+f}"  data-skip="${l}">${b}</a>
            <a class="first ${(a?"disabled":"")+f}" data-skip="${h}">${g}</a>
        </div>
    </div>`};i.iv`
    .mask{
        position:absolute;
        left:0px;
        top:0px;
        right:0px;
        bottom:0px;
        width:100%;
        height:100%;
        opacity:1;
        z-index:1000;
        background-color:rgba(0, 0, 0, 0.7);
        background-color:var(--flow-loading-mask-bg-color, rgba(0, 0, 0, 0.7));
        animation: fade-out 1s ease forwards;
    }
    .mask .loading-logo{
        width: 100px;
        height: 100px;
        position: relative;
        left: 50%;
        top: 50%;
        margin: -50px 0 0 -50px;
    }

    :host(.loading) .mask,
    .loading .mask{
        animation-name: fade-in;
    }
    :host(:not(.loading)) .mask .loading-logo .animate{
        fill:#009688;
    }
    @keyframes fade-in{
        0% {z-index:-1; opacity:0}
        1% {z-index:1000; opacity:0}
        100% {z-index:1000; opacity:1}
    }
    @keyframes fade-out{
        0% {z-index:1000; opacity:1}
        99% {z-index:1000; opacity:0}
        100% {z-index:-1; opacity:0}
    }
`},5464:(e,t,r)=>{"use strict";r.d(t,{iv:()=>n.iv,dy:()=>o.dy});var i,n=r(2710),o=r(3692);r(8922),null===(i=window.HTMLSlotElement)||void 0===i||i.prototype.assignedElements,console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.")},8922:(e,t,r)=>{"use strict";r.d(t,{YP:()=>s.YP,dy:()=>s.dy,iv:()=>o.iv,oi:()=>a,sY:()=>s.sY});var i,n,o=r(2710),s=r(3692);class a extends o.fl{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const r=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=r.firstChild),r}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=(0,s.sY)(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return s.Jb}}a.finalized=!0,a._$litElement$=!0,null===(i=globalThis.litElementHydrateSupport)||void 0===i||i.call(globalThis,{LitElement:a});const c=globalThis.litElementPolyfillSupport;null==c||c({LitElement:a}),(null!==(n=globalThis.litElementVersions)&&void 0!==n?n:globalThis.litElementVersions=[]).push("3.2.2")},2710:(e,t,r)=>{"use strict";r.d(t,{fl:()=>w,iv:()=>c});const i=window,n=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;class a{constructor(e,t,r){if(this._$cssResult$=!0,r!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(n&&void 0===e){const r=void 0!==t&&1===t.length;r&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&s.set(t,e))}return e}toString(){return this.cssText}}const c=(e,...t)=>{const r=1===e.length?e[0]:t.reduce(((t,r,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[i+1]),e[0]);return new a(r,e,o)},l=(e,t)=>{n?e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((t=>{const r=document.createElement("style"),n=i.litNonce;void 0!==n&&r.setAttribute("nonce",n),r.textContent=t.cssText,e.appendChild(r)}))},u=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return(e=>new a("string"==typeof e?e:e+"",void 0,o))(t)})(e):e;var h;const d=window,f=d.trustedTypes,p=f?f.emptyScript:"",g=d.reactiveElementPolyfillSupport,m={toAttribute(e,t){switch(t){case Boolean:e=e?p:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=null!==e;break;case Number:r=null===e?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch(e){r=null}}return r}},b=(e,t)=>t!==e&&(t==t||e==e),v={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:b},y="finalized";class w extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,r)=>{const i=this._$Ep(r,t);void 0!==i&&(this._$Ev.set(i,r),e.push(i))})),e}static createProperty(e,t=v){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const r="symbol"==typeof e?Symbol():"__"+e,i=this.getPropertyDescriptor(e,r,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(i){const n=this[e];this[t]=i,this.requestUpdate(e,n,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||v}static finalize(){if(this.hasOwnProperty(y))return!1;this[y]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const r of t)this.createProperty(r,e[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const e of r)t.unshift(u(e))}else void 0!==e&&t.push(u(e));return t}static _$Ep(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,r;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(r=e.hostConnected)||void 0===r||r.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return l(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$EO(e,t,r=v){var i;const n=this.constructor._$Ep(e,r);if(void 0!==n&&!0===r.reflect){const o=(void 0!==(null===(i=r.converter)||void 0===i?void 0:i.toAttribute)?r.converter:m).toAttribute(t,r.type);this._$El=e,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(e,t){var r;const i=this.constructor,n=i._$Ev.get(e);if(void 0!==n&&this._$El!==n){const e=i.getPropertyOptions(n),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(r=e.converter)||void 0===r?void 0:r.fromAttribute)?e.converter:m;this._$El=n,this[n]=o.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,r){let i=!0;void 0!==e&&(((r=r||this.constructor.getPropertyOptions(e)).hasChanged||b)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===r.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,r))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(r)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(r)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}w[y]=!0,w.elementProperties=new Map,w.elementStyles=[],w.shadowRootOptions={mode:"open"},null==g||g({ReactiveElement:w}),(null!==(h=d.reactiveElementVersions)&&void 0!==h?h:d.reactiveElementVersions=[]).push("1.6.3")},4232:(e,t,r)=>{"use strict";r.d(t,{OR:()=>o,_Y:()=>a,fk:()=>c,hl:()=>u,i9:()=>h,ws:()=>d});var i=r(3692);const{I:n}=i.Al,o=e=>void 0===e.strings,s=()=>document.createComment(""),a=(e,t,r)=>{var i;const o=e._$AA.parentNode,a=void 0===t?e._$AB:t._$AA;if(void 0===r){const t=o.insertBefore(s(),a),i=o.insertBefore(s(),a);r=new n(t,i,e,e.options)}else{const t=r._$AB.nextSibling,n=r._$AM,s=n!==e;if(s){let t;null===(i=r._$AQ)||void 0===i||i.call(r,e),r._$AM=e,void 0!==r._$AP&&(t=e._$AU)!==n._$AU&&r._$AP(t)}if(t!==a||s){let e=r._$AA;for(;e!==t;){const t=e.nextSibling;o.insertBefore(e,a),e=t}}}return r},c=(e,t,r=e)=>(e._$AI(t,r),e),l={},u=(e,t=l)=>e._$AH=t,h=e=>e._$AH,d=e=>{var t;null===(t=e._$AP)||void 0===t||t.call(e,!1,!0);let r=e._$AA;const i=e._$AB.nextSibling;for(;r!==i;){const e=r.nextSibling;r.remove(),r=e}}},875:(e,t,r)=>{"use strict";r.d(t,{XM:()=>n,Xe:()=>o,pX:()=>i});const i={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},n=e=>(...t)=>({_$litDirective$:e,values:t});class o{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,r){this._$Ct=e,this._$AM=t,this._$Ci=r}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}},577:(e,t,r)=>{"use strict";r.d(t,{o:()=>n});var i=r(3692);const n=e=>null!=e?e:i.Ld},7157:(e,t,r)=>{"use strict";r.d(t,{r:()=>a});var i=r(3692),n=r(875),o=r(4232);const s=(e,t,r)=>{const i=new Map;for(let n=t;n<=r;n++)i.set(e[n],n);return i},a=(0,n.XM)(class extends n.Xe{constructor(e){if(super(e),e.type!==n.pX.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,r){let i;void 0===r?r=t:void 0!==t&&(i=t);const n=[],o=[];let s=0;for(const t of e)n[s]=i?i(t,s):s,o[s]=r(t,s),s++;return{values:o,keys:n}}render(e,t,r){return this.dt(e,t,r).values}update(e,[t,r,n]){var a;const c=(0,o.i9)(e),{values:l,keys:u}=this.dt(t,r,n);if(!Array.isArray(c))return this.ht=u,l;const h=null!==(a=this.ht)&&void 0!==a?a:this.ht=[],d=[];let f,p,g=0,m=c.length-1,b=0,v=l.length-1;for(;g<=m&&b<=v;)if(null===c[g])g++;else if(null===c[m])m--;else if(h[g]===u[b])d[b]=(0,o.fk)(c[g],l[b]),g++,b++;else if(h[m]===u[v])d[v]=(0,o.fk)(c[m],l[v]),m--,v--;else if(h[g]===u[v])d[v]=(0,o.fk)(c[g],l[v]),(0,o._Y)(e,d[v+1],c[g]),g++,v--;else if(h[m]===u[b])d[b]=(0,o.fk)(c[m],l[b]),(0,o._Y)(e,c[g],c[m]),m--,b++;else if(void 0===f&&(f=s(u,b,v),p=s(h,g,m)),f.has(h[g]))if(f.has(h[m])){const t=p.get(u[b]),r=void 0!==t?c[t]:null;if(null===r){const t=(0,o._Y)(e,c[g]);(0,o.fk)(t,l[b]),d[b]=t}else d[b]=(0,o.fk)(r,l[b]),(0,o._Y)(e,c[g],r),c[t]=null;b++}else(0,o.ws)(c[m]),m--;else(0,o.ws)(c[g]),g++;for(;b<=v;){const t=(0,o._Y)(e,d[v+1]);(0,o.fk)(t,l[b]),d[b++]=t}for(;g<=m;){const e=c[g++];null!==e&&(0,o.ws)(e)}return this.ht=u,(0,o.hl)(e,d),i.Jb}})},3692:(e,t,r)=>{"use strict";var i;r.d(t,{Al:()=>z,Jb:()=>I,Ld:()=>C,YP:()=>A,dy:()=>E,sY:()=>K});const n=window,o=n.trustedTypes,s=o?o.createPolicy("lit-html",{createHTML:e=>e}):void 0,a="$lit$",c=`lit$${(Math.random()+"").slice(9)}$`,l="?"+c,u=`<${l}>`,h=document,d=()=>h.createComment(""),f=e=>null===e||"object"!=typeof e&&"function"!=typeof e,p=Array.isArray,g=e=>p(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]),m="[ \t\n\f\r]",b=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,y=/>/g,w=RegExp(`>|${m}(?:([^\\s"'>=/]+)(${m}*=${m}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),_=/'/g,x=/"/g,k=/^(?:script|style|textarea|title)$/i,S=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),E=S(1),A=S(2),I=Symbol.for("lit-noChange"),C=Symbol.for("lit-nothing"),T=new WeakMap,O=h.createTreeWalker(h,129,null,!1),M=(e,t)=>{const r=e.length-1,i=[];let n,o=2===t?"<svg>":"",l=b;for(let t=0;t<r;t++){const r=e[t];let s,h,d=-1,f=0;for(;f<r.length&&(l.lastIndex=f,h=l.exec(r),null!==h);)f=l.lastIndex,l===b?"!--"===h[1]?l=v:void 0!==h[1]?l=y:void 0!==h[2]?(k.test(h[2])&&(n=RegExp("</"+h[2],"g")),l=w):void 0!==h[3]&&(l=w):l===w?">"===h[0]?(l=null!=n?n:b,d=-1):void 0===h[1]?d=-2:(d=l.lastIndex-h[2].length,s=h[1],l=void 0===h[3]?w:'"'===h[3]?x:_):l===x||l===_?l=w:l===v||l===y?l=b:(l=w,n=void 0);const p=l===w&&e[t+1].startsWith("/>")?" ":"";o+=l===b?r+u:d>=0?(i.push(s),r.slice(0,d)+a+r.slice(d)+c+p):r+c+(-2===d?(i.push(void 0),t):p)}const h=o+(e[r]||"<?>")+(2===t?"</svg>":"");if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==s?s.createHTML(h):h,i]};class P{constructor({strings:e,_$litType$:t},r){let i;this.parts=[];let n=0,s=0;const u=e.length-1,h=this.parts,[f,p]=M(e,t);if(this.el=P.createElement(f,r),O.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(i=O.nextNode())&&h.length<u;){if(1===i.nodeType){if(i.hasAttributes()){const e=[];for(const t of i.getAttributeNames())if(t.endsWith(a)||t.startsWith(c)){const r=p[s++];if(e.push(t),void 0!==r){const e=i.getAttribute(r.toLowerCase()+a).split(c),t=/([.?@])?(.*)/.exec(r);h.push({type:1,index:n,name:t[2],strings:e,ctor:"."===t[1]?F:"?"===t[1]?L:"@"===t[1]?H:N})}else h.push({type:6,index:n})}for(const t of e)i.removeAttribute(t)}if(k.test(i.tagName)){const e=i.textContent.split(c),t=e.length-1;if(t>0){i.textContent=o?o.emptyScript:"";for(let r=0;r<t;r++)i.append(e[r],d()),O.nextNode(),h.push({type:2,index:++n});i.append(e[t],d())}}}else if(8===i.nodeType)if(i.data===l)h.push({type:2,index:n});else{let e=-1;for(;-1!==(e=i.data.indexOf(c,e+1));)h.push({type:7,index:n}),e+=c.length-1}n++}}static createElement(e,t){const r=h.createElement("template");return r.innerHTML=e,r}}function B(e,t,r=e,i){var n,o,s,a;if(t===I)return t;let c=void 0!==i?null===(n=r._$Co)||void 0===n?void 0:n[i]:r._$Cl;const l=f(t)?void 0:t._$litDirective$;return(null==c?void 0:c.constructor)!==l&&(null===(o=null==c?void 0:c._$AO)||void 0===o||o.call(c,!1),void 0===l?c=void 0:(c=new l(e),c._$AT(e,r,i)),void 0!==i?(null!==(s=(a=r)._$Co)&&void 0!==s?s:a._$Co=[])[i]=c:r._$Cl=c),void 0!==c&&(t=B(e,c._$AS(e,t.values),c,i)),t}class R{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:r},parts:i}=this._$AD,n=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:h).importNode(r,!0);O.currentNode=n;let o=O.nextNode(),s=0,a=0,c=i[0];for(;void 0!==c;){if(s===c.index){let t;2===c.type?t=new D(o,o.nextSibling,this,e):1===c.type?t=new c.ctor(o,c.name,c.strings,this,e):6===c.type&&(t=new j(o,this,e)),this._$AV.push(t),c=i[++a]}s!==(null==c?void 0:c.index)&&(o=O.nextNode(),s++)}return n}v(e){let t=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class D{constructor(e,t,r,i){var n;this.type=2,this._$AH=C,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=i,this._$Cp=null===(n=null==i?void 0:i.isConnected)||void 0===n||n}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=B(this,e,t),f(e)?e===C||null==e||""===e?(this._$AH!==C&&this._$AR(),this._$AH=C):e!==this._$AH&&e!==I&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):g(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==C&&f(this._$AH)?this._$AA.nextSibling.data=e:this.$(h.createTextNode(e)),this._$AH=e}g(e){var t;const{values:r,_$litType$:i}=e,n="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=P.createElement(i.h,this.options)),i);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===n)this._$AH.v(r);else{const e=new R(n,this),t=e.u(this.options);e.v(r),this.$(t),this._$AH=e}}_$AC(e){let t=T.get(e.strings);return void 0===t&&T.set(e.strings,t=new P(e)),t}T(e){p(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,i=0;for(const n of e)i===t.length?t.push(r=new D(this.k(d()),this.k(d()),this,this.options)):r=t[i],r._$AI(n),i++;i<t.length&&(this._$AR(r&&r._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var r;for(null===(r=this._$AP)||void 0===r||r.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class N{constructor(e,t,r,i,n){this.type=1,this._$AH=C,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=C}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,r,i){const n=this.strings;let o=!1;if(void 0===n)e=B(this,e,t,0),o=!f(e)||e!==this._$AH&&e!==I,o&&(this._$AH=e);else{const i=e;let s,a;for(e=n[0],s=0;s<n.length-1;s++)a=B(this,i[r+s],t,s),a===I&&(a=this._$AH[s]),o||(o=!f(a)||a!==this._$AH[s]),a===C?e=C:e!==C&&(e+=(null!=a?a:"")+n[s+1]),this._$AH[s]=a}o&&!i&&this.j(e)}j(e){e===C?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class F extends N{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===C?void 0:e}}const U=o?o.emptyScript:"";class L extends N{constructor(){super(...arguments),this.type=4}j(e){e&&e!==C?this.element.setAttribute(this.name,U):this.element.removeAttribute(this.name)}}class H extends N{constructor(e,t,r,i,n){super(e,t,r,i,n),this.type=5}_$AI(e,t=this){var r;if((e=null!==(r=B(this,e,t,0))&&void 0!==r?r:C)===I)return;const i=this._$AH,n=e===C&&i!==C||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==C&&(i===C||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,r;"function"==typeof this._$AH?this._$AH.call(null!==(r=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==r?r:this.element,e):this._$AH.handleEvent(e)}}class j{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){B(this,e)}}const z={O:a,P:c,A:l,C:1,M,L:R,D:g,R:B,I:D,V:N,H:L,N:H,U:F,F:j},$=n.litHtmlPolyfillSupport;null==$||$(P,D),(null!==(i=n.litHtmlVersions)&&void 0!==i?i:n.litHtmlVersions=[]).push("2.7.2");const K=(e,t,r)=>{var i,n;const o=null!==(i=null==r?void 0:r.renderBefore)&&void 0!==i?i:t;let s=o._$litPart$;if(void 0===s){const e=null!==(n=null==r?void 0:r.renderBefore)&&void 0!==n?n:null;o._$litPart$=s=new D(t.insertBefore(d(),e),e,void 0,null!=r?r:{})}return s._$AI(e),s}},6333:e=>{"use strict";e.exports={i8:"0.0.7"}},7087:e=>{"use strict";e.exports=JSON.parse('{"DEFAULT_FEE":1000,"DEFAULT_NETWORK":{"prefix":"cryptixdev","description":"Devnet","apiBaseUrl":"https://api.devnet.cryptix-network.org"}}')},2504:e=>{"use strict";e.exports={i8:"1.4.2"}},6625:e=>{"use strict";e.exports={i8:"8.25.47"}},4946:e=>{"use strict";e.exports=JSON.parse('{"aes-128-ecb":{"cipher":"AES","key":128,"iv":0,"mode":"ECB","type":"block"},"aes-192-ecb":{"cipher":"AES","key":192,"iv":0,"mode":"ECB","type":"block"},"aes-256-ecb":{"cipher":"AES","key":256,"iv":0,"mode":"ECB","type":"block"},"aes-128-cbc":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes-192-cbc":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes-256-cbc":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes128":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes192":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes256":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes-128-cfb":{"cipher":"AES","key":128,"iv":16,"mode":"CFB","type":"stream"},"aes-192-cfb":{"cipher":"AES","key":192,"iv":16,"mode":"CFB","type":"stream"},"aes-256-cfb":{"cipher":"AES","key":256,"iv":16,"mode":"CFB","type":"stream"},"aes-128-cfb8":{"cipher":"AES","key":128,"iv":16,"mode":"CFB8","type":"stream"},"aes-192-cfb8":{"cipher":"AES","key":192,"iv":16,"mode":"CFB8","type":"stream"},"aes-256-cfb8":{"cipher":"AES","key":256,"iv":16,"mode":"CFB8","type":"stream"},"aes-128-cfb1":{"cipher":"AES","key":128,"iv":16,"mode":"CFB1","type":"stream"},"aes-192-cfb1":{"cipher":"AES","key":192,"iv":16,"mode":"CFB1","type":"stream"},"aes-256-cfb1":{"cipher":"AES","key":256,"iv":16,"mode":"CFB1","type":"stream"},"aes-128-ofb":{"cipher":"AES","key":128,"iv":16,"mode":"OFB","type":"stream"},"aes-192-ofb":{"cipher":"AES","key":192,"iv":16,"mode":"OFB","type":"stream"},"aes-256-ofb":{"cipher":"AES","key":256,"iv":16,"mode":"OFB","type":"stream"},"aes-128-ctr":{"cipher":"AES","key":128,"iv":16,"mode":"CTR","type":"stream"},"aes-192-ctr":{"cipher":"AES","key":192,"iv":16,"mode":"CTR","type":"stream"},"aes-256-ctr":{"cipher":"AES","key":256,"iv":16,"mode":"CTR","type":"stream"},"aes-128-gcm":{"cipher":"AES","key":128,"iv":12,"mode":"GCM","type":"auth"},"aes-192-gcm":{"cipher":"AES","key":192,"iv":12,"mode":"GCM","type":"auth"},"aes-256-gcm":{"cipher":"AES","key":256,"iv":12,"mode":"GCM","type":"auth"}}')},5207:e=>{"use strict";e.exports=JSON.parse('{"sha224WithRSAEncryption":{"sign":"rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"RSA-SHA224":{"sign":"ecdsa/rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"sha256WithRSAEncryption":{"sign":"rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"RSA-SHA256":{"sign":"ecdsa/rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"sha384WithRSAEncryption":{"sign":"rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"RSA-SHA384":{"sign":"ecdsa/rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"sha512WithRSAEncryption":{"sign":"rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA512":{"sign":"ecdsa/rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA1":{"sign":"rsa","hash":"sha1","id":"3021300906052b0e03021a05000414"},"ecdsa-with-SHA1":{"sign":"ecdsa","hash":"sha1","id":""},"sha256":{"sign":"ecdsa","hash":"sha256","id":""},"sha224":{"sign":"ecdsa","hash":"sha224","id":""},"sha384":{"sign":"ecdsa","hash":"sha384","id":""},"sha512":{"sign":"ecdsa","hash":"sha512","id":""},"DSA-SHA":{"sign":"dsa","hash":"sha1","id":""},"DSA-SHA1":{"sign":"dsa","hash":"sha1","id":""},"DSA":{"sign":"dsa","hash":"sha1","id":""},"DSA-WITH-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-WITH-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-WITH-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-WITH-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-RIPEMD160":{"sign":"dsa","hash":"rmd160","id":""},"ripemd160WithRSA":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"RSA-RIPEMD160":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"md5WithRSAEncryption":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"},"RSA-MD5":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"}}')},1308:e=>{"use strict";e.exports=JSON.parse('{"1.3.132.0.10":"secp256k1","1.3.132.0.33":"p224","1.2.840.10045.3.1.1":"p192","1.2.840.10045.3.1.7":"p256","1.3.132.0.34":"p384","1.3.132.0.35":"p521"}')},9799:e=>{"use strict";e.exports=JSON.parse('{"modp1":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"},"modp2":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"},"modp5":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"},"modp14":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"},"modp15":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"},"modp16":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"},"modp17":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"},"modp18":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"}}')},4843:e=>{"use strict";e.exports=JSON.parse('{"secp128r1":{"p":"fffffffdffffffffffffffffffffffff","a":"fffffffdfffffffffffffffffffffffc","b":"e87579c11079f43dd824993c2cee5ed3","n":"fffffffe0000000075a30d1b9038a115","h":"01","Gx":"161ff7528b899b2d0c28607ca52c5b86","Gy":"cf5ac8395bafeb13c02da292dded7a83"},"secp160k1":{"p":"fffffffffffffffffffffffffffffffeffffac73","a":"00","b":"07","n":"0100000000000000000001b8fa16dfab9aca16b6b3","h":"01","Gx":"3b4c382ce37aa192a4019e763036f4f5dd4d7ebb","Gy":"938cf935318fdced6bc28286531733c3f03c4fee"},"secp160r1":{"p":"ffffffffffffffffffffffffffffffff7fffffff","a":"ffffffffffffffffffffffffffffffff7ffffffc","b":"1c97befc54bd7a8b65acf89f81d4d4adc565fa45","n":"0100000000000000000001f4c8f927aed3ca752257","h":"01","Gx":"4a96b5688ef573284664698968c38bb913cbfc82","Gy":"23a628553168947d59dcc912042351377ac5fb32"},"secp192k1":{"p":"fffffffffffffffffffffffffffffffffffffffeffffee37","a":"00","b":"03","n":"fffffffffffffffffffffffe26f2fc170f69466a74defd8d","h":"01","Gx":"db4ff10ec057e9ae26b07d0280b7f4341da5d1b1eae06c7d","Gy":"9b2f2f6d9c5628a7844163d015be86344082aa88d95e2f9d"},"secp192r1":{"p":"fffffffffffffffffffffffffffffffeffffffffffffffff","a":"fffffffffffffffffffffffffffffffefffffffffffffffc","b":"64210519e59c80e70fa7e9ab72243049feb8deecc146b9b1","n":"ffffffffffffffffffffffff99def836146bc9b1b4d22831","h":"01","Gx":"188da80eb03090f67cbf20eb43a18800f4ff0afd82ff1012","Gy":"07192b95ffc8da78631011ed6b24cdd573f977a11e794811"},"secp256k1":{"p":"fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f","a":"00","b":"07","n":"fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141","h":"01","Gx":"79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798","Gy":"483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8"},"secp256r1":{"p":"ffffffff00000001000000000000000000000000ffffffffffffffffffffffff","a":"ffffffff00000001000000000000000000000000fffffffffffffffffffffffc","b":"5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b","n":"ffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551","h":"01","Gx":"6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296","Gy":"4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"}}')},8597:e=>{"use strict";e.exports={i8:"6.6.1"}},2562:e=>{"use strict";e.exports=JSON.parse('{"2.16.840.1.101.3.4.1.1":"aes-128-ecb","2.16.840.1.101.3.4.1.2":"aes-128-cbc","2.16.840.1.101.3.4.1.3":"aes-128-ofb","2.16.840.1.101.3.4.1.4":"aes-128-cfb","2.16.840.1.101.3.4.1.21":"aes-192-ecb","2.16.840.1.101.3.4.1.22":"aes-192-cbc","2.16.840.1.101.3.4.1.23":"aes-192-ofb","2.16.840.1.101.3.4.1.24":"aes-192-cfb","2.16.840.1.101.3.4.1.41":"aes-256-ecb","2.16.840.1.101.3.4.1.42":"aes-256-cbc","2.16.840.1.101.3.4.1.43":"aes-256-ofb","2.16.840.1.101.3.4.1.44":"aes-256-cfb"}')}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var r=__webpack_module_cache__[e]={id:e,loaded:!1,exports:{}};return __webpack_modules__[e].call(r.exports,r,r.exports,__webpack_require__),r.loaded=!0,r.exports}__webpack_require__.m=__webpack_modules__,__webpack_require__.amdO={},__webpack_require__.d=(e,t)=>{for(var r in t)__webpack_require__.o(t,r)&&!__webpack_require__.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),__webpack_require__.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e;__webpack_require__.g.importScripts&&(e=__webpack_require__.g.location+"");var t=__webpack_require__.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),__webpack_require__.p=e})(),__webpack_require__.b=document.baseURI||self.location.href;var __webpack_exports__={};(()=>{"use strict";const e=Object.prototype.toString,t=(t,r)=>e.call(t)=="[object "+r+"]",r={};r.toString=e,r.is=t,r.isArray=e=>Array.isArray(e),r.isObject=e=>t(e,"Object"),r.isString=e=>t(e,"String"),r.isNumber=e=>t(e,"Number"),r.isBoolean=e=>t(e,"Boolean"),r.isFunction=e=>t(e,"Function"),r.isUndefined=e=>t(e,"Undefined");const i=e=>{let t="";for(;e;){let r=e%58;e=Math.floor(e/58),t="123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"[r].toString()+t}return t};let n=new Uint32Array(6);const o=(e=26)=>(window.crypto.getRandomValues(n),[...n].map((e=>i(e))).join("").substring(0,e)),s=(e,t)=>"function"==typeof e?setTimeout(e,t||0):setTimeout(t,e||0),a=e=>{clearTimeout(e)};class c{constructor(){this.events=new Map,this.refs=new Map,this.listeners=[],this.mevents=[],this.on("destroy",(()=>{this.mevents.forEach((e=>{this.off(e)}))}))}on(e,t){if(!t)throw new Error("events::on() - callback is required");let r=o();return this.events.has(e)||this.events.set(e,new Map),this.events.get(e).set(r,t),this.refs.set(r,e),r}mon(e,t){let r=this.on(e,t);return this.mevents.push(r),r}off(e,t){if(e){let t=this.refs.get(e);this.refs.delete(e);let r=this.events.get(t);r&&r.delete(e)}else t&&((this.events.get(t)||[]).forEach(((e,t)=>{this.refs.delete(t)})),this.events.delete(t))}emit(e,t){let r=this.events.get(e);r&&r.forEach((e=>{e(t)})),this.listeners.forEach((r=>{r.emit.call(r,e,t)}))}emitAsync(e,...t){s((()=>{this.emit(e,...t)}))}addListener(e){this.listeners.indexOf(e)<0&&this.listeners.push(e)}removeListener(e){let t=this.listeners.indexOf(e);t>-1&&this.listeners.splice(t,1)}getListeners(){return this.listeners}}class l{constructor(e){this.online=!1,this.options=Object.assign({path:"/grpc",id:o(),timeout:30,origin:window.location.origin,websocketMode:"RPC"},e||{}),this.timeout=this.options.timeout,this.id=this.options.id,this.transport=this.options.transport||"native",this.init()}init(){this.initEvent(),this.connected=!1,this.options.path&&this.connect()}initEvent(){this.pending=new Map,this.events=new c}connect_impl(){switch(this.transport){case"native":this.options.origin.replace(/^http/,"ws"),this.options.path,this.socket_impl=new WebSocket(this.options.origin.replace(/^http/,"ws")+this.options.path);break;case"sockjs":this.socket_impl=SockJS(this.options.origin+this.options.path,this.options.args||{})}this.socket_impl.onopen=e=>{this.online=!0,console.log("RPC connected",this.id),this.events.emit("open")},this.socket_impl.onerror=e=>{console.log("RPC connect_error",e),this.events.emit("connect.error",e),this.socket_impl.close()},this.socket_impl.onmessage=e=>{let[t,r]=JSON.parse(e.data);this.intake.emit(t,r)},this.socket_impl.onclose=e=>{this.online=!1,console.log("RPC disconnected",this.id),this.events.emit("disconnect"),this.pending.forEach(((e,t)=>{e.callback({error:"Connection Closed"})})),this.pending.clear(),this.reconnect_impl()}}reconnect_impl(){s(1e3,(()=>{this.connect_impl()}))}async connect(){if(this._connected||!this.options.path)return;this._connected=!0,this.events.emitAsync("rpc-connecting"),this.intake=new c,this.socket={on:(...e)=>{this.intake.on(...e)},emit:(e,t)=>{this.socket_impl.send(JSON.stringify([e,t]))}},this.socket.on("auth.setcookie",(e=>{document.cookie=e.cookie})),this.socket.on("auth.getcookie",(()=>{let e={cookie:0===document.cookie.length?null:document.cookie};this.socket_impl.send(JSON.stringify(["auth.cookie",e]))})),this.socket.on("ready",(e=>{if(console.log("RPC ready",e),e.websocketMode!=this.options.websocketMode)throw new Error(`Error - incompatible websocket mode: client ${this.options.websocketMode} server: ${e.websocketMode}`);this.clearPending(),this.events.emit("connect")})),this.connect_impl(),await this.initSocketHandlers();let e=()=>{let t=Date.now(),r=[];this.pending.forEach(((e,i)=>{t-e.ts>1e3*this.timeout&&(console.log("timeout:",e.req),e.callback({error:"Timeout",code:"TIMEOUT"}),r.push(i))})),r.forEach((e=>{this.pending.delete(e)})),s(1e3,e)};s(1e3,e)}clearPending(){this.pending.forEach(((e,t)=>{e.callback({error:"Timeout",code:"CONNECT"}),this.pending.delete(t)}))}close(){this.socket&&this.socket.close()}on(e,t){return this.events.on(e,t)}off(e,t){this.events.off(e,t)}initSocketHandlers(){return Promise.resolve()}}class u{constructor(e,t){this.id=t.id||o(),this.rpc=e,this.options=t;const{client:r,method:i,config:n}=t;this.client=r,this.method=i,this.config=n,this.rids=new Set,this.init()}init(){this.initEvents()}initEvents(){this.events=new c,this.streamDataSubId=this.rpc.on("grpc.stream.data",(e=>{const{sIds:t,data:r}=e;t.includes(this.id)&&this.events.emit("data",r)})),this.streamEndSubId=this.rpc.on("grpc.stream.end",(e=>{const{sIds:t}=e;t.includes(this.id)&&(this.events.emit("end"),this.rpc.removePendings(this.rids),this.rpc.off(this.streamEndSubId),this.rpc.off(this.streamErrorSubId),this.rpc.off(this.streamDataSubId))})),this.streamErrorSubId=this.rpc.on("grpc.stream.error",(e=>{const{sIds:t,error:r}=e;t.includes(this.id)&&(console.log("grpc.stream.error",e),this.events.emit("error",r))}))}on(e,t){return this.events.on(e,t)}off(e,t){this.events.off(e,t)}write(e){const{client:t,method:r}=this;let i=!0,n=()=>{i=!1,n.rid&&this.rids.delete(n.rid)},o=this.rpc.streamMessage(this.id,t,r,e,((e,t)=>{n(),e?this.events.emit("error",e):this.events.emit("data",t)}));i&&this.rids.add(o),n.rid=o}end(){const{client:e,method:t}=this;this.rpc.socketEmit("stream.end",{client:e,method:t,sId:this.id})}}class h extends l{constructor(e){super(e),this.on("grpc.proto",(e=>{this.buildClients(e.proto),this.events.emit("ready",this.clients)})),this.on("connect",(()=>{this.socket.emit("grpc.proto.get")}))}initSocketHandlers(){return this.socket.on("message",(({subject:e,data:t})=>{this.trace&&(1===this.trace||!0===this.trace?console.log("gRPC ["+this.id+"]:",e):2===this.trace&&console.log("gRPC ["+this.id+"]:",e,t)),this.events.emit(e,t)})),this.socket.on("grpc.response",(e=>{let{rid:t,error:r,response:i}=e,n=t&&this.pending.get(t);n?n.callback.call(this,r,i):t&&console.log("grpc.response received unknown callback (strange server-side retransmit?)"),t&&this.pending.delete(t)})),this.socket.on("grpc.stream.response",(e=>{let{rid:t,sId:r,error:i,response:n}=e,o=t&&this.pending.get(t);o?o.callback.call(this,i,n):t&&console.log("grpc.stream.response received unknown callback"),t&&this.pending.delete(t)})),Promise.resolve()}buildClients({services:e,msg:t}){this.clients={},Object.keys(e).forEach((t=>{this.clients[t]=this.buildClient(t,e[t])}))}buildClient(e,t){let r={};return Object.keys(t).forEach((i=>{r[i]=this.buildMethod(e,i,t[i])})),r}buildMethod(e,t,r){console.log("buildMethod:config",e,t,r);const{requestStream:i,responseStream:n}=r;return i&&n?()=>new u(this,{client:e,method:t,config:r}):(r,i)=>{this.rpcCall(e,t,r,i)}}socketEmit(e,t){this.socket.emit("grpc."+e,t)}rpcCall(e,t,r,i){if("function"==typeof r&&(i=r,r=void 0),!i)return this.socketEmit("message",{client:e,method:t,data:r});let n=o();return this.pending.set(n,{ts:Date.now(),req:{client:e,method:t,data:r},callback:i}),this.socket.emit("grpc.request",{rid:n,req:{client:e,method:t,data:r}}),n}streamMessage(e,t,r,i,n){let s=o();return this.pending.set(s,{ts:Date.now(),sId:e,req:{client:t,method:r,data:i},callback:n}),this.socket.emit("grpc.stream.write",{rid:s,sId:e,req:{client:t,method:r,data:i}}),s}removePendings(e){e.forEach((e=>{this.pending.delete(e)}))}}window.FlowGRPCWeb=h;var d=function(e,t,r,i){return new(r||(r=Promise))((function(n,o){function s(e){try{c(i.next(e))}catch(e){o(e)}}function a(e){try{c(i.throw(e))}catch(e){o(e)}}function c(e){e.done?n(e.value):function(e){return e instanceof r?e:new r((function(t){t(e)}))}(e.value).then(s,a)}c((i=i.apply(e,t||[])).next())}))};class f{constructor(e={}){this.isReady=!1,this.queue=[],this.reconnect=!0,this.verbose=!1,this.subscribers=new Map,this.isConnected=!1,this.connectCBs=[],this.connectFailureCBs=[],this.errorCBs=[],this.disconnectCBs=[],this.streamUid="",this.options=Object.assign({reconnect:!0,verbose:!0,uid:(1e3*Math.random()).toFixed(0)},e||{}),this.log=Function.prototype.bind.call(console.log,console,`[Cryptix gRPC ${this.options.uid}]:`),this.verbose=this.options.verbose,this.pending={},this.reconnect=this.options.reconnect,this.client=new h(e.clientConfig||{}),this.serviceClientSignal=(()=>{let e={},t=new Promise(((t,r)=>{e={resolve:t,reject:r}}));return Object.assign(t,e),t})(),this.client.on("ready",(e=>{if(console.log("gRPCWeb::::clients",e),this.serviceClient)return void s(100,(()=>{this.reconnectStream()}));let{RPC:t}=e;this.serviceClient=t,this.serviceClientSignal.resolve()})),this.connect()}setStreamUid(e){this.streamUid=e}getServiceClient(){return d(this,void 0,void 0,(function*(){return yield this.serviceClientSignal,this.serviceClient}))}connect(){return this.reconnect=!0,this.reconnectStream()}reconnectStream(){this._setConnected(!1),this.reconnect_dpc&&(a(this.reconnect_dpc),delete this.reconnect_dpc),this.clearPending(),delete this.stream,this.reconnect&&(this.reconnect_dpc=s(1e3,(()=>{this._reconnectStream()})))}_reconnectStream(){return d(this,void 0,void 0,(function*(){this.verbose&&this.log("gRPC Client connecting to",this.options.clientConfig);const e=yield this.getServiceClient();this.stream=e.MessageStream(),this.initIntake(this.stream),this.isReady=!0,this.processQueue(),this.stream.on("error",(e=>{this.errorCBs.forEach((t=>t(e.toString(),e))),this.verbose&&this.log("stream:error",e),"TIMEOUT"==(null==e?void 0:e.code)&&this.isConnected||this.reconnectStream()})),this.stream.on("end",((...e)=>{this.verbose&&this.log("stream:end",...e),this.reconnectStream()})),yield new Promise((e=>{s(100,(()=>d(this,void 0,void 0,(function*(){let t=yield this.request("getVirtualSelectedParentBlueScoreRequest",{}).catch((e=>{this.connectFailureCBs.forEach((t=>t(e)))}));this.verbose&&this.log("getVirtualSelectedParentBlueScoreRequest:response",t),t&&t.blueScore&&this._setConnected(!0),e()}))))}))}))}initIntake(e){e.on("data",(t=>{if(this.verbose&&this.log("initIntake:data","stream-id:"+e.id,t),t.payload){let e=t.payload,r=t[e],i=e.replace(/^get|Response$/gi,"").toLowerCase();this.handleIntake({name:e,payload:r,ident:i})}}))}handleIntake(e){if(this.intakeHandler)this.intakeHandler(e);else{let t=this.pending[e.name];if(this.verbose&&console.log("intake:",e,"handlers:",t),t&&t.length){let r=t.shift();r&&r.resolve(e.payload)}let r=this.subscribers.get(e.name);r&&r.map((t=>{t.callback(e.payload)}))}}setIntakeHandler(e){this.intakeHandler=e}processQueue(){if(!this.isReady||!this.streamUid)return;let e=this.queue.shift();for(;e;){const t=e.method.replace(/Request$/,"Response");this.pending[t]||(this.pending[t]=[]),this.pending[t].push(e);let r={__streamuid__:this.streamUid};r[e.method]=e.data,this.stream.write(r),e=this.queue.shift()}}clearPending(){Object.keys(this.pending).forEach((e=>{this.pending[e].forEach((e=>e.reject("closing by force"))),this.pending[e]=[]}))}_setConnected(e){this.isConnected!=e&&(this.verbose&&this.log("_setConnected",this.isConnected,e),this.isConnected=e,(e?this.connectCBs:this.disconnectCBs).forEach((e=>{e()})))}onConnect(e){this.connectCBs.push(e),this.isConnected&&e()}onConnectFailure(e){this.connectFailureCBs.push(e)}onError(e){this.errorCBs.push(e)}onDisconnect(e){this.disconnectCBs.push(e)}disconnect(){var e;console.log("disconnect",null===(e=this.stream)||void 0===e?void 0:e.id),this.reconnect_dpc&&(a(this.reconnect_dpc),delete this.reconnect_dpc),this.reconnect=!1,this.stream&&this.stream.end(),this.clearPending()}request(e,t){return new Promise(((r,i)=>{this.queue.push({method:e,data:t,resolve:r,reject:i}),this.processQueue()}))}subscribe(e,t={},r){if("function"==typeof t&&(r=t,t={}),!this.client)return Promise.reject("not connected");let i=this.subject2EventName(e);console.log("subscribe:eventName",i);let n=this.subscribers.get(i);n||(n=[],this.subscribers.set(i,n));let o=(1e5*Math.random()+Date.now()).toFixed(0);n.push({uid:o,callback:r});let s=this.request(e,t);return s.uid=o,s}subject2EventName(e){let t=e.replace("notify","").replace("Request","Notification");return t[0].toLowerCase()+t.substr(1)}unSubscribe(e,t=""){let r=this.subject2EventName(e),i=this.subscribers.get(r);i&&(t?(i=i.filter((e=>e.uid!=t)),this.subscribers.set(r,i)):this.subscribers.delete(r))}subscribeChainChanged(e){return this.subscribe("notifyChainChangedRequest",{},e)}subscribeBlockAdded(e){return this.subscribe("notifyBlockAddedRequest",{},e)}subscribeVirtualSelectedParentBlueScoreChanged(e){return this.subscribe("notifyVirtualSelectedParentBlueScoreChangedRequest",{},e)}subscribeUtxosChanged(e,t){return this.subscribe("notifyUtxosChangedRequest",{addresses:e},t)}unSubscribeUtxosChanged(e=""){this.unSubscribe("notifyUtxosChangedRequest",e)}getBlock(e,t=!0){return this.request("getBlockRequest",{hash:e,includeTransactions:t})}getTransactionsByAddresses(e,t){return this.request("getTransactionsByAddressesRequest",{startingBlockHash:e,addresses:t})}getUtxosByAddresses(e){return this.request("getUtxosByAddressesRequest",{addresses:e})}submitTransaction(e){return this.request("submitTransactionRequest",e)}getVirtualSelectedParentBlueScore(){return this.request("getVirtualSelectedParentBlueScoreRequest",{})}getBlockDagInfo(){return this.request("getBlockDagInfoRequest",{})}subscribeVirtualDaaScoreChanged(e){return this.subscribe("notifyVirtualDaaScoreChangedRequest",{},e)}}var p=__webpack_require__(3523);const g=[];class m extends p.Hc{static get properties(){return{for:{type:String},type:{type:String}}}static get styles(){return p.iv`
			:host {
				display : block;
			}
		`}constructor(){super(),g.push(this)}render(){return p.dy`<slot></slot>`}}m.define("flow-anchor");var b=__webpack_require__(4213),v=__webpack_require__(2853);class y extends p.Hc{static get properties(){return{caption:{type:String},version:{type:String},icon:{type:String},logo:{type:String},tabs:{type:Array},"active-tab":{type:String},"target-display":{type:String,value:"block"}}}constructor(){super(),this.tabs=null,this["target-display"]="block","undefined"!=typeof nw&&void 0!==nw.Window?(this.window=nw.Window.get(),this.window.on("maximize",(()=>{this.window._maximize=!0,this.updateMaxIcon()})),this.window.on("restore",(()=>{this.window._maximize=!1,this.updateMaxIcon()})),this.window.on("resize",(()=>{this.window._maximize=!1,this.updateMaxIcon()}))):this.window=window}static get styles(){return[this.svgStyle,p.iv`
			/*div { border: 1px solid red; }*/
			:host {
				width:var(--flow-caption-bar-width, 100vw);
				user-select:none;
			}
			.host {
				width:var(--flow-caption-bar-host-width, calc(100vw - 8px));
				min-height: 28px;
				/* background-color: green; */
				display: flex;
				flex-direction: row;
				font-family: var(--flow-caption-bar-font-family, var(--flow-font-family, "Julius Sans One"));
				font-weight: var(--flow-caption-bar-font-weight, var(--flow-font-weight, bold));
				font-size: var(--flow-caption-bar-font-size, var(--flow-font-size, 1.5rem));
				color: var(--flow-caption-bar-primary-color, var(--flow-primary-color, rgba(0,151,115,1.0)));
				padding: 4px;
				/*border-bottom: 1px solid rgba(0,151,115,0.5);*/
			}

			.caption {
				-webkit-app-region: drag;
				padding-left: 8px;
				padding-top: 2px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				/*border: 1px solid red;*/
			}

			.tabs {
				flex: 1;
				margin:var(--flow-caption-tabs-margin, 0px);
				z-index:3;
			}
			svg.icon{
				cursor:pointer;
			}
			fa-icon,
			svg.icon:hove{
				margin: 0px 4px 0px 4px;
				--fa-icon-size: 28px;
				--fa-icon-color: var(--flow-primary-color, rgba(0,151,115,1.0));
			}

			fa-icon:hover,
			svg.icon:hove{
				filter: brightness(0.8);
			}
			fa-icon:active {
				transform: translate(1px,1px);	
			}

			.logo {
				left: 0px;
				top: 0px;
				width:52px;
				height:52px;
				background-position: center;
				background-size: contain;
				background-repeat: no-repeat;
				z-index: 4;
				background-color:var(--flow-caption-logo-bg-color,var(--flow-background-color,#232323));
				margin-left: -4px;
				padding: 4px 8px 4px 4px;
			}
			.caption{display:flex;flex-direction:column;}
			.version {
				font-size: 12px;
				/*border: 1px solid red;*/
				/*margin: 10px 8px 4px 4px;*/
				padding: 4px 8px 2px 4px;
				opacity: 0.75;
				font-family: "Consolas";
				display: flex;
				flex-direction: column;
			}
			.language-icon{position:relative;margin-right:10px;}
			.language-icon svg{cursor:pointer}
			.language-icon:after{
				content:"";
				position:absolute;
				top:12px;
				right:-5px;
				width:0px;
				height:0px;
				border:5px solid transparent;
				border-top:5px solid var(--flow-primary-color);
			}
			.logo-icon,.logo,.caption{-webkit-app-region:drag;cursor:move;}

			.caption-content { height: min-content;display:flex;flex-direction:row;  }
			*[flex] { flex: 1; }
			
		`]}render(){let e=this.tabs?this.tabs.slice(0):[];return this.maxicon=this.window._maximize?"window-restore":"window-maximize",p.dy`
			<div class='host'>
				${this.icon?p.dy`<svg class="icon" @click="${this.onIconClick}">
						<use href="${this.iconPath(this.icon)}"></use>
					</svg>`:""}
				${this.logo?p.dy`<div class="logo" @click="${this.onLogoClick}"
						style="background-image:url(${this.logo});"></div>`:""}
				<div class="caption">
					<div class="caption-content">
						<div class="title">
							${this.caption||p.dy`<slot></slot>`}
						</div>
						<div class="version">
							<div flex></div>
							<div>
								${this.version?`v${this.version}`:p.dy`<slot name='version'></slot>`}
							</div>
						</div>
					</div>
					<div flex>
					</div>
				</div>
				<div class="tabs">
				<flow-tabs active=${this["active-tab"]} .tabs=${e} part="tabs"
					target-display="${this["target-display"]}">
					<slot name="flow-tabs"></slot>
				</flow-tabs>
				</div>

				<div class="language-icon">
					<svg class="icon" @click="${this.onLangClick}">
						<use href="${this.iconPath("language")}"></use>
					</svg>
				</div>
				<svg class="icon" @click="${this.minimize}">
					<use href="${this.iconPath("window-minimize")}"></use>
				</svg>
				<svg class="icon" @click="${this.toggleMaximize}">
					<use href="${this.iconPath(this.maxicon)}"></use>
				</svg>
				<svg class="icon" @click="${this.close}">
					<use href="${this.iconPath("times-circle")}"></use>
				</svg>
			</div>
		`}requestTabsUpdate(){this.shadowRoot.querySelector("flow-tabs").requestUpdate()}onIconClick(e){this.fire("flow-caption-icon-clicked",{e})}onLogoClick(e){this.fire("flow-caption-logo-clicked",{e})}onLangClick(e){this.openI18nDialog(e.target)}openI18nDialog(e){v.iV.open(e)}updateMaxIcon(){this.maxicon=this.window._maximize?"window-restore":"window-maximize",this.update()}toggleMaximize(){this.window._maximize?this.window.restore():this.window.maximize()}minimize(e){this.window.minimize()}maximize(e){this.window.maximize()}close(e){this.window.close()}}y.define("flow-caption-bar");class w extends p.Hc{static get styles(){return p.iv`
		.ext-cross:before, .checkbox__checker:before, .checkbox__cross:before, .checkbox__ok:before, .ext-cross:after, .checkbox__checker:after, .checkbox__cross:after, .checkbox__ok:after {
			content: "";
			display: block;
			position: absolute;
			width: 14px;
			height: 2px;
			margin: 0 auto;
			top: 20px;
			left: 0;
			right: 0;
			background-color: #bf1e1e;
			border-radius: 5px;
			transition-duration: .3s;
		}
		.ext-cross:before, .checkbox__checker:before, .checkbox__cross:before, .checkbox__ok:before {
			-webkit-transform: rotateZ(45deg);
			transform: rotateZ(45deg);
		}
		.ext-cross:after, .checkbox__checker:after, .checkbox__cross:after, .checkbox__ok:after {
			-webkit-transform: rotateZ(-45deg);
			transform: rotateZ(-45deg);
		}

		.ext-ok:before, .checkbox__toggle:checked + .checkbox__checker:before, .checkbox__ok:before, .ext-ok:after, .checkbox__toggle:checked + .checkbox__checker:after, .checkbox__ok:after {
			background-color: #0cb018;
		}
		.ext-ok:before, .checkbox__toggle:checked + .checkbox__checker:before, .checkbox__ok:before {
			width: 6px;
			top: 23px;
			left: -7px;
		}
		.ext-ok:after, .checkbox__toggle:checked + .checkbox__checker:after, .checkbox__ok:after {
			width: 12px;
			left: 5px;
		}

		.checkbox {
			width: 100px;
			margin: 0 auto 30px auto;
		}
		:host([slot="input"]) .checkbox{
			margin:0px;
		}
		.checkbox__container {
			display: block;
			position: relative;
			height: 42px;
			cursor: pointer;
		}
		.checkbox__toggle {
			display: none;
		}
		:host(:not(.size-animate)) .checkbox__toggle:checked + .checkbox__checker {
			left: calc(100% - 43px);
			-webkit-transform: rotateZ(360deg);
			transform: rotateZ(360deg);
		}
		:host(.size-animate) .checkbox__toggle+.checkbox__checker{
			animation:animate1 .3s;
		}
		:host(.size-animate) .checkbox__toggle:checked + .checkbox__checker {
			left: calc(100% - 43px);
			/*-webkit-transform: rotateZ(360deg);
			transform: rotateZ(360deg);*/
			animation:animate .3s;
		}
		
		@keyframes animate1{
			0%{-webkit-transform:scale(1) rotateZ(360deg);transform:scale(1) rotateZ(360deg)}
			50%{-webkit-transform:scale(0.3) rotateZ(180deg);transform:scale(0.3) rotateZ(180deg)}
			100%{-webkit-transform:scale(1) rotateZ(0deg);transform:scale(1) rotateZ(0deg)}
		}
		@keyframes animate{
			0%{-webkit-transform:scale(1) rotateZ(0deg);transform:scale(1) rotateZ(0deg)}
			50%{-webkit-transform:scale(0.3) rotateZ(180deg);transform:scale(0.3) rotateZ(180deg)}
			100%{-webkit-transform:scale(1) rotateZ(360deg);transform:scale(1) rotateZ(360deg)}
		}

		.checkbox__checker, .checkbox__cross, .checkbox__ok {
			display: block;
			position: absolute;
			height: 43px;
			width: 43px;
			top: -1px;
			left: 0px;
			z-index: 1;
		}
		.checkbox__checker {
			border-radius: 50%;
			background-color: #fff;
			box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
			transition: .3s;
			z-index: 2;
		}
		.checkbox__checker:before, .checkbox__checker:after {
			transition-duration: .3s;
		}
		.checkbox__cross:before, .checkbox__cross:after, .checkbox__ok:before, .checkbox__ok:after {
			background-color: #ddd;
		}
		.checkbox__ok {
			left: calc(100% - 43px);
		}
		.checkbox__txt-left, .checkbox__txt-right {
			display: block;
			position: absolute;
			width: 42px;
			top: 15px;
			text-align: center;
			color: #fff;
			font-size: 12px;
			z-index: 1;
		}
		.checkbox__txt-right {
			right: 0px;
		}
		.checkbox__bg {
			position: absolute;
			top: 0;
			left: 0;
			fill: #aaa;
			width: 100%;
			height: 100%;
		}
		`}render(){return p.dy`
		<div class="checkbox">
			<label class="checkbox__container">
				<input class="checkbox__toggle" type="checkbox" @change="${this.onChange}">
				<span class="checkbox__checker"></span>
				<span class="checkbox__cross"></span>
				<span class="checkbox__ok"></span>
				<svg class="checkbox__bg" space="preserve" __style="enable-background:new 0 0 110 43.76;" version="1.1" viewBox="0 0 110 43.76">
					<path class="shape" d="M88.256,43.76c12.188,0,21.88-9.796,21.88-21.88S100.247,0,88.256,0c-15.745,0-20.67,12.281-33.257,12.281,S38.16,0,21.731,0C9.622,0-0.149,9.796-0.149,21.88s9.672,21.88,21.88,21.88c17.519,0,20.67-13.384,33.263-13.384,S72.784,43.76,88.256,43.76z"></path>
				</svg>
			</label>
		</div>
		`}onChange(e){this.fire("changed",{checked:e.target.checked})}}w.define("flow-checkbox-styled");class x extends p.Hc{static get properties(){return{checked:{type:Boolean,reflect:!0},readonly:{type:Boolean,reflect:!0},name:{type:String},inputValue:{type:String}}}static get styles(){return p.iv`
			:host{
				display:inline-block;
				margin-right: var(--flow-checkbox-margin-right, 10px);
			}
			:host(.block){
				display: block;
				width: max-content;
				margin-bottom: var(--flow-checkbox-margin-bottom);
			}
			:host(:not([disabled]):not([readonly])) .checkbox{
				cursor:pointer;
			}
			.checkbox{
				display:flex;align-items:center;
			    user-select:none;position:relative;
			}
			.checkbox-input{
			    position:absolute;
			    opacity:0;
			    z-index:0;
				top:0px;
			}
			.checkbox-outer{
				position:relative;
			    top:0px;
			    left:0;
			    display:inline-block;
			    box-sizing:border-box;
			    width: var(--flow-checkbox-outer-width,24px);
			    height: var(--flow-checkbox-outer-height,24px);
			    margin: var(--flow-checkbox-outer-margin, 0px 10px 0px 0px);
			    cursor:pointer;
			    overflow:hidden;
			    border: var(--flow-checkbox-outer-border,2px solid rgba(0,0,0,.54));
			    border-color:var(--flow-checkbox-color, var(--flow-border-color, rgba(0,0,0,.54)));
			    border-radius:2px;
			    z-index:2;
			    background-color:var(--flow-checkbox-bg, var(--flow-input-bg, inherit));
			    transition-duration: .28s;
			    transition-timing-function: cubic-bezier(.4,0,.2,1);
			    transition-property: background;
			}
			.outline{
				position: absolute;
			    top: 0;
			    left: 0;
			    height: var(--flow-checkbox-outline-height, 100%);
			    width: var(--flow-checkbox-outline-width,100%);
			    -webkit-mask: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgdmVyc2lvbj0iMS4xIgogICB2aWV3Qm94PSIwIDAgMSAxIgogICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ij4KICA8ZGVmcz4KICAgIDxjbGlwUGF0aCBpZD0iY2xpcCI+CiAgICAgIDxwYXRoCiAgICAgICAgIGQ9Ik0gMCwwIDAsMSAxLDEgMSwwIDAsMCB6IE0gMC44NTM0Mzc1LDAuMTY3MTg3NSAwLjk1OTY4NzUsMC4yNzMxMjUgMC40MjkzNzUsMC44MDM0Mzc1IDAuMzIzMTI1LDAuOTA5Njg3NSAwLjIxNzE4NzUsMC44MDM0Mzc1IDAuMDQwMzEyNSwwLjYyNjg3NSAwLjE0NjU2MjUsMC41MjA2MjUgMC4zMjMxMjUsMC42OTc1IDAuODUzNDM3NSwwLjE2NzE4NzUgeiIKICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZSIgLz4KICAgIDwvY2xpcFBhdGg+CiAgICA8bWFzayBpZD0ibWFzayIgbWFza1VuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgbWFza0NvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPgogICAgICA8cGF0aAogICAgICAgICBkPSJNIDAsMCAwLDEgMSwxIDEsMCAwLDAgeiBNIDAuODUzNDM3NSwwLjE2NzE4NzUgMC45NTk2ODc1LDAuMjczMTI1IDAuNDI5Mzc1LDAuODAzNDM3NSAwLjMyMzEyNSwwLjkwOTY4NzUgMC4yMTcxODc1LDAuODAzNDM3NSAwLjA0MDMxMjUsMC42MjY4NzUgMC4xNDY1NjI1LDAuNTIwNjI1IDAuMzIzMTI1LDAuNjk3NSAwLjg1MzQzNzUsMC4xNjcxODc1IHoiCiAgICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmUiIC8+CiAgICA8L21hc2s+CiAgPC9kZWZzPgogIDxyZWN0CiAgICAgd2lkdGg9IjEiCiAgICAgaGVpZ2h0PSIxIgogICAgIHg9IjAiCiAgICAgeT0iMCIKICAgICBjbGlwLXBhdGg9InVybCgjY2xpcCkiCiAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZSIgLz4KPC9zdmc+Cg==");
			    mask: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgdmVyc2lvbj0iMS4xIgogICB2aWV3Qm94PSIwIDAgMSAxIgogICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ij4KICA8ZGVmcz4KICAgIDxjbGlwUGF0aCBpZD0iY2xpcCI+CiAgICAgIDxwYXRoCiAgICAgICAgIGQ9Ik0gMCwwIDAsMSAxLDEgMSwwIDAsMCB6IE0gMC44NTM0Mzc1LDAuMTY3MTg3NSAwLjk1OTY4NzUsMC4yNzMxMjUgMC40MjkzNzUsMC44MDM0Mzc1IDAuMzIzMTI1LDAuOTA5Njg3NSAwLjIxNzE4NzUsMC44MDM0Mzc1IDAuMDQwMzEyNSwwLjYyNjg3NSAwLjE0NjU2MjUsMC41MjA2MjUgMC4zMjMxMjUsMC42OTc1IDAuODUzNDM3NSwwLjE2NzE4NzUgeiIKICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZSIgLz4KICAgIDwvY2xpcFBhdGg+CiAgICA8bWFzayBpZD0ibWFzayIgbWFza1VuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgbWFza0NvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPgogICAgICA8cGF0aAogICAgICAgICBkPSJNIDAsMCAwLDEgMSwxIDEsMCAwLDAgeiBNIDAuODUzNDM3NSwwLjE2NzE4NzUgMC45NTk2ODc1LDAuMjczMTI1IDAuNDI5Mzc1LDAuODAzNDM3NSAwLjMyMzEyNSwwLjkwOTY4NzUgMC4yMTcxODc1LDAuODAzNDM3NSAwLjA0MDMxMjUsMC42MjY4NzUgMC4xNDY1NjI1LDAuNTIwNjI1IDAuMzIzMTI1LDAuNjk3NSAwLjg1MzQzNzUsMC4xNjcxODc1IHoiCiAgICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmUiIC8+CiAgICA8L21hc2s+CiAgPC9kZWZzPgogIDxyZWN0CiAgICAgd2lkdGg9IjEiCiAgICAgaGVpZ2h0PSIxIgogICAgIHg9IjAiCiAgICAgeT0iMCIKICAgICBjbGlwLXBhdGg9InVybCgjY2xpcCkiCiAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZSIgLz4KPC9zdmc+Cg==");
			    background: 0 0;
			    transition-duration: .28s;
			    transition-timing-function: cubic-bezier(.4,0,.2,1);
			    transition-property: background;
			}
			.checkbox-input:checked+.checkbox-outer{
				border: 2px solid #3f51b5;
				border-color:var(--flow-checkbox-checked-color, var(--flow-border-color, var(--flow-primary-color, #3f51b5)));
			}
			.checkbox-input:checked+.checkbox-outer .outline{
				background:var(--flow-checkbox-checked-color, var(--flow-border-color, var(--flow-primary-color, #3f51b5))) url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgdmVyc2lvbj0iMS4xIgogICB2aWV3Qm94PSIwIDAgMSAxIgogICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ij4KICA8cGF0aAogICAgIGQ9Ik0gMC4wNDAzODA1OSwwLjYyNjc3NjcgMC4xNDY0NDY2MSwwLjUyMDcxMDY4IDAuNDI5Mjg5MzIsMC44MDM1NTMzOSAwLjMyMzIyMzMsMC45MDk2MTk0MSB6IE0gMC4yMTcxNTcyOSwwLjgwMzU1MzM5IDAuODUzNTUzMzksMC4xNjcxNTcyOSAwLjk1OTYxOTQxLDAuMjczMjIzMyAwLjMyMzIyMzMsMC45MDk2MTk0MSB6IgogICAgIGlkPSJyZWN0Mzc4MCIKICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lIiAvPgo8L3N2Zz4K");
			}
			.checkbox-input:checked+.checkbox-outer{
				background-color:var(--flow-checkbox-checked-bg, var(--flow-input-bg, inherit));
			}

		`}render(){return p.dy`
		<label class="checkbox">
			<input class="checkbox-input" type="checkbox" @change="${this.onChange}" 
				?disabled=${this.readonly} .checked="${this.checked}"
				.name="${this.name}" .value="${this.inputValue||"ON"}">
			<div class="checkbox-outer"><div class="outline"></div></div>
			<slot></slot>
		</label>
		`}get value(){return!!this.checked}set value(e){this.setChecked(e)}onChange(e){this.setChecked(e.target.checked)}toggle(){this.setChecked(!this.checked)}setChecked(e){let t=this.checked;this.checked=!!e,t!=this.checked&&this.fireChangeEvent()}fireChangeEvent(){this.fire("changed",{checked:this.checked,name:this.name},{bubbles:!0})}}x.define("flow-checkbox");class k extends p.Hc{static get properties(){return{checked:{type:Boolean,reflect:!0},readonly:{type:Boolean,reflect:!0},name:{type:String},inputValue:{type:String}}}static get styles(){return p.iv`
			:host{
				display:inline-block;
				margin-right: var(--flow-radio-margin-right, 10px);
			}
			:host(.block){
				display: block;
				width: max-content;
				margin-bottom: var(--flow-radio-margin-bottom);
			}
			:host(:not([disabled]):not([readonly])) .radio{
				cursor:pointer;
			}
			.radio{
				display:flex;align-items:center;
			    user-select:none;position:relative;
			}
			.radio-input{
			    position:absolute;
			    opacity:0;
			    z-index:0;
				top:0px;
			}
			.radio-outer{
				position:relative;
			    top:0px;
			    left:0;
			    display:inline-block;
			    box-sizing:border-box;
			    width: var(--flow-radio-outer-width,24px);
			    height: var(--flow-radio-outer-height,24px);
			    margin: var(--flow-radio-outer-margin, 0px 10px 0px 0px);
			    cursor:pointer;
			    overflow:hidden;
			    border: var(--flow-radio-outer-border, 2px solid rgba(0,0,0,.54));
			    border-color:var(--flow-radio-color, var(--flow-border-color, rgba(0,0,0,.54)));
			    border-radius:50%;
			    z-index:2;
			    background-color:var(--flow-radio-bg, var(--flow-input-bg, inherit));
			    transition-duration: .28s;
			    transition-timing-function: cubic-bezier(.4,0,.2,1);
			    transition-property: background;
			}
			.outline{
				position: absolute;
			    top: 15%;
			    left: 15%;
			    height: var(--flow-radio-outline-height, 70%);
			    width: var(--flow-radio-outline-width, 70%);
                border-radius:50%;
                background: 0 0;
			    transition-duration: .28s;
			    transition-timing-function: cubic-bezier(.4,0,.2,1);
			    transition-property: background;
			}
			.radio-input:checked+.radio-outer{
				border: 2px solid #3f51b5;
				border-color:var(--flow-radio-checked-color, var(--flow-border-color, var(--flow-primary-color, #3f51b5)));
			}
			.radio-input:checked+.radio-outer .outline{
				background:var(--flow-radio-checked-color, var(--flow-border-color, var(--flow-primary-color, #3f51b5)));
			}
			.radio-input:checked+.radio-outer{
				background-color:var(--flow-radio-checked-bg, var(--flow-input-bg, inherit));
			}

		`}constructor(){super(),this.checked=!1,this.name=this.name||"radio-"+Date.now()}render(){let{name:e}=this;return p.dy`
		<label class="radio">
			<input class="radio-input" type="radio" @change="${this.onChange}" 
				?disabled=${this.readonly} ?checked="${this.checked}"
				.name="${e}" .value="${this.inputValue||"ON"}">
			<div class="radio-outer"><div class="outline"></div></div>
			<slot></slot>
		</label>
		`}get value(){return!!this.checked}set value(e){this.setChecked(e)}onChange(e){this.setChecked(e.target.checked)}toggle(){this.setChecked(!this.checked)}setChecked(e){let t=this.checked;this.checked=!!e,t!=this.checked&&this.fireChangeEvent()}fireChangeEvent(){this.fire("changed",{checked:this.checked,name:this.name,value:this.inputValue||"ON"},{bubbles:!0}),this.checked&&this.fire("flow-radio-checked",{name:this.name,el:this},{},window)}firstUpdated(...e){super.firstUpdated(...e),this.registerListener("flow-radio-checked",(e=>{let{name:t,el:r}=e.detail||{};t==this.name&&r!=this&&this.setChecked(!1)}))}updated(e){super.updated(e),e.has("checked")&&this.fireChangeEvent()}}k.define("flow-radio");var S=__webpack_require__(9309);class E extends S.i{static get properties(){return{active:{type:Boolean,reflect:!0},radio:{type:Boolean,reflect:!0},readonly:{type:Boolean,reflect:!0},name:{type:String},inputValue:{type:String}}}static get styles(){return[S.i.styles,p.iv`
            :host([active]){
				background-color:var(--flow-btn-active-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-color:var(--flow-btn-active-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
				color:var(--flow-btn-active-invert-color, var(--flow-primary-invert-color, #FFF));
				--fa-icon-color:var(--flow-btn-active-invert-color, var(--flow-primary-invert-color, #FFF));
			}
			:host([active]:not([disabled]):hover){
				background-color:var(--flow-btn-hover-active-bg-color, var(--flow-btn-hover-border-color, var(--flow-primary-color, rgba(0,151,115,1))));
				border-color:var(--flow-btn-hover-active-border-color, var(--flow-btn-hover-border-color, var(--flow-primary-color, rgba(0,151,115,1))));
                color: var(--flow-btn-hover-active-color, var(--flow-btn-hover-color, inherit));
			}
			:host([active][radio]){
				cursor:default;
			}
        `]}constructor(){super(),this.active=!1}get value(){return!!this.active}set value(e){this.setActive(e)}click(e){super.click(e),this.toggle()}toggle(){this.radio&&this.active||this.setActive(!this.active)}setActive(e){let t=this.active;this.active=!!e,t!=this.active&&this.fireChangeEvent()}fireChangeEvent(){this.fire("changed",{active:this.active,name:this.name,value:this.inputValue||"ON"},{bubbles:!0}),this.active&&this.radio&&this.fire("flow-toogle-btn-active",{name:this.name,el:this},{},window)}firstUpdated(...e){super.firstUpdated(...e),this.radio&&this.registerListener("flow-toogle-btn-active",(e=>{let{name:t,el:r}=e.detail||{};t==this.name&&r!=this&&this.setActive(!1)}))}}E.define("flow-toggle-btn"),class extends E{constructor(){super(),this.radio=!0}}.define("flow-radio-btn");class A{constructor(e,t){this.text=e,this.value=t}}class I extends p.Hc{static get properties(){return{selected:{type:String,reflect:!0},selector:{type:String},valueAttr:{type:String},multiple:{type:Boolean}}}static get styles(){return p.iv`
		:host{
			display:block;padding:5px 0px;
			--flow-menu-item-margin-internal: var(--flow-menu-item-margin, 1px);
			--flow-menu-item-margin-internal2x:calc(var(--flow-menu-item-margin-internal) * 2);
		}

		::slotted(flow-menu-item){
			display:flex;align-items:center;
		}
		
		::slotted(flow-menu-item),
		::slotted(.menu-item),
		.menu-item{
			box-sizing:border-box;
			cursor:pointer;user-select:none;
			padding:var(--flow-menu-item-padding, 10px);
			margin:var(--flow-menu-item-margin-internal);
			background-color:var(--flow-menu-item-bg, var(--flow-background-color));
			color:var(--flow-menu-item-color, var(--flow-color));
			pointer-events:auto;
		}
		::slotted(flow-menu-item:hover:not(.disabled):not(.selected)),
		::slotted(.menu-item:hover:not(.disabled):not(.selected)),
		.menu-item:hover:not(.disabled):not(.selected){
			background-color:var(--flow-menu-item-hover-bg, #DDD);
			color:var(--flow-menu-item-hover-color, #000);
		}
		::slotted(flow-menu-item.selected),
		::slotted(.menu-item.selected),
		.menu-item.selected{
			background-color:var(--flow-menu-item-selected-bg, var(--flow-primary-color));
			color:var(--flow-menu-item-selected-color, var(--flow-primary-invert-color));
		}
		:host(.grid),
		:host(.grid) .menu-list-container{
			display:flex;
			flex-wrap:wrap;
			width:var(--flow-menu-grid-width, 500px);
		}
		:host(.grid.full),
		:host(.grid.full) .menu-list-container{
			width:var(--flow-menu-gridfull-width, 1000px);
		}
		:host(.grid:not(.full)) ::slotted(flow-menu-item),
		:host(.grid:not(.full)) ::slotted(.menu-item),
		:host(.grid:not(.full)) .menu-item{
			min-width:calc(20% - var(--flow-menu-item-margin-internal2x));
			max-width:calc(20% - var(--flow-menu-item-margin-internal2x));
		}
		:host(.grid.full) ::slotted(flow-menu-item),
		:host(.grid.full) ::slotted(.menu-item),
		:host(.grid.full) .menu-item{
			min-width:var(--flow-menu-gridfull-item-min-width, 100px);
			max-width:var(--flow-menu-gridfull-item-max-width, initial);
			flex:var(--flow-menu-gridfull-item-flex, 1);
		}
		::slotted(div.divider),
		::slotted(div.section){
			padding:var(--flow-menu-divider-padding, 10px);
			box-shadow:var(--flow-menu-divider-box-shadow, var(--flow-box-shadow));
			margin:var(--flow-menu-divider-margin, 0 0 5px 0);
			background-color:var(--flow-menu-divider-bg-color, var(--flow-background-inverse-soft));
			color:var(--flow-menu-divider-color, var(--flow-background-color));
		}
		::slotted(flow-menu-item.disabled),
		::slotted(.menu-item.disabled),
		.menu-item.disabled{
			cursor:var(--flow-menu-disabled-item-cursor, default);
			opacity:var(--flow-menu-disabled-item-opacity, 0.7);
		}
		`}constructor(){super(),this.selected="",this.selector="flow-menu-item, .menu-item",this.valueAttr="value",this._selected=[]}render(){return p.dy`
		<slot></slot>
		`}static SelectOption=A;static createOption(e,t,r=""){return{text:e,value:t,cls:r}}static createOptionItem(e,t,r=""){let i=r.includes("divider")||r.includes("section"),n=document.createElement(i?"div":"flow-menu-item");return r&&n.setAttribute("class",r),n.setAttribute("value",t),n.innerHTML=e,n}static createOptionItems(e=[]){return e.map((e=>this.createOptionItem(e.text,e.value,e.cls||"")))}changeOptions(e=[]){this.querySelectorAll("*").forEach((e=>{e.remove()})),I.createOptionItems(e).forEach((e=>{this.appendChild(e)})),this.onSlotChange()}firstUpdated(){this.renderRoot.addEventListener("click",this._onClick.bind(this));let e=this.renderRoot.querySelector("slot");this.listSlot=e,e&&e.addEventListener("slotchange",(e=>{this.onSlotChange()}))}onSlotChange(){this.updateList()}updated(e){e.has("selected")&&(this.parseSelected(),this.requestUpdate("_selected")),this.updateList(e),super.updated(e)}parseSelected(){let{selected:e}=this;if(this.log("parseSelected:selected:"+JSON.stringify(e),e),this.multiple){if(!Array.isArray(e)){try{e=JSON.parse(e)}catch(t){e=void 0}e=void 0!==e?[e]:[]}}else Array.isArray(e)&&(e=e[0]),e=void 0!==e?[e]:[];e=e.filter((e=>void 0!==e)).map((e=>e+"")),this.select(e)}get list(){return this.listSlot?this.listSlot.assignedElements().filter((e=>e.matches(this.selector))):[]}updateList(){this.list.forEach((e=>{let t=e.getAttribute(this.valueAttr);e.onclick=()=>{},e.classList.toggle("selected",this.isSelected(t))}))}isSelected(e){return this._selected.includes(e)}_onClick(e){let t=e.target.closest(this.selector);if(!t||t.classList.contains("disabled"))return;let r=t.getAttribute(this.valueAttr);this.multiple?this.toggle(r):this.selectOne(r)}selectFirst(){let e=this.list[0];if(e){let t=e.getAttribute(this.valueAttr);return this.selectOne(t),t}return""}selectOne(e){this._selected=[e],this.selectionChanged()}select(e){this._selected=e,this.selectionChanged()}toggle(e){let t=this._selected.indexOf(e);t<0?this._selected.push(e):this._selected.splice(t,1),this.selectionChanged()}selectionChanged(){this.updateList();let e,t=this._selected.slice(0);this.multiple?e=JSON.stringify(t):(t=t[0],e=t),this.selected=e,this.fire("select",{selected:t},{bubbles:!0})}get value(){return this.multiple?this._selected:this._selected[0]}}I.define("flow-menu"),class extends I{constructor(){super(),this.valueAttr="inputvalue",this.selector="flow-radio-btn"}connectedCallback(){this.classList.add("flow-btn-group"),super.connectedCallback()}updateList(){this.list.forEach((e=>{let t=e.getAttribute(this.valueAttr);e.setActive(this.isSelected(t))}))}}.define("flow-radio-btns"),class extends I{constructor(){super(),this.valueAttr="inputvalue",this.selector="flow-radio",this.name=this.name||"radio-"+Date.now()}updateList(){this.list.forEach((e=>{let t=e.getAttribute(this.valueAttr);e.setChecked(this.isSelected(t))}))}onSlotChange(){this.list.forEach((e=>{e.getAttribute("name")||e.setAttribute("name",this.name),e.onclick=()=>{}})),this.updateList()}}.define("flow-radios");class C extends p.Hc{createRenderRoot(){return this}}C.define("flow-btn-group");class T extends p.Hc{constructor(){super(),this.ident=Math.round(1e16*Math.random()).toString(16),this.template=document.createElement("template")}generate(){this.targets=[...this.querySelectorAll(".square")];let e=this.targets.map((e=>e.getBoundingClientRect()));if(!e.length)return;let t={left:e[0].left,top:e[0].top,right:e[0].right,bottom:e[0].bottom};e.forEach((e=>{e.left<t.left&&(t.left=e.left),e.top<t.top&&(t.top=e.top),e.right>t.right&&(t.right=e.right),e.bottom>t.bottom&&(t.bottom=e.bottom)}));let r=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.width} ${this.height}">\n\t\t\t<rect x="${t.left}" y="${t.top}" width="${t.right-t.left}" height="${t.bottom-t.top}"\n\t\t\t\tfill="none" stroke="red" />\n\t\t\t\t\x3c!--text x="0" y="0">\n\t\t\t\tHELLO WORLD\n\t\t\t\t</text--\x3e\n\t\t\t\t\n\t\t\t</svg>`;this.template.innerHTML=r,this.svg=this.template.content.firstChild.cloneNode(!0)}static get styles(){return p.iv`
			.wrapper {
				position: relative;
				overflow:hidden;
			}

			.container {
				position: absolute;
				left : 0;
				top : 0;
			}

			.svg {
				position: absolute;
				left: 0;
				top: 0;
			}
		`}render(){return this.generate(),p.dy`
			<style>
				.wrapper {
					height: ${this.height||0};
				}
			</style>
			<div class="wrapper">
				<div class="container">
				</div>
				<div class="svg">
					${this.svg||""}
				</div>
			</div>
		`}firstUpdated(){this.generate(),this.requestUpdate()}}T.define("flow-circular-shapes");class O extends p.Hc{static get styles(){return p.iv`
		`}render(){return p.dy`
			<div class='region'>
			icon
			field
			question region
			</div>
		`}}O.define("flow-form-region");class M extends p.Hc{static get properties(){return{checked:{type:Boolean}}}static get styles(){return p.iv`
			:host{display:inline-block}
		`}constructor(){super();let e=document.createElement("template");this.ident="path-"+Math.round(1e16*Math.random()).toString(16),e.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250">\n\t\t\t<path\n\t\t\t\tstyle="fill:none;stroke:#000000;stroke-width:20px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"\n\t\t\t\td="M 157.04983,38.414322 H 2.3523133 V 239.82002 H 203.01068 V 84.748842"\n\t\t\t\tid="path3748"\n\t\t\t\tinkscape:connector-curvature="0" />\n\n\t\t\t<path  id="${this.ident}" \n\t\t\t\tstyle="fill:none;stroke:#000000;stroke-width:20px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"\n\t\t\t\td="M 40.839859,122.86272 83.81139,165.83425 247.66371,1.9819364"\n\t\t\t\tid="path3750"\n\t\t\t\tinkscape:connector-curvature="0" />\n\t\t</svg>`,this.svg=e.content.firstChild.cloneNode(!0),this.svg.style.overflow="visible",this.viewBox=this.svg.getAttribute("viewBox"),this.path=this.svg.querySelector("path"),this.length=this.path.getTotalLength()}createRenderRoot(){return this}render(){let e=this.checked?p.dy`
				#${this.ident} {
					stroke-dasharray: ${this.length};
					stroke-dashoffset: ${this.length};
					animation: dash 0.4s ease-in-out forwards;
					display: block;
				}

			`:p.dy`
				#${this.ident} {
					/*transform: scale(2,2) translate(0,-5%);*/
					transform-origin:center;
					opacity : 0.0;
				}
			`;return p.dy`

		<style>
		.wrapper {
			padding: 4px;
			/*border:1px solid red;*/
		}
		#${this.ident} {
			transition: all 0.2s ease;
			trantition-property: transform, opacity;
		}
		${e}
		@keyframes dash {
			to {
				stroke-dashoffset: 0;
			}
		}		
		</style>

		<span class="wrapper" @click=${this.toggle}>
		${this.svg}
		</span>`}toggle(){this.checked=!this.checked,console.log("checked:",this.checked)}updated(){}}M.define("flow-svg-test");class P extends p.Hc{static get properties(){return{active:{type:Boolean,reflect:!0}}}static get styles(){return p.iv`
		:host{
			display:flex;
			align-items:center;
			position:relative;
			pointer-events:none;
			color: var(--flow-primary-color, rgba(0,151,115,1.0));
			font-family: var(--flow-tab-font-family, var(--flow-font-family, "Julius Sans One"));
			font-weight: var(--flow-tab-font-weight, var(--flow-font-weight, bold));
			font-size: var(--flow-tab-font-size, var(--flow-font-size, 1.5rem));
		}
		:host(:not([disabled])){
			cursor:pointer;
		}
		.wrapper {
			padding:0px 40px;
			position: relative;
			pointer-events:none;
			display:flex;
			flex-direction:column;
			align-items:center;
			white-space: nowrap;
		    max-width: var(--flow-tab-wrapper-max-width, 150px);
		    overflow: hidden;
		    text-overflow: ellipsis;
		}
		.text{
			max-width:100%;box-sizing:border-box;overflow: hidden;
		    text-overflow: ellipsis;
		}
		.background {
			position:absolute;
			left: 0px;
			top: 0px;
			width:100%;
			height:100%;
			pointer-events:none;
		}

		svg {
			position: absolute;
			left: 0px;
			top: 0px;
			z-index:0;
			pointer-events:none;
			overflow:visible;
		}

		path {
			pointer-events:auto;
			-webkit-app-region:no-drag;
			stroke: var(--flow-tab-border-color, var(--flow-border-color, --flow-primary-color));
		}
		`}constructor(){super(),this.caption=this.firstChild?this.firstChild.cloneNode(!0):"",this.ident=Math.round(1e16*Math.random()).toString(16)}generate(){let e=this.getBoundingClientRect();if(!e.width)return"";let t=e.width,r=e.height,i="";if(window.flowConfig&&window.flowConfig.flowTab){let e=20,n=Math.atan(.5*e),o=(1-(Math.atan(.5*e)+n)/(2*n))*(r-1);for(let s=0;s<t;s++){let a=0;if(s<50){let t=(s/50-.5)*e;a=(1-(Math.atan(t)+n)/(2*n))*(r-1)}else if(s>t-50){let i=((t-s)/50-.5)*e;a=(1-(Math.atan(i)+n)/(2*n))*(r-1)}else a=o;i+=0==s?`M -3480,${r+1} -3480,${a} `:s>t-2?`L 3480 ${a} L 3480 ${r+1} `:`L ${s} ${a} `}}else{let e=25;i+=`M -3480,${r+40}`,i+=`L -3480 ${r}`,i+=`L 0,${r}`,i+=`C ${e},${r} 0,0 ${e},0`,i+=`L ${t-e},0`,i+=`C ${t},0 ${t-e},${r} ${t},${r}`,i+=`L 3480 ${r} L 3480 ${r+40}`}let n={top:"var(--flow-tab-bg-top, #fefefe)",bottom:"var(--flow-tab-bg-bottom, #EEE)"};return this.active&&(n.top="var(--flow-tab-active-bg-top, #fefefe)",n.bottom="var(--flow-tab-active-bg-bottom, #fff)"),p.YP`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${t} ${r}">
		<linearGradient id="gradient-${this.ident}"  x1="0" x2="0" y1="0" y2="1">
			<stop class="stop1-${this.ident}" offset="0%" style="stop-color: ${n.top}"/>
			<stop class="stop3-${this.ident}" offset="100%" style="stop-color: ${n.bottom}"/>
		</linearGradient>
		<path id="path-${this.ident}"
   			style="fill:url(#gradient-${this.ident});stroke-width:2px;
   			stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
   			d="${i}" />
		</svg>`}render(){let e=this.generate();return p.dy`
		<div class='background' @click=${this.click}>${e}</div>
		<div class="wrapper"><div class="text"><slot></slot></div></div>
		`}click(){let e=new CustomEvent("flow-tab-select",{detail:this,bubbles:!0});this.dispatchEvent(e)}onWindowResize(){this.isConnected&&this.requestUpdate()}connectedCallback(){super.connectedCallback(),this.__resizeObserver||(this.__resizeObserver=new ResizeObserver((()=>{this.onWindowResize()})),this.__resizeObserver.observe(this))}disconnectedCallback(){this.__resizeObserver&&(this.__resizeObserver.unobserve(this),this.__resizeObserver.disconnect(),this.__resizeObserver=null),super.disconnectedCallback()}}P.define("flow-tab"),__webpack_require__(7157);class B extends p.Hc{static get properties(){return{active:{type:String},tabs:{type:Array},"target-display":{type:String,value:"block"}}}static get styles(){return p.iv`
			:host{
				flex:1;
				display:flex;
				flex-direction:row;
				flex-wrap:wrap;
				justify-content:flex-end;
				margin:var(--flow-tabs-margin, 8px 28px 0px 28px);
				-webkit-app-region:drag;
			}
			.tabs-outer{
				width:100%;
				display:flex;
				position:relative;
			}
			.tab-items{
				flex:1;
				display:flex;
				flex-direction:row;
				flex-wrap:wrap;
				justify-content:flex-end;
			}
			.proxy{
				position:absolute;
				left:0px;
				top:0px;
				width:100%;
				visibility: hidden;
			}
			.proxy.v{
				visibility:visible;
				z-index:100;
				opacity:1
			}
			flow-tab, ::slotted(flow-tab) {
				/*//min-width: var(--flow-tab-min-width);
				//max-width: var(--flow-tab-max-width);
				//width: var(--flow-tab-width);
				//min-width: fill-available;*/
				height: 38px;
				margin-left: -20px;
				margin-right: -20px;
				margin-top:-8px;
				-webkit-app-region:no-drag;
				
			}
			.line-break{
				width:100%;
				background-color:#F00;
			    padding:0px;
			    border:0px;
			    height:0px;
			}
			flow-tab[hidden]{display:none}
		`}constructor(){super(),this.ident=Math.round(1e16*Math.random()).toString(16),this.tabs=null,this["target-display"]="block"}onWindowResize(){this._timeoutId&&clearTimeout(this._timeoutId),this._timeoutId=setTimeout((()=>{this._timeoutId=null,this.active&&this.updateRows()}),100)}render(){let e=this._tabs||this.tabs||[];return p.dy`
		<slot></slot>
		<div class="tabs-outer">
			<div class="tab-items proxy">
			${(this.tabs||[]).filter((e=>!e.disable)).map((e=>e.sep?p.dy`<div class="line-break"></div>`:p.dy`<flow-tab data-id="${e.id}" class="${e.cls||""}" part="${e.part||""}">${this.renderTab(e)}</flow-tab>`))}
			</div>
			<div class="tab-items front">
			${e.map((e=>e.sep?p.dy`<div class="line-break"></div>`:e.disable?p.dy`<flow-tab id='${e.id}' hidden="1"></flow-tab>`:p.dy`<flow-tab id='${e.id}' class="${e.cls||""}" part="${e.part||""}"
						style="z-index:${e.zIndex||(e.id==this.active?2:1)}">${this.renderTab(e)}</flow-tab>`))}
			</div>
		</div>
		`}updated(e){if(e.has("tabs")&&this._tabs){let e=this.lastTabHash,t=this.tabs.map((e=>Object.assign({},e,{zIndex:void 0})));if(this.lastTabHash=JSON.stringify(t),e!=this.lastTabHash)return this._tabs=null,this._lastHash=null,this.requestUpdate("tabs")}let t=this.tabs?this.shadowRoot.querySelector(".tab-items.front"):this;if(!t)return;let r=[...t.querySelectorAll("flow-tab")];if(!r.length)return this.log("Tab not found"),!1;let i=!1,n=-1;if(r.forEach(((e,t)=>{let r=document.querySelector(`tab-content[for="${e.id}"]`);e.getAttribute("hidden")||e.id!=this.active?(e.active=!1,r&&(r.style.display="none")):(e.active=!0,i=!0,n=t,r&&(r.style.display=r.getAttribute("data-active-display")||this["target-display"]))})),!this.tabs){let e=n>-1?r.slice(n).length+2:2;r.forEach(((t,r)=>{t.style["z-index"]=n>-1&&r>=n?e--:1}))}i||(this.active=r[0].id),this.active&&this.tabs&&(this.updateRows(),setTimeout((()=>{this.updateRows(),setTimeout((()=>{this.updateRows()}),1e3)}),15))}hashTabs(e){return JSON.stringify(e)}updateRows(){let e=this.tabs?this.shadowRoot:this;e=e.querySelector(".tab-items.proxy");let t=e&&e.querySelector(`[data-id=${this.active}]`);if(!t)return void this.log("activeTab is null",t);let r=t.offsetTop,i=e.querySelector("flow-tab:last-child").offsetTop,n={};this.tabs.forEach((e=>{n[e.id]=e}));let o,s=[],a=[],c=-1;e.querySelectorAll("flow-tab").forEach(((e,t)=>{if(o=e.getAttribute("data-id"),e.offsetTop==r&&e.offsetTop!=i)return a.push(n[o]),!0;-1!=c&&e.offsetTop!=c&&s.push({sep:1,id:"sep"}),s.push(n[o]),c=e.offsetTop})),a.length&&a.unshift({sep:1,id:"sep"});let l=[...s,...a],u=l.findIndex((e=>e.id==this.active)),h=u>-1?l.slice(u).length+2:2;l.forEach(((e,t)=>{e.zIndex=u>-1&&t>=u?h--:1}));let d=this.hashTabs(l);this._lastHash!=d&&(this._lastHash=d,this._tabs=l,this.requestUpdate("_tabs"))}changeTabRows(e){let t=this.tabs?this.shadowRoot:this;if(!(e=e||t.querySelector("flow-tab[active]")))return;let r=e.offsetTop,i=t.querySelector("flow-tab:last-child").offsetTop,n=[],o=[];Array.from(t.querySelectorAll("flow-tab")).filter((e=>{if(e.offsetTop==r&&e.offsetTop!=i)return o.push(e),!0;n.push(e)})).map((e=>(e.remove(),e))).forEach((e=>{t.append(e)}))}addFillerTabs(){window.xxxxflowTabs=this;let e=this.tabs?this.shadowRoot:this;e.querySelectorAll(".filler-tab").forEach((e=>{e.remove()}));let t,r,i=-1;e.querySelectorAll("flow-tab").forEach(((n,o)=>{n.offsetTop!=i&&(0!=o&&-1===i||(t=document.createElement("flow-tab"),t.className="filler-tab",t.style.backgroundColor=`rgb(${i}, ${i}, ${i})`,e.insertBefore(t,n),t.style.minWidth="50px",r=t.getBoundingClientRect().width,t.style.minWidth=Math.max(r,50)+"px",t.offsetTop!=n.offsetTop&&t.remove()),i=n.offsetTop)}))}renderTab(e){let t=e.render?e.render():e.html||e.title||e.caption;return"string"==typeof t?p.dy`<flow-i18n .text="${t}" text2="${t}"></flow-i18n>`:t}connectedCallback(){super.connectedCallback(),this._onWindowResize=this._onWindowResize||this.onWindowResize.bind(this),window.addEventListener("resize",this._onWindowResize),this.renderRoot.addEventListener("flow-tab-select",(e=>{this.active=e.detail.id}))}disconnectedCallback(){super.disconnectedCallback(),this._onWindowResize&&window.removeEventListener("resize",this._onWindowResize),this._timeoutId&&clearTimeout(this._timeoutId)}}B.define("flow-tabs");class R extends p.Hc{static get properties(){return{mood:{type:String}}}static get styles(){return p.iv`.mood { color: green; }`}constructor(){super(),this.content="123"}createRenderRoot(){return this.tpl_=this.innerHTML,this}htmlToElement(e){let t=document.createElement("template");return e=e.trim(),t.innerHTML=`<span>${e}</span>`,t.content.firstChild.cloneNode(!0)}render(){let e=this._T(this.tpl_);return p.dy`${e}`}afterRender(){}updated(){}_T(e){return e=e.replace("WORKED","W_O_R_K_E_D"),this.htmlToElement(e)}}R.define("flow-test-element");var D=__webpack_require__(577);class N extends p.Hc{static get properties(){return{value:{type:String},height:{type:Number},autosize:{type:Boolean},autocomplete:{type:Boolean},autofocus:{type:Boolean},disabled:{type:Boolean,reflect:!0},placeholder:{type:String},readonly:{type:Boolean},label:{type:String},maxlength:{type:Number}}}static get styles(){return p.iv`
		:host {
			display:var(--flow-input-display, inline-block);
			vertical-align:middle;
			font-family:var(--flow-font-family, "Julius Sans One");
			font-weight:var(--flow-font-weight, bold);
			width:var(--flow-input-width, 100%);
			min-width:var(--flow-input-min-width, 100px);
			max-width:var(--flow-input-max-width, 500px);
			margin:var(--flow-input-margin, 5px 0px);
			font-size:0px;
		}
		label{
			font-size:var(--flow-input-label-font-size, 0.7rem);
			padding:var(--flow-input-label-padding,2px 5px);
			border: var(--flow-input-label-border, 2px) solid  var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
			border-radius:var(--flow-input-label-border-radius, 8px);
			margin-left: var(--flow-input-label-margin-left,10px);
			margin-right: var(--flow-input-label-margin-right,20px);
			z-index: var(--flow-input-label-z-index, 1);
			position: var(--flow-input-label-position, relative);
			background-color:var(--flow-input-bg, inherit);
		}
		textarea{

			width:var(--flow-input-input-width, 100%);
			box-sizing:border-box;
			height:var(--flow-input-height);
			border: var(--flow-input-border, 2px) solid var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
			border-radius:var(--flow-input-border-radius, 8px);
			margin:0px;
			padding:var(--flow-input-padding, 10px);
			font-size:var(--flow-input-font-size, 1rem);
			font-weight:var(--flow-input-font-weight, 400);
			font-family:var(--flow-input-font-family);
			line-height:var(--flow-input-line-height, 1.2);
			box-shadow:var(--flow-input-box-shadow);
			text-align:var(--flow-input-text-align);
			min-width:var(--flow-input-input-min-width, 10px);
			letter-spacing:var(--flow-input-letter-spacing, inherit);

			min-width: var(--flow-textarea-min-width, 200px);
			min-height: var(--flow-textarea-min-height, 32px);
			overflow: hidden;
			overflow-y:hidden;
			outline: none;
			resize: none;
			background-color: var(--flow-textarea-bg, var(--flow-input-bg, #fafafa));
			color: var(--flow-textarea-color, var(--flow-input-color, inherit));
			margin-top: var(--flow-input-wrapper-margin-top,-0.5rem);
		}
		textarea[has-label]{
			padding-top:var(--flow-input-with-label-input-padding-top, 15px)
		}
		.length-msg{
			font-size:var(--flow-textarea-length-msg-font-size, var(--flow-input-length-msg-font-size, 0.6rem));
		}
		`}constructor(){super(),this.ident=Math.round(1e16*Math.random()).toString(16),this.height=0,this.autosize=!0,this.autocomplete=!1,this.autofocus=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.maxlength=void 0,this.value=this.innerHTML,this.innerHTML=""}get textarea(){return this.renderRoot&&this.renderRoot.querySelector("textarea")}get(){return this.textarea.value}set(e){this.textarea.value=e,this.change()}render(){let e=!!this.label;return p.dy`
			<label ?hidden=${!e}>${this.label||""}</label>
			<textarea id="textarea-${this.ident}"
				@input="${this.change}" 
				autocomplete="${this.autocomplete}"
				?autofocus="${this.autofocus}"
				placeholder="${this.placeholder}"
				?readonly="${this.readonly}"
				?disabled="${this.disabled}"
				?has-label="${e}"
				maxlength="${(0,D.o)(this.maxlength)}"
				.value="${this.value}"
			></textarea>
			${this.renderRemainingCharsMsg()}
		`}renderRemainingCharsMsg(){if(!this.maxlength)return"";let e=Math.max(0,this.maxlength-(this.textarea?.value.length||0)),t=1==e?(0,v.T)("character left"):(0,v.T)("characters left");return p.dy`<span class="length-msg">${e} ${t}</span>`}change(){let e=this.textarea;e.style.height="auto";let t=window.getComputedStyle(e),r=2*parseFloat(t.getPropertyValue("border-width"));e.style.height=e.scrollHeight+r+"px",this.value=this.textarea.value,this.fire("changed",{el:this,value:this.textarea.value})}}N.define("flow-textarea");class F extends p.Hc{static get properties(){return{icon:{type:String},expandIcon:{type:String},expandable:{type:Boolean},focusable:{type:Boolean},expanded:{type:Boolean,reflect:!0}}}static get styles(){return p.iv`
		:host{
			display:flex;
			align-items:flex-start;
			margin:10px 0px;
			flex-wrap:var(--flow-form-control-flex-wrap, wrap);
			position:var(--flow-form-control-position, initial);
		}
		.icon-box,
		.expandable-icon-box{
			width:30px;
			max-width:30px;
			text-align:center;
			align-self:var(--flow-form-control-icon-box-align-self,initial);
			position:var(--flow-form-control-icon-box-position,initial);
			top:var(--flow-form-control-icon-box-top,initial);
			bottom:var(--flow-form-control-icon-box-bottom,initial);
			left:var(--flow-form-control-icon-box-left,initial);
			right:var(--flow-form-control-icon-box-right,initial);
		}
		.expandable-icon-box svg{cursor:pointer}
		:host([icon="none"]) .icon-box{display:none}
		:host(.no-icon]) .icon-box{display:none}
		:host([no-icon]) .icon-box{display:none}

		.icon-box svg,
		.expandable-icon-box svg{
			width:var(--flow-form-control-icon-box-width,24px);
			height:var(--flow-form-control-icon-box-height,24px);
			margin-right:var(--flow-form-control-icon-box-margin,8px);
			fill:var(--flow-primary-color, rgba(0,151,115,1.0));
		}
		.title-box{
			user-select:none;line-height:24px;cursor:pointer;
		}
		:host([focusable]) .title-box:focus,
		:host([focusable]) .input-box:focus{
			display:var(--flow-form-control-focus-display, inline-block);
			outline:var(--flow-form-control-focus-outline, dotted);
		}
		.input-box{
			width: var(--flow-form-control-input-box-width,100px);
			padding: var(--flow-form-control-input-box-padding, 0px);
			flex:1;
		}
		.input{margin:5px 5px 5px 0px;}
		:host([no-help]) .info-box,
		:host([no-info]) .info-box{
			display:none;
		}
		.info-box{
			flex:1;
			max-width:300px;
			padding:var(--flow-form-control-info-box-padding, 0px 10px);
			box-sizing:border-box;
			min-width:var(--flow-form-control-info-box-min-width, initial);
			font-size:var(--flow-form-control-info-box-font-size, inherit);
		}
		.info-box ::slotted(*){
			margin:unset;
		}
		.info-box ::slotted(h4.title){
			border-bottom: 1px solid #ddd;
		    margin:0px 0px 10px 0px;
		    font-weight: bold;
		    font-size: 1.1em;
		}
		.info-box ::slotted(p){
			font-size:0.8em;
		}
		:host([expandable]:not([expanded])) .input,
		:host([expandable]:not([expanded])) .info-box ::slotted(*){
			display:none;
		}
		:host([expanded]:not([static-icon])) .expandable-icon-box > svg{
			transform:rotate(90deg)
		}
		`}render(){let e="";"-"!=this.icon&&(e=this.iconPath(this.icon||"info-circle"));let t="";return"-"!=this.expandIcon&&(t=this.iconPath(this.expandIcon||"caret-right")),p.dy`
			<div class="icon-box" @click="${this.click}"><svg><use href="${e}"></use></svg></div>
			${this.expandable?p.dy`<div class="expandable-icon-box" 
					data-flow-expandable="toggle" @click="${this.click}"><svg>
				<use href="${t}"></use>
				</svg></div>`:""}
			${this.focusable?p.dy`<div class="input-box" tabindex="0">
				<label @click="${this.click}" class="title-box" 
					data-flow-expandable="toggle"><slot name="title"></slot></label>
				<div class="input"><slot></slot><slot name="input"></slot></div>
			</div>`:p.dy`<div class="input-box">
				<label @click="${this.click}" class="title-box" 
					data-flow-expandable="toggle"><slot name="title"></slot></label>
				<div class="input"><slot></slot><slot name="input"></slot></div>
			</div>`}
			<div class="info-box"><slot name="info"></slot></div>
		`}click(){let e=this.getAttribute("data-flow-expandable")||"toggle";["toggle","open","close"].includes(e)&&this[e]()}firstUpdated(...e){super.firstUpdated(...e),this.label=this.renderRoot.querySelector("label.title-box"),this.inputBox=this.renderRoot.querySelector(".input-box")}focus(){this.inputBox?this.inputBox.focus():super.focus()}open(){this.expanded=!0}close(){this.expanded=!1}toggle(){this.expanded=!this.expanded}}F.define("flow-form-control");class U extends p.Hc{static get properties(){return{btnText:{type:String},value:{type:String},disabled:{type:Boolean}}}static get styles(){return p.iv`
			:host{
				display:inline-block;
				font-family:var(--flow-font-family, "Julius Sans One");
				font-weight:var(--flow-font-weight, bold);
				width:var(--flow-folder-input-width, 100%);
				min-width:var(--flow-folder-input-min-width, 100px);
				max-width:var(--flow-folder-input-max-width, 100%);
			}
			:host(:not([disabled])) label,
			:host(:not([disabled])) label input{
				cursor:pointer;
			}
			
			.wrapper{
				display:flex;
				align-items:stretch;
				min-width:50px;
				text-align:center;
				justify-content:center;
			}
			label{
				position:relative;
				padding:5px;
				background-color:var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border: 2px solid var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
				overflow:hidden;
				border-radius:8px;
				border-top-left-radius: var(--flow-folder-input-tlbr, 4px);
    			border-bottom-left-radius: var(--flow-folder-input-blbr, 4px);
    			color:var(--flow-border-invert-color, var(--flow-primary-invert-color, #FFF));
			}
			:host(:not([disabled])) label:hover{
				background-color:var(--flow-border-hover-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-color:var(--flow-border-hover-color, var(--flow-primary-color, rgba(0,151,115,1)))
			}
			label input{
			    position: absolute;
			    left: 0px;
			    top: 0px;
			    right: 0px;
			    bottom: 0px;
			    font-size: 200px;
			    height: 63px;
			    background: #F00;
			    opacity:0;
			    z-index:-1;
			}
			label .text{
				z-index:1;
			}
			.value{
				position:relative;
			    display: flex;
			    align-items: center;
			    padding: 0px 30px 0px 5px;
				box-sizing: border-box;
				margin-right:var(--flow-folder-input-vmr, 2px);
				width:150px;flex:1;
				min-height:32px;
				border: 2px solid var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-radius:8px;
				border-top-right-radius: var(--flow-folder-input-trbr, 4px);
    			border-bottom-right-radius: var(--flow-folder-input-brbr, 4px);
    			background-color:var(--flow-input-bg, inherit);
			}
			.value>span{
				overflow:hidden;text-overflow:ellipsis;flex:1;white-space:nowrap;
				text-align:left;
			}
			:host([disabled]) .value{
				padding-right:10px;
			}
			.clear-btn{
				font-style: normal;
			    font-size: 25px;
			    padding: 0px 10px 0px 10px;
			    cursor: pointer;
			    display:none;
			    position: absolute;
			    right: 0px;
			    z-index: 1;
			}
			:host(:not([disabled])) [has-value] .clear-btn{display:block;}
		`}render(){return p.dy`
		<div class="wrapper" @click=${this.onClick} ?has-value=${!!this.value}>
			<slot name="prefix"></slot>
			<div class="value">
				<span>${this.value}</span>
				<i class="clear-btn" title="Clear" @click=${this.setClear}>&times;</i>
			</div>
			<label class="btn">
				<input type="file" ?disabled=${this.disabled} nwdirectory @change=${this.onChange} />
				<div class="text"><flow-i18n text="${this.btnText||"Select Folder"}"></flow-i18n></div>
			</label>
			<slot name="sufix"></slot>
		</div>
		`}setClear(){this.setValue("")}onClick(){this.fire("flow-folder-input-click",{el:this})}onChange(e){let t=this.shadowRoot.querySelector("input").value;t&&(this.value=t,this.fire("changed",{el:this,value:t}))}setValue(e){this.value=e,this.shadowRoot.querySelector("input").value="",this.fire("changed",{el:this,value:this.value})}}U.define("flow-folder-input"),__webpack_require__(5830);class L extends HTMLInputElement{connectedCallback(){this.initState(),this.initEvents()}initState(){this.__state={value:this.value,start:this.selectionStart,end:this.selectionEnd,allowedPattern:this.dataset.allowedPattern?RegExp(`^${this.dataset.allowedPattern}$`):null}}initEvents(){this.addEventListener("focus",this._onFocus.bind(this)),this.addEventListener("input",this._onInput.bind(this)),this.addEventListener("keydown",this._onKeyDown.bind(this))}getState(){return this.__state}_onInput(e){let t=this.getState();!t.allowedPattern||t.allowedPattern.test(this.value)?t.value=this.value:(this.value=t.value,this.setSelectionRange(t.start,t.end))}_onFocus(){let e=this.getState();e.value=this.value,e.start=this.selectionStart,e.end=this.selectionEnd}_onKeyDown(e){let t=this.getState();t.start=this.selectionStart,t.end=this.selectionEnd}}customElements.define("flow-core-input",L,{extends:"input"});class H extends p.Hc{static get properties(){return{icon:{type:String},expand:{type:Boolean,reflect:!0},"no-info":{type:Boolean,reflect:!0},caption:{type:String}}}static get styles(){return p.iv`
		:host{
			display:flex;
			align-items:flex-start;
			margin:var(--flow-expandable-margin,10px 0px);
		}
		.icon-box{
			width:30px;
			position:var(--flow-expandable-icon-box-position,initial);
			max-width:var(--flow-expandable-icon-box-max-width,30px);
			text-align:center;
		}
		.icon-box, .title-box{
			display:flex;
			align-items:center;
			min-height:30px;
			cursor:pointer;
			user-select:none;
		}
		.title-box{
			position:relative;
		}
		.title-box:after{
			position:absolute;
			left:0px;
			top:0px;
			content:"";
			z-index:1;
			width:100%;
			height:100%;
		}
		.icon-box svg{
			width:var(--flow-expandable-icon-box-svg-width,24px);
			height:var(--flow-expandable-icon-box-svg-height,24px);
			margin-right: var(--flow-expandable-icon-box-svg-margin-right,8px);
			fill:var(--flow-primary-color, rgba(0,151,115,1.0));
		}
		.content-box{
			width:100px;
			flex:1;
			min-width: var(--flow-expandable-content-box-min-width);
		}
		.content{
			margin:var(--flow-expandable-content-margin,5px 5px 5px 10px);
			
		}

		.info-box{
			flex:1;
			max-width:300px;
			padding:0px 10px;
		}
		:host([no-help]) .info-box,
		:host([no-info]) .info-box{
			display:none
		}
		:host([no-icon]) .icon-box{
			display:none;
		}
		.info-box ::slotted(*){
			margin:unset;
		}
		.info-box ::slotted(h4.title){
			border-bottom: 1px solid #ddd;
		    margin:0px 0px 10px 0px;
		    font-weight: bold;
		    font-size: 1.1em;
		}
		.info-box ::slotted(p){
			font-size:0.8em;
		}
		:host(:not([expand])) .content{display:none}
		:host([expand]:not([static-icon])) .icon-box > svg{
			transform:rotate(90deg)
		}
		`}render(){let e="";return"-"!=this.icon&&(e=this.iconPath(this.icon||"caret-right")),p.dy`
			<div class="icon-box" data-flow-expandable="toggle" @click=${this.toggle}><svg><use href="${e}"></use></svg></div>
			<div class="content-box">
				<label class="title-box" data-flow-expandable="toggle" @click=${this.toggle}><slot name="title"></slot>${this.caption||""}</label>
				<div class="content"><slot></slot></div>
			</div>
			<div class="info-box"><slot name="info"></slot></div>
		`}open(){this.expand=!0}close(){this.expand=!1}toggle(){this.expand=!this.expand}}H.define("flow-expandable");var j=__webpack_require__(2170);class z extends p.Hc{static get properties(){return{for:{type:String},ntype:{type:Number},data:{type:String},ecl:{type:String},mode:{type:String},multibyte:{type:String}}}static get styles(){return p.iv`
			:host {
				display : block;
			}

			svg {
				width: 100%;
				height: 100%;
			}
			
			:host(.left-img) img{
				object-position:left;
			}
		`}constructor(){super(),this.ntype=0,this.ecl="M",this.mode="Byte",this.multibyte="UTF-8",this.data=""}render(){return window.qrcode?(this.qr&&this.data==this.data_last_||(this.data_last_=this.data,this.qr=this.createQRCode(this.data,this.ntype,this.ecl,this.mode,this.multibyte)),this.qr):((0,j.Kg)(128,(()=>{this.requestUpdate()})),"QR")}createQRCode(e,t,r,i,n){window.qrcode.stringToBytes=window.qrcode.stringToBytesFuncs[n];var o=qrcode(t||4,r||"M");o.addData(e,i),o.make();let s=document.createElement("div");return s.innerHTML=o.createSvgTag(2,8),s}}z.define("flow-qrcode",[p.FH+"resources/extern/qrcode/qrcode.js"]);let K={};!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.jsQR=t():e.jsQR=t()}(K,(function(){return function(e){var t={};function r(i){if(t[i])return t[i].exports;var n=t[i]={i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,i){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=3)}([function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){this.width=t,this.height=e.length/t,this.data=e}return e.createEmpty=function(t,r){return new e(new Uint8ClampedArray(t*r),t)},e.prototype.get=function(e,t){return!(e<0||e>=this.width||t<0||t>=this.height||!this.data[t*this.width+e])},e.prototype.set=function(e,t,r){this.data[t*this.width+e]=r?1:0},e.prototype.setRegion=function(e,t,r,i,n){for(var o=t;o<t+i;o++)for(var s=e;s<e+r;s++)this.set(s,o,!!n)},e}();t.BitMatrix=i},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var i=r(2);t.addOrSubtractGF=function(e,t){return e^t};var n=function(){function e(e,t,r){this.primitive=e,this.size=t,this.generatorBase=r,this.expTable=new Array(this.size),this.logTable=new Array(this.size);for(var n=1,o=0;o<this.size;o++)this.expTable[o]=n,(n*=2)>=this.size&&(n=(n^this.primitive)&this.size-1);for(o=0;o<this.size-1;o++)this.logTable[this.expTable[o]]=o;this.zero=new i.default(this,Uint8ClampedArray.from([0])),this.one=new i.default(this,Uint8ClampedArray.from([1]))}return e.prototype.multiply=function(e,t){return 0===e||0===t?0:this.expTable[(this.logTable[e]+this.logTable[t])%(this.size-1)]},e.prototype.inverse=function(e){if(0===e)throw new Error("Can't invert 0");return this.expTable[this.size-this.logTable[e]-1]},e.prototype.buildMonomial=function(e,t){if(e<0)throw new Error("Invalid monomial degree less than 0");if(0===t)return this.zero;var r=new Uint8ClampedArray(e+1);return r[0]=t,new i.default(this,r)},e.prototype.log=function(e){if(0===e)throw new Error("Can't take log(0)");return this.logTable[e]},e.prototype.exp=function(e){return this.expTable[e]},e}();t.default=n},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var i=r(1),n=function(){function e(e,t){if(0===t.length)throw new Error("No coefficients.");this.field=e;var r=t.length;if(r>1&&0===t[0]){for(var i=1;i<r&&0===t[i];)i++;if(i===r)this.coefficients=e.zero.coefficients;else{this.coefficients=new Uint8ClampedArray(r-i);for(var n=0;n<this.coefficients.length;n++)this.coefficients[n]=t[i+n]}}else this.coefficients=t}return e.prototype.degree=function(){return this.coefficients.length-1},e.prototype.isZero=function(){return 0===this.coefficients[0]},e.prototype.getCoefficient=function(e){return this.coefficients[this.coefficients.length-1-e]},e.prototype.addOrSubtract=function(t){var r;if(this.isZero())return t;if(t.isZero())return this;var n=this.coefficients,o=t.coefficients;n.length>o.length&&(n=(r=[o,n])[0],o=r[1]);for(var s=new Uint8ClampedArray(o.length),a=o.length-n.length,c=0;c<a;c++)s[c]=o[c];for(c=a;c<o.length;c++)s[c]=i.addOrSubtractGF(n[c-a],o[c]);return new e(this.field,s)},e.prototype.multiply=function(t){if(0===t)return this.field.zero;if(1===t)return this;for(var r=this.coefficients.length,i=new Uint8ClampedArray(r),n=0;n<r;n++)i[n]=this.field.multiply(this.coefficients[n],t);return new e(this.field,i)},e.prototype.multiplyPoly=function(t){if(this.isZero()||t.isZero())return this.field.zero;for(var r=this.coefficients,n=r.length,o=t.coefficients,s=o.length,a=new Uint8ClampedArray(n+s-1),c=0;c<n;c++)for(var l=r[c],u=0;u<s;u++)a[c+u]=i.addOrSubtractGF(a[c+u],this.field.multiply(l,o[u]));return new e(this.field,a)},e.prototype.multiplyByMonomial=function(t,r){if(t<0)throw new Error("Invalid degree less than 0");if(0===r)return this.field.zero;for(var i=this.coefficients.length,n=new Uint8ClampedArray(i+t),o=0;o<i;o++)n[o]=this.field.multiply(this.coefficients[o],r);return new e(this.field,n)},e.prototype.evaluateAt=function(e){var t=0;if(0===e)return this.getCoefficient(0);var r=this.coefficients.length;if(1===e)return this.coefficients.forEach((function(e){t=i.addOrSubtractGF(t,e)})),t;t=this.coefficients[0];for(var n=1;n<r;n++)t=i.addOrSubtractGF(this.field.multiply(e,t),this.coefficients[n]);return t},e}();t.default=n},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var i=r(4),n=r(5),o=r(11),s=r(12);function a(e){var t=s.locate(e);if(!t)return null;for(var r=0,i=t;r<i.length;r++){var a=i[r],c=o.extract(e,a),l=n.decode(c.matrix);if(l)return{binaryData:l.bytes,data:l.text,chunks:l.chunks,location:{topRightCorner:c.mappingFunction(a.dimension,0),topLeftCorner:c.mappingFunction(0,0),bottomRightCorner:c.mappingFunction(a.dimension,a.dimension),bottomLeftCorner:c.mappingFunction(0,a.dimension),topRightFinderPattern:a.topRight,topLeftFinderPattern:a.topLeft,bottomLeftFinderPattern:a.bottomLeft,bottomRightAlignmentPattern:a.alignmentPattern}}}return null}var c={inversionAttempts:"attemptBoth"};function l(e,t,r,n){void 0===n&&(n={});var o=c;Object.keys(o||{}).forEach((function(e){o[e]=n[e]||o[e]}));var s="attemptBoth"===o.inversionAttempts||"invertFirst"===o.inversionAttempts,l="onlyInvert"===o.inversionAttempts||"invertFirst"===o.inversionAttempts,u=i.binarize(e,t,r,s),h=u.binarized,d=u.inverted,f=a(l?d:h);return f||"attemptBoth"!==o.inversionAttempts&&"invertFirst"!==o.inversionAttempts||(f=a(l?h:d)),f}l.default=l,t.default=l},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var i=r(0);function n(e,t,r){return e<t?t:e>r?r:e}var o=function(){function e(e,t){this.width=e,this.data=new Uint8ClampedArray(e*t)}return e.prototype.get=function(e,t){return this.data[t*this.width+e]},e.prototype.set=function(e,t,r){this.data[t*this.width+e]=r},e}();t.binarize=function(e,t,r,s){if(e.length!==t*r*4)throw new Error("Malformed data passed to binarizer.");for(var a=new o(t,r),c=0;c<t;c++)for(var l=0;l<r;l++){var u=e[4*(l*t+c)+0],h=e[4*(l*t+c)+1],d=e[4*(l*t+c)+2];a.set(c,l,.2126*u+.7152*h+.0722*d)}for(var f=Math.ceil(t/8),p=Math.ceil(r/8),g=new o(f,p),m=0;m<p;m++)for(var b=0;b<f;b++){var v=0,y=1/0,w=0;for(l=0;l<8;l++)for(c=0;c<8;c++){var _=a.get(8*b+c,8*m+l);v+=_,y=Math.min(y,_),w=Math.max(w,_)}var x=v/Math.pow(8,2);if(w-y<=24&&(x=y/2,m>0&&b>0)){var k=(g.get(b,m-1)+2*g.get(b-1,m)+g.get(b-1,m-1))/4;y<k&&(x=k)}g.set(b,m,x)}var S=i.BitMatrix.createEmpty(t,r),E=null;for(s&&(E=i.BitMatrix.createEmpty(t,r)),m=0;m<p;m++)for(b=0;b<f;b++){for(var A=n(b,2,f-3),I=n(m,2,p-3),C=(v=0,-2);C<=2;C++)for(var T=-2;T<=2;T++)v+=g.get(A+C,I+T);var O=v/25;for(C=0;C<8;C++)for(T=0;T<8;T++){c=8*b+C,l=8*m+T;var M=a.get(c,l);S.set(c,l,M<=O),s&&E.set(c,l,!(M<=O))}}return s?{binarized:S,inverted:E}:{binarized:S}}},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var i=r(0),n=r(6),o=r(9),s=r(10);function a(e,t){for(var r=e^t,i=0;r;)i++,r&=r-1;return i}function c(e,t){return t<<1|e}var l=[{bits:21522,formatInfo:{errorCorrectionLevel:1,dataMask:0}},{bits:20773,formatInfo:{errorCorrectionLevel:1,dataMask:1}},{bits:24188,formatInfo:{errorCorrectionLevel:1,dataMask:2}},{bits:23371,formatInfo:{errorCorrectionLevel:1,dataMask:3}},{bits:17913,formatInfo:{errorCorrectionLevel:1,dataMask:4}},{bits:16590,formatInfo:{errorCorrectionLevel:1,dataMask:5}},{bits:20375,formatInfo:{errorCorrectionLevel:1,dataMask:6}},{bits:19104,formatInfo:{errorCorrectionLevel:1,dataMask:7}},{bits:30660,formatInfo:{errorCorrectionLevel:0,dataMask:0}},{bits:29427,formatInfo:{errorCorrectionLevel:0,dataMask:1}},{bits:32170,formatInfo:{errorCorrectionLevel:0,dataMask:2}},{bits:30877,formatInfo:{errorCorrectionLevel:0,dataMask:3}},{bits:26159,formatInfo:{errorCorrectionLevel:0,dataMask:4}},{bits:25368,formatInfo:{errorCorrectionLevel:0,dataMask:5}},{bits:27713,formatInfo:{errorCorrectionLevel:0,dataMask:6}},{bits:26998,formatInfo:{errorCorrectionLevel:0,dataMask:7}},{bits:5769,formatInfo:{errorCorrectionLevel:3,dataMask:0}},{bits:5054,formatInfo:{errorCorrectionLevel:3,dataMask:1}},{bits:7399,formatInfo:{errorCorrectionLevel:3,dataMask:2}},{bits:6608,formatInfo:{errorCorrectionLevel:3,dataMask:3}},{bits:1890,formatInfo:{errorCorrectionLevel:3,dataMask:4}},{bits:597,formatInfo:{errorCorrectionLevel:3,dataMask:5}},{bits:3340,formatInfo:{errorCorrectionLevel:3,dataMask:6}},{bits:2107,formatInfo:{errorCorrectionLevel:3,dataMask:7}},{bits:13663,formatInfo:{errorCorrectionLevel:2,dataMask:0}},{bits:12392,formatInfo:{errorCorrectionLevel:2,dataMask:1}},{bits:16177,formatInfo:{errorCorrectionLevel:2,dataMask:2}},{bits:14854,formatInfo:{errorCorrectionLevel:2,dataMask:3}},{bits:9396,formatInfo:{errorCorrectionLevel:2,dataMask:4}},{bits:8579,formatInfo:{errorCorrectionLevel:2,dataMask:5}},{bits:11994,formatInfo:{errorCorrectionLevel:2,dataMask:6}},{bits:11245,formatInfo:{errorCorrectionLevel:2,dataMask:7}}],u=[function(e){return(e.y+e.x)%2==0},function(e){return e.y%2==0},function(e){return e.x%3==0},function(e){return(e.y+e.x)%3==0},function(e){return(Math.floor(e.y/2)+Math.floor(e.x/3))%2==0},function(e){return e.x*e.y%2+e.x*e.y%3==0},function(e){return(e.y*e.x%2+e.y*e.x%3)%2==0},function(e){return((e.y+e.x)%2+e.y*e.x%3)%2==0}];function h(e){var t=function(e){var t=e.height,r=Math.floor((t-17)/4);if(r<=6)return s.VERSIONS[r-1];for(var i=0,n=5;n>=0;n--)for(var o=t-9;o>=t-11;o--)i=c(e.get(o,n),i);var l=0;for(o=5;o>=0;o--)for(n=t-9;n>=t-11;n--)l=c(e.get(o,n),l);for(var u,h=1/0,d=0,f=s.VERSIONS;d<f.length;d++){var p=f[d];if(p.infoBits===i||p.infoBits===l)return p;var g=a(i,p.infoBits);g<h&&(u=p,h=g),(g=a(l,p.infoBits))<h&&(u=p,h=g)}return h<=3?u:void 0}(e);if(!t)return null;var r=function(e){for(var t=0,r=0;r<=8;r++)6!==r&&(t=c(e.get(r,8),t));for(var i=7;i>=0;i--)6!==i&&(t=c(e.get(8,i),t));var n=e.height,o=0;for(i=n-1;i>=n-7;i--)o=c(e.get(8,i),o);for(r=n-8;r<n;r++)o=c(e.get(r,8),o);for(var s=1/0,u=null,h=0,d=l;h<d.length;h++){var f=d[h],p=f.bits,g=f.formatInfo;if(p===t||p===o)return g;var m=a(t,p);m<s&&(u=g,s=m),t!==o&&(m=a(o,p))<s&&(u=g,s=m)}return s<=3?u:null}(e);if(!r)return null;var h=function(e,t,r){var i=t.errorCorrectionLevels[r],n=[],o=0;if(i.ecBlocks.forEach((function(e){for(var t=0;t<e.numBlocks;t++)n.push({numDataCodewords:e.dataCodewordsPerBlock,codewords:[]}),o+=e.dataCodewordsPerBlock+i.ecCodewordsPerBlock})),e.length<o)return null;e=e.slice(0,o);for(var s=i.ecBlocks[0].dataCodewordsPerBlock,a=0;a<s;a++)for(var c=0,l=n;c<l.length;c++)l[c].codewords.push(e.shift());if(i.ecBlocks.length>1){var u=i.ecBlocks[0].numBlocks,h=i.ecBlocks[1].numBlocks;for(a=0;a<h;a++)n[u+a].codewords.push(e.shift())}for(;e.length>0;)for(var d=0,f=n;d<f.length;d++)f[d].codewords.push(e.shift());return n}(function(e,t,r){for(var n=u[r.dataMask],o=e.height,s=function(e){var t=17+4*e.versionNumber,r=i.BitMatrix.createEmpty(t,t);r.setRegion(0,0,9,9,!0),r.setRegion(t-8,0,8,9,!0),r.setRegion(0,t-8,9,8,!0);for(var n=0,o=e.alignmentPatternCenters;n<o.length;n++)for(var s=o[n],a=0,c=e.alignmentPatternCenters;a<c.length;a++){var l=c[a];6===s&&6===l||6===s&&l===t-7||s===t-7&&6===l||r.setRegion(s-2,l-2,5,5,!0)}return r.setRegion(6,9,1,t-17,!0),r.setRegion(9,6,t-17,1,!0),e.versionNumber>6&&(r.setRegion(t-11,0,3,6,!0),r.setRegion(0,t-11,6,3,!0)),r}(t),a=[],l=0,h=0,d=!0,f=o-1;f>0;f-=2){6===f&&f--;for(var p=0;p<o;p++)for(var g=d?o-1-p:p,m=0;m<2;m++){var b=f-m;if(!s.get(b,g)){h++;var v=e.get(b,g);n({y:g,x:b})&&(v=!v),l=c(v,l),8===h&&(a.push(l),h=0,l=0)}}d=!d}return a}(e,t,r),t,r.errorCorrectionLevel);if(!h)return null;for(var d=h.reduce((function(e,t){return e+t.numDataCodewords}),0),f=new Uint8ClampedArray(d),p=0,g=0,m=h;g<m.length;g++){var b=m[g],v=o.decode(b.codewords,b.codewords.length-b.numDataCodewords);if(!v)return null;for(var y=0;y<b.numDataCodewords;y++)f[p++]=v[y]}try{return n.decode(f,t.versionNumber)}catch(e){return null}}t.decode=function(e){if(null==e)return null;var t=h(e);if(t)return t;for(var r=0;r<e.width;r++)for(var i=r+1;i<e.height;i++)e.get(r,i)!==e.get(i,r)&&(e.set(r,i,!e.get(r,i)),e.set(i,r,!e.get(i,r)));return h(e)}},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var i,n,o=r(7),s=r(8);function a(e,t){for(var r=[],i="",n=[10,12,14][t],o=e.readBits(n);o>=3;){if((l=e.readBits(10))>=1e3)throw new Error("Invalid numeric value above 999");var s=Math.floor(l/100),a=Math.floor(l/10)%10,c=l%10;r.push(48+s,48+a,48+c),i+=s.toString()+a.toString()+c.toString(),o-=3}if(2===o){if((l=e.readBits(7))>=100)throw new Error("Invalid numeric value above 99");s=Math.floor(l/10),a=l%10,r.push(48+s,48+a),i+=s.toString()+a.toString()}else if(1===o){var l;if((l=e.readBits(4))>=10)throw new Error("Invalid numeric value above 9");r.push(48+l),i+=l.toString()}return{bytes:r,text:i}}!function(e){e.Numeric="numeric",e.Alphanumeric="alphanumeric",e.Byte="byte",e.Kanji="kanji",e.ECI="eci"}(i=t.Mode||(t.Mode={})),function(e){e[e.Terminator=0]="Terminator",e[e.Numeric=1]="Numeric",e[e.Alphanumeric=2]="Alphanumeric",e[e.Byte=4]="Byte",e[e.Kanji=8]="Kanji",e[e.ECI=7]="ECI"}(n||(n={}));var c=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function l(e,t){for(var r=[],i="",n=[9,11,13][t],o=e.readBits(n);o>=2;){var s=e.readBits(11),a=Math.floor(s/45),l=s%45;r.push(c[a].charCodeAt(0),c[l].charCodeAt(0)),i+=c[a]+c[l],o-=2}return 1===o&&(a=e.readBits(6),r.push(c[a].charCodeAt(0)),i+=c[a]),{bytes:r,text:i}}function u(e,t){for(var r=[],i="",n=[8,16,16][t],o=e.readBits(n),s=0;s<o;s++){var a=e.readBits(8);r.push(a)}try{i+=decodeURIComponent(r.map((function(e){return"%"+("0"+e.toString(16)).substr(-2)})).join(""))}catch(e){}return{bytes:r,text:i}}function h(e,t){for(var r=[],i="",n=[8,10,12][t],o=e.readBits(n),a=0;a<o;a++){var c=e.readBits(13),l=Math.floor(c/192)<<8|c%192;l+=l<7936?33088:49472,r.push(l>>8,255&l),i+=String.fromCharCode(s.shiftJISTable[l])}return{bytes:r,text:i}}t.decode=function(e,t){for(var r,s,c,d,f=new o.BitStream(e),p=t<=9?0:t<=26?1:2,g={text:"",bytes:[],chunks:[]};f.available()>=4;){var m=f.readBits(4);if(m===n.Terminator)return g;if(m===n.ECI)0===f.readBits(1)?g.chunks.push({type:i.ECI,assignmentNumber:f.readBits(7)}):0===f.readBits(1)?g.chunks.push({type:i.ECI,assignmentNumber:f.readBits(14)}):0===f.readBits(1)?g.chunks.push({type:i.ECI,assignmentNumber:f.readBits(21)}):g.chunks.push({type:i.ECI,assignmentNumber:-1});else if(m===n.Numeric){var b=a(f,p);g.text+=b.text,(r=g.bytes).push.apply(r,b.bytes),g.chunks.push({type:i.Numeric,text:b.text})}else if(m===n.Alphanumeric){var v=l(f,p);g.text+=v.text,(s=g.bytes).push.apply(s,v.bytes),g.chunks.push({type:i.Alphanumeric,text:v.text})}else if(m===n.Byte){var y=u(f,p);g.text+=y.text,(c=g.bytes).push.apply(c,y.bytes),g.chunks.push({type:i.Byte,bytes:y.bytes,text:y.text})}else if(m===n.Kanji){var w=h(f,p);g.text+=w.text,(d=g.bytes).push.apply(d,w.bytes),g.chunks.push({type:i.Kanji,bytes:w.bytes,text:w.text})}}if(0===f.available()||0===f.readBits(f.available()))return g}},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e){this.byteOffset=0,this.bitOffset=0,this.bytes=e}return e.prototype.readBits=function(e){if(e<1||e>32||e>this.available())throw new Error("Cannot read "+e.toString()+" bits");var t=0;if(this.bitOffset>0){var r=8-this.bitOffset,i=e<r?e:r,n=255>>8-i<<(o=r-i);t=(this.bytes[this.byteOffset]&n)>>o,e-=i,this.bitOffset+=i,8===this.bitOffset&&(this.bitOffset=0,this.byteOffset++)}if(e>0){for(;e>=8;)t=t<<8|255&this.bytes[this.byteOffset],this.byteOffset++,e-=8;var o;if(e>0)n=255>>(o=8-e)<<o,t=t<<e|(this.bytes[this.byteOffset]&n)>>o,this.bitOffset+=e}return t},e.prototype.available=function(){return 8*(this.bytes.length-this.byteOffset)-this.bitOffset},e}();t.BitStream=i},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.shiftJISTable={32:32,33:33,34:34,35:35,36:36,37:37,38:38,39:39,40:40,41:41,42:42,43:43,44:44,45:45,46:46,47:47,48:48,49:49,50:50,51:51,52:52,53:53,54:54,55:55,56:56,57:57,58:58,59:59,60:60,61:61,62:62,63:63,64:64,65:65,66:66,67:67,68:68,69:69,70:70,71:71,72:72,73:73,74:74,75:75,76:76,77:77,78:78,79:79,80:80,81:81,82:82,83:83,84:84,85:85,86:86,87:87,88:88,89:89,90:90,91:91,92:165,93:93,94:94,95:95,96:96,97:97,98:98,99:99,100:100,101:101,102:102,103:103,104:104,105:105,106:106,107:107,108:108,109:109,110:110,111:111,112:112,113:113,114:114,115:115,116:116,117:117,118:118,119:119,120:120,121:121,122:122,123:123,124:124,125:125,126:8254,33088:12288,33089:12289,33090:12290,33091:65292,33092:65294,33093:12539,33094:65306,33095:65307,33096:65311,33097:65281,33098:12443,33099:12444,33100:180,33101:65344,33102:168,33103:65342,33104:65507,33105:65343,33106:12541,33107:12542,33108:12445,33109:12446,33110:12291,33111:20189,33112:12293,33113:12294,33114:12295,33115:12540,33116:8213,33117:8208,33118:65295,33119:92,33120:12316,33121:8214,33122:65372,33123:8230,33124:8229,33125:8216,33126:8217,33127:8220,33128:8221,33129:65288,33130:65289,33131:12308,33132:12309,33133:65339,33134:65341,33135:65371,33136:65373,33137:12296,33138:12297,33139:12298,33140:12299,33141:12300,33142:12301,33143:12302,33144:12303,33145:12304,33146:12305,33147:65291,33148:8722,33149:177,33150:215,33152:247,33153:65309,33154:8800,33155:65308,33156:65310,33157:8806,33158:8807,33159:8734,33160:8756,33161:9794,33162:9792,33163:176,33164:8242,33165:8243,33166:8451,33167:65509,33168:65284,33169:162,33170:163,33171:65285,33172:65283,33173:65286,33174:65290,33175:65312,33176:167,33177:9734,33178:9733,33179:9675,33180:9679,33181:9678,33182:9671,33183:9670,33184:9633,33185:9632,33186:9651,33187:9650,33188:9661,33189:9660,33190:8251,33191:12306,33192:8594,33193:8592,33194:8593,33195:8595,33196:12307,33208:8712,33209:8715,33210:8838,33211:8839,33212:8834,33213:8835,33214:8746,33215:8745,33224:8743,33225:8744,33226:172,33227:8658,33228:8660,33229:8704,33230:8707,33242:8736,33243:8869,33244:8978,33245:8706,33246:8711,33247:8801,33248:8786,33249:8810,33250:8811,33251:8730,33252:8765,33253:8733,33254:8757,33255:8747,33256:8748,33264:8491,33265:8240,33266:9839,33267:9837,33268:9834,33269:8224,33270:8225,33271:182,33276:9711,33359:65296,33360:65297,33361:65298,33362:65299,33363:65300,33364:65301,33365:65302,33366:65303,33367:65304,33368:65305,33376:65313,33377:65314,33378:65315,33379:65316,33380:65317,33381:65318,33382:65319,33383:65320,33384:65321,33385:65322,33386:65323,33387:65324,33388:65325,33389:65326,33390:65327,33391:65328,33392:65329,33393:65330,33394:65331,33395:65332,33396:65333,33397:65334,33398:65335,33399:65336,33400:65337,33401:65338,33409:65345,33410:65346,33411:65347,33412:65348,33413:65349,33414:65350,33415:65351,33416:65352,33417:65353,33418:65354,33419:65355,33420:65356,33421:65357,33422:65358,33423:65359,33424:65360,33425:65361,33426:65362,33427:65363,33428:65364,33429:65365,33430:65366,33431:65367,33432:65368,33433:65369,33434:65370,33439:12353,33440:12354,33441:12355,33442:12356,33443:12357,33444:12358,33445:12359,33446:12360,33447:12361,33448:12362,33449:12363,33450:12364,33451:12365,33452:12366,33453:12367,33454:12368,33455:12369,33456:12370,33457:12371,33458:12372,33459:12373,33460:12374,33461:12375,33462:12376,33463:12377,33464:12378,33465:12379,33466:12380,33467:12381,33468:12382,33469:12383,33470:12384,33471:12385,33472:12386,33473:12387,33474:12388,33475:12389,33476:12390,33477:12391,33478:12392,33479:12393,33480:12394,33481:12395,33482:12396,33483:12397,33484:12398,33485:12399,33486:12400,33487:12401,33488:12402,33489:12403,33490:12404,33491:12405,33492:12406,33493:12407,33494:12408,33495:12409,33496:12410,33497:12411,33498:12412,33499:12413,33500:12414,33501:12415,33502:12416,33503:12417,33504:12418,33505:12419,33506:12420,33507:12421,33508:12422,33509:12423,33510:12424,33511:12425,33512:12426,33513:12427,33514:12428,33515:12429,33516:12430,33517:12431,33518:12432,33519:12433,33520:12434,33521:12435,33600:12449,33601:12450,33602:12451,33603:12452,33604:12453,33605:12454,33606:12455,33607:12456,33608:12457,33609:12458,33610:12459,33611:12460,33612:12461,33613:12462,33614:12463,33615:12464,33616:12465,33617:12466,33618:12467,33619:12468,33620:12469,33621:12470,33622:12471,33623:12472,33624:12473,33625:12474,33626:12475,33627:12476,33628:12477,33629:12478,33630:12479,33631:12480,33632:12481,33633:12482,33634:12483,33635:12484,33636:12485,33637:12486,33638:12487,33639:12488,33640:12489,33641:12490,33642:12491,33643:12492,33644:12493,33645:12494,33646:12495,33647:12496,33648:12497,33649:12498,33650:12499,33651:12500,33652:12501,33653:12502,33654:12503,33655:12504,33656:12505,33657:12506,33658:12507,33659:12508,33660:12509,33661:12510,33662:12511,33664:12512,33665:12513,33666:12514,33667:12515,33668:12516,33669:12517,33670:12518,33671:12519,33672:12520,33673:12521,33674:12522,33675:12523,33676:12524,33677:12525,33678:12526,33679:12527,33680:12528,33681:12529,33682:12530,33683:12531,33684:12532,33685:12533,33686:12534,33695:913,33696:914,33697:915,33698:916,33699:917,33700:918,33701:919,33702:920,33703:921,33704:922,33705:923,33706:924,33707:925,33708:926,33709:927,33710:928,33711:929,33712:931,33713:932,33714:933,33715:934,33716:935,33717:936,33718:937,33727:945,33728:946,33729:947,33730:948,33731:949,33732:950,33733:951,33734:952,33735:953,33736:954,33737:955,33738:956,33739:957,33740:958,33741:959,33742:960,33743:961,33744:963,33745:964,33746:965,33747:966,33748:967,33749:968,33750:969,33856:1040,33857:1041,33858:1042,33859:1043,33860:1044,33861:1045,33862:1025,33863:1046,33864:1047,33865:1048,33866:1049,33867:1050,33868:1051,33869:1052,33870:1053,33871:1054,33872:1055,33873:1056,33874:1057,33875:1058,33876:1059,33877:1060,33878:1061,33879:1062,33880:1063,33881:1064,33882:1065,33883:1066,33884:1067,33885:1068,33886:1069,33887:1070,33888:1071,33904:1072,33905:1073,33906:1074,33907:1075,33908:1076,33909:1077,33910:1105,33911:1078,33912:1079,33913:1080,33914:1081,33915:1082,33916:1083,33917:1084,33918:1085,33920:1086,33921:1087,33922:1088,33923:1089,33924:1090,33925:1091,33926:1092,33927:1093,33928:1094,33929:1095,33930:1096,33931:1097,33932:1098,33933:1099,33934:1100,33935:1101,33936:1102,33937:1103,33951:9472,33952:9474,33953:9484,33954:9488,33955:9496,33956:9492,33957:9500,33958:9516,33959:9508,33960:9524,33961:9532,33962:9473,33963:9475,33964:9487,33965:9491,33966:9499,33967:9495,33968:9507,33969:9523,33970:9515,33971:9531,33972:9547,33973:9504,33974:9519,33975:9512,33976:9527,33977:9535,33978:9501,33979:9520,33980:9509,33981:9528,33982:9538,34975:20124,34976:21782,34977:23043,34978:38463,34979:21696,34980:24859,34981:25384,34982:23030,34983:36898,34984:33909,34985:33564,34986:31312,34987:24746,34988:25569,34989:28197,34990:26093,34991:33894,34992:33446,34993:39925,34994:26771,34995:22311,34996:26017,34997:25201,34998:23451,34999:22992,35e3:34427,35001:39156,35002:32098,35003:32190,35004:39822,35005:25110,35006:31903,35007:34999,35008:23433,35009:24245,35010:25353,35011:26263,35012:26696,35013:38343,35014:38797,35015:26447,35016:20197,35017:20234,35018:20301,35019:20381,35020:20553,35021:22258,35022:22839,35023:22996,35024:23041,35025:23561,35026:24799,35027:24847,35028:24944,35029:26131,35030:26885,35031:28858,35032:30031,35033:30064,35034:31227,35035:32173,35036:32239,35037:32963,35038:33806,35039:34915,35040:35586,35041:36949,35042:36986,35043:21307,35044:20117,35045:20133,35046:22495,35047:32946,35048:37057,35049:30959,35050:19968,35051:22769,35052:28322,35053:36920,35054:31282,35055:33576,35056:33419,35057:39983,35058:20801,35059:21360,35060:21693,35061:21729,35062:22240,35063:23035,35064:24341,35065:39154,35066:28139,35067:32996,35068:34093,35136:38498,35137:38512,35138:38560,35139:38907,35140:21515,35141:21491,35142:23431,35143:28879,35144:32701,35145:36802,35146:38632,35147:21359,35148:40284,35149:31418,35150:19985,35151:30867,35152:33276,35153:28198,35154:22040,35155:21764,35156:27421,35157:34074,35158:39995,35159:23013,35160:21417,35161:28006,35162:29916,35163:38287,35164:22082,35165:20113,35166:36939,35167:38642,35168:33615,35169:39180,35170:21473,35171:21942,35172:23344,35173:24433,35174:26144,35175:26355,35176:26628,35177:27704,35178:27891,35179:27945,35180:29787,35181:30408,35182:31310,35183:38964,35184:33521,35185:34907,35186:35424,35187:37613,35188:28082,35189:30123,35190:30410,35191:39365,35192:24742,35193:35585,35194:36234,35195:38322,35196:27022,35197:21421,35198:20870,35200:22290,35201:22576,35202:22852,35203:23476,35204:24310,35205:24616,35206:25513,35207:25588,35208:27839,35209:28436,35210:28814,35211:28948,35212:29017,35213:29141,35214:29503,35215:32257,35216:33398,35217:33489,35218:34199,35219:36960,35220:37467,35221:40219,35222:22633,35223:26044,35224:27738,35225:29989,35226:20985,35227:22830,35228:22885,35229:24448,35230:24540,35231:25276,35232:26106,35233:27178,35234:27431,35235:27572,35236:29579,35237:32705,35238:35158,35239:40236,35240:40206,35241:40644,35242:23713,35243:27798,35244:33659,35245:20740,35246:23627,35247:25014,35248:33222,35249:26742,35250:29281,35251:20057,35252:20474,35253:21368,35254:24681,35255:28201,35256:31311,35257:38899,35258:19979,35259:21270,35260:20206,35261:20309,35262:20285,35263:20385,35264:20339,35265:21152,35266:21487,35267:22025,35268:22799,35269:23233,35270:23478,35271:23521,35272:31185,35273:26247,35274:26524,35275:26550,35276:27468,35277:27827,35278:28779,35279:29634,35280:31117,35281:31166,35282:31292,35283:31623,35284:33457,35285:33499,35286:33540,35287:33655,35288:33775,35289:33747,35290:34662,35291:35506,35292:22057,35293:36008,35294:36838,35295:36942,35296:38686,35297:34442,35298:20420,35299:23784,35300:25105,35301:29273,35302:30011,35303:33253,35304:33469,35305:34558,35306:36032,35307:38597,35308:39187,35309:39381,35310:20171,35311:20250,35312:35299,35313:22238,35314:22602,35315:22730,35316:24315,35317:24555,35318:24618,35319:24724,35320:24674,35321:25040,35322:25106,35323:25296,35324:25913,35392:39745,35393:26214,35394:26800,35395:28023,35396:28784,35397:30028,35398:30342,35399:32117,35400:33445,35401:34809,35402:38283,35403:38542,35404:35997,35405:20977,35406:21182,35407:22806,35408:21683,35409:23475,35410:23830,35411:24936,35412:27010,35413:28079,35414:30861,35415:33995,35416:34903,35417:35442,35418:37799,35419:39608,35420:28012,35421:39336,35422:34521,35423:22435,35424:26623,35425:34510,35426:37390,35427:21123,35428:22151,35429:21508,35430:24275,35431:25313,35432:25785,35433:26684,35434:26680,35435:27579,35436:29554,35437:30906,35438:31339,35439:35226,35440:35282,35441:36203,35442:36611,35443:37101,35444:38307,35445:38548,35446:38761,35447:23398,35448:23731,35449:27005,35450:38989,35451:38990,35452:25499,35453:31520,35454:27179,35456:27263,35457:26806,35458:39949,35459:28511,35460:21106,35461:21917,35462:24688,35463:25324,35464:27963,35465:28167,35466:28369,35467:33883,35468:35088,35469:36676,35470:19988,35471:39993,35472:21494,35473:26907,35474:27194,35475:38788,35476:26666,35477:20828,35478:31427,35479:33970,35480:37340,35481:37772,35482:22107,35483:40232,35484:26658,35485:33541,35486:33841,35487:31909,35488:21e3,35489:33477,35490:29926,35491:20094,35492:20355,35493:20896,35494:23506,35495:21002,35496:21208,35497:21223,35498:24059,35499:21914,35500:22570,35501:23014,35502:23436,35503:23448,35504:23515,35505:24178,35506:24185,35507:24739,35508:24863,35509:24931,35510:25022,35511:25563,35512:25954,35513:26577,35514:26707,35515:26874,35516:27454,35517:27475,35518:27735,35519:28450,35520:28567,35521:28485,35522:29872,35523:29976,35524:30435,35525:30475,35526:31487,35527:31649,35528:31777,35529:32233,35530:32566,35531:32752,35532:32925,35533:33382,35534:33694,35535:35251,35536:35532,35537:36011,35538:36996,35539:37969,35540:38291,35541:38289,35542:38306,35543:38501,35544:38867,35545:39208,35546:33304,35547:20024,35548:21547,35549:23736,35550:24012,35551:29609,35552:30284,35553:30524,35554:23721,35555:32747,35556:36107,35557:38593,35558:38929,35559:38996,35560:39e3,35561:20225,35562:20238,35563:21361,35564:21916,35565:22120,35566:22522,35567:22855,35568:23305,35569:23492,35570:23696,35571:24076,35572:24190,35573:24524,35574:25582,35575:26426,35576:26071,35577:26082,35578:26399,35579:26827,35580:26820,35648:27231,35649:24112,35650:27589,35651:27671,35652:27773,35653:30079,35654:31048,35655:23395,35656:31232,35657:32e3,35658:24509,35659:35215,35660:35352,35661:36020,35662:36215,35663:36556,35664:36637,35665:39138,35666:39438,35667:39740,35668:20096,35669:20605,35670:20736,35671:22931,35672:23452,35673:25135,35674:25216,35675:25836,35676:27450,35677:29344,35678:30097,35679:31047,35680:32681,35681:34811,35682:35516,35683:35696,35684:25516,35685:33738,35686:38816,35687:21513,35688:21507,35689:21931,35690:26708,35691:27224,35692:35440,35693:30759,35694:26485,35695:40653,35696:21364,35697:23458,35698:33050,35699:34384,35700:36870,35701:19992,35702:20037,35703:20167,35704:20241,35705:21450,35706:21560,35707:23470,35708:24339,35709:24613,35710:25937,35712:26429,35713:27714,35714:27762,35715:27875,35716:28792,35717:29699,35718:31350,35719:31406,35720:31496,35721:32026,35722:31998,35723:32102,35724:26087,35725:29275,35726:21435,35727:23621,35728:24040,35729:25298,35730:25312,35731:25369,35732:28192,35733:34394,35734:35377,35735:36317,35736:37624,35737:28417,35738:31142,35739:39770,35740:20136,35741:20139,35742:20140,35743:20379,35744:20384,35745:20689,35746:20807,35747:31478,35748:20849,35749:20982,35750:21332,35751:21281,35752:21375,35753:21483,35754:21932,35755:22659,35756:23777,35757:24375,35758:24394,35759:24623,35760:24656,35761:24685,35762:25375,35763:25945,35764:27211,35765:27841,35766:29378,35767:29421,35768:30703,35769:33016,35770:33029,35771:33288,35772:34126,35773:37111,35774:37857,35775:38911,35776:39255,35777:39514,35778:20208,35779:20957,35780:23597,35781:26241,35782:26989,35783:23616,35784:26354,35785:26997,35786:29577,35787:26704,35788:31873,35789:20677,35790:21220,35791:22343,35792:24062,35793:37670,35794:26020,35795:27427,35796:27453,35797:29748,35798:31105,35799:31165,35800:31563,35801:32202,35802:33465,35803:33740,35804:34943,35805:35167,35806:35641,35807:36817,35808:37329,35809:21535,35810:37504,35811:20061,35812:20534,35813:21477,35814:21306,35815:29399,35816:29590,35817:30697,35818:33510,35819:36527,35820:39366,35821:39368,35822:39378,35823:20855,35824:24858,35825:34398,35826:21936,35827:31354,35828:20598,35829:23507,35830:36935,35831:38533,35832:20018,35833:27355,35834:37351,35835:23633,35836:23624,35904:25496,35905:31391,35906:27795,35907:38772,35908:36705,35909:31402,35910:29066,35911:38536,35912:31874,35913:26647,35914:32368,35915:26705,35916:37740,35917:21234,35918:21531,35919:34219,35920:35347,35921:32676,35922:36557,35923:37089,35924:21350,35925:34952,35926:31041,35927:20418,35928:20670,35929:21009,35930:20804,35931:21843,35932:22317,35933:29674,35934:22411,35935:22865,35936:24418,35937:24452,35938:24693,35939:24950,35940:24935,35941:25001,35942:25522,35943:25658,35944:25964,35945:26223,35946:26690,35947:28179,35948:30054,35949:31293,35950:31995,35951:32076,35952:32153,35953:32331,35954:32619,35955:33550,35956:33610,35957:34509,35958:35336,35959:35427,35960:35686,35961:36605,35962:38938,35963:40335,35964:33464,35965:36814,35966:39912,35968:21127,35969:25119,35970:25731,35971:28608,35972:38553,35973:26689,35974:20625,35975:27424,35976:27770,35977:28500,35978:31348,35979:32080,35980:34880,35981:35363,35982:26376,35983:20214,35984:20537,35985:20518,35986:20581,35987:20860,35988:21048,35989:21091,35990:21927,35991:22287,35992:22533,35993:23244,35994:24314,35995:25010,35996:25080,35997:25331,35998:25458,35999:26908,36e3:27177,36001:29309,36002:29356,36003:29486,36004:30740,36005:30831,36006:32121,36007:30476,36008:32937,36009:35211,36010:35609,36011:36066,36012:36562,36013:36963,36014:37749,36015:38522,36016:38997,36017:39443,36018:40568,36019:20803,36020:21407,36021:21427,36022:24187,36023:24358,36024:28187,36025:28304,36026:29572,36027:29694,36028:32067,36029:33335,36030:35328,36031:35578,36032:38480,36033:20046,36034:20491,36035:21476,36036:21628,36037:22266,36038:22993,36039:23396,36040:24049,36041:24235,36042:24359,36043:25144,36044:25925,36045:26543,36046:28246,36047:29392,36048:31946,36049:34996,36050:32929,36051:32993,36052:33776,36053:34382,36054:35463,36055:36328,36056:37431,36057:38599,36058:39015,36059:40723,36060:20116,36061:20114,36062:20237,36063:21320,36064:21577,36065:21566,36066:23087,36067:24460,36068:24481,36069:24735,36070:26791,36071:27278,36072:29786,36073:30849,36074:35486,36075:35492,36076:35703,36077:37264,36078:20062,36079:39881,36080:20132,36081:20348,36082:20399,36083:20505,36084:20502,36085:20809,36086:20844,36087:21151,36088:21177,36089:21246,36090:21402,36091:21475,36092:21521,36160:21518,36161:21897,36162:22353,36163:22434,36164:22909,36165:23380,36166:23389,36167:23439,36168:24037,36169:24039,36170:24055,36171:24184,36172:24195,36173:24218,36174:24247,36175:24344,36176:24658,36177:24908,36178:25239,36179:25304,36180:25511,36181:25915,36182:26114,36183:26179,36184:26356,36185:26477,36186:26657,36187:26775,36188:27083,36189:27743,36190:27946,36191:28009,36192:28207,36193:28317,36194:30002,36195:30343,36196:30828,36197:31295,36198:31968,36199:32005,36200:32024,36201:32094,36202:32177,36203:32789,36204:32771,36205:32943,36206:32945,36207:33108,36208:33167,36209:33322,36210:33618,36211:34892,36212:34913,36213:35611,36214:36002,36215:36092,36216:37066,36217:37237,36218:37489,36219:30783,36220:37628,36221:38308,36222:38477,36224:38917,36225:39321,36226:39640,36227:40251,36228:21083,36229:21163,36230:21495,36231:21512,36232:22741,36233:25335,36234:28640,36235:35946,36236:36703,36237:40633,36238:20811,36239:21051,36240:21578,36241:22269,36242:31296,36243:37239,36244:40288,36245:40658,36246:29508,36247:28425,36248:33136,36249:29969,36250:24573,36251:24794,36252:39592,36253:29403,36254:36796,36255:27492,36256:38915,36257:20170,36258:22256,36259:22372,36260:22718,36261:23130,36262:24680,36263:25031,36264:26127,36265:26118,36266:26681,36267:26801,36268:28151,36269:30165,36270:32058,36271:33390,36272:39746,36273:20123,36274:20304,36275:21449,36276:21766,36277:23919,36278:24038,36279:24046,36280:26619,36281:27801,36282:29811,36283:30722,36284:35408,36285:37782,36286:35039,36287:22352,36288:24231,36289:25387,36290:20661,36291:20652,36292:20877,36293:26368,36294:21705,36295:22622,36296:22971,36297:23472,36298:24425,36299:25165,36300:25505,36301:26685,36302:27507,36303:28168,36304:28797,36305:37319,36306:29312,36307:30741,36308:30758,36309:31085,36310:25998,36311:32048,36312:33756,36313:35009,36314:36617,36315:38555,36316:21092,36317:22312,36318:26448,36319:32618,36320:36001,36321:20916,36322:22338,36323:38442,36324:22586,36325:27018,36326:32948,36327:21682,36328:23822,36329:22524,36330:30869,36331:40442,36332:20316,36333:21066,36334:21643,36335:25662,36336:26152,36337:26388,36338:26613,36339:31364,36340:31574,36341:32034,36342:37679,36343:26716,36344:39853,36345:31545,36346:21273,36347:20874,36348:21047,36416:23519,36417:25334,36418:25774,36419:25830,36420:26413,36421:27578,36422:34217,36423:38609,36424:30352,36425:39894,36426:25420,36427:37638,36428:39851,36429:30399,36430:26194,36431:19977,36432:20632,36433:21442,36434:23665,36435:24808,36436:25746,36437:25955,36438:26719,36439:29158,36440:29642,36441:29987,36442:31639,36443:32386,36444:34453,36445:35715,36446:36059,36447:37240,36448:39184,36449:26028,36450:26283,36451:27531,36452:20181,36453:20180,36454:20282,36455:20351,36456:21050,36457:21496,36458:21490,36459:21987,36460:22235,36461:22763,36462:22987,36463:22985,36464:23039,36465:23376,36466:23629,36467:24066,36468:24107,36469:24535,36470:24605,36471:25351,36472:25903,36473:23388,36474:26031,36475:26045,36476:26088,36477:26525,36478:27490,36480:27515,36481:27663,36482:29509,36483:31049,36484:31169,36485:31992,36486:32025,36487:32043,36488:32930,36489:33026,36490:33267,36491:35222,36492:35422,36493:35433,36494:35430,36495:35468,36496:35566,36497:36039,36498:36060,36499:38604,36500:39164,36501:27503,36502:20107,36503:20284,36504:20365,36505:20816,36506:23383,36507:23546,36508:24904,36509:25345,36510:26178,36511:27425,36512:28363,36513:27835,36514:29246,36515:29885,36516:30164,36517:30913,36518:31034,36519:32780,36520:32819,36521:33258,36522:33940,36523:36766,36524:27728,36525:40575,36526:24335,36527:35672,36528:40235,36529:31482,36530:36600,36531:23437,36532:38635,36533:19971,36534:21489,36535:22519,36536:22833,36537:23241,36538:23460,36539:24713,36540:28287,36541:28422,36542:30142,36543:36074,36544:23455,36545:34048,36546:31712,36547:20594,36548:26612,36549:33437,36550:23649,36551:34122,36552:32286,36553:33294,36554:20889,36555:23556,36556:25448,36557:36198,36558:26012,36559:29038,36560:31038,36561:32023,36562:32773,36563:35613,36564:36554,36565:36974,36566:34503,36567:37034,36568:20511,36569:21242,36570:23610,36571:26451,36572:28796,36573:29237,36574:37196,36575:37320,36576:37675,36577:33509,36578:23490,36579:24369,36580:24825,36581:20027,36582:21462,36583:23432,36584:25163,36585:26417,36586:27530,36587:29417,36588:29664,36589:31278,36590:33131,36591:36259,36592:37202,36593:39318,36594:20754,36595:21463,36596:21610,36597:23551,36598:25480,36599:27193,36600:32172,36601:38656,36602:22234,36603:21454,36604:21608,36672:23447,36673:23601,36674:24030,36675:20462,36676:24833,36677:25342,36678:27954,36679:31168,36680:31179,36681:32066,36682:32333,36683:32722,36684:33261,36685:33311,36686:33936,36687:34886,36688:35186,36689:35728,36690:36468,36691:36655,36692:36913,36693:37195,36694:37228,36695:38598,36696:37276,36697:20160,36698:20303,36699:20805,36700:21313,36701:24467,36702:25102,36703:26580,36704:27713,36705:28171,36706:29539,36707:32294,36708:37325,36709:37507,36710:21460,36711:22809,36712:23487,36713:28113,36714:31069,36715:32302,36716:31899,36717:22654,36718:29087,36719:20986,36720:34899,36721:36848,36722:20426,36723:23803,36724:26149,36725:30636,36726:31459,36727:33308,36728:39423,36729:20934,36730:24490,36731:26092,36732:26991,36733:27529,36734:28147,36736:28310,36737:28516,36738:30462,36739:32020,36740:24033,36741:36981,36742:37255,36743:38918,36744:20966,36745:21021,36746:25152,36747:26257,36748:26329,36749:28186,36750:24246,36751:32210,36752:32626,36753:26360,36754:34223,36755:34295,36756:35576,36757:21161,36758:21465,36759:22899,36760:24207,36761:24464,36762:24661,36763:37604,36764:38500,36765:20663,36766:20767,36767:21213,36768:21280,36769:21319,36770:21484,36771:21736,36772:21830,36773:21809,36774:22039,36775:22888,36776:22974,36777:23100,36778:23477,36779:23558,36780:23567,36781:23569,36782:23578,36783:24196,36784:24202,36785:24288,36786:24432,36787:25215,36788:25220,36789:25307,36790:25484,36791:25463,36792:26119,36793:26124,36794:26157,36795:26230,36796:26494,36797:26786,36798:27167,36799:27189,36800:27836,36801:28040,36802:28169,36803:28248,36804:28988,36805:28966,36806:29031,36807:30151,36808:30465,36809:30813,36810:30977,36811:31077,36812:31216,36813:31456,36814:31505,36815:31911,36816:32057,36817:32918,36818:33750,36819:33931,36820:34121,36821:34909,36822:35059,36823:35359,36824:35388,36825:35412,36826:35443,36827:35937,36828:36062,36829:37284,36830:37478,36831:37758,36832:37912,36833:38556,36834:38808,36835:19978,36836:19976,36837:19998,36838:20055,36839:20887,36840:21104,36841:22478,36842:22580,36843:22732,36844:23330,36845:24120,36846:24773,36847:25854,36848:26465,36849:26454,36850:27972,36851:29366,36852:30067,36853:31331,36854:33976,36855:35698,36856:37304,36857:37664,36858:22065,36859:22516,36860:39166,36928:25325,36929:26893,36930:27542,36931:29165,36932:32340,36933:32887,36934:33394,36935:35302,36936:39135,36937:34645,36938:36785,36939:23611,36940:20280,36941:20449,36942:20405,36943:21767,36944:23072,36945:23517,36946:23529,36947:24515,36948:24910,36949:25391,36950:26032,36951:26187,36952:26862,36953:27035,36954:28024,36955:28145,36956:30003,36957:30137,36958:30495,36959:31070,36960:31206,36961:32051,36962:33251,36963:33455,36964:34218,36965:35242,36966:35386,36967:36523,36968:36763,36969:36914,36970:37341,36971:38663,36972:20154,36973:20161,36974:20995,36975:22645,36976:22764,36977:23563,36978:29978,36979:23613,36980:33102,36981:35338,36982:36805,36983:38499,36984:38765,36985:31525,36986:35535,36987:38920,36988:37218,36989:22259,36990:21416,36992:36887,36993:21561,36994:22402,36995:24101,36996:25512,36997:27700,36998:28810,36999:30561,37e3:31883,37001:32736,37002:34928,37003:36930,37004:37204,37005:37648,37006:37656,37007:38543,37008:29790,37009:39620,37010:23815,37011:23913,37012:25968,37013:26530,37014:36264,37015:38619,37016:25454,37017:26441,37018:26905,37019:33733,37020:38935,37021:38592,37022:35070,37023:28548,37024:25722,37025:23544,37026:19990,37027:28716,37028:30045,37029:26159,37030:20932,37031:21046,37032:21218,37033:22995,37034:24449,37035:24615,37036:25104,37037:25919,37038:25972,37039:26143,37040:26228,37041:26866,37042:26646,37043:27491,37044:28165,37045:29298,37046:29983,37047:30427,37048:31934,37049:32854,37050:22768,37051:35069,37052:35199,37053:35488,37054:35475,37055:35531,37056:36893,37057:37266,37058:38738,37059:38745,37060:25993,37061:31246,37062:33030,37063:38587,37064:24109,37065:24796,37066:25114,37067:26021,37068:26132,37069:26512,37070:30707,37071:31309,37072:31821,37073:32318,37074:33034,37075:36012,37076:36196,37077:36321,37078:36447,37079:30889,37080:20999,37081:25305,37082:25509,37083:25666,37084:25240,37085:35373,37086:31363,37087:31680,37088:35500,37089:38634,37090:32118,37091:33292,37092:34633,37093:20185,37094:20808,37095:21315,37096:21344,37097:23459,37098:23554,37099:23574,37100:24029,37101:25126,37102:25159,37103:25776,37104:26643,37105:26676,37106:27849,37107:27973,37108:27927,37109:26579,37110:28508,37111:29006,37112:29053,37113:26059,37114:31359,37115:31661,37116:32218,37184:32330,37185:32680,37186:33146,37187:33307,37188:33337,37189:34214,37190:35438,37191:36046,37192:36341,37193:36984,37194:36983,37195:37549,37196:37521,37197:38275,37198:39854,37199:21069,37200:21892,37201:28472,37202:28982,37203:20840,37204:31109,37205:32341,37206:33203,37207:31950,37208:22092,37209:22609,37210:23720,37211:25514,37212:26366,37213:26365,37214:26970,37215:29401,37216:30095,37217:30094,37218:30990,37219:31062,37220:31199,37221:31895,37222:32032,37223:32068,37224:34311,37225:35380,37226:38459,37227:36961,37228:40736,37229:20711,37230:21109,37231:21452,37232:21474,37233:20489,37234:21930,37235:22766,37236:22863,37237:29245,37238:23435,37239:23652,37240:21277,37241:24803,37242:24819,37243:25436,37244:25475,37245:25407,37246:25531,37248:25805,37249:26089,37250:26361,37251:24035,37252:27085,37253:27133,37254:28437,37255:29157,37256:20105,37257:30185,37258:30456,37259:31379,37260:31967,37261:32207,37262:32156,37263:32865,37264:33609,37265:33624,37266:33900,37267:33980,37268:34299,37269:35013,37270:36208,37271:36865,37272:36973,37273:37783,37274:38684,37275:39442,37276:20687,37277:22679,37278:24974,37279:33235,37280:34101,37281:36104,37282:36896,37283:20419,37284:20596,37285:21063,37286:21363,37287:24687,37288:25417,37289:26463,37290:28204,37291:36275,37292:36895,37293:20439,37294:23646,37295:36042,37296:26063,37297:32154,37298:21330,37299:34966,37300:20854,37301:25539,37302:23384,37303:23403,37304:23562,37305:25613,37306:26449,37307:36956,37308:20182,37309:22810,37310:22826,37311:27760,37312:35409,37313:21822,37314:22549,37315:22949,37316:24816,37317:25171,37318:26561,37319:33333,37320:26965,37321:38464,37322:39364,37323:39464,37324:20307,37325:22534,37326:23550,37327:32784,37328:23729,37329:24111,37330:24453,37331:24608,37332:24907,37333:25140,37334:26367,37335:27888,37336:28382,37337:32974,37338:33151,37339:33492,37340:34955,37341:36024,37342:36864,37343:36910,37344:38538,37345:40667,37346:39899,37347:20195,37348:21488,37349:22823,37350:31532,37351:37261,37352:38988,37353:40441,37354:28381,37355:28711,37356:21331,37357:21828,37358:23429,37359:25176,37360:25246,37361:25299,37362:27810,37363:28655,37364:29730,37365:35351,37366:37944,37367:28609,37368:35582,37369:33592,37370:20967,37371:34552,37372:21482,37440:21481,37441:20294,37442:36948,37443:36784,37444:22890,37445:33073,37446:24061,37447:31466,37448:36799,37449:26842,37450:35895,37451:29432,37452:40008,37453:27197,37454:35504,37455:20025,37456:21336,37457:22022,37458:22374,37459:25285,37460:25506,37461:26086,37462:27470,37463:28129,37464:28251,37465:28845,37466:30701,37467:31471,37468:31658,37469:32187,37470:32829,37471:32966,37472:34507,37473:35477,37474:37723,37475:22243,37476:22727,37477:24382,37478:26029,37479:26262,37480:27264,37481:27573,37482:30007,37483:35527,37484:20516,37485:30693,37486:22320,37487:24347,37488:24677,37489:26234,37490:27744,37491:30196,37492:31258,37493:32622,37494:33268,37495:34584,37496:36933,37497:39347,37498:31689,37499:30044,37500:31481,37501:31569,37502:33988,37504:36880,37505:31209,37506:31378,37507:33590,37508:23265,37509:30528,37510:20013,37511:20210,37512:23449,37513:24544,37514:25277,37515:26172,37516:26609,37517:27880,37518:34411,37519:34935,37520:35387,37521:37198,37522:37619,37523:39376,37524:27159,37525:28710,37526:29482,37527:33511,37528:33879,37529:36015,37530:19969,37531:20806,37532:20939,37533:21899,37534:23541,37535:24086,37536:24115,37537:24193,37538:24340,37539:24373,37540:24427,37541:24500,37542:25074,37543:25361,37544:26274,37545:26397,37546:28526,37547:29266,37548:30010,37549:30522,37550:32884,37551:33081,37552:33144,37553:34678,37554:35519,37555:35548,37556:36229,37557:36339,37558:37530,37559:38263,37560:38914,37561:40165,37562:21189,37563:25431,37564:30452,37565:26389,37566:27784,37567:29645,37568:36035,37569:37806,37570:38515,37571:27941,37572:22684,37573:26894,37574:27084,37575:36861,37576:37786,37577:30171,37578:36890,37579:22618,37580:26626,37581:25524,37582:27131,37583:20291,37584:28460,37585:26584,37586:36795,37587:34086,37588:32180,37589:37716,37590:26943,37591:28528,37592:22378,37593:22775,37594:23340,37595:32044,37596:29226,37597:21514,37598:37347,37599:40372,37600:20141,37601:20302,37602:20572,37603:20597,37604:21059,37605:35998,37606:21576,37607:22564,37608:23450,37609:24093,37610:24213,37611:24237,37612:24311,37613:24351,37614:24716,37615:25269,37616:25402,37617:25552,37618:26799,37619:27712,37620:30855,37621:31118,37622:31243,37623:32224,37624:33351,37625:35330,37626:35558,37627:36420,37628:36883,37696:37048,37697:37165,37698:37336,37699:40718,37700:27877,37701:25688,37702:25826,37703:25973,37704:28404,37705:30340,37706:31515,37707:36969,37708:37841,37709:28346,37710:21746,37711:24505,37712:25764,37713:36685,37714:36845,37715:37444,37716:20856,37717:22635,37718:22825,37719:23637,37720:24215,37721:28155,37722:32399,37723:29980,37724:36028,37725:36578,37726:39003,37727:28857,37728:20253,37729:27583,37730:28593,37731:3e4,37732:38651,37733:20814,37734:21520,37735:22581,37736:22615,37737:22956,37738:23648,37739:24466,37740:26007,37741:26460,37742:28193,37743:30331,37744:33759,37745:36077,37746:36884,37747:37117,37748:37709,37749:30757,37750:30778,37751:21162,37752:24230,37753:22303,37754:22900,37755:24594,37756:20498,37757:20826,37758:20908,37760:20941,37761:20992,37762:21776,37763:22612,37764:22616,37765:22871,37766:23445,37767:23798,37768:23947,37769:24764,37770:25237,37771:25645,37772:26481,37773:26691,37774:26812,37775:26847,37776:30423,37777:28120,37778:28271,37779:28059,37780:28783,37781:29128,37782:24403,37783:30168,37784:31095,37785:31561,37786:31572,37787:31570,37788:31958,37789:32113,37790:21040,37791:33891,37792:34153,37793:34276,37794:35342,37795:35588,37796:35910,37797:36367,37798:36867,37799:36879,37800:37913,37801:38518,37802:38957,37803:39472,37804:38360,37805:20685,37806:21205,37807:21516,37808:22530,37809:23566,37810:24999,37811:25758,37812:27934,37813:30643,37814:31461,37815:33012,37816:33796,37817:36947,37818:37509,37819:23776,37820:40199,37821:21311,37822:24471,37823:24499,37824:28060,37825:29305,37826:30563,37827:31167,37828:31716,37829:27602,37830:29420,37831:35501,37832:26627,37833:27233,37834:20984,37835:31361,37836:26932,37837:23626,37838:40182,37839:33515,37840:23493,37841:37193,37842:28702,37843:22136,37844:23663,37845:24775,37846:25958,37847:27788,37848:35930,37849:36929,37850:38931,37851:21585,37852:26311,37853:37389,37854:22856,37855:37027,37856:20869,37857:20045,37858:20970,37859:34201,37860:35598,37861:28760,37862:25466,37863:37707,37864:26978,37865:39348,37866:32260,37867:30071,37868:21335,37869:26976,37870:36575,37871:38627,37872:27741,37873:20108,37874:23612,37875:24336,37876:36841,37877:21250,37878:36049,37879:32905,37880:34425,37881:24319,37882:26085,37883:20083,37884:20837,37952:22914,37953:23615,37954:38894,37955:20219,37956:22922,37957:24525,37958:35469,37959:28641,37960:31152,37961:31074,37962:23527,37963:33905,37964:29483,37965:29105,37966:24180,37967:24565,37968:25467,37969:25754,37970:29123,37971:31896,37972:20035,37973:24316,37974:20043,37975:22492,37976:22178,37977:24745,37978:28611,37979:32013,37980:33021,37981:33075,37982:33215,37983:36786,37984:35223,37985:34468,37986:24052,37987:25226,37988:25773,37989:35207,37990:26487,37991:27874,37992:27966,37993:29750,37994:30772,37995:23110,37996:32629,37997:33453,37998:39340,37999:20467,38e3:24259,38001:25309,38002:25490,38003:25943,38004:26479,38005:30403,38006:29260,38007:32972,38008:32954,38009:36649,38010:37197,38011:20493,38012:22521,38013:23186,38014:26757,38016:26995,38017:29028,38018:29437,38019:36023,38020:22770,38021:36064,38022:38506,38023:36889,38024:34687,38025:31204,38026:30695,38027:33833,38028:20271,38029:21093,38030:21338,38031:25293,38032:26575,38033:27850,38034:30333,38035:31636,38036:31893,38037:33334,38038:34180,38039:36843,38040:26333,38041:28448,38042:29190,38043:32283,38044:33707,38045:39361,38046:40614,38047:20989,38048:31665,38049:30834,38050:31672,38051:32903,38052:31560,38053:27368,38054:24161,38055:32908,38056:30033,38057:30048,38058:20843,38059:37474,38060:28300,38061:30330,38062:37271,38063:39658,38064:20240,38065:32624,38066:25244,38067:31567,38068:38309,38069:40169,38070:22138,38071:22617,38072:34532,38073:38588,38074:20276,38075:21028,38076:21322,38077:21453,38078:21467,38079:24070,38080:25644,38081:26001,38082:26495,38083:27710,38084:27726,38085:29256,38086:29359,38087:29677,38088:30036,38089:32321,38090:33324,38091:34281,38092:36009,38093:31684,38094:37318,38095:29033,38096:38930,38097:39151,38098:25405,38099:26217,38100:30058,38101:30436,38102:30928,38103:34115,38104:34542,38105:21290,38106:21329,38107:21542,38108:22915,38109:24199,38110:24444,38111:24754,38112:25161,38113:25209,38114:25259,38115:26e3,38116:27604,38117:27852,38118:30130,38119:30382,38120:30865,38121:31192,38122:32203,38123:32631,38124:32933,38125:34987,38126:35513,38127:36027,38128:36991,38129:38750,38130:39131,38131:27147,38132:31800,38133:20633,38134:23614,38135:24494,38136:26503,38137:27608,38138:29749,38139:30473,38140:32654,38208:40763,38209:26570,38210:31255,38211:21305,38212:30091,38213:39661,38214:24422,38215:33181,38216:33777,38217:32920,38218:24380,38219:24517,38220:30050,38221:31558,38222:36924,38223:26727,38224:23019,38225:23195,38226:32016,38227:30334,38228:35628,38229:20469,38230:24426,38231:27161,38232:27703,38233:28418,38234:29922,38235:31080,38236:34920,38237:35413,38238:35961,38239:24287,38240:25551,38241:30149,38242:31186,38243:33495,38244:37672,38245:37618,38246:33948,38247:34541,38248:39981,38249:21697,38250:24428,38251:25996,38252:27996,38253:28693,38254:36007,38255:36051,38256:38971,38257:25935,38258:29942,38259:19981,38260:20184,38261:22496,38262:22827,38263:23142,38264:23500,38265:20904,38266:24067,38267:24220,38268:24598,38269:25206,38270:25975,38272:26023,38273:26222,38274:28014,38275:29238,38276:31526,38277:33104,38278:33178,38279:33433,38280:35676,38281:36e3,38282:36070,38283:36212,38284:38428,38285:38468,38286:20398,38287:25771,38288:27494,38289:33310,38290:33889,38291:34154,38292:37096,38293:23553,38294:26963,38295:39080,38296:33914,38297:34135,38298:20239,38299:21103,38300:24489,38301:24133,38302:26381,38303:31119,38304:33145,38305:35079,38306:35206,38307:28149,38308:24343,38309:25173,38310:27832,38311:20175,38312:29289,38313:39826,38314:20998,38315:21563,38316:22132,38317:22707,38318:24996,38319:25198,38320:28954,38321:22894,38322:31881,38323:31966,38324:32027,38325:38640,38326:25991,38327:32862,38328:19993,38329:20341,38330:20853,38331:22592,38332:24163,38333:24179,38334:24330,38335:26564,38336:20006,38337:34109,38338:38281,38339:38491,38340:31859,38341:38913,38342:20731,38343:22721,38344:30294,38345:30887,38346:21029,38347:30629,38348:34065,38349:31622,38350:20559,38351:22793,38352:29255,38353:31687,38354:32232,38355:36794,38356:36820,38357:36941,38358:20415,38359:21193,38360:23081,38361:24321,38362:38829,38363:20445,38364:33303,38365:37610,38366:22275,38367:25429,38368:27497,38369:29995,38370:35036,38371:36628,38372:31298,38373:21215,38374:22675,38375:24917,38376:25098,38377:26286,38378:27597,38379:31807,38380:33769,38381:20515,38382:20472,38383:21253,38384:21574,38385:22577,38386:22857,38387:23453,38388:23792,38389:23791,38390:23849,38391:24214,38392:25265,38393:25447,38394:25918,38395:26041,38396:26379,38464:27861,38465:27873,38466:28921,38467:30770,38468:32299,38469:32990,38470:33459,38471:33804,38472:34028,38473:34562,38474:35090,38475:35370,38476:35914,38477:37030,38478:37586,38479:39165,38480:40179,38481:40300,38482:20047,38483:20129,38484:20621,38485:21078,38486:22346,38487:22952,38488:24125,38489:24536,38490:24537,38491:25151,38492:26292,38493:26395,38494:26576,38495:26834,38496:20882,38497:32033,38498:32938,38499:33192,38500:35584,38501:35980,38502:36031,38503:37502,38504:38450,38505:21536,38506:38956,38507:21271,38508:20693,38509:21340,38510:22696,38511:25778,38512:26420,38513:29287,38514:30566,38515:31302,38516:37350,38517:21187,38518:27809,38519:27526,38520:22528,38521:24140,38522:22868,38523:26412,38524:32763,38525:20961,38526:30406,38528:25705,38529:30952,38530:39764,38531:40635,38532:22475,38533:22969,38534:26151,38535:26522,38536:27598,38537:21737,38538:27097,38539:24149,38540:33180,38541:26517,38542:39850,38543:26622,38544:40018,38545:26717,38546:20134,38547:20451,38548:21448,38549:25273,38550:26411,38551:27819,38552:36804,38553:20397,38554:32365,38555:40639,38556:19975,38557:24930,38558:28288,38559:28459,38560:34067,38561:21619,38562:26410,38563:39749,38564:24051,38565:31637,38566:23724,38567:23494,38568:34588,38569:28234,38570:34001,38571:31252,38572:33032,38573:22937,38574:31885,38575:27665,38576:30496,38577:21209,38578:22818,38579:28961,38580:29279,38581:30683,38582:38695,38583:40289,38584:26891,38585:23167,38586:23064,38587:20901,38588:21517,38589:21629,38590:26126,38591:30431,38592:36855,38593:37528,38594:40180,38595:23018,38596:29277,38597:28357,38598:20813,38599:26825,38600:32191,38601:32236,38602:38754,38603:40634,38604:25720,38605:27169,38606:33538,38607:22916,38608:23391,38609:27611,38610:29467,38611:30450,38612:32178,38613:32791,38614:33945,38615:20786,38616:26408,38617:40665,38618:30446,38619:26466,38620:21247,38621:39173,38622:23588,38623:25147,38624:31870,38625:36016,38626:21839,38627:24758,38628:32011,38629:38272,38630:21249,38631:20063,38632:20918,38633:22812,38634:29242,38635:32822,38636:37326,38637:24357,38638:30690,38639:21380,38640:24441,38641:32004,38642:34220,38643:35379,38644:36493,38645:38742,38646:26611,38647:34222,38648:37971,38649:24841,38650:24840,38651:27833,38652:30290,38720:35565,38721:36664,38722:21807,38723:20305,38724:20778,38725:21191,38726:21451,38727:23461,38728:24189,38729:24736,38730:24962,38731:25558,38732:26377,38733:26586,38734:28263,38735:28044,38736:29494,38737:29495,38738:30001,38739:31056,38740:35029,38741:35480,38742:36938,38743:37009,38744:37109,38745:38596,38746:34701,38747:22805,38748:20104,38749:20313,38750:19982,38751:35465,38752:36671,38753:38928,38754:20653,38755:24188,38756:22934,38757:23481,38758:24248,38759:25562,38760:25594,38761:25793,38762:26332,38763:26954,38764:27096,38765:27915,38766:28342,38767:29076,38768:29992,38769:31407,38770:32650,38771:32768,38772:33865,38773:33993,38774:35201,38775:35617,38776:36362,38777:36965,38778:38525,38779:39178,38780:24958,38781:25233,38782:27442,38784:27779,38785:28020,38786:32716,38787:32764,38788:28096,38789:32645,38790:34746,38791:35064,38792:26469,38793:33713,38794:38972,38795:38647,38796:27931,38797:32097,38798:33853,38799:37226,38800:20081,38801:21365,38802:23888,38803:27396,38804:28651,38805:34253,38806:34349,38807:35239,38808:21033,38809:21519,38810:23653,38811:26446,38812:26792,38813:29702,38814:29827,38815:30178,38816:35023,38817:35041,38818:37324,38819:38626,38820:38520,38821:24459,38822:29575,38823:31435,38824:33870,38825:25504,38826:30053,38827:21129,38828:27969,38829:28316,38830:29705,38831:30041,38832:30827,38833:31890,38834:38534,38835:31452,38836:40845,38837:20406,38838:24942,38839:26053,38840:34396,38841:20102,38842:20142,38843:20698,38844:20001,38845:20940,38846:23534,38847:26009,38848:26753,38849:28092,38850:29471,38851:30274,38852:30637,38853:31260,38854:31975,38855:33391,38856:35538,38857:36988,38858:37327,38859:38517,38860:38936,38861:21147,38862:32209,38863:20523,38864:21400,38865:26519,38866:28107,38867:29136,38868:29747,38869:33256,38870:36650,38871:38563,38872:40023,38873:40607,38874:29792,38875:22593,38876:28057,38877:32047,38878:39006,38879:20196,38880:20278,38881:20363,38882:20919,38883:21169,38884:23994,38885:24604,38886:29618,38887:31036,38888:33491,38889:37428,38890:38583,38891:38646,38892:38666,38893:40599,38894:40802,38895:26278,38896:27508,38897:21015,38898:21155,38899:28872,38900:35010,38901:24265,38902:24651,38903:24976,38904:28451,38905:29001,38906:31806,38907:32244,38908:32879,38976:34030,38977:36899,38978:37676,38979:21570,38980:39791,38981:27347,38982:28809,38983:36034,38984:36335,38985:38706,38986:21172,38987:23105,38988:24266,38989:24324,38990:26391,38991:27004,38992:27028,38993:28010,38994:28431,38995:29282,38996:29436,38997:31725,38998:32769,38999:32894,39e3:34635,39001:37070,39002:20845,39003:40595,39004:31108,39005:32907,39006:37682,39007:35542,39008:20525,39009:21644,39010:35441,39011:27498,39012:36036,39013:33031,39014:24785,39015:26528,39016:40434,39017:20121,39018:20120,39019:39952,39020:35435,39021:34241,39022:34152,39023:26880,39024:28286,39025:30871,39026:33109,39071:24332,39072:19984,39073:19989,39074:20010,39075:20017,39076:20022,39077:20028,39078:20031,39079:20034,39080:20054,39081:20056,39082:20098,39083:20101,39084:35947,39085:20106,39086:33298,39087:24333,39088:20110,39089:20126,39090:20127,39091:20128,39092:20130,39093:20144,39094:20147,39095:20150,39096:20174,39097:20173,39098:20164,39099:20166,39100:20162,39101:20183,39102:20190,39103:20205,39104:20191,39105:20215,39106:20233,39107:20314,39108:20272,39109:20315,39110:20317,39111:20311,39112:20295,39113:20342,39114:20360,39115:20367,39116:20376,39117:20347,39118:20329,39119:20336,39120:20369,39121:20335,39122:20358,39123:20374,39124:20760,39125:20436,39126:20447,39127:20430,39128:20440,39129:20443,39130:20433,39131:20442,39132:20432,39133:20452,39134:20453,39135:20506,39136:20520,39137:20500,39138:20522,39139:20517,39140:20485,39141:20252,39142:20470,39143:20513,39144:20521,39145:20524,39146:20478,39147:20463,39148:20497,39149:20486,39150:20547,39151:20551,39152:26371,39153:20565,39154:20560,39155:20552,39156:20570,39157:20566,39158:20588,39159:20600,39160:20608,39161:20634,39162:20613,39163:20660,39164:20658,39232:20681,39233:20682,39234:20659,39235:20674,39236:20694,39237:20702,39238:20709,39239:20717,39240:20707,39241:20718,39242:20729,39243:20725,39244:20745,39245:20737,39246:20738,39247:20758,39248:20757,39249:20756,39250:20762,39251:20769,39252:20794,39253:20791,39254:20796,39255:20795,39256:20799,39257:20800,39258:20818,39259:20812,39260:20820,39261:20834,39262:31480,39263:20841,39264:20842,39265:20846,39266:20864,39267:20866,39268:22232,39269:20876,39270:20873,39271:20879,39272:20881,39273:20883,39274:20885,39275:20886,39276:20900,39277:20902,39278:20898,39279:20905,39280:20906,39281:20907,39282:20915,39283:20913,39284:20914,39285:20912,39286:20917,39287:20925,39288:20933,39289:20937,39290:20955,39291:20960,39292:34389,39293:20969,39294:20973,39296:20976,39297:20981,39298:20990,39299:20996,39300:21003,39301:21012,39302:21006,39303:21031,39304:21034,39305:21038,39306:21043,39307:21049,39308:21071,39309:21060,39310:21067,39311:21068,39312:21086,39313:21076,39314:21098,39315:21108,39316:21097,39317:21107,39318:21119,39319:21117,39320:21133,39321:21140,39322:21138,39323:21105,39324:21128,39325:21137,39326:36776,39327:36775,39328:21164,39329:21165,39330:21180,39331:21173,39332:21185,39333:21197,39334:21207,39335:21214,39336:21219,39337:21222,39338:39149,39339:21216,39340:21235,39341:21237,39342:21240,39343:21241,39344:21254,39345:21256,39346:30008,39347:21261,39348:21264,39349:21263,39350:21269,39351:21274,39352:21283,39353:21295,39354:21297,39355:21299,39356:21304,39357:21312,39358:21318,39359:21317,39360:19991,39361:21321,39362:21325,39363:20950,39364:21342,39365:21353,39366:21358,39367:22808,39368:21371,39369:21367,39370:21378,39371:21398,39372:21408,39373:21414,39374:21413,39375:21422,39376:21424,39377:21430,39378:21443,39379:31762,39380:38617,39381:21471,39382:26364,39383:29166,39384:21486,39385:21480,39386:21485,39387:21498,39388:21505,39389:21565,39390:21568,39391:21548,39392:21549,39393:21564,39394:21550,39395:21558,39396:21545,39397:21533,39398:21582,39399:21647,39400:21621,39401:21646,39402:21599,39403:21617,39404:21623,39405:21616,39406:21650,39407:21627,39408:21632,39409:21622,39410:21636,39411:21648,39412:21638,39413:21703,39414:21666,39415:21688,39416:21669,39417:21676,39418:21700,39419:21704,39420:21672,39488:21675,39489:21698,39490:21668,39491:21694,39492:21692,39493:21720,39494:21733,39495:21734,39496:21775,39497:21780,39498:21757,39499:21742,39500:21741,39501:21754,39502:21730,39503:21817,39504:21824,39505:21859,39506:21836,39507:21806,39508:21852,39509:21829,39510:21846,39511:21847,39512:21816,39513:21811,39514:21853,39515:21913,39516:21888,39517:21679,39518:21898,39519:21919,39520:21883,39521:21886,39522:21912,39523:21918,39524:21934,39525:21884,39526:21891,39527:21929,39528:21895,39529:21928,39530:21978,39531:21957,39532:21983,39533:21956,39534:21980,39535:21988,39536:21972,39537:22036,39538:22007,39539:22038,39540:22014,39541:22013,39542:22043,39543:22009,39544:22094,39545:22096,39546:29151,39547:22068,39548:22070,39549:22066,39550:22072,39552:22123,39553:22116,39554:22063,39555:22124,39556:22122,39557:22150,39558:22144,39559:22154,39560:22176,39561:22164,39562:22159,39563:22181,39564:22190,39565:22198,39566:22196,39567:22210,39568:22204,39569:22209,39570:22211,39571:22208,39572:22216,39573:22222,39574:22225,39575:22227,39576:22231,39577:22254,39578:22265,39579:22272,39580:22271,39581:22276,39582:22281,39583:22280,39584:22283,39585:22285,39586:22291,39587:22296,39588:22294,39589:21959,39590:22300,39591:22310,39592:22327,39593:22328,39594:22350,39595:22331,39596:22336,39597:22351,39598:22377,39599:22464,39600:22408,39601:22369,39602:22399,39603:22409,39604:22419,39605:22432,39606:22451,39607:22436,39608:22442,39609:22448,39610:22467,39611:22470,39612:22484,39613:22482,39614:22483,39615:22538,39616:22486,39617:22499,39618:22539,39619:22553,39620:22557,39621:22642,39622:22561,39623:22626,39624:22603,39625:22640,39626:27584,39627:22610,39628:22589,39629:22649,39630:22661,39631:22713,39632:22687,39633:22699,39634:22714,39635:22750,39636:22715,39637:22712,39638:22702,39639:22725,39640:22739,39641:22737,39642:22743,39643:22745,39644:22744,39645:22757,39646:22748,39647:22756,39648:22751,39649:22767,39650:22778,39651:22777,39652:22779,39653:22780,39654:22781,39655:22786,39656:22794,39657:22800,39658:22811,39659:26790,39660:22821,39661:22828,39662:22829,39663:22834,39664:22840,39665:22846,39666:31442,39667:22869,39668:22864,39669:22862,39670:22874,39671:22872,39672:22882,39673:22880,39674:22887,39675:22892,39676:22889,39744:22904,39745:22913,39746:22941,39747:20318,39748:20395,39749:22947,39750:22962,39751:22982,39752:23016,39753:23004,39754:22925,39755:23001,39756:23002,39757:23077,39758:23071,39759:23057,39760:23068,39761:23049,39762:23066,39763:23104,39764:23148,39765:23113,39766:23093,39767:23094,39768:23138,39769:23146,39770:23194,39771:23228,39772:23230,39773:23243,39774:23234,39775:23229,39776:23267,39777:23255,39778:23270,39779:23273,39780:23254,39781:23290,39782:23291,39783:23308,39784:23307,39785:23318,39786:23346,39787:23248,39788:23338,39789:23350,39790:23358,39791:23363,39792:23365,39793:23360,39794:23377,39795:23381,39796:23386,39797:23387,39798:23397,39799:23401,39800:23408,39801:23411,39802:23413,39803:23416,39804:25992,39805:23418,39806:23424,39808:23427,39809:23462,39810:23480,39811:23491,39812:23495,39813:23497,39814:23508,39815:23504,39816:23524,39817:23526,39818:23522,39819:23518,39820:23525,39821:23531,39822:23536,39823:23542,39824:23539,39825:23557,39826:23559,39827:23560,39828:23565,39829:23571,39830:23584,39831:23586,39832:23592,39833:23608,39834:23609,39835:23617,39836:23622,39837:23630,39838:23635,39839:23632,39840:23631,39841:23409,39842:23660,39843:23662,39844:20066,39845:23670,39846:23673,39847:23692,39848:23697,39849:23700,39850:22939,39851:23723,39852:23739,39853:23734,39854:23740,39855:23735,39856:23749,39857:23742,39858:23751,39859:23769,39860:23785,39861:23805,39862:23802,39863:23789,39864:23948,39865:23786,39866:23819,39867:23829,39868:23831,39869:23900,39870:23839,39871:23835,39872:23825,39873:23828,39874:23842,39875:23834,39876:23833,39877:23832,39878:23884,39879:23890,39880:23886,39881:23883,39882:23916,39883:23923,39884:23926,39885:23943,39886:23940,39887:23938,39888:23970,39889:23965,39890:23980,39891:23982,39892:23997,39893:23952,39894:23991,39895:23996,39896:24009,39897:24013,39898:24019,39899:24018,39900:24022,39901:24027,39902:24043,39903:24050,39904:24053,39905:24075,39906:24090,39907:24089,39908:24081,39909:24091,39910:24118,39911:24119,39912:24132,39913:24131,39914:24128,39915:24142,39916:24151,39917:24148,39918:24159,39919:24162,39920:24164,39921:24135,39922:24181,39923:24182,39924:24186,39925:40636,39926:24191,39927:24224,39928:24257,39929:24258,39930:24264,39931:24272,39932:24271,4e4:24278,40001:24291,40002:24285,40003:24282,40004:24283,40005:24290,40006:24289,40007:24296,40008:24297,40009:24300,40010:24305,40011:24307,40012:24304,40013:24308,40014:24312,40015:24318,40016:24323,40017:24329,40018:24413,40019:24412,40020:24331,40021:24337,40022:24342,40023:24361,40024:24365,40025:24376,40026:24385,40027:24392,40028:24396,40029:24398,40030:24367,40031:24401,40032:24406,40033:24407,40034:24409,40035:24417,40036:24429,40037:24435,40038:24439,40039:24451,40040:24450,40041:24447,40042:24458,40043:24456,40044:24465,40045:24455,40046:24478,40047:24473,40048:24472,40049:24480,40050:24488,40051:24493,40052:24508,40053:24534,40054:24571,40055:24548,40056:24568,40057:24561,40058:24541,40059:24755,40060:24575,40061:24609,40062:24672,40064:24601,40065:24592,40066:24617,40067:24590,40068:24625,40069:24603,40070:24597,40071:24619,40072:24614,40073:24591,40074:24634,40075:24666,40076:24641,40077:24682,40078:24695,40079:24671,40080:24650,40081:24646,40082:24653,40083:24675,40084:24643,40085:24676,40086:24642,40087:24684,40088:24683,40089:24665,40090:24705,40091:24717,40092:24807,40093:24707,40094:24730,40095:24708,40096:24731,40097:24726,40098:24727,40099:24722,40100:24743,40101:24715,40102:24801,40103:24760,40104:24800,40105:24787,40106:24756,40107:24560,40108:24765,40109:24774,40110:24757,40111:24792,40112:24909,40113:24853,40114:24838,40115:24822,40116:24823,40117:24832,40118:24820,40119:24826,40120:24835,40121:24865,40122:24827,40123:24817,40124:24845,40125:24846,40126:24903,40127:24894,40128:24872,40129:24871,40130:24906,40131:24895,40132:24892,40133:24876,40134:24884,40135:24893,40136:24898,40137:24900,40138:24947,40139:24951,40140:24920,40141:24921,40142:24922,40143:24939,40144:24948,40145:24943,40146:24933,40147:24945,40148:24927,40149:24925,40150:24915,40151:24949,40152:24985,40153:24982,40154:24967,40155:25004,40156:24980,40157:24986,40158:24970,40159:24977,40160:25003,40161:25006,40162:25036,40163:25034,40164:25033,40165:25079,40166:25032,40167:25027,40168:25030,40169:25018,40170:25035,40171:32633,40172:25037,40173:25062,40174:25059,40175:25078,40176:25082,40177:25076,40178:25087,40179:25085,40180:25084,40181:25086,40182:25088,40183:25096,40184:25097,40185:25101,40186:25100,40187:25108,40188:25115,40256:25118,40257:25121,40258:25130,40259:25134,40260:25136,40261:25138,40262:25139,40263:25153,40264:25166,40265:25182,40266:25187,40267:25179,40268:25184,40269:25192,40270:25212,40271:25218,40272:25225,40273:25214,40274:25234,40275:25235,40276:25238,40277:25300,40278:25219,40279:25236,40280:25303,40281:25297,40282:25275,40283:25295,40284:25343,40285:25286,40286:25812,40287:25288,40288:25308,40289:25292,40290:25290,40291:25282,40292:25287,40293:25243,40294:25289,40295:25356,40296:25326,40297:25329,40298:25383,40299:25346,40300:25352,40301:25327,40302:25333,40303:25424,40304:25406,40305:25421,40306:25628,40307:25423,40308:25494,40309:25486,40310:25472,40311:25515,40312:25462,40313:25507,40314:25487,40315:25481,40316:25503,40317:25525,40318:25451,40320:25449,40321:25534,40322:25577,40323:25536,40324:25542,40325:25571,40326:25545,40327:25554,40328:25590,40329:25540,40330:25622,40331:25652,40332:25606,40333:25619,40334:25638,40335:25654,40336:25885,40337:25623,40338:25640,40339:25615,40340:25703,40341:25711,40342:25718,40343:25678,40344:25898,40345:25749,40346:25747,40347:25765,40348:25769,40349:25736,40350:25788,40351:25818,40352:25810,40353:25797,40354:25799,40355:25787,40356:25816,40357:25794,40358:25841,40359:25831,40360:33289,40361:25824,40362:25825,40363:25260,40364:25827,40365:25839,40366:25900,40367:25846,40368:25844,40369:25842,40370:25850,40371:25856,40372:25853,40373:25880,40374:25884,40375:25861,40376:25892,40377:25891,40378:25899,40379:25908,40380:25909,40381:25911,40382:25910,40383:25912,40384:30027,40385:25928,40386:25942,40387:25941,40388:25933,40389:25944,40390:25950,40391:25949,40392:25970,40393:25976,40394:25986,40395:25987,40396:35722,40397:26011,40398:26015,40399:26027,40400:26039,40401:26051,40402:26054,40403:26049,40404:26052,40405:26060,40406:26066,40407:26075,40408:26073,40409:26080,40410:26081,40411:26097,40412:26482,40413:26122,40414:26115,40415:26107,40416:26483,40417:26165,40418:26166,40419:26164,40420:26140,40421:26191,40422:26180,40423:26185,40424:26177,40425:26206,40426:26205,40427:26212,40428:26215,40429:26216,40430:26207,40431:26210,40432:26224,40433:26243,40434:26248,40435:26254,40436:26249,40437:26244,40438:26264,40439:26269,40440:26305,40441:26297,40442:26313,40443:26302,40444:26300,40512:26308,40513:26296,40514:26326,40515:26330,40516:26336,40517:26175,40518:26342,40519:26345,40520:26352,40521:26357,40522:26359,40523:26383,40524:26390,40525:26398,40526:26406,40527:26407,40528:38712,40529:26414,40530:26431,40531:26422,40532:26433,40533:26424,40534:26423,40535:26438,40536:26462,40537:26464,40538:26457,40539:26467,40540:26468,40541:26505,40542:26480,40543:26537,40544:26492,40545:26474,40546:26508,40547:26507,40548:26534,40549:26529,40550:26501,40551:26551,40552:26607,40553:26548,40554:26604,40555:26547,40556:26601,40557:26552,40558:26596,40559:26590,40560:26589,40561:26594,40562:26606,40563:26553,40564:26574,40565:26566,40566:26599,40567:27292,40568:26654,40569:26694,40570:26665,40571:26688,40572:26701,40573:26674,40574:26702,40576:26803,40577:26667,40578:26713,40579:26723,40580:26743,40581:26751,40582:26783,40583:26767,40584:26797,40585:26772,40586:26781,40587:26779,40588:26755,40589:27310,40590:26809,40591:26740,40592:26805,40593:26784,40594:26810,40595:26895,40596:26765,40597:26750,40598:26881,40599:26826,40600:26888,40601:26840,40602:26914,40603:26918,40604:26849,40605:26892,40606:26829,40607:26836,40608:26855,40609:26837,40610:26934,40611:26898,40612:26884,40613:26839,40614:26851,40615:26917,40616:26873,40617:26848,40618:26863,40619:26920,40620:26922,40621:26906,40622:26915,40623:26913,40624:26822,40625:27001,40626:26999,40627:26972,40628:27e3,40629:26987,40630:26964,40631:27006,40632:26990,40633:26937,40634:26996,40635:26941,40636:26969,40637:26928,40638:26977,40639:26974,40640:26973,40641:27009,40642:26986,40643:27058,40644:27054,40645:27088,40646:27071,40647:27073,40648:27091,40649:27070,40650:27086,40651:23528,40652:27082,40653:27101,40654:27067,40655:27075,40656:27047,40657:27182,40658:27025,40659:27040,40660:27036,40661:27029,40662:27060,40663:27102,40664:27112,40665:27138,40666:27163,40667:27135,40668:27402,40669:27129,40670:27122,40671:27111,40672:27141,40673:27057,40674:27166,40675:27117,40676:27156,40677:27115,40678:27146,40679:27154,40680:27329,40681:27171,40682:27155,40683:27204,40684:27148,40685:27250,40686:27190,40687:27256,40688:27207,40689:27234,40690:27225,40691:27238,40692:27208,40693:27192,40694:27170,40695:27280,40696:27277,40697:27296,40698:27268,40699:27298,40700:27299,40768:27287,40769:34327,40770:27323,40771:27331,40772:27330,40773:27320,40774:27315,40775:27308,40776:27358,40777:27345,40778:27359,40779:27306,40780:27354,40781:27370,40782:27387,40783:27397,40784:34326,40785:27386,40786:27410,40787:27414,40788:39729,40789:27423,40790:27448,40791:27447,40792:30428,40793:27449,40794:39150,40795:27463,40796:27459,40797:27465,40798:27472,40799:27481,40800:27476,40801:27483,40802:27487,40803:27489,40804:27512,40805:27513,40806:27519,40807:27520,40808:27524,40809:27523,40810:27533,40811:27544,40812:27541,40813:27550,40814:27556,40815:27562,40816:27563,40817:27567,40818:27570,40819:27569,40820:27571,40821:27575,40822:27580,40823:27590,40824:27595,40825:27603,40826:27615,40827:27628,40828:27627,40829:27635,40830:27631,40832:40638,40833:27656,40834:27667,40835:27668,40836:27675,40837:27684,40838:27683,40839:27742,40840:27733,40841:27746,40842:27754,40843:27778,40844:27789,40845:27802,40846:27777,40847:27803,40848:27774,40849:27752,40850:27763,40851:27794,40852:27792,40853:27844,40854:27889,40855:27859,40856:27837,40857:27863,40858:27845,40859:27869,40860:27822,40861:27825,40862:27838,40863:27834,40864:27867,40865:27887,40866:27865,40867:27882,40868:27935,40869:34893,40870:27958,40871:27947,40872:27965,40873:27960,40874:27929,40875:27957,40876:27955,40877:27922,40878:27916,40879:28003,40880:28051,40881:28004,40882:27994,40883:28025,40884:27993,40885:28046,40886:28053,40887:28644,40888:28037,40889:28153,40890:28181,40891:28170,40892:28085,40893:28103,40894:28134,40895:28088,40896:28102,40897:28140,40898:28126,40899:28108,40900:28136,40901:28114,40902:28101,40903:28154,40904:28121,40905:28132,40906:28117,40907:28138,40908:28142,40909:28205,40910:28270,40911:28206,40912:28185,40913:28274,40914:28255,40915:28222,40916:28195,40917:28267,40918:28203,40919:28278,40920:28237,40921:28191,40922:28227,40923:28218,40924:28238,40925:28196,40926:28415,40927:28189,40928:28216,40929:28290,40930:28330,40931:28312,40932:28361,40933:28343,40934:28371,40935:28349,40936:28335,40937:28356,40938:28338,40939:28372,40940:28373,40941:28303,40942:28325,40943:28354,40944:28319,40945:28481,40946:28433,40947:28748,40948:28396,40949:28408,40950:28414,40951:28479,40952:28402,40953:28465,40954:28399,40955:28466,40956:28364,161:65377,162:65378,163:65379,164:65380,165:65381,166:65382,167:65383,168:65384,169:65385,170:65386,171:65387,172:65388,173:65389,174:65390,175:65391,176:65392,177:65393,178:65394,179:65395,180:65396,181:65397,182:65398,183:65399,184:65400,185:65401,186:65402,187:65403,188:65404,189:65405,190:65406,191:65407,192:65408,193:65409,194:65410,195:65411,196:65412,197:65413,198:65414,199:65415,200:65416,201:65417,202:65418,203:65419,204:65420,205:65421,206:65422,207:65423,208:65424,209:65425,210:65426,211:65427,212:65428,213:65429,214:65430,215:65431,216:65432,217:65433,218:65434,219:65435,220:65436,221:65437,222:65438,223:65439,57408:28478,57409:28435,57410:28407,57411:28550,57412:28538,57413:28536,57414:28545,57415:28544,57416:28527,57417:28507,57418:28659,57419:28525,57420:28546,57421:28540,57422:28504,57423:28558,57424:28561,57425:28610,57426:28518,57427:28595,57428:28579,57429:28577,57430:28580,57431:28601,57432:28614,57433:28586,57434:28639,57435:28629,57436:28652,57437:28628,57438:28632,57439:28657,57440:28654,57441:28635,57442:28681,57443:28683,57444:28666,57445:28689,57446:28673,57447:28687,57448:28670,57449:28699,57450:28698,57451:28532,57452:28701,57453:28696,57454:28703,57455:28720,57456:28734,57457:28722,57458:28753,57459:28771,57460:28825,57461:28818,57462:28847,57463:28913,57464:28844,57465:28856,57466:28851,57467:28846,57468:28895,57469:28875,57470:28893,57472:28889,57473:28937,57474:28925,57475:28956,57476:28953,57477:29029,57478:29013,57479:29064,57480:29030,57481:29026,57482:29004,57483:29014,57484:29036,57485:29071,57486:29179,57487:29060,57488:29077,57489:29096,57490:29100,57491:29143,57492:29113,57493:29118,57494:29138,57495:29129,57496:29140,57497:29134,57498:29152,57499:29164,57500:29159,57501:29173,57502:29180,57503:29177,57504:29183,57505:29197,57506:29200,57507:29211,57508:29224,57509:29229,57510:29228,57511:29232,57512:29234,57513:29243,57514:29244,57515:29247,57516:29248,57517:29254,57518:29259,57519:29272,57520:29300,57521:29310,57522:29314,57523:29313,57524:29319,57525:29330,57526:29334,57527:29346,57528:29351,57529:29369,57530:29362,57531:29379,57532:29382,57533:29380,57534:29390,57535:29394,57536:29410,57537:29408,57538:29409,57539:29433,57540:29431,57541:20495,57542:29463,57543:29450,57544:29468,57545:29462,57546:29469,57547:29492,57548:29487,57549:29481,57550:29477,57551:29502,57552:29518,57553:29519,57554:40664,57555:29527,57556:29546,57557:29544,57558:29552,57559:29560,57560:29557,57561:29563,57562:29562,57563:29640,57564:29619,57565:29646,57566:29627,57567:29632,57568:29669,57569:29678,57570:29662,57571:29858,57572:29701,57573:29807,57574:29733,57575:29688,57576:29746,57577:29754,57578:29781,57579:29759,57580:29791,57581:29785,57582:29761,57583:29788,57584:29801,57585:29808,57586:29795,57587:29802,57588:29814,57589:29822,57590:29835,57591:29854,57592:29863,57593:29898,57594:29903,57595:29908,57596:29681,57664:29920,57665:29923,57666:29927,57667:29929,57668:29934,57669:29938,57670:29936,57671:29937,57672:29944,57673:29943,57674:29956,57675:29955,57676:29957,57677:29964,57678:29966,57679:29965,57680:29973,57681:29971,57682:29982,57683:29990,57684:29996,57685:30012,57686:30020,57687:30029,57688:30026,57689:30025,57690:30043,57691:30022,57692:30042,57693:30057,57694:30052,57695:30055,57696:30059,57697:30061,57698:30072,57699:30070,57700:30086,57701:30087,57702:30068,57703:30090,57704:30089,57705:30082,57706:30100,57707:30106,57708:30109,57709:30117,57710:30115,57711:30146,57712:30131,57713:30147,57714:30133,57715:30141,57716:30136,57717:30140,57718:30129,57719:30157,57720:30154,57721:30162,57722:30169,57723:30179,57724:30174,57725:30206,57726:30207,57728:30204,57729:30209,57730:30192,57731:30202,57732:30194,57733:30195,57734:30219,57735:30221,57736:30217,57737:30239,57738:30247,57739:30240,57740:30241,57741:30242,57742:30244,57743:30260,57744:30256,57745:30267,57746:30279,57747:30280,57748:30278,57749:30300,57750:30296,57751:30305,57752:30306,57753:30312,57754:30313,57755:30314,57756:30311,57757:30316,57758:30320,57759:30322,57760:30326,57761:30328,57762:30332,57763:30336,57764:30339,57765:30344,57766:30347,57767:30350,57768:30358,57769:30355,57770:30361,57771:30362,57772:30384,57773:30388,57774:30392,57775:30393,57776:30394,57777:30402,57778:30413,57779:30422,57780:30418,57781:30430,57782:30433,57783:30437,57784:30439,57785:30442,57786:34351,57787:30459,57788:30472,57789:30471,57790:30468,57791:30505,57792:30500,57793:30494,57794:30501,57795:30502,57796:30491,57797:30519,57798:30520,57799:30535,57800:30554,57801:30568,57802:30571,57803:30555,57804:30565,57805:30591,57806:30590,57807:30585,57808:30606,57809:30603,57810:30609,57811:30624,57812:30622,57813:30640,57814:30646,57815:30649,57816:30655,57817:30652,57818:30653,57819:30651,57820:30663,57821:30669,57822:30679,57823:30682,57824:30684,57825:30691,57826:30702,57827:30716,57828:30732,57829:30738,57830:31014,57831:30752,57832:31018,57833:30789,57834:30862,57835:30836,57836:30854,57837:30844,57838:30874,57839:30860,57840:30883,57841:30901,57842:30890,57843:30895,57844:30929,57845:30918,57846:30923,57847:30932,57848:30910,57849:30908,57850:30917,57851:30922,57852:30956,57920:30951,57921:30938,57922:30973,57923:30964,57924:30983,57925:30994,57926:30993,57927:31001,57928:31020,57929:31019,57930:31040,57931:31072,57932:31063,57933:31071,57934:31066,57935:31061,57936:31059,57937:31098,57938:31103,57939:31114,57940:31133,57941:31143,57942:40779,57943:31146,57944:31150,57945:31155,57946:31161,57947:31162,57948:31177,57949:31189,57950:31207,57951:31212,57952:31201,57953:31203,57954:31240,57955:31245,57956:31256,57957:31257,57958:31264,57959:31263,57960:31104,57961:31281,57962:31291,57963:31294,57964:31287,57965:31299,57966:31319,57967:31305,57968:31329,57969:31330,57970:31337,57971:40861,57972:31344,57973:31353,57974:31357,57975:31368,57976:31383,57977:31381,57978:31384,57979:31382,57980:31401,57981:31432,57982:31408,57984:31414,57985:31429,57986:31428,57987:31423,57988:36995,57989:31431,57990:31434,57991:31437,57992:31439,57993:31445,57994:31443,57995:31449,57996:31450,57997:31453,57998:31457,57999:31458,58e3:31462,58001:31469,58002:31472,58003:31490,58004:31503,58005:31498,58006:31494,58007:31539,58008:31512,58009:31513,58010:31518,58011:31541,58012:31528,58013:31542,58014:31568,58015:31610,58016:31492,58017:31565,58018:31499,58019:31564,58020:31557,58021:31605,58022:31589,58023:31604,58024:31591,58025:31600,58026:31601,58027:31596,58028:31598,58029:31645,58030:31640,58031:31647,58032:31629,58033:31644,58034:31642,58035:31627,58036:31634,58037:31631,58038:31581,58039:31641,58040:31691,58041:31681,58042:31692,58043:31695,58044:31668,58045:31686,58046:31709,58047:31721,58048:31761,58049:31764,58050:31718,58051:31717,58052:31840,58053:31744,58054:31751,58055:31763,58056:31731,58057:31735,58058:31767,58059:31757,58060:31734,58061:31779,58062:31783,58063:31786,58064:31775,58065:31799,58066:31787,58067:31805,58068:31820,58069:31811,58070:31828,58071:31823,58072:31808,58073:31824,58074:31832,58075:31839,58076:31844,58077:31830,58078:31845,58079:31852,58080:31861,58081:31875,58082:31888,58083:31908,58084:31917,58085:31906,58086:31915,58087:31905,58088:31912,58089:31923,58090:31922,58091:31921,58092:31918,58093:31929,58094:31933,58095:31936,58096:31941,58097:31938,58098:31960,58099:31954,58100:31964,58101:31970,58102:39739,58103:31983,58104:31986,58105:31988,58106:31990,58107:31994,58108:32006,58176:32002,58177:32028,58178:32021,58179:32010,58180:32069,58181:32075,58182:32046,58183:32050,58184:32063,58185:32053,58186:32070,58187:32115,58188:32086,58189:32078,58190:32114,58191:32104,58192:32110,58193:32079,58194:32099,58195:32147,58196:32137,58197:32091,58198:32143,58199:32125,58200:32155,58201:32186,58202:32174,58203:32163,58204:32181,58205:32199,58206:32189,58207:32171,58208:32317,58209:32162,58210:32175,58211:32220,58212:32184,58213:32159,58214:32176,58215:32216,58216:32221,58217:32228,58218:32222,58219:32251,58220:32242,58221:32225,58222:32261,58223:32266,58224:32291,58225:32289,58226:32274,58227:32305,58228:32287,58229:32265,58230:32267,58231:32290,58232:32326,58233:32358,58234:32315,58235:32309,58236:32313,58237:32323,58238:32311,58240:32306,58241:32314,58242:32359,58243:32349,58244:32342,58245:32350,58246:32345,58247:32346,58248:32377,58249:32362,58250:32361,58251:32380,58252:32379,58253:32387,58254:32213,58255:32381,58256:36782,58257:32383,58258:32392,58259:32393,58260:32396,58261:32402,58262:32400,58263:32403,58264:32404,58265:32406,58266:32398,58267:32411,58268:32412,58269:32568,58270:32570,58271:32581,58272:32588,58273:32589,58274:32590,58275:32592,58276:32593,58277:32597,58278:32596,58279:32600,58280:32607,58281:32608,58282:32616,58283:32617,58284:32615,58285:32632,58286:32642,58287:32646,58288:32643,58289:32648,58290:32647,58291:32652,58292:32660,58293:32670,58294:32669,58295:32666,58296:32675,58297:32687,58298:32690,58299:32697,58300:32686,58301:32694,58302:32696,58303:35697,58304:32709,58305:32710,58306:32714,58307:32725,58308:32724,58309:32737,58310:32742,58311:32745,58312:32755,58313:32761,58314:39132,58315:32774,58316:32772,58317:32779,58318:32786,58319:32792,58320:32793,58321:32796,58322:32801,58323:32808,58324:32831,58325:32827,58326:32842,58327:32838,58328:32850,58329:32856,58330:32858,58331:32863,58332:32866,58333:32872,58334:32883,58335:32882,58336:32880,58337:32886,58338:32889,58339:32893,58340:32895,58341:32900,58342:32902,58343:32901,58344:32923,58345:32915,58346:32922,58347:32941,58348:20880,58349:32940,58350:32987,58351:32997,58352:32985,58353:32989,58354:32964,58355:32986,58356:32982,58357:33033,58358:33007,58359:33009,58360:33051,58361:33065,58362:33059,58363:33071,58364:33099,58432:38539,58433:33094,58434:33086,58435:33107,58436:33105,58437:33020,58438:33137,58439:33134,58440:33125,58441:33126,58442:33140,58443:33155,58444:33160,58445:33162,58446:33152,58447:33154,58448:33184,58449:33173,58450:33188,58451:33187,58452:33119,58453:33171,58454:33193,58455:33200,58456:33205,58457:33214,58458:33208,58459:33213,58460:33216,58461:33218,58462:33210,58463:33225,58464:33229,58465:33233,58466:33241,58467:33240,58468:33224,58469:33242,58470:33247,58471:33248,58472:33255,58473:33274,58474:33275,58475:33278,58476:33281,58477:33282,58478:33285,58479:33287,58480:33290,58481:33293,58482:33296,58483:33302,58484:33321,58485:33323,58486:33336,58487:33331,58488:33344,58489:33369,58490:33368,58491:33373,58492:33370,58493:33375,58494:33380,58496:33378,58497:33384,58498:33386,58499:33387,58500:33326,58501:33393,58502:33399,58503:33400,58504:33406,58505:33421,58506:33426,58507:33451,58508:33439,58509:33467,58510:33452,58511:33505,58512:33507,58513:33503,58514:33490,58515:33524,58516:33523,58517:33530,58518:33683,58519:33539,58520:33531,58521:33529,58522:33502,58523:33542,58524:33500,58525:33545,58526:33497,58527:33589,58528:33588,58529:33558,58530:33586,58531:33585,58532:33600,58533:33593,58534:33616,58535:33605,58536:33583,58537:33579,58538:33559,58539:33560,58540:33669,58541:33690,58542:33706,58543:33695,58544:33698,58545:33686,58546:33571,58547:33678,58548:33671,58549:33674,58550:33660,58551:33717,58552:33651,58553:33653,58554:33696,58555:33673,58556:33704,58557:33780,58558:33811,58559:33771,58560:33742,58561:33789,58562:33795,58563:33752,58564:33803,58565:33729,58566:33783,58567:33799,58568:33760,58569:33778,58570:33805,58571:33826,58572:33824,58573:33725,58574:33848,58575:34054,58576:33787,58577:33901,58578:33834,58579:33852,58580:34138,58581:33924,58582:33911,58583:33899,58584:33965,58585:33902,58586:33922,58587:33897,58588:33862,58589:33836,58590:33903,58591:33913,58592:33845,58593:33994,58594:33890,58595:33977,58596:33983,58597:33951,58598:34009,58599:33997,58600:33979,58601:34010,58602:34e3,58603:33985,58604:33990,58605:34006,58606:33953,58607:34081,58608:34047,58609:34036,58610:34071,58611:34072,58612:34092,58613:34079,58614:34069,58615:34068,58616:34044,58617:34112,58618:34147,58619:34136,58620:34120,58688:34113,58689:34306,58690:34123,58691:34133,58692:34176,58693:34212,58694:34184,58695:34193,58696:34186,58697:34216,58698:34157,58699:34196,58700:34203,58701:34282,58702:34183,58703:34204,58704:34167,58705:34174,58706:34192,58707:34249,58708:34234,58709:34255,58710:34233,58711:34256,58712:34261,58713:34269,58714:34277,58715:34268,58716:34297,58717:34314,58718:34323,58719:34315,58720:34302,58721:34298,58722:34310,58723:34338,58724:34330,58725:34352,58726:34367,58727:34381,58728:20053,58729:34388,58730:34399,58731:34407,58732:34417,58733:34451,58734:34467,58735:34473,58736:34474,58737:34443,58738:34444,58739:34486,58740:34479,58741:34500,58742:34502,58743:34480,58744:34505,58745:34851,58746:34475,58747:34516,58748:34526,58749:34537,58750:34540,58752:34527,58753:34523,58754:34543,58755:34578,58756:34566,58757:34568,58758:34560,58759:34563,58760:34555,58761:34577,58762:34569,58763:34573,58764:34553,58765:34570,58766:34612,58767:34623,58768:34615,58769:34619,58770:34597,58771:34601,58772:34586,58773:34656,58774:34655,58775:34680,58776:34636,58777:34638,58778:34676,58779:34647,58780:34664,58781:34670,58782:34649,58783:34643,58784:34659,58785:34666,58786:34821,58787:34722,58788:34719,58789:34690,58790:34735,58791:34763,58792:34749,58793:34752,58794:34768,58795:38614,58796:34731,58797:34756,58798:34739,58799:34759,58800:34758,58801:34747,58802:34799,58803:34802,58804:34784,58805:34831,58806:34829,58807:34814,58808:34806,58809:34807,58810:34830,58811:34770,58812:34833,58813:34838,58814:34837,58815:34850,58816:34849,58817:34865,58818:34870,58819:34873,58820:34855,58821:34875,58822:34884,58823:34882,58824:34898,58825:34905,58826:34910,58827:34914,58828:34923,58829:34945,58830:34942,58831:34974,58832:34933,58833:34941,58834:34997,58835:34930,58836:34946,58837:34967,58838:34962,58839:34990,58840:34969,58841:34978,58842:34957,58843:34980,58844:34992,58845:35007,58846:34993,58847:35011,58848:35012,58849:35028,58850:35032,58851:35033,58852:35037,58853:35065,58854:35074,58855:35068,58856:35060,58857:35048,58858:35058,58859:35076,58860:35084,58861:35082,58862:35091,58863:35139,58864:35102,58865:35109,58866:35114,58867:35115,58868:35137,58869:35140,58870:35131,58871:35126,58872:35128,58873:35148,58874:35101,58875:35168,58876:35166,58944:35174,58945:35172,58946:35181,58947:35178,58948:35183,58949:35188,58950:35191,58951:35198,58952:35203,58953:35208,58954:35210,58955:35219,58956:35224,58957:35233,58958:35241,58959:35238,58960:35244,58961:35247,58962:35250,58963:35258,58964:35261,58965:35263,58966:35264,58967:35290,58968:35292,58969:35293,58970:35303,58971:35316,58972:35320,58973:35331,58974:35350,58975:35344,58976:35340,58977:35355,58978:35357,58979:35365,58980:35382,58981:35393,58982:35419,58983:35410,58984:35398,58985:35400,58986:35452,58987:35437,58988:35436,58989:35426,58990:35461,58991:35458,58992:35460,58993:35496,58994:35489,58995:35473,58996:35493,58997:35494,58998:35482,58999:35491,59e3:35524,59001:35533,59002:35522,59003:35546,59004:35563,59005:35571,59006:35559,59008:35556,59009:35569,59010:35604,59011:35552,59012:35554,59013:35575,59014:35550,59015:35547,59016:35596,59017:35591,59018:35610,59019:35553,59020:35606,59021:35600,59022:35607,59023:35616,59024:35635,59025:38827,59026:35622,59027:35627,59028:35646,59029:35624,59030:35649,59031:35660,59032:35663,59033:35662,59034:35657,59035:35670,59036:35675,59037:35674,59038:35691,59039:35679,59040:35692,59041:35695,59042:35700,59043:35709,59044:35712,59045:35724,59046:35726,59047:35730,59048:35731,59049:35734,59050:35737,59051:35738,59052:35898,59053:35905,59054:35903,59055:35912,59056:35916,59057:35918,59058:35920,59059:35925,59060:35938,59061:35948,59062:35960,59063:35962,59064:35970,59065:35977,59066:35973,59067:35978,59068:35981,59069:35982,59070:35988,59071:35964,59072:35992,59073:25117,59074:36013,59075:36010,59076:36029,59077:36018,59078:36019,59079:36014,59080:36022,59081:36040,59082:36033,59083:36068,59084:36067,59085:36058,59086:36093,59087:36090,59088:36091,59089:36100,59090:36101,59091:36106,59092:36103,59093:36111,59094:36109,59095:36112,59096:40782,59097:36115,59098:36045,59099:36116,59100:36118,59101:36199,59102:36205,59103:36209,59104:36211,59105:36225,59106:36249,59107:36290,59108:36286,59109:36282,59110:36303,59111:36314,59112:36310,59113:36300,59114:36315,59115:36299,59116:36330,59117:36331,59118:36319,59119:36323,59120:36348,59121:36360,59122:36361,59123:36351,59124:36381,59125:36382,59126:36368,59127:36383,59128:36418,59129:36405,59130:36400,59131:36404,59132:36426,59200:36423,59201:36425,59202:36428,59203:36432,59204:36424,59205:36441,59206:36452,59207:36448,59208:36394,59209:36451,59210:36437,59211:36470,59212:36466,59213:36476,59214:36481,59215:36487,59216:36485,59217:36484,59218:36491,59219:36490,59220:36499,59221:36497,59222:36500,59223:36505,59224:36522,59225:36513,59226:36524,59227:36528,59228:36550,59229:36529,59230:36542,59231:36549,59232:36552,59233:36555,59234:36571,59235:36579,59236:36604,59237:36603,59238:36587,59239:36606,59240:36618,59241:36613,59242:36629,59243:36626,59244:36633,59245:36627,59246:36636,59247:36639,59248:36635,59249:36620,59250:36646,59251:36659,59252:36667,59253:36665,59254:36677,59255:36674,59256:36670,59257:36684,59258:36681,59259:36678,59260:36686,59261:36695,59262:36700,59264:36706,59265:36707,59266:36708,59267:36764,59268:36767,59269:36771,59270:36781,59271:36783,59272:36791,59273:36826,59274:36837,59275:36834,59276:36842,59277:36847,59278:36999,59279:36852,59280:36869,59281:36857,59282:36858,59283:36881,59284:36885,59285:36897,59286:36877,59287:36894,59288:36886,59289:36875,59290:36903,59291:36918,59292:36917,59293:36921,59294:36856,59295:36943,59296:36944,59297:36945,59298:36946,59299:36878,59300:36937,59301:36926,59302:36950,59303:36952,59304:36958,59305:36968,59306:36975,59307:36982,59308:38568,59309:36978,59310:36994,59311:36989,59312:36993,59313:36992,59314:37002,59315:37001,59316:37007,59317:37032,59318:37039,59319:37041,59320:37045,59321:37090,59322:37092,59323:25160,59324:37083,59325:37122,59326:37138,59327:37145,59328:37170,59329:37168,59330:37194,59331:37206,59332:37208,59333:37219,59334:37221,59335:37225,59336:37235,59337:37234,59338:37259,59339:37257,59340:37250,59341:37282,59342:37291,59343:37295,59344:37290,59345:37301,59346:37300,59347:37306,59348:37312,59349:37313,59350:37321,59351:37323,59352:37328,59353:37334,59354:37343,59355:37345,59356:37339,59357:37372,59358:37365,59359:37366,59360:37406,59361:37375,59362:37396,59363:37420,59364:37397,59365:37393,59366:37470,59367:37463,59368:37445,59369:37449,59370:37476,59371:37448,59372:37525,59373:37439,59374:37451,59375:37456,59376:37532,59377:37526,59378:37523,59379:37531,59380:37466,59381:37583,59382:37561,59383:37559,59384:37609,59385:37647,59386:37626,59387:37700,59388:37678,59456:37657,59457:37666,59458:37658,59459:37667,59460:37690,59461:37685,59462:37691,59463:37724,59464:37728,59465:37756,59466:37742,59467:37718,59468:37808,59469:37804,59470:37805,59471:37780,59472:37817,59473:37846,59474:37847,59475:37864,59476:37861,59477:37848,59478:37827,59479:37853,59480:37840,59481:37832,59482:37860,59483:37914,59484:37908,59485:37907,59486:37891,59487:37895,59488:37904,59489:37942,59490:37931,59491:37941,59492:37921,59493:37946,59494:37953,59495:37970,59496:37956,59497:37979,59498:37984,59499:37986,59500:37982,59501:37994,59502:37417,59503:38e3,59504:38005,59505:38007,59506:38013,59507:37978,59508:38012,59509:38014,59510:38017,59511:38015,59512:38274,59513:38279,59514:38282,59515:38292,59516:38294,59517:38296,59518:38297,59520:38304,59521:38312,59522:38311,59523:38317,59524:38332,59525:38331,59526:38329,59527:38334,59528:38346,59529:28662,59530:38339,59531:38349,59532:38348,59533:38357,59534:38356,59535:38358,59536:38364,59537:38369,59538:38373,59539:38370,59540:38433,59541:38440,59542:38446,59543:38447,59544:38466,59545:38476,59546:38479,59547:38475,59548:38519,59549:38492,59550:38494,59551:38493,59552:38495,59553:38502,59554:38514,59555:38508,59556:38541,59557:38552,59558:38549,59559:38551,59560:38570,59561:38567,59562:38577,59563:38578,59564:38576,59565:38580,59566:38582,59567:38584,59568:38585,59569:38606,59570:38603,59571:38601,59572:38605,59573:35149,59574:38620,59575:38669,59576:38613,59577:38649,59578:38660,59579:38662,59580:38664,59581:38675,59582:38670,59583:38673,59584:38671,59585:38678,59586:38681,59587:38692,59588:38698,59589:38704,59590:38713,59591:38717,59592:38718,59593:38724,59594:38726,59595:38728,59596:38722,59597:38729,59598:38748,59599:38752,59600:38756,59601:38758,59602:38760,59603:21202,59604:38763,59605:38769,59606:38777,59607:38789,59608:38780,59609:38785,59610:38778,59611:38790,59612:38795,59613:38799,59614:38800,59615:38812,59616:38824,59617:38822,59618:38819,59619:38835,59620:38836,59621:38851,59622:38854,59623:38856,59624:38859,59625:38876,59626:38893,59627:40783,59628:38898,59629:31455,59630:38902,59631:38901,59632:38927,59633:38924,59634:38968,59635:38948,59636:38945,59637:38967,59638:38973,59639:38982,59640:38991,59641:38987,59642:39019,59643:39023,59644:39024,59712:39025,59713:39028,59714:39027,59715:39082,59716:39087,59717:39089,59718:39094,59719:39108,59720:39107,59721:39110,59722:39145,59723:39147,59724:39171,59725:39177,59726:39186,59727:39188,59728:39192,59729:39201,59730:39197,59731:39198,59732:39204,59733:39200,59734:39212,59735:39214,59736:39229,59737:39230,59738:39234,59739:39241,59740:39237,59741:39248,59742:39243,59743:39249,59744:39250,59745:39244,59746:39253,59747:39319,59748:39320,59749:39333,59750:39341,59751:39342,59752:39356,59753:39391,59754:39387,59755:39389,59756:39384,59757:39377,59758:39405,59759:39406,59760:39409,59761:39410,59762:39419,59763:39416,59764:39425,59765:39439,59766:39429,59767:39394,59768:39449,59769:39467,59770:39479,59771:39493,59772:39490,59773:39488,59774:39491,59776:39486,59777:39509,59778:39501,59779:39515,59780:39511,59781:39519,59782:39522,59783:39525,59784:39524,59785:39529,59786:39531,59787:39530,59788:39597,59789:39600,59790:39612,59791:39616,59792:39631,59793:39633,59794:39635,59795:39636,59796:39646,59797:39647,59798:39650,59799:39651,59800:39654,59801:39663,59802:39659,59803:39662,59804:39668,59805:39665,59806:39671,59807:39675,59808:39686,59809:39704,59810:39706,59811:39711,59812:39714,59813:39715,59814:39717,59815:39719,59816:39720,59817:39721,59818:39722,59819:39726,59820:39727,59821:39730,59822:39748,59823:39747,59824:39759,59825:39757,59826:39758,59827:39761,59828:39768,59829:39796,59830:39827,59831:39811,59832:39825,59833:39830,59834:39831,59835:39839,59836:39840,59837:39848,59838:39860,59839:39872,59840:39882,59841:39865,59842:39878,59843:39887,59844:39889,59845:39890,59846:39907,59847:39906,59848:39908,59849:39892,59850:39905,59851:39994,59852:39922,59853:39921,59854:39920,59855:39957,59856:39956,59857:39945,59858:39955,59859:39948,59860:39942,59861:39944,59862:39954,59863:39946,59864:39940,59865:39982,59866:39963,59867:39973,59868:39972,59869:39969,59870:39984,59871:40007,59872:39986,59873:40006,59874:39998,59875:40026,59876:40032,59877:40039,59878:40054,59879:40056,59880:40167,59881:40172,59882:40176,59883:40201,59884:40200,59885:40171,59886:40195,59887:40198,59888:40234,59889:40230,59890:40367,59891:40227,59892:40223,59893:40260,59894:40213,59895:40210,59896:40257,59897:40255,59898:40254,59899:40262,59900:40264,59968:40285,59969:40286,59970:40292,59971:40273,59972:40272,59973:40281,59974:40306,59975:40329,59976:40327,59977:40363,59978:40303,59979:40314,59980:40346,59981:40356,59982:40361,59983:40370,59984:40388,59985:40385,59986:40379,59987:40376,59988:40378,59989:40390,59990:40399,59991:40386,59992:40409,59993:40403,59994:40440,59995:40422,59996:40429,59997:40431,59998:40445,59999:40474,6e4:40475,60001:40478,60002:40565,60003:40569,60004:40573,60005:40577,60006:40584,60007:40587,60008:40588,60009:40594,60010:40597,60011:40593,60012:40605,60013:40613,60014:40617,60015:40632,60016:40618,60017:40621,60018:38753,60019:40652,60020:40654,60021:40655,60022:40656,60023:40660,60024:40668,60025:40670,60026:40669,60027:40672,60028:40677,60029:40680,60030:40687,60032:40692,60033:40694,60034:40695,60035:40697,60036:40699,60037:40700,60038:40701,60039:40711,60040:40712,60041:30391,60042:40725,60043:40737,60044:40748,60045:40766,60046:40778,60047:40786,60048:40788,60049:40803,60050:40799,60051:40800,60052:40801,60053:40806,60054:40807,60055:40812,60056:40810,60057:40823,60058:40818,60059:40822,60060:40853,60061:40860,60062:40864,60063:22575,60064:27079,60065:36953,60066:29796,60067:20956,60068:29081}},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var i=r(1),n=r(2);t.decode=function(e,t){var r=new Uint8ClampedArray(e.length);r.set(e);for(var o=new i.default(285,256,0),s=new n.default(o,r),a=new Uint8ClampedArray(t),c=!1,l=0;l<t;l++){var u=s.evaluateAt(o.exp(l+o.generatorBase));a[a.length-1-l]=u,0!==u&&(c=!0)}if(!c)return r;var h=new n.default(o,a),d=function(e,t,r,i){var n;t.degree()<r.degree()&&(t=(n=[r,t])[0],r=n[1]);for(var o=t,s=r,a=e.zero,c=e.one;s.degree()>=i/2;){var l=o,u=a;if(a=c,(o=s).isZero())return null;s=l;for(var h=e.zero,d=o.getCoefficient(o.degree()),f=e.inverse(d);s.degree()>=o.degree()&&!s.isZero();){var p=s.degree()-o.degree(),g=e.multiply(s.getCoefficient(s.degree()),f);h=h.addOrSubtract(e.buildMonomial(p,g)),s=s.addOrSubtract(o.multiplyByMonomial(p,g))}if(c=h.multiplyPoly(a).addOrSubtract(u),s.degree()>=o.degree())return null}var m=c.getCoefficient(0);if(0===m)return null;var b=e.inverse(m);return[c.multiply(b),s.multiply(b)]}(o,o.buildMonomial(t,1),h,t);if(null===d)return null;var f=function(e,t){var r=t.degree();if(1===r)return[t.getCoefficient(1)];for(var i=new Array(r),n=0,o=1;o<e.size&&n<r;o++)0===t.evaluateAt(o)&&(i[n]=e.inverse(o),n++);return n!==r?null:i}(o,d[0]);if(null==f)return null;for(var p=function(e,t,r){for(var n=r.length,o=new Array(n),s=0;s<n;s++){for(var a=e.inverse(r[s]),c=1,l=0;l<n;l++)s!==l&&(c=e.multiply(c,i.addOrSubtractGF(1,e.multiply(r[l],a))));o[s]=e.multiply(t.evaluateAt(a),e.inverse(c)),0!==e.generatorBase&&(o[s]=e.multiply(o[s],a))}return o}(o,d[1],f),g=0;g<f.length;g++){var m=r.length-1-o.log(f[g]);if(m<0)return null;r[m]=i.addOrSubtractGF(r[m],p[g])}return r}},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.VERSIONS=[{infoBits:null,versionNumber:1,alignmentPatternCenters:[],errorCorrectionLevels:[{ecCodewordsPerBlock:7,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:10,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:16}]},{ecCodewordsPerBlock:13,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:13}]},{ecCodewordsPerBlock:17,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:9}]}]},{infoBits:null,versionNumber:2,alignmentPatternCenters:[6,18],errorCorrectionLevels:[{ecCodewordsPerBlock:10,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:34}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:28}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:22}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:16}]}]},{infoBits:null,versionNumber:3,alignmentPatternCenters:[6,22],errorCorrectionLevels:[{ecCodewordsPerBlock:15,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:55}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:13}]}]},{infoBits:null,versionNumber:4,alignmentPatternCenters:[6,26],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:80}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:32}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:9}]}]},{infoBits:null,versionNumber:5,alignmentPatternCenters:[6,30],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:43}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:15},{numBlocks:2,dataCodewordsPerBlock:16}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:11},{numBlocks:2,dataCodewordsPerBlock:12}]}]},{infoBits:null,versionNumber:6,alignmentPatternCenters:[6,34],errorCorrectionLevels:[{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:68}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:27}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:15}]}]},{infoBits:31892,versionNumber:7,alignmentPatternCenters:[6,22,38],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:78}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:31}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:4,dataCodewordsPerBlock:15}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:13},{numBlocks:1,dataCodewordsPerBlock:14}]}]},{infoBits:34236,versionNumber:8,alignmentPatternCenters:[6,24,42],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:97}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:38},{numBlocks:2,dataCodewordsPerBlock:39}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:18},{numBlocks:2,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:14},{numBlocks:2,dataCodewordsPerBlock:15}]}]},{infoBits:39577,versionNumber:9,alignmentPatternCenters:[6,26,46],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:36},{numBlocks:2,dataCodewordsPerBlock:37}]},{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:16},{numBlocks:4,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:12},{numBlocks:4,dataCodewordsPerBlock:13}]}]},{infoBits:42195,versionNumber:10,alignmentPatternCenters:[6,28,50],errorCorrectionLevels:[{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:68},{numBlocks:2,dataCodewordsPerBlock:69}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:43},{numBlocks:1,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:19},{numBlocks:2,dataCodewordsPerBlock:20}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:15},{numBlocks:2,dataCodewordsPerBlock:16}]}]},{infoBits:48118,versionNumber:11,alignmentPatternCenters:[6,30,54],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:81}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:50},{numBlocks:4,dataCodewordsPerBlock:51}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:22},{numBlocks:4,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:12},{numBlocks:8,dataCodewordsPerBlock:13}]}]},{infoBits:51042,versionNumber:12,alignmentPatternCenters:[6,32,58],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:92},{numBlocks:2,dataCodewordsPerBlock:93}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:36},{numBlocks:2,dataCodewordsPerBlock:37}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:20},{numBlocks:6,dataCodewordsPerBlock:21}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:14},{numBlocks:4,dataCodewordsPerBlock:15}]}]},{infoBits:55367,versionNumber:13,alignmentPatternCenters:[6,34,62],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:107}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:37},{numBlocks:1,dataCodewordsPerBlock:38}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:20},{numBlocks:4,dataCodewordsPerBlock:21}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:11},{numBlocks:4,dataCodewordsPerBlock:12}]}]},{infoBits:58893,versionNumber:14,alignmentPatternCenters:[6,26,46,66],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:115},{numBlocks:1,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:40},{numBlocks:5,dataCodewordsPerBlock:41}]},{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:16},{numBlocks:5,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:12},{numBlocks:5,dataCodewordsPerBlock:13}]}]},{infoBits:63784,versionNumber:15,alignmentPatternCenters:[6,26,48,70],errorCorrectionLevels:[{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:87},{numBlocks:1,dataCodewordsPerBlock:88}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:41},{numBlocks:5,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:24},{numBlocks:7,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:12},{numBlocks:7,dataCodewordsPerBlock:13}]}]},{infoBits:68472,versionNumber:16,alignmentPatternCenters:[6,26,50,74],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:98},{numBlocks:1,dataCodewordsPerBlock:99}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:45},{numBlocks:3,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:19},{numBlocks:2,dataCodewordsPerBlock:20}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:15},{numBlocks:13,dataCodewordsPerBlock:16}]}]},{infoBits:70749,versionNumber:17,alignmentPatternCenters:[6,30,54,78],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:107},{numBlocks:5,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:46},{numBlocks:1,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:22},{numBlocks:15,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:17,dataCodewordsPerBlock:15}]}]},{infoBits:76311,versionNumber:18,alignmentPatternCenters:[6,30,56,82],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:120},{numBlocks:1,dataCodewordsPerBlock:121}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:9,dataCodewordsPerBlock:43},{numBlocks:4,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:22},{numBlocks:1,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:19,dataCodewordsPerBlock:15}]}]},{infoBits:79154,versionNumber:19,alignmentPatternCenters:[6,30,58,86],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:113},{numBlocks:4,dataCodewordsPerBlock:114}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:44},{numBlocks:11,dataCodewordsPerBlock:45}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:21},{numBlocks:4,dataCodewordsPerBlock:22}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:9,dataCodewordsPerBlock:13},{numBlocks:16,dataCodewordsPerBlock:14}]}]},{infoBits:84390,versionNumber:20,alignmentPatternCenters:[6,34,62,90],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:107},{numBlocks:5,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:41},{numBlocks:13,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:24},{numBlocks:5,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:15},{numBlocks:10,dataCodewordsPerBlock:16}]}]},{infoBits:87683,versionNumber:21,alignmentPatternCenters:[6,28,50,72,94],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:116},{numBlocks:4,dataCodewordsPerBlock:117}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:22},{numBlocks:6,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:16},{numBlocks:6,dataCodewordsPerBlock:17}]}]},{infoBits:92361,versionNumber:22,alignmentPatternCenters:[6,26,50,74,98],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:111},{numBlocks:7,dataCodewordsPerBlock:112}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:24},{numBlocks:16,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:34,dataCodewordsPerBlock:13}]}]},{infoBits:96236,versionNumber:23,alignmentPatternCenters:[6,30,54,74,102],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:121},{numBlocks:5,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:47},{numBlocks:14,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:16,dataCodewordsPerBlock:15},{numBlocks:14,dataCodewordsPerBlock:16}]}]},{infoBits:102084,versionNumber:24,alignmentPatternCenters:[6,28,54,80,106],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:117},{numBlocks:4,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:45},{numBlocks:14,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:24},{numBlocks:16,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:30,dataCodewordsPerBlock:16},{numBlocks:2,dataCodewordsPerBlock:17}]}]},{infoBits:102881,versionNumber:25,alignmentPatternCenters:[6,32,58,84,110],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:106},{numBlocks:4,dataCodewordsPerBlock:107}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:47},{numBlocks:13,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:24},{numBlocks:22,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:15},{numBlocks:13,dataCodewordsPerBlock:16}]}]},{infoBits:110507,versionNumber:26,alignmentPatternCenters:[6,30,58,86,114],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:114},{numBlocks:2,dataCodewordsPerBlock:115}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:46},{numBlocks:4,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:28,dataCodewordsPerBlock:22},{numBlocks:6,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:33,dataCodewordsPerBlock:16},{numBlocks:4,dataCodewordsPerBlock:17}]}]},{infoBits:110734,versionNumber:27,alignmentPatternCenters:[6,34,62,90,118],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:122},{numBlocks:4,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:45},{numBlocks:3,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:23},{numBlocks:26,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:15},{numBlocks:28,dataCodewordsPerBlock:16}]}]},{infoBits:117786,versionNumber:28,alignmentPatternCenters:[6,26,50,74,98,122],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:117},{numBlocks:10,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:45},{numBlocks:23,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:24},{numBlocks:31,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:15},{numBlocks:31,dataCodewordsPerBlock:16}]}]},{infoBits:119615,versionNumber:29,alignmentPatternCenters:[6,30,54,78,102,126],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:116},{numBlocks:7,dataCodewordsPerBlock:117}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:21,dataCodewordsPerBlock:45},{numBlocks:7,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:23},{numBlocks:37,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:15},{numBlocks:26,dataCodewordsPerBlock:16}]}]},{infoBits:126325,versionNumber:30,alignmentPatternCenters:[6,26,52,78,104,130],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:115},{numBlocks:10,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:47},{numBlocks:10,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:24},{numBlocks:25,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:23,dataCodewordsPerBlock:15},{numBlocks:25,dataCodewordsPerBlock:16}]}]},{infoBits:127568,versionNumber:31,alignmentPatternCenters:[6,30,56,82,108,134],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:115},{numBlocks:3,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:46},{numBlocks:29,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:42,dataCodewordsPerBlock:24},{numBlocks:1,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:23,dataCodewordsPerBlock:15},{numBlocks:28,dataCodewordsPerBlock:16}]}]},{infoBits:133589,versionNumber:32,alignmentPatternCenters:[6,34,60,86,112,138],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:115}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:46},{numBlocks:23,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:24},{numBlocks:35,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:15},{numBlocks:35,dataCodewordsPerBlock:16}]}]},{infoBits:136944,versionNumber:33,alignmentPatternCenters:[6,30,58,86,114,142],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:115},{numBlocks:1,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:14,dataCodewordsPerBlock:46},{numBlocks:21,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:29,dataCodewordsPerBlock:24},{numBlocks:19,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:15},{numBlocks:46,dataCodewordsPerBlock:16}]}]},{infoBits:141498,versionNumber:34,alignmentPatternCenters:[6,34,62,90,118,146],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:115},{numBlocks:6,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:14,dataCodewordsPerBlock:46},{numBlocks:23,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:44,dataCodewordsPerBlock:24},{numBlocks:7,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:59,dataCodewordsPerBlock:16},{numBlocks:1,dataCodewordsPerBlock:17}]}]},{infoBits:145311,versionNumber:35,alignmentPatternCenters:[6,30,54,78,102,126,150],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:121},{numBlocks:7,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:47},{numBlocks:26,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:39,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:15},{numBlocks:41,dataCodewordsPerBlock:16}]}]},{infoBits:150283,versionNumber:36,alignmentPatternCenters:[6,24,50,76,102,128,154],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:121},{numBlocks:14,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:47},{numBlocks:34,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:46,dataCodewordsPerBlock:24},{numBlocks:10,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:15},{numBlocks:64,dataCodewordsPerBlock:16}]}]},{infoBits:152622,versionNumber:37,alignmentPatternCenters:[6,28,54,80,106,132,158],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:122},{numBlocks:4,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:29,dataCodewordsPerBlock:46},{numBlocks:14,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:49,dataCodewordsPerBlock:24},{numBlocks:10,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:24,dataCodewordsPerBlock:15},{numBlocks:46,dataCodewordsPerBlock:16}]}]},{infoBits:158308,versionNumber:38,alignmentPatternCenters:[6,32,58,84,110,136,162],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:122},{numBlocks:18,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:46},{numBlocks:32,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:48,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:42,dataCodewordsPerBlock:15},{numBlocks:32,dataCodewordsPerBlock:16}]}]},{infoBits:161089,versionNumber:39,alignmentPatternCenters:[6,26,54,82,110,138,166],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:20,dataCodewordsPerBlock:117},{numBlocks:4,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:40,dataCodewordsPerBlock:47},{numBlocks:7,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:43,dataCodewordsPerBlock:24},{numBlocks:22,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:15},{numBlocks:67,dataCodewordsPerBlock:16}]}]},{infoBits:167017,versionNumber:40,alignmentPatternCenters:[6,30,58,86,114,142,170],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:118},{numBlocks:6,dataCodewordsPerBlock:119}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:18,dataCodewordsPerBlock:47},{numBlocks:31,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:34,dataCodewordsPerBlock:24},{numBlocks:34,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:20,dataCodewordsPerBlock:15},{numBlocks:61,dataCodewordsPerBlock:16}]}]}]},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var i=r(0);function n(e,t,r,i){var n=e.x-t.x+r.x-i.x,o=e.y-t.y+r.y-i.y;if(0===n&&0===o)return{a11:t.x-e.x,a12:t.y-e.y,a13:0,a21:r.x-t.x,a22:r.y-t.y,a23:0,a31:e.x,a32:e.y,a33:1};var s=t.x-r.x,a=i.x-r.x,c=t.y-r.y,l=i.y-r.y,u=s*l-a*c,h=(n*l-a*o)/u,d=(s*o-n*c)/u;return{a11:t.x-e.x+h*t.x,a12:t.y-e.y+h*t.y,a13:h,a21:i.x-e.x+d*i.x,a22:i.y-e.y+d*i.y,a23:d,a31:e.x,a32:e.y,a33:1}}t.extract=function(e,t){for(var r,o,s=function(e,t,r,i){var o=n({x:3.5,y:3.5},t,r,i);return{a11:o.a22*o.a33-o.a23*o.a32,a12:o.a13*o.a32-o.a12*o.a33,a13:o.a12*o.a23-o.a13*o.a22,a21:o.a23*o.a31-o.a21*o.a33,a22:o.a11*o.a33-o.a13*o.a31,a23:o.a13*o.a21-o.a11*o.a23,a31:o.a21*o.a32-o.a22*o.a31,a32:o.a12*o.a31-o.a11*o.a32,a33:o.a11*o.a22-o.a12*o.a21}}(0,{x:t.dimension-3.5,y:3.5},{x:t.dimension-6.5,y:t.dimension-6.5},{x:3.5,y:t.dimension-3.5}),a=(o=s,{a11:(r=n(t.topLeft,t.topRight,t.alignmentPattern,t.bottomLeft)).a11*o.a11+r.a21*o.a12+r.a31*o.a13,a12:r.a12*o.a11+r.a22*o.a12+r.a32*o.a13,a13:r.a13*o.a11+r.a23*o.a12+r.a33*o.a13,a21:r.a11*o.a21+r.a21*o.a22+r.a31*o.a23,a22:r.a12*o.a21+r.a22*o.a22+r.a32*o.a23,a23:r.a13*o.a21+r.a23*o.a22+r.a33*o.a23,a31:r.a11*o.a31+r.a21*o.a32+r.a31*o.a33,a32:r.a12*o.a31+r.a22*o.a32+r.a32*o.a33,a33:r.a13*o.a31+r.a23*o.a32+r.a33*o.a33}),c=i.BitMatrix.createEmpty(t.dimension,t.dimension),l=function(e,t){var r=a.a13*e+a.a23*t+a.a33;return{x:(a.a11*e+a.a21*t+a.a31)/r,y:(a.a12*e+a.a22*t+a.a32)/r}},u=0;u<t.dimension;u++)for(var h=0;h<t.dimension;h++){var d=l(h+.5,u+.5);c.set(h,u,e.get(Math.floor(d.x),Math.floor(d.y)))}return{matrix:c,mappingFunction:l}}},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var i=function(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))};function n(e){return e.reduce((function(e,t){return e+t}))}function o(e,t,r,n){var o,s,a,c,l=[{x:Math.floor(e.x),y:Math.floor(e.y)}],u=Math.abs(t.y-e.y)>Math.abs(t.x-e.x);u?(o=Math.floor(e.y),s=Math.floor(e.x),a=Math.floor(t.y),c=Math.floor(t.x)):(o=Math.floor(e.x),s=Math.floor(e.y),a=Math.floor(t.x),c=Math.floor(t.y));for(var h=Math.abs(a-o),d=Math.abs(c-s),f=Math.floor(-h/2),p=o<a?1:-1,g=s<c?1:-1,m=!0,b=o,v=s;b!==a+p;b+=p){var y=u?v:b,w=u?b:v;if(r.get(y,w)!==m&&(m=!m,l.push({x:y,y:w}),l.length===n+1))break;if((f+=d)>0){if(v===c)break;v+=g,f-=h}}for(var _=[],x=0;x<n;x++)l[x]&&l[x+1]?_.push(i(l[x],l[x+1])):_.push(0);return _}function s(e,t,r,i){var n,s=t.y-e.y,a=t.x-e.x,c=o(e,t,r,Math.ceil(i/2)),l=o(e,{x:e.x-a,y:e.y-s},r,Math.ceil(i/2)),u=c.shift()+l.shift()-1;return(n=l.concat(u)).concat.apply(n,c)}function a(e,t){var r=n(e)/n(t),i=0;return t.forEach((function(t,n){i+=Math.pow(e[n]-t*r,2)})),{averageSize:r,error:i}}function c(e,t,r){try{var i=s(e,{x:-1,y:e.y},r,t.length),n=s(e,{x:e.x,y:-1},r,t.length),o=s(e,{x:Math.max(0,e.x-e.y)-1,y:Math.max(0,e.y-e.x)-1},r,t.length),c=s(e,{x:Math.min(r.width,e.x+e.y)+1,y:Math.min(r.height,e.y+e.x)+1},r,t.length),l=a(i,t),u=a(n,t),h=a(o,t),d=a(c,t),f=Math.sqrt(l.error*l.error+u.error*u.error+h.error*h.error+d.error*d.error),p=(l.averageSize+u.averageSize+h.averageSize+d.averageSize)/4;return f+(Math.pow(l.averageSize-p,2)+Math.pow(u.averageSize-p,2)+Math.pow(h.averageSize-p,2)+Math.pow(d.averageSize-p,2))/p}catch(e){return 1/0}}function l(e,t){for(var r=Math.round(t.x);e.get(r,Math.round(t.y));)r--;for(var i=Math.round(t.x);e.get(i,Math.round(t.y));)i++;for(var n=(r+i)/2,o=Math.round(t.y);e.get(Math.round(n),o);)o--;for(var s=Math.round(t.y);e.get(Math.round(n),s);)s++;return{x:n,y:(o+s)/2}}function u(e,t,r,o,a){var l,u,h;try{l=function(e,t,r,o){var a=(n(s(e,r,o,5))/7+n(s(e,t,o,5))/7+n(s(r,e,o,5))/7+n(s(t,e,o,5))/7)/4;if(a<1)throw new Error("Invalid module size");var c=Math.round(i(e,t)/a),l=Math.round(i(e,r)/a),u=Math.floor((c+l)/2)+7;switch(u%4){case 0:u++;break;case 2:u--}return{dimension:u,moduleSize:a}}(o,r,a,e),u=l.dimension,h=l.moduleSize}catch(e){return null}var d=r.x-o.x+a.x,f=r.y-o.y+a.y,p=(i(o,a)+i(o,r))/2/h,g=1-3/p,m={x:o.x+g*(d-o.x),y:o.y+g*(f-o.y)},b=t.map((function(t){var r=(t.top.startX+t.top.endX+t.bottom.startX+t.bottom.endX)/4,o=(t.top.y+t.bottom.y+1)/2;if(e.get(Math.floor(r),Math.floor(o)))return n([t.top.endX-t.top.startX,t.bottom.endX-t.bottom.startX,t.bottom.y-t.top.y+1]),{x:r,y:o,score:c({x:Math.floor(r),y:Math.floor(o)},[1,1,1],e)+i({x:r,y:o},m)}})).filter((function(e){return!!e})).sort((function(e,t){return e.score-t.score}));return{alignmentPattern:p>=15&&b.length?b[0]:m,dimension:u}}t.locate=function(e){for(var t=[],r=[],o=[],s=[],a=function(i){for(var a=0,c=!1,l=[0,0,0,0,0],u=function(t){var o=e.get(t,i);if(o===c)a++;else{l=[l[1],l[2],l[3],l[4],a],a=1,c=o;var u=n(l)/7,h=Math.abs(l[0]-u)<u&&Math.abs(l[1]-u)<u&&Math.abs(l[2]-3*u)<3*u&&Math.abs(l[3]-u)<u&&Math.abs(l[4]-u)<u&&!o,d=n(l.slice(-3))/3,f=Math.abs(l[2]-d)<d&&Math.abs(l[3]-d)<d&&Math.abs(l[4]-d)<d&&o;if(h){var p=t-l[3]-l[4],g=p-l[2],m={startX:g,endX:p,y:i};(b=r.filter((function(e){return g>=e.bottom.startX&&g<=e.bottom.endX||p>=e.bottom.startX&&g<=e.bottom.endX||g<=e.bottom.startX&&p>=e.bottom.endX&&l[2]/(e.bottom.endX-e.bottom.startX)<1.5&&l[2]/(e.bottom.endX-e.bottom.startX)>.5}))).length>0?b[0].bottom=m:r.push({top:m,bottom:m})}if(f){var b,v=t-l[4],y=v-l[3];m={startX:y,y:i,endX:v},(b=s.filter((function(e){return y>=e.bottom.startX&&y<=e.bottom.endX||v>=e.bottom.startX&&y<=e.bottom.endX||y<=e.bottom.startX&&v>=e.bottom.endX&&l[2]/(e.bottom.endX-e.bottom.startX)<1.5&&l[2]/(e.bottom.endX-e.bottom.startX)>.5}))).length>0?b[0].bottom=m:s.push({top:m,bottom:m})}}},h=-1;h<=e.width;h++)u(h);t.push.apply(t,r.filter((function(e){return e.bottom.y!==i&&e.bottom.y-e.top.y>=2}))),r=r.filter((function(e){return e.bottom.y===i})),o.push.apply(o,s.filter((function(e){return e.bottom.y!==i}))),s=s.filter((function(e){return e.bottom.y===i}))},h=0;h<=e.height;h++)a(h);t.push.apply(t,r.filter((function(e){return e.bottom.y-e.top.y>=2}))),o.push.apply(o,s);var d=t.filter((function(e){return e.bottom.y-e.top.y>=2})).map((function(t){var r=(t.top.startX+t.top.endX+t.bottom.startX+t.bottom.endX)/4,i=(t.top.y+t.bottom.y+1)/2;if(e.get(Math.round(r),Math.round(i))){var o=[t.top.endX-t.top.startX,t.bottom.endX-t.bottom.startX,t.bottom.y-t.top.y+1],s=n(o)/o.length;return{score:c({x:Math.round(r),y:Math.round(i)},[1,1,3,1,1],e),x:r,y:i,size:s}}})).filter((function(e){return!!e})).sort((function(e,t){return e.score-t.score})).map((function(e,t,r){if(t>4)return null;var i=r.filter((function(e,r){return t!==r})).map((function(t){return{x:t.x,y:t.y,score:t.score+Math.pow(t.size-e.size,2)/e.size,size:t.size}})).sort((function(e,t){return e.score-t.score}));if(i.length<2)return null;var n=e.score+i[0].score+i[1].score;return{points:[e].concat(i.slice(0,2)),score:n}})).filter((function(e){return!!e})).sort((function(e,t){return e.score-t.score}));if(0===d.length)return null;var f=function(e,t,r){var n,o,s,a,c,l,u,h=i(e,t),d=i(t,r),f=i(e,r);return d>=h&&d>=f?(c=(n=[t,e,r])[0],l=n[1],u=n[2]):f>=d&&f>=h?(c=(o=[e,t,r])[0],l=o[1],u=o[2]):(c=(s=[e,r,t])[0],l=s[1],u=s[2]),(u.x-l.x)*(c.y-l.y)-(u.y-l.y)*(c.x-l.x)<0&&(c=(a=[u,c])[0],u=a[1]),{bottomLeft:c,topLeft:l,topRight:u}}(d[0].points[0],d[0].points[1],d[0].points[2]),p=f.topRight,g=f.topLeft,m=f.bottomLeft,b=u(e,o,p,g,m),v=[];b&&v.push({alignmentPattern:{x:b.alignmentPattern.x,y:b.alignmentPattern.y},bottomLeft:{x:m.x,y:m.y},dimension:b.dimension,topLeft:{x:g.x,y:g.y},topRight:{x:p.x,y:p.y}});var y=l(e,p),w=l(e,g),_=l(e,m),x=u(e,o,y,w,_);return x&&v.push({alignmentPattern:{x:x.alignmentPattern.x,y:x.alignmentPattern.y},bottomLeft:{x:_.x,y:_.y},topLeft:{x:w.x,y:w.y},topRight:{x:y.x,y:y.y},dimension:x.dimension}),0===v.length?null:v}}]).default}));const{jsQR:q}=K;class X extends p.Hc{static get properties(){return{cameras:{type:Array},selectedCamera:{type:Object},qrCode:{type:String},errorMessage:{type:String},hideCode:{type:Boolean,reflect:!0},boxColor:{type:String},renderAfter:{type:Number}}}static get styles(){return p.iv`
			:host {
				display : block;
				min-width: 100px;
				min-height: 100px;
				/*max-width: 400px;*/
				/*overflow:auto;*/
				margin:auto;
				position:relative;
				/*max-height:80vh;*/
			}
			.error{
				font-size:var(--flow-qrcode-scanner-error-font-size, 0.8rem);
				color:var(--flow-qrcode-scanner-error-color, #F00);
				padding:var(--flow-qrcode-scanner-error-padding, 10px);
			}
			.wait-msg, .select-msg{
				font-size:var(--flow-qrcode-scanner-msg-font-size, 1rem);
				text-align:center;padding:10px;
			}
			.video{border:0px solid #000000;display:none;}
			.view{
				border:1px solid #000000;display:block;margin:5px auto;
				width:var(--flow-qrcode-scanner-canvas-width, 280px);
				height:var(--flow-qrcode-scanner-canvas-height, 280px);
				object-fit:contain;
			}
			.render-canvas{
				position:absolute;border:0px solid #000;display:none
			}
			.code-box{
				display:flex;
				flex-direction:var(--flow-qrcode-scanner-code-box-flex-direction, column);
				align-items:var(--flow-qrcode-scanner-code-box-align-items, center);
			}
			.code{
				border:0px;-webkit-appearance:none;outline:none;
				margin:var(--flow-qrcode-scanner-code-margin, 10px);
				overflow:hidden;text-overflow:ellipsis;
				font-size:var(--flow-qrcode-scanner-code-font-size, 1rem);
				background-color:transparent;color:var(--flow-primary-color);
				font-family:var(--flow-qrcode-scanner-code-font-family, "Exo 2");
				word-wrap:break-word;
				max-width:100%;
				width:var(--flow-qrcode-scanner-code-width, 300px);
				height:var(--flow-qrcode-scanner-code-height, auto);
				/*max-height:var(--flow-qrcode-scanner-code-max-height, 100px);*/
				resize:none;
				display:block;
			}
			:host([hidecode]) .code-box{display:none}
			.logs{width:90%;height:100px;}
			:host(:not([logs])) .logs{display:none}
			.camera-selection{
				display:flex;
			}
			:host([debug]) .render-canvas,
			:host([debug]) .video{
				display:block;position:relative;margin:auto;
			}
			/*
			.camera-selection flow-select{
				max-width:var(--flow-qrcode-scanner-s-max-width, 400px);
				--flow-dropdown-display:var(--flow-qrcode-scanner-s-display, block);
				--flow-select-width:var(--flow-qrcode-scanner-sw, var(--flow-select-width, 100%));
				--flow-select-margin:var(--flow-qrcode-scanner-sm, var(--flow-select-margin, 10px auto));
			}
			*/
		`}constructor(){super(),this.stopped=!0,this.renderAfter=10}render(){let{cameras:e=[],selectedCamera:t="",qrCode:r="",errorMessage:i=""}=this;return p.dy`
			<textarea class="logs"></textarea>
			<div class="error">${i}</div>
			${this.renderScanning()}
			${this.renderCameraSelection()}
			${this.renderCode()}
		`}renderCameraSelection(){const{cameras:e,selectedCamera:t,cameraDiscovery:r,stopped:i}=this;if(!1===r||i)return"";if(!e)return p.dy`<div class="wait-msg" is="i18n-div">Please wait. Getting cameras.</div>`;let n=t?.id||"";return p.dy`
		<div class="camera-selection">
			<!--div class="select-msg">Select cameras</div-->
			<flow-select label="${(0,v.T)("Select cameras")}"
				@select="${this.onCameraSelect}" selected="${n}">
				${e.map((e=>p.dy`<flow-menu-item
						value="${e.id}">${e.label}</flow-menu-item>`))}
			</flow-select>
		</div>
		`}renderScanning(){return p.dy`
			<video class="video" width="320" height="240" autoplay></video>
			<canvas class="render-canvas"></canvas>
			<img class="view">
		`}renderCode(){let{qrCode:e}=this;return e?p.dy`
			<div class="code-box">
				<!--div class="label">QR code:</div-->
				<div class="code">QR code: ${e}</div>
				<flow-btn @click="${this.clearCode}">Clear</flow-btn>
			</div>
		`:""}clearCode(){this.setQRCode("")}setQRCode(e){this.qrCode=e,this.fire("changed",{code:e})}firstUpdated(){super.firstUpdated(),this.viewImg=this.renderRoot.querySelector(".view"),this.init()}updated(){super.updated(),this.initScanning()}_log(e,t){this.renderRoot.querySelector(".logs").value+=`\n--------------\n${e}\n`+JSON.stringify(t)}stop(){this.stopped=!0;let{video:e}=this;this.closeActiveStreams(e?.srcObject)}start(){this.stopped=!1,this.scanning=!1,this.init()}getVideoElement(){return this._video||(this._video=document.createElement("video")),this._video}getCanvasElement(){return this._canvas||(this._canvas=document.createElement("canvas")),this._canvas}initScanning(){if(this.__render=0,this.qrCode||this.stopped)return;let e=this.getCanvasElement(),t=this.getVideoElement(),{selectedCamera:r}=this;if(this._log("initScanning",{canvas:!!e,video:!!t,selectedCamera:r,scanning:this.scanning}),!e||!t||!r)return;if(this.scanning==r.id)return;this.closeActiveStreams(t.srcObject),this.scanning=r.id,this.video=t;const i=e.getContext("2d",{alpha:!1}),n={audio:!1,video:{deviceId:{exact:r.id}}};navigator.mediaDevices.getUserMedia(n).then((n=>{t.srcObject=n;const o=n.getVideoTracks()[0].getSettings();t.setAttribute("playsinline",!0),t.play(),this.getBoundingClientRect(),e.width=o.width,e.height=o.height,i.lineWidth=4,i.strokeStyle=this.boxColor||"#FF3B58";let{offsetX:s,offsetY:a,width:c,height:l}=(0,j.XS)(e.width,e.height,o.width,o.height);s=Math.floor(s),a=Math.floor(a),c=Math.floor(c),l=Math.floor(l),requestAnimationFrame((()=>{this.videoTick({video:t,box:{offsetX:s,offsetY:a,width:c,height:l},canvas:e,canvasCtx:i,cameraId:r.id})}))})).catch((e=>{throw e}))}setError(e){this.errorMessage=e}async init(){if(!this.stopped)try{let e=await this.getCameras();this.cameras=e;let t=e.filter((e=>!e.label.toLowerCase().includes("front")));t.length?this.selectedCamera=t[0]:e.length&&(this.selectedCamera=e[0]),this.log("cameras",e)}catch(e){console.log("getCameras:error",e),this.setError(p.dy`Camera discovery process failed.
				<br />Make sure you have given Camera permission.`),this.cameraDiscovery=!1}}closeActiveStreams(e){if(!e)return;const t=e.getVideoTracks();for(var r=0;r<t.length;r++){const i=t[r];i.enabled=!1,i.stop(),e.removeTrack(i)}}getCameras(){return new Promise(((e,t)=>{if(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices&&navigator.mediaDevices.getUserMedia)this.log("navigator.mediaDevices used"),navigator.mediaDevices.getUserMedia({audio:!1,video:!0}).then((r=>{r.oninactive=e=>this.log("All streams closed"),navigator.mediaDevices.enumerateDevices().then((t=>{const i=[];for(var n=0;n<t.length;n++){const e=t[n];"videoinput"==e.kind&&(/front/i.test(e.label)&&1!=t.length||i.push({id:e.deviceId,label:e.label}))}this.log(`${i.length} results found`),this.closeActiveStreams(r),e(i)})).catch((e=>{t(`${e.name} : ${e.message}`)}))})).catch((e=>{t(`${e.name} : ${e.message}`)}));else if(MediaStreamTrack&&MediaStreamTrack.getSources){this.log("MediaStreamTrack.getSources used");const t=t=>{const r=[];for(var i=0;i!==t.length;++i){const e=t[i];"video"===e.kind&&r.push({id:e.id,label:e.label})}this.log(`${r.length} results found`),e(r)};MediaStreamTrack.getSources(t)}else this.log("unable to query supported devices."),t("unable to query supported devices.")}))}stopScanning(){let{video:e}=this;this._log("stopScanning","video_srcObject:"+!!e?.srcObject),e?.srcObject&&(this.closeActiveStreams(e.srcObject),e.srcObject=null),this.scanning=!1}videoTick({video:e,box:t,canvasCtx:r,canvas:i,cameraId:n}){if(n!=this.selectedCamera?.id)return;let o=()=>{this.qrCode?this.stopScanning():this.stopped||requestAnimationFrame((()=>{this.videoTick({video:e,box:t,canvas:i,canvasCtx:r,cameraId:n})}))};if(this.__render++,1!=this.__render){if(this.__render<this.renderAfter)return o();this.__render=0}if(e.readyState!==e.HAVE_ENOUGH_DATA)return o();r.fillRect(0,0,t.width,t.height),r.drawImage(e,t.offsetX,t.offsetY,t.width,t.height);let s=r.getImageData(0,0,t.width,t.height),a=q(s.data,s.width,s.height,{inversionAttempts:"dontInvert"});if(a){let e=a.location;this.drawLine(r,e.topLeftCorner,e.topRightCorner),this.drawLine(r,e.topRightCorner,e.bottomRightCorner),this.drawLine(r,e.bottomRightCorner,e.bottomLeftCorner),this.drawLine(r,e.bottomLeftCorner,e.topLeftCorner),this.setQRCode(a.data)}this.viewImg.src=i.toDataURL("image/jpeg"),o()}drawLine(e,t,r){e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(r.x,r.y),e.stroke()}onCameraSelect(e){let{selected:t}=e.detail;console.log("selected",t),this.selectedCamera=this.cameras.find((e=>e.id==t))}}X.define("flow-qrcode-scanner");class V extends p.Hc{static get properties(){return{disabled:{type:Boolean,reflect:!0},selected:{type:String},valueAttr:{type:String},toggleable:{type:Boolean}}}static get styles(){return p.iv`
			:host{
				display:inline-block;
				margin: var(--flow-group-btns-margin);
				padding:0px;
				border:1px solid var(--flow-group-btns-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-radius:var(--flow-group-btns-radius, 8px);
				border-width:var(--flow-group-btns-border-width, 1px);
				font-family:var(--flow-group-btns-font-family, var(--flow-font-family, initial));
				font-weight:var(--flow-group-btns-font-weight, var(--flow-font-weight, bold));
				font-size:var(--flow-group-btns-font-size, initial);
				line-height:var(--flow-group-btns-line-height, inherit);
				user-select: none;
				overflow:hidden;
				background-color: var(--flow-group-btns-bg, var(--flow-input-bg, inherit));
			}
			:host([disabled]){
				opacity:0.5;
				cursor:default;
				pointer-events:none;
			}

			:host ::slotted(flow-btn){
				--flow-btn-margin:0px;
				--flow-btn-border-width:0px;
				--flow-btn-radius:0px;
				--flow-btn-wrapper-margin:5px;
				--flow-btn-hover-color:var(--flow-group-btns-active-color-hover, var(--flow-primary-invert-color));
				border-right:var(--flow-group-btns-border-width, 1px) solid var(--flow-group-btns-border-color, var(--flow-primary-color, rgba(0,151,115,1)))
			}

			:host ::slotted(flow-btn.active){
				--flow-btn-bg-color:var(--flow-group-btns-active-bg-color, var(--flow-primary-color));
				--flow-btn-color:var(--flow-group-btns-active-color, var(--flow-primary-invert-color));
				--flow-btn-hover-color:var(--flow-group-btns-active-color-hover, var(--flow-primary-invert-color));
			}

			:host ::slotted(flow-btn:last-child){
				border-right:0px;
			}

			.wrapper{
				display:flex;flex-direction:row;
				align-items:var(--flow-group-btns-align-items, stretch);
				min-width: var(--flow-group-btns-wrapper-min-width, 50px);
				text-align:center;
				justify-content:var(--flow-group-btns-wrapper-justify, initial);
			}
		`}constructor(){super(),this.valueAttr="data-value",this.setAttribute("role","buttons")}render(){return p.dy`
		<div class="wrapper" @click=${this.click}>
			<slot></slot>
		</div>
		`}firstUpdated(){this.listSlot=this.renderRoot.querySelector("slot"),this.updateList()}updated(...e){super.updated(...e),this.updateList()}click(e){if(this.disabled)return;let t=e.target.getAttribute(this.valueAttr);this.toggleable&&this.selected==t&&(t=""),this.log("selected",t),this.selected=t,this.fire("group-btn-select",{el:this,selected:t}),this.updateList()}updateList(){this.listSlot&&this.listSlot.assignedElements().map((e=>{let t=this.selected==e.getAttribute(this.valueAttr);e.classList.toggle("active",t)}))}}V.define("flow-group-btns");class W extends p.Hc{static get properties(){return{disabled:{type:Boolean,reflect:!0},icon:{type:Boolean,reflect:!0},href:{type:String}}}static get styles(){return p.iv`
			:host{
				display:inline-block;
				font-family:var(--flow-font-family, "Julius Sans One");
				font-weight:var(--flow-font-weight, bold);
			}
			:host([disabled]){
				opacity:0.5;
				cursor:default;
				pointer-events:none;
			}
			:host(:not([disabled])){
				cursor:pointer;
			}

			.link-wrapper {
				color: var(--flow-link-color, #017b68);
				display: flex;
			}

			.link-wrapper:hover {
				color: var(--flow-link-hover-color, #017b68);
			}

			.icon-box {
				display: block;
				width: 16px;
				height: 16px;
				margin-bottom: -4px;
				opacity: 0.65;
			}

			.icon-box svg {
				fill: var(--flow-primary-color, #017b68);
				width: 100%;
				height: 100%;
			}

			.content {
				display: block;
			}
		`}constructor(){super()}render(){let e=this.iconPath("external-link-square-alt");return p.dy`
		<div class="link-wrapper" @click=${this.click}>
			<div class="content"><slot></slot></div>
			${this.icon?p.dy`<div class="icon-box"><svg><use href="${e}"></use></svg></div>`:""}
		</div>
		`}click(){this.fire("flow-shell-link-click",{el:this}),console.log("opening href:",this.href),require("nw.gui").Shell.openExternal(this.href)}}W.define("flow-shell-link");class Q extends p.Hc{static get properties(){return{disabled:{type:Boolean,reflect:!0},icon:{type:String},url:{type:String},id:{type:String},title:{type:String},width:{type:Number},height:{type:Number},resizable:{type:Boolean},frame:{type:Boolean},transparent:{type:Boolean},fullscreen:{type:Boolean},min_width:{type:Number},min_height:{type:Number},max_width:{type:Number},max_height:{type:Number},as_desktop:{type:Boolean},always_on_top:{type:Boolean},visible_on_all_workspaces:{type:Boolean},new_instance:{type:Boolean}}}static get styles(){return p.iv`
			:host{
				display:inline-block;
				font-family:var(--flow-font-family, "Open Sans");
				font-weight:var(--flow-font-weight, normal);
			}
			:host([disabled]){
				opacity:0.5;
				cursor:default;
				pointer-events:none;
			}
			:host(:not([disabled])){
				cursor:pointer;
			}

			.link-wrapper {
				color: var(--flow-link-color, #017b68);
				display: flex;
			}

			.link-wrapper:hover {
				color: var(--flow-link-hover-color, #017b68);
			}
/*
			.icon-box {
				display: block;
				width: 16px;
				height: 16px;
				margin-bottom: -4px;
				opacity: 0.65;
			}

			.icon-box svg {
				fill: var(--flow-primary-color, #017b68);
				width: 100%;
				height: 100%;
			}
*/
			.content {
				display: block;
			}
		`}constructor(){super(),this.width=1024,this.height=768,this.resizable=!0,this.frame=!0,this.transparent=!1,this.fullscreen=!1,this.icon=void 0,this.min_width=void 0,this.min_height=void 0,this.max_width=void 0,this.max_height=void 0,this.as_desktop=!1,this.always_on_top=!1,this.visible_on_all_workspaces=!1,this.new_instance=void 0,this.show=!0,this.url="",window.flow||(window.flow={}),window.flow["flow-window-link"]||(window.flow["flow-window-link"]={windows:[]})}render(){return p.dy`
		<div class="link-wrapper" @click=${this.click}>
			<div class="content"><slot></slot></div>
		</div>
			`}click(){this.fire("flow-window-link-click",{el:this}),console.log("opening url:",this.url);const{id:e,title:t,width:r,height:i,resizable:n,frame:o,transparent:s,show:a,fullscreen:c,icon:l,min_width:u,min_height:h,max_width:d,max_height:f,as_desktop:p,always_on_top:g,visible_on_all_workspaces:m,new_instance:b}=this;let v={id:e,title:t,width:r,height:i,resizable:n,frame:o,transparent:s,show:a,fullscreen:c,icon:l,min_width:u,min_height:h,max_width:d,max_height:f,always_on_top:g,new_instance:b};this.url&&"undefined"!=typeof nw&&nw.Window.open(this.url,v,((e,t)=>{e.window.appOrigin=location.origin,window.flow["flow-window-link"].windows.push(e)}))}}Q.define("flow-window-link");class G extends p.Hc{static get properties(){return{color:String,src:String,style:String,css:String,size:Number,w:Number,h:Number,icon:String}}static get styles(){return p.iv`
		:host {
			display: inline-block;
			padding: var(--fa-icon-padding, 0px);
			margin: var(--fa-icon-margin, 0px);
			width: var(--fa-icon-size, 19px);
			height: var(--fa-icon-size, 19px);
		}
		svg,img{
			width: var(--fa-icon-size, 19px);
			height: var(--fa-icon-size, 19px);
			fill: var(--fa-icon-color);
		}
		img{object-fit:contain;}
		`}constructor(){super(),this.src="",this.style="",this.css="",this.color=""}firstUpdated(){}render(){this.src=this.iconPath(this.icon);let{size:e,color:t,w:r,h:i}=this;r=r||e?`width:${r||e}px;`:"",i=i||e?`height:${i||e}px;`:"",t=t?`fill:${t};`:"";let n=this.src.split(/\?#/)[0].split(".").pop().toLowerCase();return["png","jpeg","jpg"].includes(n)?p.dy`<img style="${r}${i}${t}${this.css||""}" src="${this.src}" />`:p.dy`
		<svg style="${r}${i}${t}${this.style}"><use href="${this.src}"></use></svg>
		`}}G.define("fa-icon");class Y extends p.Hc{static get properties(){return{}}static get styles(){return p.iv`
			
			:host([hidden]){display:none;}
			.d3-holder{
				min-height:100px;
				min-width:100px;
				display:flex;
				flex-direction:column;
				box-sizing:border-box;
				position:relative;
				user-select: none;      
			}
            
            #d3 {flex:1;overflow:hidden}
		`}constructor(){super()}render(){return p.dy`<div id="d3"></div>`}firstUpdated(){this.el_d3=this.renderRoot.getElementById("d3"),this.el_d3?this._firstUpdated():this.debounce("_firstUpdated",(()=>{this._firstUpdated()}),500)}_firstUpdated(){this.el_d3=this.renderRoot.getElementById("d3"),this.el_d3&&(this.el_d3Rect=this.getBoundingClientRect.call(this.el_d3),this.el_d3.getBoundingClientRect=()=>(0==this.el_d3Rect.width&&0==this.el_d3Rect.height&&(this.el_d3Rect=this.getBoundingClientRect.call(this.el_d3)),this.el_d3Rect),this.init_d3())}init_d3(){this.svg=d3.select(this.el_d3).append("svg"),this.svg.attr("width",this.svgWidth||"100%"),this.svg.attr("height",this.svgHeight||"100%"),this.svg.attr("preserveAspectRatio",this.svgPreserveAspectRatio||"xMidYMid meet"),this.el=this.svg.append("g"),this.el.transform=d3.zoomIdentity.translate(0,0).scale(1),this.updateSVGSize(),this.fire("ready",{})}onElementResize(){this.el_d3&&(this.el_d3Rect=this.getBoundingClientRect.call(this.el_d3)),this.updateSVGSize()}connectedCallback(){super.connectedCallback(),this.__resizeObserver||(this.__resizeObserver=new ResizeObserver((()=>{this.onElementResize()})),this.__resizeObserver.observe(this))}disconnectedCallback(){super.disconnectedCallback(),this.__resizeObserver&&(this.__resizeObserver.unobserve(this),this.__resizeObserver.disconnect(),delete this.__resizeObserver)}updateSVGSize(){if(!this.el_d3)return;let{width:e,height:t}=this.el_d3.getBoundingClientRect();this.svg.attr("viewBox",this.svgViewBox||[0,0,e,t]),this.draw()}draw(){}}p.ls.samplers||(p.ls.samplers={inst:{},sinks:[],get:(e,t)=>{let r=p.ls.samplers.inst[e];return r||(r=p.ls.samplers.inst[e]=new Z(e,t)),r},registerSink:e=>{p.ls.samplers.sinks.push(e)},unregisterSink:e=>{let t=p.ls.samplers.sinks.indexOf(e);t>=0&&p.ls.samplers.sinks.splice(t,1)}});class Z{static get(...e){return p.ls.samplers.get(...e)}constructor(e,t={}){if(this.ident=e,!this.ident)throw new Error("fatal: FlowSampler::constructor() missing options.ident");this.options=t,this.generator=this.options.generator,this.data=[],this.eventHandlers=new Map,this.eventHandlers.set("data",new Map),this.options.interval&&this.start()}async start(){if(this.running)return Promise.reject("already running");const{interval:e}=options;this.interval=setInterval(this.poller.bind(this),e),this.running=!0}stop(){this.interval&&(clearInterval(this.interval),delete this.interval),this.running=!1}poll(e){this.generator=e}poller(){this.generator?"function"==typeof this.generator?this.generator(ts,lastTS):console.error("FlowSampler::poller() generator must be a function"):console.error("FlowSampler::poller() missing generator")}put(e){const{ident:t,data:r,options:i,sinks:n}=this,o=new Date;r.push({date:o,value:e});let s=i.maxSamples||300;for(;r.length>s;)r.shift();this.fire("data",{ident:t,data:r}),p.ls.samplers.sinks.forEach((r=>{r(t,e,o)}))}lastEntry(){if(this.data.length)return this.data[this.data.length-1]}last(e){return this.data.length?this.data[this.data.length-1].value:e}first(e=void 0){return this.data.length?this.data[0].value:e}fire(e,t={}){let r=new CustomEvent(`flow-sampler-${e}-${this.ident}`,{detail:t});document.body.dispatchEvent(r);let i=this.eventHandlers.get(e);i&&i.forEach(((e,r)=>{r({data:t})}))}on(e,t){let r=this.eventHandlers.get(e);r&&r.set(t,1)}off(e,t){let r=this.eventHandlers.get(e);r&&r.delete(t)}}class J extends p.Hc{static get properties(){return{disabled:{type:Boolean,reflect:!0},title:{type:String},prefix:{type:String},suffix:{type:String},align:{type:String}}}static get styles(){return p.iv`
			:host{
				display:inline-block;
				font-weight:bold;
				font-size:13px;
				text-transform:uppercase;
				cursor:pointer;
				font-family:var(--flow-data-badge-font-family, "Julius Sans One");
				font-weight:var(--flow-data-badge-font-weight, bold);
				width:var(--flow-data-badge-width);
				min-width:var(--flow-data-badge-min-width);
				max-width:var(--flow-data-badge-max-width);
				margin:var(--flow-data-badge-margin);
			}
			:host([disabled]){opacity:0.5;cursor:default;pointer-events:none;}
			.colon{display:none}
			:host(.has-colon) .colon{display:inline;}
			.container{
				white-space: nowrap;
				border: var(--flow-data-badge-container-border, 2px) solid var(--flow-primary-color,#333);
				background-color:var(--flow-data-badge-bg, inherit);
				xdisplay:flex;xflex-firection:column;xalign-items:center;
				padding:var(--flow-data-badge-container-padding,2px 6px);
				margin: var(--flow-data-badge-container-margin, 6px);
				box-shadow:var(--flow-data-badge-container-box-shadow, 2px 2px 1px rgba(1, 123, 104, 0.1));
				border-radius:var(--flow-data-badge-container-border-radius, 10px);

			}
			.container>div{padding:2px;}
			.title{
				text-align:left; 
				opacity:var(--flow-data-badge-title-opacity,1);
				xmargin-top:7px; 
				font-size: var(--flow-data-badge-title-font-size, 10px); 
				color:var(--flow-data-badge-caption);
				xtext-shadow: 0px 0px 0px var(--flow-data-badge-caption-shadow, #fff); }
			.value{
				text-align:right;opacity:1;
				font-size:var(--flow-data-badge-value-font-size,14px);
				font-family:var(--flow-data-badge-value-font-family,"Exo 2");
				font-weight:var(--flow-data-badge-value-font-weight,normal);
				
			}
			.prefix{opacity:0.9;margin-right:3px;margin-top:3px; font-size: 10px; }
			.suffix{opacity:0.9;margin-left:3px;margin-top:3px; font-size: 10px; }
			.col { display: flex; flex-direction: column; align-items: left; }
			.row { display: flex; flex-direction: row; color: var(--flow-data-field-value,#333); }
		`}render(){return p.dy`<div class="container col">
			<div class="title">${this.title}<span class="colon">:</span></div>
			<div class="row">
				${this.align&&"right"!=this.align?"":p.dy`<div style="flex:1;"></div>`}
				<div class="prefix">${this.prefix}</div>
				<div class="value"><slot></slot></div>
				<div class="suffix">${this.suffix}</div>
				${"left"==this.align?p.dy`<div style="flex:1;"></div>`:""}
			</div>
		</div>`}}J.define("flow-data-badge"),class extends Y{static get properties(){return{disabled:{type:Boolean,reflect:!0},title:{type:String},prefix:{type:String},suffix:{type:String},align:{type:String},value:{type:Number},sampler:{type:String},type:{type:String},range:{type:Number}}}static get styles(){return[Y.styles,p.iv`
			:host{
				display:inline-flex;
				font-weight:bold;
				font-size:13px;
				text-transform:uppercase;
				cursor:pointer;
				font-family:var(--flow-data-badge-font-family, "Julius Sans One");
				font-weight:var(--flow-data-badge-font-weight, bold);
				border-radius: 10px;
				overflow: hidden;

				/*width:300px;height:300px;*/
			}
			:host([disabled]){opacity:0.5;cursor:default;pointer-events:none;}
			.colon{display:none}
			:host(.has-colon) .colon{display:inline;}

			:host([.large]) { 
			}

			.container{
				white-space: nowrap;
				xdisplay:flex;xflex-firection:column;xalign-items:center;
				padding:2px 6px;
				/*min-height: inherit;*/
			}
			.container>div{padding:2px;}
			.title{flex:1; text-align:left; opacity:1;xmargin-top:7px; font-size: 10px; color: var(--flow-data-badge-caption); xtext-shadow: 0px 0px 0px var(--flow-data-badge-caption-shadow, #fff); }
			.value{text-align:right; opacity:1;font-size:14px;font-family:"Exo 2";font-weight:normal;}
			.prefix{opacity:0.9;margin-right:3px;margin-top:3px; font-size: 10px; }
			.suffix{opacity:0.9;margin-left:3px;margin-top:3px; font-size: 10px; }
			.col { display: flex; flex-direction: column; align-items: left;  }
			.row { display: flex; flex-direction: row; flex:0; color: var(--flow-data-field-value,#333); }


			.wrapper {
				/*width:100%;height:100%;*/
				position:relative;
				flex:1;
				margin:6px;overflow:hidden;
				border: 2px solid var(--flow-primary-color,#333);
				box-shadow: 2px 2px 1px rgba(1, 123, 104, 0.1);
				border-radius: 10px;
				/*
				min-width: var(--flow-data-badge-graph-width,240px);
				min-height: var(--flow-data-badge-graph-height,80px);				
				*/				
			}
			.wrapper > div {
				width:100%;height:100%;
				position:relative;left:0px;top:0px;bottom:0px;right:0px;
				/*display: flex;
				flex-direction: column;*/
				/*min-height: inherit;*/
			}

			.d3-holder{
				min-height:10px;
				min-width:10px;
				opacity:1;
				border-radius:10px;
				/*border: 1px solid red;*/
				/*margin: 0px -5px 0px -1px;
				z-index: 100;*/
			}

			.wrapper>div.d3-holder{position:absolute;}

		`]}constructor(){super(),this.range=300,this.refresh=1e3,this.svgPreserveAspectRatio="xMaxYMax meet"}connectedCallback(){super.connectedCallback(),this.sampler&&(this.interval=setInterval(this.draw.bind(this),this.refresh))}disconnectedCallback(){super.disconnectedCallback(),this.interval&&clearInterval(this.interval),this._draw&&(Z.get(this.sampler||"test-sampler").off("data",this._draw),this._draw=null)}onElementResize(){super.onElementResize(),(0,p.Kg)((()=>{this.draw()}))}render(){return(0,p.Kg)((()=>{this.draw()})),p.dy`
		<div class='wrapper'>
			<div class="d3-holder">${super.render()}</div>
			<div>
				<div class="container col">
					<div class="title">${this.title}<span class="colon">:</span></div>
					<div class="row">
						${this.align&&"right"!=this.align?"":p.dy`<div style="flex:1;"></div>`}
						<div class="prefix">${this.prefix}</div>
						<div class="value"><slot></slot></div>
						<div class="suffix">${this.suffix}</div>
						${"left"==this.align?p.dy`<div style="flex:1;"></div>`:""}
					</div>
				</div>
			</div>
		</div>
		`}getMargin(){return{bottom:0,top:0,left:0,right:0}}draw(){if(!this.sampler)return;let e=Z.get(this.sampler||"test-sampler");this._draw||(this._draw=this.draw.bind(this),e.on("data",this._draw));const{data:t}=e;this.redraw(t)}redraw(e){let t=this.getMargin(),{height:r,width:i}=this.el_d3.getBoundingClientRect(),[n,o]=d3.extent(e,(e=>e.date));n=o-1e3*this.range;const s=d3.scaleUtc().domain([n,o]).range([t.left,i-t.right]),a=d3.scaleLinear().domain(d3.extent(e,(e=>e.value))).range([r-t.bottom,t.top]),c=d3.area().curve(d3.curveLinear).x((e=>s(e.date))).y0(a(0)).y1((e=>a(e.value))),{el:l}=this;this.path||(this.path=l.append("path").attr("transform",`translate(${t.left},0)`).attr("stroke-opacity","var(--flow-data-badge-graph-stroke-opacity, 1.0)").attr("stroke-linejoin","round").attr("stroke-linecap","round").attr("stroke-width","var(--flow-data-badge-graph-stroke-width, 0)").attr("fill","var(--flow-data-badge-graph-fill, steelblue)").attr("stroke","var(--flow-data-badge-graph-stroke, #000)")),this.path.datum(e).attr("d",c)}}.define("flow-data-badge-graph");class ee extends p.Hc{static get properties(){return{disabled:{type:Boolean,reflect:!0},heading:{type:String},btns:{type:Array},body:{type:Object},hideCloseBtn:{type:Boolean},compact:{type:Boolean}}}static buildArgs(...e){let t=e.shift(),r=e[e.length-1];return"string"==typeof t&&(t={title:t,body:e.shift(),cls:e.shift(),btns:e.shift(),modal:e.shift()}),t.handler=t.handler||t.callback,t.modal=!1!==t.modal,t.handler||"function"!=typeof r||(t.handler=r),t}static getHandler(e,t){let{btns:r,handler:i}=t;if(!e||!r||!r.length)return i;let n=r.find((t=>((t.value||t.text)+"").toLowerCase()==e));return n&&(n.handler||n.callback)||i}static _show(e){let{btns:t,body:r,title:i,modal:n,cls:o,hideCloseBtn:s,compact:a,alignTo:c}=e,{autoClose:l}=e,u=document.createElement("flow-dialog"),h=new Promise(((h,d)=>{let f=!1,p=e=>{if(f)return void m();let t=e.target;(t&&t.closest&&t.closest("flow-dialog"))!=u&&(m(),u.destroy())},g=e=>{u._isPolyfill&&dialogPolyfill.reposition(u.dialog)},m=()=>{window.removeEventListener("click",p),window.removeEventListener("resize",g)},b=e=>{f||(f=!0,u.remove(),u.removeEventListener("btn-click",v),m(),h(e))},v=t=>{let r=t.detail,{btn:i}=r,n=this.getHandler(i,e);if(n)return n(b,r,u,i,t);u.resolve(r)};u.resolve=b,u.addEventListener("btn-click",v),o&&u.classList.add(...o.split(" ")),t&&(u.btns=t),r&&(u.body=r),i&&(u.heading=i),s&&(u.hideCloseBtn=!0),a&&(u.compact=!0),c&&this.alignTo(c,u,e),document.body.append(u),setTimeout((()=>{n?u.showModal():u.show(),l&&window.addEventListener("click",p),window.addEventListener("resize",g)}),100)}));return h.dialog=u,h}static alignTo(e,t,r){let{vOffset:i=0,hOffset:n=0,targetPos:o="left-bottom",dialogPos:s="left-top"}=r,a=e.getBoundingClientRect(),c=t.getBoundingClientRect(),l=t.style,[u,h]=o.split("-"),[d,f]=s.split("-"),p="left"==d?"right":"left";l["top"==f?"bottom":"top"]="unset",l[p]="unset";let g=()=>{l[d]=a[u]+n+"px",l[f]=a[h]+i+"px"};g(),t.addEventListener("updated",(e=>{let{dialog:t}=e.detail;c=t.getBoundingClientRect(),l=t.style,g()}))}static alert(...e){return(e=this.buildArgs(...e)).btns||(e.btns=["Ok:primary"]),this._show(e)}static show(...e){return this._show(this.buildArgs(...e))}static confirm(...e){return(e=this.buildArgs(...e)).btns||(e.btns=["Cancel","Yes:danger"]),this._show(e)}createRenderRoot(){return this}render(){return p.dy`<dialog @close=${this.onDialogClose} ?compact=${this.compact}>
			<div class="heading" ?hide=${!this.heading}>${this.heading}</div>
			<span class="close-btn" title="Close" ?hide=${this.hideCloseBtn}
				@click="${this.onCloseClick}">&times;</span>
			<div class="body">
				${this.renderBody()}
			</div>
			<div class="buttons" @click=${this.onBtnClick} ?hide=${!this.btns||!this.btns.length}>
				${this.renderBtns()}
			</div>
		</dialog>`}renderBody(){return this.body||""}renderBtns(){let e,t,r;return(this.btns||["Ok"]).map((i=>{if("string"==typeof i){let[n,o,s]=i.split(":");t=n,e=s||t,r=o||""}else t=i.text,e=i.value||t,r=i.cls||"";return p.dy`<flow-btn 
				class="${r}" 
				value="${(e+"").toLowerCase()}">${t}</flow-btn>`}))}firstUpdated(){this.dialog=this.renderRoot.querySelector("dialog"),this._isPolyfill=!this.dialog.showModal,dialogPolyfill.registerDialog(this.dialog),this._show&&this[this._show]()}updated(){super.updated(),this.dispatchEvent(new CustomEvent("updated",{detail:{dialog:this.dialog},bubbles:!0}))}show(){if(this.dialog)return this.dialog.show();this._show="show"}showModal(){if(this.dialog)return this.dialog.showModal();this._show="showModal"}close(){this._show=!1,this.dialog&&this.dialog.close()}destroy(){this.close(),this.remove()}onCloseClick(){if(this.resolve)return this.resolve({btn:"close"});this.destroy()}onDialogClose(e){if(!this.autoClose&&this._show)return void this[this._show]();let t={e};this.dispatchEvent(new CustomEvent("closed",{detail:t}))}onBtnClick(e){let t=e.target.closest("flow-btn"),r=t?.getAttribute("value");if(!r)return;let i,n=[...this.renderRoot.querySelectorAll(".input, flow-input, flow-checkbox, input, textarea, select,flow-menu")],o={};n.forEach((e=>{i=e.name||e.getAttribute("name")||e.getAttribute("data-name"),o[i]=e.value}));let s={btn:r,values:o};this.dispatchEvent(new CustomEvent("btn-click",{detail:s}))}}window.FlowDialog=ee,ee.define("flow-dialog",[()=>window.dialogPolyfill?null:p.FH+"resources/extern/dialog/dialog-polyfill.css",()=>window.dialogPolyfill?null:p.FH+"/resources/extern/dialog/dialog-polyfill.js"]);let te=p.iv`
	flow-pages>h1,
	flow-pages>.title{
	    padding:10px;
	    font-size:2rem;
	}
	flow-pages .buttons{margin:10px;display:flex;justify-content:flex-end;z-index:10}
	flow-pages .buttons .flex{flex:1;}
	flow-pages .buttons flow-btn{margin:0px 5px;padding:5px 5px;user-select:none;}
	flow-pages .buttons flow-btn svg{
	    width:20px;
	    height:20px;
	    margin-right:10px;
	    fill:var(--flow-primary-color, rgba(0,151,115,1.0));
	    pointer-events:none;
	}
	flow-pages .buttons flow-btn span+svg{
	    margin-left:10px;
	    margin-right:0px;
	}
`,re=document.head.querySelector("style.flow-pages-style")||document.createElement("style");re.innerHTML=te.toString(),re.classList.add("flow-pages-style"),re.parentNode||document.head.insertBefore(re,document.head.querySelector('link[href*="flow-ux.css"], :last-child').nextSibling);class ie extends p.Hc{static get properties(){return{pages:{type:Array},index:{type:Number},dotoffset:{type:Number}}}static get styles(){return p.iv`
			:host{
				display:flex;
				flex-direction:column;
			}

			.wrapper{
				flex:1;
				position:relative;
			}

			.wrapper ::slotted(flow-page){
				background-color:var(--flow-background-color, #FFF);
				position:absolute;
				left:0px;
				top:0px;
				width:100%;
				height:100%;
				z-index:1;
				opacity:0;
				transition:opacity 1s ease;
			}
			.wrapper ::slotted(flow-page.back),
			.wrapper ::slotted(flow-page.active){
				z-index:3;
				opacity:1;
			}

			.dots{
				pointer-events: none;
				z-index:5;
				position:absolute;bottom:10px;
				display:none;
				justify-content:center;
				width:100%;
			}
			:host(.has-dots) .dots{
				display:flex;
			}
			.dots i{
				display:block;width:10px;height:10px;background-color:#FFF;
				box-shadow:var(--flow-pages-dots-box-shadow, var(--flow-box-shadow));
				margin:4px;
				border:2px solid var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-radius:50%;
			}

			.dots i.active{
				background-color:var(--flow-primary-color, rgba(0,151,115,1));
				border-color:var(--flow-active-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
			}

			.dots i:not(.active){cursor:pointer;}


			.buttons flow-btn {
				align-items:center;
				display:flex;
			}


		`}render(){let e=new Array((this.pages||[]).length).fill(0);e.length&&(e[this.index||0]=1);let t="";return this.dotoffset&&(t=`bottom: -${this.dotoffset}px`),p.dy`
		<slot name="title"></slot>
		<div class="wrapper">
			<slot></slot>
			<div class="dots" style="${t}" @click="${this.onDotsClick}">${e.map(((e,t)=>p.dy`<i data-index="${t}" class="${e?"active":""}"></i>`))}</div>
		</div>
		
		<div @click="${this.onButtonClick}">
			<slot name="buttons"></slot>
		</div>
		`}firstUpdated(){this.wrapper=this.renderRoot.querySelector(".wrapper"),this.buttons=this.renderRoot.querySelector(".buttons");let e=this.shadowRoot.querySelector('slot[name="buttons"]');this.btns={},e.addEventListener("slotchange",(t=>{this.updateBtns(e.assignedNodes())})),this.updateBtns(e.assignedNodes());let t=this.querySelectorAll("flow-page");this.initiPages(t)}updateBtns(e){[...e].forEach((e=>{e.querySelectorAll("[data-btn]").forEach((e=>{let t=e.getAttribute("data-btn");t&&(this.btns[t]=e)}))}))}get nextBtn(){return this.btns.next}get prevBtn(){return this.btns.prev}get skipBtn(){return this.btns.skip}initiPages(e){this.pages=[...e],this.maxIndex=this.pages.length-1;let t=this.pages.findIndex((e=>e.classList.contains("active")));this.setActive(t)}onDotsClick(e){let t=e.target,r=parseInt(t.getAttribute("data-index"));isNaN(r)||this.setActive(r)}onButtonClick(e){let t={next:"showNext",prev:"showPrevious"},r=e.target.closest("flow-btn");if(!r)return;let i=r.getAttribute("data-action");if(!i){let e=r.getAttribute("data-btn");i=e&&t[e]}i&&this[i]&&this[i]()}showPrevious(){this.setActive(this.index-1)}showNext(){this.setActive(this.index+1)}closePages(){this.fire("close-pages")}setActive(e){if(e<0)e=0;else if(e>this.maxIndex)return void this.closePages();let t=this.getPage(e);if(!t)return;if(this.lastIndex=this.index,this.index=e,this.index===this.lastIndex)return;let r=this.getPage(this.lastIndex);r&&(r.classList.remove("active"),r.style.zIndex=2),t.classList.add("active"),t.style.zIndex=3;let i=this.prevBtn,n=this.nextBtn,o=this.skipBtn,s=n?.querySelector("span");i&&(e<=0?i.setAttribute("disabled",!0):i.removeAttribute("disabled"),s&&(s.innerText="NEXT"),o.style.display="block"),n&&(e>=this.maxIndex?(o.style.display="none",s&&(s.innerText="FINISH")):n.removeAttribute("disabled")),this.fireChangeEvent()}getPage(e){return this.pages[e]}fireChangeEvent(){this.fire("change",{index:this.index})}}ie.define("flow-pages");class ne extends p.Hc{static get properties(){return{lang:{type:String},fixindent:{type:Boolean},theme:{type:String}}}static get styles(){return p.iv`

			.pln{
				color:var(--flow-code-pln, #000);
			}
			@media screen{
				.str{color:var(--flow-code-str, #080)}
				.kwd{color:var(--flow-code-kwd, #008)}
				.com{color:var(--flow-code-com, #800)}
				.typ{color:var(--flow-code-typ, #606)}
				.lit{color:var(--flow-code-lit, #066)}
				.opn{color:var(--flow-code-opn, #660)}
				.clo{color:var(--flow-code-clo, #660)}
				.pun{color:var(--flow-code-pun, #660)}
				.tag{color:var(--flow-code-tag, #008)}
				.atn{color:var(--flow-code-atn, #606)}
				.atv{color:var(--flow-code-atv, #080)}
				.dec{color:var(--flow-code-dec, #606)}
				.var{color:var(--flow-code-var, #606)}
				.fun{color:var(--flow-code-fun, red)}
			}
			@media print,projection{
				.kwd,.tag,
				.typ{font-weight:var(--flow-code-print-tag-font-weight, 700)}
				.str{color:var(--flow-code-print-str, #060)}
				.kwd{color:var(--flow-code-print-kwd, #006)}
				.com{
					color:var(--flow-code-print-com, #600);
					font-style:var(--flow-code-print-com-font-style, italic)
				}
				.typ{color:var(--flow-code-print-typ, #404)}
				.lit{color:var(--flow-code-print-lit, #044)}
				.opn{color:var(--flow-code-print-opn, #440)}
				.clo{color:var(--flow-code-print-clo, #440)}
				.pun{color:var(--flow-code-print-pun, #440)}
				.tag{color:var(--flow-code-print-tag, #006)}
				.atn{color:var(--flow-code-print-atn, #404)}
				.atv{color:var(--flow-code-print-atv, #060)}
			}
			pre{
				background:var(--flow-code-pre-bg);
			}
			pre.prettyprint{padding:2px;}
			ol.linenums{
				margin-top:var(--flow-code-linenums-margin-top, 0);
				margin-bottom:var(--flow-code-linenums-margin-bottom, 0);
				color:var(--flow-code-linenums-color, inherit);
			}
			li.L0,li.L1,li.L2,li.L3,li.L4,li.L5,li.L6,li.L7,li.L8,li.L9{
				list-style-type:none;
				padding-left:var(--flow-code-lines-padding-left, 0);
				background-color:var(--flow-code-lines-bg, initial);
			}
			li.L1,li.L3,li.L5,li.L7,li.L9{
				background:var(--flow-code-odd-line-bg, #eee)
			}

			pre{
				margin:0px;
				white-space:var(--flow-code-white-space, nowrap);
				font-family:var(--flow-code-font-family, monospace);
				font-size:var(--flow-code-font-size, 1rem);
				padding:var(--flow-code-pre-padding, 0px 0px 16px);
			}

			:host{
				display:inline-block;max-width:100%;box-sizing: border-box;
				overflow:auto;
				padding:var(--flow-code-padding, 5px);
				margin:var(--flow-code-margin, 1px);
				border:var(--flow-code-border, none);
				background:var(--flow-code-pre-bg);
			}

			:host(.block),
			:host([block]){display:block}
			:host(.hide){display:none}

			/*:host(:not(.no-border):not([no-border])){*/
			:host(.border, [border]){
				border:2px solid var(--flow-primary-color);
			}


			/* hemisu-light */
			/*
			pre.theme-hemisu-light{
				font-family:Menlo,Bitstream Vera Sans Mono,DejaVu Sans Mono,Monaco,Consolas,monospace;
				border:0!important
			}
			*/
			.theme-hemisu-light{
				--flow-code-pre-bg:#fff;
				--flow-code-lines-bg:#fff;
				--flow-code-pln:#111;
				--flow-code-linenums-color:#999;

				--flow-code-lines-padding-left:1em;
				--flow-code-linenums-margin-top:0;
				--flow-code-linenums-margin-bottom:0;

				--flow-code-str:#739200;
				--flow-code-kwd:#739200;
				--flow-code-com:#999;
				--flow-code-typ:#f05;
				--flow-code-lit:#538192;
				--flow-code-pun:#111;
				--flow-code-opn:#111;
				--flow-code-clo:#111;
				--flow-code-tag:#111;
				--flow-code-atn:#739200;
				--flow-code-atv:#f05;
				--flow-code-dec:#111;
				--flow-code-var:#111;
				--flow-code-fun:#538192;
			}


			.theme-hemisu-dark{
				--flow-code-pre-bg:#000000;
				--flow-code-lines-bg:#000000;
				--flow-code-pln:#EEEEEE;
				--flow-code-linenums-color:#777777;

				--flow-code-lines-padding-left:1em;
				--flow-code-linenums-margin-top:0;
				--flow-code-linenums-margin-bottom:0;

				--flow-code-str:#B1D631;
				--flow-code-kwd:#B1D631;
				--flow-code-com:#777777;
				--flow-code-typ:#BBFFAA;
				--flow-code-lit:#9FD3E6;
				--flow-code-pun:#EEEEEE;
				--flow-code-opn:#EEEEEE;
				--flow-code-clo:#EEEEEE;
				--flow-code-tag:#EEEEEE;
				--flow-code-atn:#B1D631;
				--flow-code-atv:#BBFFAA;
				--flow-code-dec:#EEEEEE;
				--flow-code-var:#EEEEEE;
				--flow-code-fun:#9FD3E6;
			}

			.theme-atelier-lakeside-dark{
				--flow-code-pre-bg:#161b1d;
				--flow-code-lines-bg:#161b1d;
				--flow-code-pln:#ebf8ff;
				--flow-code-linenums-color:#5a7b8c;

				--flow-code-lines-padding-left:1em;
				--flow-code-linenums-margin-top:0;
				--flow-code-linenums-margin-bottom:0;

				--flow-code-str:#568c3b;
				--flow-code-kwd:#6b6bb8;
				--flow-code-com:#6b6bb8;
				--flow-code-typ:#257fad;
				--flow-code-lit:#935c25;
				--flow-code-pun:#ebf8ff;
				--flow-code-opn:#ebf8ff;
				--flow-code-clo:#ebf8ff;
				--flow-code-tag:#d22d72;
				--flow-code-atn:#935c25;
				--flow-code-atv:#2d8f6f;
				--flow-code-dec:#935c25;
				--flow-code-var:#d22d72;
				--flow-code-fun:#257fad;
			}

			.theme-atelier-lakeside-light{
				--flow-code-pre-bg:#ebf8ff;
				--flow-code-lines-bg:#ebf8ff;
				--flow-code-pln:#161b1d;
				--flow-code-linenums-color:#7195a8;

				--flow-code-lines-padding-left:1em;
				--flow-code-linenums-margin-top:0;
				--flow-code-linenums-margin-bottom:0;

				--flow-code-str:#568c3b;
				--flow-code-kwd:#6b6bb8;
				--flow-code-com:#7195a8;
				--flow-code-typ:#257fad;
				--flow-code-lit:#935c25;
				--flow-code-pun:#161b1d;
				--flow-code-opn:#161b1d;
				--flow-code-clo:#161b1d;
				--flow-code-tag:#d22d72;
				--flow-code-atn:#935c25;
				--flow-code-atv:#2d8f6f;
				--flow-code-dec:#935c25;
				--flow-code-var:#d22d72;
				--flow-code-fun:#257fad;
			}

		`}constructor(){super(),this.lang="html"}render(){if(!this.innerHTML_){let e=this.querySelector("textarea"),t=e?e.value:this.innerHTML;if(this.fixindent){t=t.split("\n");let e=t[0],r=0,i=!0;for(;i;)/^\t/.test(e)?(r++,e=e.substring(1)):/^    /.test(e)?(r++,e=e.substring(4)):i=!1;if(r>0){let e=`^(\t|    ){1,${r}}`;e=new RegExp(e),t=t.map((t=>t.replace(e,""))).join("\n")}else t=t.join("\n")}this.innerHTML_=t}let e=this.theme?" theme-"+this.theme:"";return p.dy`<pre class="lang-${this.lang}${e}">${this.innerHTML_}</pre>`}htmlEscape(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}updated(){this.updateStyle()}updateStyle(){if(!window.PR){if(this.count||(this.count=0),this.count++,this.count>1e3)return;return setTimeout((()=>this.updateStyle()),100)}let e=this.renderRoot.querySelector("pre"),t=PR.prettyPrintOne(this.htmlEscape(this.innerHTML_));this.code!=t&&(this.code=t,e.innerHTML=t)}}ne.define("flow-code",[p.FH+"resources/extern/google-prettify/prettify.js"]);class oe extends p.Hc{constructor(){super(),this.canvasScale=.75}getPixelRatio(){const e=this.canvas.getContext("2d");return(window.devicePixelRatio||1)/(e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||e.backingStorePixelRatio||1)*2}setHiDPICanvas(e,t,r){const i=this.canvas;let n=e,o=t;i.width=n*r,i.height=o*r,i.getContext("2d").setTransform(r,0,0,r,0,0)}updateCanvas(){if(!this.canvas)return;this.getBoundingClientRect();let e=this.canvas.getBoundingClientRect(),{width:t,height:r}=e;this.PIXEL_RATIO=this.getPixelRatio(),this.setHiDPICanvas(t*this.canvasScale,r*this.canvasScale,this.PIXEL_RATIO),this.redraw(this.canvasContext2d,e)}get htmlCanvasElement(){let e=this.getBoundingClientRect();return p.dy`<canvas id="canvas" style="height:100%;width:100%;" width="${e.width*this.canvasScale}" height="${e.height*this.canvasScale}">Your browser does not support the HTML5 canvas tag</canvas>`}firstUpdated(){window.ResizeObserver&&(this.resizeObserver=new ResizeObserver((e=>{this.fire("flow-canvas-resize",{},{bubbles:!0})})),this.resizeObserver.observe(this)),["mousedown","mouseup","mousemove","click","pointerdown","pointerup","pointermove","mouseenter","mouseleave"].forEach((e=>{this.addEventListener(e,(t=>{this.onMouseEvent(e,t)}))})),this.addEventListener("flow-canvas-resize",(e=>{this.debounce("flow-canvas-resize",this.handleResize.bind(this),100)})),this.canvas=this.renderRoot.getElementById("canvas"),this.canvasContext2d=this.canvas.getContext("2d"),this.ctx.globalAlpha=0,this.updateCanvas()}handleResize(){this.updateCanvas()}redraw(e,t){throw new Error("BaseCanvasElement::redraw() - missing implementation!")}}(class extends oe{static get properties(){return{min:{type:Number},max:{type:Number},vertical:{type:Boolean},color:{type:Object,reflect:!0},channel:{type:String}}}static get styles(){return p.iv`
			:host{
				display:block;
			}
			:host([disabled]){
				opacity:0.5;
				cursor:default;
				pointer-events:none;
			}
			:host(:not([disabled])){
				cursor:pointer;
			}
		`}constructor(){super(),this.min=0,this.max=255,this.vertical=!1,this.color={},this.channel="?",this.mixer=new se}render(){let e=this.getBoundingClientRect();return p.dy`
		<canvas id="canvas" style="height:100%;width:100%;" width="${e.width*this.scale}" height="${e.height*this.scale}">Your browser does not support the HTML5 canvas tag</canvas>
		`}click(e){console.log("flow-color-slider click:",e),this.fire("flow-color-slider-click",{el:this,e})}firstUpdated(){window.ResizeObserver&&(this.resizeObserver=new ResizeObserver((e=>{this.fire("flow-resize",{},{bubbles:!0})})),this.resizeObserver.observe(this)),["mousedown","mouseup","mousemove","click","pointerdown","pointerup","pointermove","mouseenter","mouseleave"].forEach((e=>{this.addEventListener(e,(t=>{this.onMouseEvent(e,t)}))})),this.addEventListener("flow-resize",(e=>{this.debounce("flow-resize",this._onResize.bind(this),100)})),this.canvas=this.renderRoot.getElementById("canvas"),this.ctx=this.canvas.getContext("2d"),this.ctx.globalAlpha=0,this.updateCanvas(),this.color.registerSink((()=>{this.redraw()}))}_onResize(){console.log("_onResize!"),this.updateCanvas()}registerSink(e){this.sink=e}onMouseEvent(e,t){let r=!1;if("click"==e?r=!0:"mousedown"==e?(this.drag=!0,this.setCapture()):"mouseup"==e?this.drag=!1:"mousemove"==e&&this.drag&&(r=!0),r){let e=t.offsetX/this.size.width*(this.max-this.min)+this.min;this.color.change(e,this.channel),this.color.notify()}}redraw(){this.getBoundingClientRect();let e=this.canvas.getBoundingClientRect();this.canvasBox=e;let{width:t,height:r}=e;this.size={width:t,height:r},t*=this.scale,r*=this.scale,this.value,this.max;const{ctx:i}=this;i.clearRect(0,0,t,r),i.lineWidth=1;for(let e=0;e<t;e++){const n=e*this.max/t;this.mixer.assign(this.color),this.mixer.change(n,this.channel),i.strokeStyle=`rgba(${this.mixer.r},${this.mixer.g},${this.mixer.b},1.0)`,i.beginPath(),i.moveTo(e,0),i.lineTo(e,r),i.stroke()}let n=this.color[this.channel]/this.max*t;i.strokeStyle="rgba(0,0,0,1.0)",i.beginPath(),i.moveTo(n,0),i.lineTo(n,r),i.stroke()}}).define("flow-color-slider");class se{constructor(e={r:0,g:0,b:0,h:0,s:0,v:0,a:1}){this.sinks=[],Object.assign(this,e)}registerSink(e){this.sinks.push(e)}notify(){this.sinks.forEach((e=>e(this)))}assign(e){const{r:t,g:r,b:i,h:n,s:o,v:s,a}=e;Object.assign(this,{r:t,g:r,b:i,h:n,s:o,v:s,a})}change(e,t){"h"==t||"s"==t||"v"==t?(this[t]=e,Object.assign(this,function(e,t,r){var i,n,o,s,a,c,l,u;switch(1===arguments.length&&(t=e.s,r=e.v,e=e.h),c=r*(1-t),l=r*(1-(a=6*e-(s=Math.floor(6*e)))*t),u=r*(1-(1-a)*t),s%6){case 0:i=r,n=u,o=c;break;case 1:i=l,n=r,o=c;break;case 2:i=c,n=r,o=u;break;case 3:i=c,n=l,o=r;break;case 4:i=u,n=c,o=r;break;case 5:i=r,n=c,o=l}return{r:Math.round(255*i),g:Math.round(255*n),b:Math.round(255*o)}}(this))):(this[t]=Math.round(e),Object.assign(this,function(e,t,r){1===arguments.length&&(t=e.g,r=e.b,e=e.r);var i,n=Math.max(e,t,r),o=Math.min(e,t,r),s=n-o,a=0===n?0:s/n,c=n/255;switch(n){case o:i=0;break;case e:i=t-r+s*(t<r?6:0),i/=6*s;break;case t:i=r-e+2*s,i/=6*s;break;case r:i=e-t+4*s,i/=6*s}return{h:i,s:a,v:c}}(this)))}}class ae extends p.Hc{static get properties(){return{color:{type:Object,reflect:!0}}}static get styles(){return p.iv`
			:host {
				display : block;
				border: 1px solid #ccc;
			}

			.solid {
				min-width: 32px;
				min-height: 32px;
				width: 100%;
				height: 100%;
			}
		`}constructor(){super()}firstUpdated(){this.color.registerSink((()=>{this.requestUpdate()}))}render(){let e=`rgba(${this.color.r},${this.color.g},${this.color.b}, 1.0)`;return p.dy`
			<div class='solid' style="background-color: ${e}">
			</div>			
		`}}ae.define("flow-color-solid");class ce extends p.Hc{static get properties(){return{caption:{type:String}}}static get styles(){return p.iv`
			:host {
				display : block;
				border: 1px solid #ccc;
				padding: 6px;
				margin: 6px;
			}
			
			#wrapper {
				display: flex;
				flex-direction: column;
			}

			#caption {
				text-align: left;
			}

			#ctl {
				display: flex;
				flex-direction: row;
			}

			.sliders {
				flex: 1;
				display: flex;
				flex-direction: column;
			}

			flow-color-slider {
				min-height: 24px;
				margin: 4px;
				border: 1px solid #000;
			}

			flow-color-solid {
				width: 96px;
				height: 96px;
			}
		`}constructor(){super(),this.color=new se,this.color.registerSink((()=>{}))}firstUpdated(){this.addEventListener("flow-color-slider-click",(e=>{console.log("color selector receiving flow-color-slider-click!")}))}render(){return p.dy`
			<div id="wrapper">
				<div id="caption">${this.caption}</div>
				<div id="ctl">
					<div class='sliders'>
						<flow-color-slider .color=${this.color} channel="r"></flow-color-slider>
						<flow-color-slider .color=${this.color} channel="g"></flow-color-slider>
						<flow-color-slider .color=${this.color} channel="b"></flow-color-slider>
						<flow-color-slider .color=${this.color} channel="h" max="1"></flow-color-slider>
						<flow-color-slider .color=${this.color} channel="s" max="1"></flow-color-slider>
						<flow-color-slider .color=${this.color} channel="v" max="1"></flow-color-slider>
					</div>
					<div>
						<flow-color-solid .color=${this.color}></flow-color-solid>
					</div>			
				</div>
			</div>
		`}}ce.define("flow-color-selector");class le extends p.Hc{static get properties(){return{for:{type:String},type:{type:String},icon:{type:String},visible:{type:Boolean},"right-align-tooltip":{type:Boolean}}}static get styles(){return p.iv`
			:host {
		
            }
			.icon-box{
				display:inline-block;
				width:20px;
				max-width:20px;
				text-align:center;
				/*border: 1px solid red;*/
			}
	
			.icon-box svg{
				width:15px;
				height:15px;
				margin-right: 8px;
				margin-bottom: 8px;
				/*margin-left: 8px;*/
				/*fill:var(--flow-primary-color, rgba(0,151,115,1.0));*/
				fill: #666;
			}
			.tooltip-content{display:none}			
		`}constructor(){super()}render(){let e="";return"-"!=this.icon&&(e=this.iconPath(this.icon||"fal:info-circle")),p.dy`
			<slot></slot>
			<span class="tooltip" @mouseenter="${this.onTooltipMouseEnter}">
				<div class="icon-box"><svg><use href="${e}"></use></svg></div>
				<slot class="tooltip-content" name="tooltip"></slot>
			</span>
		`}firstUpdated(){super.firstUpdated(),this.tooltipEl=this.renderRoot.querySelector(".tooltip"),this.tooltipTextEl=document.createElement("div"),this.tooltipTextEl.classList.add("flow-tooltip-text"),this.tooltipSlot=this.renderRoot.querySelector(".tooltip-content"),this.tooltipSlot.addEventListener("slotchange",(e=>{this.updateTooltipContent()})),document.body.append(this.tooltipTextEl),this.updateTooltipContent(),this.tooltipTextEl.addEventListener("mouseenter",(()=>{this.mouseInTooltipContent=!0})),this.tooltipTextEl.addEventListener("mouseleave",(()=>{this.mouseInTooltipContent=!1,this.tooltipTextEl.classList.remove("active"),this.timeoutId&&(clearTimeout(this.timeoutId),delete this.timeoutId)}))}updateTooltipContent(){let e=this.tooltipSlot.assignedNodes();this.tooltipTextEl.innerHTML="",e.forEach((e=>{this.tooltipTextEl.append(e.cloneNode(!0))}))}onTooltipMouseEnter(e){let t=this.tooltipEl.getBoundingClientRect(),r=t.left+t.width/2,i=t.top+t.height/2,n=window.innerWidth,o=n/2,s=window.innerHeight,a=s/2,c=this.tooltipTextEl.style;this["top-align-tooltip"]||i>a?(c.top="initial",c.bottom=s-t.top+"px"):(c.bottom="initial",c.top=t.bottom+"px"),this["right-align-tooltip"]||r>o?(c.left="initial",c.right=n-t.right+"px"):(c.right="initial",c.left=t.left+"px"),this.tooltipTextEl.classList.add("active"),this.checkAndCloseTooltipIfAway()}checkAndCloseTooltipIfAway(e){this.timeoutId=setTimeout((()=>{if(this.mouseInTooltipContent)return this.checkAndCloseTooltipIfAway();this.tooltipTextEl.classList.remove("active")}),1e3)}}le.define("flow-reference");class ue{static duration(e){let t=Math.floor(e/1e3/60/60),r=Math.floor(e/1e3/60%60),i=Math.floor(e/1e3%60);if(!t&&!r&&!i)return this.commas(e);let n="";return t&&(n+=(t<10?"0"+t:t)+" h "),(t||r)&&(n+=(r<10?"0"+r:r)+" m "),(t||r||i)&&(n+=(i<10?"0"+i:i)+" s "),n}static commas(e,t=0){var r=parseFloat(e).toFixed(parseInt(t)).toString().split(".");return r[0]=r[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),r.join(".")}static cs(e,t){const{precision:r}=t;return ue.commas(e,r||0)}static fiat(e){return this.commas(e,2)}static crypto(e,t){let r=this.commas(e,8);if(t?.noTrailingZeros){let[e,t]=r.split(".");return t=t.replace(/0+$/,""),t?`${e}.${t}`:e}return r}static int(e){return this.commas(parseInt(e))}static"file-size-si"(e){return parseFloat(e).toFileSize(!0)}static"file-size"(e){return parseFloat(e).toFileSize()}static"hash-rate"(e,t){return parseFloat(e).toHashMetric(t.precision,t.unit,t.commas)+"H/s"}static default(e,t){return ue.cs(e,t)}}Number.prototype.toFileSize||Object.defineProperty(Number.prototype,"toFileSize",{value:function(e,t){var r,i,n,o=(e=e?[1e3,"k","B"]:[1024,"K","iB"],r=Math,i=r.log,n=i(this)/i(e[0])|0,this/r.pow(e[0],n)).toFixed(2);return t||(o+=" "+(n?(e[1]+"MGTPEZY")[--n]+e[2]:"Bytes")),o},writable:!1,enumerable:!1}),Number.prototype.toUnitSize||Object.defineProperty(Number.prototype,"toUnitSize",{value:function(e){var t,r,i,n=(t=Math,r=t.log,i=r(this)/r(1e3)|0,this/t.pow(1e3,i)).toFixed(2);return e||(n+=" "+(i?"KMGTPEZY"[--i]:" ")),n},writable:!1,enumerable:!1}),Number.prototype.toHashMetric||Object.defineProperty(Number.prototype,"toHashMetric",{value:function(e,t,r){var i=[[1e24,"Y"],[1e21,"Z"],[1e18,"E"],[1e15,"P"],[1e12,"T"],[1e9,"G"],[1e6,"M"],[1e3,"k"]],n=0;if(t)for(;n<i.length-1&&t!=i[n][1];)n++;else{for(;n<i.length-1&&this<i[n][0];)n++;t=i[n][1]}var o=this/i[n][0];if(e=_.isUndefined(e)?2:parseInt(e),r){var s=o.toFixed(e).toString().split(".");return s[0]=s[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),s.join(".")+" "+t}return o.toFixed(e)+" "+t},writable:!1,enumerable:!1}),class extends Y{static get properties(){return{disabled:{type:Boolean,reflect:!0},title:{type:String},prefix:{type:String},suffix:{type:String},align:{type:String},value:{type:Number},data:{type:String},sampler:{type:String},range:{type:Number},overlay:{type:Boolean},format:{type:String},precision:{type:Number},axes:{type:Boolean},info:{type:Boolean}}}static get styles(){return[Y.styles,p.iv`
			:host{
				display:inline-flex;
				font-weight:bold;
				font-size:13px;
				text-transform:uppercase;
				cursor:pointer;
				font-family:var(--flow-data-field-font-family, "Julius Sans One");
				font-weight:var(--flow-data-field-font-weight, bold);
				border-radius: 10px;
				overflow: hidden;
				position:relative;
			}
			:host([disabled]){opacity:0.5;cursor:default;pointer-events:none;}
			.colon{display:none}
			:host(.has-colon) .colon{display:inline;}
			.container{
				white-space: nowrap;
				padding:2px 6px 6px 6px;
				height: 100%;
			}
			
			.container>div{padding:2px;}
			.title{flex:1; text-align:left; opacity:1;xmargin-top:7px; font-size: 10px; color: var(--flow-data-badge-caption); xtext-shadow: 0px 0px 0px var(--flow-data-badge-caption-shadow, #fff); }
			.value{text-align:right; opacity:1;font-size:14px;font-family:"Exo 2";font-weight:normal;background-color: var(--flow-background-color:);}
			.prefix{opacity:0.9;margin-right:3px;margin-top:3px; font-size: 10px;}
			.suffix{opacity:0.9;margin-left:3px;margin-top:3px; font-size: 10px;}
			.col{display: flex; flex-direction: column; align-items: left;}
			.row{display: flex; flex-direction: row; flex:0;}

			.wrapper {
				/*width:100%;height:100%;*/
				position:relative;
				flex:1;
				margin:6px;overflow:hidden;
				/*
				min-width: var(--flow-data-badge-graph-with,240px);
				min-height: var(--flow-data-badge-graph-height,80px);				
				*/				
			}
			
			:host([border]) .wrapper {
				border: 2px solid var(--flow-primary-color,#333);
				box-shadow: 2px 2px 1px rgba(1, 123, 104, 0.1);
				border-radius: 10px;

			}

			.wrapper > div {
				width:100%;height:100%;
				position:relative;left:0px;top:0px;bottom:0px;right:0px;
			}

			.d3-holder{
				min-height:10px;
				min-width:10px;
				opacity:1;
				border-radius:10px;
			}
			.wrapper>div.d3-holder{position:absolute;}
			.overlay{pointer-events:none}
			.info{
				position:absolute;pointer-events:none;
				background:var(--flow-graph-info-bg, #FFF);
				border:var(--flow-graph-info-border, 1px solid #DDD);
				padding:3px;font-size:0.7rem;left:10px;top:10px;
				opacity:0;max-width:48%;
			}
			.info-dot{opacity:0}
			[flex] {
				flex: 1;
			}


			.axis {
				font-size:12px;
				font-family: "Consolas", "Source Sans Pro";
				font-weight: 300;
				strokeColor: #333;
			}

			.axis text {
				fill:var(--flow-background-inverse-soft, #aaa);
			}
			.axis path {
				stroke:var(--flow-background-inverse-soft, #aaa);
			}
			.axis line {
				stroke:var(--flow-background-inverse-soft, #aaa);
			}

			.value-container {
				/*background-color: var(--flow-background-color, rgba(0,0,0,0));*/
				display:flex;
				flex-direction:row;
			}

			.title-bottom { display: none; }
			.host([bottom])	.title-bottom { display: block; }
			.host([bottom])	.title-top { display: none; }
			.host([top])	.title-bottom { display: none; }
			.host([top])	.title-top { display: block; }
		`]}constructor(){super(),this.sampler="",this.range=300,this.refresh=1e3,this.precision=0,this.axes=!1,this.info=!1,this.svgPreserveAspectRatio="xMaxYMax meet"}onElementResize(){super.onElementResize(),(0,p.Kg)((()=>{super.onElementResize(),this.requestUpdate("element-resize",null)})),(0,p.Kg)(1e3,(()=>{super.onElementResize(),this.requestUpdate("element-resize",null)}))}connectedCallback(){super.connectedCallback(),this.sampler&&(this.interval=setInterval(this.requestUpdate.bind(this),this.refresh))}disconnectedCallback(){super.disconnectedCallback(),this.interval&&clearInterval(this.interval)}render(){(0,p.Kg)((()=>{this.draw()}));let e="";if(this.sampler){let t=this.sampler.split(":").shift();e=Z.get(t).last()||"",void 0!==e&&(e=ue[this.format||"default"](e||0,this))}else console.log("no sampler",this);return this.overlay?p.dy`
			<div class='wrapper'>
				<div class="d3-holder">${super.render()}</div>
				<div class="overlay">
					<div class="container col">
						<!-- div class="title title-top">${this.title}<span class="colon">:</span></div -->
						<div class="row">
							<div class="title title-top">${this.title}<span class="colon">:</span></div>
							${this.align&&"right"!=this.align?"":p.dy`<div style="flex:1;"></div>`}
							<div class="value-container">
								<div class="prefix">${this.prefix}</div>
								<div class="value">${e}</div>
								<div class="suffix">${this.suffix}</div>
							</div>
							${"left"==this.align?p.dy`<div style="flex:1;"></div>`:""}
						</div>
						<div flex></div>
						<!-- div class="row">
							<div class="title title-bottom">${this.title}<span class="colon">:</span></div>
							${this.align&&"right"!=this.align?"":p.dy`<div style="flex:1;"></div>`}
							<div class="value-container">
								<div class="prefix">${this.prefix}</div>
								<div class="value">${e}</div>
								<div class="suffix">${this.suffix}</div>
							</div>
							${"left"==this.align?p.dy`<div style="flex:1;"></div>`:""}
						</div -->
					</div>
				</div>
			</div>
			<div class="info"></div>
			`:p.dy`
			<div class='wrapper'>
				<div class="d3-holder">${super.render()}</div>
				<div>
					<div class="container col">
						<slot></slot>
					</div>
				</div>
			</div>
			<div class="info"></div>
			`}getMargin(){return this.axes?{bottom:40,top:30,left:20,right:20}:{bottom:0,top:10,left:0,right:0}}draw(){let e=this.getMargin(),{height:t,width:r}=this.el_d3.getBoundingClientRect(),i=r-e.left-e.right,n=t-e.top-e.bottom;if(!this.sampler)return;let o=this.sampler.split(":").map((e=>{let t=Z.get(e);return this._draw||(this._draw=this.draw.bind(this),t.on("data",this._draw)),t}))[0].data,[s,a]=d3.extent(o,(e=>e.date));this.axes||(s=a-1e3*this.range);let c=0;if(o.forEach((e=>{e.value.toFixed(this.precision).length>c&&(c=e.value.toFixed(this.precision).length)})),this.axes&&e.left<10*c){let t=e.left;e.left=10*c,i+=t-e.left}const l=d3.scaleUtc().domain([s,a]).range([0,i]),u=d3.scaleLinear().domain(d3.extent(o,(e=>e.value))).nice().range([n,0]);let h,d;this.axes&&(h=e=>e.attr("transform",`translate(0,${n})`).call(d3.axisBottom(l).ticks(i/80).tickSizeOuter(0)),d=e=>e.call(d3.axisLeft(u).ticks(n/20).tickSizeOuter(0)));const f=d3.area().curve(d3.curveLinear).x((e=>l(e.date))).y0(n).y1((e=>u(e.value))),{el:p}=this;let g=`translate(${e.left},${e.top})`;p.__t!=g&&(p.__t=g,p.attr("transform",g)),this.svg.__w!=r&&(this.svg.__w=r,this.svg.attr("width",r)),this.svg.__h!=t&&(this.svg.__h=t,this.svg.attr("height",t)),this.path||(this.path=p.append("path").attr("stroke-opacity","var(--flow-graph-stroke-opacity, 1.0)").attr("stroke-linejoin","round").attr("stroke-linecap","round").attr("stroke-width","var(--flow-graph-stroke-width, 0)").attr("fill","var(--flow-graph-fill, steelblue)").attr("stroke",'var(--flow-graph-stroke, "#000)'));try{this.path.datum(o).attr("d",f)}catch(e){this.sampler&&console.log("error while processing sampler:",this.sampler),console.log(e)}if(this.info){let t=this,r=d3.bisector((e=>e.date)).left,n=d3.timeFormat("%x %X");this.getDataByPoint=t=>{let n=l.invert(t-e.left),s=r(o,n),a=o[s];if(!a)return;let c=l(a.date),h=u(a.value),d=null,f=null;return c>.5*i?f=i-c+e.right+12:d=c+12+e.left,{cx:c,cy:h,d:a,l:d,r:f,t:h+12+e.top}},this.infoEl||(this._infoEl=this._infoEl||this.renderRoot.querySelector(".info"),this.infoEl=d3.select(this._infoEl),this.infoDot=p.append("circle").attr("class","info-dot").attr("fill","var(--flow-graph-info-dot-fill, red)").attr("stroke","var(--flow-graph-info-dot-stroke, none)").attr("r",3),this.svg.on("mousemove",(function(e){let r=d3.mouse(this)[0],i=t.getDataByPoint(r);if(!i)return;let{cx:o,cy:s,l:a,r:c,t:l,d:u}=i,h=t.infoEl;h.html(ue[t.format||"default"](u.value,t)+", "+n(u.date)).style("top",l+"px"),a?(h.style("right","initial"),h.style("left",a+"px")):(h.style("right",c+"px"),h.style("left","initial")),h.transition().duration(50).style("opacity",1),t.infoDot.style("opacity",1).attr("cx",o).attr("cy",s)})).on("mouseout",(()=>{this.infoDot.style("opacity",0),this.infoEl.transition().duration(50).style("opacity",0)})))}this.axes&&(this.xAxis=this.xAxis||p.append("g"),this.xAxis.call(h),this.yAxis=this.yAxis||p.append("g"),this.yAxis.call(d),this.xAxis.classed("axis",!0),this.yAxis.classed("axis",!0))}}.define("flow-graph");class he{constructor(){this.events=new Map,this.refs=new Map,this.listeners=[],this.mevents=[],this.on("destroy",(()=>{this.mevents.forEach((e=>{this.off(e)}))}))}on(e,t){if(!t)throw new Error("events::on() - callback is required");let r=(0,j.FG)();return this.events.has(e)||this.events.set(e,new Map),this.events.get(e).set(r,t),this.refs.set(r,e),r}mon(e,t){let r=this.on(e,t);return this.mevents.push(r),r}off(e,t){if(e){let t=this.refs.get(e);this.refs.delete(e);let r=this.events.get(t);r&&r.delete(e)}else t&&((this.events.get(t)||[]).forEach(((e,t)=>{this.refs.delete(t)})),this.events.delete(t))}emit(e,t){let r=this.events.get(e);r&&r.forEach((e=>{e(t)})),this.listeners.forEach((r=>{r.emit.call(r,e,t)}))}emitAsync(e,...t){(0,j.Kg)((()=>{this.emit(e,...t)}))}addListener(e){this.listeners.indexOf(e)<0&&this.listeners.push(e)}removeListener(e){let t=this.listeners.indexOf(e);t>-1&&this.listeners.splice(t,1)}getListeners(){return this.listeners}}class de{constructor(e){this.online=!1,this.options=Object.assign({path:"/rpc",id:(0,j.FG)(),timeout:30,origin:window.location.origin},e||{}),this.timeout=this.options.timeout,this.id=this.options.id,this.transport=this.options.transport||"ws",this.init()}init(){this.initEvent(),this.connected=!1,this.options.path&&this.connect()}initEvent(){this.pending=new Map,this.events=new he}connect_impl(){switch(this.transport){case"ws":this.options.origin.replace(/^http/,"ws"),this.options.path,this.socket_impl=new WebSocket(this.options.origin.replace(/^http/,"ws")+this.options.path);break;case"sockjs":this.socket_impl=SockJS(this.options.origin+this.options.path,this.options.args||{})}this.socket_impl.onopen=e=>{this.online=!0,console.log("RPC connected"),this.events.emit("open")},this.socket_impl.onerror=e=>{console.log("RPC connect_error",e),this.events.emit("connect.error",e),this.socket_impl.close()},this.socket_impl.onmessage=e=>{let[t,r]=JSON.parse(e.data);this.intake.emit(t,r)},this.socket_impl.onclose=e=>{this.online=!1,console.log("RPC disconnected"),this.events.emit("disconnect"),this.pending.forEach(((e,t)=>{e.callback({error:"Connection Closed"})})),this.pending.clear(),this.reconnect_impl()}}reconnect_impl(){(0,j.Kg)(1e3,(()=>{this.connect_impl()}))}async connect(){if(this._connected||!this.options.path)return;this._connected=!0,this.events.emitAsync("rpc-connecting"),this.intake=new he,this.socket={on:(...e)=>{this.intake.on(...e)},emit:(e,t)=>{this.socket_impl.send(JSON.stringify([e,t]))}},this.socket.on("auth.setcookie",(e=>{document.cookie=e.cookie})),this.socket.on("auth.getcookie",(()=>{let e={cookie:0===document.cookie.length?null:document.cookie};this.socket_impl.send(JSON.stringify(["auth.cookie",e]))})),this.socket.on("ready",(e=>{if(e.websocketMode!=this.options.websocketMode)throw new Error(`Error - incompatible websocket mode: client ${this.options.websocketMode} server: ${e.websocketMode}`);this.events.emit("connect")})),this.connect_impl(),await this.initSocketHandlers();let e=()=>{let t=Date.now(),r=[];this.pending.forEach(((e,i)=>{t-e.ts>1e3*this.timeout&&(e.callback({error:"Timeout "}),r.push(i))})),r.forEach((e=>{this.pending.delete(e)})),(0,j.Kg)(1e3,e)};(0,j.Kg)(1e3,e)}close(){this.socket&&this.socket.close()}on(e,t){this.events.on(e,t)}initSocketHandlers(){return Promise.resolve()}}class fe extends de{constructor(e){super(Object.assign({},e,{websocketMode:"RPC"})),this.asyncSubscribers=new b.dt}initSocketHandlers(){return this.socket.on("publish",(e=>{let{subject:t,data:r}=e;this.trace&&(1===this.trace||!0===this.trace?console.log("RPC ["+this.id+"]:",t):2===this.trace&&console.log("RPC ["+this.id+"]:",t,r)),this.asyncSubscribers.post(t,{data:r})})),this.socket.on("response",(e=>{let{rid:t,error:r,data:i}=e,n=t&&this.pending.get(t);if(n)try{n.callback.call(this,r,i)}catch(t){console.error("RPC handler error:",e),console.error(t)}else t&&console.log("RPC received unknown rpc callback (strange server-side retransmit?)");t&&this.pending.delete(t)})),Promise.resolve()}subscribe(e){return this.asyncSubscribers.subscribe(e)}publish(e,t){return this.socket.emit("publish",{subject:e,data:t})}request(e,t,r){return new Promise(((i,n)=>{"function"==typeof t&&(r=t,t=void 0);let o=(0,j.FG)();this.pending.set(o,{ts:Date.now(),callback:(e,t)=>{r?r(e,t):e?n(e):i(t)}}),this.socket.emit("request",{rid:o,req:{subject:e,data:t}})}))}}class pe extends de{constructor(e){super(Object.assign({},e,{websocketMode:"NATS"})),this.trace=!1,this.subscribers=new Map,this.subscriptionTokenMap=new Map,this.handlers=new Map,this.asyncSubscribers=new b.dt}initSocketHandlers(){return this.on("connect",(()=>{this.connectSubscribers(this.asyncSubscribers)})),this.socket.on("message",(e=>{this.trace&&console.log("sio/message",e);let{subject:t,data:r}=e;e.op&&(t=e.op,r=e),this.trace&&(1===this.trace||!0===this.trace?console.log("RPC ["+this.id+"]:",t):2===this.trace&&console.log("RPC ["+this.id+"]:",t,r)),this.events.emit(t,r)})),this.socket.on("publish::response",(e=>{this.trace&&console.log("sio/publish::response",e);let{rid:t,error:r,data:i}=e,n=t&&this.pending.get(t);n?n.callback.call(this,r,i):t&&console.log("RPC received unknown rpc callback (strange server-side retransmit?)"),t&&this.pending.delete(t)})),this.socket.on("subscribe::response",(e=>{this.trace&&console.log("sio/subscribe::response",e);let{rid:t,error:r,token:i,subject:n}=e,o=t&&this.pending.get(t);if(o){o.callback.call(this,r,i);let e=this.handlers.get(t);if(!r&&n?.length&&e){let r=this.subscribers.get(n);r||(r=new Map,this.subscribers.set(n,r)),r.set(i,{token:i,handler:e}),this.handlers.delete(t),this.subscriptionTokenMap.set(i,{subscribers:r,rid:t})}}else t&&console.log("RPC received unknown subscribe::response rid");t&&this.pending.delete(t)})),this.socket.on("unsubscribe::response",(e=>{this.trace&&console.log("sio/subscribe::response",e);let{rid:t,error:r,ok:i}=e,n=t&&this.pending.get(t);n?n.callback.call(this,r,i):t&&console.log("RPC received unknown unsubscribe::response rid"),t&&this.pending.delete(t)})),this.socket.on("request",(e=>{this.trace&&console.log("sio/request",e);let{req:{subject:t,data:r},rid:i}=e})),this.socket.on("publish",(e=>{this.trace&&console.log("sio/publish",e);let{subject:t,data:r,token:i}=e;const n=this.subscribers.get(t);if(n){const e=n.get(i);e&&e.handler(r)}this.asyncSubscribers.post(t,{data:r})})),this.socket.on("response",(e=>{this.trace&&console.log("sio/response",e);let{rid:t,error:r,data:i}=e;r=r||i?.error,"TIMEOUT"!=r?.code||r.error||(r.error="NATS TIMEOUT");let n=t&&this.pending.get(t);n?n.callback.call(this,r,i):t&&console.log("NATS RPC received unknown rpc callback (strange server-side retransmit?)"),t&&this.pending.delete(t)})),Promise.resolve()}on(e,t){this.events.on(e,t)}request(e,t,r){return new Promise(((i,n)=>{"function"==typeof t&&(r=t,t=void 0);let o=(0,j.FG)();this.pending.set(o,{ts:Date.now(),callback:(t,o)=>{r?r(t,o):t?(console.log("NATS request error - Subject:",e,"Error:",t),n(t)):i(o)}}),this.socket.emit("request",{rid:o,req:{subject:e,data:t}})}))}publish(e,t,r){return new Promise(((i,n)=>{let o=(0,j.FG)(),s=!!r;s&&this.pending.set(o,{ts:Date.now(),callback:(e,t)=>"function"==typeof r?r(e,t):e?n(e):i()}),this.socket.emit("publish",{req:{subject:e,data:t},rid:o,ack:s})}))}subscribe(e,t){let r=this.asyncSubscribers.subscribe(e);return r.on("subscribe",(e=>{this.registerSubscriptionWithNATS_(e,r,t)})),r.on("unsubscribe",(e=>{this.unsubscribe(r)})),r}connectSubscribers(e){e.forEach((e=>{const{subject:t}=e;e.ready=this.registerSubscriptionWithNATS_(t,e)}))}registerSubscriptionWithNATS_(e,t,r={}){t.state="connecting";let i=(0,j.FG)(),n=new Promise(((n,o)=>{this.pending.set(i,{ts:Date.now(),callback:(r,i)=>(r&&console.error("subscribe failure for subject:",e),t.token=i,t.state="connected",r?o(r):n(t))}),this.socket.emit("subscribe",{req:{subject:e,opt:r},rid:i})}));return n.rid=i,n}unsubscribe(e){const{token:t}=e;let r=(0,j.FG)(),i=new Promise(((e,i)=>{this.pending.set(r,{ts:Date.now(),callback:(t,r)=>t?i(t):e(r)}),this.socket.emit("unsubscribe",{req:{token:t},rid:r})}));return i.rid=r,i}}const ge=e=>class extends e{constructor(...e){super(...e),this.uid=(0,j.FG)(),this.setTheme(this.getTheme("light")),j.ls.app=this}getDefaultRPC(){return this.defaultRPC}getTheme(e){return(0,j.gh)(e)}setTheme(e){(0,j.Dc)(e)}initSocketRPC(e={}){return new Promise(((t,r)=>{this.rpc=new fe(Object.assign({path:"/rpc"},e||{})),this.rpc.events.on("connect",(()=>{this.log("RPC:init"),console.log("READY!!!!!"),this.onNetworkIfaceOnline(),t()})),this.rpc.events.on("disconnect",(()=>{console.log("disconnected..."),this.onNetworkIfaceOffline()})),this.defaultRPC=this.rpc}))}fireEvent(e,t={},r={}){let i=new CustomEvent(e,Object.assign({},r,{detail:t}));return window.dispatchEvent(i)}initSocketNATS(e={}){return new Promise(((t,r)=>{this.nats=new pe(Object.assign({path:"/nats"},e)),this.nats.events.on("connect",(()=>{this.log("NATS:init"),this.onNetworkIfaceOnline(),t()})),this.nats.events.on("disconnect",(()=>{console.log("disconnected..."),this.onNetworkIfaceOffline()})),this.defaultRPC=this.nats}))}setLoading(e=!0,t=null){(t||document.body).classList.toggle("loading",e)}initLog(...e){if(super._initLog)return super._initLog(...e);const t=this.constructor.name;this.log=Function.prototype.bind.call(console.log,console,`%c[${t}]`,"font-weight:bold;color:#41c7ef")}onNetworkIfaceOnline(){this._online=!0,this.fireEvent("network-iface-online")}onNetworkIfaceOffline(){this._online&&(this._online=!1,this.fireEvent("network-iface-offline"))}isOnline(){return this._online}};class me extends p.Hc{static get properties(){return{"menu-icon":{type:String},"floating-drawer":{type:Boolean,reflect:!0},"open-drawer":{type:Boolean,reflect:!0}}}static get styles(){return[p.pg,p.iv`
			:host{
				display:flex;
				flex-direction:column;
				width:var(--flow-app-width, 100vw);
				height:var(--flow-app-height, 100vh);
			}
			.header{
				display:flex;flex-direction:row;
				align-items:var(--flow-app-header-align-items, center);
				height:var(--flow-app-header-height, 60px);
				background-color:var(--flow-app-header-bg, #161926);
				color:var(--flow-app-header-color, #91aec1);
				padding:var(--flow-app-header-padding, 0px 100px);
				--flow-dropdown-trigger-bg:var(--flow-app-header-bg, #161926);
				--flow-dropdown-trigger-color:var(--flow-app-header-color, #91aec1);
				--flow-dropdown-trigger-hover-bg:transparent;
				--flow-dropdown-trigger-hover-color:var(--flow-app-header-color, #91aec1);
				--flow-dropdown-trigger-width:20px;
				--flow-dropdown-trigger-padding:0px;
			}
			:host([no-header]) .header{display:none}
			.header-sm{display:none}
			.header ::slotted(.logo){
				height:100%;
				max-height:80%;
			}
			.logo ::slotted(.logo){
				max-height:80%;
			}
			.header ::slotted(a.link){
				padding:var(--flow-app-header-link-padding, 0px 0px 0px 16px);
				color:var(--flow-app-header-color, #91aec1);
				text-decoration:none;
			}
			.footer {
				height: var(--flow-app-footer-height, initial);
				color:var(--flow-app-footer-color, #000);
				background:var(--flow-app-footer-bg, #91aec1);				
			}
			
			.body{
				flex:1;display:flex;flex-direction:row;
				overflow:var(--flow-app-body-overflow, hidden);
			}
			.drawer{
				background-color:var(--flow-app-drawer-bg, var(--flow-background-color, inherit));
				color:var(--flow-app-drawer-color, var(--flow-color, inherit));
				width:var(--flow-app-drawer-width, 300px);
				overflow:var(--flow-app-drawer-overflow, initial);
				position:relative;
			}
			:host([no-drawer]) .drawer{display:none}
			:host([floating-drawer]) .drawer{
				position:absolute;
				left:0px;top:0px;bottom:0px;
				transition:var(--flow-app-drawer-transition, left 0.5s ease);
				z-index:var(--flow-app-drawer-z-index, 10001);
			}
			:host([floating-drawer]:not([open-drawer])) .drawer{
				left:var(--flow-app-drawer-hidden-left, -500px);
			}
			:host([floating-drawer][right-drawer]) .drawer{
				left:initial;right:0px;
				transition:var(--flow-app-drawer-transition, right 0.5s ease);
			}
			:host([floating-drawer][right-drawer]:not([open-drawer])) .drawer{
				right:var(--flow-app-drawer-hidden-right, -500px);
			}
			.main{
				flex:1;
				overflow:var(--flow-app-main-overflow, hidden);
				position:var(--flow-app-main-position, initial);
				display:var(--flow-app-main-display, flex);
				flex-direction:var(--flow-app-main-flex-direction, column);
			}

			.wrapper {
				/*
				min-height: 100%;
				height:var(--flow-app-wrapper-height, 100%);
				margin-bottom: calc(-1 * var(--flow-app-footer-height,0px));
				*/
				height:var(--flow-app-wrapper-height, 100px);
				overflow:var(--flow-app-wrapper-overflow, auto);
				position:var(--flow-app-wrapper-position, initial);
				display:var(--flow-app-wrapper-display, initial);
				flex:var(--flow-app-wrapper-flex, 1);
			}
			:host([main-v-box]) .main{
				display:flex;flex-direction:column;
				align-items:var(--flow-app-main-align-items, stretch);
				justify-content:var(--flow-app-main-align-justify-content, space-between);
			}
			fa-icon{
				--fa-icon-color:var(--flow-color);
			}

			.menu-icon{
				cursor:pointer;
				--fa-icon-color:var(--flow-app-menu-icon-color, var(--flow-color));
			}
			.drawer-top{
				height:var(--flow-app-header-height, 60px);
				display:flex;align-items:center;
				padding:var(--flow-app-header-padding, 0px 100px);
			}
			.main-mask{
				position:absolute;z-index:var(--flow-app-body-mask-z-index, 10000);
				left:0px;top:0px;right:0px;bottom:0px;width:100%;height:100%;
				background-color:var(--flow-app-body-mask-bg, initial);
			}
			:host([floating-drawer][open-drawer]) .main{position:relative}
			:host(:not([floating-drawer])) .drawer-top,
			:host(:not([floating-drawer])) .main-mask,
			:host(:not([open-drawer])) .main-mask{display:none}
			.drawer-close-icon{
				cursor:pointer;
				--fa-icon-color:var(--flow-app-drawer-close-icon-color, var(--flow-color));
			}

			@media(max-width:760px){
				:host([floating-drawer]) .header-sm{display:flex}
				:host([floating-drawer]) .header:not(.header-sm){display:none}
				.drawer-top,
				.header{
					padding:var(--flow-app-header-sm-padding, 0px 15px);
				}
			}



			::slotted(.flex){flex:1}
		`]}render(){return p.dy`
		<div class="header"><slot name="logo"></slot><slot name="header"></slot></div>
		<div class="header header-sm"><fa-icon class="menu-icon"
			icon="${this["menu-icon"]||"bars"}" 
			@click="${this.toggleFloatingDrawer}"></fa-icon><slot 
			name="header-sm"></slot></div>
		<div class="body">
			<div class="drawer sbar">
			<div class="drawer-top">
				<fa-icon class="drawer-close-icon"
				icon="${this["drawer-close-icon"]||"times"}" 
				@click="${this.toggleFloatingDrawer}"></fa-icon>
			</div>
			<slot name="drawer"></slot></div>
			<div class="main sbar">
				<div class="wrapper">
					<slot name="main"></slot><div 
					class="main-mask" @click="${this.toggleFloatingDrawer}"></div>
				</div>
				<div class="footer">
					<slot name="footer"></slot>
				</div>
			</div>
		</div>
		`}toggleFloatingDrawer(){this["floating-drawer"]&&(this["open-drawer"]=!this["open-drawer"])}}me.define("flow-app-layout");class be extends(ge(p.Hc)){static get properties(){return{"menu-icon":{type:String},"floating-drawer":{type:Boolean,reflect:!0},"open-drawer":{type:Boolean,reflect:!0},"external-dom":{type:Boolean}}}constructor(...e){super(...e),this.registerListener("flow-network-and-user-state-get",(e=>{e.detail.online=this.isOnline(),e.detail.signedin=this.signedin}))}createRenderRoot(){return this.usingExternalDom=null!=this.getAttribute("external-dom")||this.querySelector("flow-app-layout, .flow-app-layout"),this.usingExternalDom?this.attachShadow({mode:"open"}):this}render(){return this.usingExternalDom?p.dy`<slot></slot>`:p.dy``}firstUpdated(){this.setLoading(!1)}signinCallback(){this.signedin=!0,document.body.classList.toggle("flow-user-signedin",!0)}signoutCallback(){this.signedin=!1,document.body.classList.toggle("flow-user-signedin",!1)}connectedCallback(){super.connectedCallback(),this.signinCallback_=(...e)=>{this.signinCallback(...e)},window.addEventListener("flow-user-signin",this.signinCallback_),this.signoutCallback_=(...e)=>{this.signoutCallback(...e)},window.addEventListener("flow-user-signout",this.signoutCallback_)}disconnectedCallback(){super.disconnectedCallback(),this.signinCallback_&&(window.removeEventListener("flow-user-signin",this.signinCallback_),delete this.signinCallback_),this.signoutCallback_&&(window.removeEventListener("flow-user-signout",this.signoutCallback_),delete this.signoutCallback_)}}be.define("flow-app");class ve extends p.Hc{static get properties(){return{opened:{type:Boolean,reflect:!0},parentSelector:{type:String}}}static get styles(){return p.iv`
			:host{
				display:block;
				position:absolute;left:0px;top:0px;right:0px;bottom:0px;
			}
			.warpper{
				position:absolute;left:0px;top:0px;right:0px;bottom:0px;
				overflow:auto;
			}
			.toggle-btn{
				border-radius:var(--flow-appdrawer-btn-border-radius, 50%);
				box-shadow:var(--flow-appdrawer-btn-box-shadow, 0px 0px 3px 1px var(--flow-background-inverse-soft));
				padding:var(--flow-appdrawer-btn-padding, 10px);
				position:absolute;
				right:var(--flow-appdrawer-btn-right, -10px);
				top:var(--flow-appdrawer-btn-right, -10px);
				background-color:var(--flow-appdrawer-btn-bg, var(--flow-background-color));
				width:var(--flow-appdrawer-btn-width, 15px);
				height:var(--flow-appdrawer-btn-height, 15px);
				z-index:1000;box-sizing:border-box;cursor:pointer;
			}

			:host(.top-btn) .toggle-btn{
				right:initial;
				left:var(--flow-appdrawer-btn-left, 15px);
				top:var(--flow-appdrawer-btn-top, 5px);
			}
			:host(.top-btn) .warpper{
				top:var(--flow-appdrawer-wrapper-top, 20px);
			}
			.toggle-btn:after{
				content:"";
				border:var(--flow-appdrawer-border, 2px solid var(--flow-primary-color));
				border-left-color:transparent;
				border-bottom-color:transparent;
				box-sizing:border-box;
				width:50%;height:50%;
				position:absolute;
				left:15%;
				top:25%;
				transition:transform 0.2s ease;
				transform-origin:center;
				transform:rotate(45deg);
			}
			:host([opened]) .toggle-btn:after{
				transform:translateX(4px) rotate(225deg);
			}
			:host(.hide-btn) .toggle-btn{display:none}

		`}constructor(){super()}render(){return p.dy`<div class="warpper"><slot></slot></div>
		<span class="toggle-btn" @click="${this.toggle}"></span>`}toggle(){this.opened=!this.opened}updated(e){if(super.updated(e),e.has("opened")){let e=document.querySelector(this.parentSelector||"body");e?.classList.toggle("drawer-opened",this.opened)}}}ve.define("flow-app-drawer");class ye extends p.Hc{static get properties(){return{opened:{type:Boolean,reflect:!0},modal:{type:Boolean},backdrop:{type:Boolean},disabled:{type:Boolean,reflect:!0},absolute:{type:Boolean,reflect:!0},"right-align":{type:Boolean},xMargin:{type:Number,value:10},yMargin:{type:Number,value:10},yOffset:{type:Number,value:8},yOverflowMargin:{type:Number,value:-10}}}static get styles(){return[p.pg,p.iv`
		:host{
			display:var(--flow-dropdown-display, inline-block);margin:5px 0px;
			vertical-align:middle;
			color:var(--flow-color, #000);
		}
		.trigger{
			background-color:var(--flow-dropdown-trigger-bg, var(--flow-primary-color, #3498DB));
			color:var(--flow-dropdown-trigger-color, #FFF);
			border-radius:var(--flow-dropdown-trigger-border-radius, 3px);
			border:none;
			user-select:none;
			padding:var(--flow-dropdown-trigger-padding, 21px 20px 20px);
			min-width:var(--flow-dropdown-trigger-width, 80px);
			font-size:var(--flow-dropdown-trigger-font-size, var(--flow-input-font-size, 1rem));
			font-weight:var(--flow-dropdown-trigger-font-weight, var(--flow-input-font-weight, 400));
			line-height:var(--flow-dropdown-trigger-line-height, var(--flow-input-line-height, 1.2));
		}
		:host(:not([disabled])) .trigger{cursor:pointer;}

		.trigger:hover, .trigger:focus {
			background-color:var(--flow-dropdown-trigger-hover-bg, var(--flow-primary-color, #3498DB));
			color:var(--flow-dropdown-trigger-hover-color, #FFF);
		}
		.dropdown{position:relative;display:block;}
		.dropdown-content{
			display:none;
			position:absolute;
			background-color:var(--flow-dropdown-bg, var(--flow-background-color, #FFF));
			color:var(--flow-dropdown-color, var(--flow-color, #000));
			min-width:var(--flow-dropdown-content-min-width, 160px);
			overflow:auto;border-radius:3px;
			box-shadow:var(--flow-box-shadow);
			z-index:1000;
			top:var(--flow-dropdown-content-top, var(--flow-dropdown-top, 0px));
			left:var(--flow-dropdown-content-left, 0px);
			right:var(--flow-dropdown-content-right, initial);
			padding:var(--flow-dropdown-content-padding, 5px);
			border:var(--flow-dropdown-border, none);
			box-sizing:border-box;
			transform:translate(var(--flow-transform-translate-x), var(--flow-transform-translate-y));
		}
		:host([opened]) .dropdown-content,
		:host([opened]:not([absolute])) .backdrop{display:block;}
		:host(.right-align) .dropdown-content,
		:host([right-align]) .dropdown-content{
			left:var(--flow-dropdown-content-left, initial);
			right:var(--flow-dropdown-content-right, 0px);
		}
		:host([no-trigger]) .trigger{display:none}
		:host([no-trigger]){margin:0px;}
		:host([absolute]) .dropdown-content{
			position:absolute;
		}
		:host(:not([absolute])) .dropdown-content{
			position:fixed;z-index:1010;
		}
		:host(:not([absolute])) .backdrop{
			position:fixed;z-index:1009;
			top:0px;
			bottom:0px;
			left:0px;
			right:0px;
			display:none;
			background:var(--flow-dropdown-backdrop-bg, var(--flow-backdrop-bg))
		}
		`]}render(){return p.dy`
			<div class="trigger"><slot name="trigger"></slot></div><div class="dropdown">
				<div class="dropdown-content">
					<slot></slot>
				</div>${this.renderBackdrop()}
			</div>
		`}renderBackdrop(){return this.backdrop||p.rA?p.dy`<a href="javascript:void(0)" class="backdrop"></a>`:""}constructor(){super(),this.initPropertiesDefaultValues()}firstUpdated(){this.classList.contains("right-align")&&(this["right-align"]=!0),this.triggerEl=this.renderRoot.querySelector(".trigger"),this.triggerEl.addEventListener("click",this._onClick.bind(this)),this.dropdownEl=this.renderRoot.querySelector(".dropdown"),this.dropdownContentEl=this.renderRoot.querySelector(".dropdown-content")}updated(e){this.updateDropdownSize(),e.has("opened")&&this.fire(this.opened?"opened":"closed",{opened:this.opened,dd:this})}_onClick(e){this.disabled||this.toggle()}open(){this.opened=!0}close(){this.opened=!1}toggle(){this.opened=!this.opened}onWindowClick(e){if(!this.opened)return;let t=e.target;if(!t)return void(this.opened=!1);let r=t.flowDropdown||t.closest?.("flow-dropdown"),i=t.classList?.contains("backdrop")||!1;if(!r){let n=e.path||("function"==typeof e.composedPath?e.composedPath():null),o=n?.[0]||t;for(;o;){if(i=i||o.classList?.contains("backdrop")||!1,o.flowDropdown){r=o.flowDropdown;break}if(o.matches?.("flow-dropdown")){r=o;break}o=o instanceof ShadowRoot?o.host:o.parentNode}}r&&r==this?i&&!this.modal&&(this.opened=!1):this.opened=!1}onWindowResize(){this.updateDropdownSize()}onParentScroll(){this.updateDropdownSize()}updateDropdownSize(){let{dropdownContentEl:e,dropdownEl:t,scrollParants:r,triggerEl:i}=this;if(!(i&&e&&t&&r&&r.length))return;let n=t.getBoundingClientRect();if(!this.absolute){let{left:t,bottom:r,right:o}=n,s=window.innerWidth,a=window.innerHeight,c=e.style;r-=this.yOffset,this["right-align"]?(c.maxWidth=o-this.xMargin+"px",c.left="initial",c.right=s-o+"px"):(c.maxWidth=`calc(100vw - ${t+this.xMargin}px)`,c.right="initial",c.left=`${t}px`),c.bottom="unset",c.top=`${r}px`;let l=a-(r+this.yMargin);c.maxHeight=`${l}px`;let u=i.getBoundingClientRect(),h=u.top+this.yOverflowMargin;return void(l<h&&(c.top="unset",c.bottom=`calc(100% - ${u.top}px)`,c.maxHeight=`${h}px`))}let o=r[0].getBoundingClientRect(),s=Math.max(n.top-o.top,0),a=Math.max(o.top-n.top,0),c=o.height-s-20,l=Math.max(n.left-o.left,0),u=Math.max(o.left-n.left,0),h=o.width-l-20;DCElStyle.transform=`translate(${u}px, ${a}px)`,DCElStyle.maxWidth=h+"px",DCElStyle.maxHeight=c+"px"}connectedCallback(){super.connectedCallback(),this._onWindowClick=this._onWindowClick||this.onWindowClick.bind(this),this._onWindowResize=this._onWindowResize||this.onWindowResize.bind(this),this._onParentScroll=this._onParentScroll||this.onParentScroll.bind(this),window.addEventListener("click",this._onWindowClick,{capture:!0}),window.addEventListener("resize",this._onWindowResize,{capture:!0});let e=()=>{this.scrollParants=this.findScrollParents(),this.scrollParants.forEach((e=>{e.addEventListener("scroll",this._onParentScroll)}))};e(),this.scrollParants.length||(0,p.Kg)(1e3,(()=>{e()}))}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("click",this._onWindowClick),window.removeEventListener("resize",this._onWindowResize),this.scrollParants.forEach((e=>{e.removeEventListener("scroll",this._onParentScroll)})),this.scrollParants=[]}findScrollParents(){let e=[],t=this.parentNode;for(;t;)if(t instanceof ShadowRoot)t=t.host;else{if(!(t instanceof HTMLElement))break;if("BODY"==t.nodeName){e.push(t);break}this.isScrollEl(t)&&e.push(t),t=t.parentNode}return e}isScrollEl(e){const{overflow:t,overflowX:r,overflowY:i}=getComputedStyle(e);return/auto|scroll|overlay|hidden/.test(t+i+r)}}ye.define("flow-dropdown");class we extends I{static get properties(){return{label:{type:String},textAttr:{type:String},showfilter:{type:Boolean},backdrop:{type:Boolean},modal:{type:Boolean},filterText:{type:String},searchIcon:{type:String},disabled:{type:Boolean,reflect:!0},placeholder:{type:String},"right-align":{type:Boolean}}}static get styles(){return[super.styles,p.iv`
			:host{
				display:var(--flow-select-display, inline-block);vertical-align:middle;
				font-family:var(--flow-font-family, "Julius Sans One");
				padding:var(--flow-select-padding, 0px);
				margin:var(--flow-select-margin, 5px);
				width:var(--flow-select-width);
				max-width:var(--flow-select-max-width, 100%);
				height:var(--flow-select-height);
				--flow-dropdown-border:var(--flow-select-dropdown-border, 1px solid var(--flow-primary-color, #000));
				--flow-dropdown-trigger-bg:var(--flow-select-trigger-bg, transparent);
				--flow-dropdown-trigger-color:var(--flow-select-trigger-color, var(--flow-color, #000));
				--flow-dropdown-trigger-padding:var(--flow-select-trigger-padding, 0px);
				--flow-dropdown-trigger-hover-bg:var(--flow-select-trigger-hover-bg, transparent);
				--flow-dropdown-trigger-hover-color:var(--flow-select-trigger-hover-color, var(--flow-dropdown-trigger-color));
				--flow-dropdown-trigger-line-height:var(--flow-select-trigger-line-height, 1);
				--flow-dropdown-top:var(--flow-select-dropdown-border-top, -8px);
				--flow-dropdown-trigger-font-size:0px;
			}
			flow-dropdown{margin:0px;}
			.wrapper{
				display:flex;
				align-items:stretch;
				min-width:50px;
				text-align:center;
				/*justify-content:center;*/
				margin-top:var(--flow-select-wrapper-margin-top,-0.5rem);
				
				
			}
			label{
				/*font-size:0.7rem;
				padding:2px 5px;*/
				font-size:var(--flow-select-label-font-size, 0.7rem);
				padding:var(--flow-select-label-padding,2px 5px);
				/*border:2px solid var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1)));*/
				border: var(--flow-select-label-border, 2px) solid  var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-radius:8px;
				margin-left:var(--flow-select-label-margin-left,10px);
				margin-right: var(--flow-input-label-margin-right,20px);
				z-index:1;
    			position:relative;background-color:var(--flow-input-bg, inherit);
    			font-weight:var(--flow-font-weight, bold);
			}
			.input{
				
				flex:1;box-sizing:border-box;
			    /*border:2px solid var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1)));*/
				border: var(--flow-select-border, 2px) solid var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-radius:var(--flow-select-input-border-radius, var(--flow-input-border-radius, 8px));
    			margin:var(--flow-select-input-margin, 0px);
    			padding:var(--flow-select-input-padding,16px 30px 10px 10px);
				background-color:var(--flow-select-input-bg, var(--flow-input-bg, inherit));
				color:var(--flow-input-color, inherit);
				font-size:var(--flow-input-font-size, 1rem);
				font-weight:var(--flow-input-font-weight, 400);
				line-height:var(--flow-input-line-height, 1.2);
				text-align:left;
				height:var(--flow-select-input-height);
				width:var(--flow-select-input-width);
			}
			:host(.no-border) .input.selected{
				border:0px;
			}
			[no-label] .input.selected{
				padding-top:var(--flow-select-no-label-input-padding-top, 10px);
			}
			.input:focus{outline:none}
			.input::-webkit-input-placeholder { color: var(--flow-input-placeholder, #888 ); }
			.input.selected{
				min-width:var(--flow-select-selected-min-width, 100px);
				max-width:var(--flow-select-selected-max-width, 500px);
				min-height:var(--flow-select-selected-min-height, 44px);
				position:relative;
				box-shadow:var(--flow-input-box-shadow);
				height:var(--flow-select-selected-height);	
				width:var(--flow-select-selected-width);
				overflow: hidden;
    			text-overflow: ellipsis;
			}
			.placeholder{
				color: var(--flow-input-placeholder, #888 );
			}
			[multiple] .input.selected span.item{
				margin:var(--flow-select-selected-item-margin, 2px 4px 2px 0);
				padding:var(--flow-select-selected-item-padding, 1px 5px);
				border-radius:var(--flow-select-selected-item-border-radius, 5px);
				border:var(--flow-select-selected-item-border, 1px solid var(--flow-primary-color, #DDD));
				line-height:var(--flow-input-line-height, 1.3);
			}
			[multiple] .input.selected{
				display:var(--flow-select-selection-display, flex);
				flex-wrap:var(--flow-select-selection-flex-wrap, wrap);
				min-height:var(--flow-select-selected-min-height, 60px);
				align-items:var(--flow-select-selection-align-items, center);
			}

			:host(:not([disabled])) .input.selected::after{
				content:"";display:inline-block;
				position:absolute;right:10px;
				top:var(--flow-select-dropdown-arrow, calc(50% - 2px));
				width:0px;height:0px;
				border:5px solid var(--flow-primary-color, #000);
				border-left-color:transparent;
				border-bottom-color:transparent;
				border-right-color:transparent;
			}
			flow-dropdown:not([multiple]) .input.selected{white-space:nowrap}
			.filter{
				padding-top:10px;border-radius:3px;
			}
			.filter-box{
				position:relative;display:flex;align-items:center;
				margin:var(--flow-select-filter-input-margin, 0px 0px 5px);
			}
			.filter-box[hidden]{display:none}
			.filter-box .clear-btn{
				position:absolute;right:10px;cursor:pointer;display:none;
				font-size:1.5rem;color:var(--flow-input-color, inherit);
			}
			.filter-box input[has-content]+.clear-btn{display:inline-block}
			.filter-box input{
				padding-left:30px;
			}
			.filter-box .icon{
				width:15px;height:15px;fill:var(--flow-primary-color);
				position:absolute;left:10px;
			}

			.dd ::slotted([flow-select-filtred]){display:none}
		`]}constructor(){super(),this.textAttr="data-text"}render(){let e=this.iconPath(this.searchIcon||"search"),t=!!this.label;return p.dy`<flow-dropdown ?multiple="${this.multiple}" ?backdrop="${this.backdrop}"
			?modal="${this.modal}"
			?disabled=${this.disabled}
			?no-label=${!t}
			?right-align=${this["right-align"]}>
			<div slot="trigger">
				<label ?hidden=${!t}>${this.label||""}</label>
				<div class="wrapper" @click=${this.onWrapperClick}>
					<slot name="prefix"></slot>
					<div class="input selected">
						${this.renderSelected()}&nbsp;
					</div>
					<slot name="sufix"></slot>
				</div>
				
			</div><div class="dd">
				<div class="filter-box" ?hidden=${!this.showfilter}>
					<svg class="icon">
						<use href="${e}"></use>
					</svg>
					<input class="input filter" type="text" 
						placeholder="${this.placeholder||"Search..."}"
						?has-content=${this.filterText}
						.value="${this.filterText||""}"
						@keyup=${this.onSearch} />
					<a class="clear-btn" @click=${this.clearFilter}>&times;</a>
				</div>
				<div class="menu-list-container">
				<slot class="menu-list"></slot>
				${this.renderItems()}
				</div>
			</div>
		</flow-dropdown>`}onWrapperClick(){}renderItems(){return""}renderSelected(){let e=new Map;this.list.forEach((t=>{let r=t.getAttribute(this.textAttr)||t.innerText;e.set(t.getAttribute(this.valueAttr),r)}));let t=this._selected.map((t=>t?p.dy`<span class="item" value="${t}">${e.get(t)||t}</span>`:"")).filter((e=>!!e));return t.length?t:p.dy`<span class="placeholder">${this.placeholder||""}</span>`}selectionChanged(){super.selectionChanged(),!this.multiple&&this.dropdown&&this.dropdown.close()}firstUpdated(){super.firstUpdated(),this.classList.contains("right-align")&&(this["right-align"]=!0),this.wrapperEl=this.renderRoot.querySelector("flow-dropdown .wrapper"),this.dropdown=this.renderRoot.querySelector("flow-dropdown");let e=this.renderRoot.querySelector("slot.menu-list");this.listSlot=e,e.addEventListener("slotchange",(e=>{this.updateList()})),this.parseSelected(),this.requestUpdate("_selected",[])}updateList(e){super.updateList(),e||this.requestUpdate("_selected",this._selected.slice(0))}clearFilter(){this.filterText="",this.filterList("")}onSearch(e){let t=e.target.value;this.filterText=t,this.debounce("onSearch",(()=>{this.filterList(t)}),200)}filterList(e){const t=new RegExp(`${e}`,"i");console.log("this.list",this.list),this.list.forEach((e=>{let r=e.getAttribute(this.textAttr)||e.innerText,i=e.getAttribute(this.valueAttr);!r||t.test(i)||t.test(r)?e.removeAttribute("flow-select-filtred"):e.setAttribute("flow-select-filtred",!0)}))}}we.define("flow-select"),__webpack_require__(7318);class _e extends p.Hc{static get properties(){return{disabled:{type:Boolean,reflect:!0},icon:{type:Boolean,reflect:!0},href:{type:String},target:{type:String}}}static get styles(){return p.iv`
			:host{
				display:inline-block;
				font-family:var(--flow-link-font-family, var(--flow-font-family, "Julius Sans One"));
				font-weight:var(--flow-link-font-weight, var(--flow-font-weight, bold));
				font-size:var(--flow-link-font-size, 1rem);
			}
			:host([disabled]){
				opacity:0.5;
				cursor:default;
				pointer-events:none;
			}
			:host(:not([disabled])){
				cursor:pointer;
			}

			.link-wrapper {
				color: var(--flow-link-color, #017b68);
				display: flex;
			}

			.link-wrapper:hover {
				color: var(--flow-link-hover-color, #017b68);
			}

			.icon-box {
				display: block;
				width: 16px;
				height: 16px;
				margin-bottom: -4px;
				opacity: 0.65;
			}

			.icon-box svg {
				fill: var(--flow-primary-color, #017b68);
				width: 100%;
				height: 100%;
			}

			.content {
				display: block;
			}
		`}constructor(){super()}render(){let e=this.iconPath("external-link-square-alt");return p.dy`
		<div class="link-wrapper" @click=${this.click}>
			<div class="content"><slot></slot></div>
			${this.icon?p.dy`<div class="icon-box"><svg><use href="${e}"></use></svg></div>`:""}
		</div>
		`}click(){if(this.fire("flow-link-click",{el:this}),this.href)if("undefined"==typeof nw){let e=document.createElement("a");e.href=this.href,this.target&&(e.target=this.target),e.click()}else require("nw.gui").Shell.openExternal(this.href)}}_e.define("flow-link"),class extends we{static get properties(){return{mergeProps:{type:String},mergeAttributes:{type:String},mergeInnerHTML:{type:Boolean}}}static get styles(){return[we.styles,p.iv`
            :host{
                --flow-select-input-height:var(--flow-selector-input-height, auto);
                width:var(--flow-selector-width, unset);
            }
            flow-dropdown{
                width:var(--flow-selector-dropdown-width, auto);
            }
            .input.selected{
                min-height:var(--flow-selector-selected-min-height, 50px);
                min-width:var(--flow-selector-selected-min-width, 10px);
                width:var(--flow-selector-selected-width, 100%);
                font-size:0px;display:flex;align-items:center;
                box-sizing:border-box;
                padding:var(--flow-selector-selected-padding, 16px 30px 10px 10px);
                flex-wrap:var(--flow-selector-selected-flex-wrap, wrap);
            }
            .input.selected::after{
                top:calc(50% - 2px);
            }
            .input.selected .item{
                margin:var(--flow-selector-item-margin, 0px);
                font-size:var(--flow-selector-item-line-height, 1rem);
                line-height:var(--flow-selector-item-line-height, 1.1);
            }
            :host([multiple]) .selected .item{
                margin:var(--flow-selector-multiple-item-margin, 0px 5px 5px 0px);
            }
        `]}constructor(){super(),this.mergeProps=""}renderSelected(){let e=new Map;return this.list.forEach((t=>{e.set(t.getAttribute(this.valueAttr),t)})),this._selected.map((t=>{let r=e.get(t);if(!r)return;let i=r.cloneNode(this.mergeInnerHTML||!1);return i.removeAttribute("flow-select-filtred"),i.classList.remove("menu-item","selected"),i.classList.add("item"),this.mergeNobeProperties(i,r)})).filter((e=>!!e))}get selectedNodes(){let e=new Map;return this.list.forEach((t=>{e.set(t.getAttribute(this.valueAttr),t)})),this._selected.map((t=>e.get(t))).filter((e=>!!e))}mergeNobeProperties(e,t){let r=[];return this.mergeProps?r=this.mergeProps.split(","):t.constructor?.properties&&(r=Object.keys(t.constructor?.properties||{})),r.forEach((r=>{e[r]=t[r]})),this.mergeAttributes&&this.mergeAttributes.split(",").forEach((r=>{r&&e.setAttribute(r,t.getAttribute(r))})),e}}.define("flow-selector");class xe extends p.Hc{static get properties(){return{locale:{type:String},tz:{type:String},city:{type:String}}}static get styles(){return p.iv`
			:host {
				padding: 0px;
			}
			[col] { display: flex; flex-direction: column; }
			[row] { display: flex; flex-direction: row; }
			.caption { 
				font-size: var(--flow-clock-widget-caption-font-size, 9px);
				text-transform:var(--flow-clock-widget-caption-text-transform, uppercase);
				white-space: nowrap;
			}
			.time-wrapper {
				align-items: flex-start;
				padding: 1px;
			}
			.time { 
				font-size: var(--flow-clock-widget-time-font-size, 14px);
				font-family: var(--flow-clock-widget-time-font-family, "Consolas");	
			}
			.suffix {
				font-size: var(--flow-clock-widget-suffix-font-size, 10px);				
			}
		`}constructor(){super(),this.locale="en-US",this.tz="",this.city=""}connectedCallback(){super.connectedCallback(),this.interval=setInterval((()=>{this.requestUpdate()}),1e3)}disconnectedCallback(){super.disconnectedCallback(),this.interval&&(clearInterval(this.interval),delete this.interval)}render(){let e,t;if(this.tz.includes(":")){let r=this.tz.split(":");t=r.shift(),e=r.shift()}else e=this.city||this.tz.split("/").pop()||"N/A",t=this.tz||"UTC";const r=(new Date).toLocaleString(this.locale,{timeZone:t}),[i,n]=(new Date(r).toISOString(),new Date(r).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}).split(/\s/));return p.dy`
			<div col>
				<div class='caption'>${e.replace(/_/g," ")}</div>
				<div row class='time-wrapper'>
					<div class='time'>${i}</div>
					${n?p.dy`<div class="suffix"> ${n}</div>`:""}
				</div>
			</div>
		
		`}}function ke(e){return(ke="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function Se(e,t){return!t||"object"!==ke(t)&&"function"!=typeof t?Ae(e):t}function Ee(e){return(Ee=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function Ae(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Ie(e,t){return(Ie=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function Ce(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Te(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function Oe(e,t,r){return t&&Te(e.prototype,t),r&&Te(e,r),e}xe.Defaults=["America/Los_Angeles:San_Francisco","America/New_York","Europe/London","Europe/Moscow","Asia/Dubai","Asia/Hong_Kong","Asia/Tokyo"],xe.define("flow-clock-widget"),class extends we{static get properties(){return{items:{type:String}}}static get styles(){return[we.styles,p.iv`
			.selected{
				min-width: var(--flow-theme-select-selected-min-width, 150px);
			}
		`]}constructor(){super(),this.items="dark,light",this.label="Theme",this.selected=this.getTheme("dark")}renderItems(){return this.items.split(",").map((e=>{let t=this.buildItemName(e);return p.dy`<div class="menu-item" value="${e}">${t}</div>`}))}get list(){return this.renderRoot?[...this.renderRoot.querySelectorAll(".menu-item")]:[]}buildItemName(e){return(e=e.toLowerCase().replace(/[_-]+/g," ").replace(/\s{2,}/g," ").trim()).charAt(0).toUpperCase()+e.slice(1)}selectionChanged(){super.selectionChanged();let e=this.value;e&&this.setTheme(e)}onThemeChange(){this.selected=this.getTheme(),this.requestUpdate("selected")}connectedCallback(){super.connectedCallback(),this._onThemeChange=this._onThemeChange||this.onThemeChange.bind(this),document.body.addEventListener("flow-theme-changed",this._onThemeChange)}disconnectedCallback(){super.disconnectedCallback(),document.body.removeEventListener("flow-theme-changed",this._onThemeChange)}getTheme(e){return(0,j.gh)(e)}setTheme(e){(0,j.Dc)(e)}}.define("flow-theme-select");var Me=function(){function e(){Ce(this,e)}return Oe(e,[{key:"on",value:function(e,t){return this._callbacks=this._callbacks||{},this._callbacks[e]||(this._callbacks[e]=[]),this._callbacks[e].push(t),this}},{key:"emit",value:function(e){this._callbacks=this._callbacks||{};var t=this._callbacks[e];if(t){for(var r=arguments.length,i=new Array(1<r?r-1:0),n=1;n<r;n++)i[n-1]=arguments[n];var o=!0,s=!1,a=void 0;try{for(var c,l=t[Symbol.iterator]();!(o=(c=l.next()).done);o=!0)c.value.apply(this,i)}catch(e){s=!0,a=e}finally{try{o||null==l.return||l.return()}finally{if(s)throw a}}}return this}},{key:"off",value:function(e,t){if(!this._callbacks||0===arguments.length)return this._callbacks={},this;var r=this._callbacks[e];if(!r)return this;if(1===arguments.length)return delete this._callbacks[e],this;for(var i=0;i<r.length;i++)if(r[i]===t){r.splice(i,1);break}return this}}]),e}(),Pe=function(){function e(t,r){var i,n,o;if(Ce(this,e),(i=Se(this,Ee(e).call(this))).element=t,i.version=e.version,i.defaultOptions.previewTemplate=i.defaultOptions.previewTemplate.replace(/\n*/g,""),i.clickableElements=[],i.listeners=[],i.files=[],"string"==typeof i.element&&(i.element=document.querySelector(i.element)),!i.element||null==i.element.nodeType)throw new Error("Invalid dropzone element.");if(i.element.dropzone)throw new Error("Dropzone already attached.");e.instances.push(Ae(i)),i.element.dropzone=Ae(i);var s=null!=(o=e.optionsForElement(i.element))?o:{};if(i.options=e.extend({},i.defaultOptions,s,null!=r?r:{}),i.options.forceFallback||!e.isBrowserSupported())return Se(i,i.options.fallback.call(Ae(i)));if(null==i.options.url&&(i.options.url=i.element.getAttribute("action")),!i.options.url)throw new Error("No URL provided.");if(i.options.acceptedFiles&&i.options.acceptedMimeTypes)throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");if(i.options.uploadMultiple&&i.options.chunking)throw new Error("You cannot set both: uploadMultiple and chunking.");return i.options.acceptedMimeTypes&&(i.options.acceptedFiles=i.options.acceptedMimeTypes,delete i.options.acceptedMimeTypes),null!=i.options.renameFilename&&(i.options.renameFile=function(e){return i.options.renameFilename.call(Ae(i),e.name,e)}),i.options.method=i.options.method.toUpperCase(),(n=i.getExistingFallback())&&n.parentNode&&n.parentNode.removeChild(n),!1!==i.options.previewsContainer&&(i.options.previewsContainer?i.previewsContainer=e.getElement(i.options.previewsContainer,"previewsContainer"):i.previewsContainer=i.element),i.options.clickable&&(!0===i.options.clickable?i.clickableElements=[i.element]:i.clickableElements=e.getElements(i.options.clickable,"clickable")),i.init(),i}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Ie(e,t)}(e,Me),Oe(e,null,[{key:"initClass",value:function(){this.prototype.Emitter=Me,this.prototype.events=["drop","dragstart","dragend","dragenter","dragover","dragleave","addedfile","addedfiles","removedfile","thumbnail","error","errormultiple","processing","processingmultiple","uploadprogress","totaluploadprogress","sending","sendingmultiple","success","successmultiple","canceled","canceledmultiple","complete","completemultiple","reset","maxfilesexceeded","maxfilesreached","queuecomplete"],this.prototype.defaultOptions={url:null,method:"post",withCredentials:!1,timeout:3e4,parallelUploads:2,uploadMultiple:!1,chunking:!1,forceChunking:!1,chunkSize:2e6,parallelChunkUploads:!1,retryChunks:!1,retryChunksLimit:3,maxFilesize:256,paramName:"file",createImageThumbnails:!0,maxThumbnailFilesize:10,thumbnailWidth:120,thumbnailHeight:120,thumbnailMethod:"crop",resizeWidth:null,resizeHeight:null,resizeMimeType:null,resizeQuality:.8,resizeMethod:"contain",filesizeBase:1e3,maxFiles:null,headers:null,clickable:!0,ignoreHiddenFiles:!0,acceptedFiles:null,acceptedMimeTypes:null,autoProcessQueue:!0,autoQueue:!0,addRemoveLinks:!1,previewsContainer:null,hiddenInputContainer:"body",capture:null,renameFilename:null,renameFile:null,forceFallback:!1,dictDefaultMessage:"Drop files here to upload",dictFallbackMessage:"Your browser does not support drag'n'drop file uploads.",dictFallbackText:"Please use the fallback form below to upload your files like in the olden days.",dictFileTooBig:"File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",dictInvalidFileType:"You can't upload files of this type.",dictResponseError:"Server responded with {{statusCode}} code.",dictCancelUpload:"Cancel upload",dictUploadCanceled:"Upload canceled.",dictCancelUploadConfirmation:"Are you sure you want to cancel this upload?",dictRemoveFile:"Remove file",dictRemoveFileConfirmation:null,dictMaxFilesExceeded:"You can not upload any more files.",dictFileSizeUnits:{tb:"TB",gb:"GB",mb:"MB",kb:"KB",b:"b"},init:function(){},params:function(e,t,r){if(r)return{dzuuid:r.file.upload.uuid,dzchunkindex:r.index,dztotalfilesize:r.file.size,dzchunksize:this.options.chunkSize,dztotalchunkcount:r.file.upload.totalChunkCount,dzchunkbyteoffset:r.index*this.options.chunkSize}},accept:function(e,t){return t()},chunksUploaded:function(e,t){t()},fallback:function(){var t;this.element.className="".concat(this.element.className," dz-browser-not-supported");var r=!0,i=!1,n=void 0;try{for(var o,s=this.element.getElementsByTagName("div")[Symbol.iterator]();!(r=(o=s.next()).done);r=!0){var a=o.value;if(/(^| )dz-message($| )/.test(a.className)){(t=a).className="dz-message";break}}}catch(t){i=!0,n=t}finally{try{r||null==s.return||s.return()}finally{if(i)throw n}}t||(t=e.createElement('<div class="dz-message"><span></span></div>'),this.element.appendChild(t));var c=t.getElementsByTagName("span")[0];return c&&(null!=c.textContent?c.textContent=this.options.dictFallbackMessage:null!=c.innerText&&(c.innerText=this.options.dictFallbackMessage)),this.element.appendChild(this.getFallbackForm())},resize:function(e,t,r,i){var n={srcX:0,srcY:0,srcWidth:e.width,srcHeight:e.height},o=e.width/e.height;null==t&&null==r?(t=n.srcWidth,r=n.srcHeight):null==t?t=r*o:null==r&&(r=t/o);var s=(t=Math.min(t,n.srcWidth))/(r=Math.min(r,n.srcHeight));if(n.srcWidth>t||n.srcHeight>r)if("crop"===i)s<o?(n.srcHeight=e.height,n.srcWidth=n.srcHeight*s):(n.srcWidth=e.width,n.srcHeight=n.srcWidth/s);else{if("contain"!==i)throw new Error("Unknown resizeMethod '".concat(i,"'"));s<o?r=t/o:t=r*o}return n.srcX=(e.width-n.srcWidth)/2,n.srcY=(e.height-n.srcHeight)/2,n.trgWidth=t,n.trgHeight=r,n},transformFile:function(e,t){return(this.options.resizeWidth||this.options.resizeHeight)&&e.type.match(/image.*/)?this.resizeImage(e,this.options.resizeWidth,this.options.resizeHeight,this.options.resizeMethod,t):t(e)},previewTemplate:'<div class="dz-preview dz-file-preview">\n  <div class="dz-image"><img data-dz-thumbnail /></div>\n  <div class="dz-details">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n      <title>Check</title>\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n      <title>Error</title>\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">\n          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>',drop:function(){return this.element.classList.remove("dz-drag-hover")},dragstart:function(){},dragend:function(){return this.element.classList.remove("dz-drag-hover")},dragenter:function(){return this.element.classList.add("dz-drag-hover")},dragover:function(){return this.element.classList.add("dz-drag-hover")},dragleave:function(){return this.element.classList.remove("dz-drag-hover")},paste:function(){},reset:function(){return this.element.classList.remove("dz-started")},addedfile:function(t){var r=this;if(this.element===this.previewsContainer&&this.element.classList.add("dz-started"),this.previewsContainer){t.previewElement=e.createElement(this.options.previewTemplate.trim()),t.previewTemplate=t.previewElement,this.previewsContainer.appendChild(t.previewElement);var i=!0,n=!1,o=void 0;try{for(var s,a=t.previewElement.querySelectorAll("[data-dz-name]")[Symbol.iterator]();!(i=(s=a.next()).done);i=!0){var c=s.value;c.textContent=t.name}}catch(i){n=!0,o=i}finally{try{i||null==a.return||a.return()}finally{if(n)throw o}}var l=!0,u=!1,h=void 0;try{for(var d,f=t.previewElement.querySelectorAll("[data-dz-size]")[Symbol.iterator]();!(l=(d=f.next()).done);l=!0)(c=d.value).innerHTML=this.filesize(t.size)}catch(i){u=!0,h=i}finally{try{l||null==f.return||f.return()}finally{if(u)throw h}}this.options.addRemoveLinks&&(t._removeLink=e.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>'.concat(this.options.dictRemoveFile,"</a>")),t.previewElement.appendChild(t._removeLink));var p=function(i){return i.preventDefault(),i.stopPropagation(),t.status===e.UPLOADING?e.confirm(r.options.dictCancelUploadConfirmation,(function(){return r.removeFile(t)})):r.options.dictRemoveFileConfirmation?e.confirm(r.options.dictRemoveFileConfirmation,(function(){return r.removeFile(t)})):r.removeFile(t)},g=!0,m=!1,b=void 0;try{for(var v,y=t.previewElement.querySelectorAll("[data-dz-remove]")[Symbol.iterator]();!(g=(v=y.next()).done);g=!0)v.value.addEventListener("click",p)}catch(i){m=!0,b=i}finally{try{g||null==y.return||y.return()}finally{if(m)throw b}}}},removedfile:function(e){return null!=e.previewElement&&null!=e.previewElement.parentNode&&e.previewElement.parentNode.removeChild(e.previewElement),this._updateMaxFilesReachedClass()},thumbnail:function(e,t){if(e.previewElement){e.previewElement.classList.remove("dz-file-preview");var r=!0,i=!1,n=void 0;try{for(var o,s=e.previewElement.querySelectorAll("[data-dz-thumbnail]")[Symbol.iterator]();!(r=(o=s.next()).done);r=!0){var a=o.value;a.alt=e.name,a.src=t}}catch(e){i=!0,n=e}finally{try{r||null==s.return||s.return()}finally{if(i)throw n}}return setTimeout((function(){return e.previewElement.classList.add("dz-image-preview")}),1)}},error:function(e,t){if(e.previewElement){e.previewElement.classList.add("dz-error"),"String"!=typeof t&&t.error&&(t=t.error);var r=!0,i=!1,n=void 0;try{for(var o,s=e.previewElement.querySelectorAll("[data-dz-errormessage]")[Symbol.iterator]();!(r=(o=s.next()).done);r=!0)o.value.textContent=t}catch(e){i=!0,n=e}finally{try{r||null==s.return||s.return()}finally{if(i)throw n}}}},errormultiple:function(){},processing:function(e){if(e.previewElement&&(e.previewElement.classList.add("dz-processing"),e._removeLink))return e._removeLink.innerHTML=this.options.dictCancelUpload},processingmultiple:function(){},uploadprogress:function(e,t){if(e.previewElement){var r=!0,i=!1,n=void 0;try{for(var o,s=e.previewElement.querySelectorAll("[data-dz-uploadprogress]")[Symbol.iterator]();!(r=(o=s.next()).done);r=!0){var a=o.value;"PROGRESS"===a.nodeName?a.value=t:a.style.width="".concat(t,"%")}}catch(e){i=!0,n=e}finally{try{r||null==s.return||s.return()}finally{if(i)throw n}}}},totaluploadprogress:function(){},sending:function(){},sendingmultiple:function(){},success:function(e){if(e.previewElement)return e.previewElement.classList.add("dz-success")},successmultiple:function(){},canceled:function(e){return this.emit("error",e,this.options.dictUploadCanceled)},canceledmultiple:function(){},complete:function(e){if(e._removeLink&&(e._removeLink.innerHTML=this.options.dictRemoveFile),e.previewElement)return e.previewElement.classList.add("dz-complete")},completemultiple:function(){},maxfilesexceeded:function(){},maxfilesreached:function(){},queuecomplete:function(){},addedfiles:function(){}},this.prototype._thumbnailQueue=[],this.prototype._processingThumbnail=!1}},{key:"extend",value:function(e){for(var t=arguments.length,r=new Array(1<t?t-1:0),i=1;i<t;i++)r[i-1]=arguments[i];for(var n=0,o=r;n<o.length;n++){var s=o[n];for(var a in s){var c=s[a];e[a]=c}}return e}}]),Oe(e,[{key:"getAcceptedFiles",value:function(){return this.files.filter((function(e){return e.accepted})).map((function(e){return e}))}},{key:"getRejectedFiles",value:function(){return this.files.filter((function(e){return!e.accepted})).map((function(e){return e}))}},{key:"getFilesWithStatus",value:function(e){return this.files.filter((function(t){return t.status===e})).map((function(e){return e}))}},{key:"getQueuedFiles",value:function(){return this.getFilesWithStatus(e.QUEUED)}},{key:"getUploadingFiles",value:function(){return this.getFilesWithStatus(e.UPLOADING)}},{key:"getAddedFiles",value:function(){return this.getFilesWithStatus(e.ADDED)}},{key:"getActiveFiles",value:function(){return this.files.filter((function(t){return t.status===e.UPLOADING||t.status===e.QUEUED})).map((function(e){return e}))}},{key:"init",value:function(){var t=this;"form"===this.element.tagName&&this.element.setAttribute("enctype","multipart/form-data"),this.element.classList.contains("dropzone")&&!this.element.querySelector(".dz-message")&&this.element.appendChild(e.createElement('<div class="dz-default dz-message"><button class="dz-button" type="button">'.concat(this.options.dictDefaultMessage,"</button></div>"))),this.clickableElements.length&&function r(){return t.hiddenFileInput&&t.hiddenFileInput.parentNode.removeChild(t.hiddenFileInput),t.hiddenFileInput=document.createElement("input"),t.hiddenFileInput.setAttribute("type","file"),(null===t.options.maxFiles||1<t.options.maxFiles)&&t.hiddenFileInput.setAttribute("multiple","multiple"),t.hiddenFileInput.className="dz-hidden-input",null!==t.options.acceptedFiles&&t.hiddenFileInput.setAttribute("accept",t.options.acceptedFiles),null!==t.options.capture&&t.hiddenFileInput.setAttribute("capture",t.options.capture),t.hiddenFileInput.style.visibility="hidden",t.hiddenFileInput.style.position="absolute",t.hiddenFileInput.style.top="0",t.hiddenFileInput.style.left="0",t.hiddenFileInput.style.height="0",t.hiddenFileInput.style.width="0",e.getElement(t.options.hiddenInputContainer,"hiddenInputContainer").appendChild(t.hiddenFileInput),t.hiddenFileInput.addEventListener("change",(function(){var e=t.hiddenFileInput.files;if(e.length){var i=!0,n=!1,o=void 0;try{for(var s,a=e[Symbol.iterator]();!(i=(s=a.next()).done);i=!0){var c=s.value;t.addFile(c)}}catch(e){n=!0,o=e}finally{try{i||null==a.return||a.return()}finally{if(n)throw o}}}return t.emit("addedfiles",e),r()}))}(),this.URL=null!==window.URL?window.URL:window.webkitURL;var r=!0,i=!1,n=void 0;try{for(var o,s=this.events[Symbol.iterator]();!(r=(o=s.next()).done);r=!0){var a=o.value;this.on(a,this.options[a])}}catch(r){i=!0,n=r}finally{try{r||null==s.return||s.return()}finally{if(i)throw n}}function c(e){var t;return(t=e).dataTransfer.types&&t.dataTransfer.types.some((function(e){return"Files"==e}))&&(e.stopPropagation(),e.preventDefault?e.preventDefault():e.returnValue=!1)}return this.on("uploadprogress",(function(){return t.updateTotalUploadProgress()})),this.on("removedfile",(function(){return t.updateTotalUploadProgress()})),this.on("canceled",(function(e){return t.emit("complete",e)})),this.on("complete",(function(e){if(0===t.getAddedFiles().length&&0===t.getUploadingFiles().length&&0===t.getQueuedFiles().length)return setTimeout((function(){return t.emit("queuecomplete")}),0)})),this.listeners=[{element:this.element,events:{dragstart:function(e){return t.emit("dragstart",e)},dragenter:function(e){return c(e),t.emit("dragenter",e)},dragover:function(e){var r;try{r=e.dataTransfer.effectAllowed}catch(e){}return e.dataTransfer.dropEffect="move"===r||"linkMove"===r?"move":"copy",c(e),t.emit("dragover",e)},dragleave:function(e){return t.emit("dragleave",e)},drop:function(e){return c(e),t.drop(e)},dragend:function(e){return t.emit("dragend",e)}}}],this.clickableElements.forEach((function(r){return t.listeners.push({element:r,events:{click:function(i){return r===t.element&&i.target!==t.element&&!e.elementInside(i.target,t.element.querySelector(".dz-message"))||t.hiddenFileInput.click(),!0}}})})),this.enable(),this.options.init.call(this)}},{key:"destroy",value:function(){return this.disable(),this.removeAllFiles(!0),null!=this.hiddenFileInput&&this.hiddenFileInput.parentNode&&(this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput),this.hiddenFileInput=null),delete this.element.dropzone,e.instances.splice(e.instances.indexOf(this),1)}},{key:"updateTotalUploadProgress",value:function(){var e,t=0,r=0;if(this.getActiveFiles().length){var i=!0,n=!1,o=void 0;try{for(var s,a=this.getActiveFiles()[Symbol.iterator]();!(i=(s=a.next()).done);i=!0){var c=s.value;t+=c.upload.bytesSent,r+=c.upload.total}}catch(e){n=!0,o=e}finally{try{i||null==a.return||a.return()}finally{if(n)throw o}}e=100*t/r}else e=100;return this.emit("totaluploadprogress",e,r,t)}},{key:"_getParamName",value:function(e){return"function"==typeof this.options.paramName?this.options.paramName(e):"".concat(this.options.paramName).concat(this.options.uploadMultiple?"[".concat(e,"]"):"")}},{key:"_renameFile",value:function(e){return"function"!=typeof this.options.renameFile?e.name:this.options.renameFile(e)}},{key:"getFallbackForm",value:function(){var t,r;if(t=this.getExistingFallback())return t;var i='<div class="dz-fallback">';this.options.dictFallbackText&&(i+="<p>".concat(this.options.dictFallbackText,"</p>")),i+='<input type="file" name="'.concat(this._getParamName(0),'" ').concat(this.options.uploadMultiple?'multiple="multiple"':void 0,' /><input type="submit" value="Upload!"></div>');var n=e.createElement(i);return"FORM"!==this.element.tagName?(r=e.createElement('<form action="'.concat(this.options.url,'" enctype="multipart/form-data" method="').concat(this.options.method,'"></form>'))).appendChild(n):(this.element.setAttribute("enctype","multipart/form-data"),this.element.setAttribute("method",this.options.method)),null!=r?r:n}},{key:"getExistingFallback",value:function(){for(var e=function(e){var t=!0,r=!1,i=void 0;try{for(var n,o=e[Symbol.iterator]();!(t=(n=o.next()).done);t=!0){var s=n.value;if(/(^| )fallback($| )/.test(s.className))return s}}catch(e){r=!0,i=e}finally{try{t||null==o.return||o.return()}finally{if(r)throw i}}},t=0,r=["div","form"];t<r.length;t++){var i,n=r[t];if(i=e(this.element.getElementsByTagName(n)))return i}}},{key:"setupEventListeners",value:function(){return this.listeners.map((function(e){return function(){var t=[];for(var r in e.events){var i=e.events[r];t.push(e.element.addEventListener(r,i,!1))}return t}()}))}},{key:"removeEventListeners",value:function(){return this.listeners.map((function(e){return function(){var t=[];for(var r in e.events){var i=e.events[r];t.push(e.element.removeEventListener(r,i,!1))}return t}()}))}},{key:"disable",value:function(){var e=this;return this.clickableElements.forEach((function(e){return e.classList.remove("dz-clickable")})),this.removeEventListeners(),this.disabled=!0,this.files.map((function(t){return e.cancelUpload(t)}))}},{key:"enable",value:function(){return delete this.disabled,this.clickableElements.forEach((function(e){return e.classList.add("dz-clickable")})),this.setupEventListeners()}},{key:"filesize",value:function(e){var t=0,r="b";if(0<e){for(var i=["tb","gb","mb","kb","b"],n=0;n<i.length;n++){var o=i[n];if(Math.pow(this.options.filesizeBase,4-n)/10<=e){t=e/Math.pow(this.options.filesizeBase,4-n),r=o;break}}t=Math.round(10*t)/10}return"<strong>".concat(t,"</strong> ").concat(this.options.dictFileSizeUnits[r])}},{key:"_updateMaxFilesReachedClass",value:function(){return null!=this.options.maxFiles&&this.getAcceptedFiles().length>=this.options.maxFiles?(this.getAcceptedFiles().length===this.options.maxFiles&&this.emit("maxfilesreached",this.files),this.element.classList.add("dz-max-files-reached")):this.element.classList.remove("dz-max-files-reached")}},{key:"drop",value:function(e){if(e.dataTransfer){this.emit("drop",e);for(var t=[],r=0;r<e.dataTransfer.files.length;r++)t[r]=e.dataTransfer.files[r];if(t.length){var i=e.dataTransfer.items;i&&i.length&&null!=i[0].webkitGetAsEntry?this._addFilesFromItems(i):this.handleFiles(t)}this.emit("addedfiles",t)}}},{key:"paste",value:function(e){if(null!=function(e){return null!=e?function(e){return e.items}(e):void 0}(null!=e?e.clipboardData:void 0)){this.emit("paste",e);var t=e.clipboardData.items;return t.length?this._addFilesFromItems(t):void 0}}},{key:"handleFiles",value:function(e){var t=!0,r=!1,i=void 0;try{for(var n,o=e[Symbol.iterator]();!(t=(n=o.next()).done);t=!0){var s=n.value;this.addFile(s)}}catch(e){r=!0,i=e}finally{try{t||null==o.return||o.return()}finally{if(r)throw i}}}},{key:"_addFilesFromItems",value:function(e){var t=this;return function(){var r=[],i=!0,n=!1,o=void 0;try{for(var s,a=e[Symbol.iterator]();!(i=(s=a.next()).done);i=!0){var c,l=s.value;null!=l.webkitGetAsEntry&&(c=l.webkitGetAsEntry())?c.isFile?r.push(t.addFile(l.getAsFile())):c.isDirectory?r.push(t._addFilesFromDirectory(c,c.name)):r.push(void 0):null==l.getAsFile||null!=l.kind&&"file"!==l.kind?r.push(void 0):r.push(t.addFile(l.getAsFile()))}}catch(r){n=!0,o=r}finally{try{i||null==a.return||a.return()}finally{if(n)throw o}}return r}()}},{key:"_addFilesFromDirectory",value:function(e,t){function r(e){return function(e,t,r){return null!=e&&"function"==typeof e.log?r(e):void 0}(console,0,(function(t){return t.log(e)}))}var i=this,n=e.createReader();return function e(){return n.readEntries((function(r){if(0<r.length){var n=!0,o=!1,s=void 0;try{for(var a,c=r[Symbol.iterator]();!(n=(a=c.next()).done);n=!0){var l=a.value;l.isFile?l.file((function(e){if(!i.options.ignoreHiddenFiles||"."!==e.name.substring(0,1))return e.fullPath="".concat(t,"/").concat(e.name),i.addFile(e)})):l.isDirectory&&i._addFilesFromDirectory(l,"".concat(t,"/").concat(l.name))}}catch(r){o=!0,s=r}finally{try{n||null==c.return||c.return()}finally{if(o)throw s}}e()}return null}),r)}()}},{key:"accept",value:function(t,r){this.options.maxFilesize&&t.size>1024*this.options.maxFilesize*1024?r(this.options.dictFileTooBig.replace("{{filesize}}",Math.round(t.size/1024/10.24)/100).replace("{{maxFilesize}}",this.options.maxFilesize)):e.isValidFile(t,this.options.acceptedFiles)?null!=this.options.maxFiles&&this.getAcceptedFiles().length>=this.options.maxFiles?(r(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}",this.options.maxFiles)),this.emit("maxfilesexceeded",t)):this.options.accept.call(this,t,r):r(this.options.dictInvalidFileType)}},{key:"addFile",value:function(t){var r=this;t.upload={uuid:e.uuidv4(),progress:0,total:t.size,bytesSent:0,filename:this._renameFile(t)},this.files.push(t),t.status=e.ADDED,this.emit("addedfile",t),this._enqueueThumbnail(t),this.accept(t,(function(e){e?(t.accepted=!1,r._errorProcessing([t],e)):(t.accepted=!0,r.options.autoQueue&&r.enqueueFile(t)),r._updateMaxFilesReachedClass()}))}},{key:"enqueueFiles",value:function(e){var t=!0,r=!1,i=void 0;try{for(var n,o=e[Symbol.iterator]();!(t=(n=o.next()).done);t=!0){var s=n.value;this.enqueueFile(s)}}catch(e){r=!0,i=e}finally{try{t||null==o.return||o.return()}finally{if(r)throw i}}return null}},{key:"enqueueFile",value:function(t){var r=this;if(t.status!==e.ADDED||!0!==t.accepted)throw new Error("This file can't be queued because it has already been processed or was rejected.");if(t.status=e.QUEUED,this.options.autoProcessQueue)return setTimeout((function(){return r.processQueue()}),0)}},{key:"_enqueueThumbnail",value:function(e){var t=this;if(this.options.createImageThumbnails&&e.type.match(/image.*/)&&e.size<=1024*this.options.maxThumbnailFilesize*1024)return this._thumbnailQueue.push(e),setTimeout((function(){return t._processThumbnailQueue()}),0)}},{key:"_processThumbnailQueue",value:function(){var e=this;if(!this._processingThumbnail&&0!==this._thumbnailQueue.length){this._processingThumbnail=!0;var t=this._thumbnailQueue.shift();return this.createThumbnail(t,this.options.thumbnailWidth,this.options.thumbnailHeight,this.options.thumbnailMethod,!0,(function(r){return e.emit("thumbnail",t,r),e._processingThumbnail=!1,e._processThumbnailQueue()}))}}},{key:"removeFile",value:function(t){if(t.status===e.UPLOADING&&this.cancelUpload(t),this.files=Be(this.files,t),this.emit("removedfile",t),0===this.files.length)return this.emit("reset")}},{key:"removeAllFiles",value:function(t){null==t&&(t=!1);var r=!0,i=!1,n=void 0;try{for(var o,s=this.files.slice()[Symbol.iterator]();!(r=(o=s.next()).done);r=!0){var a=o.value;a.status===e.UPLOADING&&!t||this.removeFile(a)}}catch(t){i=!0,n=t}finally{try{r||null==s.return||s.return()}finally{if(i)throw n}}return null}},{key:"resizeImage",value:function(t,r,i,n,o){var s=this;return this.createThumbnail(t,r,i,n,!0,(function(r,i){if(null==i)return o(t);var n=s.options.resizeMimeType;null==n&&(n=t.type);var a=i.toDataURL(n,s.options.resizeQuality);return"image/jpeg"!==n&&"image/jpg"!==n||(a=Ne.restore(t.dataURL,a)),o(e.dataURItoBlob(a))}))}},{key:"createThumbnail",value:function(e,t,r,i,n,o){var s=this,a=new FileReader;a.onload=function(){e.dataURL=a.result,"image/svg+xml"!==e.type?s.createThumbnailFromUrl(e,t,r,i,n,o):null!=o&&o(a.result)},a.readAsDataURL(e)}},{key:"displayExistingFile",value:function(e,t,r,i,n){var o=this,s=!(4<arguments.length&&void 0!==n)||n;this.emit("addedfile",e),this.emit("complete",e),s?(e.dataURL=t,this.createThumbnailFromUrl(e,this.options.thumbnailWidth,this.options.thumbnailHeight,this.options.resizeMethod,this.options.fixOrientation,(function(t){o.emit("thumbnail",e,t),r&&r()}),i)):(this.emit("thumbnail",e,t),r&&r())}},{key:"createThumbnailFromUrl",value:function(e,t,r,i,n,o,s){var a=this,c=document.createElement("img");return s&&(c.crossOrigin=s),c.onload=function(){var s=function(e){return e(1)};return"undefined"!=typeof EXIF&&null!==EXIF&&n&&(s=function(e){return EXIF.getData(c,(function(){return e(EXIF.getTag(this,"Orientation"))}))}),s((function(n){e.width=c.width,e.height=c.height;var s=a.options.resize.call(a,e,t,r,i),l=document.createElement("canvas"),u=l.getContext("2d");switch(l.width=s.trgWidth,l.height=s.trgHeight,4<n&&(l.width=s.trgHeight,l.height=s.trgWidth),n){case 2:u.translate(l.width,0),u.scale(-1,1);break;case 3:u.translate(l.width,l.height),u.rotate(Math.PI);break;case 4:u.translate(0,l.height),u.scale(1,-1);break;case 5:u.rotate(.5*Math.PI),u.scale(1,-1);break;case 6:u.rotate(.5*Math.PI),u.translate(0,-l.width);break;case 7:u.rotate(.5*Math.PI),u.translate(l.height,-l.width),u.scale(-1,1);break;case 8:u.rotate(-.5*Math.PI),u.translate(-l.height,0)}De(u,c,null!=s.srcX?s.srcX:0,null!=s.srcY?s.srcY:0,s.srcWidth,s.srcHeight,null!=s.trgX?s.trgX:0,null!=s.trgY?s.trgY:0,s.trgWidth,s.trgHeight);var h=l.toDataURL("image/png");if(null!=o)return o(h,l)}))},null!=o&&(c.onerror=o),c.src=e.dataURL}},{key:"processQueue",value:function(){var e=this.options.parallelUploads,t=this.getUploadingFiles().length,r=t;if(!(e<=t)){var i=this.getQueuedFiles();if(0<i.length){if(this.options.uploadMultiple)return this.processFiles(i.slice(0,e-t));for(;r<e;){if(!i.length)return;this.processFile(i.shift()),r++}}}}},{key:"processFile",value:function(e){return this.processFiles([e])}},{key:"processFiles",value:function(t){var r=!0,i=!1,n=void 0;try{for(var o,s=t[Symbol.iterator]();!(r=(o=s.next()).done);r=!0){var a=o.value;a.processing=!0,a.status=e.UPLOADING,this.emit("processing",a)}}catch(t){i=!0,n=t}finally{try{r||null==s.return||s.return()}finally{if(i)throw n}}return this.options.uploadMultiple&&this.emit("processingmultiple",t),this.uploadFiles(t)}},{key:"_getFilesWithXhr",value:function(e){return this.files.filter((function(t){return t.xhr===e})).map((function(e){return e}))}},{key:"cancelUpload",value:function(t){if(t.status===e.UPLOADING){var r=this._getFilesWithXhr(t.xhr),i=!0,n=!1,o=void 0;try{for(var s,a=r[Symbol.iterator]();!(i=(s=a.next()).done);i=!0)s.value.status=e.CANCELED}catch(t){n=!0,o=t}finally{try{i||null==a.return||a.return()}finally{if(n)throw o}}void 0!==t.xhr&&t.xhr.abort();var c=!0,l=!1,u=void 0;try{for(var h,d=r[Symbol.iterator]();!(c=(h=d.next()).done);c=!0){var f=h.value;this.emit("canceled",f)}}catch(t){l=!0,u=t}finally{try{c||null==d.return||d.return()}finally{if(l)throw u}}this.options.uploadMultiple&&this.emit("canceledmultiple",r)}else t.status!==e.ADDED&&t.status!==e.QUEUED||(t.status=e.CANCELED,this.emit("canceled",t),this.options.uploadMultiple&&this.emit("canceledmultiple",[t]));if(this.options.autoProcessQueue)return this.processQueue()}},{key:"resolveOption",value:function(e){if("function"!=typeof e)return e;for(var t=arguments.length,r=new Array(1<t?t-1:0),i=1;i<t;i++)r[i-1]=arguments[i];return e.apply(this,r)}},{key:"uploadFile",value:function(e){return this.uploadFiles([e])}},{key:"uploadFiles",value:function(t){var r=this;this._transformFiles(t,(function(i){if(r.options.chunking){var n=i[0];t[0].upload.chunked=r.options.chunking&&(r.options.forceChunking||n.size>r.options.chunkSize),t[0].upload.totalChunkCount=Math.ceil(n.size/r.options.chunkSize)}if(t[0].upload.chunked){var o=t[0],s=i[0];o.upload.chunks=[];var a=function(){for(var i=0;void 0!==o.upload.chunks[i];)i++;if(!(i>=o.upload.totalChunkCount)){var n=i*r.options.chunkSize,a=Math.min(n+r.options.chunkSize,o.size),c={name:r._getParamName(0),data:s.webkitSlice?s.webkitSlice(n,a):s.slice(n,a),filename:o.upload.filename,chunkIndex:i};o.upload.chunks[i]={file:o,index:i,dataBlock:c,status:e.UPLOADING,progress:0,retries:0},r._uploadData(t,[c])}};if(o.upload.finishedChunkUpload=function(i){var n=!0;i.status=e.SUCCESS,i.dataBlock=null,i.xhr=null;for(var s=0;s<o.upload.totalChunkCount;s++){if(void 0===o.upload.chunks[s])return a();o.upload.chunks[s].status!==e.SUCCESS&&(n=!1)}n&&r.options.chunksUploaded(o,(function(){r._finished(t,"",null)}))},r.options.parallelChunkUploads)for(var c=0;c<o.upload.totalChunkCount;c++)a();else a()}else{for(var l=[],u=0;u<t.length;u++)l[u]={name:r._getParamName(u),data:i[u],filename:t[u].upload.filename};r._uploadData(t,l)}}))}},{key:"_getChunk",value:function(e,t){for(var r=0;r<e.upload.totalChunkCount;r++)if(void 0!==e.upload.chunks[r]&&e.upload.chunks[r].xhr===t)return e.upload.chunks[r]}},{key:"_uploadData",value:function(t,r){var i=this,n=new XMLHttpRequest,o=!0,s=!1,a=void 0;try{for(var c,l=t[Symbol.iterator]();!(o=(c=l.next()).done);o=!0)c.value.xhr=n}catch(r){s=!0,a=r}finally{try{o||null==l.return||l.return()}finally{if(s)throw a}}t[0].upload.chunked&&(t[0].upload.chunks[r[0].chunkIndex].xhr=n);var u=this.resolveOption(this.options.method,t),h=this.resolveOption(this.options.url,t);n.open(u,h,!0),n.timeout=this.resolveOption(this.options.timeout,t),n.withCredentials=!!this.options.withCredentials,n.onload=function(e){i._finishedUploading(t,n,e)},n.ontimeout=function(){i._handleUploadError(t,n,"Request timedout after ".concat(i.options.timeout," seconds"))},n.onerror=function(){i._handleUploadError(t,n)},(null!=n.upload?n.upload:n).onprogress=function(e){return i._updateFilesUploadProgress(t,n,e)};var d={Accept:"application/json","Cache-Control":"no-cache","X-Requested-With":"XMLHttpRequest"};for(var f in this.options.headers&&e.extend(d,this.options.headers),d){var p=d[f];p&&n.setRequestHeader(f,p)}var g=new FormData;if(this.options.params){var m=this.options.params;for(var b in"function"==typeof m&&(m=m.call(this,t,n,t[0].upload.chunked?this._getChunk(t[0],n):null)),m){var v=m[b];g.append(b,v)}}var y=!0,w=!1,_=void 0;try{for(var x,k=t[Symbol.iterator]();!(y=(x=k.next()).done);y=!0){var S=x.value;this.emit("sending",S,n,g)}}catch(r){w=!0,_=r}finally{try{y||null==k.return||k.return()}finally{if(w)throw _}}this.options.uploadMultiple&&this.emit("sendingmultiple",t,n,g),this._addFormElementData(g);for(var E=0;E<r.length;E++){var A=r[E];g.append(A.name,A.data,A.filename)}this.submitRequest(n,g,t)}},{key:"_transformFiles",value:function(e,t){for(var r=this,i=[],n=0,o=function(o){r.options.transformFile.call(r,e[o],(function(r){i[o]=r,++n===e.length&&t(i)}))},s=0;s<e.length;s++)o(s)}},{key:"_addFormElementData",value:function(e){if("FORM"===this.element.tagName){var t=!0,r=!1,i=void 0;try{for(var n,o=this.element.querySelectorAll("input, textarea, select, button")[Symbol.iterator]();!(t=(n=o.next()).done);t=!0){var s=n.value,a=s.getAttribute("name"),c=s.getAttribute("type");if(c=c&&c.toLowerCase(),null!=a)if("SELECT"===s.tagName&&s.hasAttribute("multiple")){var l=!0,u=!1,h=void 0;try{for(var d,f=s.options[Symbol.iterator]();!(l=(d=f.next()).done);l=!0){var p=d.value;p.selected&&e.append(a,p.value)}}catch(e){u=!0,h=e}finally{try{l||null==f.return||f.return()}finally{if(u)throw h}}}else(!c||"checkbox"!==c&&"radio"!==c||s.checked)&&e.append(a,s.value)}}catch(e){r=!0,i=e}finally{try{t||null==o.return||o.return()}finally{if(r)throw i}}}}},{key:"_updateFilesUploadProgress",value:function(e,t,r){var i;if(void 0!==r){if(i=100*r.loaded/r.total,e[0].upload.chunked){var n=e[0],o=this._getChunk(n,t);o.progress=i,o.total=r.total,o.bytesSent=r.loaded,n.upload.progress=0,n.upload.total=0;for(var s=n.upload.bytesSent=0;s<n.upload.totalChunkCount;s++)void 0!==n.upload.chunks[s]&&void 0!==n.upload.chunks[s].progress&&(n.upload.progress+=n.upload.chunks[s].progress,n.upload.total+=n.upload.chunks[s].total,n.upload.bytesSent+=n.upload.chunks[s].bytesSent);n.upload.progress=n.upload.progress/n.upload.totalChunkCount}else{var a=!0,c=!1,l=void 0;try{for(var u,h=e[Symbol.iterator]();!(a=(u=h.next()).done);a=!0){var d=u.value;d.upload.progress=i,d.upload.total=r.total,d.upload.bytesSent=r.loaded}}catch(e){c=!0,l=e}finally{try{a||null==h.return||h.return()}finally{if(c)throw l}}}var f=!0,p=!1,g=void 0;try{for(var m,b=e[Symbol.iterator]();!(f=(m=b.next()).done);f=!0){var v=m.value;this.emit("uploadprogress",v,v.upload.progress,v.upload.bytesSent)}}catch(e){p=!0,g=e}finally{try{f||null==b.return||b.return()}finally{if(p)throw g}}}else{var y=!0,w=!0,_=!(i=100),x=void 0;try{for(var k,S=e[Symbol.iterator]();!(w=(k=S.next()).done);w=!0){var E=k.value;100===E.upload.progress&&E.upload.bytesSent===E.upload.total||(y=!1),E.upload.progress=i,E.upload.bytesSent=E.upload.total}}catch(e){_=!0,x=e}finally{try{w||null==S.return||S.return()}finally{if(_)throw x}}if(y)return;var A=!0,I=!1,C=void 0;try{for(var T,O=e[Symbol.iterator]();!(A=(T=O.next()).done);A=!0){var M=T.value;this.emit("uploadprogress",M,i,M.upload.bytesSent)}}catch(e){I=!0,C=e}finally{try{A||null==O.return||O.return()}finally{if(I)throw C}}}}},{key:"_finishedUploading",value:function(t,r,i){var n;if(t[0].status!==e.CANCELED&&4===r.readyState){if("arraybuffer"!==r.responseType&&"blob"!==r.responseType&&(n=r.responseText,r.getResponseHeader("content-type")&&~r.getResponseHeader("content-type").indexOf("application/json")))try{n=JSON.parse(n)}catch(t){i=t,n="Invalid JSON response from server."}this._updateFilesUploadProgress(t),200<=r.status&&r.status<300?t[0].upload.chunked?t[0].upload.finishedChunkUpload(this._getChunk(t[0],r)):this._finished(t,n,i):this._handleUploadError(t,r,n)}}},{key:"_handleUploadError",value:function(t,r,i){if(t[0].status!==e.CANCELED){if(t[0].upload.chunked&&this.options.retryChunks){var n=this._getChunk(t[0],r);if(n.retries++<this.options.retryChunksLimit)return void this._uploadData(t,[n.dataBlock]);console.warn("Retried this chunk too often. Giving up.")}this._errorProcessing(t,i||this.options.dictResponseError.replace("{{statusCode}}",r.status),r)}}},{key:"submitRequest",value:function(e,t){e.send(t)}},{key:"_finished",value:function(t,r,i){var n=!0,o=!1,s=void 0;try{for(var a,c=t[Symbol.iterator]();!(n=(a=c.next()).done);n=!0){var l=a.value;l.status=e.SUCCESS,this.emit("success",l,r,i),this.emit("complete",l)}}catch(t){o=!0,s=t}finally{try{n||null==c.return||c.return()}finally{if(o)throw s}}if(this.options.uploadMultiple&&(this.emit("successmultiple",t,r,i),this.emit("completemultiple",t)),this.options.autoProcessQueue)return this.processQueue()}},{key:"_errorProcessing",value:function(t,r,i){var n=!0,o=!1,s=void 0;try{for(var a,c=t[Symbol.iterator]();!(n=(a=c.next()).done);n=!0){var l=a.value;l.status=e.ERROR,this.emit("error",l,r,i),this.emit("complete",l)}}catch(t){o=!0,s=t}finally{try{n||null==c.return||c.return()}finally{if(o)throw s}}if(this.options.uploadMultiple&&(this.emit("errormultiple",t,r,i),this.emit("completemultiple",t)),this.options.autoProcessQueue)return this.processQueue()}}],[{key:"uuidv4",value:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}))}}]),e}();Pe.initClass(),Pe.version="5.7.0",Pe.options={},Pe.optionsForElement=function(e){return e.getAttribute("id")?Pe.options[Re(e.getAttribute("id"))]:void 0},Pe.instances=[],Pe.forElement=function(e){if("string"==typeof e&&(e=document.querySelector(e)),null==(null!=e?e.dropzone:void 0))throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");return e.dropzone},Pe.autoDiscover=!0,Pe.discover=function(){var e;if(document.querySelectorAll)e=document.querySelectorAll(".dropzone");else{e=[];var t=function(t){return function(){var r=[],i=!0,n=!1,o=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done);i=!0){var c=s.value;/(^| )dropzone($| )/.test(c.className)?r.push(e.push(c)):r.push(void 0)}}catch(r){n=!0,o=r}finally{try{i||null==a.return||a.return()}finally{if(n)throw o}}return r}()};t(document.getElementsByTagName("div")),t(document.getElementsByTagName("form"))}return function(){var t=[],r=!0,i=!1,n=void 0;try{for(var o,s=e[Symbol.iterator]();!(r=(o=s.next()).done);r=!0){var a=o.value;!1!==Pe.optionsForElement(a)?t.push(new Pe(a)):t.push(void 0)}}catch(t){i=!0,n=t}finally{try{r||null==s.return||s.return()}finally{if(i)throw n}}return t}()},Pe.blacklistedBrowsers=[/opera.*(Macintosh|Windows Phone).*version\/12/i],Pe.isBrowserSupported=function(){var e=!0;if(window.File&&window.FileReader&&window.FileList&&window.Blob&&window.FormData&&document.querySelector)if("classList"in document.createElement("a")){var t=!0,r=!1,i=void 0;try{for(var n,o=Pe.blacklistedBrowsers[Symbol.iterator]();!(t=(n=o.next()).done);t=!0)n.value.test(navigator.userAgent)&&(e=!1)}catch(e){r=!0,i=e}finally{try{t||null==o.return||o.return()}finally{if(r)throw i}}}else e=!1;else e=!1;return e},Pe.dataURItoBlob=function(e){for(var t=atob(e.split(",")[1]),r=e.split(",")[0].split(":")[1].split(";")[0],i=new ArrayBuffer(t.length),n=new Uint8Array(i),o=0,s=t.length,a=0<=s;a?o<=s:s<=o;a?o++:o--)n[o]=t.charCodeAt(o);return new Blob([i],{type:r})};var Be=function(e,t){return e.filter((function(e){return e!==t})).map((function(e){return e}))},Re=function(e){return e.replace(/[\-_](\w)/g,(function(e){return e.charAt(1).toUpperCase()}))};Pe.createElement=function(e){var t=document.createElement("div");return t.innerHTML=e,t.childNodes[0]},Pe.elementInside=function(e,t){if(e===t)return!0;for(;e=e.parentNode;)if(e===t)return!0;return!1},Pe.getElement=function(e,t){var r;if("string"==typeof e?r=document.querySelector(e):null!=e.nodeType&&(r=e),null==r)throw new Error("Invalid `".concat(t,"` option provided. Please provide a CSS selector or a plain HTML element."));return r},Pe.getElements=function(e,t){var r,i;if(e instanceof Array){i=[];try{var n=!0,o=!1,s=void 0;try{for(var a,c=e[Symbol.iterator]();!(n=(a=c.next()).done);n=!0)r=a.value,i.push(this.getElement(r,t))}catch(e){o=!0,s=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw s}}}catch(e){i=null}}else if("string"==typeof e){var l=!0,u=!(i=[]),h=void 0;try{for(var d,f=document.querySelectorAll(e)[Symbol.iterator]();!(l=(d=f.next()).done);l=!0)r=d.value,i.push(r)}catch(e){u=!0,h=e}finally{try{l||null==f.return||f.return()}finally{if(u)throw h}}}else null!=e.nodeType&&(i=[e]);if(null==i||!i.length)throw new Error("Invalid `".concat(t,"` option provided. Please provide a CSS selector, a plain HTML element or a list of those."));return i},Pe.confirm=function(e,t,r){return window.confirm(e)?t():null!=r?r():void 0},Pe.isValidFile=function(e,t){if(!t)return!0;t=t.split(",");var r=e.type,i=r.replace(/\/.*$/,""),n=!0,o=!1,s=void 0;try{for(var a,c=t[Symbol.iterator]();!(n=(a=c.next()).done);n=!0){var l=a.value;if("."===(l=l.trim()).charAt(0)){if(-1!==e.name.toLowerCase().indexOf(l.toLowerCase(),e.name.length-l.length))return!0}else if(/\/\*$/.test(l)){if(i===l.replace(/\/.*$/,""))return!0}else if(r===l)return!0}}catch(e){o=!0,s=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw s}}return!1},"undefined"!=typeof jQuery&&null!==jQuery&&(jQuery.fn.dropzone=function(e){return this.each((function(){return new Pe(this,e)}))}),"undefined"!=typeof module&&null!==module?module.exports=Pe:window.Dropzone=Pe,Pe.ADDED="added",Pe.QUEUED="queued",Pe.ACCEPTED=Pe.QUEUED,Pe.UPLOADING="uploading",Pe.PROCESSING=Pe.UPLOADING,Pe.CANCELED="canceled",Pe.ERROR="error",Pe.SUCCESS="success";var De=function(e,t,r,i,n,o,s,a,c,l){var u=function(e){e.naturalWidth;var t=e.naturalHeight,r=document.createElement("canvas");r.width=1,r.height=t;var i=r.getContext("2d");i.drawImage(e,0,0);for(var n=i.getImageData(1,0,1,t).data,o=0,s=t,a=t;o<a;)0===n[4*(a-1)+3]?s=a:o=a,a=s+o>>1;var c=a/t;return 0==c?1:c}(t);return e.drawImage(t,r,i,n,o,s,a,c,l/u)},Ne=function(){function e(){Ce(this,e)}return Oe(e,null,[{key:"initClass",value:function(){this.KEY_STR="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}},{key:"encode64",value:function(e){for(var t="",r=void 0,i=void 0,n="",o=void 0,s=void 0,a=void 0,c="",l=0;o=(r=e[l++])>>2,s=(3&r)<<4|(i=e[l++])>>4,a=(15&i)<<2|(n=e[l++])>>6,c=63&n,isNaN(i)?a=c=64:isNaN(n)&&(c=64),t=t+this.KEY_STR.charAt(o)+this.KEY_STR.charAt(s)+this.KEY_STR.charAt(a)+this.KEY_STR.charAt(c),r=i=n="",o=s=a=c="",l<e.length;);return t}},{key:"restore",value:function(e,t){if(!e.match("data:image/jpeg;base64,"))return t;var r=this.decode64(e.replace("data:image/jpeg;base64,","")),i=this.slice2Segments(r),n=this.exifManipulation(t,i);return"data:image/jpeg;base64,".concat(this.encode64(n))}},{key:"exifManipulation",value:function(e,t){var r=this.getExifArray(t),i=this.insertExif(e,r);return new Uint8Array(i)}},{key:"getExifArray",value:function(e){for(var t=void 0,r=0;r<e.length;){if(255===(t=e[r])[0]&225===t[1])return t;r++}return[]}},{key:"insertExif",value:function(e,t){var r=e.replace("data:image/jpeg;base64,",""),i=this.decode64(r),n=i.indexOf(255,3),o=i.slice(0,n),s=i.slice(n);return o.concat(t).concat(s)}},{key:"slice2Segments",value:function(e){for(var t=0,r=[];!(255===e[t]&218===e[t+1]);){if(255===e[t]&216===e[t+1])t+=2;else{var i=t+(256*e[t+2]+e[t+3])+2,n=e.slice(t,i);r.push(n),t=i}if(t>e.length)break}return r}},{key:"decode64",value:function(e){var t=void 0,r=void 0,i="",n=void 0,o=void 0,s="",a=0,c=[];for(/[^A-Za-z0-9\+\/\=]/g.exec(e)&&console.warn("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding."),e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");t=this.KEY_STR.indexOf(e.charAt(a++))<<2|(n=this.KEY_STR.indexOf(e.charAt(a++)))>>4,r=(15&n)<<4|(o=this.KEY_STR.indexOf(e.charAt(a++)))>>2,i=(3&o)<<6|(s=this.KEY_STR.indexOf(e.charAt(a++))),c.push(t),64!==o&&c.push(r),64!==s&&c.push(i),t=r=i="",n=o=s="",a<e.length;);return c}}]),e}();Ne.initClass(),Pe._autoDiscoverFunction=function(){if(Pe.autoDiscover)return Pe.discover()},function(e,t){function r(n){if("readystatechange"!==n.type||"complete"===o.readyState)return("load"===n.type?e:o)[c](l+n.type,r,!1),!i&&(i=!0)?t.call(e,n.type||n):void 0}var i=!1,n=!0,o=e.document,s=o.documentElement,a=o.addEventListener?"addEventListener":"attachEvent",c=o.addEventListener?"removeEventListener":"detachEvent",l=o.addEventListener?"":"on";if("complete"!==o.readyState){if(o.createEventObject&&s.doScroll){try{n=!e.frameElement}catch(n){}n&&function e(){try{s.doScroll("left")}catch(t){return void setTimeout(e,50)}return r("poll")}()}o[a](l+"DOMContentLoaded",r,!1),o[a](l+"readystatechange",r,!1),e[a](l+"load",r,!1)}}(window,Pe._autoDiscoverFunction);class Fe extends p.Hc{static get properties(){return{btnText:{type:String},value:{type:String},type:{type:String},disabled:{type:Boolean},pattern:{type:String},validator:{type:Function},placeholder:{type:String},label:{type:String},readonly:{type:Boolean},postData:{type:Object},uploadUrl:{type:String}}}static get styles(){return p.iv`
			:host{
				display:inline-block;vertical-align:middle;
				font-family:var(--flow-font-family, "Julius Sans One");
				font-weight:var(--flow-font-weight, bold);
				width:var(--flow-input-width, 100%);
				min-width:var(--flow-input-min-width, 100px);
				max-width:var(--flow-input-max-width, 500px);
				margin:var(--flow-input-margin, 5px 0px);
				font-size:0px;
			}
			:host(:not([disabled])) .btn,
			:host(:not([disabled])) .input{
				cursor:pointer;
			}
			
			:host(:not([apply-btn])) .btn{
				display: none;
			}
			
			.wrapper{
				display:flex;
				align-items:stretch;
				min-width_:50px;
				text-align:center;
				justify-content:center;
				margin-top:var(--flow-input-wrapper-margin-top,-0.5rem);
				height:var(--flow-input-wrapper-height);
			}
			label{
				font-size:var(--flow-input-label-font-size, 0.7rem);
				padding:var(--flow-input-label-padding,2px 5px);
				border: var(--flow-input-label-border, 2px) solid  var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-radius:var(--flow-input-label-border-radius, 8px);
				margin-left: var(--flow-input-label-margin-left,10px);
				z-index: var(--flow-input-label-z-index, 1);
				position: var(--flow-input-label-position, relative);
				background-color:var(--flow-input-bg, inherit);
			}
			.btn{
				position:relative;
				padding:5px;
				background-color:var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border: 2px solid var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
				overflow:hidden;
				border-radius:8px;
				border-top-left-radius: var(--flow-input-btn-tlbr, 0px);
    			border-bottom-left-radius: var(--flow-input-btn-blbr, 0px);
    			color:var(--flow-border-invert-color, var(--flow-primary-invert-color, #FFF));
    			display: flex;
			    justify-content: center;
			    align-items: center;
			}
			:host(:not([disabled])) .btn:hover{
				background-color:var(--flow-border-hover-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-color:var(--flow-border-hover-color, var(--flow-primary-color, rgba(0,151,115,1)))
			}
			.input{
				width:100px;flex:1;box-sizing:border-box;
				min-height:var(--flow-input-height);
				border: var(--flow-input-border, 2px) solid var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-radius:var(--flow-input-border-radius, 8px);
    			margin:0px;
    			padding:16px 30px 10px 10px;
				background-color:var(--flow-input-bg, inherit);
				color:var(--flow-input-color, inherit);
				font-size:var(--flow-input-font-size, 1rem);
				font-weight:var(--flow-input-font-weight, 400);
				line-height:var(--flow-input-line-height, 1.2);
				box-shadow:var(--flow-input-box-shadow);
			}

			:host([apply-btn]) .input{
			    border-right-width:0px;
				border-top-right-radius: 0px;
				border-bottom-right-radius: 0px;
			}


			.input:focus{outline:none}
			.input::-webkit-input-placeholder { color: var(--flow-input-placeholder, #888 ); }
			:host([disabled]) .value{
				padding-right:10px;
			}
			.clear-btn{
				font-style: normal;
			    font-size: 25px;
			    padding: 0px 10px 0px 10px;
			    cursor: pointer;
			    display:none;
			    position: absolute;
			    right: 0px;
			    z-index: 1;
			}
			:host(:not([disabled])) [has-value] .clear-btn{display:block;}
			:host(.invalid) .input{color:var(--flow-input-invalid-color, red)}

			.dz-preview{
				position:relative;display:block;
			}
			.dz-preview .dz-progress{display:block;height:2px;}
			.dz-preview .dz-progress .dz-upload{
				display:block;height:100%;width:0;background:green
			}
			.dz-preview .dz-details{line-height:1.2;margin:2px;}
			.dz-preview .dz-error-message{color:red;display:none}
			.dz-preview.dz-error .dz-error-message,
			.dz-preview.dz-error .dz-error-mark{display:block}
			.dz-preview.dz-success .dz-success-mark{display:block}
			.dz-preview .dz-error-mark,
			.dz-preview .dz-success-mark{
				position:absolute;display:none;left:30px;top:30px;width:54px;height:58px;
				left:50%;margin-left:-27px
			}
			.dz-preview .dz-remove{
				position: absolute;
			    right:-15px;
			    top:-15px;
			    font-size:27px;
			    cursor: pointer;
			    color:var(--flow-dz-field-remove-icon-color, var(--flow-color,#000));
			    background:var(--flow-dz-field-remove-icon-bg, #FFF);
			    z-index:1;
			    box-shadow:var(--flow-dz-field-remove-icon-box-shadow, 0px 0px 4px #ccc);
			    padding: 5px;
			    border-radius:50%;
			    width: 20px;
			    height: 20px;
			    line-height:20px;
			}
			.dz-image-holder{
				position:relative;
				height:100px;
				background:var(--flow-dz-field-mage-holder-bg, rgba(0,0,0,0.1));
			}
			.dz-image-holder img{
				max-width:100%;
				max-height:100%;
			}
		`}constructor(){super(),this.type="text",this.value="",this.postData={}}render(){return p.dy`<label ?hidden=${!this.label}>${this.label||""}</label>
		<div class="wrapper" @click=${this.onClick} ?has-value=${!!this.value}>
			<slot name="prefix"></slot>
			<div class="input"
				?disabled=${this.disabled} 
				@change=${this.onChange}>
			</div>
			<div class="btn">
				<div class="text"><flow-i18n text="${this.btnText||"Select"}"></flow-i18n></div>
			</div>
			<slot name="sufix"></slot>
		</div>
		`}firstUpdated(){super.firstUpdated(),this.inputEl=this.renderRoot.querySelector(".input");let e=this.uploadUrl||"upload-file";this.dropzone=new Dropzone(this.inputEl,{url:e,acceptedFiles:this.acceptedFiles,withCredentials:!0,paramName:this.paramName||"file",autoProcessQueue:this.autoProcessQueue||!1,maxFiles:this.maxFiles||1,uploadMultiple:!1,maxFilesize:500,previewTemplate:'<div class="dz-preview dz-file-preview">\n\t\t\t  <div class="dz-details">\n\t\t\t    <div class="dz-filename"><span data-dz-name></span></div>\n\t\t\t    <div class="dz-size" data-dz-size></div>\n\t\t\t    <div class="dz-image-holder">\n\t\t\t    \t<img data-dz-thumbnail /> <div class="dz-remove" data-dz-remove>&times;</div>\n\t\t\t    </div>\n\t\t\t  </div>\n\t\t\t  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n\t\t\t  \x3c!--div class="dz-success-mark"><span>✔</span></div>\n\t\t\t  <div class="dz-error-mark"><span>✘</span></div--\x3e\n\t\t\t  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n\t\t\t</div>',maxfilesexceeded:e=>{this.dropzone.removeFile(e)}}),this.dropzone.on("addedfile",(e=>{this._oldFile&&this.dropzone.removeFile(this._oldFile),this._oldFile=e,this.classList.toggle("offline-preview",!0),this.msg="Offline preview"})),this.dropzone.on("reset",(e=>{this.classList.toggle("offline-preview",!1),this._oldFile=!1})),this.dropzone.on("sending",((e,t,r)=>{Object.keys(this.postData).forEach((e=>{r.append(e,this.postData[e])}))})),this.dropzone.on("success",((e,t)=>{this.cancelFiles(),this.fire("upload-success")})),this.dropzone.on("error",((e,t)=>{this.cancelFiles(),this.fire("upload-error")}))}uploadFile(){this.dropzone?.processQueue()}cancelFiles(){this.dropzone?.removeAllFiles(!0)}setClear(){this.setValue("")}onClick(){this.fire("flow-dz-click",{el:this})}validate(e){let{pattern:t}=this;if(t){try{t=new RegExp(t)}catch(e){return this.log("pattern error:",e),!1}if(!t.test(e))return!1}return"function"!=typeof this.validator||this.validator(e,this)}onChange(e){let t=this.shadowRoot.querySelector("input").value;this.validate(t)?(this.classList.remove("invalid"),this.value=t,this.fire("changed",{el:this,value:t})):this.classList.add("invalid")}setValue(e){this.value=e,this.shadowRoot.querySelector("input").value="",this.fire("changed",{el:this,value:this.value})}}Fe.define("flow-dz-field");const Ue={buildAnchorHref:e=>e.toLowerCase().replace(/[^\w]+/g,"-").replace(/\-code\-/g,"").replace(/^[\-]+|[\-]+$/g,""),heading(e,t){const r=this.buildAnchorHref(e);return`\n\t\t\t<h${t} class="h-anchor">\n\t\t\t<a name="${r}" class="anchor" href="#${r}">\n\t\t\t\t<span class="anchor-icon" part="anchor-icon"></span>\n\t\t\t</a>\n\t\t\t${e}\n\t\t\t</h${t}>`},code:(e,t,r)=>`<flow-code lang="${t}"><textarea>${e.replace(/\t/g,"    ")}</textarea></flow-code>`,html:e=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;").replace(/&amp;lt;/g,"&lt;").replace(/&amp;gt;/g,"&gt;"),codespan:e=>`<code>${e=e.replace(/&amp;lt;/g,"&lt;").replace(/&amp;gt;/g,"&gt;")}</code>`,link:(e,t,r)=>`<flow-link href="${e}" ${t?`title="${t}"`:""}>${r}</flow-link>`};class Le extends p.Hc{static get properties(){return{skipTrimming:{type:Boolean},anchorScroll:{type:Boolean},sanitize:{type:Boolean},toc:{type:Boolean},"full-height-toc":{type:Boolean,reflect:!0}}}static get styles(){return p.iv`
			:host{display:block;}
			.md{display:none;}
			.anchor{font-size:0px;}
			.anchor-icon{
				font-size:var(--flow-markdown-anchor-icon-font-size, 1rem);
				display:var(--flow-markdown-anchor-icon-display, inline-block);
				width:var(--flow-markdown-anchor-icon-width, 15px);
				height:var(--flow-markdown-anchor-icon-height, 15px);
				margin:var(--flow-markdown-anchor-icon-margin, 0px 2px);
				opacity:var(--flow-markdown-anchor-icon-opacity, 0);
				border:0px solid #F00;cursor:pointer;
				background: center / contain;
				background-image:var(--flow-markdown-icon);
			}
			.h-anchor:hover>a.anchor .anchor-icon{
				opacity:var(--flow-markdown-anchor-icon-opacity-hover, 1);
            }
            
            #output > * {margin-left: 19px;}
            #output > h1, #output > h2, #output > h3, #output > h4, #output > h5 {
                margin-left: 0px;
            }

            td { vertical-align: top; }

            code, table tbody tr td code {
                display: inline-block;
                font-family: var(--flow-markdown-code-font-family, monospace);
                font-size: var(--flow-markdown-code-font-size, 1rem);
                background-color: var(--flow-markdown-code-background-color, #f3f3f3);
                padding: var(--flow-markdown-code-padding, 1px 3px);
                margin: var(--flow-markdown-code-margin, 1px 1px);
                border:var(--flow-markdown-code-border, 1px solid #ddd);
            }

            flow-code {
                --flow-code-white-space: pre;
                --flow-code-font-family: var(--flow-markdown-code-font-family);
                --flow-code-font-size: var(--flow-markdown-code-font-size);
                --flow-code-border: var(--flow-markdown-code-border,1px solid #ddd);
                /*color: var(--flow-markdown-code-color, --flow-code-color, --flow-background-inverse);*/
                /*background-color: var(--flow-markdown-code-background-color, #f3f3f3);
                color: var(--flow-markdown-code-color, #000);*/
                padding: 16px;
            }

            a, a:visited { 
                text-decoration: none; 
                color: var(--flow-link-color, #202169);
            }

            a:hover { 
                text-decoration: underline; 
                color: var(--flow-link-hover-color, #161649);
            }
            #wrapper {
                position:relative;
                display: flex;
                flex-direction:row;
            }
            :host([full-height-toc]) #wrapper{
                height:100%;
            }
            :host([full-height-toc]) .toc-outer,
            :host([full-height-toc]) #output{
                height:100%;
                overflow-y:auto;
                overflow-x:hidden;
            }
            :host([full-height-toc]) .toc-outer{
                min-width:var(--flow-markdown-toc-width, 200px);
            }
            #toc {
                border:0px solid red;
                width:var(--flow-markdown-toc-width, 200px);
                position: -webkit-sticky;
                position: sticky;
                top:var(--flow-markdown-toc-top, 0);
                list-style:none;
                padding:var(--flow-markdown-toc-padding, 10px);
                margin:0px;
            }
            :host([full-height-toc]) #toc{
                position:relative;
            }

            #toc li{
                cursor:pointer;
                padding: 1px;
            }
            #toc li:hover{
                background-color:var(--flow-markdown-toc-li-hover-bg, var(--flow-menu-item-hover-bg, #DDD));
                color:var(--flow-markdown-toc-li-hover-color, var(--flow-menu-item-hover-color, #000));
            }
            #toc [level="0"]{
                padding-left:var(--flow-markdown-toc-level0-padding, 4px);
                font-size:var(--flow-markdown-toc-level0-font-size, 0.96rem);
                font-weight:var(--flow-markdown-toc-level0-font-weight, bold);
            }
            #toc [level="1"]{
                padding-left:var(--flow-markdown-toc-level1-padding, 4px);
                font-size:var(--flow-markdown-toc-level1-font-size, 0.92rem);
            }
            #toc [level="2"]{
                padding-left:var(--flow-markdown-toc-level2-padding, 18px);
                font-size:var(--flow-markdown-toc-level2-font-size, 0.86rem);
            }
            #toc [level="3"]{
                padding-left:var(--flow-markdown-toc-level3-padding, 30px);
                font-size:var(--flow-markdown-toc-level3-font-size, 0.82rem);
            }
            #toc [level="4"]{
                padding-left:var(--flow-markdown-toc-level4-padding, 45px);
                font-size:var(--flow-markdown-toc-level4-font-size, 0.76rem);
            }
            #toc [level="5"]{
                padding-left:var(--flow-markdown-toc-level5-padding, 60px);
                font-size:var(--flow-markdown-toc-level5-font-size, 0.72rem);
            }
            #toc [level="6"]{
                padding-left:var(--flow-markdown-toc-level6-padding, 75px);
                font-size:var(--flow-markdown-toc-level6-font-size, 0.66rem);
            }
            #toc [level="7"]{
                padding-left:var(--flow-markdown-toc-level7-padding, 90px);
                font-size:var(--flow-markdown-toc-level7-font-size, 0.625rem);
            }
		`}render(){let{level:e=0}=(this.toc_||[])[0]||{},t=10;return(this.toc_||[]).forEach((e=>{t<e.level&&(t=e.level)})),t=(t+"").length,p.dy`<div id="wrapper">
        ${this.toc?p.dy`<div class="toc-outer"><ul id='toc' @click="${this.onTOCClick}">${this.toc_.map((e=>p.dy`<li level="${e.level}" 
                        data-scroll-to="${e.href}">${e.caption}</li>`))}</ul></div>`:""}
        <div class="md"><slot></slot></div>
        <div id="output" @click="${this.onOutputClick}"></div>
        </div>`}constructor(){super(),this.sanitize=!1,this.toc=!1,this.toc_=[]}firstUpdated(){const e=this.renderRoot.querySelector("slot");this.outputEl=this.renderRoot.querySelector("#output"),this.slotEl=e,this.updateHtml(),e.addEventListener("slotchange",(e=>{this.updateHtml()}))}updateHtml(e=""){if(!e.length){let t=this.slotEl.assignedNodes(),r=[];t.forEach((e=>{3!=e.nodeType?r.push(e.innerHTML):r.push(e.textContent)})),e=r.join("\n\n")}e=e.replace(/<!---->/g,"");const t=window.marked.lexer(e);if(this.log("tokens",t),this.toc){let e=t.filter((e=>"heading"==e.type)).map((e=>{let t=e.tokens[0].text;return{caption:t,level:e.depth-1,href:Ue.buildAnchorHref(t)}}));this.toc_=e,this.log("tocList",e),this.requestUpdate()}const r=window.marked.parser(t);this.log("html",r),this.outputEl.innerHTML=this.sanitize?DOMPurify.sanitize(r):r,this.anchorScroll&&(0,p.Kg)(100,(()=>{this.scrollToLocationHash()}))}scrollToLocationHash(){let e=window.location.hash.replace("#","");this.scrollToElement(e)}scrollToElement(e){let t=e.scrollIntoView?e:this.outputEl.querySelector(`a[name="${e}"]`);t&&(t.parentNode?.matches(".h-anchor")?t.parentNode:t).scrollIntoView(Object.assign(this.scrollIntoViewConfig||{},{behavior:"smooth",block:"start",inline:"nearest"}))}onTOCClick(e){let t=e.target.closest("li[data-scroll-to]");if(!t)return;let r=t.getAttribute("data-scroll-to");this.scrollToElement(r)}onOutputClick(e){let t=e.target.closest("a.anchor,a.scroll-to");if(!t)return;let r=t.getAttribute("href")+"";r.startsWith("#")&&(t=r.replace("#","")),this.scrollToElement(t)}}Le.define("flow-markdown",[p.FH+"resources/extern/marked/marked.min.js",p.FH+"resources/extern/dom-purify/purify.min.js"],(()=>{marked.use({renderer:Ue})}));class He extends p.Hc{static get properties(){return{text:{type:String,value:""},subText:{type:String,value:""},icon:{type:String,icon:""},pressedText:{type:String,value:""},pressedSubText:{type:String,value:""},pressedIcon:{type:String,icon:""},togglable:{type:Boolean,reflect:!0},pressed:{type:Boolean,reflect:!0}}}static get styles(){return p.iv`
			:host{
				position:relative;display:block;
				text-align:var(--flow-toolbar-item-text-align, center);
				padding:var(--flow-toolbar-item-padding, 5px);
				max-width:var(--flow-toolbar-item-max-width, 80px);
				min-width:var(--flow-toolbar-item-min-width, 60px);
			}
			:host:before{
				position: absolute;
			    left: 0px;
			    top: -2px;
			    bottom: -2px;
			    right: 0px;
			    background:var(--flow-toolbar-item-shadow-bg, rgba(100,100,100, 0.2));
			    border-radius: 100px;
			    transform-origin: center center;
			    transform: scale(0,0);
			    transition: all 0.2s ease;
			    content:"";z-index:-1;
			}
			:host(:not(.disabled)){
				cursor:pointer;
			}
			:host(:not(.disabled):hover):before{
			    border-radius: 3px;
			    transform: scale(1,1);
			}
			.icon{
				display:block;
				width:var(--flow-toolbar-item-icon-width, 28px);
			    height:var(--flow-toolbar-item-icon-height, 28px);
			    margin:var(--flow-toolbar-item-icon-margin, 0px auto);
			    --fa-icon-size:var(--flow-toolbar-item-icon-width, 28px);
			}
			.text{
				font-size:var(--flow-toolbar-item-text-font-size, 0.6rem);
				user-select:none;
			}
			.sub-text{
				font-size:var(--flow-toolbar-item-sub-text-font-size, 0.5rem);
				user-select:none;
			}
			:host([togglable][pressed]){
				background:var(--flow-toolbar-item-pressed-bg, initial);
				color:var(--flow-toolbar-item-pressed-color, var(--flow-primary-color));
				--fa-icon-color:var(--flow-toolbar-item-pressed-icon-color, var(--flow-primary-color));
			}
		`}constructor(){super(),this.initPropertiesDefaultValues(),this.addEventListener("click",this.onClick.bind(this))}render(){let{text:e,subText:t,icon:r,togglable:i,pressed:n}=this;if(i&&n){let{pressedText:i,pressedSubText:n,pressedIcon:o}=this;i&&(e=i),n&&(t=n),o&&(r=o)}return p.dy`${r?p.dy`<fa-icon class="icon" icon="${r}" size="28"></fa-icon>`:""}
				${e?p.dy`<div class="text">${e}</div>`:""}
				${t?p.dy`<div class="sub-text">${t}</div>`:""}
				`}onClick(){this.togglable&&(this.pressed=!this.pressed,this.fire("flow-toolbar-item-state",{pressed:this.pressed,el:this,code:this.dataset.code},{bubbles:!0}))}}He.define("flow-toolbar-item");class je extends p.Hc{static get properties(){return{items:{type:Array,value:[]}}}static get styles(){return p.iv`
			:host{
				padding:var(--flow-toolbar-padding, 0px 5px);
				align-items:center;
			}
			:host,
			.tools{
				display:flex;
			}
			.tools{
				padding:var(--flow-toolbar-tools-padding, 5px 0px);
				min-height:var(--flow-toolbar-tools-min-height, 76px);
				box-sizing:border-box;
			}
			/*.tool{
				position:relative;
				text-align:var(--flow-toolbar-item-text-align, center);
				padding:var(--flow-toolbar-item-padding, 5px);
			}
			.tool:before{
				position: absolute;
			    left: 0px;
			    top: -2px;
			    bottom: -2px;
			    right: 0px;
			    background:var(--flow-toolbar-item-shadow-bg, rgba(100,100,100, 0.2));
			    border-radius: 100px;
			    transform-origin: center center;
			    transform: scale(0,0);
			    transition: all 0.2s ease;
			    content:"";z-index:-1;
			}
			.tool:not(.disabled){
				cursor:pointer;
			}
			.tool:not(.disabled):hover:before{
			    border-radius: 3px;
			    transform: scale(1,1);
			}
			.icon{
				display:block;
				width:var(--flow-toolbar-item-icon-width, 28px);
			    height:var(--flow-toolbar-item-icon-height, 28px);
			    margin:var(--flow-toolbar-item-icon-margin, 0px auto);
			    --fa-icon-size:var(--flow-toolbar-item-icon-width, 28px);
			}
			.text{
				font-size:var(--flow-toolbar-item-text-font-size, 0.6rem);
			}
			.sub-text{
				font-size:var(--flow-toolbar-item-sub-text-font-size, 0.5rem);
			}
			*/
		`}render(){let e=this.items;return p.dy`
		<div class="tools">
		<slot name="prefix"></slot>
		${e.map((e=>p.dy`<flow-toolbar-item 
					data-code="${e.code||e.text}"
					class="${e.cls||""}"
					text="${e.text||""}"
					subText="${e.subText||""}"
					icon="${e.icon||""}"

					pressedText="${e.pressedText||""}"
					pressedSubText="${e.pressedSubText||""}"
					pressedIcon="${e.pressedIcon||""}"
					?togglable=${e.togglable||!1}
					?pressed=${e.pressed||!1}>
				</flow-toolbar-item>`))}
		<slot></slot>
		</div>`}constructor(){super(),this.initPropertiesDefaultValues()}firstUpdated(){this.renderRoot.addEventListener("click",this.onToolClick.bind(this)),this.renderRoot.addEventListener("flow-toolbar-item-state",(e=>{this.fire("flow-toolbar-item-state",e.detail,{bubbles:!0})}))}onToolClick(e){let t=e.target.closest(".flow-toolbar-item, flow-toolbar-item");t&&this.fire("tool-click",{tool:t.dataset.code,btn:t})}}je.define("flow-toolbar");const ze=new Map,$e=new Map,Ke=p.iv`
	:host{
		display:block;padding:5px;border-radius:3px;margin-top:5px;
		border:1px solid var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
	}
	.head{
		display:flex;align-items:center;
		padding:5px;
	}
	.head .name{
		flex:1;overflow:hidden;text-overflow:ellipsis;
		margin-right:10px;
	}
	.head fa-icon{margin:5px;}
	fa-icon[disabled]{
		pointer-events:none;opacity:0.5;
	}
	fa-icon:not([disabled]){cursor:pointer}
`;let qe=0;class Xe extends p.Hc{static get properties(){return{data:{type:Object},multi:{type:Boolean,reflect:!0}}}static get styles(){return p.iv`
			:host{
				display:flex;align-items:center;
			}
			:host([multi].item){
				padding:5px;margin:0px 2px 2px 0px;
				border-radius:3px;
				border:1px solid var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
			}
		`}render(){let{data:e={name:""}}=this;return p.dy`${e.name||""}`}}Xe.define("flow-context-workspace-item");class Ve extends p.Hc{static get props(){this._finalized||(this.finalize(),this._finalized=!0);let e=[...this._classProperties.keys()],t=this.properties,r={},i=this;for(;t&&e.length;)[...e].forEach((i=>{if(t.hasOwnProperty(i)){let n=t[i];if(n.hasOwnProperty("value")){r[i]=n.value;let t=e.indexOf(i);e.splice(t,1)}}})),i=i.__proto__,t=i.properties;return r}}class We extends Ve{static get properties(){return{name:{type:String,value:""},code:{type:String,value:""},contexts:{type:Array,value:[]},readonly:{type:Boolean,value:!1},advance:{type:Boolean,reflect:!0}}}static init(){this.config=this.props;let{code:e}=this.config;e&&(ze.has(e)||(ze.set(e,this),this.define(`flow-ctxworkspace-${e}`)))}static createContextNode(e,t,r){let i=new Map;return i.set("tag",`flow-ctx-${e}`),p.Cn`${i}<{tag} ?advance=${t.advance}
			config=${JSON.stringify(r.config||{})} class="flow-context"></{tag}>`}static createContextWorkspaceNode(e,t,r){let i=new Map;i.set("tag",`flow-ctxworkspace-${e}`);const{manager:n}=r;return p.Cn`${i}<{tag} ?advance=${n.advance}
			.manager=${n} class="flow-workspace"></{tag}>`}static get styles(){return[Ke,p.iv`
			:host(:not([advance])) .head {
				display:none
			}
		`]}static updateConfig(e){this.config=e;let t=(0,p.I8)(this.config);Ze.getContextManager().saveWorkspaceAndNotify(t)}render(){let e=this.getAddableContexts().length;return p.dy`
		<div class="head">
			${this.renderHeadPrefix()}
			<span class="name">
				<flow-input ?readonly=${this.readonly} label="Workspace Name" @changed="${this.onNameChange}"
					class="name-input" .value="${this.name}" pattern="^.{3,20}$">
				</flow-input>
			</span>
			${this.renderHeadTools({hasAddable:e})}
		</div>
		${this.renderContexts()}`}renderHeadPrefix(){return""}renderHeadTools({hasAddable:e}){let t=this.isDirty();return p.dy`<fa-icon icon="plus-circle" ?disabled=${!e} 
			@click="${this.onAddContextClick}"></fa-icon>
		<fa-icon icon="times" class="reset-workspace-btn" title="Reset"
			?disabled=${!t} @click="${this.onResetClick}"></fa-icon>
		${this.manager.multiWorkspace?p.dy`<fa-icon icon="trash-alt" 
			title="Remove Workspace" @click="${this.onRemoveWorkspaceClick}"></fa-icon>`:""}`}renderContexts(){let e=this.manager.filterContexts(this.getContexts());return this.log("render:contexts",e,JSON.stringify(this.constructor.config)),p.dy`
		<div class="contexts" @remove-ctx-request=${this.onRemoveContext}
			@context-updated=${this.onContextUpdate}>
			${e.map((e=>this.constructor.createContextNode(e.code,{advance:this.advance},{config:Object.assign({},e.config||{})})))}
		</div>`}getContexts(){let e;return(this.contexts||[]).map((t=>{if(e=$e.get(t.code),e)return Object.assign({},e.config,t)})).filter((e=>!!e))}isDirty(){let{config:e,defaultConfig:t}=this.constructor;return this.makeHash(e)!=this.makeHash(t)}makeHash(e){return JSON.stringify(e)}buildConfig(){let{name:e,code:t}=this,r={name:e,code:t};return this.getPropsKeys().forEach((e=>{"contexts"!=e&&(r[e]=this[e])})),r.contexts=this.buildContextConfig(),r}buildContextConfig(){let e=this.renderRoot.querySelectorAll(".flow-context");return e=[...e].map((e=>e.buildConfig())),this.log("buildContextConfig:contexts",e),e}onNameChange(e){e.detail.value.length<3||(this.name=e.detail.value)}onRemoveContext(e){let t=this.contexts.findIndex((t=>t.code==e.detail.code));t>-1&&(this.contexts.splice(t,1),this.requestUpdate("contexts"))}getAddableContexts(){return this.manager.filterContexts([...$e.values()].map((e=>e.config)).filter((e=>!this.contexts.find((t=>t.code==e.code)))))}onResetClick(e){let t=(0,p.I8)(this.constructor.defaultConfig,!0);this.initConfig(t)}onAddContextClick(e){let t=this.getAddableContexts(),r=p.dy`<flow-menu data-name="contexts" multiple>
			${t.map((e=>p.dy`<flow-menu-item value="${e.code}">${e.name}</flow-menu-item>`))}
			</flow-menu>`;FlowDialog.show({title:"Select Context",body:r,hideCloseBtn:!0,compact:!0,btns:[{text:"Close",handler:(e,t)=>{e()}},{text:"Done",cls:"primary",handler:(e,t)=>{e();let{contexts:r}=t.values;r=r.map((e=>({code:e}))),r.length&&(this.contexts=[...r,...this.contexts])}}]})}constructor(){super(),this.initConfig(this.constructor.config),this.saveState()}initConfig(e){Object.entries(e).forEach((([e,t])=>{this[e]=t}))}updated(e){super.updated(e),this.updateStaticValues();let t=this.constructor;t.defaultConfig||(t.defaultConfig=(0,p.I8)(t.config),this.recheckDirty())}recheckDirty(){let e=this.renderRoot.querySelector(".reset-workspace-btn");e&&(this.isDirty()?e.removeAttribute("disabled"):e.setAttribute("disabled",!0))}onContextUpdate(){this.updateStaticValues(),this.recheckDirty()}getPropsKeys(e=[]){return["name","contexts","readonly"].concat(e)}updateStaticValues(){this.updatePropValues(this.getPropsKeys())}updatePropValues(e){let t=this.constructor.config;e.forEach((e=>{t[e]="contexts"!=e?this[e]:this.buildContextConfig()})),this.fireUpdateNotification()}buildNotificationArgs(){let{code:e}=this,t={code:e},r=this.constructor.config;return this.getPropsKeys().forEach((e=>{t[e]=r[e]})),t}fireUpdateNotification(){let e=this.buildNotificationArgs();this.validateNotificationHash(e)&&this.fire("workspace-updated",{props:e,el:this},{bubbles:!0})}validateNotificationHash(e){let t=JSON.stringify(e);return this._hash!=t&&(this._hash=t,!0)}saveState(){this._hash=JSON.stringify(this.buildNotificationArgs())}}const Qe=e=>class extends e{static get properties(){return{ctxworkspaces:{type:Array,value:[]},multiWorkspace:{type:Boolean}}}constructor(){super(),this.registerListener("flow-ctxworkspace-updated",this.onContextUpdate.bind(this)),this.registerListener("flow-ctxworkspace-loaded",this.onContextLoaded.bind(this))}acceptContext(e){return!!e.type}onContextUpdate(e){let{props:t}=e.detail;(this.ctxworkspaces||[]).includes(t.code)&&this.contextsUpdate()}onContextLoaded(e){this.contextsUpdate()}contextsUpdate(){this.requestUpdate("ctxworkspaces",null)}getContextManagerConfig(){return{workspaces:this.ctxworkspaces||[],multiWorkspace:!!this.multiWorkspace}}setContextManagerConfig(e){let{workspaces:t}=e;this.ctxworkspaces=t,this.contextsUpdate()}openContextManager(){Ze.open(this)}getContextWorkspaces(){return(this.ctxworkspaces||[]).map((e=>{let t=(ze.get(e)||{}).config;return!!t&&(t=Object.assign({},t),t.contexts=(t.contexts||[]).map((e=>{let t=$e.get(e.code);return!!t&&Object.assign({},t.config,e)})).filter((e=>this.acceptContext(e))),t)})).filter((e=>e))}serialize(){let{ctxworkspaces:e}=this;return Object.assign({},super.serialize(),{ctxworkspaces:this.getContextWorkspaces()})}deserialize(e){super.deserialize(e);let{ctxworkspaces:t=[]}=e||{};this.ctxworkspaces=t,this.contextsUpdate()}};class Ge extends p.Hc{static get properties(){return{selected:{type:Array,value:[]},isLoading:{type:Boolean},advance:{type:Boolean,reflect:!0,value:!0}}}static get styles(){return[p.pg,p.iv`
			:host{--fa-icon-size:20px;}
			dialog{
				display:flex;padding:0px;height:700px; top:2vh;
				width:800px;max-width:95vw;
				max-height:95vh;flex-direction:column;
			    border:var(--flow-context-manager-dialog-border, 2px solid var(--flow-primary-color, #025763));
			    border-radius:var(--flow-context-manager-dialog-border-radius, 4px);
			    min-width:var(--flow-context-manager-dialog-min-width, 300px);
			    min-height:var(--flow-context-manager-dialog-min-height, 200px);
			    background-color:var(--flow-context-manager-dialog-bg, var(--flow-dialog-background-color, var(--flow-background-color)));
			    color:var(--flow-context-manager-dialog-color, var(--flow-dialog-color, var(--flow-color)));
			    box-shadow:var(--flow-box-shadow);
			}
			dialog:not([open]){display:none}
			.head,.header{
				display:flex;align-items:center;justify-content:center;
				padding:var(--flow-context-manager-head-padding, 10px);
				line-height:1.3;
			}
			.header{
				justify-content:flex-end;min-height:72px
			}
			.head-text{
				flex:1;overflow:hidden;text-overflow:ellipsis;
				font-size:var(--flow-context-manager-head-text-font-size, 1.2rem);
				margin-right:15px;
			}
			.header{
				padding:var(--flow-context-manager-header-padding, 0px 5px);
			}
			.workspace-selector{
				flex:1;--flow-selector-dropdown-width:100%;
				--flow-select-selected-max-width:100%;
			}
			.close-icon{cursor:pointer;--fa-icon-size:20px;}
			.body{
				padding:var(--flow-context-manager-body-padding, 10px);
				flex:1;overflow:auto;
			}
			.buttons{
			    margin:10px;display:flex;flex-wrap:wrap;justify-content:flex-end;
			}
			.buttons flow-btn{margin:0px 5px;align-items:center;display:flex;}
			.buttons flow-btn:last-child{margin-right:0px;}
			.buttons flow-btn:first-child{margin-left:0px;}
			dialog[loading]:after{
				content:"";z-index:10000;
				position:absolute;left:0px;top:0px;width:100%;height:100%;
				background-color:var(--flow-context-manager-loading-mask-bg, rgba(0,0,0, 0.5))
			}
			:host(:not([advance])) .advance-tools,
			[hidden]{
				display:none;
			}
			:host([advance]) flow-btn.toggle-advance-mode-btn{
				background-color:var(--flow-primary-color);
				color:var(--flow-primary-invert-color);
				--fa-icon-color:var(--flow-primary-invert-color);
			}
		`]}static get _tagName(){return"flow-context-manager"}static getContextManager(){let e=document.querySelector(this._tagName);return e||(e=document.createElement(this._tagName),document.body.appendChild(e),e)}static createContextManager(){return this.getContextManager()}static open(e){this.getContextManager().showModal(e)}render(){return p.dy`
		<link rel="stylesheet" type="text/css" href="${p.FH}/resources/extern/dialog/dialog-polyfill.css" />
		<dialog @close=${this.onDialogClose} ?loading=${this.isLoading} ?advance=${this.advance}>
			<div class="head">
				<span class="head-text">${this.heading||"Context Manager"}</span>
				<fa-icon class="close-icon" @click="${this.onCloseClick}" icon="times"></fa-icon>
			</div>
			<div class="header">
				${this.renderWorkspaceSelector()}
				${this.renderHeaderTools()}
			</div>
			<div class="body" @workspace-updated="${this.onWorkspaceUpdate}">
				${this.renderWorkspaces()}
			</div>
			<div class="buttons">
				<flow-btn @click="${this.onCloseClick}">Close</flow-btn>
				<flow-btn @click="${this.onDoneClick}" class="primary">Done</flow-btn>
			</div>
		</dialog>`}constructor(){super(),this.restoreWorkspaces(),this.initPropertiesDefaultValues()}renderWorkspaceSelector(){let e=[...ze.values()].map((e=>e.config));return p.dy`<flow-selector class="workspace-selector advance-tools" label="Select Workspace"
			?multiple=${this.multiWorkspace} .selected="${this.selected.slice(0)}"
			@select="${this.onWorkspacesSelectionChange}">
			${e.map((e=>this.renderWorkspaceItem(e)))}
		</flow-selector>`}renderWorkspaceItem(e){return p.dy`<flow-context-workspace-item 
					value="${e.code}" ?multi=${this.multiWorkspace}
					class="menu-item" data-text="${e.name}" .data="${e}"></flow-context-workspace-item>`}renderHeaderTools(){return p.dy`
		<flow-btn class="advance-tools add-workspace-btn" title="Add workspace"  
			@click="${this.onCreateWorkspaceClick}" >
			<fa-icon icon="plus"></fa-icon>
		</flow-btn>
		<!--flow-btn class="close-panel-btn" title="Remove Panel" 
			@click="${this.onClosePanelClick}" >
			<fa-icon icon="times"></fa-icon>
		</flow-btn>
		<flow-btn class="toggle-advance-mode-btn" title="Toggle advance mode"
			@click="${this.onToggleModeClick}" >
			<fa-icon icon="cogs"></fa-icon>
		</flow-btn-->`}renderWorkspaces(){return this.getWorkspacesConfig().map((e=>We.createContextWorkspaceNode(e.code,{},{manager:this})))}buildNewWorkspaceConfig(e){return Object.assign({name:"Workspace "+ ++qe,code:`workspace${(1e4*Math.random()).toFixed(0)}`,contexts:[]},e||{})}createNewWorkspace(e){let t=this.buildNewWorkspaceConfig();return Je(t,e),t}filterContexts(e){let t=this.getHostComponent();return t?(e||[]).filter((e=>t.acceptContext(e))):[]}saveWorkspace(e){let t=[];ze.forEach((e=>{let r=Object.assign({},e.config);t.push(r)})),this.saveWorkspacesConfig(t)}saveWorkspacesConfig(e){this.constructor.setLocalSetting("ctxworkspaces",JSON.stringify(e))}fetchWorkspacesConfig(){return new Promise(((e,t)=>{e(JSON.parse(this.constructor.getLocalSetting("ctxworkspaces","[]")))}))}restoreWorkspaces(){this.isLoading=!0,this.fetchWorkspacesConfig().then((e=>{this.loadWorkspacesConfig(e)}),(e=>{})).catch((e=>{})).finally((()=>{this.isLoading=!1}))}loadWorkspacesConfig(e){Ye(e),this.requestUpdate("_workspace",null)}onWorkspaceUpdate(e){let{props:t}=e.detail;this.saveWorkspaceAndNotify(t)}saveWorkspaceAndNotify(e){this.saveWorkspace(e),this.fire("flow-ctxworkspace-updated",{props:e},{},window)}onToggleModeClick(){this.advance=!this.advance}onClosePanelClick(){let e=this.getHostComponent();if(!e||!e.onClosePanelClick)return;let t=e.onClosePanelClick();(0,p.Kg)(100,(()=>{t.defaultPrevented||this.close()}))}onCreateWorkspaceClick(){let e=this.createNewWorkspace();this.multiWorkspace?(this.selected.push(e.code),this.requestUpdate("workspaces",null)):this.selected=[e.code]}onWorkspacesSelectionChange(e){let{selected:t}=e.detail;Array.isArray(t)||(t=t?[t]:[]),this.selected=t}getWorkspacesConfig(){let e=this.getHostComponent();if(!e)return[];let t=[];return this.selected.map((r=>{let i=(ze.get(r)||{}).config;i&&(i=Object.assign({},i),i.contexts=i.contexts.filter((e=>$e.get(e.code||e))).filter(e.acceptContext),t.push(i))})),t}firstUpdated(){this.dialog=this.renderRoot.querySelector("dialog"),dialogPolyfill.registerDialog(this.dialog),this._show&&this[this._show]()}onDialogClose(e){if(this._show)return void this[this._show]();let t={e};this.dispatchEvent(new CustomEvent("closed",{detail:t}))}showModal(e){let t=!e;if(!(e=e||this.getHostComponent()))return;let r=["getContextManagerConfig","setContextManagerConfig","acceptContext"].find((t=>"function"!=typeof e[t]));return r?this.log("showModal: missing function",r):(t||this.setHostComponent(e),this._show="showModal",this.dialog?this.dialog.showModal():void 0)}setHostComponent(e){if(this._cmp=e,e){let{workspaces:t,multiWorkspace:r}=e.getContextManagerConfig();this.selected=t.map((e=>e.code||e)),this.workspaces=t,this.multiWorkspace=!!r}else this.selected=[],this.workspaces=[],this.multiWorkspace=!1}getHostComponent(){return this._cmp}onCloseClick(){this.close()}buildConfig(){return[...this.renderRoot.querySelectorAll(".flow-workspace")].map((e=>e.code))}onDoneClick(){let e=this.getHostComponent();if(!e)return void this.close();let t=this.buildConfig();e.setContextManagerConfig({workspaces:t}),this.close()}close(){this._show=!1,this.setHostComponent(null),this.dialog&&this.dialog.close()}destroy(){this.close(),this.remove()}}Ge.define(Ge._tagName,{"window.dialogPolyfill":p.FH+"/resources/extern/dialog/dialog-polyfill.js"});const Ye=e=>{console.log("xxxxxxxxxxxxxxx FlowLoadWorkspaces",e),e.forEach((e=>{if(!e?.code)return;let t=ze.get(e.code);t?t.updateConfig(e):Je(e)})),(0,p.X$)("flow-ctxworkspace-loaded")};let Ze=Ge,Je=(e,t)=>{let r=(e=>{let t={};for(const[r,i]of Object.entries(e))void 0!==i.value&&i.type?t[r]=i:t[r]={type:p.P6.valueToDataType(i)||String,value:i};return t})(e);(class extends(t||We){static get properties(){return r}_initLog(t){super._initLog(t,`FlowContextWorkspace:${e.code}`)}}).init()};const et=(tt=p.Hc,class extends tt{static get properties(){return{heading:{type:String,value:"Hello"}}}static get styles(){return p.iv`
			:host {
				display:flex;flex-direction:column;
				align-items:stretch;
				justify-content:start;
				background-color:var(--flow-gridstack-panel-bg, #FFF);
				color:var(--flow-gridstack-panel-color, var(--flow-color));
				border-radius:var(--flow-gridstack-panel-border-radius, 4px);
				border:var(--flow-gridstack-panel-border, 1px solid var(--flow-primary-color));
				box-sizing:border-box;
				--flow-dropdown-content-right:2px;
				--flow-dropdown-border:var(--flow-gridstack-dd-border, 1px solid var(--flow-primary-color));
			}
			.heading{
				text-overflow:elipsis;overflow:hidden;
				padding:var(--flow-gridstack-panel-heading-padding, 5px);
				background-color:var(--flow-gridstack-panel-heading-bg, var(--flow-primary-color));
				color:var(--flow-gridstack-panel-head-color, var(--flow-primary-invert-color));
				display:flex;flex-direction:row;
				align-items:var(--flow-gridstack-panel-heading-align-items, center);
				overflow:var(--flow-gridstack-panel-heading-overflow, hidden);
				text-overflow:var(--flow-gridstack-panel-heading-text-overflow, ellipses);
				--fa-icon-color:var(--flow-gridstack-panel-head-color, var(--flow-primary-invert-color));
			}
			.head{
				display:flex;flex-direction:row;height:100%;
				flex:var(--flow-gridstack-panel-head-flex, 1);
				align-items:var(--flow-gridstack-panel-head-align-items, center);
			}
			.drag-region{cursor:move;}
			.body{overflow:auto;flex:1}
			/*:host(:not([opened])) .body{
				display:none;
			}*/
			.heading fa-icon:not(.disabled){cursor:pointer}
		`}constructor(){super(),this.initPropertiesDefaultValues()}render(){return p.dy` 
			<div class="heading" @click="${this.onHeadingClick}">
				${this.renderHeadPrefix()}
				<div class="head drag-region" 
					@click="${this.onHeadClick}">${this.renderHead()}</div>
				${this.renderHeadSuffix()}
			</div>
			<flow-dropdown id="settingDD" no-trigger right-align absolute>
				${this.renderSettings()}
			</flow-dropdown>
			${this.renderExtraBody()}
			<div class="body">${this.renderBody()}${this.renderBodySuffix()}</div>`}renderExtraBody(){return""}renderBodySuffix(){return""}update(e){super.update(e),this.bindDDTriggers()}renderHeadPrefix(){return p.dy`<fa-icon icon="window-maximize"></fa-icon>`}renderHeadSuffix(){return p.dy`
		<fa-icon class="setting-trigger" data-trigger-for="settingDD" icon="cog"></fa-icon>
		<fa-icon icon="times" @click="${this.onClosePanelClick}"></fa-icon>`}renderHead(){return this.heading||""}renderBody(){return p.dy`
		<div>
			PANEL : ${1e4*Math.random()}
			<div>contexts:${JSON.stringify(this.ctxworkspaces||[])}</div>
		</div>
		`}renderSettings(){return p.dy`
		<div class="head">
		<flow-btn @click="${this.onClosePanelClick}">
			<fa-icon icon="times"></fa-icon>
		</flow-btn>
		</div>`}onHeadingClick(){}acceptContext(e){return super.acceptContext(e)}onContextsUpdate(){}onHeadClick(){this.opened=!this.opened}serialize(){let{opened:e}=this;return Object.assign({},super.serialize(),{opened:e})}deserialize(e){super.deserialize(e);let{opened:t}=e||{};this.opened=!!t}getGridstackDragHandle(){return this.renderRoot.querySelector(".heading .head")}toggleSettingDD(){this.settingDD.toggle()}onClosePanelClick(){return this.fire("remove-gridstack-panel-request",{panel:this},{bubbles:!0,cancelable:!0},null,!0)}});var tt;class rt extends(Qe(et)){}rt.define("flow-gridstack-panel");class it extends p.Hc{render(){return p.dy`
			<h1 slot="title">GridStack in SHADOW DOM</h1>
			<flow-gridstack class="gs"></flow-gridstack>`}}it.define("flow-gridstack-test");const nt=(e=>class extends e{static get properties(){return{gridMargin:{type:Number,value:1},column:{type:Number,value:30},disableResize:{type:Boolean},resizableHandles:{type:String,value:"e, s, w"},cellHeight:{type:Number,value:100},dragMode:{type:String,value:"header",reflect:!0},items:{type:Array,value:[]},hidetools:{type:Boolean},dragInOptions:{type:Object},dragIn:{type:String},minWidth:{type:Number,value:400},removeTimeout:{type:Number,value:1e3}}}static define(e,t){t?p.Hc.define.call(this,e,t):this.defineElement(e)}static defineElement(e){this.addGridStackHelpers(),p.Hc.defineElement.call(this,e)}static addGridStackHelpers(){$.ui.draggable.prototype._getHandle=function(e){let{handle:t,handleFn:r}=this.options,i=this.element.closest(".grid-stack")[0];return i&&i.gridstack&&(r=i.gridstack.opts.draggable.handleFn),"function"==typeof r?r(e,this):!t||!!$(e.target).closest(this.element.find(t)).length}}constructor(){var e=$.ui.intersect;$.ui.ddmanager.dragStart=function(e,t){e.element.parentsUntil("body").on("scroll.droppable",(function(){e.options.refreshPositions||$.ui.ddmanager.prepareOffsets(e,t)}));const{gridstack:r}=e.element.parent()[0];r?._onResizeHandler(),$.each($.ui.ddmanager.droppables[e.options.scope]||[],(function(){this.isover=!1,this.isout=!0,this._out.call(this,t)}))},$.ui.ddmanager.drag=function(t,r){t.options.refreshPositions&&$.ui.ddmanager.prepareOffsets(t,r),$.each($.ui.ddmanager.droppables[t.options.scope]||[],(function(){if(!this.options.disabled&&!this.greedyChild&&this.visible&&this.element.width()){var i,n,o,s=e(t,this,this.options.tolerance,r),a=!s&&this.isover?"isout":s&&!this.isover?"isover":null;a&&(this.options.greedy&&(n=this.options.scope,(o=this.element.parents(":data(ui-droppable)").filter((function(){return $(this).droppable("instance").options.scope===n}))).length&&((i=$(o[0]).droppable("instance")).greedyChild="isover"===a)),i&&"isover"===a&&(i.isover=!1,i.isout=!0,i._out.call(i,r)),this[a]=!0,this["isout"===a?"isover":"isout"]=!1,this["isover"===a?"_over":"_out"].call(this,r),i&&"isout"===a&&(i.isout=!1,i.isover=!0,i._over.call(i,r)))}}))},super(),this.initPropertiesDefaultValues(),this.uid="flow-gs-"+(1e6*Math.random()).toFixed(0),this.style.display="block"}createRenderRoot(){return this}render(){let{uid:e}=this;return p.dy`
		<link rel="stylesheet" href="${p.FH}resources/extern/gridstack/gridstack.min.css">
		<link rel="stylesheet" href="${p.FH}resources/extern/gridstack/gridstack-extra.css">
		<style data-uid="${e}"></style>
		${this.renderGSTools(e)}
		<div class="grid-stack grid-stack-${this.column} ${e} hide-w-opacity"
			@remove-gridstack-panel-request=${this.onRemovePanelRequest}
		></div>
		<slot></slot>`}renderGSTools(e){return p.dy`
		<textarea class="gridstack-json" data-uid="${e}" ?hidden=${this.hidetools}></textarea>
		<div class="buttons" ?hidden=${this.hidetools}>
			<flow-btn @click="${this.saveGrid}">Save</flow-btn>
			<flow-btn @click="${this.loadGrid}">Load</flow-btn>
			<flow-btn @click="${this.saveGridLS}">Save to LStorage</flow-btn>
			<flow-btn @click="${this.loadGridLS}">Load from LStorage</flow-btn>
			<flow-btn @click="${this.toggleDragMode}">ToggleDragMode : ${this.dragMode}</flow-btn>
		</div>`}firstUpdated(){let{uid:e}=this;this.gridEl=this.renderRoot.querySelector(".grid-stack"),this.styleEl=this.renderRoot.querySelector(`style[data-uid="${e}"]`),this.debugEl=this.renderRoot.querySelector(`textarea[data-uid="${e}"]`),this.styleEl.textContent=`\n\t\t\t/*.${e} .grid-stack-item-content{display:block}*/\n\t\t\t.${e}.grid-stack .grid-stack-placeholder{\n\t\t\t\tbackground:var(--flow-gridstack-placeholder-bg, #1b202f);\n\t\t\t}\n\t\t\t.${e}.grid-stack .grid-stack-placeholder .placeholder-content{\n\t\t\t\tborder:var(--flow-gridstack-placeholder-content-border, 0px);\n\t\t\t}\n\t\t\t.${e}.grid-stack.hide-w-opacity{opacity:0}\n\t\t\t.${e} .grid-stack-item.ui-resizable-resizing:after{\n\t\t\t\tcontent:"";position:absolute;top:0px;left:0px;right:0px;bottom:0px;\n\t\t\t\t/*background:#F00;*/\n\t\t\t\tz-index:89;\n\t\t\t}\n\t\t\t${this.customCss(e)}\n\t\t`;let t={alwaysShowResizeHandle:!1,resizable:{handles:this.resizableHandles},minRow:1,margin:this.gridMargin,cellHeight:this.cellHeight,column:this.column,minWidth:this.minWidth,removeTimeout:this.removeTimeout,dragIn:this.dragIn||".sidebar .grid-stack-item",acceptWidgets:this.acceptWidgets||function(e){return!0},dragInOptions:this.dragInOptions||{revert:"invalid",scroll:!1,appendTo:this,helper:()=>{}},draggable:{handle:".grid-stack-item-content .heading",helper___:()=>{let e=document.createElement("div");return e.style.backgroundColor="#F0F",e},handleFn:(e,t)=>{let{handle:r}=t.options.handle;if("panel"==this.dragMode)r=".grid-stack-item-content";else if("header"==this.dragMode){let r,i=t.element.find(".grid-stack-item-content")[0];return i&&i.getGridstackDragHandle&&(r=i.getGridstackDragHandle()),!!r&&e.originalEvent.path?.includes(r)}return!r||!!$(e.target).closest(t.element.find(r)).length}}};(0,p.Kg)((()=>{this.grid=GridStack.init(t,this.gridEl),this.gridEl.classList.remove("hide-w-opacity"),this.grid.on("added removed change",((e,t)=>{let r="";t.forEach((e=>{r+=`${e.id} => x: ${e.x}, y: ${e.y}, w: ${e.width}, h: ${e.height}\n`})),this.log(`${e.type} ${t.length} items\n${r}`)})),this.initItems()}),100)}customCss(e){return""}setLocalSetting(e,t){"string"!=typeof t&&(t=JSON.stringify(t)),(0,p.fd)("gridstack-${this.id || this.uid)}-${name}",t)}getLocalSetting(e,t){let r=(0,p.CZ)("gridstack-${this.id || this.uid)}-${name}");return void 0===r?t:r}saveGridLS(){this.setLocalSetting("grid",this.saveGrid())}loadGridLS(){let e=this.getLocalSetting("grid","[]");this.debugEl.value=e;try{e=JSON.parse(e),e&&(this.debugEl.value=JSON.stringify(e,null,"  "))}catch(t){e=[]}this.setGridItemsConfig(e)}saveGrid(){let e=this.getGridItemsConfig();return this.debugEl.value=JSON.stringify(e,null,"  "),e}loadGrid(){let e=[];try{e=JSON.parse(this.debugEl.value)}catch(e){this.log("JSON.parse:error",e)}this.setGridItemsConfig(e)}updated(e){e.has("items")&&this.setGridItemsConfig(this.items||[])}initItems(){let{items:e}=this;e&&e.length&&this.setGridItemsConfig(e),this.fire("gridstack-ready",{grid:this})}getGridItemsConfig(){let e=[];return this.grid.engine.nodes.forEach((t=>{let r=null,i="div",n=t.el.querySelector(".grid-stack-item-content");n&&(i=n.nodeName,"function"==typeof n.serialize&&(r=n.serialize())),e.push({x:t.x,y:t.y,width:t.width,height:t.height,id:t.id||n.parentNode?.dataset.gsId||"node-"+(1e4*Math.random()).toFixed(),nodeName:i,serializedData:r})})),e}setGridItemsConfig(e){this.lastConfig=e,this.onResize()}activateGridItemsConfig(e){let t=GridStack.Utils.sort(e),{grid:r}=this;if(r){if(r.batchUpdate(),0===r.engine.nodes.length)t.forEach((e=>{this.addWidget(e)}));else{let e=new Map;t.forEach((t=>{e.set(t.id,t);let i=r.engine.nodes.find((e=>e.id==t.id));i?(r.update(i.el,t.x,t.y,t.width,t.height),this.sendSerializeDataToPanel(i.el,t.serializedData)):this.addWidget(t)})),[...r.engine.nodes].forEach((t=>{e.get(t.id)||this.grid.removeWidget(t.el,!0,!0)}))}r.commit()}}addWidget(e){let t=e.nodeName||"div",r=this.grid.addWidget(`<div class="grid-stack-item" data-gs-id="${e.id}">\n\t\t\t<${t} class="grid-stack-item-content"></${t}></div>`,e);this.sendSerializeDataToPanel(r,e.serializedData)}sendSerializeDataToPanel(e,t){if(t){if(!(e=e.querySelector(".grid-stack-item-content"))||"function"!=typeof e.deserialize)return console.log("el.deserialize is missing",e&&e.deserialize);e.deserialize(t)}}clearGrid(){this.grid.removeAll()}onResize(){let{grid:e}=this;e&&(0,p.Kg)(10,(t=>{e._onResizeHandler(),this.afterResize()}))}afterResize(e){if(this.offsetWidth&&this.lastConfig){let e=this.lastConfig;this.lastConfig=null,this.activateGridItemsConfig(e)}}removePanel(e,t=!0,r=!0){e.matches(".grid-stack-item")||(e=e.closest(".grid-stack-item")),e&&this.grid.removeWidget(e,t,r)}toggleDragMode(){return"panel"==this.dragMode?this.setDragMode("header"):this.setDragMode("panel"),this.dragMode}setDragMode(e){let{uid:t}=this;return!!["header","panel"].includes(e)&&(this.dragMode=e,this.dragMode)}onRemovePanelRequest(e){let{panel:t}=e.detail;t&&this.removePanel(t)}serialize(){let e=super.serialize();return e.items=this.getGridItemsConfig(),e}deserialize(e){super.deserialize(e);let{items:t}=e;this.setGridItemsConfig(t)}connectedCallback(){super.connectedCallback(),this.resizeObserver||(this.resizeObserver=new ResizeObserver((()=>{this.onResize()}))),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.disconnect()}})(p.Hc);(class extends nt{}).define("flow-gridstack",[p.FH+"resources/extern/gridstack/gridstack.all.js"]);class ot extends p.Hc{static get properties(){return{file:{type:String},icon:{type:String},title:{type:String},descr:{type:String},sha1:{type:String}}}static get styles(){return p.iv`
			:host{display:flex;flex-direction:row;align-items:center;}
			.title{min-width:var(--flow-download-badge-title-min-width, 230px);}
			.icon{
			    min-width:var(--flow-download-badge-icon-size, 24px);
			    min-height:var(--flow-download-badge-icon-size, 24px);
			    background-position:center;
			    background-repeat:no-repeat;background-size:contain;margin-bottom:-10px;
			    margin:var(--flow-download-badge-icon-margin, 0px 14px 0px 0px);
			}
			.file-link{
				display:flex;flex-direction:row;
				align-items:var(--flow-download-badge-file-link-align-items, center);
				padding:var(--flow-download-badge-file-link-padding, 6px);
				font-size:var(--flow-download-badge-file-link-font-size, 16px);
			}
			[disable]{pointer-event:none}
			a{color: var(--flow-link-color, #017b68);}
			a:not([disable]):hover{
				color: var(--flow-link-hover-color, #017b68);
			}
			[hide]{display:none}
			[row]{display:flex;flex-direction:row;}
			[col]{display:flex;flex-direction:column;}
		`}render(){return p.dy`
			<div class="file-link" href="${this.file}">
				<div class="icon" style="background-image:url(${this.icon})"></div>
				<div col>
					<div class="title">${this.title}</div>
					<div class="descr">${this.descr}</div>
				</div>
            	<slot></slot>
        	</div>
        	<div class="sha-link" href="${this.sha1}" ?hide="${!this.sha1}">
        		<div class="sha">SHA1</div>
        	</div>
    	</div>`}}ot.define("flow-download-badge");class st extends p.Hc{static get properties(){return{color:{type:String}}}static get styles(){return p.iv`
			:host{
				display:inline-block;width:20px;height:20px;
				position:relative;box-sizing:border-box;
				border:var(--flow-color-picker-border, 1px solid var(--flow-border-color, var(--flow-primary-color, #FFF)));
			}
			.box{width:100%;height:100%}
			:host(:not([disabled])) input{
				cursor:pointer;
			}
			:host([disabled]) input{display:none}
			input.color{
				opacity:0;
				position:absolute;left:0px;top:0px;width:100%;height:100%;
				right:0px;buttom:0px;
			}
		`}render(){return p.dy`<div class="box" style="background-color:${this.color}"></div><input 
		class="color" type="color" .value="${this.color||""}"
		@change="${this.onInputChange}" 
		@input="${this.onInputChange}" />`}onInputChange(e){this.color=e.target.value,this.fire("changed",{color:this.color},{bubbles:!0})}}st.define("flow-color-picker");class at extends p.Hc{static get properties(){return{href:{type:String},enablePictures:{type:Boolean}}}static get styles(){return p.iv`
			:host{display:block;}
			img{max-width:100%;height:auto;}
			a{
				color: var(--flow-link-color, #017b68);
			}

			a:hover {
				color: var(--flow-link-hover-color, #017b68);
			}

			.article-link{
				margin: 5px 0px;
			}

			.article-content{
				font-family: var(--flow-font-family, 'Sans Serif');
				font-size: 14px;
			}
		`}render(){return p.dy`${this.href} ${this.body}`}updated(e){(e.has("href")||e.has("enablePictures"))&&this.href&&this.fetch(this.href)}fetch(e){return fetch(e,Object.assign({method:"GET",mode:"cors",referrerPolicy:"no-referrer"},this.feedOpt||{}))}setFeedData(e){e=(new window.DOMParser).parseFromString(e,"text/xml"),this.buildBody(e),this.requestUpdate("body",null)}buildBody(e){let t=[...e.querySelectorAll("item")];this.body=p.dy`
		${t.map((e=>{let t=e.querySelector("link"),r=e.querySelector("description")||"";return r&&(r="#cdata-section"==r.childNodes[0]?.nodeName?r.childNodes[0].nodeValue:r.innerHTML),p.dy`
			<article>
	          <img src="${t.innerHTML}/image/large.png" alt="">
	          <div class="article-link">
	            <flow-link href="${t.innerHTML}" target="_blank" rel="noopener">
	              ${e.querySelector("title").innerHTML}
	            </flow-link>
	          </div>
	          ${this.buildNode(r)}
	        </article>`}))}
		`}buildNode(e){this._tpl=this._tpl||document.createElement("template"),this._tpl.innerHTML=`<div class="article-content">${e}</div>`;let t=this._tpl.content.firstChild;return t.querySelectorAll("script"+(this.enablePictures?"":",img")).forEach((e=>{e.remove()})),t}}at.define("flow-rss"),window.d3?.selection&&(d3.selection.prototype.selectAppend=function(e){let t=this.select(e);return t.size()?t:this.append(e)});let ct={name:"flare",children:[{name:"analytics",children:[{name:"cluster",children:[{name:"AgglomerativeCluster",value:3938},{name:"CommunityStructure",value:3812},{name:"HierarchicalCluster",value:6714},{name:"MergeEdge",value:743}]},{name:"graph",children:[{name:"BetweennessCentrality",value:3534},{name:"LinkDistance",value:5731},{name:"MaxFlowMinCut",value:7840}]},{name:"optimization",children:[{name:"AspectRatioBanker",value:7074}]}]},{name:"animate",children:[{name:"Easing",value:17010},{name:"FunctionSequence",value:5842},{name:"interpolate",children:[{name:"ArrayInterpolator",value:1983},{name:"ColorInterpolator",value:2047},{name:"DateInterpolator",value:1375},{name:"Interpolator",value:8746}]},{name:"ISchedulable",value:1041},{name:"Parallel",value:5176},{name:"Pause",value:449}]},{name:"data",children:[{name:"converters",children:[{name:"Converters",value:721},{name:"DelimitedTextConverter",value:4294},{name:"GraphMLConverter",value:9800}]},{name:"DataField",value:1759},{name:"DataSchema",value:2165},{name:"DataSet",value:586}]},{name:"display",children:[{name:"DirtySprite",value:8833},{name:"LineSprite",value:1732}]},{name:"flex",children:[{name:"FlareVis",value:4116}]},{name:"physics",children:[{name:"DragForce",value:1082},{name:"GravityForce",value:1336},{name:"IForce",value:1319}]},{name:"query",children:[{name:"AggregateExpression",value:1616},{name:"And",value:3027}]}]};(class extends Y{static get properties(){return{noZoom:{type:Boolean},data:{type:Object},updatenum:{type:Number},d3margin:{type:Number}}}static get sampleData(){return ct}static get styles(){return[Y.styles,p.pg,p.iv`
			:host{
				display:inline-flex;
				font-weight:bold;
				font-size:10px;
				text-transform:uppercase;
				font-family:var(--flow-data-field-font-family, "Julius Sans One");
				font-weight:var(--flow-data-field-font-weight, bold);
				border-radius: 10px;
				overflow: hidden;
				position:relative;
				width:100%;
				height:100%;
			}
			:host([disabled]){opacity:0.5;cursor:default;pointer-events:none;}
			.container{white-space:nowrap;padding:2px 6px 6px 6px;height:100%;}
			.container>div{padding:2px;}
			.suffix{opacity:0.9;margin-left:3px;margin-top:3px; font-size: 10px;}
			.col{display: flex; flex-direction: column; align-items: left;}
			.row{display: flex; flex-direction: row; flex:0;}

			.wrapper {
				position:relative;flex:1;
				margin:6px;overflow:hidden;
				display: flex;
			    align-items: stretch;
			    justify-content: center;
			}
			
			:host([border]) .wrapper {
				border: 2px solid var(--flow-primary-color,#333);
				box-shadow: 2px 2px 1px rgba(1, 123, 104, 0.1);
				border-radius: 10px;

			}

			.wrapper > div:not(.tip,.legends) {
				width:100%;height:100%;
				position:relative;left:0px;top:0px;bottom:0px;right:0px;
			}

			.d3-holder{
				min-height:10px;
				min-width:10px;
				opacity:1;
				display:flex;
				/*background-color:#F00;*/
				align-items:center;
			}
			[flex] {
				flex: 1;
			}
			/*#d3{background-color:#f0f}*/
			text{fill:var(--flow-sunburst-graph-text-color, var(--flow-color, #000))}
			path{cursor:default}
			.tip{
				position:absolute;border:1px solid var(--flow-primary-color,#333);
				box-sizing:border-box;display:none;
				width:var(--flow-sunburst-graph-tip-width, unset);
				max-width:var(--flow-sunburst-graph-tip-width, 95%);
				padding:var(--flow-sunburst-graph-tip-padding, 10px);
				min-width:var(--flow-sunburst-graph-tip-min-width, 100px);
				min-height:var(--flow-sunburst-graph-tip-min-height, unset);
				border-radius:var(--flow-sunburst-graph-tip-border-radius, 4px);
				background-color:var(--flow-sunburst-graph-tip-bg, var(--flow-background-color));
				color:var(--flow-sunburst-graph-tip-color, var(--flow-color));
			}
			.legends{
				margin:var(--flow-sunburst-graph-legends-margin, 0px 0px 0px 5px);
				width:var(--flow-sunburst-graph-legends-width, 30%);
				height:var(--flow-sunburst-graph-legends-height, initial);
				background-color:var(--flow-sunburst-graph-legends-bg, initial);
				max-width:var(--flow-sunburst-graph-legends-max-width, 300px);
				max-height:var(--flow-sunburst-graph-legends-max-height, 100%);
				overflow:var(--flow-sunburst-graph-legends-overflow, auto);
				display:flex;align-items:center;
				flex-direction:column;
			}
			.legends .items>div{
				display:flex;align-items:center;
			}
			.color-box{
				display:inline-block;
				margin:var(--flow-sunburst-graph-color-box-margin, 2px 10px 2px 0px);
				width:var(--flow-sunburst-graph-color-box-width, 20px);
				min-width:var(--flow-sunburst-graph-color-box-width, 20px);
				height:var(--flow-sunburst-graph-color-box-height, 20px);
				opacity:var(--flow-sunburst-graph-color-box-opacity, 1);
			}
			.tip{opacity:0;zIndex:-1;transition:opacity 0.5s ease;display:inline-block}
		`]}render(){return(0,p.Kg)((()=>{this.draw()})),p.dy`
			<div class='wrapper'>
				<div class="d3-holder">${super.render()}</div>
				<div class="legends"></div>
				<div class="tip"></div>
			</div>
			`}constructor(){super(),this.sampler="",this.svgPreserveAspectRatio="xMaxYMax meet",this.d3margin=10}firstUpdated(){super.firstUpdated(),this.el_wrapper=this.renderRoot.querySelector(".wrapper"),this.el_legends=this.el_legends||this.renderRoot.querySelector(".legends"),this.outerBox=this.el_wrapper.getBoundingClientRect(),this.updateD3Holder()}updateD3Holder(){let{width:e,height:t}=this.el_wrapper.getBoundingClientRect(),{width:r}=this.el_legends.getBoundingClientRect();e-=r;let i=e>t?t:e;this.el_d3.style.width=i-this.d3margin+"px",this.el_d3.style.height=i-this.d3margin+"px",this.el_d3Rect=this.getBoundingClientRect.call(this.el_d3)}onElementResize(){super.onElementResize(),this.outerBox=this.el_wrapper.getBoundingClientRect(),(0,p.Kg)((()=>{this.outerBox=this.el_wrapper.getBoundingClientRect(),this.updateD3Holder(),this.requestUpdate("outerBox",null)}))}connectedCallback(){super.connectedCallback(),this.sampler&&(this.interval=setInterval(this.requestUpdate.bind(this),this.refresh))}disconnectedCallback(){super.disconnectedCallback(),this.interval&&clearInterval(this.interval)}getMargin(){return this.axes?{bottom:40,top:30,left:20,right:20}:{bottom:0,top:0,left:0,right:0}}draw(){let e=this.getMargin(),t=this.data;if(!t||!t.children)return;const r=this,i=this.el_d3.getBoundingClientRect();let{height:n,width:o}=i,s=o-e.left-e.right,a=n-e.top-e.bottom;const c=this.partition(t);c.each((e=>e.current=e));const{el:l}=this;let u=`translate(${s/2+e.left},${a/2+e.top})`;l.__t!=u&&(l.__t=u,l.attr("transform",u)),this.svg.__w!=o&&(this.svg.__w=o,this.svg.attr("width",o)),this.svg.__h!=n&&(this.svg.__h=n,this.svg.attr("height",n));let h=this.getDataItemsCount(t),d=d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow,h+1)),f=(d3.format(",d"),(s<a?s:a)/10),p=2*f,g=d3.arc().startAngle((e=>e.x0)).endAngle((e=>e.x1)).padAngle((e=>Math.min((e.x1-e.x0)/2,.005))).padRadius(5*f).innerRadius((e=>e.y0*f+p)).outerRadius((e=>Math.max(e.y0*f+p,e.y1*f-1+p)));this.rootPaths||(this.rootPaths=l.append("g").attr("class","paths"),this.labels=l.append("g").attr("pointer-events","none").attr("text-anchor","middle").style("user-select","none"),this.centerLabelHolder=l.append("g").attr("class","center-label"),this.centerLabel1=this.centerLabelHolder.append("text").attr("dy",-10).attr("class","center-label-top").attr("text-anchor","middle"),this.centerLabel2=this.centerLabelHolder.append("text").attr("dy",10).attr("class","center-label-bottom").attr("text-anchor","middle"),this.el_tip=this.renderRoot.querySelector("div.tip"),this.el_legends=this.el_legends||this.renderRoot.querySelector(".legends"));const{el_tip:m}=this,b=this.rootPaths.selectAll("path").data(c.descendants().slice(1)).join("path").attr("fill",(e=>e.data.color||d(e.data.name))).attr("d",(e=>g(e.current)));let v;b.filter((e=>e.children)).style("cursor","pointer").on("click",_),b.on("mouseenter",(function(...e){r.buildTip(...e),r.showTip(...e)})).on("mousemove",(function(...e){r.showTip(...e)})).on("mouseleave",(function(...e){!function(){m.style.opacity="0",m.style.zIndex="-1"}(...e)})),this.useLabels&&(v=this.labels.selectAll("text").data(c.descendants().slice(1)).join("text").attr("dy","0.35em").attr("fill-opacity",(e=>+x(e.current))).attr("transform",(e=>k(e.current))).text((e=>e.data.name))),this.centerLabel1.text(c.data.title||c.data.name),c.data.subtitle&&this.centerLabel2.text(c.data.subtitle),this.buildLegends(c,d),this.circleEl||(this.circleEl=l.append("circle"));const y=this.circleEl.datum(c).attr("r",f+p).attr("fill","none").attr("pointer-events","all").on("click",_),w=this.noZoom;function _(e,...t){if(w)return;y.datum(e.parent||c),m.style.top=e.y0+"px",m.style.left=e.x0+"px",c.each((t=>t.target={x0:2*Math.max(0,Math.min(1,(t.x0-e.x0)/(e.x1-e.x0)))*Math.PI,x1:2*Math.max(0,Math.min(1,(t.x1-e.x0)/(e.x1-e.x0)))*Math.PI,y0:Math.max(0,t.y0-e.depth),y1:Math.max(0,t.y1-e.depth)}));const i=l.transition().duration(750);let n=b.transition(i).tween("data",(e=>{const t=d3.interpolate(e.current,e.target);return r=>e.current=t(r)})).filter((function(e){return+this.getAttribute("fill-opacity")||r.arcVisible(e.target)})).attr("fill-opacity",(e=>r.arcVisible(e.target)?e.children?.6:.4:0)).attrTween("d",(e=>()=>g(e.current))),o=n.size();n.on("end",(t=>{o||r.buildLegends(e.parent||c,d)})),v&&v.filter((function(e){return+this.getAttribute("fill-opacity")||x(e.target)})).transition(i).attr("fill-opacity",(e=>+x(e.target))).attrTween("transform",(e=>()=>k(e.current)))}function x(e){return e.y1<=3&&e.y0>=1&&(e.y1-e.y0)*(e.x1-e.x0)>.03}function k(e){const t=(e.x0+e.x1)/2*180/Math.PI;return`rotate(${t-90}) translate(${(e.y0+e.y1)/2*f+p},0) rotate(${t<180?0:180})`}}arcVisible(e){return e.y1<=3&&e.y0>=1&&e.x1>e.x0}buildLegends(e,t){let r=new Map,i=p.dy`<div class="items">${e.descendants().slice(1).map((e=>{if(!this.arcVisible(e.current))return!1;if(e.data.legendOnce){if(r.has(e.data.legendOnce))return!1;r.set(e.data.legendOnce,1)}return p.dy`
				<div class="item">
					<div class="color-box" style="background-color:${e.data.color||t(e.data.name)}"></div>
					<div class="name">${e.data.name}</div>
				</div>`})).filter((e=>e))}</div>`;(0,p.sY)(i,this.el_legends)}showTip(e,...t){let{pageX:r,pageY:i}=d3.event;this.outerBox=this.el_wrapper.getBoundingClientRect();let{left:n,top:o,right:s,width:a,height:c}=this.outerBox,l=r-n+15,u=i-o+15;const{el_tip:h}=this;h.style.opacity="0",h.style.zIndex="-1";let d,f,p=l+h.offsetWidth,g=u+h.offsetHeight;d=p>a?a-h.offsetWidth:l,f=g>c?c-h.offsetHeight:u,d<l&&f<u&&u>c/2&&(f=u-h.offsetHeight-20),h.style.left=`${d}px`,h.style.top=`${f}px`,h.style.opacity="1",h.style.zIndex="1"}buildTip(e,...t){let r=p.dy`
			<div class="name">${e.ancestors().slice(0,-1).map((e=>e.data.name)).reverse().join(" / ")}</div>
			<div class="value">${this.format(e.value,e)}</div>`;(0,p.sY)(r,this.el_tip)}format(e,t){return this.formatFn||(this.formatFn=d3.format(",d")),this.formatFn(e)}getDataItemsCount(e){let t=e.children?.length||0;return e.children?.forEach((e=>{t+=this.getDataItemsCount(e)})),t}partition(e){const t=d3.hierarchy(e).sum((e=>e.value)).sort(((e,t)=>t.value-e.value));return d3.partition().size([2*Math.PI,t.height+1])(t)}}).define("flow-sunburst-graph");const lt=p.iv`
.flow-swipeable-container { overflow: hidden }
.flow-swipeable-row{
	--swipeable-n: 1;
	--swipeable-f: 1;
	display: flex;
	align-items: stretch;
	overflow:hidden;
	overflow-y: hidden;
	width: 100%; /* fallback */
	width: calc(var(--swipeable-n) * 100%);
	/*max-height: 100vh;*/
	--swipeable-transform-x: calc(var(--swipeable-tx, 0px) + var(--swipeable-i, 0) / var(--swipeable-n) * -100%);
	transform: translateX(var(--swipeable-transform-x));
}
.flow-swipeable-row .flow-swipeable{
	width: 100%; /* fallback */
	height: 100%;
	_width: calc(100% / var(--swipeable-n));
	/*user-select: none;
	pointer-events: none;
	background: no-repeat;
	background-size: cover;*/
	
}

.flow-swipeable-smooth{ transition: transform  calc(var(--swipeable-f, 1) * .5s) ease }
`;class ut{constructor(e,t={}){this.container=e;let r=e.querySelector(".flow-swipeable-row");this.element=r;this.options={drag:!0,validateEvent:e=>!e.target.closest("flow-dropdown,flow-select,flow-selector,flow-input,flow-checkbox,select,textarea, input,.not-swipeable"),...t},this.count=r.children.length,this.x=null,this.locked=!1,this.i=0,this.onResize(),this.updateCount(),this.init()}updateCount(){let e=this.element;this.count=e.children.length,e.style.setProperty("--swipeable-n",this.count),this.updateFixedPositionsOffset()}init(){let e=this.element,t=this.onTouchStart.bind(this),r=this.onDrag.bind(this),i=this.onTouchEnd.bind(this);e.addEventListener("mousedown",t,!1),e.addEventListener("touchstart",t,!1),e.addEventListener("mousemove",r,!1),e.addEventListener("touchmove",r,!1),e.addEventListener("mouseup",i,!1),e.addEventListener("touchend",i,!1),"undefined"!=typeof MutationObserver&&new MutationObserver((()=>{this.updateCount()})).observe(e,{childList:!0}),this.startResizeListener()}updateFixedPositionsOffset(){let{width:e,top:t}=this.container.getBoundingClientRect();[...this.element.children].map(((r,i)=>{r.style.setProperty("--flow-transform-translate-x",i*e+"px"),r.style.setProperty("--flow-transform-translate-y",-t+"px")}))}setActive(e){this.element.style.setProperty("--swipeable-i",e),this.i=e}startResizeListener(){this.resizeObserver||(this.resizeObserver=new ResizeObserver((()=>{this.onResize()})),this.resizeObserver.observe(this.container))}stopResizeListener(){this.resizeObserver&&(this.resizeObserver.unobserve(this.container),this.resizeObserver.disconnect(),delete this.resizeObserver)}unifyEvent(e){return e.changedTouches?e.changedTouches[0]:e}isValidEvent(e){return this.options.validateEvent(e)}onResize(){this.width=this.container.getBoundingClientRect().width,this.updateFixedPositionsOffset()}onTouchStart(e){this.isValidEvent(e)&&(this.x=this.unifyEvent(e).clientX,this.element.classList.toggle("flow-swipeable-smooth",!(this.locked=!0)))}onDrag(e){this.locked&&this.options.drag&&(e.preventDefault(),this.element.style.setProperty("--swipeable-tx",`${Math.round(this.unifyEvent(e).clientX-this.x)}px`))}onTouchEnd(e){if(!this.locked)return;let t=this.element,{i:r,count:i,width:n,x:o}=this,s=r,a=this.unifyEvent(e).clientX-o,c=Math.sign(a),l=+(c*a/n).toFixed(2);(r>0||c<0)&&(r<i-1||c>0)&&l>.1&&(t.style.setProperty("--swipeable-i",r-=c),l=1-l),this.i=r,t.style.setProperty("--swipeable-tx","0px"),t.style.setProperty("--swipeable-f",l),t.classList.toggle("flow-swipeable-smooth",!(this.locked=!1)),this.x=null,s!=r&&this.options.onSwipe?.({index:r,element:this.element.children[r]})}}class ht extends p.Hc{static get properties(){return{value:{type:String},disabled:{type:Boolean}}}static get styles(){return p.iv`
			:host{
				display:inline-block;
				font-family:var(--flow-font-family, "Julius Sans One");
				font-weight:var(--flow-font-weight, bold);
				width:var(--flow-t9-width, 100%);
			}
			.row{
				display:flex;
				align-items:stretch;
				min-width:60px;
				text-align:center;
				justify-content:space-evenly;
				margin-bottom:5px;
			}
			flow-btn{
				margin:var(--flow-t9-btn-margin, 5px);
				padding:var(--flow-t9-btn-padding, 0px);
				box-size:border-box;
				border-radius:var(--flow-t9-btn-border-radius, 50%);
				--flow-btn-wrapper-min-width:10px;
				width:var(--flow-t9-btn-width, 50px);
				height:var(--flow-t9-btn-height, 50px);
    			font-size:var(--flow-t9-btn-font-size, 1.5rem);
			}
		`}render(){let{value:e=""}=this;return p.dy`
		<div class="wrapper" @click=${this.onClick}>
			<div class="row">
				<flow-btn full-height-wrapper data-v="1">1</flow-btn>
				<flow-btn full-height-wrapper data-v="2">2</flow-btn>
				<flow-btn full-height-wrapper data-v="3">3</flow-btn>
			</div>
			<div class="row">
				<flow-btn full-height-wrapper data-v="4">4</flow-btn>
				<flow-btn full-height-wrapper data-v="5">5</flow-btn>
				<flow-btn full-height-wrapper data-v="6">6</flow-btn>
			</div>
			<div class="row">
				<flow-btn full-height-wrapper data-v="7">7</flow-btn>
				<flow-btn full-height-wrapper data-v="8">8</flow-btn>
				<flow-btn full-height-wrapper data-v="9">9</flow-btn>
			</div>
			<div class="row">
				<flow-btn full-height-wrapper data-v="." 
					?disabled="${e.includes(".")}">.</flow-btn>
				<flow-btn full-height-wrapper data-v="0">0</flow-btn>
				<flow-btn full-height-wrapper data-v="backspace"
					?disabled="${!e}">&lt;</flow-btn>
			</div>
		</div>
		`}setClear(){this.setValue("")}onClick(e){let t=e.target.closest("flow-btn");if(!t)return;let r=t.dataset.v,{value:i=""}=this;"."==r&&i.includes(".")||this.fire("btn-click",{el:this,btn:r,btnEl:t},{cancelable:!0},null,!0).defaultPrevented||("backspace"==r?i=i.substring(0,i.length-1):("."==r&&""===i&&(i="0"),i+=r),this.setValue(i))}setValue(e){this.value=e,this.fire("changed",{el:this,value:this.value})}}ht.define("flow-t9");let dt={};!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;(t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).ProgressBar=e(),dt.ProgressBar=t.ProgressBar}}((function(){return function e(t,r,i){function n(s,a){if(!r[s]){if(!t[s]){var c="function"==typeof require&&require;if(!a&&c)return c(s,!0);if(o)return o(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var u=r[s]={exports:{}};t[s][0].call(u.exports,(function(e){return n(t[s][1][e]||e)}),u,u.exports,e,t,r,i)}return r[s].exports}for(var o="function"==typeof require&&require,s=0;s<i.length;s++)n(i[s]);return n}({1:[function(e,t,r){var i,n;i=window,n=function(){return function(e){var t={};function r(i){if(t[i])return t[i].exports;var n=t[i]={i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,i){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(i,n,function(t){return e[t]}.bind(null,n));return i},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=3)}([function(e,t,r){(function(e){r.d(t,"e",(function(){return p})),r.d(t,"c",(function(){return m})),r.d(t,"b",(function(){return b})),r.d(t,"a",(function(){return y})),r.d(t,"d",(function(){return w}));var i=r(1);function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var c="undefined"!=typeof window?window:e,l=c.requestAnimationFrame||c.webkitRequestAnimationFrame||c.oRequestAnimationFrame||c.msRequestAnimationFrame||c.mozCancelRequestAnimationFrame&&c.mozRequestAnimationFrame||setTimeout,u=function(){},h=null,d=null,f=s({},i),p=function(e,t,r,i,n,o,s){var a=e<o?0:(e-o)/n;for(var c in t){var l=s[c],u=l.call?l:f[l],h=r[c];t[c]=h+(i[c]-h)*u(a)}return t},g=function(e,t){var r=e._attachment,i=e._currentState,n=e._delay,o=e._easing,s=e._originalState,a=e._duration,c=e._step,l=e._targetState,u=e._timestamp,h=u+n+a,d=t>h?h:t,f=a-(h-d);d>=h?(c(l,r,f),e.stop(!0)):(e._applyFilter("beforeTween"),d<u+n?(d=1,a=1,u=1):u+=n,p(d,i,s,l,a,u,o),e._applyFilter("afterTween"),c(i,r,f))},m=function(){for(var e=y.now(),t=h;t;){var r=t._next;g(t,e),t=r}},b=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"linear",r={},i=n(t);if("string"===i||"function"===i)for(var o in e)r[o]=t;else for(var s in e)r[s]=t[s]||"linear";return r},v=function(e){if(e===h)(h=e._next)?h._previous=null:d=null;else if(e===d)(d=e._previous)?d._next=null:h=null;else{var t=e._previous,r=e._next;t._next=r,r._previous=t}e._previous=e._next=null},y=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._currentState=t,this._configured=!1,this._filters=[],this._timestamp=null,this._next=null,this._previous=null,r&&this.setConfig(r)}var t;return(t=[{key:"_applyFilter",value:function(e){var t=!0,r=!1,i=void 0;try{for(var n,o=this._filters[Symbol.iterator]();!(t=(n=o.next()).done);t=!0){var s=n.value[e];s&&s(this)}}catch(e){r=!0,i=e}finally{try{t||null==o.return||o.return()}finally{if(r)throw i}}}},{key:"tween",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,r=this._attachment,i=this._configured;return!t&&i||this.setConfig(t),this._pausedAtTime=null,this._timestamp=e.now(),this._start(this.get(),r),this.resume()}},{key:"setConfig",value:function(){var t=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=r.attachment,n=r.delay,o=void 0===n?0:n,a=r.duration,c=void 0===a?500:a,l=r.easing,h=r.from,d=r.promise,f=void 0===d?Promise:d,p=r.start,g=void 0===p?u:p,m=r.step,v=void 0===m?u:m,y=r.to;this._configured=!0,this._attachment=i,this._isPlaying=!1,this._pausedAtTime=null,this._scheduleId=null,this._delay=o,this._start=g,this._step=v,this._duration=c,this._currentState=s({},h||this.get()),this._originalState=this.get(),this._targetState=s({},y||this.get());var w=this._currentState;this._targetState=s({},w,{},this._targetState),this._easing=b(w,l);var _=e.filters;for(var x in this._filters.length=0,_)_[x].doesApply(this)&&this._filters.push(_[x]);return this._applyFilter("tweenCreated"),this._promise=new f((function(e,r){t._resolve=e,t._reject=r})),this._promise.catch(u),this}},{key:"get",value:function(){return s({},this._currentState)}},{key:"set",value:function(e){this._currentState=e}},{key:"pause",value:function(){if(this._isPlaying)return this._pausedAtTime=e.now(),this._isPlaying=!1,v(this),this}},{key:"resume",value:function(){if(null===this._timestamp)return this.tween();if(this._isPlaying)return this._promise;var t=e.now();return this._pausedAtTime&&(this._timestamp+=t-this._pausedAtTime,this._pausedAtTime=null),this._isPlaying=!0,null===h?(h=this,d=this,function e(){h&&(l.call(c,e,1e3/60),m())}()):(this._previous=d,d._next=this,d=this),this._promise}},{key:"seek",value:function(t){t=Math.max(t,0);var r=e.now();return this._timestamp+t===0||(this._timestamp=r-t,this._isPlaying||g(this,r)),this}},{key:"stop",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=this._attachment,r=this._currentState,i=this._easing,n=this._originalState,o=this._targetState;if(this._isPlaying)return this._isPlaying=!1,v(this),e?(this._applyFilter("beforeTween"),p(1,r,n,o,1,0,i),this._applyFilter("afterTween"),this._applyFilter("afterTweenEnd"),this._resolve(r,t)):this._reject(r,t),this}},{key:"isPlaying",value:function(){return this._isPlaying}},{key:"setScheduleFunction",value:function(t){e.setScheduleFunction(t)}},{key:"dispose",value:function(){for(var e in this)delete this[e]}}])&&function(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}(e.prototype,t),e}();function w(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=new y,r=t.tween(e);return r.tweenable=t,r}y.setScheduleFunction=function(e){return l=e},y.formulas=f,y.filters={},y.now=Date.now||function(){return+new Date}}).call(this,r(2))},function(e,t,r){r.r(t),r.d(t,"linear",(function(){return i})),r.d(t,"easeInQuad",(function(){return n})),r.d(t,"easeOutQuad",(function(){return o})),r.d(t,"easeInOutQuad",(function(){return s})),r.d(t,"easeInCubic",(function(){return a})),r.d(t,"easeOutCubic",(function(){return c})),r.d(t,"easeInOutCubic",(function(){return l})),r.d(t,"easeInQuart",(function(){return u})),r.d(t,"easeOutQuart",(function(){return h})),r.d(t,"easeInOutQuart",(function(){return d})),r.d(t,"easeInQuint",(function(){return f})),r.d(t,"easeOutQuint",(function(){return p})),r.d(t,"easeInOutQuint",(function(){return g})),r.d(t,"easeInSine",(function(){return m})),r.d(t,"easeOutSine",(function(){return b})),r.d(t,"easeInOutSine",(function(){return v})),r.d(t,"easeInExpo",(function(){return y})),r.d(t,"easeOutExpo",(function(){return w})),r.d(t,"easeInOutExpo",(function(){return _})),r.d(t,"easeInCirc",(function(){return x})),r.d(t,"easeOutCirc",(function(){return k})),r.d(t,"easeInOutCirc",(function(){return S})),r.d(t,"easeOutBounce",(function(){return E})),r.d(t,"easeInBack",(function(){return A})),r.d(t,"easeOutBack",(function(){return I})),r.d(t,"easeInOutBack",(function(){return C})),r.d(t,"elastic",(function(){return T})),r.d(t,"swingFromTo",(function(){return O})),r.d(t,"swingFrom",(function(){return M})),r.d(t,"swingTo",(function(){return P})),r.d(t,"bounce",(function(){return B})),r.d(t,"bouncePast",(function(){return R})),r.d(t,"easeFromTo",(function(){return D})),r.d(t,"easeFrom",(function(){return N})),r.d(t,"easeTo",(function(){return F}));var i=function(e){return e},n=function(e){return Math.pow(e,2)},o=function(e){return-(Math.pow(e-1,2)-1)},s=function(e){return(e/=.5)<1?.5*Math.pow(e,2):-.5*((e-=2)*e-2)},a=function(e){return Math.pow(e,3)},c=function(e){return Math.pow(e-1,3)+1},l=function(e){return(e/=.5)<1?.5*Math.pow(e,3):.5*(Math.pow(e-2,3)+2)},u=function(e){return Math.pow(e,4)},h=function(e){return-(Math.pow(e-1,4)-1)},d=function(e){return(e/=.5)<1?.5*Math.pow(e,4):-.5*((e-=2)*Math.pow(e,3)-2)},f=function(e){return Math.pow(e,5)},p=function(e){return Math.pow(e-1,5)+1},g=function(e){return(e/=.5)<1?.5*Math.pow(e,5):.5*(Math.pow(e-2,5)+2)},m=function(e){return 1-Math.cos(e*(Math.PI/2))},b=function(e){return Math.sin(e*(Math.PI/2))},v=function(e){return-.5*(Math.cos(Math.PI*e)-1)},y=function(e){return 0===e?0:Math.pow(2,10*(e-1))},w=function(e){return 1===e?1:1-Math.pow(2,-10*e)},_=function(e){return 0===e?0:1===e?1:(e/=.5)<1?.5*Math.pow(2,10*(e-1)):.5*(2-Math.pow(2,-10*--e))},x=function(e){return-(Math.sqrt(1-e*e)-1)},k=function(e){return Math.sqrt(1-Math.pow(e-1,2))},S=function(e){return(e/=.5)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1)},E=function(e){return e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375},A=function(e){var t=1.70158;return e*e*((t+1)*e-t)},I=function(e){var t=1.70158;return(e-=1)*e*((t+1)*e+t)+1},C=function(e){var t=1.70158;return(e/=.5)<1?e*e*((1+(t*=1.525))*e-t)*.5:.5*((e-=2)*e*((1+(t*=1.525))*e+t)+2)},T=function(e){return-1*Math.pow(4,-8*e)*Math.sin((6*e-1)*(2*Math.PI)/2)+1},O=function(e){var t=1.70158;return(e/=.5)<1?e*e*((1+(t*=1.525))*e-t)*.5:.5*((e-=2)*e*((1+(t*=1.525))*e+t)+2)},M=function(e){var t=1.70158;return e*e*((t+1)*e-t)},P=function(e){var t=1.70158;return(e-=1)*e*((t+1)*e+t)+1},B=function(e){return e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375},R=function(e){return e<1/2.75?7.5625*e*e:e<2/2.75?2-(7.5625*(e-=1.5/2.75)*e+.75):e<2.5/2.75?2-(7.5625*(e-=2.25/2.75)*e+.9375):2-(7.5625*(e-=2.625/2.75)*e+.984375)},D=function(e){return(e/=.5)<1?.5*Math.pow(e,4):-.5*((e-=2)*Math.pow(e,3)-2)},N=function(e){return Math.pow(e,4)},F=function(e){return Math.pow(e,.25)}},function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t,r){r.r(t);var i={};r.r(i),r.d(i,"doesApply",(function(){return C})),r.d(i,"tweenCreated",(function(){return T})),r.d(i,"beforeTween",(function(){return O})),r.d(i,"afterTween",(function(){return M}));var n,o,s=r(0),a=/(\d|-|\.)/,c=/([^\-0-9.]+)/g,l=/[0-9.-]+/g,u=(n=l.source,o=/,\s*/.source,new RegExp("rgb\\(".concat(n).concat(o).concat(n).concat(o).concat(n,"\\)"),"g")),h=/^.*\(/,d=/#([0-9]|[a-f]){3,6}/gi,f=function(e,t){return e.map((function(e,r){return"_".concat(t,"_").concat(r)}))};function p(e){return parseInt(e,16)}var g=function(e){return"rgb(".concat((t=e,3===(t=t.replace(/#/,"")).length&&(t=(t=t.split(""))[0]+t[0]+t[1]+t[1]+t[2]+t[2]),[p(t.substr(0,2)),p(t.substr(2,2)),p(t.substr(4,2))]).join(","),")");var t},m=function(e,t,r){var i=t.match(e),n=t.replace(e,"VAL");return i&&i.forEach((function(e){return n=n.replace("VAL",r(e))})),n},b=function(e){for(var t in e){var r=e[t];"string"==typeof r&&r.match(d)&&(e[t]=m(d,r,g))}},v=function(e){var t=e.match(l).map(Math.floor),r=e.match(h)[0];return"".concat(r).concat(t.join(","),")")},y=function(e){return e.match(l)},w=function(e){var t,r,i={};for(var n in e){var o=e[n];"string"==typeof o&&(i[n]={formatString:(t=o,r=void 0,r=t.match(c),r?(1===r.length||t.charAt(0).match(a))&&r.unshift(""):r=["",""],r.join("VAL")),chunkNames:f(y(o),n)})}return i},_=function(e,t){var r=function(r){y(e[r]).forEach((function(i,n){return e[t[r].chunkNames[n]]=+i})),delete e[r]};for(var i in t)r(i)},x=function(e,t){var r={};return t.forEach((function(t){r[t]=e[t],delete e[t]})),r},k=function(e,t){return t.map((function(t){return e[t]}))},S=function(e,t){return t.forEach((function(t){return e=e.replace("VAL",+t.toFixed(4))})),e},E=function(e,t){for(var r in t){var i=t[r],n=i.chunkNames,o=i.formatString,s=S(o,k(x(e,n),n));e[r]=m(u,s,v)}},A=function(e,t){var r=function(r){var i=t[r].chunkNames,n=e[r];if("string"==typeof n){var o=n.split(" "),s=o[o.length-1];i.forEach((function(t,r){return e[t]=o[r]||s}))}else i.forEach((function(t){return e[t]=n}));delete e[r]};for(var i in t)r(i)},I=function(e,t){for(var r in t){var i=t[r].chunkNames,n=e[i[0]];e[r]="string"==typeof n?i.map((function(t){var r=e[t];return delete e[t],r})).join(" "):n}},C=function(e){var t=e._currentState;return Object.keys(t).some((function(e){return"string"==typeof t[e]}))};function T(e){var t=e._currentState;[t,e._originalState,e._targetState].forEach(b),e._tokenData=w(t)}function O(e){var t=e._currentState,r=e._originalState,i=e._targetState,n=e._easing,o=e._tokenData;A(n,o),[t,r,i].forEach((function(e){return _(e,o)}))}function M(e){var t=e._currentState,r=e._originalState,i=e._targetState,n=e._easing,o=e._tokenData;[t,r,i].forEach((function(e){return E(e,o)})),I(n,o)}function P(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function B(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var R=new s.a,D=s.a.filters,N=function(e,t,r,i){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?P(Object(r),!0).forEach((function(t){B(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):P(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e),a=Object(s.b)(e,i);for(var c in R._filters.length=0,R.set({}),R._currentState=o,R._originalState=e,R._targetState=t,R._easing=a,D)D[c].doesApply(R)&&R._filters.push(D[c]);R._applyFilter("tweenCreated"),R._applyFilter("beforeTween");var l=Object(s.e)(r,o,e,t,1,n,a);return R._applyFilter("afterTween"),l};function F(e,t){var r=t.get(e);if(!r)throw new TypeError("attempted to get private field on non-instance");return r.get?r.get.call(e):r.value}var U=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),L.set(this,{writable:!0,value:[]});for(var t=arguments.length,r=new Array(t),i=0;i<t;i++)r[i]=arguments[i];r.forEach(this.add.bind(this))}var t;return(t=[{key:"add",value:function(e){return F(this,L).push(e),e}},{key:"remove",value:function(e){var t=F(this,L).indexOf(e);return~t&&F(this,L).splice(t,1),e}},{key:"empty",value:function(){return this.tweenables.map(this.remove.bind(this))}},{key:"isPlaying",value:function(){return F(this,L).some((function(e){return e.isPlaying()}))}},{key:"play",value:function(){return F(this,L).forEach((function(e){return e.tween()})),this}},{key:"pause",value:function(){return F(this,L).forEach((function(e){return e.pause()})),this}},{key:"resume",value:function(){return F(this,L).forEach((function(e){return e.resume()})),this}},{key:"stop",value:function(e){return F(this,L).forEach((function(t){return t.stop(e)})),this}},{key:"tweenables",get:function(){return function(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}(F(this,L))}},{key:"promises",get:function(){return F(this,L).map((function(e){return e._promise}))}}])&&function(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}(e.prototype,t),e}(),L=new WeakMap,H=function(e,t,r,i,n){var o=function(e,t,r,i){return function(n){return function(e,t,r,i,n){var o,s,a,c=0,l=0,u=0,h=function(e){return((c*e+l)*e+u)*e},d=function(e){return(3*c*e+2*l)*e+u},f=function(e){return e>=0?e:0-e};return c=1-(u=3*t)-(l=3*(i-t)-u),o=1-(a=3*r)-(s=3*(n-r)-a),function(e){return((o*e+s)*e+a)*e}(function(e){var t,r,i,n,o,s;for(i=e,s=0;s<8;s++){if(n=h(i)-e,f(n)<.005)return i;if(o=d(i),f(o)<1e-6)break;i-=n/o}if((i=e)<(t=0))return t;if(i>(r=1))return r;for(;t<r;){if(n=h(i),f(n-e)<.005)return i;e>n?t=i:r=i,i=.5*(r-t)+t}return i}(e))}(n,e,t,r,i)}}(t,r,i,n);return o.displayName=e,o.x1=t,o.y1=r,o.x2=i,o.y2=n,s.a.formulas[e]=o},j=function(e){return delete s.a.formulas[e]};r.d(t,"processTweens",(function(){return s.c})),r.d(t,"Tweenable",(function(){return s.a})),r.d(t,"tween",(function(){return s.d})),r.d(t,"interpolate",(function(){return N})),r.d(t,"Scene",(function(){return U})),r.d(t,"setBezierFunction",(function(){return H})),r.d(t,"unsetBezierFunction",(function(){return j})),s.a.filters.token=i}])},"object"==typeof r&&"object"==typeof t?t.exports=n():"object"==typeof r?r.shifty=n():i.shifty=n()},{}],2:[function(e,t,r){var i=e("./shape"),n=e("./utils"),o=function(e,t){this._pathTemplate="M 50,50 m 0,-{radius} a {radius},{radius} 0 1 1 0,{2radius} a {radius},{radius} 0 1 1 0,-{2radius}",this.containerAspectRatio=1,i.apply(this,arguments)};(o.prototype=new i).constructor=o,o.prototype._pathString=function(e){var t=e.strokeWidth;e.trailWidth&&e.trailWidth>e.strokeWidth&&(t=e.trailWidth);var r=50-t/2;return n.render(this._pathTemplate,{radius:r,"2radius":2*r})},o.prototype._trailString=function(e){return this._pathString(e)},t.exports=o},{"./shape":7,"./utils":9}],3:[function(e,t,r){var i=e("./shape"),n=e("./utils"),o=function(e,t){this._pathTemplate=t.vertical?"M {center},100 L {center},0":"M 0,{center} L 100,{center}",i.apply(this,arguments)};(o.prototype=new i).constructor=o,o.prototype._initializeSvg=function(e,t){var r=t.vertical?"0 0 "+t.strokeWidth+" 100":"0 0 100 "+t.strokeWidth;e.setAttribute("viewBox",r),e.setAttribute("preserveAspectRatio","none")},o.prototype._pathString=function(e){return n.render(this._pathTemplate,{center:e.strokeWidth/2})},o.prototype._trailString=function(e){return this._pathString(e)},t.exports=o},{"./shape":7,"./utils":9}],4:[function(e,t,r){t.exports={Line:e("./line"),Circle:e("./circle"),SemiCircle:e("./semicircle"),Square:e("./square"),Path:e("./path"),Shape:e("./shape"),utils:e("./utils")}},{"./circle":2,"./line":3,"./path":5,"./semicircle":6,"./shape":7,"./square":8,"./utils":9}],5:[function(e,t,r){var i=e("shifty"),n=e("./utils"),o=i.Tweenable,s={easeIn:"easeInCubic",easeOut:"easeOutCubic",easeInOut:"easeInOutCubic"},a=function e(t,r){if(!(this instanceof e))throw new Error("Constructor was called without new keyword");var i;r=n.extend({delay:0,duration:800,easing:"linear",from:{},to:{},step:function(){}},r),i=n.isString(t)?document.querySelector(t):t,this.path=i,this._opts=r,this._tweenable=null;var o=this.path.getTotalLength();this.path.style.strokeDasharray=o+" "+o,this.set(0)};a.prototype.value=function(){var e=this._getComputedDashOffset(),t=this.path.getTotalLength();return parseFloat((1-e/t).toFixed(6),10)},a.prototype.set=function(e){this.stop(),this.path.style.strokeDashoffset=this._progressToOffset(e);var t=this._opts.step;if(n.isFunction(t)){var r=this._easing(this._opts.easing);t(this._calculateTo(e,r),this._opts.shape||this,this._opts.attachment)}},a.prototype.stop=function(){this._stopTween(),this.path.style.strokeDashoffset=this._getComputedDashOffset()},a.prototype.animate=function(e,t,r){t=t||{},n.isFunction(t)&&(r=t,t={});var i=n.extend({},t),s=n.extend({},this._opts);t=n.extend(s,t);var a=this._easing(t.easing),c=this._resolveFromAndTo(e,a,i);this.stop(),this.path.getBoundingClientRect();var l=this._getComputedDashOffset(),u=this._progressToOffset(e),h=this;this._tweenable=new o,this._tweenable.tween({from:n.extend({offset:l},c.from),to:n.extend({offset:u},c.to),duration:t.duration,delay:t.delay,easing:a,step:function(e){h.path.style.strokeDashoffset=e.offset;var r=t.shape||h;t.step(e,r,t.attachment)}}).then((function(e){n.isFunction(r)&&r()})).catch((function(e){throw console.error("Error in tweening:",e),e}))},a.prototype._getComputedDashOffset=function(){var e=window.getComputedStyle(this.path,null);return parseFloat(e.getPropertyValue("stroke-dashoffset"),10)},a.prototype._progressToOffset=function(e){var t=this.path.getTotalLength();return t-e*t},a.prototype._resolveFromAndTo=function(e,t,r){return r.from&&r.to?{from:r.from,to:r.to}:{from:this._calculateFrom(t),to:this._calculateTo(e,t)}},a.prototype._calculateFrom=function(e){return i.interpolate(this._opts.from,this._opts.to,this.value(),e)},a.prototype._calculateTo=function(e,t){return i.interpolate(this._opts.from,this._opts.to,e,t)},a.prototype._stopTween=function(){null!==this._tweenable&&(this._tweenable.stop(!0),this._tweenable=null)},a.prototype._easing=function(e){return s.hasOwnProperty(e)?s[e]:e},t.exports=a},{"./utils":9,shifty:1}],6:[function(e,t,r){var i=e("./shape"),n=e("./circle"),o=e("./utils"),s=function(e,t){this._pathTemplate="M 50,50 m -{radius},0 a {radius},{radius} 0 1 1 {2radius},0",this.containerAspectRatio=2,i.apply(this,arguments)};(s.prototype=new i).constructor=s,s.prototype._initializeSvg=function(e,t){e.setAttribute("viewBox","0 0 100 50")},s.prototype._initializeTextContainer=function(e,t,r){e.text.style&&(r.style.top="auto",r.style.bottom="0",e.text.alignToBottom?o.setStyle(r,"transform","translate(-50%, 0)"):o.setStyle(r,"transform","translate(-50%, 50%)"))},s.prototype._pathString=n.prototype._pathString,s.prototype._trailString=n.prototype._trailString,t.exports=s},{"./circle":2,"./shape":7,"./utils":9}],7:[function(e,t,r){var i=e("./path"),n=e("./utils"),o="Object is destroyed",s=function e(t,r){if(!(this instanceof e))throw new Error("Constructor was called without new keyword");if(0!==arguments.length){this._opts=n.extend({color:"#555",strokeWidth:1,trailColor:null,trailWidth:null,fill:null,text:{style:{color:null,position:"absolute",left:"50%",top:"50%",padding:0,margin:0,transform:{prefix:!0,value:"translate(-50%, -50%)"}},autoStyleContainer:!0,alignToBottom:!0,value:null,className:"progressbar-text"},svgStyle:{display:"block",width:"100%"},warnings:!1},r,!0),n.isObject(r)&&void 0!==r.svgStyle&&(this._opts.svgStyle=r.svgStyle),n.isObject(r)&&n.isObject(r.text)&&void 0!==r.text.style&&(this._opts.text.style=r.text.style);var o,s=this._createSvgView(this._opts);if(!(o=n.isString(t)?document.querySelector(t):t))throw new Error("Container does not exist: "+t);this._container=o,this._container.appendChild(s.svg),this._opts.warnings&&this._warnContainerAspectRatio(this._container),this._opts.svgStyle&&n.setStyles(s.svg,this._opts.svgStyle),this.svg=s.svg,this.path=s.path,this.trail=s.trail,this.text=null;var a=n.extend({attachment:void 0,shape:this},this._opts);this._progressPath=new i(s.path,a),n.isObject(this._opts.text)&&null!==this._opts.text.value&&this.setText(this._opts.text.value)}};s.prototype.animate=function(e,t,r){if(null===this._progressPath)throw new Error(o);this._progressPath.animate(e,t,r)},s.prototype.stop=function(){if(null===this._progressPath)throw new Error(o);void 0!==this._progressPath&&this._progressPath.stop()},s.prototype.pause=function(){if(null===this._progressPath)throw new Error(o);void 0!==this._progressPath&&this._progressPath._tweenable&&this._progressPath._tweenable.pause()},s.prototype.resume=function(){if(null===this._progressPath)throw new Error(o);void 0!==this._progressPath&&this._progressPath._tweenable&&this._progressPath._tweenable.resume()},s.prototype.destroy=function(){if(null===this._progressPath)throw new Error(o);this.stop(),this.svg.parentNode.removeChild(this.svg),this.svg=null,this.path=null,this.trail=null,this._progressPath=null,null!==this.text&&(this.text.parentNode.removeChild(this.text),this.text=null)},s.prototype.set=function(e){if(null===this._progressPath)throw new Error(o);this._progressPath.set(e)},s.prototype.value=function(){if(null===this._progressPath)throw new Error(o);return void 0===this._progressPath?0:this._progressPath.value()},s.prototype.setText=function(e){if(null===this._progressPath)throw new Error(o);null===this.text&&(this.text=this._createTextContainer(this._opts,this._container),this._container.appendChild(this.text)),n.isObject(e)?(n.removeChildren(this.text),this.text.appendChild(e)):this.text.innerHTML=e},s.prototype._createSvgView=function(e){var t=document.createElementNS("http://www.w3.org/2000/svg","svg");this._initializeSvg(t,e);var r=null;(e.trailColor||e.trailWidth)&&(r=this._createTrail(e),t.appendChild(r));var i=this._createPath(e);return t.appendChild(i),{svg:t,path:i,trail:r}},s.prototype._initializeSvg=function(e,t){e.setAttribute("viewBox","0 0 100 100")},s.prototype._createPath=function(e){var t=this._pathString(e);return this._createPathElement(t,e)},s.prototype._createTrail=function(e){var t=this._trailString(e),r=n.extend({},e);return r.trailColor||(r.trailColor="#eee"),r.trailWidth||(r.trailWidth=r.strokeWidth),r.color=r.trailColor,r.strokeWidth=r.trailWidth,r.fill=null,this._createPathElement(t,r)},s.prototype._createPathElement=function(e,t){var r=document.createElementNS("http://www.w3.org/2000/svg","path");return r.setAttribute("d",e),r.setAttribute("stroke",t.color),r.setAttribute("stroke-width",t.strokeWidth),t.fill?r.setAttribute("fill",t.fill):r.setAttribute("fill-opacity","0"),r},s.prototype._createTextContainer=function(e,t){var r=document.createElement("div");r.className=e.text.className;var i=e.text.style;return i&&(e.text.autoStyleContainer&&(t.style.position="relative"),n.setStyles(r,i),i.color||(r.style.color=e.color)),this._initializeTextContainer(e,t,r),r},s.prototype._initializeTextContainer=function(e,t,r){},s.prototype._pathString=function(e){throw new Error("Override this function for each progress bar")},s.prototype._trailString=function(e){throw new Error("Override this function for each progress bar")},s.prototype._warnContainerAspectRatio=function(e){if(this.containerAspectRatio){var t=window.getComputedStyle(e,null),r=parseFloat(t.getPropertyValue("width"),10),i=parseFloat(t.getPropertyValue("height"),10);n.floatEquals(this.containerAspectRatio,r/i)||(console.warn("Incorrect aspect ratio of container","#"+e.id,"detected:",t.getPropertyValue("width")+"(width)","/",t.getPropertyValue("height")+"(height)","=",r/i),console.warn("Aspect ratio of should be",this.containerAspectRatio))}},t.exports=s},{"./path":5,"./utils":9}],8:[function(e,t,r){var i=e("./shape"),n=e("./utils"),o=function(e,t){this._pathTemplate="M 0,{halfOfStrokeWidth} L {width},{halfOfStrokeWidth} L {width},{width} L {halfOfStrokeWidth},{width} L {halfOfStrokeWidth},{strokeWidth}",this._trailTemplate="M {startMargin},{halfOfStrokeWidth} L {width},{halfOfStrokeWidth} L {width},{width} L {halfOfStrokeWidth},{width} L {halfOfStrokeWidth},{halfOfStrokeWidth}",i.apply(this,arguments)};(o.prototype=new i).constructor=o,o.prototype._pathString=function(e){var t=100-e.strokeWidth/2;return n.render(this._pathTemplate,{width:t,strokeWidth:e.strokeWidth,halfOfStrokeWidth:e.strokeWidth/2})},o.prototype._trailString=function(e){var t=100-e.strokeWidth/2;return n.render(this._trailTemplate,{width:t,strokeWidth:e.strokeWidth,halfOfStrokeWidth:e.strokeWidth/2,startMargin:e.strokeWidth/2-e.trailWidth/2})},t.exports=o},{"./shape":7,"./utils":9}],9:[function(e,t,r){var i="Webkit Moz O ms".split(" ");function n(e,t,r){for(var n=e.style,s=0;s<i.length;++s)n[i[s]+o(t)]=r;n[t]=r}function o(e){return e.charAt(0).toUpperCase()+e.slice(1)}function s(e){return!function(e){return"[object Array]"===Object.prototype.toString.call(e)}(e)&&"object"==typeof e&&!!e}function a(e,t){for(var r in e)e.hasOwnProperty(r)&&t(e[r],r)}t.exports={extend:function e(t,r,i){for(var n in t=t||{},i=i||!1,r=r||{})if(r.hasOwnProperty(n)){var o=t[n],a=r[n];i&&s(o)&&s(a)?t[n]=e(o,a,i):t[n]=a}return t},render:function(e,t){var r=e;for(var i in t)if(t.hasOwnProperty(i)){var n=t[i],o=new RegExp("\\{"+i+"\\}","g");r=r.replace(o,n)}return r},setStyle:n,setStyles:function(e,t){a(t,(function(t,r){null!=t&&(s(t)&&!0===t.prefix?n(e,r,t.value):e.style[r]=t)}))},capitalize:o,isString:function(e){return"string"==typeof e||e instanceof String},isFunction:function(e){return"function"==typeof e},isObject:s,forEachObject:a,floatEquals:function(e,t){return Math.abs(e-t)<.001},removeChildren:function(e){for(;e.firstChild;)e.removeChild(e.firstChild)}}},{}]},{},[4])(4)}));const{ProgressBar:ft}=dt;class pt extends p.Hc{static get properties(){return{value:{type:Number},strokeWidth:{type:Number},trailWidth:{type:Number},trailColor:{type:String},color:{type:String},easing:{type:String},svgStyle:{type:String},shape:{type:String},opt:{type:Object},text:{type:String}}}static get styles(){return p.iv`
			:host {
				display:inline-block;
				width:var(--flow-progressbar-width, 30px);
				height:var(--flow-progressbar-height, 30px);
				/*
				--flow-progressbar-color:red;
				--flow-progressbar-trail-color:green;
				*/
			}
			.container{width:100%;height:100%;}
			.progressbar-text{
				font-size:var(--flow-progressbar-font-size, 0.9rem);
				font-weight:var(--flow-progressbar-font-weight, normal);
				font-family:var(--flow-progressbar-font-family, inhert);
			}
		`}render(){return p.dy`<div class="container"></div>`}updated(){super.updated();let{value:e=0,opt:t={},text:r="",strokeWidth:i,color:n,easing:o,duration:s,trailColor:a,trailWidth:c,svgStyle:l,shape:u="Circle"}=this,h={color:n,easing:o,duration:s},d=Object.entries(h).filter((([e,t])=>void 0!==t));h=Object.fromEntries(d);let f={strokeWidth:6,easing:"easeInOut",duration:1400,color:"var(--flow-progressbar-color, #FF0000)",trailColor:"var(--flow-progressbar-trail-color, #efefef)",trailWidth:6,svgStyle:null,...t,definedOpts:h};this.el=this.el||this.renderRoot.querySelector(".container"),this.progress=this.progress||new ft[u](this.el,f),this.progress.stop(),this.progress.animate(e,{},(()=>{})),this.progress.setText(r)}}pt.define("flow-progressbar");class gt extends p.Hc{static get properties(){return{disabled:{type:Boolean,reflect:!0},icon:{type:String},closeIcon:{type:String},message:{type:String},once:{type:Boolean}}}static get styles(){return p.iv`
			:host{
				display:var(--flow-add2home-display, block);
				margin: var(--flow-add2home-margin);
				padding:var(--flow-add2home-padding, 10px);
				border: var(--flow-add2home-border, 2px solid var(--flow-border-color, var(--flow-primary-color, rgba(0,151,115,1))));
				border-radius:var(--flow-add2home-radius, 2px);
				border-width:var(--flow-add2home-border-width, 2px);
				font-family:var(--flow-add2home-font-family, var(--flow-font-family, initial));
				font-weight:var(--flow-add2home-font-weight, var(--flow-font-weight, bold));
				font-size:var(--flow-add2home-font-size, initial);
				line-height:var(--flow-add2home-line-height, inherit);
				text-transform:var(--flow-add2home-text-transform, inherit);
				user-select: none;
				background-color:var(--flow-add2home-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				border-color:var(--flow-add2home-border-color, var(--flow-primary-color, rgba(0,151,115,1)));
				color:var(--flow-add2home-invert-color, var(--flow-primary-invert-color, #FFF));
				--fa-icon-color:var(--flow-add2home-invert-color, var(--flow-primary-invert-color, #FFF));
				--fa-icon-size-temp:var(--fa-icon-size);
				cursor:pointer;
			}
			.icon{
				--fa-icon-size:var(--flow-add2home-icon-size, var(--fa-icon-size-temp, 20px));
				--fa-icon-padding:var(--flow-add2home-icon-padding, var(--fa-icon-padding));
				background-color:var(--flow-add2home-icon-bg);
				margin:0px 10px;
			}
			:host(:hover){
				background-color:var(--flow-add2home-hover-bg-color, var(--flow-primary-color, rgba(0,151,115,1)));
				color: var(--flow-add2home-hover-color);
			}
			.message{flex:1;word-wrap:break-word;}
			.close-icon{background-color:none}
			.wrapper{
				display:flex;
				align-items:center;
				margin:var(--flow-add2home-wrapper-margin, 0px);
				min-width:var(--flow-add2home-wrapper-min-width, 50px);
				text-align:center;
				justify-content:center;
				height:100%;
				box-sizing:border-box;
			}
			:host(:not(.active)){
				display:none;
			}
		`}constructor(){super(),1==(0,p.CZ)("add-to-home-disabled")&&(this.disabled=!0),this.setAttribute("role","button")}render(){let{icon:e="",closeIcon:t="times"}=this;return p.dy`
		<div class="wrapper">
			${e?p.dy`<fa-icon class="icon"
				icon=${e} @click="${this.onAddClick}"></fa-icon>`:""}
			<div class="message" @click="${this.onAddClick}">
				${this.message||""}
				<slot></slot>
			</div>
			<fa-icon class="close-icon" icon=${t}
				@click="${this.onCloseClick}"></fa-icon>
		</div>`}connectedCallback(){super.connectedCallback(),this.disabled||this.init()}init(){window.addEventListener("beforeinstallprompt",(e=>{e.preventDefault(),this.deferredPrompt=e,this.classList.add("active")}))}onAddClick(){!this.disabled&&this.deferredPrompt&&(this.fire("add",{el:this}),this.deferredPrompt.prompt(),this.deferredPrompt.userChoice.then((e=>{"accepted"===e.outcome?console.log("User accepted the A2HS prompt"):console.log("User dismissed the A2HS prompt"),this.deferredPrompt=null,this.close(e.outcome)})))}onCloseClick(){this.close("closed")}close(e="closed"){this.once&&(0,p.fd)("add-to-home-disabled",1),this.classList.remove("active"),this.fire("closed",{el:this,reason:e})}}gt.define("flow-add-to-home");class mt extends p.Hc{static get properties(){return{url:{type:String},target:{type:String},from:{type:String},prefix:{type:String}}}static get styles(){return p.iv`
			:host {
				display : block;
                width:100%;
                height:100%;

			}
			
			:host(.left-img) img{
				object-position:left;
			}
            img {
                width:100%;
                height: 100%
            }
		`}constructor(){super(),this.url="https://metrics.aspectron.com"}onElementResize(){this.rect=this.getBoundingClientRect(),this.requestUpdate()}connectedCallback(){super.connectedCallback(),this.__resizeObserver||(this.__resizeObserver=new ResizeObserver((()=>{this.onElementResize()})),this.__resizeObserver.observe(this)),this.interval=setInterval(this.requestUpdate.bind(this),1e3)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.interval)}render(){const e=Date.now();this.prefix="stats.gauges.";const t=this.rect||{width:64,height:64},{width:r,height:i}=t,n=new URLSearchParams;n.set("width",r||64),n.set("height",i||64),n.set("areaMode","all"),n.set("from","-30minutes"),n.set("areaAlpha","0.5"),this.target.split("|").forEach((e=>{e=this.prefix+e,n.append("target",e)})),n.set("hideLegend",!1),n.set("salt",e);const o=`${this.url}/render/?`+n.toString();return p.dy`<img style="width:${r}px;height:${i}px" src="${o}">`}}mt.define("flow-statsd");let bt=document.createElement("style");bt.innerHTML=p.pg.cssText,document.head.appendChild(bt);const vt=[p.vp,p.iv`
	.pagination a{
		padding:var(--flow-btn-padding);
	}
`],yt=p.iv`
	.tx-list .tx-row{
		margin:0px 5px;
		display:flex;background-color:var(--tx-bg-color-1);
		border-bottom:1px solid var(--tx-border-color);
		flex-wrap:wrap;padding:2px;
		position:relative;
	}
	.tx-list .tx-icon{--fa-icon-color:var(--flow-primary-color)}
	.tx-list .tx-row .tx-progressbar{position:absolute;left:5px; top:30px;}
	.tx-list .tx-row:nth-child(2n){background-color:var(--tx-bg-color-2)}
	.tx-list .tx-date{white-space:nowrap;margin-left:16px;}
	.tx-list .tx-id,
	.tx-list .tx-address{
		flex:1;overflow:hidden;text-overflow:ellipsis;box-sizing:border-box;
	}
	.tx-list .tx-note{box-sizing:border-box;}
	.tx-list .tx-row>div{padding:2px;}
	.tx-list .tx-row>.tx-id,
	.tx-list .tx-row>.tx-address,
	.tx-list .tx-row>.tx-note{padding-left:37px;}
	
	.tx-list .tx-amount{
		white-space:nowrap;margin:0px 20px;
		flex:1;text-align:right;color:#029a45;
	}
	.tx-list .tx-num{min-width:60px}
	.tx-list .br{min-width:100%;}
	.tx-list [txout] .tx-amount{color:#a00}
	[txmoved], .tx-list [txmoved].tx-row{
		display:none;
		text-decoration:line-through;background-color:rgba(255, 0, 0, 0.16);
	}
`;var wt=__webpack_require__(9276);window.mobileMode=1==window.localStorage?.getItem("mobileMode")||!1;let _t=!!window.mobileMode||p.rA;window.isMobile=_t;const{Deferred:xt,CYTX:kt,Decimal:St}=wt._y,Et=new wt.Ke({logLevel:"debug"});let{baseUrl:At,debug:It,MAX_UTXOS_THRESHOLD:Ct=80,dontInitiatedComponent:Tt=!1}=window.CryptixConfig||{};At||(At=new URL(__webpack_require__(6255),__webpack_require__.b).href,It&&console.log("CryptixUX: baseUrl",At));const Ot=Ct,Mt=(e=null)=>{let t=(e=e||new Date).getFullYear(),r=e.getMonth()+1;r=r<10?"0"+r:r;let i=e.getDate();i=i<10?"0"+i:i;let n=e.getHours();n=n<10?"0"+n:n;let o=e.getMinutes();o=o<10?"0"+o:o;let s=e.getSeconds();return s=s<10?"0"+s:s,`${t}-${r}-${i} ${n}:${o}:${s}`},Pt=e=>1e8*Number(e),Bt=()=>{let e=Et.getWallet();return!!e&&(e.wallet&&(e.mnemonic=e.wallet.mnemonic),e)},Rt=async(e,t={})=>await Bt()?Et.createWallet(e,t):Et.saveWallet(e,t),Dt=e=>/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(e),Nt=async(e,t)=>{"function"==typeof e&&(t=e,e={});const{confirmBtnText:r=v.ag.t("CONFIRM"),confirmBtnValue:i="confirm",pass:n="",msg:o="",title:s=v.ag.t("Enter a password")}=e||{};let a="password",c="eye",l="";const u=()=>{g.body=d()},h=()=>{a="password"==a?"text":"password",c="password"==a?"eye":"eye-slash",u()};let d=()=>p.dy`
			<div class="msg">${o}</div>
			<flow-input class="password full-width" outer-border
				name="password" type="${a}" placeholder="${(0,v.T)("Password")}"
				value="${n}">
				<fa-icon class="fa-btn"
					slot="sufix"
					@click="${h}"
					icon="${c}"></fa-icon>
			</flow-input>
			<div class="error-msg">${l}</div>
		`;const f=FlowDialog.show({title:s,body:d(),cls:"short-dialog",btns:[{text:v.ag.t("Cancel"),value:"cancel"},{text:r,cls:"primary",value:i,handler(e,t){let{values:r}=t,{password:i}=r;if(!Dt(i))return l=v.ag.t("At least 8 characters, one capital, one lower,\n    \t\t\t\tone number, and one symbol"),void u();e(t)}}]}),{dialog:g}=f,m=await f;m.password=m?.values?.password,t(m)};window.Decimal=St;const Ft=[];_t&&window.addEventListener("popstate",(e=>{let t=Ft.pop(),r=new CustomEvent("_popstate",{detail:{state:e.state,oldState:t}});window.dispatchEvent(r)}));class Ut extends p.Hc{static get properties(){return{errorMessage:{type:String},hideable:{type:Boolean,reflect:!0}}}static get styles(){return[p.pg,p.KD,p.iv`
			:host{
				z-index:-10;opacity:0;
				position:var(--cryptix-dialog-position, absolute);
				top:0px;
				left:0px;
				width:100%;
				height:100%;
				background-color:var(--cryptix-dialog-bg-color);
				box-sizing:border-box;
				font-family: "Open Sans", sans-serif;
				display:none;
				align-items:center;
				justify-content:center;
				--flow-menu-item-bg:#EFEFEF;
			}
			flow-btn{vertical-align:bottom;margin-bottom:5px;}
			flow-input flow-btn{margin-bottom:0px;}
			:host(.active){opacity:1;z-index:100000;display:flex;}
			.container{
				box-sizing:border-box;
				width:100%;
				height:var(--cryptix-dialog-container-height, calc(100% - 10px));
				background-color:var(--flow-background-color, #F00);
				z-index:1;
				border:var(--cryptix-dialog-container-border, 2px solid var(--flow-primary-color));
				border-radius:var(--cryptix-dialog-container-border-radius, 3px);
				max-width:var(--cryptix-dialog-container-max-width, 700px);
				max-height:var(--cryptix-dialog-container-max-height, 300px);
				margin:var(--cryptix-dialog-container-margin, 5px auto);
				padding:var(--cryptix-dialog-container-padding, 0px);
				position:relative;
				display:flex;flex-direction:column;
			}
			.close-btn{
			    color:var(--flow-dialog-close-btn-color, var(--flow-color));
			    position:absolute;
			    right:15px;
			    top:15px;
			    font-size:var(--flow-dialog-close-btn-font-size, 1.5rem);
			    cursor:pointer;z-index:2;
			    line-height:0px;display:none;
			}
			:host([hideable]) .close-btn{
				display:var(--cryptix-dialog-container-close-btn-display, inline-block)
			}
			.heading{
				margin:0px;padding:5px 10px;font-size:1rem;min-height:30px;
				display:flex;align-items:center;
				border-bottom:2px solid var(--flow-primary-color, #F00);
			}
			.heading-init{
				min-height:0px;
				border-bottom:none;
			}
			.flex{flex:1}
			.sub-heading{padding:5px;font-size:1.2rem;}
			.body{flex:1;display:flex;justify-content:center;overflow:hidden auto;}
			.inner-body{max-width:90%;width:700px;height:fit-content;padding:30px;}
			.full-width{width:100%;max-width:100%;}
			.error{
				min-height:30px;color:#F00;padding:5px;
				font-size:0.85rem;box-sizing:border-box;
			}
			.input-type-btn{
				align-self:center;margin:5px 10px;cursor:pointer;
			}
			
			[hidden]{display:none}
			.buttons{margin:var(--cryptix-dialog-buttons-margin, 10px auto);display:flex;width:var(--cryptix-dialog-buttons-width,90%);}
			.buttons flow-btn{margin:5px;}
			:host(.no-buttons) .body-inner>.buttons{display:none}
			.buttons flow-btn:first-child{margin-left:0px;}
			.buttons flow-btn:last-child{margin-right:0px;}
			.back-btn{--fa-icon-size:30px;margin:0px 20px 0px 10px;cursor:pointer}
			.body-box{
				display:flex;align-items:center;justify-content:center;overflow:hidden;
			}
			.body-inner{overflow:hidden;max-height:100%;display:flex;flex-direction:column;}
		`]}headingCls({modeName:e}){return"Init"==e?"heading-init":""}render(){const e=this.buildRenderArgs();let t=this.renderButtons(e),r=!!t;return p.dy`
			<div class="container">
				<h2 class="heading ${this.headingCls(e)}">${this.renderHeading(e)}</h2>
				<div class="flex body-box">
					<div class="body-inner">
						<div class="body">
							<div class="inner-body">
								${this.renderBody(e)}
							</div>
						</div>
						${r?p.dy`
						<div class="buttons">
							${t}
						</div>`:""}
						<span class="close-btn" title="Close" 
							@click="${this.onCloseClick}">&times;</span>
					</div>
				</div>
			</div>
		`}constructor(){super(),this._onUrlHistoryPop=e=>{this.onUrlHistoryPop(e.detail,e)},this.withHistory=window.isMobile}attachUrlHistoryPopEvent(){this.withHistory&&window.addEventListener("_popstate",this._onUrlHistoryPop)}removeUrlHistoryPopEvent(){window.removeEventListener("_popstate",this._onUrlHistoryPop)}connectedCallback(){super.connectedCallback(),this.attachUrlHistoryPopEvent()}disconnectedCallback(){super.disconnectedCallback(),this.removeUrlHistoryPopEvent()}onUrlHistoryPop({state:e,oldState:t},r){t?.uid==this.uid&&(console.log("onUrlHistoryPop:",t?.uid==this.uid,{state:e,oldState:t}),this._hide(!0))}pushHistory(e=""){if(!this.withHistory)return;let t=this.tagName||this.name||this.constructor.name;t=t.replace(/\-/g,"");let r=t.toLowerCase().replace(/(cryptix|dialog|mobile)/g,""),i={type:t,uid:e,key:r};history.pushState(i,t,"/"+r+"/"+e),Ft.push(i)}historyGoBack(){history.back()}buildRenderArgs(){return{}}renderHeading(e){return""}renderHeading(e){return""}renderButtons(e){return this.classList.add("no-buttons"),""}renderBackBtn(){return p.dy`<fa-icon class="back-btn" icon="arrow-alt-left"
			@click=${this.onBackClick}></fa-icon>`}onBackClick(){this.hide()}firstUpdated(...e){super.firstUpdated(...e),this.qS=this.renderRoot.querySelector.bind(this.renderRoot),this.qSAll=this.renderRoot.querySelectorAll.bind(this.renderRoot)}setError(e){this.errorMessage=e}show(){this.classList.add("active"),this.uid=this.uid||(0,p.FG)(),this.pushHistory(this.uid)}_hide(e=!1){this.classList.remove("active"),!e&&this.withHistory&&this.historyGoBack()}hide(e=!1){this._hide(e)}onCloseClick(){this.hide()}checkPassword(e){return Dt(e)}}(class extends Ut{static get properties(){return{mode:{type:String,reflect:!0},inputType:{type:String},isFresh:{type:Boolean,reflect:!0},hideLogo:{type:Boolean,reflect:!0}}}static get styles(){return[Ut.styles,p.iv`
			.container{max-height:var(--cryptix-dialog-container-max-height, 600px)}
			:host([mode="create"]) .container{max-height:var(--cryptix-dialog-container-max-height, 500px)}
			:host([mode="init"]) .container{max-height:var(--cryptix-dialog-container-max-height, 200px)}
			:host([mode="recover"]) .container{max-height:var(--cryptix-dialog-container-max-height, 450px)}
			.buttons{justify-content:center;--cryptix-dialog-buttons-width:100%;}
			:host([mode="init"]) .buttons{justify-content:center}
			:host([mode="open"]) .inner-body{padding:0px 30px;}

			.text-center, .heading{text-align:center;}
			.words{margin:20px 0px;max-width:500px;margin:auto;}
			.words .row{display:flex;justify-content:center;}
			.words .cell{flex:1;width:10px;text-align:center;padding:5px}
			input.seed{
				border:2px solid var(--flow-primary-color);
				border-radius:7px;padding:10px 5px;max-width:120px;
				text-align:center;width:100%;box-sizing:border-box;
			}
			:host[isFresh] .close-btn{display:none}
			.big-logo{max-width:150px;margin:10px auto 20px;display:block;}
			.bottom-spacer{height:200px}
		`]}constructor(){super(),window.showWalletInitDialog=(e,t)=>{this.cleanUpForm(),this.wallet=e.wallet,this.hideable=!!e.hideable,this.mode=e.mode||"open",this.lastMode=this.mode,this.callback=t,this.isFresh=!!e.isFresh,this.args=e,this.show()},window.hideWalletInitDialog=()=>{this.hide()},this.mode="init",this.inputType="password"}buildRenderArgs(){let{mode:e}=this;return{modeName:e[0].toUpperCase()+e.substr(1)}}renderHeading({modeName:e}){return"Init"==e?"":p.dy`${(0,v.T)(`${e} Wallet`)}`}renderBody({modeName:e}){return this[`render${e}UI`]()}renderButtons({modeName:e}){return this[`render${e}Buttons`]?.()||""}renderInitUI(){return p.dy`
			<div class="sub-heading text-center" is="i18n-div">Welcome to Cryptix Wallet</div>
		`}renderRecoverUI(){let e=[0,1,2,3],t=[];return p.dy`
			<p class="sub-heading text-center" is="i18n-p">
				Enter your 12-word seed phrase to recover your wallet (words are not case sensitive)
			</p>
			<div class="words" @input=${this.onSeedInput}>
				${[0,1,2].map(((r,i)=>p.dy`
					<div class="row">
						${e.map(((e,r)=>p.dy`
							<div class="cell">
								<input class="seed word" value="${t[4*i+r]||""}" data-index="${4*i+r}" />
							</div>
							`))}
					</div>
					`))}
			</div>
			<div class="error">${this.errorMessage}</div>
		`}renderOpenUI(){let e="password"==this.inputType?"eye":"eye-slash";return p.dy`
			${this.hideLogo?"":p.dy`
			<div>
				<img class="big-logo" src="${At+"/resources/images/cryptix.png"}" />
			</div>`}
			<div class="sub-heading" is="i18n-div">Unlock the wallet with your password:</div>
			<flow-input class="password full-width" outer-border value="${""}"
				type="${this.inputType}" placeholder="${(0,v.T)("Password")}"
				@keyup="${this.onOpenPassKeyup}">
				<fa-icon class="input-type-btn" slot="sufix"
					@click="${this.changeInputType}"
					icon="${e}"></fa-icon>
			</flow-input>
			<div class="error">${this.errorMessage}</div>
			<div class='buttons'>${this._renderOpenButtons()}</div>
			<div class="bottom-spacer" ?hidden=${!isMobile}></div>
		`}renderCreateUI(){let e="password"==this.inputType?"eye":"eye-slash";return p.dy`
			<div class="sub-heading" is="i18n-div">Create a password for your new wallet</div>
			<flow-input class="password full-width" outer-border value="${""}"
				type="${this.inputType}" placeholder="${(0,v.T)("Password")}">
				<fa-icon class="input-type-btn" slot="sufix"
					@click="${this.changeInputType}"
					icon="${e}"></fa-icon>
			</flow-input>
			<div class="sub-heading" is="i18n-div">Confirm password</div>
			<flow-input class="cfm-password full-width" outer-border value="${""}"
				type="${this.inputType}" placeholder="${(0,v.T)("Confirm Password")}"
				@keyup="${this.onCreatePassKeyup}">
				<fa-icon class="input-type-btn" slot="sufix"
					@click="${this.changeInputType}"
					icon="${e}"></fa-icon>
			</flow-input>
			<div class="error">${this.errorMessage}</div>
		`}_renderOpenButtons(){return p.dy`
			<flow-btn @click="${e=>this.mode="create"}" i18n>NEW WALLET</flow-btn>
			<flow-btn primary @click="${this.openWallet}" i18n>OPEN WALLET</flow-btn>`}renderCreateButtons(){return p.dy`
			<flow-btn @click="${e=>this.mode=this.lastMode}" i18n>Cancel</flow-btn>
			<flow-btn ?hidden=${this.isFresh} 
				@click="${e=>this.mode="recover"}" i18n>I have a wallet</flow-btn>
			<flow-btn primary @click="${this.showSeeds}" i18n>Next</flow-btn>
			`}renderInitButtons(){return p.dy`
			<flow-btn class="primary"
				@click="${e=>this.mode="create"}" i18n>Create New Wallet</flow-btn>
			<flow-btn class="primary"
				@click="${e=>this.mode="recover"}" i18n>Recover from Seed</flow-btn>`}renderRecoverButtons(){return p.dy`
			<flow-btn @click="${this.cancelRecover}" i18n>Cancel</flow-btn>
			<flow-btn primary @click="${this.recoverWallet}" i18n>Recover Wallet</flow-btn>`}cancelRecover(){if(this.args?.backToWallet)return this.hide();this.mode=this.lastMode||"init"}updated(e){super.updated(e),e.has("mode")&&(this.inputType="password",this.errorMessage="")}changeInputType(){this.inputType="password"==this.inputType?"text":"password"}onOpenPassKeyup(e){13==e.which&&this.openWallet()}openWallet(){let e=this.qS(".password").value;this.callback(null,{password:e,dialog:this})}onCreatePassKeyup(e){13==e.which&&this.showSeeds()}showSeeds(){let e=this.qS(".password").value.trim(),t=this.qS(".cfm-password").value;return this.checkPassword(e)?e!=t?this.setError(v.ag.t("Passwords do not match")):void this.callback(null,{mode:"create",password:e,dialog:this}):this.setError(v.ag.t("At least 8 characters, one capital, one lower, one number, and one symbol"))}onSeedInput(e){let t=e.target.closest("input.seed");if(!t||"0"!=t.dataset.index)return;let r=(t.value+"").trim().split(" ");r.length<12||this.qSAll("input.seed.word").forEach((e=>{let t=e.dataset.index;null==r[t]?e.value="":e.value=r[t]}))}recoverWallet(){let e={},t=!1;this.qSAll("input.seed.word").forEach((r=>{let i=r.dataset.index;e[i]=(r.value+"").trim(),r.value.length<2&&(t=!0)}));let r=[];for(let t=0;t<12;t++)r.push(e[t]);if(t||!r.join("").length)return this.setError(v.ag.t("Please provide valid words"));Nt({title:v.ag.t("Password to encryt the wallet"),confirmBtnText:v.ag.t("Encrypt Wallet")},(({btn:e,password:t})=>{t&&"confirm"==e&&this.callback(null,{seedPhrase:r.join(" ").toLowerCase(),password:t,dialog:this})}))}cleanUpForm(){this.qSAll("input.seed.word").forEach((e=>{e.value=""}))}}).define("cryptix-open-dialog"),class extends Ut{static get properties(){return{value:{type:String},heading:{type:String},inputLabel:{type:String}}}static get styles(){return[Ut.styles,p.iv`
			.container{
				width:100%;height:100%;padding:0px;
				max-height:var(--cryptix-dialog-container-max-height, 600px);
			}
			flow-t9{width:215px;margin:auto;display:block;}
			.buttons{
				justify-content:center;margin:20px 0px;width:100%;
				box-sizing:border-box;
			}
			.buttons flow-btn {
				margin: 0px 18px;
			}
		`]}constructor(){super(),window.showT9=(e,t)=>{this.open(e,t)}}renderHeading(){return p.dy`${this.renderBackBtn()} ${this.heading}`}renderBody(){let e=this.value||"",{inputLabel:t="Amount in CYTX"}=this;return p.dy`
		<flow-input class="full-width" clear-btn value="${e}"
			label="${t}" readonly @changed=${this.onInputChange}>
		</flow-input>
		<flow-t9 value="${e}" @changed="${this.onT9Change}"></flow-t9>
		<div class="error">${this.errorMessage}</div>
		<div class="buttons">
			<flow-btn ?hidden=${!this.max} @click="${this.setMaxValue}" i18n>MAX</flow-btn>
			<flow-btn class="primary" @click="${this.sendBack}" i18n>DONE</flow-btn>
		</div>
		`}setMaxValue(){this.value=this.max}sendBack(e){this.callback({value:this.value,dialog:this})}onInputChange(e){this.value=e.detail.value}onT9Change(e){this.value=e.detail.value}open(e,t){this.callback=t,this.args=e,this.value=e.value||"",this.max=e.max||"",this.heading=e.title||e.heading||v.ag.t("Amount"),this.inputLabel=e.inputLabel||v.ag.t("Amount in CYTX"),this.show()}cancel(){this.hide()}}.define("cryptix-t9-dialog"),class extends Ut{static get properties(){return{qrdata:{type:String},address:{type:String}}}static get styles(){return[Ut.styles,p.iv`
			.container{max-height:400px}
			.buttons{justify-content:center;}
			flow-qrcode{width:170px;margin:auto}
			input.address{
				font-size:1px;padding:0px;margin:0px;border:0px;width:1px;height:1px;
				z-index:-1;position:absolute;opacity:0;
			}
			flow-input flow-btn{margin-bottom:0px;}
		`]}renderHeading(){return p.dy`${(0,v.T)("RECEIVE")}`}renderBody(){return p.dy`
			<flow-qrcode data="${this.qrdata}" ntype="6"></flow-qrcode>
			<flow-input label="${(0,v.T)("Address")}" class="full-width" readonly 
				value="${this.address}" sufix-btn>
				<flow-btn slot="sufix" @click="${this.copyAddress}"
					title="${(0,v.T)("Copy to clipboard")}"><fa-icon icon="copy"></fa-icon></flow-btn>
			</flow-input>
			<input class="address" value="${this.address}">`}renderButtons(){return p.dy`<flow-btn @click="${this.hide}" i18n>CLOSE</flow-btn>`}open(e,t){this.callback=t,this.args=e;const{address:r}=e;this.qrdata=r,this.address=r,this.show()}copyAddress(){let e=this.renderRoot.querySelector("input.address");e.select(),e.setSelectionRange(0,99999),document.execCommand("copy"),FlowDialog.alert(v.ag.t("Address has been copied to the clipboard"),e.value)}}.define("cryptix-wallet-receive-dialog"),class extends Ut{static get properties(){return{step:{type:Number,reflect:!0},inputType:{type:String},mnemonic:{type:String}}}static get styles(){return[Ut.styles,p.iv`
			.heading{text-align:center}
			.container{max-height:var(--cryptix-dialog-container-max-height, 660px)}
			.buttons{justify-content:flex-end}
			.dull-text{opacity:0.5}
			.text-center{text-align:center;}
			.words{margin:20px 0px;}
			.words .row, .button-row{display:flex;justify-content:center;}
			.words .cell{flex:1;text-align:center;padding:5px;user-select:none}
			.words .word{margin:4px;color:var(--flow-primary-color);user-select:initial}
			.dots{text-align:center;padding:10px;}
			.dots .dot{margin:2px}
			.button-row{margin:20px 0px;flex-wrap: wrap;}
			.button-row flow-btn{margin:10px; flex:1;--flow-btn-display:inline-block}
			.dot[icon="check"]{--fa-icon-color:var(--flow-primary-color)}
			.dot[icon="times"]{--fa-icon-color:#F00;}
			.varification-msg{margin-bottom:5px;text-align:center}
			.varification-title{margin:20px 5px;text-align:center}
			.success-msg{text-align:center;margin-top:65px}
			.varification-msg-box{min-height:80px;}
			<p is="i18n-p">
				Your wallet is accessible by a seed phrase.
				The seed phrase is an ordered 12-word secret phrase.
			</p>
			<p is="i18n-p">
				Make sure no one is looking, as anyone with your
	