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
