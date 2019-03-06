# Boot

### Library that core of Botorjs include IoC, Loader and Alias

# Installation
```
npm install @botorjs/boot --save
```

# Setup and Example

* Example
```js

    import { Boot, Injectable, ServiceProvider } from '@botorjs/boot';

    var app = new Boot();
    class Service {
        public i: number = 1;
    }

    @Injectable()
    class TestClass {
        constructor(private _service: Service) {}

        public get service(): Service {
            return this._service;
        }
    }

    class ProviderTest extends ServiceProvider{
        register(app: Boot) {
            app.ioc.singleton(Service.name, Service);
            app.ioc.bind(TestClass.name, TestClass);
        }

        boot(app: Boot) {
            const service = app.get<Service>(Service);
            service.i++;
        }
    }

    // using ServicerProvider provider resource to app
    app.loader.add(ProviderTest);
    app.preload();
    var test = app.get<TestClass>(TestClass);
    expect(test.service.i).to.eql(2);

    // resolve class with inject
    var test2: TestClass = app.resolve(TestClass);
    expect(test2.service.i).to.eql(2);

    // using alias
    app.alias.add("test", "test1");
    app.ioc.bind("test1", "test_2");
    var val = app.get<string>("test");
    expect(val).to.eql("test_2");

    //
    app = new Boot();
    app.hook.on("app:preload:end", () => {
        console.log("work");
    })
    app.preload();

```



# API

## Boot

| Property   |      Description      |  Return |
|---------- |:-------------|------|
| hook  |  Hook event in Boot | Hook |
| alias |    centered   |   Alias |
| ioc | as ioc |    IoC |
| loader | as ioc fake |    IoC |
| resolve(target) | resolve a class target have inject |    object |
| get(target) | Get target in ioc |    any |
| preload() | preload of Boot |    void |


## Hook
*  Hook event of Boot

| Property   |      Description      |
|---------- |:-------------|
| on(name, callback)  |  listen event | 
| emit(name, data) |    emit event   |

## Alias
* Alias name or fuction in Ioc

| Property   |      Description      |
|---------- |-------------|
| get(target)  |  get target was alias  | 
| add(tagert, alias) |    add new alias or overwrite  aslias exits with same target name or function   |
| has(tagert) |    check alias have exist    |

## IoC

* IoC manager container and inject the dependencies, now manager


| Property   |      Description      |
|---------- |-------------|
| get(target)  |  get target was alias  | 
| resolve(target)  |  get target was alias  | 
| singleton(name, tagert, [type = TypeContainer.Check]) |  add singleton container  |
| bind(name, tagert, [type = TypeContainer.Check]) |  add bind container  |
| has(tagert) |    check a container have exist in ioc   |
| remove(name) |    remove a container in ioc with name container    |

## Loader

* Loader provider resource to app , example as Ioc, Listen hook, register component to app 

| Property   |      Description      |
|---------- |:-------------|
| add(provider)  |  add new Provider, if app before preload will add provider waiti unitl preload, if app after preload will addd provider and regiser and boot right away 
| preload() |   preload of Loader   |