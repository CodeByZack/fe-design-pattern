---
layout: ../../layouts/PostLayout.astro
title: "单列模式"
description: "在我们的应用程序中共享一个全局实例"
---

单例是只实例化一次，并且可以全局访问的类。这个单一实例可以在我们的整个应用程序中共享，这使得单例非常适合管理应用程序中的全局状态。

首先，让我们看看使用 ES2015 类实现的单例是什么样的。此示例将构建一个具有以下方法的 `Counter` 类：

- 返回实例值的 `getInstance` 方法
- 返回 `counter` 变量值的 `getCount` 方法
- 将 `counter` 值加一的 `increment` 方法
- 将 `counter` 值减一的 `decrement` 方法

```javascript
let counter = 0;

class Counter {
  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}
```

然而，这个类不符合单例的标准！单列应该只能被**实例化一次**。但是，我们可以创建 `Counter` 类的多个实例。

```javascript
let counter = 0;

class Counter {
  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const counter1 = new Counter();
const counter2 = new Counter();

console.log(counter1.getInstance() === counter2.getInstance()); // false
```

通过两次调用 `new` 方法，我们将得到两个不同的实例 `counter1` 和 `counter2` 。 `counter1` 和 `counter2` 上的 `getInstance` 方法返回了对不同实例的引用：它们并不严格相等！

<video autoPlay src="/public/videos/singleton-1.webm" type="video/webm" controls="" ></video>

让我们确保只能创建 `Counter` 类的**单个**实例。

确保只能创建单个实例的一种方法是创建一个名为 `instance` 的变量。在 `Counter` 的构造函数中，我们可以在创建新实例时将 `instance` 变量设置为对实例的引用。然后我们可以通过检查 `instance` 变量是否已经有值来阻止新的实例化。如果已经有值了，代表实例已经存在。这不应该发生：应该抛出一个错误让用户知道。

```javascript
let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const counter1 = new Counter();
const counter2 = new Counter();
// Error: You can only create one instance!
```

完美！我们现在无法再创建多个实例了。

让我们从 `counter.js` 文件中导出 `Counter` 实例。但在这之前，我们应该冻结实例。 `Object.freeze` 方法确保其它代码不能修改单例，无法添加或修改冻结实例上的属性，这降低了意外覆盖单例上的值的风险。

```javascript
let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const singletonCounter = Object.freeze(new Counter());
export default singletonCounter;
```

让我们看一下实现 `Counter` 示例的应用程序。我们有以下文件：

- `counter.js`: 包含 `Counter` 类, 导出 **Counter 实例** 作为默认导出
- `index.js`：加载 `redButton.js` 和 `blueButton.js` 模块
- `redButton.js`：引入 `Counter` ，将 `Counter` 的 `increment` 方法作为事件监听器添加到**红色按钮**上，并且调用 `getCount` 方法打印 `counter` 的当前值
- `blueButton.js`：引入 `Counter`，将 `Counter` 的 `increment` 方法作为事件监听器添加到**蓝色按钮**上，并且调用 `getCount` 方法打印 `counter` 的当前值

<iframe src="https://codesandbox.io/embed/singleton-1-forked-49vsv6?expanddevtools=1&fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="singleton-1"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

`blueButton.js` 和 `redButton.js` 都从 `counter.js` 导入了**相同的**实例。此实例在两个文件中都作为 `Counter` 变量导入。

<video autoPlay src="/public/videos/singleton-2.webm" type="video/webm" controls="" ></video>

当我们在 `redButton.js` 或 `blueButton.js` 中调用 `increment` 方法时，两个文件中 Counter 实例的 `counter` 属性值都会更新。我们点击红色或蓝色按钮并不重要：所有被引入的实例共享相同的值。这就是为什么即使我们在不同的文件中调用该方法，计数器也会一直加一。

<hr/>

## 权衡

将实例化限制为仅一个实例可能会节省大量内存空间。我们不必每次都为新实例设置内存，而只需为单个实例设置内存，该实例在整个应用程序中被引用。然而，单例实际上被认为是一种**反模式**，在 JavaScript 中可以（或..应该）避免使用。

在许多编程语言中，例如 Java 或 C++，不可能像在 JavaScript 中那样直接创建对象。在那些面向对象的编程语言中，我们需要创建一个类，类创建一个对象。创建的对象就是类实例的值，就像 上面示例中 `instance` 的值一样。

但是，上面示例中显示的类实现实际上有点矫枉过正。由于我们可以直接在 JavaScript 中创建对象，因此我们可以简单地使用一个常规对象来获得完全相同的结果。让我们介绍一下使用单例的一些缺点！

### 使用普通对象

让我们使用普通对象实现和上面相同的示例。然而这一次，计数器只是一个包含以下内容的对象：

- 一个 `count` 属性
- 一个 `increment` 方法，用来给 `count` 的值加一
- 一个 `decrement` 方法，用来给 `count` 的值减一

<iframe src="https://codesandbox.io/embed/singleton-2-forked-9r299t?expanddevtools=1&fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="singleton-2"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

由于对象是通过引用传递的，`redButton.js` 和 `blueButton.js` 都导入了对同一个 `counter` 对象的引用。在这两个文件中修改 `count` 的值都会修改 `counter` 的值，这在两个文件中都是可见的。
测试

### 测试

测试依赖单例的代码可能会很棘手。由于我们不能每次都创建新的实例，所以所有的测试都依赖于对上一次测试的全局实例的修改。在这种情况下，测试的顺序很重要，一个小的修改可能会导致整个测试套件失败。测试后，我们需要重置整个实例，以重置测试所做的修改。

<iframe src="https://codesandbox.io/embed/singleton-3-forked-cyxv5l?expanddevtools=1&fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="singleton-3 "
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

#### 隐藏依赖

当导入另一个模块时，在示例中为 `superCounter.js`，模块导入了实例，虽然可能并不明显。在其他文件中，例如示例中的 `index.js`，我们导入实例并调用了其方法。这样，如果我们不小心修改了实例中的值。这可能会导致意外行为，因为在整个应用程序中，实例是共享的，所以会影响到其它引用实例的地方。

<iframe src="https://codesandbox.io/embed/singleton-3-forked-62cqjx?expanddevtools=1&fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="singleton-3"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

#### 全局行为

一个单例实例应该能够在整个应用程序中被引用。全局变量本质上表现出相同的行为：由于全局变量在全局范围内可用，我们可以在整个应用程序中访问这些变量。

拥有全局变量通常被认为是一个糟糕的设计决策。全局范围污染最终可能会意外覆盖全局变量的值，这会导致许多意外行为。

在 ES2015 中，创建全局变量是相当不常见的。新的 let 和 const 关键字通过将用这两个关键字声明的变量保持在块范围内来防止开发人员意外污染全局范围。 JavaScript 中的新模块系统通过能够从模块中导出值并将这些值导入其他文件，从而在不污染全局范围的情况下更容易地创建全局可访问的值。

但是，单例的常见用例是在整个应用程序中具有某种**全局状态**。让代码库的多个部分依赖同一个可变对象可能会导致意外行为。

通常，代码库的某些部分会修改全局状态中的值，而其他部分会使用该数据。这里的执行顺序很重要：我们不想在没有数据可消费时（还）不小心先消费数据！随着应用程序的增长，理解使用全局状态时的数据流会变得非常棘手，而且许多组件相互依赖。

#### React 中的状态管理

在 React 中，我们经常通过 **Redux** 或 **React Context** 等状态管理工具来管理全局状态，而不是使用单例。尽管它们的全局状态行为可能看起来与单例的行为相似，但这些工具提供的是**只读状态**，而不是单例的可变状态。使用 Redux 时，只有纯函数化简器才能在组件通过调度程序发送动作后更新状态。

尽管拥有全局状态的缺点不会通过使用这些工具而神奇地消失，但我们至少可以确保全局状态按照我们预期的方式发生变化，因为组件无法直接更新状态。

<hr/>


## 参考

- [Do React Hooks replace Redux](https://medium.com/javascript-scene/do-react-hooks-replace-redux-210bab340672) - Eric Elliott
- [JavaScript Design Patterns: The Singleton](https://www.sitepoint.com/javascript-design-patterns-singleton/) - Samier Saeed
- [Singleton](https://refactoring.guru/design-patterns/singleton) - Refactoring Guru


