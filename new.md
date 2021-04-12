<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
</head>
<body>
<script src="https://unpkg.com/tripetto-runner-foundation"></script>
<script src="https://unpkg.com/tripetto-runner-autoscroll"></script>
<script src="https://unpkg.com/tripetto-services"></script>
<script>
var tripetto = TripettoServices.init({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiTFQ1V2JpNWZ3b0t2VkxMZWJqZ0dBVlZJMXY5K2MrazI0N3d5VjNRK2t6WT0iLCJkZWZpbml0aW9uIjoiWmJteW92QllOd045NmtLSHRhU3N1bm5nQWhGQTdBbXRiYTFheHRvVTVRVT0iLCJ0eXBlIjoiY29sbGVjdCJ9.mdhDICGCuIoBmDY7lehvHPz7EDjqvGlBrUBEiBBNkLo" });

TripettoAutoscroll.run({
    element: document.body,
    definition: tripetto.definition,
    styles: tripetto.styles,
    l10n: tripetto.l10n,
    locale: tripetto.locale,
    translations: tripetto.translations,
    attachments: tripetto.attachments,
    onSubmit: tripetto.onSubmit
});
</script>
</body>
</html>
