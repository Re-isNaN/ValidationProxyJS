# Validation Proxy JS

## Introdução / Introduction
### 🇧🇷 Português
Este projeto tem como objetivo a criação de uma ferramenta de validação utilizando o objeto Proxy em JavaScript. A ferramenta é responsável por validar dois campos essenciais: nome e idade de um usuário.

As principais funcionalidades incluem:
1. **Validação de campos e exibição de erros após o clique em um botão**  
2. **Validação em tempo real utilizando Proxy, após o evento inicial**

O projeto explora conceitos importantes de validação dinâmica. Inicialmente, os campos são validados apenas após o clique no botão. A partir desse momento, a validação passa a ser feita em tempo real, exibindo mensagens de erro logo abaixo de cada campo, conforme os valores forem sendo modificados.

### 🌐 English

This project aims to create a validation tool using the Proxy object in JavaScript. The tool is responsible for validating two essential fields: the user's name and age.

The main features include:

1. **Field validation and error display triggered by a button click**
2. **Real-time validation using Proxy, after the initial event**

The project explores key concepts of dynamic validation. Initially, fields are only validated after the button is clicked. From that point on, validation is performed in real time, showing error messages directly beneath each field as their values are updated.

---

## 🧠 Tecnologias e Abordagem
- **Proxy**: Objeto do JavaScript que permite criar um intermediário (proxy) para outro objeto, interceptando e customizando operações fundamentais como leitura, escrita e deleção de propriedades.
- **Padrão de Projeto Builder**: padrão utilizado para construir objetos complexos de forma clara e flexível, separando a construção da representação. No contexto deste projeto, é aplicado para organizar a criação das regras de validação de maneira escalável.
- **Padrão de Projeto Factory**: Utilizado de forma complementar para separar a lógica de validação do Controller da manipulação da View, promovendo uma arquitetura mais organizada. Apesar disso, não é o foco principal do projeto.
- **JavaScript**: para a estrutura geral do projeto.

## 🧠 Technologies and Approach

- **Proxy**: A JavaScript object that allows the creation of an intermediary (proxy) for another object, intercepting and customizing fundamental operations like reading, writing, and deleting properties.
- **Builder Design Pattern**: A pattern used to construct complex objects in a clear and flexible way, separating the construction from the representation. In this project, it's used to organize the creation of validation rules in a scalable manner.
- **Factory Design Pattern**: Used complementarily to separate the validation logic in the Controller from the View manipulation, promoting a more organized architecture. However, it is not the main focus of the project.
- **JavaScript**: Used for the overall structure and logic of the project.


---

## 🚀 Principais pontos do Projeto
- ✅ Validação em tempo real com Proxy.
- ✅ Padrão de projeto Builder, utilizado em libs como [Zod](https://zod.dev/) e [Yup](https://www.npmjs.com/package/yup).

## 🚀 Key Highlights of the Project
- ✅ Real-time validation using Proxy.
- ✅ Builder design pattern, used in libraries like [Zod](https://zod.dev/) and [Yup](https://www.npmjs.com/package/yup).

---

## 📁 Estrutura Sugerida (Opcional) / Suggested Structure (Optional)

```bash
├── index.html
├── styles.css
├── main.js
├── src/
│   ├── controller.js
│   ├── factory.js
│   ├── helpers.js
│   ├── schema.js
│   ├── validator.js
│   └── view.js
└── README.md
```

--- 

## 🏗️ Arquitetura: Padrão de Projeto Builder
A lógica de validação neste projeto segue o padrão de projeto Builder, facilitando a criação de regras complexas por meio da composição de métodos encadeados.

### 👷 Como o padrão Builder é aplicado
- O Builder permite construir objetos de validação de forma declarativa e fluida:
```js
    v.string().required()
```
- Cada método (string(), required(), etc.) representa um passo na construção da regra, tornando o código mais **modular**, **legível** e **extensível**.
- Essa abordagem substitui funções monolíticas por pequenos blocos reutilizáveis, que podem ser combinados de maneira flexível conforme a necessidade de validação.

## 🏗️ Architecture: Builder Design Pattern
The validation logic in this project follows the Builder design pattern, facilitating the creation of complex rules through the composition of chained methods.

### 👷 How the Builder Pattern is Applied
- The Builder allows constructing validation objects in a declarative and fluent way:
```js
    v.string().required()
```
- Each method (string(), required(), etc.) represents a step in building the rule, making the code more **modular**, **readable**, and **extensible**.
- This approach replaces monolithic functions with small, reusable blocks that can be flexibly combined based on validation needs.


### 🧱 Exemplo de implementação / 🧱 Implementation example

```js
// validator.js
export class ValidatorBuilder {
    rules = [];

    string() {
        // simple string validation function
        const validString = (value) => (typeof value === 'string') || 'Deve ser uma string'

        // add function to rules
        this.rules.push(validString);
        
        return this;
    }

    number() {
        // simple number validation function
        const validNumber = (value) => !Number(isNaN(Number(value))) || 'Deve ser um número'

        // add function to rules
        this.rules.push(validNumber);

        return this;
    }

    required() {
        // simple required validation function
        const validRequired = (value) => (value !== undefined && value !== null && value !== '') || 'Campo obrigatório'
        
        // add function as priority to rules
        this.rules.unshift(validRequired);

        return this;
    }

    validate(value) {
        for (const rule of this.rules) {
            const result = rule(value);
            if (result !== true) return result;
        }
        return true;
    }
}

// Instantiate each method individually and export
export const v = {
    string: () => new ValidatorBuilder().string(),
    number: () => new ValidatorBuilder().number(),
    required: () => new ValidatorBuilder().required(),
}

// v.string().required()
```

---

## 🌐 *Proxy: Por que usar esse interceptador?*
O Proxy em JavaScript atua como um intermediário entre o código e o objeto-alvo, permitindo interceptar e redefinir comportamentos padrão de operações como leitura, escrita, verificação e exclusão de propriedades. Isso torna possível adicionar lógica personalizada a interações comuns com objetos, como validação, logging, formatação ou controle de acesso.

Um Proxy é criado a partir de dois parâmetros: o objeto-alvo, que é o objeto original que se deseja monitorar ou proteger, e o handler, um objeto que define funções especiais chamadas de traps. Essas traps funcionam como interceptadores, permitindo capturar e redefinir operações específicas feitas no objeto.

As traps mais comuns usadas em Proxy são:

| Trap             | Intercepta...                                |
|------------------|----------------------------------------------|
| `get`            | Leitura de propriedade (`obj.prop`)          |
| `set`            | Escrita de propriedade (`obj.prop = val`)    |
| `has`            | Verificação de existência (`'prop' in obj`)  |
| `deleteProperty` | Exclusão de propriedade (`delete obj.prop`)  |
| `ownKeys`        | Listagem de propriedades (`Object.keys(obj)`)|

Essas traps fornecem controle total sobre como as propriedades de um objeto são acessadas ou modificadas, permitindo comportamentos como a simulação de propriedades dinâmicas, proteção contra alterações indesejadas, e atualização automática de interfaces com base em mudanças no estado do objeto.

## 🌐 *Proxy: Why Use This Interceptor?*
The Proxy in JavaScript acts as an intermediary between the code and the target object, allowing interception and redefinition of default behaviors for operations such as reading, writing, checking, and deleting properties. This makes it possible to add custom logic to common object interactions, such as validation, logging, formatting, or access control.

A Proxy is created using two parameters: the target object, which is the original object you want to monitor or protect, and the handler, an object that defines special functions called traps. These traps work as interceptors, enabling the capture and redefinition of specific operations performed on the object.

The most commonly used traps in a Proxy are:

| Trap             | Intercepts...                                |
|------------------|----------------------------------------------|
| `get`            | Property read (`obj.prop`)                   |
| `set`            | Property write (`obj.prop = val`)            |
| `has`            | Property existence check (`'prop' in obj`)   |
| `deleteProperty` | Property deletion (`delete obj.prop`)        |
| `ownKeys`        | 	Property listing (`Object.keys(obj)`)       |

These traps provide full control over how an object's properties are accessed or modified, enabling behaviors such as dynamic property simulation, protection against unwanted changes, and automatic interface updates based on changes in the object’s state.

### **Vantagens de usar Proxy:**

1. **Controle sobre operações**: Permite interceptar ações como leitura, escrita, exclusão e verificação de propriedades em objetos, oferecendo total controle sobre como eles se comportam.
2. **Validação centralizada**: Toda a lógica de validação pode ser concentrada no Proxy, evitando repetição de código e mantendo o comportamento consistente em toda a aplicação.
3. **Reatividade e observabilidade**: É possível reagir automaticamente a alterações em propriedades, facilitando a implementação de comportamentos reativos (como atualização de UI com base em dados).
4. **Simulação de propriedades dinâmicas**: Propriedades que não existem no objeto original podem ser simuladas ou calculadas sob demanda, mais flexível e inteligente.

### **Advantages of Using Proxy**

1. **Operation control**: Allows interception of actions such as reading, writing, deleting, and checking properties in objects, providing full control over how they behave.  
2. **Centralized validation**: All validation logic can be concentrated inside the Proxy, avoiding code duplication and maintaining consistent behavior throughout the application.  
3. **Reactivity and observability**: Enables automatic reactions to property changes, facilitating the implementation of reactive behaviors (such as updating the UI based on data changes).  
4. **Dynamic property simulation**: Properties that don't exist in the original object can be simulated or computed on demand, making the system more flexible and intelligent.

### 🧱 **Exemplo prático no projeto:**

No helper, existe uma função que utiliza o Proxy para interceptar operações sobre um objeto com informações do usuário, realizando validações com base em um esquema predefinido.

O Proxy é configurado com um handler personalizado, que define uma função set. Essa função substitui a atribuição normal de propriedades, permitindo executar lógica personalizada sempre que um valor é atribuído ao objeto.

Sempre que uma propriedade (como name ou age) recebe um valor:
  
- O handler set intercepta a operação.
- Se o valor for válido conforme o esquema, ele é salvo no objeto data.
- Se o valor for inválido, ele é armazenado no objeto errors, junto com a mensagem de erro.

Dessa forma, o objeto original do usuário atua como uma interface dinâmica, que direciona os dados para data ou errors de acordo com as regras de validação, sem alterar diretamente o objeto original.

### 🧱 **Practical Example in the Project:**

In the helper, there is a function that uses a Proxy to intercept operations on an object containing user information, performing validations based on a predefined schema.

The Proxy is configured with a custom handler that defines a `set` function. This function replaces the default property assignment behavior, allowing custom logic to run whenever a value is assigned to the object.

Whenever a property (such as `name` or `age`) receives a value:

- The `set` handler intercepts the operation.
- If the value is valid according to the schema, it is stored in the `data` object.
- If the value is invalid, it is stored in the `errors` object along with an error message.

This way, the original user object acts as a dynamic interface that routes values to either `data` or `errors` according to the validation rules, without directly modifying the original object.


```js
// helpers.js
export function validatedProxy(schema, initialData = {}) {
    const objTarget = {
        data: {},
        errors: {}
    }
    
    const handler = {
        // SET -> Assignment interceptor, called when a value is assigned using obj[prop] = value
        // On success, returns true
        // On failure (invalid value), returns false
        set(target, prop, value) {

            // Retrieves the validation rule from the schema based on the property
            const validator = schema[prop];

            // If the field is not defined in the validator, ignore it (skip assignment, just return true)
            if (!validator) return false;

            const result = validator.validate(value);

            // If the field is invalid, remove it from `data` and store the error message
            if (result !== true) {
                Reflect.deleteProperty(target.data, prop);
                target.errors[prop] = result
                return true
            } else {
                Reflect.deleteProperty(target.errors, prop);
            };

            // If the property is valid and defined in the schema, assign the value
            target.data[prop] = value;
            return true;
        },

        // GET -> Intercepts property access (e.g., obj[prop]), simply returns the value
        get(target, prop) {
            return target[prop];
        }
    }

    const proxy = new Proxy(objTarget, handler);

    // Iterates over the properties (or keys) of the schema object
    for(const key in schema){
        // Assigns initial values to the Proxy using the data provided, which triggers the SET handler
        proxy[key] = initialData[key]
    }

    // Return created object Proxy
    return proxy
}
```

---

## 🚀 Inicializar
### Passo 1: Instalar o Visual Studio Code
- Baixe e instale o [Visual Studio Code](https://code.visualstudio.com/).

### Passo 2: Instalar a Extensão Live Server
- Abra o VS Code e vá para a aba **Extensões** (`Ctrl+Shift+X`).
- Procure por **Live Server** e instale a extensão de **Ritwick Dey**.

### Passo 3: Abrir o Projeto
- Abra a pasta do projeto no VS Code (`File > Open Folder...`).

### Passo 4: Iniciar o Live Server
- Clique com o botão direito no arquivo `index.html` (ou arquivo de entrada) e selecione **Open with Live Server**.

### Passo 5: Parar o Live Server
- Para parar o servidor, clique no ícone de **parada** no canto inferior direito do VS Code.

Pronto! O projeto estará rodando no seu navegador com atualizações automáticas.

Open with Live Server

## 🚀 Initialize

### Step 1: Install Visual Studio Code
- Download and install [Visual Studio Code](https://code.visualstudio.com/).

### Step 2: Install the Live Server Extension
- Open VS Code and go to the **Extensions** tab (`Ctrl+Shift+X`).
- Search for **Live Server** and install the extension by **Ritwick Dey**.

### Step 3: Open the Project
- Open the project folder in VS Code (`File > Open Folder...`).

### Step 4: Start the Live Server
- Right-click on the `index.html` file (or entry file) and select **Open with Live Server**.

### Step 5: Stop the Live Server
- To stop the server, click the **stop** icon in the bottom-right corner of VS Code.

Done! The project will be running in your browser with automatic updates.

## 🔗 **Link Útil** / **Useful Link**
- [MDN - Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [Design Pattern Builder - GURU](https://refactoring.guru/design-patterns/builder)
