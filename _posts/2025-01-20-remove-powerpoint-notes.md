---
title: PowerPoint - Removing presenter notes quickly from multiple slides
subtitle: Need to get rid of notes from your slide deck? Here's how to do it in a few clicks!
tags: [tech, tips]
readtime: true
last-updated: 20/01/2025
permalink: /blog/remove-notes/
thumbnail-img: /assets/img/blog/remove-notes/notes_icon.png
cover-img: /assets/img/blog/remove-notes/presentation_img.jpg
author: Bradley J. Kennedy
layout: post
---
{: .box-warning}
These instructions are currently for Mac PowerPoint only. I plan to create a Windows version ... at some point. :computer:

{: .box-note}
<i class="fas fa-exclamation-circle icon-yellow" aria-hidden="true"></i> NOTE: If you already have the code file from a previous download, you can skip to Step 3.

## Step 1

Duplicate your file so that your original, with all of the presenter notes, is not lost.

## Step 2

Download <a href="/assets/img/blog/remove-notes/SlideNotesRemover.bas" download>this file</a> and save it somewhere you will be able to find it again in the future. (This is important!)

The file contains the code that will programmatically remove the notes from each slide with the press of one button.

For reference, this is the code that is contained within the file:

``` vba
Attribute VB_Name = "NotesRemover"
Sub Zap()
Dim osld As Slide
For Each osld In ActivePresentation.Slides
With osld.NotesPage.Shapes(2)
If .HasTextFrame Then
.TextFrame.DeleteText
End If
End With
Next osld
End Sub
```

## Step 3

While in your PowerPoint file, go up to the menu bar and navigate to:

> Tools < Macro < Visual Basic Editor

![Tools menu](/assets/img/blog/remove-notes/ToolsMenu.png)

A new window will appear...
![VB Window](/assets/img/blog/remove-notes/VisualBasic.png)

## Step 4

In the menu bar, navigate to:

> File < Import file...

Locate the file you downloaded from Step 2, select it and press '*Open*'.

**It may not look like much happened.** But a folder called '*Modules*' should have appeared in the Project Tree. This is good! The Macro is contained within this folder.
![Modules folder](/assets/img/blog/remove-notes/ModulesFolder.png)

## Step 5

Click the PLAY button, and 'Run' the *RemoveNotes* Macro.

![Play button](/assets/img/blog/remove-notes/PlayButton.png)

Again, it may not look like much has happened! BUT, close the Visual Basic window and you will find that **all the notes have been removed from each slide**! :tada:

### One last note:

When you come to save your file, you will get an alert to say that the Macros will be removed, **THIS IS OK** as you have the Macro file saved already from Step 2! 
You can press 'Remove Macros and Save'.
![Save message](/assets/img/blog/remove-notes/SaveMessage.png)