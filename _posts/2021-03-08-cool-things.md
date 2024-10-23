---
title: Cool things
subtitle: Awesome things I use/plan to use
tags: [tech, advice]
readtime: true
last-updated: 23/10/2024
permalink: /blog/cool-things/
thumbnail-img: /assets/img/blog/cool-things/cool-things-icon.png
cover-img: /assets/img/blog/cool-things/tech.jpg
author: Bradley J. Kennedy
layout: post
---
{: .box-note}
<i class="fas fa-exclamation icon-yellow" aria-hidden="true"></i> I don't update this post often, some links may no longer work, sorry!.

I am continuously inspired by tech and amazing things that make life easier. Here I'm attempting to keep track of them. I hope that by having this page, you might also find something useful.

### Contents
{:.no_toc}

* A markdown unordered list
{:toc}

---

## Computer setup

I currently have an Apple M1 Macbook Air 2020. The silicon chip makes this very quick! I have no problems running multiple programmes and lots of browser tabs. Many apps are getting silicon-specific updates.  

## Analysis

During my undergraduate and master's degrees, I conducted analyses through SPSS, but during my PhD, I learned to use [R](https://www.r-project.org/){:target="_blank" rel="noopener"} (and [RStudio](https://rstudio.com/products/rstudio/download/){:target="_blank" rel="noopener"}). Some resources to get started:

* [Getting Used to R, RStudio, and R Markdown](https://ismayc.github.io/rbasics-book/index.html){:target="_blank" rel="noopener"}
* [R for Data Science](https://r4ds.had.co.nz/){:target="_blank" rel="noopener"}
* [R Studio Cheatsheets](https://rstudio.com/resources/cheatsheets/){:target="_blank" rel="noopener"}

I mostly use [RMarkdown](https://rmarkdown.rstudio.com/){:target="_blank" rel="noopener"}, which is great for compiling all your code and results into a PDF that you can then share with your collaborators. [Bookdown Link](https://bookdown.org/yihui/rmarkdown/){:target="_blank" rel="noopener"}

I haven't yet gotten to it, but I'm planning to learn to use [Binder](https://mybinder.org/){:target="_blank" rel="noopener"}, so I can share my code in an interactive, reproducible way for each of my studies.

For those who are still wary of writing code for analysis, [JASP](https://jasp-stats.org/){:target="_blank" rel="noopener"} and [Jamovi](https://www.jamovi.org/){:target="_blank" rel="noopener"} are great alternatives (with user interface similar to SPSS).

I share my code on [Open Science Framework](https://osf.io/ekmyr/){:target="_blank" rel="noopener"} or [Github](https://github.com/BradKennedy-PhD){:target="_blank" rel="noopener"}.

## Coding

For coding, I use [VS Code](https://code.visualstudio.com/){:target="_blank" rel="noopener"} - It is a comprehensive environment for writing and editing code. It contains many powerful tools, such as debugging, synchronising with Git, and even AI code checking! It takes a little bit of getting used to, but it is worth the investment.

A useful tool for converting Microsoft Word-written pieces into markdown (including links and heading formatting etc.) - [Paste to Markdown](https://euangoddard.github.io/clipboard2markdown/){:target="_blank" rel="noopener"}  

If writing code for a script, then this [JSON Validator](https://jsonlint.com/){:target="_blank" rel="noopener"} is super helpful as I can never keep track of all the [{brackets}].

## Automating

One of my greatest desires, across both my personal and professional life, is to automate as much as possible. For a couple of reasons. First, it reduces error, and automating the boring data entry or manual administration removes nearly all* of the human error. Secondly, I'm busy! I don't **want** to do any of the administration/data entry/formatting/checking. The more of these tasks I can fully automate, the more time I will have to do other things!

\* *It is still fairly easy to make a mistake in the automation programming!*

[Make](https://www.make.com/en){:target="_blank" rel="noopener"} is a **SUPER** powerful online automation platform. I cannot recommend Make enough! I use it in my professional and personal life. Make can connect to a large number of other services (and even if the service you use isn't listed, they have a powerful API and web-hook service so that practically anything can be linked!). By linking together services, you can create a process. 
For example, Thing A triggers process B, which passes information to service C etc. The process you make can be as long/short, complex/simple as you require - take a look at just two examples below.

![Make Example 1](/assets/img/blog/cool-things/Make1.png)
*Example 1 - Automating voucher sending and mailing list sign-up*

![Make Example 2](/assets/img/blog/cool-things/Make2.png)
*Example 2 - Inventory management*

[Parsehub](https://www.parsehub.com/){:target="_blank" rel="noopener"} is a free web scraping service. I use this as part of an automation cycle to scrape new data from websites to make comparisons to feed into data dashboards. An example might be:

1. Make uses a webhook to trigger Parsehub
2. Parsehub scrapes a participant sign-up page
3. Parsehub scrapes the ID numbers of those who have completed the study
4. A Shinyapp uses Parsehub API to pull the latest data, comparing both lists
5. Shinyapp presents a dashboard indicating which participants completed the study and now require awarding credits

[Otter.ai](https://otter.ai/){:target="_blank" rel="noopener"} is a live transcription service. They offer 600 minutes per month (this may not be correct anymore, be sure to check!) on their free plan! You can live record a session with multiple speakers, and Otter will use AI technology to process the recording to determine who is speaking. You give it the names using the first few sentences, and it will process the remainder of the interviews. It also has many other powerful features, such as being able to highlight and add notes while still recording. It has some good playback features, too, such as clicking on the script to jump to that position and playback that particular part.

[Yet Another Mail Merge](https://yamm.com/){:target="_blank" rel="noopener"} - See [Communication](#communication)

## Sharing Code & ShinyApps

**Sharing snippets of code:**

There are a few choices, and you ought to pick them depending on your audience. 

* The visually pleasing way - e.g. for Twitter/X: [Carbon](https://carbon.now.sh/){:target="_blank" rel="noopener"}  
* The user-friendly way - e.g. for helping solve an issue:  [GitHub Gists](https://gist.github.com/discover){:target="_blank" rel="noopener"}  

**Sharing full-length code:**

* Create a repository on [GitHub](https://github.com/){:target="_blank" rel="noopener"}  

**Sharing Apps**

Once you are familiar with R and RStudio, you might want to try creating your own app! I use [ShinyApps](https://www.shinyapps.io/){:target="_blank" rel="noopener"} to publish and share mine.

For each research study, I aim to produce an app so that people can interact with the data alongside the manuscript. This is a great way to share your data and findings with the world!

Check some out [here](https://apps.bradk.co.uk){:target="_blank" rel="noopener"}

## Writing

**Microsoft Word combined with:**

* [Scite.ai](https://scite.ai){:target="_blank" rel="noopener"} - *NOTE: This is a paid app*. Finding and evaluating research. Scite uses an AI assistant to search the literature and transform the way you discover, evaluate, and understand research on any topic.
* [Zotero](https://www.zotero.org/){:target="_blank" rel="noopener"} - An open-source citation and literature manager. Helpful in generating formatted reference list.
* [Recite](https://reciteworks.com/login){:target="_blank" rel="noopener"} - Recite checks that your in-text citations match the reference list at the end of your work.
* [Grammarly](https://www.grammarly.com/){:target="_blank" rel="noopener"} - Checking for spelling, grammar, and excess words. 
* AutoCorrect (Mac: Tools < AutoCorrect Options) - Replacing text with formatted text to make it easier to find when finalising the document. E.g., Replacing (REF) with highlighted and bolded (<mark><strong>REF</strong></mark>). 
To set this up: 
(1) Create the highlighted/bold version of (REF) on the page of a normal word document 
(2) Highlight that text and go to Tools < AutoCorrection Options
(3) That text should already appear in the 'With' both (you may have to toggle 'Formatted text' to see it with the highlight)
(4) You need to enter the text you'd like to "trigger" it with in the 'Replace' box. 

<img style="display: block; margin-left: auto; margin-right: auto;" src="/assets/img/blog/cool-things/autocorrect.png" alt="" width="319" height="143" />

**Searching for literature:**

See Scite.ai above

{: .box-note}
<i class="fas fa-exclamation icon-yellow" aria-hidden="true"></i> Turns out I haven't used Research Rabbit and Connected Papers as much as I thought I would. I'm leaving them here just in case other people find them useful.

[Research Rabbit](https://researchrabbitapp.com/){:target="_blank" rel="noopener"} is like Spotify for academic articles! You add a few that you are interested in, and it will use AI to make intelligent suggestions for other related articles. You can also use it to find works that cite a particular paper.

[Connected Papers](https://www.connectedpapers.com/){:target="_blank" rel="noopener"} this website can produce a visual graph for all articles that are related to one article paper.

## Communication

Mailing Groups - If you need a custom space for your lab groups or reading clubs, check out [Gaggle Mail](https://gaggle.email){:target="_blank" rel="noopener"}. Free for groups with up to 20 members. Allows you to: (1) manage when you receive your emails (immediately, daily digest etc.), (2) easy sign-ups for new members and (3) easy unsubscribes.

Collaborative group workspaces - [Slack](https://slack.com/intl/en-gb/){:target="_blank" rel="noopener"}

Social messenger (Encrypted) - [Signal](https://signal.org/en/){:target="_blank" rel="noopener"}  

Social Platforms:  

* [Gathertown](https://gather.town/){:target="_blank" rel="noopener"} is great for hosting a virtual space with a controllable avatar. As you walk towards a person/people, they become visible and audible.

* [Backyard](https://backyard.co/){:target="_blank" rel="noopener"} is a platform that allows you and your friends to play online collab games whilst also being able to see each player in circles around the game. Features a few versions of well-known games.

Setting expectations RE: emails, use [The Email Charter](https://email-charter.github.io/){:target="_blank" rel="noopener"} in your email signature. This webpage sets out 10 tips to avoid email overload.

When designing emails for research studies, I will often use HTML and CSS to make sure it looks nice. [HTML Email.io](https://htmlemail.io/inline/){:target="_blank" rel="noopener"} is a great website to check that you have done this correctly and that the CSS is embedded inline with your code. Some email clients will strip styling that is not inline, so this is a great way to ensure your email looks great no matter which email client is used.  

[Yet Another Mail Merge](https://yamm.com/){:target="_blank" rel="noopener"} - (Integrated with Google) Used for sending batch emails. This is also useful for sending personalised emails with individual attachments. I use this as part of my research automation to help with sending out vouchers or study updates.

## Organisation

Trying to keep track of all the amazing Open Research events happening all the time? Try [Open Research Calendar](https://openresearchcalendar.github.io){:target="_blank" rel="noopener"} to keep track!

[Trello](https://trello.com/en){:target="_blank" rel="noopener"} is a visual task-manager where you can have task boards and move your tasks around (from "to do" to "doing" to 'done", sort of like post-it notes). It's great for individual work and collaboration, as you can share your boards with colleagues and assign tasks to each other.

[Google Drive](https://www.google.com/intl/en_in/drive/){:target="_blank" rel="noopener"} - Quite a few of my automation processes use a Google Sheet to store information for me. I find this useful as you can view the spreadsheet to view a history of your data that has been processed. I use folders in Drive to keep the spreadsheets sorted into categories (usually by study, e.g. Study 1, Study 2).

To organise meetings (both in-person and virtual), I use [Calendly](https://calendly.com){:target="_blank" rel="noopener"} and [TidyCal](https://tidycal.com){:target="_blank" rel="noopener"}, which are smart meeting schedulers. They are super easy to use. To view mine, check out [this page.](https://bradleykennedy.co.uk/book-meeting/){:target="_blank" rel="noopener"}

[Are We Meeting Yet?](https://arewemeetingyet.com/#form){:target="_blank" rel="noopener"} - To organise meetings across different time zones.

## Statistics

Lots of great visualisations from [R Psychologist](https://rpsychologist.com/viz){:target="_blank" rel="noopener"} (Kristoffer Magnusson).

[Statcheck](http://www.statcheck.io/){:target="_blank" rel="noopener"} - A website that can help you detect errors in statistical reporting. They are also working on a [MS Word Plug-in](http://www.statcheck.io/word-add-in.php){:target="_blank" rel="noopener"}.

[Draw Data xyz](https://drawdata.xyz/){:target="_blank" rel="noopener"} - See [Teaching](#teaching)

## Survey Software

[FormR](https://formr.org/){:target="_blank" rel="noopener"} - Chain simple surveys into long runs, use the power of R to generate pretty feedback and complex designs

[Tripetto](https://tripetto.com/){:target="_blank" rel="noopener"} is a conversational form builder that is similar to Typeform but allows for much more customisation and various data validation/calculation processes. Plus, it looks super pretty!

[Qualtrics](https://www.qualtrics.com/uk/){:target="_blank" rel="noopener"} is my favourite survey software for research. Do note that it is not free and requires a licence!

## General tech-y things

[Google Remote Desktop](https://remotedesktop.google.com/home){:target="_blank" rel="noopener"} - Connect to other computers easily. Super useful if working from home and needing to connect to a work computer. It does need to be set up beforehand!

[Caffeine](https://www.macupdate.com/app/mac/24120/caffeine){:target="_blank" rel="noopener"} - Use this to keep your Mac screen awake and prevent the screensaver.

[OpenVPN](https://openvpn.net/){:target="_blank" rel="noopener"} - I use this to make a secure connection to my campus network to safely transfer files etc.

[Pym](https://apps.apple.com/gb/app/pym/id1451733095?mt=12){:target="_blank" rel="noopener"} - A super light-weight image compressor and format converter (Mac only).

[Chrome Multi-tab opener](https://chrome.google.com/webstore/detail/open-multiple-urls/oifijhaokejakekmnjmphonojcfkpbbh){:target="_blank" rel="noopener"} - Chrome add-on to open multiple URLs (handy for marking and opening multiple Turnitin pages simultaneously).

[URLOpener](https://urlopener.net){:target="_blank" rel="noopener"} - An alternative to the above website for those who would like to use a browser other than Chrome.

## Teaching

[Poll Everywhere](https://www.polleverywhere.com/){:target="_blank" rel="noopener"} - A super easy way to embed live interactive polls into presentations. They also have a really great 'Live Slide' add-in which allows you to insert a live webpage into your presentation. This is super useful if you want to demonstrate an app etc., without needing to close and restart the slides.

[Answer Garden](https://answergarden.ch/){:target="_blank" rel="noopener"} - Simple interactive word-cloud software.

[Draw Data xyz](https://drawdata.xyz/){:target="_blank" rel="noopener"} - Draw your own data and download it! Useful for teaching purposes. 

## Online Presenting / Video Conferencing

[Teleprompter](https://telepromptermirror.com/telepromptersoftware.htm){:target="_blank" rel="noopener"} - Great auto-scrolling teleprompter software. Useful for presenting when there is a written script to follow. You can switch between auto scroll and **voice-activated** scrolling! Note - I have had mixed results with the voice-activated scrolling, but here is hoping it just gets better with age.

[OBS](https://obsproject.com/){:target="_blank" rel="noopener"} - Live streaming video control. This is super powerful if used alongside video software such as MS Teams or Zoom. Combined with a green screen, the possibilities are endless.

[StreamDeck](https://www.elgato.com/en/gaming/stream-deck){:target="_blank" rel="noopener"} - Originally designed for gaming streamers, this is a super useful customisable control pad that includes several LCD keys. I think this is great for teachers too. Controlling scenes in OBS or making convenient keyboard shortcuts in other programs. I have used mine to quickly mute/unmute in Teams, insert predefined paragraphs of text in marking comments and even control lights in my room! The software allows for endless customisation.

## Storage
[Dropbox](https://www.dropbox.com/plans){:target="_blank" rel="noopener"} - The plus plan for 2Tb storage is amazing. Combined with the ability to make and monitor file requests securely is priceless. Dropbox has a feature to SmartSync the files on my Mac which means that it is never using up excess space on files that I don't regularly access. However, those files are there and available should I wish to use them (it just takes a second to redownload them to the local machine).

I use GitHub with [Github Desktop](https://desktop.github.com/){:target="_blank" rel="noopener"} to keep local copies of repositories updated. I make changes using the software I listed in the [Coding](#coding) section and then make commits and pushes using the desktop app.

---

# If you found this article useful, feel free to share using the icons below :smiley:
{:.no_toc}
