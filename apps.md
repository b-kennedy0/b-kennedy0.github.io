---
title: My Apps
layout: base
head-extra: noindex.html
nav-short: true
show-avatar: false
css:
  - /assets/css/portfolio.css
---
<h3 style="text-align: center;">If you like these apps, please consider <a href="https://monzo.me/bradleykennedy5/5?d=Support%20for%20Apps" target="_blank" rel="noopener">supporting me</a> to cover the cost of the server.</h3>
<h3 style="text-align: center;">Thank you!</h3>

<div id="main-sections">
  <div id="portfolio-out" class="page-section grey-section">
    <div id="portfolio">
    <div class="section-title">
      My Apps
    </div>
      <div id="shinyapps-big">
        {% for app in site.data.portfolio %}
        <div class="shinyapp">
            <a class="applink" href="{{ app.url }}">
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

<!--- 
---

<a title="Open App" href="http://bradk.co.uk/covid" target="_blank" rel="noopener"><img style="border-width: 10px; margin-right: 20px; margin-left: 20px; float: right;" src="https://raw.githubusercontent.com/b-kennedy0/COVID19-Vaccine-App/main/www/images/Corona_Vaccine.png" alt="COVID-Vaccine-Logo" width="160" height="160" /></a>
# COVID-19 Vaccination Progress  
#### Click/Tap icon to run >>  
The app was created to enable the centralised sharing of UK-wide vaccination progress. Each NHS service (England, Wales, Scotland, Northern Ireland) are each publishing their vaccination data and this is collated into the <a href="https://coronavirus.data.gov.uk" target="_blank">Government Dashboard</a>. The Government Dashboard isn't the clearest at presenting the vaccine data so this app was created to do that. Created using R and RStudio.  

Click/Tap icon to view on Github >> <a title="Open Github" href="https://github.com/b-kennedy0/COVID19-Vaccine-App" target="_blank" rel="noopener"><img style="border-width: 10px; margin-right: 20px; margin-left: 20px;" src="https://github.com/b-kennedy0/b-kennedy0.github.io/blob/master/assets/img/github_icon.png?raw=true" alt="Github-icon" width="74" height="63" /></a>  

---
--->

<a title="Open App" href="https://openresearchcalendar.org" target="_blank" rel="noopener"><img style="border-width: 10px; margin-right: 20px; margin-left: 20px; float: right;" src="https://github.com/b-kennedy0/b-kennedy0.github.io/blob/master/assets/img/logos/ORC-badge.png?raw=true" alt="" width="165" height="160" /></a>
# Open Research Calendar  
#### Click/Tap icon to run >>  
The tool was created to serve the open research community in collating worldwide :earth_africa: open research events into one database. This translates onto a Google Calendar :calendar: which can be synced into a person’s own personal calendar (updating as new events get added). The tool is open source and is available to use for free.

Click/Tap icon to view on Github >> <a title="Open Github" href="https://github.com/openresearchcalendar/Open-Research-Calendar" target="_blank" rel="noopener"><img style="border-width: 10px; margin-right: 20px; margin-left: 20px;" src="https://github.com/b-kennedy0/b-kennedy0.github.io/blob/master/assets/img/github_icon.png?raw=true" alt="Github-icon" width="74" height="63" /></a>  


<a title="Open App" href="http://apps.bradk.co.uk/timetable" target="_blank" rel="noopener"><img style="border-width: 10px; margin-right: 20px; margin-left: 20px; float: right;" src="https://github.com/b-kennedy0/b-kennedy0.github.io/blob/master/assets/img/UOC-Logo_2010.jpg?raw=true" alt="UOCLogo" width="160" height="50" /></a>
# Chester Timetable convert to Calendar (ics) file
#### Click/Tap icon to run >>  Note* Not publicly accessible, password required
This app loads staff timetables from the University of Chester and converts them to an ics file which can be imported into a Calendar.

Contact me directly for access >> <a title="Contact" href="https://bradleykennedy.co.uk/contact" target="_blank" rel="noopener"><img style="border-width: 10px; margin-right: 20px; margin-left: 20px;" src="https://github.com/b-kennedy0/b-kennedy0.github.io/blob/master/assets/img/email-icon.png?raw=true" alt="Email-icon" width="63" height="63" /></a>  

---

<a title="Open App" href="http://apps.bradk.co.uk/pilotdata" target="_blank" rel="noopener"><img style="border-width: 10px; margin-right: 20px; margin-left: 20px; float: right;" src="https://github.com/b-kennedy0/b-kennedy0.github.io/blob/master/assets/img/pilotdataicon.png?raw=true" alt="Pilotdataicon" width="160" height="160" /></a>
# Pilot Data Explorer  
#### Click/Tap icon to run >>  
This app allows you to interact with data from the pilot study conducted as part of my PhD research. You can select two job roles and compare their characteristic ratings.  

Click/Tap icon to view on Github >> <a title="Open Github" href="https://github.com/BradKennedy-PhD/bradkennedy-phd.github.io/tree/main/studies/pilot/ShinyApp" target="_blank" rel="noopener"><img style="border-width: 10px; margin-right: 20px; margin-left: 20px;" src="https://github.com/b-kennedy0/b-kennedy0.github.io/blob/master/assets/img/github_icon.png?raw=true" alt="Github-icon" width="74" height="63" /></a>  

---

<a title="Open App" href="https://bradley-kennedy.shinyapps.io/632VGS/" target="_blank" rel="noopener"><img style="border-width: 10px; margin-right: 20px; margin-left: 20px; float: right;" src="https://github.com/b-kennedy0/b-kennedy0.github.io/blob/master/assets/img/logos/632vgscrest.png?raw=true" alt="632vgs-crest" width="120" height="159" /></a>
# 632VGS Weight App  
#### Click/Tap icon to run >>  
This app was created to assist glider pilots with weight and balance calculations for the aircraft at [632 VGS](https://632vgs.co.uk/) RAF Ternhill & RAF Woodvale.  

Click/Tap icon to view on Github >> <a title="Open Github" href="https://github.com/b-kennedy0/632vgs" target="_blank" rel="noopener"><img style="border-width: 10px; margin-right: 20px; margin-left: 20px;" src="https://github.com/b-kennedy0/b-kennedy0.github.io/blob/master/assets/img/github_icon.png?raw=true" alt="Github-icon" width="74" height="63" /></a>