const container = document.querySelector(".container");
const header = document.querySelector(".header");
const mainContent = document.querySelector(".main-content");

// Получаем элементы формы запроса
const requestForm = document.querySelector(".request-form");
const methodSelector = document.querySelector(".method-selector");
const methodSelect = document.getElementById("http-method");
const apiUrlInput = document.getElementById("api-url");
const requestBody = document.getElementById("request-body");
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

    case 'DELETE':
        deleteData(apiUrlInput.value)
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
      responseOutput.textContent = "Произошла ошибка";
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
      const req = await fetch(url);
  
      console.log(req);
      if (!req.ok) {
        responseOutput.textContent = "Произошла ошибка";
        return;
      }
      const data = await req.json();
  
      responseOutput.textContent = `${JSON.stringify(data, null, 2)}`;
    } catch (err) {
      console.log(err.message);
      responseOutput.textContent = "Введите коректные данные";
    }
  };
  
