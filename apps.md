---
title: My Apps
layout: base
head-extra: noindex.html
nav-short: true
show-avatar: false
css:
  - /assets/css/portfolio.css
---
<div id="main-sections">
  <div id="portfolio-out" class="page-section grey-section">
    <div id="portfolio">
    <div class="section-title">
      My Apps
    </div>
    <h3 style="text-align: center;">If you like these apps, please consider <a href="https://monzo.me/bradleykennedy5/5?d=Support%20for%20Apps" target="_blank" rel="noopener">supporting me</a> to cover the cost of the server.</h3>
<h3 style="text-align: center;">Thank you!</h3>
      <div id="shinyapps-big">
        {% for app in site.data.apps %}
        <div class="shinyapp">
            <a class="applink" href="{{ app.url }}" target="_blank" rel="noopener">
              <img class="appimg" src="/assets/img/screenshots/{{ app.img }}" />
              <div class="apptitle">{{ app.title }}</div>
              <div class="appdesc">{{ app.description }}</div>
            </a>
          </div>
      {% endfor %}
      </div>
    </div>
  </div>
</div>