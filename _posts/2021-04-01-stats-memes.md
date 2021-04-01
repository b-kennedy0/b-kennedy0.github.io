---
title: Stats Memes
subtitle: Just a bit of fun
tags: [fun]
readtime: false
last-updated: 01/04/2021
permalink: /blog/stats-memes/
thumbnail-img: /assets/img/blog/stats-memes/meme-icon.jpeg
layout: post
head-extra: carousel.html
---
<html>
.carousel-container
    .carousel.my-carousel.carousel--translate
    - var panels = ['F', 'G', 'H', 'I', 'J']
    each val in panels
      input.carousel__activator(type="radio", name="carousel", id=val, checked=(val == panels[0]))
    each val, idx in panels
      .carousel__controls
        label.carousel__control.carousel__control--backward(for=`${(idx == 0) ? panels[panels.length - 1] : panels[idx - 1]}` )
        label.carousel__control.carousel__control--forward(for= `${(idx == panels.length - 1) ? panels[0] : panels[idx + 1]}`)
    .carousel__track
      each val in panels
        li.carousel__slide
          h1= val
    .carousel__indicators
      each val in panels
        label.carousel__indicator(for=val)
</html>

