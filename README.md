# vk-test


## Задание:
Напишите код, который будет преобразовывать JSON с описанием контента формы — в готовую вёрстку.
JavaScript-фреймворками и библиотеками, CSS-препроцессоры и шаблонизаторами пользоваться нельзя.
Написать документацию по разработанному формату описания формы и работе модуля.
Обратить внимание на удобство использования кода как библиотечного модуля.

___
## Оглавление
-  [Установка](#Установка)
-  [Описание формы (JSON)](#Описание-формы-(JSON))
    -  [Fieldsets](#Fieldsets)
    -  [Data](#Data)
    -  [Submits](#Submits)
    -  [Theme](#Theme)
-  [В разработке](#В-разработке)


___


## Установка

#### 1. Подключите CSS
```html
<link rel="stylesheet" href="style-tiny-form.css">
```

#### 2. Подготовте разметку HTML
```html
<form class="tiny-form">
</form>
```

#### 3. Подключите скрипт
```html
<script src="js/tiny-form-api.js"></script>
```

___


## Описание формы (JSON)

JSON представляет из себя объект включающий в себя четыре базовых ключа:
```html
{
  "fieldsets": [...],
  "data": [...],
  "submits": [...],
  "theme": true/false
}
```
| `[fieldsets](#Fieldsets)` | [ ] | Группировка элементов формы по категориям. |
| `[data](#Data)` | [ ] | Описывает элементы формы. |
| `[submits](#Submits)` | [ ] | Создание кнопок. |
| `[theme](#Theme)` | true<br> false | Добавляет выбор светлой или тёмной темы. |


| *Ключ* | *Значение* | *Описание* |
| --- | :---: | --- |
| `fieldsets` | [ ] | Группировка элементов формы по категориям. |
| `data` | [ ] | Описывает элементы формы. |
| `submits` | [ ] | Создание кнопок. |
| `theme` | true<br> false | Добавляет выбор светлой или тёмной темы. |


___


## Fieldsets
Количество объектов не ограничено.

| *Ключ* | *Значение* | *Описание* |
| --- | :---: | --- |
| `id` | "..." | Значение произвольное, но уникальное для каждой группы. |
| `legend` | "..." | Заголовок группы объединяемых элементов. <br> Значение скрыто. |
| `title` | true<br> false | Показывает "legend". <br> Изначальное значение: false (скрыто). |

**Пример:**
```html
"fieldsets": [
  {
    "id": "contacts",
    "legend": "Контактная информация",
    "title": true
  }
]
```
___

## Data
Количество объектов не ограничено.

| *Ключ* | *Свойства* | *Значение* | *Описание* |
| --- | :---: | :---: | --- |
| `fieldset` | --- | "..." | Значение такое же, что в группе `fieldsets: [{id:"..."}]`, в которую нужно поместить данный элемент |
| `label` | --- | "..." | Заголовок или текстовая метка, связывающие с собой элемент формы <br> (обычно описывают, какую информацию нужно написать в поле формы) |
| `inputs` | :arrow_double_down: | [...] | Массив, содержащий объекты с описанием полей формы (элементов)|
|  | `type` | text<br> number<br> select<br> tel<br> email |  - вводить нужно только текст<br> - вводить нужно только цифровые значения<br> - раскрывающийся список, а также список с выбором ответов<br> - для ввода номера телефона<br> - для ввода эл.почты|
|  | `options` | {...} | Список ответов для элемента с типом `select`.<br> Объект, где ключ - слово прописывается латиницей (en), значение - любое (en/ru/...)  |
|  | `id` | "..." | Индентификатор (значение не дольно повторяться)  |
|  | `placeholder` | "..." | Выводит подсказывающий текст в поле формы |
|  | `min` | "..." | Нижнее значение для ввода числа или количество символов разрешенных в тексте |
|  | `max` | "..." | Верхнее значение для ввода числа или количество символов разрешенных в тексте |
|  | `required` | true<br> false | Обязательное для заполнения поле. <br> Изначальное значение: false. |
|  | `changes` | true<br> false | Поле для информации, которая, возможно, на данный момент изменилась. <br> Изначальное значение: false (скрыто). |
|  | `latin` | true<br> false | Поле для перевода данных на латиницу.<br> Изначальное значение: false (скрыто). |
|  | `row` | "..." | Используется, если элементы формы, принадлежащие к одному `inputs`, нужно разместить в строку.<br> Уникальное значение прописывается у каждого элемента.<br> Изначальное значение: false. |


**Пример:**
```html
"data": [
  {
    "fieldset": "info",
    "label": "Семейное положение",
    "inputs": [
      {
        "type": "select",
        "options": {
          "married": "женат/замужем",
          "divorced": "разведён",
          "single": "холост"
        },
        "id": "marital-status",
        "placeholder": "Иванов",
        "min": 1,
        "max": 20,
        "required": true,
        "changes": true,
        "latin": true,
        "row": "birth"
      },
      {
        ...,
        "row": "birth"
      }
    ]
  },
  {...}
]
```

___


## Submits

| *Ключ* | *Значение* | *Описание* |
| --- | :---: | --- |
| `url` | "..." | Ссылка на сервер, куда отпраляются данные формы |
| `type` | submit | Тип кнопки: для отправки данных формы на сервер <br> *в разработке: обычная кнопка и для очистки формы* |
| `text` | "..." | Проивольный текст для кнопки. <br> По умолчанию: "Отправить" |
| `rights` | true<br> false | Если предворительно перед отправкой и обработкой данных нужно получить согласие пользователя. <br> Изначальное значение: false (скрыто). |
| `rightsText` | "..." | Текс соглашения с пользователем.|

**Пример**
```html
"submits": [
    {
      "url": "www.example.com",
      "type": "submit",
      "text": "Полететь на Марс",
      "rights": true,
      "rightsText": "Ставя галочку, я подтверждаю, что поставил её в хорошем настроении и в трезвом состоянии"
    }
  ]
```

___

## Theme
По умолчанию действует одна тема - светлая.
При добавлении выбора тёмной темы, в правом верхнем углу располагается кнопка переключения в виде планеты.


___


## В разработке
1. Оптимизация, "разбитие" кода на модули
2. Добавление кнопок для очистки формы + блокировка кнопоки для отправки до валидного заполнения формы.
3. Блокирование полей формы по выбору.
4. Валидация полей с латиницей, с номером телефона.
5. Добавление эелементов формы: checkbox
6. Устранение ошибок при переполнении контента.


:arrow_up_small:[Вернуться наверх](#vk-test)
