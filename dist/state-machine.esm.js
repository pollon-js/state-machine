/* @pollon/state-machine - v1.0.0
* https://github.com/pollon-js/state-machine#readme
* 2020 Francesco Lasaracina. Licensed ISC */
import{Event as t,Broker as n,Publisher as e,Subscriber as r}from"@pollon/message-broker";function i(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function o(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function a(t,n,e){return n&&o(t.prototype,n),e&&o(t,e),t}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,n){return(s=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function u(t,n){return!n||"object"!=typeof n&&"function"!=typeof n?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):n}function f(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,r=c(t);if(n){var i=c(this).constructor;e=Reflect.construct(r,arguments,i)}else e=r.apply(this,arguments);return u(this,e)}}function h(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var e=[],r=!0,i=!1,o=void 0;try{for(var a,c=t[Symbol.iterator]();!(r=(a=c.next()).done)&&(e.push(a.value),!n||e.length!==n);r=!0);}catch(t){i=!0,o=t}finally{try{r||null==c.return||c.return()}finally{if(i)throw o}}return e}(t,n)||function(t,n){if(!t)return;if("string"==typeof t)return l(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return l(t,n)}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}var y=function(n){!function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&s(t,n)}(r,t);var e=f(r);function r(t,n,o){var a;return i(this,r),(a=e.call(this,t)).state=n,a.args=o,a}return r}(),v=function(t,n,e,r){return function(){var i=t;return r&&r.length>1&&(i=r.pop()),t.publisher.fire(n,new y(n,e,r),i)}},p=function(){function t(n,e,r,o,a){i(this,t),this.name=n,this.from=e,this.to=r,this.state=o,this.context=a}return a(t,[{key:"isActionValid",value:function(){return this.state.isActionValid(this)}},{key:"execute",value:function(){var t=this;if(!this.isActionValid())throw"[State Machine] Invalid action '".concat(this.name,"' called on state: '").concat(this.state.from,"'");if(this.context.isPending())throw"[State Machine] pending transition '".concat(this.context.currentState.from,"'");this.context.pending=!0;for(var n=arguments.length,e=new Array(n),r=0;r<n;r++)e[r]=arguments[r];return Promise.resolve(this).then(v(this.context,b.EVENTS.LEFT,this.state.from)).then(v(this.context,b.EVENTS.ON,this.name,e)).then((function(){var n;n=t.context.currentState.actions[t.name],t.context.currentState=t.context.transitions[n.to]})).then(v(this.context,b.EVENTS.ENTERED,this.to,e)).then((function(){t.context.pending=!1}))}}]),t}(),d=function(){function t(n,e,r){if(i(this,t),this.from=n,this.actions={},e)for(var o=0,a=Object.entries(e);o<a.length;o++){var c=h(a[o],2),s=c[0],u=c[1];this.addAction(s,u,r)}}return a(t,[{key:"addAction",value:function(t,n,e){if(Array.isArray(n))throw new Error("Pollon: [state-machine:invalid] Ambiguous transition '".concat(this.from,"'' -> '").concat(t,"'"));this.actions[t]=new p(t,this.from,n||this.from,this,e)}},{key:"isActionValid",value:function(t){var n=t.name;return!!this.actions[n]}}]),t}(),b=function(){function t(r){var o;if(i(this,t),this.transitions={},!(o=r.transitions||{})[r.initial])throw new Error("Pollon: [state-machine:invalid] Invalid initial state '".concat(r.initial,"'"));for(var a=0,c=Object.entries(o);a<c.length;a++){var s=h(c[a],2),u=s[0],f=s[1];this.transitions[u]=new d(u,f,this)}for(var l=0,y=Object.entries(o);l<y.length;l++)for(var v=h(y[l],2)[1],p=0,b=Object.entries(v);p<b.length;p++){var m=h(b[p],2)[1];this.transitions[m]||(this.transitions[m]=new d(m,{},this))}this.currentState=this.transitions[r.initial],this.pending=null,this.Bus=new n,this.publisher=new e(Object.values(t.EVENTS)),this.Bus.addPublisher(this.publisher)}return a(t,null,[{key:"EVENTS",get:function(){return{LEFT:"statemachine.state_leaving",ON:"statemachine.state",ENTERED:"statemachine.state_entered"}}}]),a(t,[{key:"isPending",value:function(){return!!this.pending}},{key:"can",value:function(t){return!!this.currentState.actions[t]}},{key:"on",value:function(t,n,e,i){var o,a;return(o={})[t]={method:function(t,r){if(n==r.state||"*"==n)return e(t,r)},once:!!i},a=new r(o),this.Bus.addSubscriber(a),a}},{key:"off",value:function(t){this.Bus.removeSubscriber(t)}},{key:"handle",value:function(t){for(var n=this,e=arguments.length,r=new Array(e>1?e-1:0),i=1;i<e;i++)r[i-1]=arguments[i];return this.can(t)?new Promise((function(e,i){var o;return(o=n.currentState.actions[t]).execute.apply(o,r).then((function(){e()})).catch((function(t){i(t)}))})):Promise.reject("[State Machine] action '".concat(t,"'' forbidden in the current state '").concat(this.currentState.from,"'"))}}]),t}();export{b as StateMachine};
