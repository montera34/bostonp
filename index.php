<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Boston Planning Timeline</title>
<link rel="stylesheet" href="style.css" type="text/css" media="screen" />
<script src="http://api.simile-widgets.org/timeline/2.3.1/timeline-api.js?bundle=true" type="text/javascript"></script>
<script src="js/bp-timeline.js" type="text/javascript"></script>
</head>
<body onload="onLoad();" onresize="onResize();">

<div id="bp-side">
<?php $categs = array("Population","","Landmaking","City Boundaries","Clearance","Notable Building","Transportation & Infrastructure","Parks","Ethnic Milestones","Politics","Economy","Education","Medicine","Innovation","Boston Events","World Events");
$count = 0;
foreach ( $categs as $cat ) {
	$cat_class = "bp-categ-" .$count;
	echo '
		<div class="bp-categ ' .$cat_class. '">
			'.$cat. '
		</div>
	';
	$count++;
}
?>
</div>
<div id="bp-timeline"></div>
<noscript>
This page uses Javascript to show you a Timeline. Please enable Javascript in your browser to see the full page. Thank you.
</noscript>
</body>
</html>
