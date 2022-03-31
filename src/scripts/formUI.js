import _ from 'lodash';


function removeEmptyObjects(obj) {
  return _(obj)
    .pickBy(_.isObject)
    .mapValues(removeEmptyObjects)
    .omitBy(_.isEmpty)
    .assign(_.omitBy(obj, _.isObject))
    .value();
}


function prettyPrint(textarea, value) {
  var ugly = value;
  var obj = JSON.parse(ugly);
  var pretty = JSON.stringify(obj, undefined, 2);
  textarea.value = pretty;
}


export function isJSONvalid(text) {
  try {
    JSON.parse(text);
  } catch (e) {
    return false;
  }
  return true;
}


export function setCheckedStatus(el) {

  if (el.getAttribute('type') == 'radio') {
    if (el.checked) {
      el.closest('.toggle_container').setAttribute('data-checked', 'true')
    } else {
      el.closest('.toggle_container').setAttribute('data-checked', 'false')
    }
  }

}

export function validateJSON(el) {
  if (el.getAttribute('data-format') == 'json') {
    if (isJSONvalid(el.value)) {
      updateUrl();
      el.setAttribute('class', '');
    } else {
      el.setAttribute('class', 'invalid');
    }
  }
}



export function updateInputs() {

  if(!new URL(document.location.href).searchParams.get('cbody')){
    return;
  }
  var cBodyObject = JSON.parse(decodeURIComponent(atob(new URL(document.location.href).searchParams.get('cbody'))));

  Array.from(document.querySelectorAll('[data-config], [data-acb]')).forEach(input => {
    if(input.hasAttribute('data-acb') && new URL(document.location.href).searchParams.get('acb')) {
      input.value = atob(new URL(document.location.href).searchParams.get('acb'))
      return false
    }
    else{


      var propertyPath;
      if(input.getAttribute('data-config')) {

        propertyPath = input.getAttribute('data-config')
          .replaceAll(/{|"|\s|}|,|@@/g, '')
          .slice(0, -1)
          .replaceAll(':', '.');

      }

      if(input.type == "text") input.value = _.get(cBodyObject, propertyPath)
      if(input.type == "checkbox") input.checked = _.get(cBodyObject, propertyPath)
    }

  })


  Array.from(document.querySelectorAll('textarea')).forEach(textArea => {
    var urlParam = textArea.getAttribute('data-qp');


    if (textArea.getAttribute('data-format') == 'json' && new URL(document.location.href).searchParams.get(urlParam)) {
      prettyPrint(textArea, atob(new URL(document.location.href).searchParams.get(urlParam)));
      return;
    }
    if (textArea.getAttribute('data-format') !== 'json' && new URL(document.location.href).searchParams.get(urlParam)) {
      textArea.value = atob(new URL(document.location.href).searchParams.get(urlParam));
    }

  })

}



export function updateUrl() {


  var params = `acb=${document.querySelector('[data-acb]').value ? btoa(document.querySelector('[data-acb]').value) : ''}`;


  if (isJSONvalid(document.querySelector('[data-format="json"]').value)) {
    var jsonStr = document.querySelector('[data-format="json"]').value;
    jsonStr = jsonStr.replace(/\s\s+/g, ' ');
    params += `&${ document.querySelector('[data-format="json"]').getAttribute('data-qp') }=${ btoa(jsonStr)}`;
  }

  makeConfigObject()



  var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params;
  window.history.pushState({
    path: newurl
  }, '', newurl);

}


export function makeConfigObject() {
  window.config = window.config || {};
  document.location.search.replace('?', '').split('&').forEach(param => {
    param = param.split('=');
    window.config[param[0]] = param[1];
  })

}

export function writeConfig(input, textarea) {

  var textareaJSON;
  if(textarea.value) {
    textareaJSON = JSON.parse(textarea.value);
  }
  else{
    textareaJSON = {};
  }
  if(input.getAttribute('type') == 'checkbox') {
    var value = input.checked ? true : false
    var inputConfig = JSON.parse(input.getAttribute('data-config').replace('@@', `${value}`));
  }
  else{
    var inputConfig = JSON.parse(input.getAttribute('data-config').replace('@@', `"${input.value}"`));
  }


  prettyPrint(textarea, JSON.stringify(removeEmptyObjects(_.merge(textareaJSON, inputConfig))));

}
