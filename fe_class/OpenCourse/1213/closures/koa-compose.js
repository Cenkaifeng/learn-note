// koa 洋葱模型中间件

let middleware = [];

middleware.push(next => {
  console.log(1);
  next();
  console.log(1.1);
});

middleware.push(next => {
  console.log(2);
  next();
  console.log(2.1);
});

middleware.push(next => {
  console.log(3);
  next();
  console.log(3.1);
});

let fn = compose(middleware);
fn();

/*

1
2
3
3.1
2.1
1.1
*/

function compose(middlewares) {
  const copyMiddlewares = [...middlewares];
  let index = 0;

  const fn = () => {
    if (index >= copyMiddlewares.length) {
      return;
    }
    const middleware = copyMiddlewares[index];
    index++;

    return middleware(fn);
  };

  return fn;
}
