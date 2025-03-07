---
title: PowerPoint - Remove presenter notes quickly from multiple slides
subtitle: Need to get rid of notes from your slide deck? Here's how to do it in 3 simple steps!
tags: [tech, tips, PowerPoint]
readtime: true
last-updated: 21/01/2025
permalink: /blog/remove-notes/
thumbnail-img: /assets/img/blog/remove-notes/notes_icon.png
cover-img: /assets/img/blog/remove-notes/presentation_img.jpg
author: Bradley J. Kennedy
layout: post
---
{: .box-warning}
<i class="fas fa-exclamation-circle icon-red" aria-hidden="true"></i> Instructions are for Mac Users. Windows users can find instructions in the blue/grey boxes.

## Preparation

- Duplicate your file so that your original, with all of the presenter notes, is not lost.

- Download <a href="/assets/img/blog/remove-notes/SlideNotesRemover.bas" download>this file</a> and save it somewhere you will be able to find it again in the future. (This is important!)

The file contains the code that will remove the notes from each slide with the press of one button.

For reference, this is the code that is contained within the file:

``` vba
Attribute VB_Name = "NotesRemover"
Sub RemoveNotes()
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

## Step 1

While in your PowerPoint file, go up to the menu bar and navigate to:

> Tools < Macro < Visual Basic Editor

{: .box-note}
:computer: **Windows users:** Press Alt + F11 to open the Visual Basic Editor.

![Tools menu](/assets/img/blog/remove-notes/ToolsMenu.png)

A new window will appear...
![VB Window](/assets/img/blog/remove-notes/VisualBasic.png)

## Step 2

In the menu bar, navigate to:

> File < Import file...

Locate the *SlideNotesRemover.bas* file you just downloaded, select it and press '*Open*'.

**It may not look like much happened.** But a folder called '*Modules*' should have appeared in the Project Tree. This is good! The Macro is contained within this folder.
![Modules folder](/assets/img/blog/remove-notes/ModulesFolder.png)

## Step 3

Click the PLAY button, and 'Run' the *RemoveNotes* Macro.

{: .box-note}
:computer: Windows users: This might look like a green triangle / play button. If you cannot find it, you can press F5 to run the Macro.

![Play button](/assets/img/blog/remove-notes/PlayButton.png)

Again, it may not look like much has happened! BUT, close the Visual Basic window and you will find that **all the notes have been removed from each slide**! :tada:

### One last note

When you come to save your file, you will get an alert to say that the Macros will be removed, **THIS IS OK** as you have the Macro file saved already!
You can press 'Remove Macros and Save'.

{: .box-note}
:computer: Windows users: You just need to press 'Yes' to the message that pops up.

![Save message](/assets/img/blog/remove-notes/SaveMessage.png)