<img src="assets/images/linePlannerLogoRev00.png">

## Contents

1. UX Design
2. Features
3. Technologies Used
4. Testing
5. Deployment
6. User Guide
7. Credits
8. Contributing
9. Support
10. License

## UX Design

The Line Planner site was designed around User Experience Design Principles. Target users were identified and business and user
goals were defined. A minimum viable product was determined that could achieve these goals. Future development potential was also
mapped out. The scope was set to ensure the project remained concise and fit the strategy, and the structure reflected this
scope whilst identifying the various APIs and technologies that would be used in the initial site version, as well potential future
expansion. The skeleton of the site was defined using wireframe models, which assisted in making key design decisions and targets prior to
commencing site construction, including site responsiveness considerations. Surface design was considered to identify suitable look and 
feel for this site, which is aimed at a mainly professional audience.

A review meeting was held following the initial UXD process which refined some areas including suitable API technologies and the scope of the project.

### Strategy

The following stakeholders and their goals were identified:

#### The Business

- Create a simple, intuitive line planning and survey duration estimate platform which uses familiar front-end elements e.g. Google Maps.
- Allow users to import specific file types, create new files and add and alter elements/features within existing and new files.
- Provide a simple, semi-automated summary of calculated statistics for the line plan, including distance, number of lines, and expected duration.
  - Make it very clear what data has been included and omitted to calculate this.
- Ensure the platform could be expanded for more complex use in the future.

#### Target Users/Customers

This product is intended as an internal business or B2B tool with the aim to provide commercial/tendering and bidding departments
within survey companies such as Hydrographic or Aerial with a tool that can produce technically challenging outputs without the
requirement to be highly skilled with techincal software such as CAD or GIS packages. The tool is designed for first stage survey
tender submission where indicative costs (dictated by survey duration) estimates are required by the client. At this early potential
survey project stage the estimatation process must be quick, easy and ituitive but retain a high degree of accuracy to ensure confidence
in the bid. Any outputs from this tool should be able to be handled by techincal departments in more advanced software should the project
progress.

#### User goals

As a tender coordinator within a survey company there is a requirement to quickly produce a quote for works on potential bids. A key
component of this is an estimate of survey duration. Survey duration is affected by a number of factors which include the number of lines
and the total line distance to acquire. In order to calculate this an indicative survey line plan is required. However traditionally this
must be completed by specialist technicians on bespoke software. Relying on this resource present issues with staff availability vs deadlines
and cost of the bespoke software license. In many instances a simple preliminary plan will suffice and if the coordinator is able to perform
this task independently with confidence in their potentially limited technical skillset the bid can be more robust and submitted in a timely
manner.

As a sole trader operating a small Remotely Piloted Vehicle survey service the overheads of purchasing bespoke CAD/GIS software and the cost
of spending time training and developing skills to use them are often prohibitive. A simple, cheap solution with a quick rate of learning and
familiar feel is ideal to create flightpaths and waypoints to load into UAV software.

As a skilled technically competent member of a survey company there is a requirement for the commercial team to correctly bid a project to
prevent unexpected increased to project durations and costs once the bid is won and the technical team create the final operational plan. If the
technical team can be provided a draft line plan which they have confidence in most of its particulars in an easy to handle file format then it
can be more closely adhered to and modified for use in the field.

#### Opportunity

An opportunity importance vs feasibility assessment was carried out to inform on decisionns regarding the Minimum Viable Product:
[Opportunity Assessment Analysis](assets/docs/opportunityAssessment.pdf)

#### Minimum Viable Product

- A web hosted platform which is interactive in a single, unsavable session to the user.
- Present a base map which the user can add elements and features on top of.
  - Allow click drawing of polylines and polygons on the map.
  - Allow simple text files with coordinates in a specified format to be imported into a GeoJSON and displayed on the map.
  - Allows elements to be created based on other elements.
  - Allows elements to be edited based on other elements.
- Coordinates are stored in JSON format as a GeoJSON.
  - Coordinates are also projected from Lat/Long to Easting and Northing (UTM Zones).
  - Coordinates are displayed in realtime to the user in both Geographic and Projected Formats
  - Coordinates can be removed as well as added.
  - Coordinates can be exported in a simple text format in both Geographic and Projected Formats.
  - The user clearly understands the limited input/output coordinate systems and expected formats.
- A summary of key statistics is calculated based on the elements loaded/drawn onto the map via the temporary GeoJSONs.

### Scope

The scope of the initial project version is to create a non-persistent single page interface which provides
the user with the tools to upload or create a basic polygon and draw and generate polyines with two or more
vertices on top of a digital map or satellite imagery workspace. The site will calculate some base statistics
on the polygons and polylines and these features are exportable in a basic text format.

- Single Page Design
  - No Navbar
  - A Logo which hovers over the Top Left of all content on the page
  - The entire page is dedicated to a Map API.
    - With the exception of a minimal footer.
  - Collapsible containers which draw over the Map API to allow user input such as loading and entering data, exporting data and viewing outputs.
  - Some core map manipulation tools presented as hovering buttons over the map.

#### User Stories

| User                                                                                     | Story                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tender coordinator or similar within a hydrographic or aerial survey acquisition company | As a survey tender coordinator, I want to ensure my bid is accurate regarding survey time estimates. I have a tight deadline and cannot wait for support from the GIS/CAD team. I need a reliable indicative line plan that I can easily create myself. The client provided me with a list of coordinates which make up a boundary, and these are in WGS84 latitude and longitude or UTM eastings and northings along with the given zone. The application allowed me to input these coordinates and generate a basic plan despite having little to no experience with CAD or GIS. It also provided me with the distance and duration estimates I need to apply costs to my bid. I was able to create a basic, human readable export which I can provide to the technical team if we win the work.                                                                                             |
| Sole trading independent remotely piloted aerial vehicle operator.                       | My expertise is in the safe operation of aerial “drones” and the collection of photogrammetry data. I am not familiar with survey packages and terminology, or the complexities of different coordinate systems and datums. I have little to no GIS/CAD experience and don’t know anyone who does that can support me. My client requires me to run survey lines over an area to collect the required data and I need waypoints to input into my vehicles autopilot system. The client has provided me with the survey area as a list of positions in WGS84 latitude and longitude or UTM eastings and northings along with the given zone. I was able to visualise this area over Google Maps, which I am familiar with, identify from Google satellite imagery any potential obstacles, and produce a line plan which provides start and end coordinates that I can enter into my autopilot. |
| Competent surveyor/GIS/CAD technician                                                    | I’ve been assigned to a new project that my company has recently been awarded following a successful bid. My project manager has asked me to create a final line plan for the survey acquisition and provided me with the client boundary, along with a file containing the data from the as-bid indicative plan. I’ve quickly been able to load both of these into the propriety acquisition software, make an assessment on its suitability and make any adjustments as required. I’ve now moved onto different parts of the planning and preparation process.                                                                                                                                                                                                                                                                                                                               |

### Structure

As a product designed to be utilised by non-technical operators to produce techincal
outputs quickly it is important to make the experience simple and rewarding for the user.
The site consists of one page and makes use of collapsing sections which cover over parts
of the main content of the page, which is a full-page Map API area. The
collapsing sections provide more in-depth interaction such as input forms and
file upload/download functions and can be left expanded by the user if desired. Core
functionality is provided more permanently over the main map area in the form of
simple buttons. 

A combination of [Mapbox](https://www.mapbox.com/) Map APIs, and open source libraies of geodesy tools provided by
[Movable Type Ltd](https://www.movable-type.co.uk/), [Moveable Type GitHub](https://github.com/chrisveness/geodesy)
and [Turf.js](https://turfjs.org/), JQuery and vanilla Javascript have been used to create the sites 
functionality.

User created data is not persistently stored allowing the workspace to be quickly reset if the page
is refreshed.

Future expansion considerations have also been considered. If the saving of data and the use
of multiple projects is to be rolled out on the site then including the use of a login page,
and a projects page before reaching the main map workspace would be prudent to ensure client
information data security and appropriate organisation. Suitable permanent storage solutions
would need to be applied, such as cloud/server/locally based storage.

The site is designed to be fully responsive and leans on some elements of Bootstrap for
this, however it is recommended that a desktop environment is used as the user has a better
array of inputs including a keyboard, mouse and greater screen real-estate.  
The site is more challenging to use on mobile and tablet devices but is fully designed to be
compatible with these devices.

As the site will initially not have more than one page, a navigation bar will not be required.

### Skeleton

The site will be responsive across all device sizes and utilise Bootstrap 4 breakpoints to achieve this. The site will 
be easiest to use on lg and above device sizes due to screen real estate and user input options. As Bootstrap is optimised for 
smaller mobile devices I will create a custom “XXL” breakpoint to accommodate extra large and high definition devices, where XL 
breakpoint would begin to become oversized and “blown-up”.

| Bootstrap Breakpoint ID | Minimum Pixel Width | Maximum Pixel Width |
| ----------------------- | ------------------- | ------------------- |
| XS - SM                 | 1px                 | 767px               |
| MD - LG                 | 768px               | 1199px              |
| XL                      | 1200px              | 2559px              |
| XXL (Custom breakpoint) | 2560px              | Infinite            |

Common device sizes are:

- Mobile Phones (xs-sm Bootstrap sizing)
- Recreational Tablets (md Bootstrap sizing)
- Professional Tablets (lg Bootstrap sizing)
- Laptops and Desktops (XL Bootstrap sizing)
- TVs, projectors and high definition monitors (XXL Custom sizing)

[Wireframes](assets/docs/wireframes.pdf) were constructed in Basamiq Wireframe 4 in order to provide a design brief for
the project, maximise coding productivity and minimise mission creep. The final product is compared to the wireframes within this document.

### Surface

The site is dominated by a map API which can be presented in a variety of styles including the default street, satellite, a hydrid of these, or 
light and dark modes. This presented a visual challeng in slecting appropriate interface controls and visuals which would be clear and legible
across all the backdrops. The choice of mildy transparent containers which sit above the main map retain the emphasis on the map element to the user
and the use of vibrant colours not typically found on the map element help to segrate these from the map visually. Keeping colours consistent between
linked feature types, such as blue for the Boundary interface and the actual boundary polygon on the map assist the user in making the link between
these two elements visually. 

## Features

### Existing Features

### Minor Improvements

### Future Features

- Ability to handle a variety of file formats.
- Ability to save sessions locally or on the server to be loaded again later following closing of the site.
- Ability to load and create multiple files (plans and boundaries).
- More advanced drawing options (extending and cropping).
- Ability to handle, transform a project into a variety of coordinate systems and geodetics.

## Technologies Used

### Bootstrap 4.5.2

[Bootstrap Homepage](https://getbootstrap.com/)

Bootstrap was utilised to provide responsive front-end design via a component library. It is able to provide some
JavaScript functionality including collapse and accordion section div control.

#### License

Bootstrap is released under the [MIT License](https://tldrlegal.com/license/mit-license)

A copy of this license is provided in Bootstraps GitHub Project: https://github.com/twbs/bootstrap/blob/v4.5.0/LICENSE

Bootstrap Copyright is as follows: Copyright (c) 2011-2020 Twitter, Inc. Copyright (c) 2011-2020 The Bootstrap Authors

### jQuery

jQuery is a JavaScript library designed to make html traversal and manipulation
much simpler than raw JavaScript, by presenting the author with a wealth of
simple code and commands which call on much more complex functions.

jQuery was utilised to improve the targeting of elements and provide some support
for animation and user interaction where possible.

#### License

jQuery is provided under the [MIT License](https://tldrlegal.com/license/mit-license)

### Mapbox

[Mapbox Homepage](https://www.mapbox.com/)

Mapbox forms the foundation platform for the map interface, providing background map data such as the street and satellite
information, GeoJSON interaction and geographical coordinates across the page.

#### License

Mapbox operates a pay-as-you-go approach to useage, requiring an account and an active access token in use on the site. It
provides a generous number of free maploads per month before costs are incurred.

Mapbox is an open source project. Its license can be found here [Mapbox.js Open Source License](https://github.com/mapbox/mapbox.js/blob/publisher-production/LICENSE.md)

### Mapbox draw

Mapbox draw is an open source plugin designed to interact with Mapbox javascript platform to allow developers to create geospatial
drawing functionality such as polygons and lines which have geolocated attributes, stored in GeoJSON format. It was used to
produce the polygon and line drawing functionality and its features collection is targeted to obtain the numerical information
presented to the user such as coordinates.

#### License

Mapbox draw operates an open source license [Mapbox Draw License](https://github.com/mapbox/mapbox-gl-draw/blob/main/LICENSE)

### Turf

Turf.js is an open source module designed to interact with geospatial data in a variety of formats including arrays and GeoJSONs
to provide analysis and outputs to a user. It was utilised within this site to calculate areas and line lengths, and convert
arrays to GeoJSON LineString features.

#### License

Turf.js is provided under the MIT license [Turf.js License](https://github.com/Turfjs/turf/blob/master/LICENSE)

### Moveable Type Scripts Geodesy Library

Moveable Type Scripts Geodesy Library was utilised in this project to convert WGS84 latitude and longitude coordinates obtained
from Mapbox and Mapbox Draw into projected UTM (Universal Transverse Mercator) Easting and Northing Coordinates.
[Moveable Type Scripts Geodesy Library](https://www.movable-type.co.uk/scripts/geodesy-library.html)

#### License

Moveable Type Scripts Geodesy Library is provided under the MIT license. [Chrisveness Geodesy License](https://github.com/chrisveness/geodesy/blob/master/LICENSE)

### LogoMakr

Produced the brand logo using a combination of Google Fonts and icons.

[LogoMakr Homepage](https://logomakr.com)

#### License

Logos created via LogoMakr are approved for both personal and commercial use.

[LogoMakr License](https://logomakr.com/getstarted/terms-conditions/)

### Google Fonts

Google Fonts offers open source font styling options for personal and commercial use. 2 fonts were used within style.css. One of these fonts was also used within Logomakr to create the site logo.

#### License

The use of this product was inline with Google API's terms of service [Google Fonts Terms](https://developers.google.com/terms)

## Testing

### Browser Compatibility

### Responsiveness

### Geodetics

### User Stories

### W3C HTML Validator

## Deployment

### Current Version

### Version History

## User Guide

## Credits

### Content

### Media

### Acknowledgements

## Contributing

## Support

## License

This site is licensed under the 2-Clause BSD License

Copyright 2020 Nicholas Bowley

Redistribution and use in source and binary forms, with or without modification, are permitted provided that 
the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following 
disclaimer.

Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the 
following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, 
INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, 
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF 
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
