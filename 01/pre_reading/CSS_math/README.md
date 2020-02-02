# CSS 与数学的巧妙运用

## [颜色](./gradient.html)

- 渐变
  - linear-gradient(deg, color stop)
  - radial-gradient(size at position, color stop)
- 混合模式 mix-blend-mode

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>gradient</title>
  </head>
  <style>
    @import url("https://fonts.googleapis.com/css?family=Lobster");
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    :root {
      --tip-diameter: 10px;
      --tip-length: 15px;
      --w: 200px;
      --h: 100px;
      --handle-diameter: 10px;
      --handle-length: 150px;
    }

    body {
      background-color: rgb(184, 26, 149);
    }

    .g {
      position: relative;
      width: var(--w);
      height: var(--h);
      margin: 4rem auto var(--handle-length);
      background-image: radial-gradient(
          150px 500px ellipse at 50% 100%,
          rgba(248, 195, 205, 0.5) 0%,
          rgba(248, 195, 205, 1) 20%,
          #000000 20%,
          rgba(244, 167, 185, 1) 20%,
          transparent 100%
        ), radial-gradient(
          150px 250px ellipse at 50% 100%,
          transparent 20%,
          rgba(244, 167, 185, 1) 40%,
          #000000 40%,
          rgba(232, 122, 144, 1) 40%,
          transparent 100%
        ), radial-gradient(
          150px 252px ellipse at 50% 100%,
          transparent 40%,
          rgba(232, 122, 144, 1) 60%,
          #000000 60%,
          rgba(208, 90, 110, 1) 60%,
          transparent 100%
        ), radial-gradient(
          150px 165px ellipse at 50% 100%,
          transparent 60%,
          rgba(208, 90, 110, 1) 80%,
          #000000 80%,
          rgba(219, 77, 109, 1) 80%,
          transparent 100%
        ), radial-gradient(150px 124px ellipse at 50% 100%, transparent 80%, rgba(
              208,
              90,
              110,
              1
            ) 80%, rgba(219, 77, 109, 1) 100%);
      border-radius: 50% 50% 0% 0% / 100% 100% 0% 0%;
    }

    .g::before {
      content: "";
      position: absolute;
      top: calc(var(--tip-length) * -1);
      left: 50%;
      width: var(--tip-diameter);
      height: var(--tip-length);
      background-image: linear-gradient(90deg, #f8c3cd, #d05a6e);
      clip-path: polygon(
        calc(var(--tip-diameter) / 2) 0,
        0 var(--tip-length),
        var(--tip-diameter) var(--tip-length)
      );
      transform: translateX(-50%);
    }

    .g::after {
      content: "";
      position: absolute;
      bottom: calc(var(--handle-length) * -1);
      left: 50%;
      width: var(--handle-diameter);
      height: var(--handle-length);
      background-image: linear-gradient(
        90deg,
        #202020,
        #404040 5%,
        #606060 15%,
        #808080 40%,
        #858585 50%,
        #808080 60%,
        #606060 85%,
        #404040 95%,
        #202020
      );
      transform: translateX(-50%);
    }

    .g > p {
      position: absolute;
      top: calc(var(--handle-length) + 3rem);
      left: -10%;
      font-family: "Lobster", cursive, "Helvetica", sans-serif;
      font-size: 4rem;
      color: rgb(245, 185, 201);
    }
  </style>

  <body>
    <div class="g">
      <p>Umbrella</p>
    </div>
  </body>
</html>
```

## [动画](./animation.html)

- transform: matrix()
- (transition|animation)-timing-function: cubic-bezier()

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>animation</title>
    <link
      href="https://cdn.bootcss.com/minireset.css/0.0.2/minireset.min.css"
      rel="stylesheet"
    />
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
    <style>
      html {
        touch-action: manipulation;
      }

      :root {
        --c: 4;
      }

      body {
        background-color: #5c5a5c80;
      }

      .list {
        height: 100vh;
      }

      .list .container {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 2rem 1rem 0;
        overflow-x: hidden;
        overflow-y: auto;
      }

      .list .container.extend {
        min-width: 100vw;
        width: calc(95vw * var(--c));
      }

      .list container.extend > * {
        width: 100%;
      }

      .item {
        position: relative;
        display: inline-block;
        width: 100%;
        max-width: 90vw;
        height: 130px;
        max-height: 85vh;
        margin: 0.5rem 0;
        padding: 2.4rem 2rem 3%;
        background-color: white;
        border-radius: 15px;
        transform: translate3d(0, 0, 0);
        transition: all 0.5s cubic-bezier(0.1, 1, 0, 1);
      }

      .item.extend {
        height: 90vh;
      }

      .item.bounce {
        transition: 0.4s cubic-bezier(0.48, 1.36, 0.51, 1.1);
      }

      .item::before {
        content: attr(data-name);
        position: absolute;
        top: 8%;
        right: 5%;
        width: 25%;
        height: 1.5rem;
        font-size: 1rem;
        color: white;
        text-align: center;
        background-color: #94a6b5;
        border-radius: 6px;
        overflow: hidden;
      }

      .item * {
        transform: translate3d(0, 0, 0);
        user-select: none;
      }

      .distance {
        position: absolute;
        top: 10%;
        left: 13%;
        width: 15%;
        height: 0.9rem;
        background: #dce1ea linear-gradient(
            -90deg,
            transparent 50%,
            #17d7aa 50%
          ) no-repeat;
        border-radius: 2px;
        transform: matrix(1, 0, -0.3, 1, 0, 0);
      }

      .distance::before {
        content: "";
        position: absolute;
        top: 0;
        left: -40%;
        display: inline-block;
        width: 20%;
        height: 100%;
        background-color: #5c5a5c;
        transform: matrix(1, 0, 0.3, 1, 0, 0);
      }

      .distance::after {
        content: attr(data-d);
        position: absolute;
        display: inline-block;
        top: 0;
        left: 110%;
        font-size: 0.7rem;
        transform: matrix(1, 0, 0.3, 1, 0, 0);
      }

      .img {
        position: relative;
        display: inline-block;
        width: 40%;
        height: 100%;
        background: url("../img/car.jpg") no-repeat 0 0 / 300% 330%;
        clip-path: polygon(10% 20%, 95% 20%, 95% 80%, 10% 80%);
      }

      .img.extend {
        position: absolute;
        top: -2rem;
        left: 50%;
        width: 50%;
        height: 4rem;
        opacity: 0;
        animation: drivein 0.2s cubic-bezier(0.33, 0.95, 0.77, 1.01) 0.2s forwards;
      }

      @keyframes drivein {
        from {
          transform: matrix(1, 0, 0, 1, 0, 0);
          opacity: 0;
        }
        to {
          transform: translateX(-50%);
          opacity: 1;
        }
      }

      .detail {
        position: relative;
        display: flex;
        flex-flow: column nowrap;
        width: 57%;
        height: 100%;
        float: right;
        overflow: hidden;
      }

      .detail.extend {
        top: 15%;
        width: 100%;
        height: 95%;
        float: none;
        overflow: visible;
      }

      .detail h1 {
        position: absolute;
        display: inline;
        font-size: 1.2rem;
        font-weight: 550;
      }

      .detail .price {
        position: absolute;
        top: 33%;
        font-size: 2.4vw;
        line-height: 1.5rem;
      }

      .detail.extend .price {
        display: none;
      }

      .detail .desc {
        position: absolute;
        top: 66%;
      }

      .desc li {
        display: inline-block;
        padding: 1px 2px;
        font-size: 1.7vw;
        border: 1px solid #e9e8ea;
      }

      .detail.extend .desc {
        position: absolute;
        top: 0;
        right: 0;
      }
    </style>
  </head>

  <body>
    <div class="list">
      <div class="container">
        <div class="item" data-name="奇瑞eQ">
          <div class="distance" data-d="260km"></div>
          <div class="img"></div>
          <div class="detail">
            <h1>京000000</h1>
            <div class="price">0.1 元/分钟 + 1.5 元/公里</div>
            <ul class="desc">
              <li>4座</li>
              <li>白色</li>
              <li>日租</li>
              <li>员工优惠</li>
            </ul>
          </div>
        </div>

        <div class="item" data-name="科沃兹">
          <div class="distance" data-d="260km"></div>
          <div class="img"></div>
          <div class="detail">
            <h1>京11111</h1>
            <div class="price">0.1 元/分钟 + 1.5 元/公里</div>
            <ul class="desc">
              <li>4座</li>
              <li>白色</li>
              <li>日租</li>
            </ul>
          </div>
        </div>

        <div class="item" data-name="奇瑞eQ">
          <div class="distance" data-d="260km"></div>
          <div class="img"></div>
          <div class="detail">
            <h1>京22222</h1>
            <div class="price">0.1 元/分钟 + 1.5 元/公里</div>
            <ul class="desc">
              <li>4座</li>
              <li>白色</li>
              <li>日租</li>
              <li>员工优惠</li>
            </ul>
          </div>
        </div>

        <div class="item" data-name="奇瑞eQ">
          <div class="distance" data-d="260km"></div>
          <div class="img"></div>
          <div class="detail">
            <h1>京33333</h1>
            <div class="price">0.1 元/分钟 + 1.5 元/公里</div>
            <ul class="desc">
              <li>4座</li>
              <li>白色</li>
              <li>日租</li>
              <li>员工优惠</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <script>
      const items = $(".item");
      let flag = true;
      items.on("click", function(e) {
        $(".list .container").toggleClass("extend");
        let curi = 0;
        $.each(items, function(i, item) {
          if (e.currentTarget === item) return;
          $(item)
            .addClass("bounce")
            .toggleClass("extend")
            .children()
            .toggleClass("extend");
        });
        $(this)
          .removeClass("bounce")
          .toggleClass("extend")
          .children()
          .toggleClass("extend");
        let that = this;
        flag = !flag;
        if (flag) {
          setTimeout(function() {
            that.scrollIntoView({ behavior: "smooth" });
          }, 400);
        } else {
          setTimeout(function() {
            that.scrollIntoView();
          }, 0);
        }
      });
    </script>
  </body>
</html>
```
