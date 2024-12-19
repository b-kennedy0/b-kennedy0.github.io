---
layout: page
title: Research
cover-img: "/assets/img/brain_cover.jpg"
css: /assets/css/box.css
show-avatar: false
nav-short: true
css:
  - /assets/css/portfolio.css
---
## Researcher Profiles:
<a href="https://orcid.org/0000-0003-4636-2210" aria-label="View ORCID record" target="_blank" rel="noopener noreferrer">
<img
    src="/assets/img/logos/ORCIDiD_icon.png"
    alt="ORCID iD"/>
    0000-0003-4636-2210
</a>

<a href="https://scholar.google.co.uk/citations?user=5GAAfKoAAAAJ&hl=en" aria-label="Google Scholar Profile" target="_blank" rel="noopener noreferrer">
<img
    src="/assets/img/Google_Scholar_logo.png"
    alt="Google Scholar Profile"/>
    Google Scholar Profile
</a>

<a href="https://www.scopus.com/authid/detail.uri?authorId=57233351700" aria-label="Scopus Profile" target="_blank" rel="noopener noreferrer">
<img
    src="/assets/img/logos/scopus-logo.png"
    alt="Scopus Profile"/>
    Scopus Profile 57233351700
</a>

<a href="https://osf.io/ekmyr" aria-label="Open Science Framework" target="_blank" rel="noopener noreferrer">
<img
    src="/assets/img/osf-logo-small.png"
    alt="Open Science Framework"/>
    Open Science Framework
</a>

## Projects:

<div id="shinyapps-big">
        {% for project in site.data.projects %}
        <div class="shinyapp">
            {if project.url != "" %}
              <a class="applink" href="{{ project.url }}" target="_blank" rel="noopener">
              <img class="appimg" src="/assets/img/screenshots/{{ project.img }}" />
              <div class="apptitle">{{ project.title }}</div>
              <div class="appdesc">{{ project.description }}</div>
            </a>
            {% else %}
              <img class="appimg" src="/assets/img/screenshots/{{ project.img }}" />
              <div class="apptitle">{{ project.title }}</div>
              <div class="appdesc">{{ project.description }}</div>
            {% endif %}
        </div>
      {% endfor %}
</div>

<div id="content-desktop">
<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/6XZ54ijJYSk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>
</div>