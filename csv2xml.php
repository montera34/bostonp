<?php
///////////////////////
////// SETUP YOUR VARS

$working_path = "data/"; // directory to save the xml files
$icons_path = "../img/"; // icons directory

//// SOURCE FILE: CSV data file vars
$csv_filename = "data"; // name (no extension)
$line_length = "1024"; // max line lengh (increase in case you have longer lines than 1024 characters)
$delimiter = ","; // field delimiter character
$enclosure = '"'; // field enclosure character

//// OUTPUT FILES: XML
$xml_filename = "data"; // prefix name (no extension)

///// DON'T EDIT BEYOND THIS LINE
////////////////////////////////

$fp = fopen($working_path.$csv_filename.".csv",'r');

if ( $fp !== FALSE ) {
// if the file is found and is readable

	// data array generation
	$events = array();

	while ( ($fp_csv = fgetcsv($fp,$line_length,$delimiter,$enclosure)) !== FALSE ) { // begin main loop
		$pattern = '/"/';
		$replace = "\&quot;";
		$desc = preg_replace($pattern,$replace,$fp_csv[3]);
		$categ = $fp_csv[0];
		$events[$categ][] = array(
			'start' => $fp_csv[1],
			'end' => $fp_csv[2],
			'desc' => $desc,
		);
	} // end main loop
	fclose($fp);

// xml file generation
$count = 0;
foreach ( $events as $cat ) { // categories loop
	$icon_path = $icons_path."bp-cat" .$count. "-8px.png";

	$doc = new DOMDocument();
	$doc->formatOutput = true;
  
	$data = $doc->createElement( "data" );
	$doc->appendChild( $data );

	foreach ( $cat as $event ) { // this category events loop
		if ( $count == 0 ) { // if population
			$item = $doc->createElement( "event" ); // event element
		} else {
			$item = $doc->createElement( "event",$event['desc'] ); // event element
		}

		$item_start = $doc->createAttribute("start"); // start att
		$item_start->value="Jan 1 " .$event['start']. " 00:00:00 GMT"; // start value
		$item->appendChild($item_start); // start att added to this event

		if ( $count == 0 ) {
			$item_title = $doc->createAttribute("title"); // clasname att
			$item_title->value=$event['desc']; // caption value
			$item->appendChild($item_title); // caption att added to this event

		} else {
			$item_caption = $doc->createAttribute("caption"); // caption att
			$item_caption->value=$event['desc']; // caption value
			$item->appendChild($item_caption); // caption att added to this event

		}

		if ( $event['start'] == $event['end'] ) { // if is a point event
			$item_duration = $doc->createAttribute("isDuration"); // duration att
			$item_duration->value="false"; // duration value
			$item->appendChild($item_duration); // duration att added to this event

			$item_icon = $doc->createAttribute("icon"); // icon att
			$item_icon->value=$icon_path; // icon value
			$item->appendChild($item_icon); // icon att added to this event

		} else { // if is a line event
			$item_duration = $doc->createAttribute("isDuration"); // duration att
			$item_duration->value="true"; // duration value
			$item->appendChild($item_duration); // duration att added to this event

			$item_end = $doc->createAttribute("end"); // end att
			$item_end->value=$event['end']; // end value
			$item->appendChild($item_end); // end att added to this event

		} // end if point or line
		$data->appendChild( $item ); // this event element added to data
	} // end this category events loop

	$doc->save("data/data".$count.".xml"); // write the XML file
	$count++;

} // end categories loop

} else {
	echo "ERROR: It's not possible to access to the data file " .$csv_filename. ". Please, check \$csv_filename in csv2xml.php file."; exit;
} // end if $filename is found
?>
