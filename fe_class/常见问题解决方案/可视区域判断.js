// el.offsetTop - document.documentElement.scrollTop <= viewPortHeight
function isInViewPortOfOne(el) {
  // viewPortHeight 兼容所有浏览器写法
  const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  const offsetTop = el.offsetTop
  const scrollTop = document.documentElement.scrollTop
  const top = offsetTop - scrollTop
  console.log('top', top)
  // 这里有个+100是为了提前加载+ 100
  return top <= viewPortHeight + 100
}

// el.getBoundingClientReact().top <= viewPortHeight
function isInViewPortOfTwo(el) {
  const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  const top = el.getBoundingClientRect() && el.getBoundingClientRect().top
  console.log('top', top)
  return top <= viewPortHeight + 100
}


// intersectionRatio > 0 && intersectionRatio <= 1
const io = new IntersectionObserver(ioes => {
  ioes.forEach(ioe => {
      const el = ioe.target
      const intersectionRatio = ioe.intersectionRatio
      if (intersectionRatio > 0 && intersectionRatio <= 1) {
          loadImg(el)
          io.unobserve(el)
      }
      el.onload = el.onerror = () => io.unobserve(el)
  })
})
// 执行交叉观察器
function isInViewPortOfThree(el) {
  io.observe(el)
}