import { test, expect } from "@playwright/test";
import { ChallengerService } from "../src/services/index";
import { Api } from "../src/services/api.service";
let token;


test.describe("Challenge", () => {
  test.beforeAll(async ({ request }, testinfo) => {
    let r = await request.post(`${testinfo.project.use.apiURL}/challenger`); // указываем метод
    const headers = r.headers();
    console.log(`${testinfo.project.use.apiURL}${headers.location}`);
    token = headers["x-challenger"];
  });

  test("получить токен", { tag: '@API' }, async ({ request }, testinfo) => {
    let r = await request.get(`${testinfo.project.use.apiURL}/challenges`, {
      headers: { "X-CHALLENGER": token },
    });
    const body = await r.json();
    expect(body.challenges.length).toBe(59);
  });

  test("GET /todos - вернуть список задач",{ tag: '@API' }, async ({ request }, testinfo) => {
    const response = await request.get(`${testinfo.project.use.apiURL}/todos`, {
      headers: { 
        "X-CHALLENGER": token,
        "Content-Type": "application/json"
      }
    }); 

     let headers = await response.headers();
     let body = await response.json();

     expect(response.status()).toBe(200);
     expect(response.headers()["content-type"]).toContain("application/json");
     expect(body.todos.length).toBeGreaterThan(0); 

     if (body.todos.length > 0) {
        expect(body.todos[0]).toHaveProperty("id");
        expect(body.todos[0]).toHaveProperty("title");
        expect(body.todos[0]).toHaveProperty("doneStatus");
    }
        
  });
  test("GET /todo (404) not plural",{ tag: '@API' }, async ({ request }, testinfo) => {
    const response = await request.get(`${testinfo.project.use.apiURL}/todo`, {
      headers: { 
        "X-CHALLENGER": token,
        "Content-Type": "application/json"
      }
      }); 

     expect(response.status()).toBe(404);
     expect(response.headers()["content-type"]).toContain("application/json");

  });

  test("GET /todos/{id} (200)",{ tag: '@API' }, async ({ request }, testinfo) => {
    const response = await request.get(`${testinfo.project.use.apiURL}/todos`, {
      headers: { 
        "X-CHALLENGER": token,
        "Content-Type": "application/json"
      }
      }); 

     let body = await response.json();

     const firstTodoId = await body.todos[0].id;
         console.log("First todo ID:", firstTodoId); // Отладка

    // Получаем конкретный todo по ID
     const responseId = await request.get(`${testinfo.project.use.apiURL}/todos/${firstTodoId}`, {
        headers: { 
            "X-CHALLENGER": token,
        }
    }); 

    // const todo = await response.json();
        let todoResponse = await responseId.json();
    console.log("Single todo response structure:", Object.keys(todoResponse));


 // Шаг 3: Проверки
    expect(responseId.status()).toBe(200);
    expect(responseId.headers()["content-type"]).toContain("application/json");
    
    // Поскольку API возвращает весь список, ищем наш todo в массиве
    expect(todoResponse).toHaveProperty('todos');
    expect(Array.isArray(todoResponse.todos)).toBe(true);
    
    // Находим конкретный todo в массиве по ID
    const foundTodo = todoResponse.todos.find(todo => todo.id === firstTodoId);
    expect(foundTodo).toBeDefined();
    expect(foundTodo.id).toBe(firstTodoId);
    expect(foundTodo).toHaveProperty('title');
    expect(foundTodo).toHaveProperty('doneStatus');
    expect(foundTodo).toHaveProperty('description');
  });
  });