
0.0.27 / 2012-04-01 
==================

  * Gmapsv3 setup. 
  * Custom icons downloaded for markers and current position. 
  * Increasing marker icon size (resized 2x). 
  * Using gmapsv3 api to set icon animation and position instead of remove/create. 
  * Adding "where am I" image button.

0.0.23 / 2012-03-31 
==================

  * Upping current lat/lng detail to 5 decimals

0.0.22 / 2012-03-31 
==================

  * Removing more lat/lng decimals (max 4, from 6) 
  * Increasing font size again for iphone 
  * Formatting date/time differently 
  * No longer showing meters in UI, just feet.
  * Upping font-size. 
  * Moved "Add Point" button to just below map. Bigger.

0.0.20 / 2012-03-31 
==================

  * Setting up app cache and ios meta tag to run fullscreen.
  * Adding jasmine tests
  * Adding grunt

0.0.15 / 2012-03-26 
==================

  * Added "view" link to row to center on a point.

0.0.14 / 2012-03-26 
==================

  * Removing injectjs from index.html, requiring all scripts 
    * Rewriting modules to not use inject's require, but instead init functions that take deps as params 

0.0.13 / 2012-03-24 
==================

  * Slowing animations for current position marker.
  * Adding window.onunload. Animated marker stopping animation, etc, on unload

0.0.12 / 2012-03-24 
==================

  * Animated marker can now take a callback that is called each time the marker position is updated. 
    * Using to update map labels on each update.
  * Simple footer styles.
  * Animated marker color changed back to a lighter blue 
  * Animated marker now goes as big as current accuracy Renaming vars, etc.
  * Setting mapstraction back to openlayers (faster than gmaps? weird)

0.0.11.2 / 2012-03-24 
==================

  * gmaps v3 included, adding all mapstraction files
  * Removing api key, zooming in to 20 by default.

0.0.11.1 / 2012-03-24 
==================

  * Don't re-set zoom on add point

0.0.11 / 2012-03-24 
==================

  * Animated marker created, using it as current position.

0.0.10 / 2012-03-24 
==================
  * Removing a row removes the marker
  * conversion.js => formatter.js
  * Lots of other minor changes.

0.0.8 / 2012-03-14 
==================

  * Using .toFixed() to format decimals.

0.0.7 / 2012-03-14 
==================

  * Can now delete a row. styled the links as well.

0.0.6 / 2012-03-14 
==================

  * Removing href="javascript" links in favor of attached click() events via jquery.

0.0.5 / 2012-03-14 
==================

  * Adding lawnchairjs file 
    * Adding basic storage module 
  * Moving history code to module. 
  * Basic lawnchair storage/retrieval 
    * store each point on "add" 
    * restore points from lawnchair, push to history 
  * Moving meters to string stuff to conversion module. 
  * Fixing history and on-load map setups.
  * Changing link text 
  * Adding crude point history table. 
  * Formatting numbers in history to less decimals. 
  * Resizing map and summary area based on media query 
  * Showing lat/lng accuracy labels. Abstracting more code into modules.
  * Logging lat,lng and accuracy in meters.
  * Dropping radius for accuracy of lat/lng.
