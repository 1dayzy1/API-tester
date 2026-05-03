const container = document.querySelector(".container");
const header = document.querySelector(".header");
const mainContent = document.querySelector(".main-content");

// Получаем элементы формы запроса
const requestForm = document.querySelector(".request-form");
const methodSelector = document.querySelector(".method-selector");
const methodSelect = document.getElementById("http-method");
const apiUrlInput = document.getElementById("api-url");
const requestBody = document.getElementById("request-body");
const requestHeaders = document.getElementById("request-headers");


const sendRequestButton = document.getElementById("send-request");

// Получаем элементы секции ответа
const responseSection = document.querySelector(".response-section");
const responseOutput = document.getElementById("response-output");

let method = "GET";

const isValidURl = (url) => {
  try {
    const validUrl = new URL(url);
    return validUrl.protocol === "https:" || validUrl.protocol === "http:";
  } catch (err) {
    return false;
  }
};

sendRequestButton.addEventListener("click", () => {
  try {
    if (!apiUrlInput.value) {
      responseOutput.textContent = "Данные не заполнены";
      return;
    }

    if (!isValidURl(apiUrlInput.value)) {
      responseOutput.textContent = "Введите ссылку";
      return;
    }

    responseOutput.textContent = "Ожидание ответа...";

    // alert(method)

    switch (method) {
      case "GET":
        fetchData(apiUrlInput.value);
        break;

      case "DELETE":
        deleteData(apiUrlInput.value);
        break;

      case "POST":
        addData(apiUrlInput.value, requestBody.value, requestHeaders.value);
        break;

      case "PATCH":
        editData(apiUrlInput.value, requestBody.value, requestHeaders.value);
        break;

      default:
        alert("Не понятный метод");
    }
  } catch (er) {
    console.log(er);
  }
});

methodSelector.addEventListener("change", (ev) => {
  console.log(ev.target.value);

  method = ev.target.value;

  if (method === "POST" || method === "PATCH") {
    requestForm.classList.remove("default");
    requestForm.classList.add("write");
  } else {
    requestForm.classList.remove("write");
    requestForm.classList.add("default");
  }
});

const fetchData = async (url) => {
  try {
    const req = await fetch(url);

    console.log(req);
    if (!req.ok) {
      const errorText = await req.text();
      responseOutput.innerHTML = `<div style="color: #ef4444;">❌ Ошибка: ${req.status}</div><div style="color: #9ca3af; font-size: 12px;">
${errorText}

                </div>`;
      return;
    }
    const data = await req.json();

    responseOutput.textContent = `${JSON.stringify(data, null, 2)}`;
  } catch (err) {
    console.log(err.message);
    responseOutput.textContent = "Введите коректные данные";
  }
};

const deleteData = async (url) => {
  try {
    const req = await fetch(url, {
      method: "DELETE",
    });

    console.log(req);

    if (req.status === 200 || req.status === 204) {
      responseOutput.textContent = `✅ Объект удален!`;
      return;
    }

    if (!req.ok) {
      const errorText = await req.text();
      responseOutput.innerHTML = `<div style="color: #ef4444;">❌ Ошибка: ${req.status}</div><div style="color: #9ca3af; font-size: 12px;">
${errorText}

                </div>`;
      return;
    }
    const data = await req.json();

      responseOutput.textContent = `${JSON.stringify(data, null, 2)}`;
  } catch (err) {
    console.log(err.message);
    responseOutput.innerHTML = `<span style="color: #f59e0b">⚠️ ${err.name}: ${err.message}</span>`;
  }
};


const addData = async(url, dataStr, headStr) =>{
  try {


    const data = JSON.parse(dataStr || {})
    const head = JSON.parse(headStr || {});

    console.log(head, data);

    

    const req = await fetch(url, {
      method:"POST",
      headers:head,
      body:JSON.stringify(data)
    });
    console.log(req)

    if(!req.ok){
      const err_text = await req.text()
      responseOutput.textContent = `Произошла ошибка: ${err_text}`;
      return;
    }

    if(req.status === 201){
      responseOutput.textContent = `✅ Данные добавлены`;
      return;
    }

    

    
    
  } catch (error) {
    console.log(error)
    responseOutput.textContent = '🌐 Сетевая ошибка';
  }
}


const editData = async(url, dataStr, headStr) =>{
  try {


    const data = JSON.parse(dataStr || {})
    const head = JSON.parse(headStr || {});

    console.log(head, data);

    

    const req = await fetch(url, {
      method:"PATCH",
      headers:head,
      body:JSON.stringify(data)
    });
    console.log(req)

    if(!req.ok){
      const err_text = await req.text()
      responseOutput.textContent = `Произошла ошибка: ${err_text}`;
      return;
    }

    if(req.status === 200){
      responseOutput.textContent = `✅ Данные обновлены`;
      return;
    }

    

    
    
  } catch (error) {
    console.log(error)
    responseOutput.textContent = '🌐 Сетевая ошибка';
  }
}

// "Content-type":"application/json"

// {
// "item":"login"
// }