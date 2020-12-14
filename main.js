!function(){"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r,o,i,u){var a=e.name,c=e.link,s=e.id,l=e.owner,f=e.likes,p=void 0===f?[]:f;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.name=a,this.link=c,this._id=s,this._owner=l._id,this._likes=p,this._template=document.querySelector(n).content,this._openImage=r,this._deleteCard=o,this._api=i,this._catcherror=u,this._like=this._like.bind(this),this._delete=this._delete.bind(this)}var n,r;return n=t,(r=[{key:"_setLikes",value:function(e){this._likeCounter.textContent=e}},{key:"_like",value:function(){var e=this;this._likeButton.classList.contains("element__like-button_active")?this._api.dislikeCard(this._id).then((function(t){e._likeToggle(),e._setLikes(t.likes.length)})).catch((function(t){return e._catcherror(t)})):this._api.likeCard(this._id).then((function(t){e._likeToggle(),e._setLikes(t.likes.length)})).catch((function(t){return e._catcherror(t)}))}},{key:"_likeToggle",value:function(){this._likeButton.classList.toggle("element__like-button_active")}},{key:"_delete",value:function(){this._deleteCard()}},{key:"removeCard",value:function(){this._content.remove(),this._content=null}},{key:"_setEventListeners",value:function(){this._likeButton.addEventListener("click",this._like),this.image.addEventListener("click",this._openImage),this._deleteButton.addEventListener("click",this._delete)}},{key:"create",value:function(e){return this._content=this._template.querySelector(".element").cloneNode(!0),this._deleteButton=this._content.querySelector(".element__delete-button"),this._likeButton=this._content.querySelector(".element__like-button"),this._likeCounter=this._content.querySelector(".element__like-counter"),this._likes.some((function(t){return t._id===e}))&&this._likeToggle(),this._setLikes(this._likes.length),e===this._owner&&this._deleteButton.classList.add("element__delete-button_visible"),this._content.querySelector(".element__title").innerText=this.name,this.image=this._content.querySelector(".element__image"),this.image.src=this.link,this.image.alt=this.name,this._setEventListeners(),this._content}},{key:"getId",value:function(){return this._id}}])&&e(n.prototype,r),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.validationObj=t,this.form=n}var t,r;return t=e,(r=[{key:"hideError",value:function(e,t){var n=e.querySelector("#".concat(t.name,"-error"));n.classList.remove(this.validationObj.errorClass),t.classList.remove(this.validationObj.inputErrorClass),n.textContent=""}},{key:"_showError",value:function(e,t){var n=e.querySelector("#".concat(t.name,"-error"));n.textContent=t.validationMessage,n.classList.add(this.validationObj.errorClass),t.classList.add(this.validationObj.inputErrorClass)}},{key:"clearErrors",value:function(e){var t=this,n=e.querySelector(".popup__form");n&&(Array.from(n.querySelectorAll(".popup__input")).forEach((function(e){t.hideError(n,e)})),this.toggleButton())}},{key:"_checkInputValidity",value:function(e,t){t.checkValidity()?this.hideError(e,t):this._showError(e,t)}},{key:"toggleButton",value:function(){this.form.checkValidity()?(this.submitButton.classList.remove(this.validationObj.inactiveButtonClass),this.submitButton.removeAttribute("disabled")):(this.submitButton.classList.add(this.validationObj.inactiveButtonClass),this.submitButton.setAttribute("disabled",!0))}},{key:"_setEventListeners",value:function(){var e=this,t=Array.from(this.form.querySelectorAll(this.validationObj.inputSelector));this.submitButton=this.form.querySelector(this.validationObj.submitButtonSelector),t.forEach((function(t){t.addEventListener("input",(function(t){e._checkInputValidity(e.form,t.target),e.toggleButton(e.form,e.submitButton)}))})),this.toggleButton(this.form,this.submitButton,this.validationObj)}},{key:"enableValidation",value:function(){this.form.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}}])&&n(t.prototype,r),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r,this._renderer=o,this._containter=n}var t,n;return t=e,(n=[{key:"renderItems",value:function(){var e=this;this._items.forEach((function(t){e._renderer(t)}))}},{key:"addItem",value:function(e,t){t?this._containter.append(e):this._containter.prepend(e)}}])&&o(t.prototype,n),e}();function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=t,this._handleEscClose=this._handleEscClose.bind(this),this._handleOverlayClose=this._handleOverlayClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_is-opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_is-opened"),document.removeEventListener("keydown",this._handleEscClose),this._popup.removeEventListener("click",this._handleOverlayClose)}},{key:"_handleOverlayClose",value:function(e){var t=e.currentTarget;e.target===t&&this.close()}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popup.querySelector(".popup__close").addEventListener("click",(function(){return e.close()})),this._popup.addEventListener("click",(function(){return e._handleOverlayClose(event)}))}}])&&u(t.prototype,n),e}();function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t,n){return(l="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=h(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var y=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=h(r);if(o){var n=h(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return p(this,e)});function u(e){var t,n=e.popup,r=e.submitFormCallback;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,n))._submitFormCallback=r,t._form=t._popup.querySelector(".popup__form"),t}return t=u,(n=[{key:"close",value:function(){l(h(u.prototype),"close",this).call(this),this._form.reset()}},{key:"setEventListeners",value:function(){var e=this;this._form.addEventListener("submit",(function(t){e._submitFormCallback(t,e._getInputValues()),e.close()})),l(h(u.prototype),"setEventListeners",this).call(this)}},{key:"_getInputValues",value:function(){var e={};return this._inputs=this._popup.querySelectorAll(".popup__input"),this._inputs.forEach((function(t){e[t.name]=t.value})),e}}])&&s(t.prototype,n),u}(a);function _(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var d=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._url=t.url,this._headers=t.headers,this._errorHandler=n}var t,n;return t=e,(n=[{key:"_getResponse",value:function(e){return e.ok?e.json():Promise.reject(this._errorHandler(e.status))}},{key:"getCards",value:function(){var e=this;return fetch("".concat(this._url,"cards"),{headers:this._headers}).then((function(t){return e._getResponse(t)}))}},{key:"getUserData",value:function(){var e=this;return fetch("".concat(this._url,"users/me"),{headers:this._headers}).then((function(t){return e._getResponse(t)}))}},{key:"getInitialData",value:function(){return Promise.all([this.getUserData(),this.getCards()])}},{key:"editProfile",value:function(e,t){var n=this;return fetch("".concat(this._url,"users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return n._getResponse(e)}))}},{key:"addNewCard",value:function(e,t){var n=this;return fetch("".concat(this._url,"cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then((function(e){return n._getResponse(e)}))}},{key:"likeCard",value:function(e){var t=this;return fetch("".concat(this._url,"cards/likes/").concat(e),{method:"PUT",headers:this._headers}).then((function(e){return t._getResponse(e)}))}},{key:"dislikeCard",value:function(e){var t=this;return fetch("".concat(this._url,"cards/likes/").concat(e),{method:"DELETE",headers:this._headers}).then((function(e){return t._getResponse(e)}))}},{key:"deleteCard",value:function(e){var t=this;return fetch("".concat(this._url,"cards/").concat(e),{method:"DELETE",headers:this._headers}).then((function(e){return t._getResponse(e)}))}},{key:"uploadAvatar",value:function(e){var t=this;return fetch("".concat(this._url,"users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((function(e){return t._getResponse(e)}))}}])&&_(t.prototype,n),e}();function v(e){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t,n){return(m="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=w(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function k(e,t){return(k=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function g(e,t){return!t||"object"!==v(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function w(e){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var E=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&k(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=w(r);if(o){var n=w(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return g(this,e)});function u(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e))._deleteCardCallBack=t,n._button=document.querySelector(".popup__button-confirm"),n}return t=u,(n=[{key:"setEventListeners",value:function(){var e=this;this._button.addEventListener("click",(function(){e._deleteCardCallBack(e._card)})),m(w(u.prototype),"setEventListeners",this).call(this)}},{key:"open",value:function(e){this._card=e,m(w(u.prototype),"open",this).call(this)}}])&&b(t.prototype,n),u}(a);function O(e){return(O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function j(e,t,n){return(j="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=P(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function C(e,t){return(C=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function L(e,t){return!t||"object"!==O(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function P(e){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var R=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&C(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=P(r);if(o){var n=P(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return L(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._preview=t._popup.querySelector(".popup-image__preview"),t._title=t._popup.querySelector(".popup-image__title"),t}return t=u,(n=[{key:"close",value:function(){j(P(u.prototype),"close",this).call(this)}},{key:"open",value:function(e){var t=e.name;this._preview.src=e.link,this._preview.alt=t,this._title.textContent=t,j(P(u.prototype),"open",this).call(this)}},{key:"setEventListeners",value:function(){j(P(u.prototype),"setEventListeners",this).call(this)}}])&&S(t.prototype,n),u}(a);function q(e){return(q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function T(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function I(e,t,n){return(I="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=x(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function B(e,t){return(B=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function D(e,t){return!t||"object"!==q(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function x(e){return(x=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var A=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&B(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=x(r);if(o){var n=x(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return D(this,e)});function u(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),i.call(this,e)}return t=u,(n=[{key:"setEventListeners",value:function(){var e=this;I(x(u.prototype),"setEventListeners",this).call(this),this._popup.querySelector(".popup__error-button").addEventListener("click",(function(){return e.close()}))}},{key:"showError",value:function(e){this._popup.querySelector(".popup__error-text").textContent=e}}])&&T(t.prototype,n),u}(a);function U(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var V=function(){function e(t){var n=t.name,r=t.job,o=t.avatar;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=n,this._job=r,this._avatar=o}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._name.textContent,job:this._job.textContent}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.job,r=e.id;this._name.textContent=t,this._job.textContent=n,this._id=r}},{key:"getId",value:function(){return this._id}},{key:"setUserAvatar",value:function(e){this._avatar.src=e}}])&&U(t.prototype,n),e}(),F={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",errorClass:"popup__error_visible",inputErrorClass:"popup__input_type_error"},N=document.querySelector(".profile__edit-button"),H=document.querySelector(".profile__add-button"),J=document.querySelector(".popup__edit-profile"),M=J.querySelector(".popup__form"),z=J.querySelector(".popup__name"),$=J.querySelector(".popup__job"),G=document.querySelector(".popup-new-place"),K=G.querySelector(".popup-new-place__form"),Q=document.querySelector(".popup__edit-avatar"),W=Q.querySelector(".popup__form-edit-avatar"),X=document.querySelector(".popup__error"),Y=document.querySelector(".profile__avatar-wrapper"),Z=document.querySelector(".profile__info-name"),ee=document.querySelector(".profile__info-job"),te=document.querySelector(".profile__avatar"),ne=document.querySelector(".elements"),re=document.querySelector(".popup-image"),oe=document.querySelector(".popup__confirm-delete"),ie="Сохранить",ue="Создать",ae="Удаление...",ce="Сохранение...",se=new R(re);se.setEventListeners();var le=new A(X);le.setEventListeners();var fe=new V({name:Z,job:ee,avatar:te});function pe(e,t,n,r){t.querySelector(".popup__button").textContent=e?n:r}function he(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function ye(e,n,r){var o=new t(e,n,(function(){return se.open(o)}),(function(){return ve.open(o)}),r,_e);return o.create(fe.getId())}function _e(e){le.showError('Что-то пошло не так. Ошибка "'.concat(e,'". Перезагрузите страницу,\n  или обратитесь в поддержку.')),le.open()}var de=new d({url:"https://mesto.nomoreparties.co/v1/cohort-18/",headers:{authorization:"36f02e32-425e-4cd6-9a5e-ab45df68f83b","Content-Type":"application/json"}},_e);de.getInitialData().then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,i=void 0;try{for(var u,a=e[Symbol.iterator]();!(r=(u=a.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return n}}(t,n)||function(e,t){if(e){if("string"==typeof e)return he(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?he(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],u=r[1];fe.setUserInfo({name:o.name,job:o.about,id:o._id}),fe.setUserAvatar(o.avatar);var a=new y({popup:J,submitFormCallback:function(e,t){e.preventDefault(),pe(!0,J,ce,ie),de.editProfile(t["profile-name"],t["profile-job"]).then((function(){fe.setUserInfo({name:t["profile-name"],job:t["profile-job"]}),a.close()})).catch((function(e){return _e(e.status)})).finally((function(){pe(!1,J,ce,ie)}))}});a.setEventListeners();var c=new i({items:u,renderer:function(e){return c.addItem(ye({name:e.name,link:e.link,id:e._id,likes:e.likes,owner:{_id:e.owner._id}},".elements__template",de),!0)}},ne);c.renderItems();var s=new y({popup:G,submitFormCallback:function(e,t){e.preventDefault(),pe(!0,G,ce,ue),de.addNewCard(t["place-name"],t["place-link"]).then((function(e){var n=ye({name:t["place-name"],link:t["place-link"],id:e._id,owner:{_id:fe.getId()}},".elements__template",de);c.addItem(n,!1),s.close()})).catch((function(e){return _e(e.status)})).then((function(){pe(!1,G,ce,ue)}))}});s.setEventListeners(),N.addEventListener("click",(function(){var e=fe.getUserInfo();z.value=e.name,$.value=e.job,me.clearErrors(J),a.open()})),H.addEventListener("click",(function(){ke.clearErrors(G),s.open()}))})).catch((function(e){return _e(e)}));var ve=new E(oe,(function(e){pe(!0,oe,ae,"Да"),de.deleteCard(e.getId()).then((function(){e.removeCard(),ve.close()})).catch((function(e){return _e(e)})).finally((function(){pe(!1,oe,ae,"Да")}))}));ve.setEventListeners();var be=new y({popup:Q,submitFormCallback:function(e,t){e.preventDefault(),pe(!0,Q,ce,ie),de.uploadAvatar(t.avatar).then((function(){fe.setUserAvatar(t.avatar),be.close()})).catch((function(e){return _e(e)})).finally((function(){pe(!1,Q,ce,ie)}))}});be.setEventListeners(),Y.addEventListener("click",(function(){ge.clearErrors(Q),be.open()}));var me=new r(F,M);me.enableValidation();var ke=new r(F,K);ke.enableValidation();var ge=new r(F,W);ge.enableValidation()}();