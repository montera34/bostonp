var divId = "bp-timeline"; // timeline div ID

var startDate = "Jan 1 1800 00:00:00 GMT"; // start of events
var beginYear = "1800"; // left timeline limit
var currentDate = new Date();
var currentYear = currentDate.getFullYear();
var endYear = currentYear+2; // right timeline limit
var d = Timeline.DateTime.parseGregorianDateTime("1900"); // center point

var dataPath = window.location.protocol + "//" + window.location.host + "/timeline/data/";
var tl; // timeline var container

function onLoad() {
	// data
	var populationSource = new Timeline.DefaultEventSource(0);
	var planning1Source = new Timeline.DefaultEventSource(0);
	var planning2Source = new Timeline.DefaultEventSource(0);
	var planning3Source = new Timeline.DefaultEventSource(0);
	var planning4Source = new Timeline.DefaultEventSource(0);
	var planning5Source = new Timeline.DefaultEventSource(0);
	var planning6Source = new Timeline.DefaultEventSource(0);
	var people1Source = new Timeline.DefaultEventSource(0);
	var people2Source = new Timeline.DefaultEventSource(0);
	var economy1Source = new Timeline.DefaultEventSource(0);
	var economy2Source = new Timeline.DefaultEventSource(0);
	var economy3Source = new Timeline.DefaultEventSource(0);
	var economy4Source = new Timeline.DefaultEventSource(0);
	var events1Source = new Timeline.DefaultEventSource(0);
	var events2Source = new Timeline.DefaultEventSource(0);

	// theme definition
	var theme = Timeline.ClassicTheme.create();
//	theme.event.instant.icon = "img/bp.icon1-8.png";
	theme.event.instant.iconWidth =  8; // These are for per-event custom icons
	theme.event.instant.iconHeight = 8;
	theme.timeline_start = new Date(Date.UTC(beginYear, 0, 1));
	theme.timeline_stop = new Date(Date.UTC(endYear, 0, 1));
	theme.event.bubble.width = 320;
	theme.event.bubble.height = 220;
	theme.event.tape.height = 4;
	theme.event.track.height = 8;
	theme.event.track.gap = 0;
	theme.event.track.offset = 0;
//	theme.ether.backgroundColors = red;
	// end theme definition

	var bandWidth = "5%";
	var bandUnitPixels = 50;
	var bandInfos = [

		// BANDS
		// population
		Timeline.createBandInfo({
			eventSource:    populationSource,
			date:           d,// to start the timeline in this point
			width:          bandWidth,
			intervalUnit:   Timeline.DateTime.DECADE,
			intervalPixels: bandUnitPixels,
			theme: theme,
	//		layout: 'original'
		}),
		// legend
		Timeline.createBandInfo({
			date:           d,// to start the timeline in this point
			width:          bandWidth,
			intervalUnit:   Timeline.DateTime.DECADE,
			intervalPixels: bandUnitPixels
	//		theme: theme,
	//		layout: 'original'
		}),
		// planning band 1: Landmaking
		Timeline.createBandInfo({
			eventSource:    planning1Source,
			date:           d,
			width:          bandWidth, 
			intervalUnit:   Timeline.DateTime.DECADE, 
			intervalPixels: bandUnitPixels,
	//		color: #f00,
			theme: theme,
		}),
		// planning band 2: Annexation/Incorporation
		Timeline.createBandInfo({
			eventSource:    planning2Source,
			date:           d,
			width:          bandWidth, 
			intervalUnit:   Timeline.DateTime.DECADE, 
			intervalPixels: bandUnitPixels,
			theme: theme,
		}),
		// planning band 3: Clearance/Destruction/Urban Renewal
		Timeline.createBandInfo({
			eventSource:    planning3Source,
			date:           d,
			width:          bandWidth, 
			intervalUnit:   Timeline.DateTime.DECADE, 
			intervalPixels: bandUnitPixels,
			theme: theme,
		}),
		// planning band 4: Notable Building
		Timeline.createBandInfo({
			eventSource:    planning4Source,
			date:           d,
			width:          bandWidth, 
			intervalUnit:   Timeline.DateTime.DECADE, 
			intervalPixels: bandUnitPixels,
			theme: theme,
		}),
		// planning band 5: Transportation and infrastructure
		Timeline.createBandInfo({
			eventSource:    planning5Source,
			date:           d,
			width:          bandWidth, 
			intervalUnit:   Timeline.DateTime.DECADE, 
			intervalPixels: bandUnitPixels,
			theme: theme,
		}),
		// planning band 6: parks
		Timeline.createBandInfo({
			eventSource:    planning6Source,
			date:           d,
			width:          bandWidth, 
			intervalUnit:   Timeline.DateTime.DECADE, 
			intervalPixels: bandUnitPixels,
			theme: theme,
		}),
		// people band 1: ethnicity and immigration
		Timeline.createBandInfo({
			eventSource:    people1Source,
			date:           d,// to start the timeline in this point
			width:          bandWidth,
			intervalUnit:   Timeline.DateTime.DECADE,
			intervalPixels: bandUnitPixels,
			theme: theme,
		}),
		// people band 2: politics
		Timeline.createBandInfo({
			eventSource:    people2Source,
			date:           d,// to start the timeline in this point
			width:          bandWidth,
			intervalUnit:   Timeline.DateTime.DECADE,
			intervalPixels: bandUnitPixels,
			theme: theme,
	//		layout: 'original'
		}),
		// economy band 1
		Timeline.createBandInfo({
			eventSource:    economy1Source,
			date:           d,
			width:          bandWidth, 
			intervalUnit:   Timeline.DateTime.DECADE, 
			intervalPixels: bandUnitPixels,
			theme: theme,
	//		cssClass: 'bp-band-odd'
		}),
		// economy band 2
		Timeline.createBandInfo({
			eventSource:    economy2Source,
			date:           d,
			width:          bandWidth, 
			intervalUnit:   Timeline.DateTime.DECADE, 
			intervalPixels: bandUnitPixels,
			theme: theme,
		}),
		// economy band 3
		Timeline.createBandInfo({
			eventSource:    economy3Source,
			date:           d,
			width:          bandWidth, 
			intervalUnit:   Timeline.DateTime.DECADE, 
			intervalPixels: bandUnitPixels,
			theme: theme,
		}),
		// economy band 4
		Timeline.createBandInfo({
			eventSource:    economy4Source,
			date:           d,
			width:          bandWidth, 
			intervalUnit:   Timeline.DateTime.DECADE, 
			intervalPixels: bandUnitPixels,
			theme: theme,
		}),
		// events band 1
		Timeline.createBandInfo({
			eventSource:    events1Source,
			date:           d,
			width:          bandWidth, 
			intervalUnit:   Timeline.DateTime.DECADE, 
			intervalPixels: bandUnitPixels,
			theme: theme,
		}),
		// events band 2: outside influences
		Timeline.createBandInfo({
			eventSource:    events2Source,
			date:           d,
			width:          bandWidth, 
			intervalUnit:   Timeline.DateTime.DECADE, 
			intervalPixels: bandUnitPixels,
			theme: theme,
		}),
	]; // end bandInfos var

	// to make two or more lines scroll synchrony
	bandInfos[0].syncWith = 1;
//	bandInfos[0].highlight = true;
//	bandInfos[1].highlight = true;
//	bandInfos[1].syncWith = 2;
	bandInfos[2].syncWith = 1;
	bandInfos[3].syncWith = 2;
	bandInfos[4].syncWith = 3;
	bandInfos[5].syncWith = 4;
	bandInfos[6].syncWith = 5;
	bandInfos[7].syncWith = 6;
	bandInfos[8].syncWith = 7;
	bandInfos[9].syncWith = 8;
	bandInfos[10].syncWith = 9;
	bandInfos[11].syncWith = 10;
	bandInfos[12].syncWith = 11;
	bandInfos[13].syncWith = 12;
	bandInfos[14].syncWith = 13;
	bandInfos[15].syncWith = 14;
	// end bands syncronization

	// to create vertical bands
	for (var i = 0; i < bandInfos.length; i++) {
		bandInfos[i].decorators = [
			new Timeline.SpanHighlightDecorator({
			startDate:  "Jan 1 0000 0:00:00 GMT",
			endDate:    "Dec 31 1799 23:59:59",
			opacity:    50,
			startLabel: "",
			endLabel:   "Town to city",
			cssClass: 't-highlight0'
			}),
			new Timeline.SpanHighlightDecorator({
			startDate:  "Jan 1 1800 0:00:00 GMT",
			endDate:    "Dec 31 1839 23:59:59",
			color:      "#BFC25B",
			opacity:    50,
			startLabel: "",
			endLabel:   "Rapid growth",
			// theme:      theme,
			cssClass: 't-highlight1'
			}),
			new Timeline.SpanHighlightDecorator({
			startDate:  "Jan 1 1840 0:00:00 GMT",
			endDate:    "Dec 31 1879 23:59:59",
			color:      "#DAD98A",
			opacity:    50,
			startLabel: "",
			endLabel:   "Transformation",
			// theme:      theme,
			cssClass: 't-highlight2'
			}),
			new Timeline.SpanHighlightDecorator({
			startDate:  "Jan 1 1880 0:00:00 GMT",
			endDate:    "Dec 31 1918 23:59:59",
			color:      "#BFC25B",
			opacity:    50,
			startLabel: "",
			endLabel:   "Stagnation",
			// theme:      theme,
			cssClass: 't-highlight3'
			}),
			new Timeline.SpanHighlightDecorator({
			startDate:  "Jan 1 1919 0:00:00 GMT",
			endDate:    "Dec 31 1947 23:59:59",
			color:      "#DAD98A",
			opacity:    50,
			startLabel: "",
			endLabel:   "Upheaval",
			// theme:      theme,
			cssClass: 't-highlight5'
			}),
			new Timeline.SpanHighlightDecorator({
			startDate:  "Jan 1 1948 0:00:00 GMT",
			endDate:    "Dec 31 1979 23:59:59",
			color:      "#BFC25B",
			opacity:    50,
			startLabel: "",
			endLabel:   "Cosmopolitan city",
			// theme:      theme,
			cssClass: 't-highlight6'
			}),
			new Timeline.SpanHighlightDecorator({
			startDate:  "Jan 1 1980 0:00:00 GMT",
			endDate:    currentDate,
			color:      "#DAD98A",
			opacity:    50,
			startLabel: "",
			endLabel:   "",
			// theme:      theme,
			cssClass: 't-highlight7'
			}),
		];
	} // end loop highlight
	// end to create vertical bands

	// timeline creation
	tl = Timeline.create(document.getElementById(divId), bandInfos);
	// adding the data
	tl.loadXML(dataPath+"data0.xml", function(xml, url) { populationSource.loadXML(xml, url); });
	tl.loadXML(dataPath+"data1.xml", function(xml, url) { planning1Source.loadXML(xml, url); });
	tl.loadXML(dataPath+"data2.xml", function(xml, url) { planning2Source.loadXML(xml, url); });
	tl.loadXML(dataPath+"data3.xml", function(xml, url) { planning3Source.loadXML(xml, url); });
	tl.loadXML(dataPath+"data4.xml", function(xml, url) { planning4Source.loadXML(xml, url); });
	tl.loadXML(dataPath+"data5.xml", function(xml, url) { planning5Source.loadXML(xml, url); });
	tl.loadXML(dataPath+"data6.xml", function(xml, url) { planning6Source.loadXML(xml, url); });
	tl.loadXML(dataPath+"data7.xml", function(xml, url) { people1Source.loadXML(xml, url); });
	tl.loadXML(dataPath+"data8.xml", function(xml, url) { people2Source.loadXML(xml, url); });
	tl.loadXML(dataPath+"data9.xml", function(xml, url) { economy1Source.loadXML(xml, url); });
	tl.loadXML(dataPath+"data10.xml", function(xml, url) { economy2Source.loadXML(xml, url); });
	tl.loadXML(dataPath+"data11.xml", function(xml, url) { economy3Source.loadXML(xml, url); });
	tl.loadXML(dataPath+"data12.xml", function(xml, url) { economy4Source.loadXML(xml, url); });
	tl.loadXML(dataPath+"data13.xml", function(xml, url) { events1Source.loadXML(xml, url); });
	tl.loadXML(dataPath+"data14.xml", function(xml, url) { events2Source.loadXML(xml, url); });
	// JSON doesn't work for me
	//	tl.loadJSON("data/data.json", function(json, url) {
	//		peopleSource.loadJSON(json, url);
	//	});
}
// end onLoad function

// timeline resize function
var resizeTimerID = null;
function onResize() {
	if (resizeTimerID == null) {
		resizeTimerID = window.setTimeout(function() {
		resizeTimerID = null;
//		tl.layout();
		}, 500);
	}
}
// end timeline resize function
