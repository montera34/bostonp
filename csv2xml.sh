#!/bin/sh
#
# this script download a google spreadsheet document in CSV format
# and then generate a XML set of files to feed simile timeline js library
#
#####
BP_PATH=${PWD} # main working folder
GDATA_FOLDER=gdata-2.0.18 # google gdata library folder name
GOOGLECL_FOLDER=googlecl-0.9.14 # googlecl folder name
export PYTHONPATH=$PYTHONPATH:${BP_PATH}/${GDATA_FOLDER}/src # set pythonpath env var 
GDOC_TIT=spreadsheet2simile # title of data file in gdoc
GDOC_USER=voraginebramante@gmail.com # owner user
LDOC_TIT=data # filename in the server
LDOC_FORMAT=csv # format to be downloaded
BP_CATS=14 # number of timeline categories

# create the XML files if don't exist
FILE_COUNTER=0
while [ "$FILE_COUNTER" -le "$BP_CATS" ]; do
	touch ${BP_PATH}/data/data${FILE_COUNTER}.xml
	echo  "${BP_PATH}/data/data${FILE_COUNTER}.xml created"
	: $((FILE_COUNTER = $FILE_COUNTER + 1))
	done

# backup the local CSV data file
touch ${BP_PATH}/data/${LDOC_TIT}.$LDOC_FORMAT
cp ${BP_PATH}/data/${LDOC_TIT}.$LDOC_FORMAT ${BP_PATH}/data/${LDOC_TIT}-bak.$LDOC_FORMAT
# download the gdoc CSV file
./${GOOGLECL_FOLDER}/src/google docs get --title "$GDOC_TIT" --user "$GDOC_USER" --dest "${BP_PATH}/data/${LDOC_TIT}.$LDOC_FORMAT" -- format "$LDOC_FORMAT" --force-auth

if diff ${BP_PATH}/data/${LDOC_TIT}.$LDOC_FORMAT ${BP_PATH}/data/${LDOC_TIT}-bak.$LDOC_FORMAT > /dev/null ; then
	# if local and downloaded files are the same
	# nothing to do in the timeline
	echo "Nothing to update in the timeline."
else
	# if files are different
	# run the php script to update the XML files
	echo "har";
	chmod 777 ${BP_PATH}/data/
	php ${BP_PATH}/csv2xml.php
	chmod 755 ${BP_PATH}/data/
	echo "The timeline has been updated."
fi
