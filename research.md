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

<div class="researcher-profiles">
  <a href="https://orcid.org/0000-0003-4636-2210" aria-label="View ORCID record" target="_blank" rel="noopener noreferrer" class="profile-card">
  <img src="/assets/img/logos/ORCIDiD_icon.png" alt="ORCID iD"/>
  <span>0000-0003-4636-2210</span>
</a>

<a href="https://scholar.google.co.uk/citations?user=5GAAfKoAAAAJ&hl=en" aria-label="Google Scholar Profile" target="_blank" rel="noopener noreferrer" class="profile-card">
  <img src="/assets/img/Google_Scholar_logo.png" alt="Google Scholar Profile"/>
  <span>Google Scholar Profile</span>
</a>

<a href="https://www.scopus.com/authid/detail.uri?authorId=57233351700" aria-label="Scopus Profile" target="_blank" rel="noopener noreferrer" class="profile-card">
  <img src="/assets/img/logos/scopus-logo.png" alt="Scopus Profile"/>
  <span>Scopus Profile 57233351700</span>
</a>

<a href="https://osf.io/ekmyr" aria-label="Open Science Framework" target="_blank" rel="noopener noreferrer" class="profile-card">
<img src="/assets/img/osf-logo-small.png" alt="Open Science Framework"/>
  <span>Open Science Framework</span>
</a>
</div>

## Projects:

<div id="shinyapps-big">
        {% for project in site.data.projects %}
        {% if project.url %}
          <div class="shinyapp">
              <a class="applink" href="{{ project.url }}" target="_blank" rel="noopener">
              <img class="appimg" src="/assets/img/screenshots/{{ project.img }}" />
              <div class="apptitle">{{ project.title }}</div>
              <div class="appdesc">{{ project.description }}</div>
            </a>
          </div>
        {% else %}
          <div class="shinyapp">
            <img class="appimg" src="/assets/img/screenshots/{{ project.img }}" />
            <div class="apptitle">{{ project.title }}</div>
            <div class="appdesc">{{ project.description }}</div>
          </div>
        {% endif %}
        {% endfor %}
  </div>

<div id="content-desktop">
<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/6XZ54ijJYSk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>
</div>
