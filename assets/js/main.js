
const API_URL = "https://api.shrtco.de/v2";
document.addEventListener("DOMContentLoaded", () => {
  let get_url_btn = document.querySelector("#get_url");

  get_url_btn.addEventListener("click", () => {
    let url = document.querySelector("#url_input").value;
    let div_res = document.querySelector("#url_response");

    if (url.length > 0) {
      div_res.innerHTML = `<div class="lds-facebook"><div></div><div></div><div></div><div></div></div>`;
      get_short_url(url)
        .then(response => {
          div_res.innerHTML = template_url(response);
        })
        .catch(err => {
          console.log("Error ocurrido:  " + err);
        })
    } else {
      div_res.innerHTML = `<p>Ingrese una url valida</p>`;
    }

  })
})

async function get_short_url(url) {
  let short_url = await fetch(API_URL + "/shorten?url=" + url);
  let json_res = await short_url.json();
  return json_res
}

function copy_clipboard() {
  const cb = navigator.clipboard;
  const paragraph = document.querySelector('#url_to_copy');
  cb.writeText(paragraph.innerText).then(() => null );
  let notification = alertify.notify('Copiado', 'success', 5, function () { console.log('dismissed'); });
}

const template_url = (response) => {
  return `
    <div class="results">
    <span class="input" id="url_to_copy" > ${response['result'].full_short_link} </span>
    <button onClick="copy_clipboard()" class="btn primary">Copiar</button>
    </div>
  `
}