/* @pollon/state-machine - v1.0.0
* https://github.com/pollon-js/state-machine#readme
* 2020 Francesco Lasaracina. Licensed ISC */
define(["exports","@pollon/message-broker"],(function(t,n){"use strict";function e(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function r(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,n,e){return n&&r(t.prototype,n),e&&r(t,e),t}function o(t){return(o=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function a(t,n){return(a=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function c(t,n){return!n||"object"!=typeof n&&"function"!=typeof n?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):n}function s(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,r=o(t);if(n){var i=o(this).constructor;e=Reflect.construct(r,arguments,i)}else e=r.apply(this,arguments);return c(this,e)}}function u(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var e=[],r=!0,i=!1,o=void 0;try{for(var a,c=t[Symbol.iterator]();!(r=(a=c.next()).done)&&(e.push(a.value),!n||e.length!==n);r=!0);}catch(t){i=!0,o=t}finally{try{r||null==c.return||c.return()}finally{if(i)throw o}}return e}(t,n)||function(t,n){if(!t)return;if("string"==typeof t)return f(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return f(t,n)}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}var h=function(t){!function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&a(t,n)}(r,t);var n=s(r);function r(t,i,o){var a;return e(this,r),(a=n.call(this,t)).state=i,a.args=o,a}return r}(n.Event),l=function(t,n,e,r){return function(){var i=t;return r&&r.length>1&&(i=r.pop()),t.publisher.fire(n,new h(n,e,r),i)}},v=function(){function t(n,r,i,o,a){e(this,t),this.name=n,this.from=r,this.to=i,this.state=o,this.context=a}return i(t,[{key:"isActionValid",value:function(){return this.state.isActionValid(this)}},{key:"execute",value:function(){var t=this;if(!this.isActionValid())throw"[State Machine] Invalid action '".concat(this.name,"' called on state: '").concat(this.state.from,"'");if(this.context.isPending())throw"[State Machine] pending transition '".concat(this.context.currentState.from,"'");this.context.pending=!0;for(var n=arguments.length,e=new Array(n),r=0;r<n;r++)e[r]=arguments[r];return Promise.resolve(this).then(l(this.context,p.EVENTS.LEFT,this.state.from)).then(l(this.context,p.EVENTS.ON,this.name,e)).then((function(){var n;n=t.context.currentState.actions[t.name],t.context.currentState=t.context.transitions[n.to]})).then(l(this.context,p.EVENTS.ENTERED,this.to,e)).then((function(){t.context.pending=!1}))}}]),t}(),y=function(){function t(n,r,i){if(e(this,t),this.from=n,this.actions={},r)for(var o=0,a=Object.entries(r);o<a.length;o++){var c=u(a[o],2),s=c[0],f=c[1];this.addAction(s,f,i)}}return i(t,[{key:"addAction",value:function(t,n,e){if(Array.isArray(n))throw new Error("Pollon: [state-machine:invalid] Ambiguous transition '".concat(this.from,"'' -> '").concat(t,"'"));this.actions[t]=new v(t,this.from,n||this.from,this,e)}},{key:"isActionValid",value:function(t){var n=t.name;return!!this.actions[n]}}]),t}(),p=function(){function t(r){var i;if(e(this,t),this.transitions={},!(i=r.transitions||{})[r.initial])throw new Error("Pollon: [state-machine:invalid] Invalid initial state '".concat(r.initial,"'"));for(var o=0,a=Object.entries(i);o<a.length;o++){var c=u(a[o],2),s=c[0],f=c[1];this.transitions[s]=new y(s,f,this)}for(var h=0,l=Object.entries(i);h<l.length;h++)for(var v=u(l[h],2)[1],p=0,b=Object.entries(v);p<b.length;p++){var d=u(b[p],2)[1];this.transitions[d]||(this.transitions[d]=new y(d,{},this))}this.currentState=this.transitions[r.initial],this.pending=null,this.Bus=new n.Broker,this.publisher=new n.Publisher(Object.values(t.EVENTS)),this.Bus.addPublisher(this.publisher)}return i(t,null,[{key:"EVENTS",get:function(){return{LEFT:"statemachine.state_leaving",ON:"statemachine.state",ENTERED:"statemachine.state_entered"}}}]),i(t,[{key:"isPending",value:function(){return!!this.pending}},{key:"can",value:function(t){return!!this.currentState.actions[t]}},{key:"on",value:function(t,e,r,i){var o,a;return(o={})[t]={method:function(t,n){if(e==n.state||"*"==e)return r(t,n)},once:!!i},a=new n.Subscriber(o),this.Bus.addSubscriber(a),a}},{key:"off",value:function(t){this.Bus.removeSubscriber(t)}},{key:"handle",value:function(t){for(var n=this,e=arguments.length,r=new Array(e>1?e-1:0),i=1;i<e;i++)r[i-1]=arguments[i];return this.can(t)?new Promise((function(e,i){var o;return(o=n.currentState.actions[t]).execute.apply(o,r).then((function(){e()})).catch((function(t){i(t)}))})):Promise.reject("[State Machine] action '".concat(t,"'' forbidden in the current state '").concat(this.currentState.from,"'"))}}]),t}();t.StateMachine=p,Object.defineProperty(t,"__esModule",{value:!0})}));
